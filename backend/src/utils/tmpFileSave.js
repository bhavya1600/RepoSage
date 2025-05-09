/**
 * Example utility for saving files to /tmp directory
 * 
 * This script shows how to use the saveToTmpDirectory function
 * to save different types of data to the /tmp folder.
 */

import { saveToTmpDirectory } from './file.js';

// Example function to demonstrate saving to tmp directory
export async function saveExampleFiles() {
  try {
    // Save a JSON object
    const jsonData = {
      name: 'Example Data',
      timestamp: new Date().toISOString(),
      items: [
        { id: 1, value: 'Item 1' },
        { id: 2, value: 'Item 2' },
        { id: 3, value: 'Item 3' }
      ],
      config: {
        enableLogging: true,
        maxRetries: 3
      }
    };
    
    const jsonPath = await saveToTmpDirectory('example-data.json', jsonData, 'json');
    console.log(`JSON saved to: ${jsonPath}`);
    
    // Save a text file
    const textContent = `Example Text File
Created: ${new Date().toISOString()}
    
This is a demonstration of saving a text file to the /tmp directory.
It shows how to use the saveToTmpDirectory function with format='text'.

You can use this for:
- Log files
- Reports
- Configuration files
- Temporary data storage
`;
    
    const textPath = await saveToTmpDirectory('example-text.txt', textContent, 'text');
    console.log(`Text saved to: ${textPath}`);
    
    return {
      jsonPath,
      textPath
    };
  } catch (error) {
    console.error('Error saving example files:', error);
    throw error;
  }
}

// Automatically run if this script is executed directly
if (process.argv[1].endsWith('tmpFileSave.js')) {
  saveExampleFiles()
    .then(paths => {
      console.log('Successfully saved example files:');
      console.log(paths);
    })
    .catch(err => {
      console.error('Failed to save example files:', err);
      process.exit(1);
    });
} 