#!/usr/bin/env node

/**
 * Utility script to save files to /tmp directory
 * 
 * Usage:
 *   node save-to-tmp.js [filename] [content] [format]
 * 
 * Examples:
 *   node save-to-tmp.js test.json '{"key":"value"}' json
 *   node save-to-tmp.js log.txt 'This is a log entry' text
 *   node save-to-tmp.js (runs the example function)
 */

import { saveToTmpDirectory } from './src/utils/file.js';
import { saveExampleFiles } from './src/utils/tmpFileSave.js';

async function main() {
  try {
    const args = process.argv.slice(2);
    
    // If no arguments provided, run the example
    if (args.length === 0) {
      console.log('Running example file save...');
      const result = await saveExampleFiles();
      console.log('Files saved:');
      console.log(result);
      return;
    }
    
    // Extract arguments
    const [filename, content, format = 'text'] = args;
    
    if (!filename || !content) {
      console.error('Error: Filename and content are required');
      showUsage();
      process.exit(1);
    }
    
    // Parse JSON content if format is json and content looks like JSON
    let parsedContent = content;
    if (format === 'json' && (content.startsWith('{') || content.startsWith('['))) {
      try {
        parsedContent = JSON.parse(content);
      } catch (err) {
        console.warn('Warning: Could not parse content as JSON, saving as string');
      }
    }
    
    // Save the file
    const savedPath = await saveToTmpDirectory(filename, parsedContent, format);
    console.log(`Successfully saved file to: ${savedPath}`);
    
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

function showUsage() {
  console.log(`
Usage:
  node save-to-tmp.js [filename] [content] [format]

Examples:
  node save-to-tmp.js test.json '{"key":"value"}' json
  node save-to-tmp.js log.txt 'This is a log entry' text
  node save-to-tmp.js (runs the example function)
`);
}

// Run the script
main(); 