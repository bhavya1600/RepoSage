import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { analyzeRepository } from '../src/analyzer.js';
import { saveToFile } from '../src/utils/file.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Get directory name in ES modules
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load environment variables
dotenv.config();

const app = express();

// Store the latest analysis file path
let latestAnalysisFile = null;

// Function to strip ANSI color codes
const stripAnsiCodes = (str) => {
    return str.replace(/\u001b\[\d+m/g, '');
};

// Middleware
app.use(cors());
app.use(express.json());

// Home route
app.get('/', (req, res) => {
    res.send('RepoSage API is running');
});

// Endpoint to serve the analysis file
app.get('/api/download-analysis', async (req, res) => {
    try {
        if (!latestAnalysisFile) {
            return res.status(404).json({ error: 'No analysis file available. Please run an analysis first.' });
        }
        
        res.setHeader('Content-Type', 'text/markdown');
        const filename = path.basename(latestAnalysisFile);
        res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
        
        const fileContent = await fs.readFile(latestAnalysisFile, 'utf-8');
        res.send(fileContent);
    } catch (error) {
        console.error('Error serving analysis file:', error);
        res.status(500).json({ error: 'Failed to download analysis file' });
    }
});

// Endpoint to analyze GitHub repository
app.post('/api/analyze', async (req, res) => {
    const { repo, githubToken, openaiToken } = req.body;
    
    // Validate repo URL (only required field)
    if (!repo) {
        return res.status(400).json({ error: 'Repository URL is required' });
    }
    
    // Set up streaming response
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Transfer-Encoding', 'chunked');
    
    // Store the original console.log outside the try-catch to ensure it's accessible in the catch block
    const originalConsoleLog = console.log;
    
    try {
        // Use provided tokens or fall back to .env values
        process.env.GITHUB_TOKEN = githubToken || process.env.GITHUB_TOKEN;
        process.env.OPENAI_API_KEY = openaiToken || process.env.OPENAI_API_KEY;
        
        // Redirect console.log to client
        console.log = (message) => {
            try {
                if (typeof message === 'string') {
                    // Strip ANSI codes before sending to client
                    const cleanMessage = stripAnsiCodes(message);
                    res.write('LOG:' + cleanMessage + '\n');
                } else {
                    // Make sure we properly stringify non-string messages
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
                originalConsoleLog('Error writing to response:', error);
            }
        };
        
        try {
            // Run the analysis
            console.log('Starting repository analysis...');
            const analysis = await analyzeRepository(repo);
            
            // Save results to file
            console.log('Saving analysis results...');
            const { mdFilename } = await saveToFile('analysis_results.md', analysis);
            
            // Store the file path for download
            latestAnalysisFile = mdFilename;
            
            // Signal that analysis is complete and file is ready
            res.write('ANALYSIS_COMPLETE\n');
            
            // Restore original console.log
            console.log = originalConsoleLog;
            
            // End the response
            res.end();
        } catch (analysisError) {
            throw new Error(`Analysis failed: ${analysisError.message}`);
        }
        
    } catch (error) {
        console.error('Error during analysis:', error);
        try {
            // Restore original console.log if error occurred
            console.log = originalConsoleLog;
            
            // Send error to client
            res.write(`LOG:Error during analysis: ${error.message}\n`);
            res.end();
        } catch (writeError) {
            console.error('Error sending error message to client:', writeError);
            // If headers haven't been sent, send error as JSON
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
        console.log(`Server running on port ${port}`);
    });
}

// Export for Vercel serverless function
export default app; 