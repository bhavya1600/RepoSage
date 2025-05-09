import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { analyzeRepository, saveAnalysisToTmp } from './analyzer.js';
import { displayResults } from './utils/display.js';
import { saveToFile, saveToTmpDirectory } from './utils/file.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Get directory name in ES modules
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load environment variables
dotenv.config();

const app = express();
const port = 5000;

// Function to strip ANSI color codes
const stripAnsiCodes = (str) => {
    return str.replace(/\u001b\[\d+m/g, '');
};

// Middleware
app.use(cors());
app.use(express.json());

// Endpoint to serve the analysis file
app.get('/api/download-analysis', async (req, res) => {
    try {
        const filePath = path.join(__dirname, '..', 'analysis_results.md');
        res.setHeader('Content-Type', 'text/markdown');
        res.setHeader('Content-Disposition', 'attachment; filename=analysis_results.md');
        const fileContent = await fs.readFile(filePath, 'utf-8');
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

    try {
        // Use provided tokens or fall back to .env values
        process.env.GITHUB_TOKEN = githubToken || process.env.GITHUB_TOKEN;
        process.env.OPENAI_API_KEY = openaiToken || process.env.OPENAI_API_KEY;

        // Redirect console.log to client
        const originalConsoleLog = console.log;
        console.log = (message) => {
            try {
                if (typeof message === 'string') {
                    // Strip ANSI codes before sending to client
                    const cleanMessage = stripAnsiCodes(message);
                    res.write('LOG:' + cleanMessage + '\n');
                } else {
                    res.write('LOG:' + JSON.stringify(message) + '\n');
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
            await saveToFile('analysis_results.md', analysis);
            
            // Also save to tmp directory
            await saveAnalysisToTmp(analysis);
            
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
            if (console.log !== originalConsoleLog) {
                console.log = originalConsoleLog;
            }
            
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

// Add a new endpoint to save files to tmp directory
app.post('/api/save-to-tmp', async (req, res) => {
  try {
    const { filename, data, format } = req.body;
    
    if (!filename) {
      return res.status(400).json({ error: 'Filename is required' });
    }
    
    const savedPath = await saveToTmpDirectory(filename, data, format || 'json');
    
    res.json({ 
      success: true, 
      message: 'File saved successfully',
      path: savedPath
    });
  } catch (error) {
    console.error('Error saving to tmp directory:', error);
    res.status(500).json({ 
      error: 'Failed to save file',
      message: error.message
    });
  }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});