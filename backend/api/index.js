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
    if (!supabase) return res.status(500).json({ error: 'Supabase not initialized' });
    const { filename } = req.query;
    const userId = req.user.id;

    if (!filename) {
        return res.status(400).json({ error: 'Filename query parameter is required.' });
    }

    try {
        const { data: analysisRecord, error: dbError } = await supabase
            .from('analyses')
            .select('storage_path, file_name') // Select file_name for content disposition
            .eq('user_id', userId)
            .eq('file_name', filename)
            .single();

        if (dbError) throw dbError;
        if (!analysisRecord) {
            return res.status(404).json({ error: 'Analysis file not found or access denied.' });
        }

        const { data: fileData, error: downloadError } = await supabase.storage
            .from('analysis-results')
            .download(analysisRecord.storage_path);

        if (downloadError) throw downloadError;

        res.setHeader('Content-Type', 'text/markdown');
        res.setHeader('Content-Disposition', `attachment; filename="${analysisRecord.file_name}"`);
        // fileData is a Blob, convert to Buffer to send
        const buffer = Buffer.from(await fileData.arrayBuffer());
        res.send(buffer);

    } catch (error) {
        console.error(`Error downloading analysis file ${filename} for user ${userId}:`, error);
        res.status(500).json({ error: `Failed to download analysis file: ${error.message}` });
    }
});

// Endpoint to analyze GitHub repository - PROTECTED
app.post('/api/analyze', requireAuth, async (req, res) => {
    if (!supabase) return res.status(500).json({ error: 'Supabase not initialized' });
    const { repo, githubToken, openaiToken } = req.body;
    const userId = req.user.id;

    if (!repo) return res.status(400).json({ error: 'Repository URL is required' });

    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Transfer-Encoding', 'chunked');
    const originalConsoleLog = console.log;

    // Define a temporary local path for the analysis file, ideally in /tmp for serverless
    // For now, let's use a name that we will read and then delete.
    // IMPORTANT: `saveToFile` needs to handle this path correctly or be refactored.
    const tempLocalFilename = `temp_analysis_${Date.now()}.md`;
    // On Vercel, you MUST write to /tmp. For local, this will be relative.
    const tempLocalPath = process.env.VERCEL ? path.join('/tmp', tempLocalFilename) : tempLocalFilename; 

    try {
        process.env.GITHUB_TOKEN = githubToken || process.env.GITHUB_TOKEN;
        process.env.OPENAI_API_KEY = openaiToken || process.env.OPENAI_API_KEY;
        
        console.log = (message) => {
            try {
                const cleanMessage = stripAnsiCodes(typeof message === 'string' ? message : JSON.stringify(message));
                res.write('LOG:' + cleanMessage + '\n');
                originalConsoleLog(message);
            } catch (error) {
                originalConsoleLog('Error writing to response for user:', userId, error);
            }
        };
        
        console.log(`User ${userId} starting repository analysis for ${repo}...`);
        console.log(`DEBUG: User object from requireAuth: ${JSON.stringify(req.user, null, 2)}`);
        console.log(`DEBUG: User role: ${req.user.role}`);
        const analysisResultObject = await analyzeRepository(repo);

        console.log('Formatting analysis results...');
        // Use the designated tempLocalPath for saveToFile
        await saveToFile(tempLocalPath, analysisResultObject);
        const markdownContent = await fs.readFile(tempLocalPath, 'utf-8');
        
        const repoName = path.basename(repo.replace(/\.git$/, ''));
        const uniqueFileName = `analysis_${Date.now()}_${repoName}.md`;
        const storagePath = `${userId}/${uniqueFileName}`;

        console.log(`Uploading analysis to Supabase Storage at ${storagePath}...`);
        console.log(`DEBUG: About to upload. User ID: ${userId}, Role: ${req.user.role}`);
        const { error: uploadError } = await supabase.storage
            .from('analysis-results')
            .upload(storagePath, markdownContent, {
                contentType: 'text/markdown',
                upsert: false // Don't upsert, each analysis should be unique
            });

        if (uploadError) throw new Error(`Supabase Storage upload error: ${uploadError.message}`);
        console.log('Upload successful. Recording analysis in database...');

        const { data: dbRecord, error: dbInsertError } = await supabase
            .from('analyses')
            .insert({
                user_id: userId,
                repository_url: repo,
                file_name: uniqueFileName,
                storage_path: storagePath
            })
            .select(); // select() to get the inserted record, useful for analysis_id if needed

        if (dbInsertError) {
            // Attempt to delete the orphaned file from storage if DB insert fails
            console.error('Database insert error, attempting to delete orphaned storage file:', dbInsertError);
            await supabase.storage.from('analysis-results').remove([storagePath]);
            throw new Error(`Database insert error: ${dbInsertError.message}`);
        }
        
        console.log('Analysis recorded in database.');
        res.write(`ANALYSIS_COMPLETE:${uniqueFileName}\n`); // Send filename to client

    } catch (error) {
        console.log = originalConsoleLog; // Restore console before logging final error
        originalConsoleLog(`Error during analysis for user ${userId}, repo ${repo}:`, error);
        try {
            res.write(`LOG:Error during analysis: ${error.message}\n`);
        } catch (writeError) {
            originalConsoleLog('Error sending error message to client for user:', userId, writeError);
        }
    } finally {
        console.log = originalConsoleLog; // Ensure console.log is always restored
        // Clean up the temporary local file
        try {
            await fs.unlink(tempLocalPath);
            originalConsoleLog('Temporary analysis file deleted:', tempLocalPath);
        } catch (cleanupError) {
            if (cleanupError.code !== 'ENOENT') { // ENOENT means file doesn't exist, which is fine
                originalConsoleLog('Error deleting temporary analysis file:', tempLocalPath, cleanupError);
            }
        }
        if (!res.writableEnded) {
            res.end();
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