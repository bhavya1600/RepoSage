import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { analyzeRepository } from '../src/analyzer.js';
import { saveToFile } from '../src/utils/file.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

// Get directory name in ES modules
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load environment variables
dotenv.config();

// Initialize Supabase client
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;
// console.log('Loaded environment variables:', process.env);

if (!supabaseUrl || !supabaseAnonKey) {
  const missingVars = [];
  if (!supabaseUrl) missingVars.push('SUPABASE_URL');
  if (!supabaseAnonKey) missingVars.push('SUPABASE_ANON_KEY');
  
  console.error(`Supabase configuration error: ${missingVars.join(' and ')} ${missingVars.length > 1 ? 'are' : 'is'} required. Make sure these variables are set in your environment.`);
  
  // For a serverless function, throwing an error might be better than process.exit
  // Consider how Vercel handles startup errors
  if (process.env.NODE_ENV === 'production') {
    throw new Error(`Supabase configuration is missing: ${missingVars.join(', ')}`); 
  }
}

// We only initialize supabase if the keys are present, to avoid errors during local dev without .env
const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

const app = express();

// Store the latest analysis file path - THIS WILL BE REVISITED FOR MULTI-USER SUPPORT
let latestAnalysisFile = null;

// Function to strip ANSI color codes
const stripAnsiCodes = (str) => {
    return str.replace(/\u001b\[\d+m/g, '');
};

// Middleware
app.use(cors());
app.use(express.json());

// Authentication Middleware
const requireAuth = async (req, res, next) => {
  if (!supabase) {
    return res.status(500).json({ error: 'Supabase client not initialized. Check server configuration.' });
  }
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error) {
      console.error('Supabase auth error:', error.message);
      return res.status(401).json({ error: `Unauthorized: ${error.message}` });
    }
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
    req.user = user; // Attach user to request object
    next();
  } catch (error) {
    console.error('Error in auth middleware:', error);
    return res.status(500).json({ error: 'Internal server error during authentication' });
  }
};

// Home route
app.get('/', (req, res) => {
    res.send('RepoSage API is running');
});

// Endpoint to serve the analysis file - PROTECTED
app.get('/api/download-analysis', requireAuth, async (req, res) => {
    try {
        // TODO: This needs to be user-specific. For now, it uses the global var.
        if (!latestAnalysisFile) {
            return res.status(404).json({ error: 'No analysis file available. Please run an analysis first.' });
        }
        
        res.setHeader('Content-Type', 'text/markdown');
        const filename = path.basename(latestAnalysisFile);
        res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
        
        const fileContent = await fs.readFile(latestAnalysisFile, 'utf-8');
        res.send(fileContent);
    } catch (error) {
        console.error('Error serving analysis file for user:', req.user.id, error);
        res.status(500).json({ error: 'Failed to download analysis file' });
    }
});

// Endpoint to analyze GitHub repository - PROTECTED
app.post('/api/analyze', requireAuth, async (req, res) => {
    const { repo, githubToken, openaiToken } = req.body;
    const userId = req.user.id; // Get authenticated user ID
    
    // Validate repo URL (only required field)
    if (!repo) {
        return res.status(400).json({ error: 'Repository URL is required' });
    }
    
    // Set up streaming response
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Transfer-Encoding', 'chunked');
    
    const originalConsoleLog = console.log;
    
    try {
        process.env.GITHUB_TOKEN = githubToken || process.env.GITHUB_TOKEN;
        process.env.OPENAI_API_KEY = openaiToken || process.env.OPENAI_API_KEY;
        
        console.log = (message) => {
            try {
                if (typeof message === 'string') {
                    const cleanMessage = stripAnsiCodes(message);
                    res.write('LOG:' + cleanMessage + '\n');
                } else {
                    let jsonMessage;
                    try {
                        jsonMessage = JSON.stringify(message);
                    } catch (jsonError) {
                        jsonMessage = String(message);
                    }
                    res.write('LOG:' + jsonMessage + '\n');
                }
                originalConsoleLog(message);
            } catch (error) {
                originalConsoleLog('Error writing to response for user:', userId, error);
            }
        };
        
        try {
            console.log(`User ${userId} starting repository analysis for ${repo}...`);
            const analysis = await analyzeRepository(repo);
            
            // TODO: Save results to Supabase Storage and link to user
            console.log('Saving analysis results (temporarily local)... ');
            const { mdFilename } = await saveToFile('analysis_results.md', analysis); // This needs to change
            
            latestAnalysisFile = mdFilename; // TEMPORARY
            
            res.write('ANALYSIS_COMPLETE\n');
            console.log = originalConsoleLog;
            res.end();
        } catch (analysisError) {
            // Ensure original console.log is restored before throwing or logging further
            console.log = originalConsoleLog;
            originalConsoleLog(`Analysis error for user ${userId} on repo ${repo}:`, analysisError);
            // The error will be caught by the outer catch block
            throw new Error(`Analysis failed: ${analysisError.message}`); 
        }
        
    } catch (error) {
        // Ensure console.log is restored here too, in case of errors before analysis try block
        console.log = originalConsoleLog;
        originalConsoleLog('Error during analysis request for user:', userId, error); 
        try {
            res.write(`LOG:Error during analysis: ${error.message}\n`);
            res.end();
        } catch (writeError) {
            originalConsoleLog('Error sending error message to client for user:', userId, writeError);
            if (!res.headersSent) {
                res.status(500).json({ error: error.message });
            }
        }
    }
});

// For local development
if (process.env.NODE_ENV !== 'production') {
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
        // Use console.log directly for server startup messages
        console.log(`Server running on port ${port}`);
        if (!supabase) {
            console.log("Warning: Supabase client not initialized. Backend auth endpoints will fail. Check SUPABASE_URL and SUPABASE_ANON_KEY environment variables.");
        }
    });
}

// Export for Vercel serverless function
export default app; 