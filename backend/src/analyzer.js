import { Octokit } from 'octokit';
import { OpenAI } from 'openai';
import { parseGitHubUrl } from './utils/github.js';
import { buildFileTree } from './utils/fileTree.js';
import chalk from 'chalk';
import fs from 'fs'; // Added for saving API responses
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Load model config file
// Create __filename and __dirname equivalents for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Now you can resolve your config file relative to the project root.
const configPath = resolve(__dirname, '../openaiConfigDev.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

console.log("Loaded config from:", configPath);

// Maintain state for active clients and resources
let analyzerState = {
  octokit: null,
  openai: null,
  activeRequests: new Set(),
  isAnalyzing: false,
  previouslyCanceled: false,
  lastSessionId: null
};

// Function to reset analyzer state
export function resetAnalyzerState() {
  // Clean up any resources
  analyzerState.activeRequests.clear();
  analyzerState.isAnalyzing = false;
  analyzerState.octokit = null;
  analyzerState.openai = null;
  
  // Do not reset previouslyCanceled flag here - we need to know if a previous
  // analysis was canceled when starting a new one
  
  console.log("Analyzer state has been reset");
}

// Function to completely clear state (used when starting a fresh analysis)
export function clearAnalyzerState() {
  resetAnalyzerState();
  analyzerState.previouslyCanceled = false;
  analyzerState.lastSessionId = null;
  console.log("Analyzer state has been completely cleared");
}

// Function to forcefully terminate all active operations
export function forceTerminateAllOperations() {
  console.log(`Force terminating ${analyzerState.activeRequests.size} active requests`);
  
  // Close all active API requests
  for (const request of analyzerState.activeRequests) {
    try {
      if (request && request.abort) {
        request.abort();
      }
    } catch (error) {
      console.error('Error aborting request:', error);
    }
  }
  
  // Create new client instances to ensure no lingering connections
  if (analyzerState.octokit) {
    try {
      analyzerState.octokit = null;
    } catch (error) {
      console.error('Error resetting Octokit client:', error);
    }
  }
  
  if (analyzerState.openai) {
    try {
      analyzerState.openai = null;
    } catch (error) {
      console.error('Error resetting OpenAI client:', error);
    }
  }
  
  // Clear all active requests
  analyzerState.activeRequests.clear();
  
  // Reset analysis flag
  analyzerState.isAnalyzing = false;
  
  console.log('All operations forcefully terminated');
}

const SKIP_FILES = [
  '.css', '.scss', '.less',
  '.svg', '.png', '.jpg', '.jpeg', '.gif', '.ico',
  '.json', '.lock',
  '.txt',
  'LICENSE', 'CHANGELOG',
  '.gitignore', '.env.example',
  '.eslintrc', '.prettierrc',
  'package-lock.json', 'yarn.lock'
];

const IMPORTANT_FILES = [
  'package.json',
  'tsconfig.json',
  'vite.config',
  'next.config',
  'webpack.config',
  'docker-compose',
  'Dockerfile'
];


async function createChatCompletion(openai, model, modelType, analysisPrompt, jsonSchema = null, maxTokens = 4000, abortSignal = null) {
  const baseParams = {
    model: model,
    messages: [
      { 
        role: "system", 
        content: "You are a senior developer with expertise in code analysis, software architecture, and multiple programming languages. Provide detailed, accurate, and insightful analysis. Follow user instructions carefully and reply only with the requested format." 
      },
      { 
        role: "user", 
        content: analysisPrompt }
    ],
    temperature: 0.3,
    max_tokens: maxTokens
  };

  // Add JSON schema if provided for structured output
  if (jsonSchema) {
    baseParams.response_format = {
      type:        "json_schema",
      json_schema: jsonSchema,
      strict:      true
    };
  }

  // Add the appropriate max tokens parameter based on model type
  if (modelType === "Reasoning") {
    baseParams.reasoning = {exclude: true};
  }
  
  // Add abort signal if provided
  if (abortSignal) {
    baseParams.signal = abortSignal;
  }
  
  const request = openai.chat.completions.create(baseParams);
  
  // Add to active requests
  analyzerState.activeRequests.add(request);
  
  try {
    const result = await request;
    return result;
  } finally {
    // Remove from active requests when done
    analyzerState.activeRequests.delete(request);
  }
}

async function createChatCompletionMultimodal(openai, model, modelType, analysisPrompt, jsonSchema = null, maxTokens = 4000, abortSignal = null) {
  const baseParams = {
    model: model,
    messages: [
      { 
        role: "system", 
        content: [
          {
            type: "text",
            text: "You are a senior developer with expertise in code analysis, software architecture, and multiple programming languages. Provide detailed, accurate, and insightful analysis. Follow user instructions carefully and reply only with the requested format." 
          }
        ]
      },
      { 
        role: "user", 
        content: [
          {
            type: "text",
            text: analysisPrompt
          }
        ]
      }
    ],
    temperature: 0.3,
    max_tokens: maxTokens
  };

  // Add JSON schema if provided for structured output
  if (jsonSchema) {
    baseParams.response_format = {
      type: "json_schema",
      json_schema: jsonSchema,
      strict: true
    };
  }

    // Add the appropriate max tokens parameter based on model type
  if (modelType === "Reasoning") {
    baseParams.reasoning = {exclude: true};
  }
  
  // Add abort signal if provided
  if (abortSignal) {
    baseParams.signal = abortSignal;
  }
  
  const request = openai.chat.completions.create(baseParams);
  
  // Add to active requests
  analyzerState.activeRequests.add(request);
  
  try {
    const result = await request;
    return result;
  } finally {
    // Remove from active requests when done
    analyzerState.activeRequests.delete(request);
  }
}


// New helper to save API call content to a TXT file
async function saveApiCallContent(functionName, content) {
  const filePath = 'apiResponsesLog.txt';
  const heading = `----- ${functionName} -----\n`;
  fs.appendFileSync(filePath, heading + content + '\n\n');
}

export async function analyzeRepository(repoUrl, checkCancellation = () => false, abortSignal = null, sessionId = null) {
  // If a previous analysis was canceled and this is a new session, make sure we have a clean state
  if (analyzerState.previouslyCanceled && sessionId !== analyzerState.lastSessionId) {
    console.log("Previous analysis was canceled. Ensuring clean state for new session.");
    clearAnalyzerState();
  }
  
  // Store the current session ID
  if (sessionId) {
    analyzerState.lastSessionId = sessionId;
  }
  
  // Prevent multiple concurrent analyses
  if (analyzerState.isAnalyzing) {
    console.log("Analysis already in progress. Please cancel the current analysis before starting a new one.");
    throw new Error("Analysis already in progress");
  }
  
  analyzerState.isAnalyzing = true;
  analyzerState.previouslyCanceled = false; // Reset this flag at the start of a new analysis
  
  try {
    console.log(chalk.blue('\n📡 Initializing API clients...'));
    const octokit = new Octokit({ 
      auth: process.env.GITHUB_TOKEN,
      request: { signal: abortSignal }
    });
    const openai = new OpenAI({ 
      baseURL: 'https://openrouter.ai/api/v1', 
      apiKey: process.env.OPENROUTER_API_KEY,
      defaultQuery: { signal: abortSignal }
    });
    
    // Store clients in state
    analyzerState.octokit = octokit;
    analyzerState.openai = openai;

    const { owner, repo } = parseGitHubUrl(repoUrl);
    console.log(chalk.blue(`\n🔍 Analyzing repository: ${owner}/${repo}`));
    
    // Check for cancellation
    if (checkCancellation()) return null;
    
    console.log(chalk.yellow('\n📊 Fetching repository metadata...'));
    const { data: repoData } = await octokit.rest.repos.get({
      owner,
      repo,
      request: { signal: abortSignal }
    });
    console.log(chalk.green('✓ Repository metadata fetched'));

    // Check for cancellation
    if (checkCancellation()) return null;

    console.log(chalk.yellow('\n🌳 Fetching repository file tree...'));
    const { data: treeData } = await octokit.rest.git.getTree({
      owner,
      repo,
      tree_sha: repoData.default_branch,
      recursive: 'true',
      request: { signal: abortSignal }
    });
    console.log(chalk.green('✓ File tree fetched'));

    // Check for cancellation
    if (checkCancellation()) return null;

    const fileTree = buildFileTree(treeData.tree);
    
    // New: Get README file content if exists
    let readmeContent = "No Readme file found";
    const readmeFile = treeData.tree.find(file => file.path.toLowerCase().startsWith("readme"));
    if (readmeFile) {
      try {
        // Check for cancellation
        if (checkCancellation()) return null;
        
        const { data: readmeData } = await octokit.rest.repos.getContent({
          owner,
          repo,
          path: readmeFile.path,
          request: { signal: abortSignal }
        });
        readmeContent = Buffer.from(readmeData.content, 'base64').toString();
      } catch (error) {
        console.error('Error fetching README:', error.message);
      }
    }

    // Check for cancellation
    if (checkCancellation()) return null;

    console.log(chalk.yellow('\n🤔 Analyzing project structure...'));
    const projectUnderstanding = await analyzeProjectStructure(openai, repoData, treeData.tree, readmeContent, abortSignal);
    console.log(chalk.green('✓ Initial project understanding complete'));

    // Check for cancellation
    if (checkCancellation()) return null;

    const analysis = {
      repository: repoData,
      fileTree,
      projectUnderstanding,
      fileAnalysis: [],
      fileMetadata: [],
      summary: '',
      callHierarchy: ''
    };

    // Check for cancellation
    if (checkCancellation()) return null;

    const filesToAnalyze = await smartFileFilter(treeData.tree, projectUnderstanding, readmeContent, abortSignal);
    console.log(chalk.yellow(`\n📝 Analyzing ${filesToAnalyze.length} relevant files...`));

    console.log('File names to analyze:\n' + filesToAnalyze.map(file => file.path).join('\n'));

    let totalTokens = 0;
    for (const [index, file] of filesToAnalyze.entries()) {
      // Check for cancellation
      if (checkCancellation()) return null;
      
      console.log(chalk.yellow(`\n[${index + 1}/${filesToAnalyze.length}] Analyzing: ${file.path}`));
      
      console.log(chalk.gray('  ↳ Fetching file content...'));
      const { data: fileContent } = await octokit.rest.repos.getContent({
        owner,
        repo,
        path: file.path,
        request: { signal: abortSignal }
      });

      const content = Buffer.from(fileContent.content, 'base64').toString();
      
      // Check for cancellation
      if (checkCancellation()) return null;
      
      const estimatedTokens = content.length / 4;
      if (totalTokens + estimatedTokens > config.MAX_TOKENS_PER_REQUEST) {
        console.log(chalk.yellow('  ⚠️ Approaching token limit, summarizing content...'));
        const summary = await summarizeContent(openai, content, treeData.tree, abortSignal);
        totalTokens += summary.length / 4;
        
        // Check for cancellation
        if (checkCancellation()) return null;
        
        console.log(chalk.gray('  ↳ Generating analysis from summary...'));
        const { textAnalysis, jsonMetadata } = await analyzeCode(openai, file.path, summary, treeData.tree, abortSignal);
        analysis.fileAnalysis.push({ path: file.path, analysis: textAnalysis });
        analysis.fileMetadata.push({ path: file.path, metadata: jsonMetadata });
      } else {
        console.log(chalk.gray('  ↳ Generating analysis...'));
        
        // Check for cancellation
        if (checkCancellation()) return null;
        
        const { textAnalysis, jsonMetadata } = await analyzeCode(openai, file.path, content, treeData.tree, abortSignal);
        analysis.fileAnalysis.push({ path: file.path, analysis: textAnalysis });
        analysis.fileMetadata.push({ path: file.path, metadata: jsonMetadata });
        totalTokens += estimatedTokens;
      }
      console.log(chalk.green('  ✓ Analysis complete'));
    }

    // Check for cancellation
    if (checkCancellation()) return null;

    console.log(chalk.yellow('\n🔄 Analyzing call hierarchy...'));
    analysis.callHierarchy = await analyzeCallHierarchy(openai, analysis.fileMetadata, projectUnderstanding, abortSignal);
    console.log(chalk.green('✓ Call hierarchy generated'));

    // Check for cancellation
    if (checkCancellation()) return null;

    console.log(chalk.yellow('\n📋 Generating project summary...'));
    analysis.summary = await generateSummary(openai, analysis, abortSignal);
    console.log(chalk.green('✓ Summary generated'));
    
    return analysis;
  } catch (error) {
    if (error.name === 'AbortError' || error.message === 'Analysis canceled by user') {
      console.log('Analysis aborted');
      // Mark that this analysis was canceled
      analyzerState.previouslyCanceled = true;
      return null;
    }
    throw error;
  } finally {
    // Always reset the analyzing flag
    analyzerState.isAnalyzing = false;
  }
}

async function analyzeProjectStructure(openai, repoData, files, readmeContent, abortSignal = null) {

  // Delete the API responses log file if it exists
  const apiLogPath = path.resolve(dirname(fileURLToPath(import.meta.url)), '../apiResponsesLog.txt');
  try {
    if (fs.existsSync(apiLogPath)) {
      fs.unlinkSync(apiLogPath);
      console.log(chalk.green('✓ API responses log file deleted'));
    }
  } catch (error) {
    console.error(chalk.red('Error deleting API responses log file:'), error);
  }

  const fileList = files.map(f => f.path).join('\n');
  // console.log(chalk.green('File list:\n' + fileList));
  const prompt = `
  Analyze this repository's file structure and provide a brief understanding of the project.
Focus on identifying the main components, tech stack, and architecture based on the file names and structure.
Keep the response concise.

Please structure your response in the following format:
1. **Project Overview**: Brief description of what the project does (1-2 sentences)
2. **Main Components**: List the key components/modules and their purposes
3. **Tech Stack**: Identify frameworks, libraries, and languages used
4. **Architecture**: Describe the high-level architecture pattern (if identifiable)
5. **Key Limitations/Constraints**: Note any obvious limitations or constraints

Use single backticks to highlight wherever needed.

Context:
  Provided Metadata:
${JSON.stringify(repoData)}

  Provided README:
${readmeContent}

  Provided File structure:
${fileList}
`;

  const { model, modelType } = config.configurations.find(c => c.name === 'analyzeProjectStructure');
  const response = await createChatCompletion(openai, model, modelType, prompt, null, 4000, abortSignal);

  await saveApiCallContent("analyzeProjectStructure", response.choices[0].message.content); // Save API response

  return response.choices[0].message.content;
}

async function smartFileFilter(files, projectUnderstanding, readmeContent, abortSignal = null) {
  const openai = new OpenAI({ 
    baseURL: 'https://openrouter.ai/api/v1', 
    apiKey: process.env.OPENROUTER_API_KEY,
    defaultQuery: { signal: abortSignal }
  });
  const filePaths = files.map(f => f.path);

  try {
    const prompt = `Analyze the project structure and identify the MOST CRITICAL files for understanding the core functionality and execution flow of this codebase.

Focus on:
1. Entry points (main files that start the application)
2. Core business logic files
3. Key utility/helper files that are frequently imported
4. Configuration files that define the application structure
5. Files that connect different parts of the application

EXCLUDE:
- Documentation files (.md)
- Test files
- Asset files (images, fonts, etc.)
- Build configuration files
- Files with minimal code or boilerplate

Prioritize files that reveal how data flows through the system and how components interact.

Context:
  Project Type Analysis:
  ${projectUnderstanding}

  Provided README:
  ${readmeContent}

  Here is the list of file paths:
  ${filePaths.join("\n")}

IMPORTANT: Reply only with JSON data that has one key named "importantFiles" and an array of file paths as its value. DO NOT use Markdown formatting/ any backticks or any additional explanation. Just return plaintext JSON data.

Output Example:
{
  "importantFiles": ["<path1>", "<path2>", …]
}
  
`;

    // Define schema for file list response
    const fileListSchema = {
      type: "object",
      properties: {
        importantFiles: {
          type: "array",
          items: { type: "string" },
          description: "Array of file paths considered essential for understanding the codebase"
        }
      },
      required: ["importantFiles"]
    };

    const { model, modelType } = config.configurations.find(c => c.name === 'smartFileFilter');
    const response = await createChatCompletion(openai, model, modelType, prompt, fileListSchema, 4000, abortSignal);
    let content = response.choices[0].message.content;
    // Try to extract JSON from the response using regex
    // This will find content that starts with { and ends with }, capturing everything in between
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      content = jsonMatch[0];
    }

    try {
      // Preprocess response to remove markdown code block indicators
      console.log("Smart File Filter Response No Formatting: ", content);
      content = content.replace(/^```json\s*/, '').replace(/\s*```\s*$/, '');
      await saveApiCallContent("smartFileFilter", content);
      // Parse the JSON response
      const jsonResponse = JSON.parse(content);
      const importantFiles = jsonResponse.importantFiles;

      if (!Array.isArray(importantFiles)) {
        throw new Error('AI response format invalid');
      }

      return files.filter(file => {
        if (file.type !== 'blob' || SKIP_FILES.some(ext => file.path.toLowerCase().endsWith(ext))) {
          return false;
        }
        return importantFiles.includes(file.path);
      });
    } catch (jsonError) {
      console.error(chalk.yellow('JSON parsing error:'), jsonError.message);
      console.log(chalk.yellow('Parsing file paths from text response'));
      
      // Fallback: extract file paths from text response
      const content = response.choices[0].message.content;
      const extractedPaths = [];
      console.log("Extracted Paths: ", extractedPaths);
      
      // Extract file paths that match the pattern in our file list
      for (const path of filePaths) {
        if (content.includes(path)) {
          extractedPaths.push(path);
        }
      }
      
      if (extractedPaths.length > 0) {
        return files.filter(file => {
          if (file.type !== 'blob' || SKIP_FILES.some(ext => file.path.toLowerCase().endsWith(ext))) {
            return false;
          }
          return extractedPaths.includes(file.path);
        });
      } else {
        throw new Error('Could not extract file paths from response');
      }
    }
  } catch (error) {
    // Check if this is a cancellation error
    if (error.name === 'AbortError') {
      throw error;
    }
    
    console.error(chalk.red('AI Filter Error:'), error.message);
    console.log(chalk.yellow('Using fallback filtering'));
    
    // Enhanced fallback filtering
    return files.filter(file => {
      if (file.type !== 'blob' || SKIP_FILES.some(ext => file.path.toLowerCase().endsWith(ext))) {
        return false;
      }
      return IMPORTANT_FILES.some(name => file.path.toLowerCase().includes(name)) ||
             file.path.match(/\.(js|jsx|ts|tsx|py|java|go|rb|php|cs)$/i) ||
             file.path.match(/^(src|app|lib|config|core|server|client)\//);
    });
  }
}

async function summarizeContent(openai, content, fileTree, abortSignal = null) {
  const fileList = fileTree.map(f => f.path).join('\n');
  const prompt = `Given the file tree of the project this code belongs to:
  
  File tree:
  ${fileList}

  Summarize the key aspects of this code, focusing on its main functionality and structure:

    ${content}`;

    const { model, modelType } = config.configurations.find(c => c.name === 'summarizeContent');
    const response = await createChatCompletion(openai, model, modelType, prompt, null, 4000, abortSignal);

  // await saveApiCallContent("summarizeContent", response.choices[0].message.content); // Save API response

  return response.choices[0].message.content;
}

async function analyzeCode(openai, filePath, content, fileTree, abortSignal = null) {
  const fileList = fileTree.map(f => f.path).join('\n');
  // First prompt for human-readable analysis
  const analysisPrompt = `
  Given the project filestructure this code belongs to (for more context), analyze this code file (${filePath}) and provide a clear, human-readable explanation of its key functionality and role. Format your response as follows:

  ### 1. Main purpose and responsibilities
  [Provide a concise explanation of the file's primary purpose and responsibilities within the system]

  ### 2. Key functions and their purposes (Ignore the \ (backslashes))
  - **\`functionName(param1: type, param2: type) -> returnType\`**:
    - **Inputs**: 
      - \`param1\` (type): Description of parameter.
      - \`param2\` (type): Description of parameter.
    - **Processing**: Description of what the function does internally.
    - **Output**: Description of what the function returns and its type.

  ### 3. Important interactions with other parts of the system
  [Describe how this file interacts with other modules, libraries, or components]

  ### 4. Notable features or patterns
  [Highlight any design patterns, architectural approaches, or notable implementation details]

  ### Overall
  [Provide a brief summary that ties everything together]

  Use single backticks to highlight wherever needed.
    Context:
      File tree:
      ${fileList}

      Code:
      ${content}
      `;

  const { model, modelType } = config.configurations.find(c => c.name === 'analyzeCode');
  const analysisResponse = await createChatCompletion(openai, model, modelType, analysisPrompt, null, 4000, abortSignal);

  // Define the JSON schema for metadata
  const metadataSchema = {
    type: "object",
    properties: {
      name: { type: "string" },
      path: { type: "string" },
      imports: { type: "array", items: { type: "string" } },
      mainPurpose: { type: "string" },
      type: { type: "string" },
      functions: { 
        type: "array", 
        items: { 
          type: "object",
          properties: {
            name: { type: "string" },
            purpose: { type: "string" },
            input: { type: "string" },
            output: { type: "string" }
          },
          required: ["name", "purpose"]
        } 
      },
      exports: { type: "array", items: { type: "string" } },
      dependencies: { type: "array", items: { type: "string" } },
      finalReturnType: { type: "string" }
    },
    required: ["name", "path", "mainPurpose"]
  };

  // Second prompt for JSON metadata with structured output
  const metadataPrompt = `
  Given the project filestructure this code belongs to (for more context):

  File tree:
  ${fileList}
  
  Analyze this code file (${filePath}) and provide a JSON structure containing essential technical information. 
  
  Format template:
    {
      "name": "",
      "path": "",
      "imports": [],
      "mainPurpose": "",
      "type": "",
      "functions": [{"name": "", "purpose": "", "input": "", "output": ""}],
      "exports": [],
      "dependencies": [],
      "finalReturnType(s)" : ""
    }

    Code:
    ${content}
    
    Reply only with JSON data. DO NOT use Markdown formatting/ any backticks or any additional explanation. Just return plaintext JSON data.
    Output only the JSON data, nothing else. 

    Output Example:
    {
      'JSON DATA'
    }

    `;

  const metadataResponse = await createChatCompletion(openai, model, modelType, metadataPrompt, null, 4000, abortSignal);
  
  
  let jsonMetadata;
  try {
    // Preprocess response to remove markdown code block indicators
    let responseContent = metadataResponse.choices[0].message.content;
    responseContent = responseContent.replace(/^```json\s*/, '').replace(/\s*```\s*$/, '');
    await saveApiCallContent("analyzeCode", responseContent);
    
    // With structured output, the content should already be valid JSON
    jsonMetadata = JSON.parse(responseContent);
  } catch (error) {
    console.error('Failed to parse JSON metadata:', error);
    jsonMetadata = { 
      name: path.basename(filePath),
      path: filePath,
      mainPurpose: "Extracted from text analysis",
      error: 'Failed to parse JSON metadata',
      rawText: metadataResponse.choices[0].message.content.substring(0, 200) + '...' // Include only the first 200 chars
    };
  }
  
  return {
    textAnalysis: analysisResponse.choices[0].message.content,
    jsonMetadata: jsonMetadata
  };
}

async function analyzeCallHierarchy(openai, fileMetadata, projectUnderstanding, abortSignal = null) {
  const prompt = `Analyze the following project understanding, file metadata and create a call hierarchy showing how the application flows from the entry point through various files and functions.
  Focus on the main execution path and important function calls between files.

  Project understanding:
  ${projectUnderstanding}

  File metadata:
  ${JSON.stringify(fileMetadata, null, 2)}

  Provide the call hierarchy in a clear, structured format showing:
  1. **Visual Mapping**: Create a hierarchical diagram showing function calls across the codebase
  2. **Entry Point**: Identify and highlight the main entry point file in the diagram
  3. **Execution Flow**: Trace the primary execution path through the application
  4. **Cross-File Calls**: Document significant function calls between different files
  5. **Module Dependencies**: Show how different modules depend on each other
  
  
  The visual mapping should be something like this (Example):

 \`\`\`
  🚀 app.js (ENTRY POINT)
  ┣━━ 📂 initializeApp() → Configures application [app.js]
  ┃   ┣━━ 🔧 loadConfig() → Config object [config.js]
  ┃   ┗━━ 🔌 setupDatabase() → Connection [database.js]
  ┃       ┗━━ 💾 createTables() → Success boolean [database.js]
  ┣━━ 🌐 startServer(port: Number) → Server instance [server.js]
  ┃   ┣━━ 🛡️ setupMiddleware() → Express app [middleware.js]
  ┃   ┗━━ 🔄 registerRoutes() → Router [routes.js]
  ┗━━ 📊 handleRequest(req: Request, res: Response) → Response [handlers.js]
      ┣━━ 🔍 validateInput(data: Object) → Validation result [validation.js]
      ┣━━ 📝 processData(data: Object) → Processed data [processor.js]
      ┗━━ 📤 sendResponse(result: Object) → HTTP response [response.js]
  \`\`\`
`;

  const { model, modelType } = config.configurations.find(c => c.name === 'analyzeCallHierarchy');
  const response = await createChatCompletion(openai, model, modelType, prompt, null, 5000, abortSignal);
  console.log("Call Hierarchy: ", response.choices[0].message.content);
  await saveApiCallContent("analyzeCallHierarchy", response.choices[0].message.content);
  return response.choices[0].message.content;
}

async function generateSummary(openai, analysis, abortSignal = null) {
  const prompt = `Provide a comprehensive summary of this project for a person who wants to understand how this project works and its use. 
  Based on the following metadata:
    
    Repository Info: ${JSON.stringify(analysis.repository)}
    Project Understanding: ${analysis.projectUnderstanding}
    File Tree: ${JSON.stringify(analysis.fileTree)}
    File Metadata: ${JSON.stringify(analysis.fileMetadata)}
    Call Hierarchy: ${analysis.callHierarchy}
    
  Please structure your response to include:
  1. Main purpose and functionality
  2. Tech stack and architecture
  3. Key components and their interactions
  4. Notable features
  5. Code organization and structure
  
  Begin with "This project is a..." and provide a clear, organized summary that would help a developer understand the codebase.`;

  const { model, modelType } = config.configurations.find(c => c.name === 'generateSummary');
  const response = await createChatCompletion(openai, model, modelType, prompt, null, 4000, abortSignal);
  await saveApiCallContent("generateSummary", response.choices[0].message.content);
  
  return response.choices[0].message.content;
}
