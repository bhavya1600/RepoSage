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


async function createChatCompletion(openai, model, modelType, analysisPrompt) {
  // Check model name based on modelType.
  if (modelType === "Reasoning") {
    return await openai.chat.completions.create({
      model: model,
      messages: [
        { 
          role: "system", 
          content: [
            {
              "type": "text",
              "text": "You are a senior developer with expertise in code analysis, software architecture, and multiple programming languages. Provide detailed, accurate, and insightful analysis. Use single backticks to highlight wherever needed. Follow user instructions carefully."
            }
          ]
        },
        { 
          role: "user", 
          content: [
            {
              "type": "text",
              "text": analysisPrompt
            }
          ]
        }
      ],
      temperature: 0.3,
      // include_reasoning: false,
      // show_thought_process: false,
      max_tokens: 5000
    });
  } else {
    return await openai.chat.completions.create({
      model: model,
      messages: [
        { 
          role: "system", 
          content: [
            {
              "type": "text",
              "text": "You are a senior developer with expertise in code analysis, software architecture, and multiple programming languages. Provide detailed, accurate, and insightful analysis. Use single backticks to highlight wherever needed. Follow user instructions carefully."
            }
          ]
        },
        { 
          role: "user", 
          content: [
            {
              "type": "text",
              "text": analysisPrompt
            }
          ]
        }
      ],
      temperature: 0.3,
      max_tokens: 5000
    });
  }
}



// New helper to save API call content to a TXT file
async function saveApiCallContent(functionName, content) {
  const filePath = 'apiResponsesLog.txt';
  const heading = `----- ${functionName} -----\n`;
  fs.appendFileSync(filePath, heading + content + '\n\n');
}

export async function analyzeRepository(repoUrl) {
  console.log(chalk.blue('\n📡 Initializing API clients...'));
  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
  const openai = new OpenAI({ baseURL: 'https://openrouter.ai/api/v1', apiKey: process.env.OPENROUTER_API_KEY });

  const { owner, repo } = parseGitHubUrl(repoUrl);
  console.log(chalk.blue(`\n🔍 Analyzing repository: ${owner}/${repo}`));
  
  console.log(chalk.yellow('\n📊 Fetching repository metadata...'));
  const { data: repoData } = await octokit.rest.repos.get({
    owner,
    repo,
  });
  console.log(chalk.green('✓ Repository metadata fetched'));

  console.log(chalk.yellow('\n🌳 Fetching repository file tree...'));
  const { data: treeData } = await octokit.rest.git.getTree({
    owner,
    repo,
    tree_sha: repoData.default_branch,
    recursive: 'true'
  });
  console.log(chalk.green('✓ File tree fetched'));

  const fileTree = buildFileTree(treeData.tree);
  
  // New: Get README file content if exists
  let readmeContent = "No Readme file found";
  const readmeFile = treeData.tree.find(file => file.path.toLowerCase().startsWith("readme"));
  if (readmeFile) {
    try {
      const { data: readmeData } = await octokit.rest.repos.getContent({
        owner,
        repo,
        path: readmeFile.path,
      });
      readmeContent = Buffer.from(readmeData.content, 'base64').toString();
    } catch (error) {
      console.error('Error fetching README:', error.message);
    }
  }

  console.log(chalk.yellow('\n🤔 Analyzing project structure...'));
  const projectUnderstanding = await analyzeProjectStructure(openai,repoData, treeData.tree, readmeContent);
  console.log(chalk.green('✓ Initial project understanding complete'));

  const analysis = {
    repository: repoData,
    fileTree,
    projectUnderstanding,
    fileAnalysis: [],
    fileMetadata: [],
    summary: '',
    callHierarchy: ''
  };

  const filesToAnalyze = await smartFileFilter(treeData.tree, projectUnderstanding);
  console.log(chalk.yellow(`\n📝 Analyzing ${filesToAnalyze.length} relevant files...`));

  console.log('File names to analyze:\n' + filesToAnalyze.map(file => file.path).join('\n'));

  let totalTokens = 0;
  for (const [index, file] of filesToAnalyze.entries()) {
    console.log(chalk.yellow(`\n[${index + 1}/${filesToAnalyze.length}] Analyzing: ${file.path}`));
    
    console.log(chalk.gray('  ↳ Fetching file content...'));
    const { data: fileContent } = await octokit.rest.repos.getContent({
      owner,
      repo,
      path: file.path,
    });

    const content = Buffer.from(fileContent.content, 'base64').toString();
    
    const estimatedTokens = content.length / 4;
    if (totalTokens + estimatedTokens > config.MAX_TOKENS_PER_REQUEST) {
      console.log(chalk.yellow('  ⚠️ Approaching token limit, summarizing content...'));
      const summary = await summarizeContent(openai, content, treeData.tree);
      totalTokens += summary.length / 4;
      console.log(chalk.gray('  ↳ Generating analysis from summary...'));
      const { textAnalysis, jsonMetadata } = await analyzeCode(openai, file.path, summary, treeData.tree);
      analysis.fileAnalysis.push({ path: file.path, analysis: textAnalysis });
      analysis.fileMetadata.push({ path: file.path, metadata: jsonMetadata });
    } else {
      console.log(chalk.gray('  ↳ Generating analysis...'));
      const { textAnalysis, jsonMetadata } = await analyzeCode(openai, file.path, content, treeData.tree);
      analysis.fileAnalysis.push({ path: file.path, analysis: textAnalysis });
      analysis.fileMetadata.push({ path: file.path, metadata: jsonMetadata });
      totalTokens += estimatedTokens;
    }
    console.log(chalk.green('  ✓ Analysis complete'));
  }

  console.log(chalk.yellow('\n🔄 Analyzing call hierarchy...'));
  analysis.callHierarchy = await analyzeCallHierarchy(openai, analysis.fileMetadata, projectUnderstanding);
  console.log(chalk.green('✓ Call hierarchy generated'));

  console.log(chalk.yellow('\n📋 Generating project summary...'));
  analysis.summary = await generateSummary(openai, analysis);
  console.log(chalk.green('✓ Summary generated'));
  
  return analysis;
}

