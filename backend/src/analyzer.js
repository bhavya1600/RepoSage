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
const configPath = resolve(__dirname, '../openaiConfig.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

console.log("Loaded config from:", configPath);


// Replace 'fileToDelete.txt' with the name of your file
// const fileName = 'apiResponsesLog.txt';

// const projectRoot = path.resolve(__dirname, '..');
// const filePath = path.join(projectRoot, fileName);

// if (fs.existsSync(filePath)) {
//   fs.unlink(filePath, (err) => {
//     if (err) {
//       console.error(`Error deleting ${fileName}:`, err);
//     } else {
//       console.log(`${fileName} has been deleted successfully.`);
//     }
//   });
// } else {
//   console.log(`File ${fileName} does not exist in the project root.`);
// }


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
  if (modelType === "reasoning") {
    if (!model.startsWith("o")) {
      throw new Error("For reasoning models, the model name must start with 'o'.");
    }
    return await openai.chat.completions.create({
      model: model,
      messages: [{ role: "user", content: analysisPrompt }],
      temperature: 1,
      max_completion_tokens: 2000
    });
  } else {
    if (model.startsWith("o")) {
      throw new Error("For non reasoning models, the model name must not start with 'o'.");
    }
    return await openai.chat.completions.create({
      model: model,
      messages: [{ role: "user", content: analysisPrompt }],
      temperature: 0.3,
      max_tokens: 4000
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
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

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
  const fileList = files.map(f => f.path).join('\n');
  // console.log(chalk.green('File list:\n' + fileList));
  const prompt = `You are a senior developer with knowledge of almost all programming languages, frameworks, project types, Github Expert.
Provided Metadata:
${JSON.stringify(repoData)}

  Provided README:
${readmeContent}

Analyze this repository's file structure and provide a brief understanding of the project.
Focus on identifying the main components, tech stack, and architecture based on the file names and structure.
Keep the response concise.

File structure:
${fileList}`;

  const { model, modelType } = config.configurations.find(c => c.name === 'analyzeProjectStructure');
  const response = await createChatCompletion(openai, model, modelType, prompt);
  // const response = await openai.chat.completions.create({
  //   model: "o1-mini-2024-09-12",
  //   messages: [{ role: "user", content: prompt }],
  //   temperature: 1,
  //   max_completion_tokens: 2000
  // });

  await saveApiCallContent("analyzeProjectStructure", response.choices[0].message.content); // Save API response

  return response.choices[0].message.content;
}

async function smartFileFilter(files, projectUnderstanding) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const filePaths = files.map(f => f.path);

  try {
    const prompt = `You are a senior developer with knowledge of almost all programming languages, frameworks, project types, Github Expert. Analyze the project structure and identify all the essential files needed to understand this codebase, especially the logical flow of the project. Ignore .md files.
Project Type Analysis:
${projectUnderstanding}

File List:
${filePaths.join('\n')}

Respond with ONLY a JSON array of full file paths considered essential. Format: ["path1", "path2", ...]
DO NOT use Markdown formatting or any additional explanation.`;

    const { model, modelType } = config.configurations.find(c => c.name === 'smartFileFilter');
    const response = await createChatCompletion(openai, model, modelType, prompt);

    // const response = await openai.chat.completions.create({
    //   model: "o1-mini-2024-09-12",
    //   messages: [{ role: "user", content: prompt }],
    //   temperature: 1,
    //   max_completion_tokens: 2000
    // });

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
  const prompt = `You are a senior developer with knowledge of almost all programming languages, frameworks, project types, Github Expert. Given the file tree of the project this code belongs to:
  
  File tree:
  ${fileList}

  Summarize the key aspects of this code, focusing on its main functionality and structure:

    ${content}`;

    const { model, modelType } = config.configurations.find(c => c.name === 'summarizeContent');
    const response = await createChatCompletion(openai, model, modelType, prompt);
  // const response = await openai.chat.completions.create({
  //   model: "chatgpt-4o-latest",
  //   messages: [{ role: "user", content: prompt }],
  //   temperature: 0.3,
  //   max_tokens: 1000
  // });
  await saveApiCallContent("summarizeContent", response.choices[0].message.content); // Save API response

  return response.choices[0].message.content;
}

async function analyzeCode(openai, filePath, content, fileTree) {
  const fileList = fileTree.map(f => f.path).join('\n');
  // First prompt for human-readable analysis
  const analysisPrompt = `You are a senior developer with knowledge of almost all programming languages, frameworks, project types, Github Expert. 
  Given the project filestructure this code belongs to (for more context):

  File tree:
  ${fileList}

  Analyze this code file (${filePath}) and provide a clear, human-readable explanation of its key functionality and role. Only respond in the following format, no texts more or less than this scope:
    Give a one or two liner description of the code file.
    **1. Main purpose and responsibilities**: 
    **2. Key functions and their purposes**: (Format: This function expects these inputs, their datatypes, does this processing and then returns/ outputs this data and its datatype)
    **3. Important interactions with other parts of the system**: 
    **4. Notable features or patterns**: 
    Overall...

    Code:
    ${content}`;

    const { model, modelType } = config.configurations.find(c => c.name === 'analyzeCode');
    const analysisResponse = await createChatCompletion(openai, model, modelType, analysisPrompt);

  // const analysisResponse = await openai.chat.completions.create({
  //   model: "chatgpt-4o-latest",
  //   messages: [{ role: "user", content: analysisPrompt }],
  //   temperature: 0.3,
  //   max_tokens: 1000
  // });

  await saveApiCallContent("analyzeCode - analysis", analysisResponse.choices[0].message.content); // Save API response

  // Second prompt for JSON metadata
  const metadataPrompt = `You are a senior developer with knowledge of almost all programming languages, frameworks, project types, Github Expert. 
  Given the project filestructure this code belongs to (for more context):

  File tree:
  ${fileList}
  
  Analyze this code file (${filePath}) and provide a JSON structure containing essential technical information. Format template:
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
    
    Reply only with JSON data so we can read it using (given metadataResponse is your response.): jsonMetadata = JSON.parse(metadataResponse.choices[0].message.content)
    DO NOT use Markdown formatting or any additional explanation.
    `;

   const metadataResponse = await createChatCompletion(openai, model, modelType, metadataPrompt);
  // const metadataResponse = await openai.chat.completions.create({
  //   model: "chatgpt-4o-latest",
  //   messages: [{ role: "user", content: metadataPrompt }],
  //   temperature: 0.3,
  //   max_tokens: 2000
  // });

  // console.log(metadataResponse.choices[0].message.content);

  // let jsonMetadata;
  // try {
  //   jsonMetadata = JSON.parse(metadataResponse.choices[0].message.content);
  // } catch (error) {
  //   jsonMetadata = { error: 'Failed to parse JSON metadata' };
  // }
  await saveApiCallContent("analyzeCode - metadata", metadataResponse.choices[0].message.content); // Save API response
  
  return {
    textAnalysis: analysisResponse.choices[0].message.content,
    jsonMetadata: metadataResponse.choices[0].message.content
  };
}

async function analyzeCallHierarchy(openai, fileMetadata, projectUnderstandiong) {
  const prompt = `You are a senior developer with knowledge of almost all programming languages, frameworks, project types, Github Expert. Analyze the following project understanding, file metadata and create a call hierarchy showing how the application flows from the entry point through various files and functions.
    Focus on the main execution path and important function calls between files.

    Project understanding:
    ${projectUnderstandiong}

    File metadata:
    ${JSON.stringify(fileMetadata, null, 2)}

    Provide the call hierarchy in a clear, structured format showing:
    1. A visual mapping of function calls
    2. Entry point file
    3. Main execution flow
    4. Important function calls between files
    5. Dependencies between modules
    
    
    The visual mapping should be something like this:
    
    📁 rootFunction(param1: Type) → ReturnType [src/rootFile.js]
    ├─ 🔷 childFunction1(arg1: Type) → ReturnType [src/childFile1.js]
    │   ├─ 🟣 subFunction1(a: Type) → ReturnType [src/subFile1.js]
    │   └️─ 🟠 subFunction2() → ReturnType [src/subFile2.js]
    └─ 🔶 childFunction2(data: Type) → ReturnType [src/childFile2.js]
      ├─ 🟢 subFunction3(config: Type) → ReturnType [src/subFile3.js]
      ├─ 🔴 subFunction4(option1: Type) → ReturnType [src/subFile4.js]
      └─ 🟣 subFunction5(info: Type) → ReturnType [src/subFile5.js]

`;
    
    const { model, modelType } = config.configurations.find(c => c.name === 'analyzeCallHierarchy');
    const response = await createChatCompletion(openai, model, modelType, prompt);
  // const response = await openai.chat.completions.create({
  //   model: "o1-mini-2024-09-12",
  //   messages: [{ role: "user", content: prompt }],
  //   temperature: 1,
  //   max_completion_tokens: 5000
  // });

  await saveApiCallContent("analyzeCallHierarchy", response.choices[0].message.content); // Save API response

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
  // const response = await openai.chat.completions.create({
  //   model: "chatgpt-4o-latest",
  //   messages: [{ role: "user", content: prompt }],
  //   temperature: 0.3,
  //   max_tokens: 5000
  // });

  await saveApiCallContent("generateSummary", response.choices[0].message.content); // Save API response

  return response.choices[0].message.content;
}