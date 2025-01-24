import dotenv from 'dotenv';
import { analyzeRepository } from './analyzer.js';
import { displayResults } from './utils/display.js';
import { saveToFile } from './utils/file.js';

dotenv.config();

function validateEnvironment() {
  const requiredEnvVars = {
    'GITHUB_TOKEN': 'GitHub Personal Access Token',
    'OPENAI_API_KEY': 'OpenAI API Key'
  };

  const missingVars = [];
  
  for (const [key, name] of Object.entries(requiredEnvVars)) {
    if (!process.env[key]) {
      missingVars.push(name);
    }
  }

  if (missingVars.length > 0) {
    console.error('\nError: Missing required environment variables:');
    missingVars.forEach(name => console.error(`- ${name}`));
    console.error('\nPlease create a .env file with the following variables:');
    console.error(`
GITHUB_TOKEN=your_github_token_here
OPENAI_API_KEY=your_openai_api_key_here
    `);
    process.exit(1);
  }
}

async function main() {
  validateEnvironment();

  const repoUrl = process.argv[2];
  
  if (!repoUrl) {
    console.error('Please provide a GitHub repository URL');
    console.error('Usage: npm start https://github.com/username/repository');
    process.exit(1);
  }

  try {
    console.log('Starting repository analysis...');
    const analysis = await analyzeRepository(repoUrl);
    
    // Display results in console
    displayResults(analysis);
    
    // Save results to files
    await saveToFile('analysis_results.md', analysis);
    
    console.log('Analysis completed successfully!');
  } catch (error) {
    console.error('Error during analysis:', error.message);
    process.exit(1);
  }
}

main();