async function analyzeProjectStructure(openai, repoData, files, readmeContent) {

  // Delete the API responses log file if it exists
  const apiLogPath = path.resolve(dirname(fileURLToPath(import.meta.url)), '../apiResponsesLog.txt');
  try {
    if (fs.existsSync(apiLogPath)) {
      fs.unlinkSync(apiLogPath);
      console.log(chalk.green('✓ API responses log file deleted'));
    }
  } catch (error) {
    console.error(chalk.red('Error deleting API responses log file:', error));
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

Context:
  Provided Metadata:
${JSON.stringify(repoData)}

  Provided README:
${readmeContent}

  Provided File structure:
${fileList}
`;

  const { model, modelType } = config.configurations.find(c => c.name === 'analyzeProjectStructure');
  const response = await createChatCompletion(openai, model, modelType, prompt);

  await saveApiCallContent("analyzeProjectStructure", response.choices[0].message.content); // Save API response

  return response.choices[0].message.content;
}

async function smartFileFilter(files, projectUnderstanding) {
  const openai = new OpenAI({ baseURL: 'https://openrouter.ai/api/v1', apiKey: process.env.OPENROUTER_API_KEY });
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

File List:
${filePaths.join('\n')}

Respond with ONLY a JSON array of full file paths considered essential. Format: ["path1", "path2", ...]
DO NOT use Markdown formatting or any additional explanation.`;

    const { model, modelType } = config.configurations.find(c => c.name === 'smartFileFilter');
    const response = await createChatCompletion(openai, model, modelType, prompt);

    await saveApiCallContent("smartFileFilter", response.choices[0].message.content); // Save API response
    
    // Clean the response and handle markdown formatting
    const rawResponse = response.choices[0].message.content;
    const cleanedResponse = rawResponse
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim();

    // Handle cases where response might have extra text
    const jsonString = cleanedResponse.match(/\[.*\]/s)?.[0] || '[]';
    const importantFiles = JSON.parse(jsonString);

    if (!Array.isArray(importantFiles)) {
      throw new Error('AI response format invalid');
    }

    return files.filter(file => {
      if (file.type !== 'blob' || SKIP_FILES.some(ext => file.path.toLowerCase().endsWith(ext))) {
        return false;
      }
      return importantFiles.includes(file.path);
    });

  } catch (error) {
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

async function summarizeContent(openai, content, fileTree) {
  const fileList = fileTree.map(f => f.path).join('\n');
  const prompt = `Given the file tree of the project this code belongs to:
  
  File tree:
  ${fileList}

  Summarize the key aspects of this code, focusing on its main functionality and structure:

    ${content}`;

    const { model, modelType } = config.configurations.find(c => c.name === 'summarizeContent');
    const response = await createChatCompletion(openai, model, modelType, prompt);

  await saveApiCallContent("summarizeContent", response.choices[0].message.content); // Save API response

  return response.choices[0].message.content;
}

async function analyzeCode(openai, filePath, content, fileTree) {
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

    Context:
      File tree:
      ${fileList}

      Code:
      ${content}
      `;

    const { model, modelType } = config.configurations.find(c => c.name === 'analyzeCode');
    const analysisResponse = await createChatCompletion(openai, model, modelType, analysisPrompt);

  await saveApiCallContent("analyzeCode - analysis", analysisResponse.choices[0].message.content); // Save API response

  // Second prompt for JSON metadata
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
    
    Reply only with JSON data. DO NOT use Markdown formatting or any additional explanation. Just return plaintext JSON data.
    Output only the JSON data, nothing else. 

    Output Example:
    {
      'JSON DATA'
    }

    Bad Output Example:
    \`\`\`json
    {
      'JSON DATA'
    }
    \`\`\`
    `;

    const metadataResponse = await createChatCompletion(openai, model, modelType, metadataPrompt);
 
    let jsonMetadata;
    try {
      let responseContent = metadataResponse.choices[0].message.content;
      
      // Find first { and last }
      const startIndex = responseContent.indexOf('{');
      const endIndex = responseContent.lastIndexOf('}');
      
      if (startIndex === -1 || endIndex === -1) {
        throw new Error('No valid JSON object markers found');
      }
      
    // Extract only the JSON portion
    responseContent = responseContent.substring(startIndex, endIndex + 1);
    
    jsonMetadata = JSON.parse(responseContent);
  } catch (error) {
    console.error('Failed to parse JSON metadata:', error);
    jsonMetadata = { 
      error: 'Failed to parse JSON metadata',
      rawResponse: metadataResponse.choices[0].message.content
    };
  }

  await saveApiCallContent("analyzeCode - metadata", JSON.stringify(jsonMetadata, null, 2)); // Save API response
  
  return {
    textAnalysis: analysisResponse.choices[0].message.content,
    jsonMetadata: jsonMetadata
  };
}

async function analyzeCallHierarchy(openai, fileMetadata, projectUnderstandiong) {
  const prompt = `Analyze the following project understanding, file metadata and create a call hierarchy showing how the application flows from the entry point through various files and functions.
  Focus on the main execution path and important function calls between files.

  Project understanding:
  ${projectUnderstandiong}

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
  const response = await createChatCompletion(openai, model, modelType, prompt);
  console.log("Call Hierarchy: ", response.choices[0].message.content);
  await saveApiCallContent("analyzeCallHierarchy", response.choices[0].message.content);
  return response.choices[0].message.content;
}

async function generateSummary(openai, analysis) {
  const prompt = `Provide a summary of this project for a person who wants to understand how this project works and its use. 
  Based on the following metadata:
    
    Repository Info: ${JSON.stringify(analysis.repository)}
    Project Understanding: ${analysis.projectUnderstanding}
    File Tree: ${JSON.stringify(analysis.fileTree)}
    File Metadata: ${JSON.stringify(analysis.fileMetadata)}
    Call Hierarchy: ${analysis.callHierarchy}
    
    The template to follow for response:

    "This project is a...
      1. **Main purpose and functionality**:
      2. **Tech stack and architecture**:
      3. **Key components and their interactions**:
      4. **Notable features**:
      5. **Code organization and structure**:
      Overall..."
    
    Only answer in the format stated above, nothing else, no main header, no extra information before this. Only add a one liner statement at the end that starts with "Overall,..."`;

    const { model, modelType } = config.configurations.find(c => c.name === 'generateSummary');
    const response = await createChatCompletion(openai, model, modelType, prompt);

  await saveApiCallContent("generateSummary", response.choices[0].message.content); // Save API response

  return response.choices[0].message.content;
}