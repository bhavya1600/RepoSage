import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { analyzeRepository, resetAnalyzerState, forceTerminateAllOperations } from './analyzer.js';
import { displayResults } from './utils/display.js';
import { saveToFile } from './utils/file.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Get directory name in ES modules
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load environment variables
dotenv.config();

const app = express();
const port = 5000;

// Store active analysis tasks for cancellation
const activeAnalysisTasks = new Map();

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
        const filePath = path.join('/tmp/analysis_results.md');
        res.setHeader('Content-Type', 'text/markdown');
        res.setHeader('Content-Disposition', 'attachment; filename=analysis_results.md');
        const fileContent = await fs.readFile(filePath, 'utf-8');
        res.send(fileContent);
    } catch (error) {
        console.error('Error serving analysis file:', error);
        res.status(500).json({ error: 'Failed to download analysis file' });
    }
});

// Simple health check endpoint to verify API is working
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'API is running' });
});

// Specific middleware for the cancel endpoint to ensure it properly parses JSON
const cancelMiddleware = express.json();

// Endpoint to cancel ongoing analysis
app.post('/api/cancel-analysis', cancelMiddleware, async (req, res) => {
    try {
        console.log('Cancel request received:', req.body);
        const { sessionId } = req.body;
        
        if (!sessionId) {
            console.log('No session ID provided');
            return res.status(400).json({ error: 'Session ID is required' });
        }
        
        console.log(`Looking for session ${sessionId} in active tasks...`);
        console.log(`Active tasks: ${Array.from(activeAnalysisTasks.keys())}`);
        
        if (activeAnalysisTasks.has(sessionId)) {
            console.log(`Found active task for session ${sessionId}, cancelling...`);
            const task = activeAnalysisTasks.get(sessionId);
            
            // Set the cancel flag to true
            task.canceled = true;
            
            // Abort any pending requests
            if (task.abortController) {
                console.log('Aborting controller...');
                task.abortController.abort();
            }
            
            // Force terminate all operations to ensure we stop immediately
            console.log('Force terminating all operations...');
            forceTerminateAllOperations();
            
            // Reset the analyzer state to clean up any ongoing operations
            console.log('Resetting analyzer state...');
            resetAnalyzerState();
            
            // If there's an active response, inform the client
            if (task.res && !task.res.writableEnded) {
                console.log('Informing client of cancellation...');
                task.res.write('LOG:Analysis canceled by user\n');
                task.res.end();
            }
            
            // Remove the task from active tasks
            console.log('Removing task from active tasks...');
            activeAnalysisTasks.delete(sessionId);
            
            console.log('Cancellation complete, returning success response');
            
            // Always set the content type explicitly
            res.setHeader('Content-Type', 'application/json');
            return res.status(200).json({ message: 'Analysis canceled successfully', success: true });
        } else {
            console.log(`No active task found for session ${sessionId}`);
            
            // Always set the content type explicitly
            res.setHeader('Content-Type', 'application/json');
            return res.status(404).json({ error: 'No active analysis found for this session', success: false });
        }
    } catch (error) {
        console.error('Error canceling analysis:', error);
        
        // Always set the content type explicitly
        res.setHeader('Content-Type', 'application/json');
        return res.status(500).json({ error: 'Internal server error during cancellation', message: error.message, success: false });
    }
});

// Endpoint to analyze GitHub repository
app.post('/api/analyze', async (req, res) => {
    const { repo, githubToken, openaiToken, sessionId } = req.body;

    // Validate repo URL (only required field)
    if (!repo) {
        return res.status(400).json({ error: 'Repository URL is required' });
    }
    
    // Validate session ID
    if (!sessionId) {
        return res.status(400).json({ error: 'Session ID is required' });
    }
    
    // Clean up any existing analysis task with the same sessionId
    if (activeAnalysisTasks.has(sessionId)) {
        const existingTask = activeAnalysisTasks.get(sessionId);
        if (existingTask.abortController) {
            existingTask.abortController.abort();
        }
        activeAnalysisTasks.delete(sessionId);
    }

    // Create new AbortController
    const abortController = new AbortController();

    // Set up streaming response
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Transfer-Encoding', 'chunked');
    
    // Create a task object to track this analysis
    const analysisTask = {
        sessionId,
        canceled: false,
        res,
        abortController
    };
    
    // Store the task in the active tasks map
    activeAnalysisTasks.set(sessionId, analysisTask);

    try {
        // Reset analyzer state before starting a new analysis
        resetAnalyzerState();
        
        // Use provided tokens or fall back to .env values
        process.env.GITHUB_TOKEN = githubToken || process.env.GITHUB_TOKEN;
        process.env.OPENAI_API_KEY = openaiToken || process.env.OPENAI_API_KEY;

        // Redirect console.log to client
        const originalConsoleLog = console.log;
        console.log = (message) => {
            try {
                // Check if the analysis has been canceled
                if (analysisTask.canceled) {
                    return;
                }
                
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
            
            // Create a custom abort controller to check for cancellation
            const checkCancellation = () => {
                if (analysisTask.canceled || abortController.signal.aborted) {
                    throw new Error('Analysis canceled by user');
                }
                return false;
            };
            
            const analysis = await analyzeRepository(repo, checkCancellation, abortController.signal);
            
            // If we get here, the analysis completed successfully
            if (!analysisTask.canceled && !abortController.signal.aborted) {
                // Save results to file
                console.log('Saving analysis results...');
                await saveToFile('analysis_results.md', analysis);
                
                // Signal that analysis is complete and file is ready
                res.write('ANALYSIS_COMPLETE\n');
            }
            
            // Restore original console.log
            console.log = originalConsoleLog;
            
            // End the response if not already ended
            if (!res.writableEnded) {
                res.end();
            }
        } catch (analysisError) {
            if (analysisError.message === 'Analysis canceled by user') {
                console.log('Analysis was canceled by user');
            } else {
                throw new Error(`Analysis failed: ${analysisError.message}`);
            }
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
    } finally {
        // Clean up - remove the task from active tasks
        activeAnalysisTasks.delete(sessionId);
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});