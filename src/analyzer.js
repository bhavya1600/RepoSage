import { Octokit } from 'octokit';
import { OpenAI } from 'openai';
import { parseGitHubUrl } from './utils/github.js';
import { buildFileTree } from './utils/fileTree.js';
import chalk from 'chalk';

const MAX_TOKENS_PER_REQUEST = 10000;
const SKIP_FILES = [
  '.css', '.scss', '.less',
  '.svg', '.png', '.jpg', '.jpeg', '.gif', '.ico',
  '.json', '.lock',
  '.md', '.txt',
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
  
  console.log(chalk.yellow('\n🤔 Analyzing project structure...'));
  const projectUnderstanding = await analyzeProjectStructure(openai, treeData.tree);
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

  const filesToAnalyze = smartFileFilter(treeData.tree, projectUnderstanding);
  console.log(chalk.yellow(`\n📝 Analyzing ${filesToAnalyze.length} relevant files...`));

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
    if (totalTokens + estimatedTokens > MAX_TOKENS_PER_REQUEST) {
      console.log(chalk.yellow('  ⚠️ Approaching token limit, summarizing content...'));
      const summary = await summarizeContent(openai, content);
      totalTokens += summary.length / 4;
      console.log(chalk.gray('  ↳ Generating analysis from summary...'));
      const { textAnalysis, jsonMetadata } = await analyzeCode(openai, file.path, summary);
      analysis.fileAnalysis.push({ path: file.path, analysis: textAnalysis });
      analysis.fileMetadata.push({ path: file.path, metadata: jsonMetadata });
    } else {
      console.log(chalk.gray('  ↳ Generating analysis...'));
      const { textAnalysis, jsonMetadata } = await analyzeCode(openai, file.path, content);
      analysis.fileAnalysis.push({ path: file.path, analysis: textAnalysis });
      analysis.fileMetadata.push({ path: file.path, metadata: jsonMetadata });
      totalTokens += estimatedTokens;
    }
    console.log(chalk.green('  ✓ Analysis complete'));
  }

  console.log(chalk.yellow('\n🔄 Analyzing call hierarchy...'));
  analysis.callHierarchy = await analyzeCallHierarchy(openai, analysis.fileMetadata);
  console.log(chalk.green('✓ Call hierarchy generated'));

  console.log(chalk.yellow('\n📋 Generating project summary...'));
  analysis.summary = await generateSummary(openai, analysis);
  console.log(chalk.green('✓ Summary generated'));
  
  return analysis;
}

async function analyzeProjectStructure(openai, files) {
  const fileList = files.map(f => f.path).join('\n');
  const prompt = `Analyze this repository's file structure and provide a brief understanding of the project.
    Focus on identifying the main components, tech stack, and architecture based on the file names and structure.
    Keep the response concise.

    File structure:
    ${fileList}`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini-2024-07-18",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.3,
    max_tokens: 500
  });

  return response.choices[0].message.content;
}

function smartFileFilter(files, projectUnderstanding) {
  return files.filter(file => {
    if (file.type !== 'blob' || SKIP_FILES.some(ext => file.path.toLowerCase().endsWith(ext))) {
      return false;
    }

    if (IMPORTANT_FILES.some(name => file.path.toLowerCase().includes(name))) {
      return true;
    }

    const isSourceFile = file.path.match(/\.(js|jsx|ts|tsx|py|java|go|rb|php|cs)$/i);
    if (isSourceFile) {
      return true;
    }

    if (file.path.match(/^(src|app|lib)\//)) {
      return true;
    }

    return false;
  });
}

async function summarizeContent(openai, content) {
  const prompt = `Summarize the key aspects of this code, focusing on its main functionality and structure:

    ${content}`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini-2024-07-18",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.3,
    max_tokens: 2000
  });

  return response.choices[0].message.content;
}

async function analyzeCode(openai, filePath, content) {
  // First prompt for human-readable analysis
  const analysisPrompt = `Analyze this code file (${filePath}) and provide a clear, human-readable explanation of its key functionality and role. Focus on:
    1. Main purpose and responsibilities
    2. Key functions and their purposes
    3. Important interactions with other parts of the system
    4. Notable features or patterns

    Code:
    ${content}`;

  const analysisResponse = await openai.chat.completions.create({
    model: "gpt-4o-mini-2024-07-18",
    messages: [{ role: "user", content: analysisPrompt }],
    temperature: 0.3,
    max_tokens: 2000
  });

  // Second prompt for JSON metadata
  const metadataPrompt = `Analyze this code file (${filePath}) and provide a JSON structure containing essential technical information. Include:
    {
      "imports": [],
      "exports": [],
      "functions": [{"name": "", "purpose": ""}],
      "dependencies": [],
      "mainPurpose": "",
      "type": ""
    }

    Code:
    ${content}`;

  const metadataResponse = await openai.chat.completions.create({
    model: "gpt-4o-mini-2024-07-18",
    messages: [{ role: "user", content: metadataPrompt }],
    temperature: 0.3,
    max_tokens: 2000
  });

  let jsonMetadata;
  try {
    jsonMetadata = JSON.parse(metadataResponse.choices[0].message.content);
  } catch (error) {
    jsonMetadata = { error: 'Failed to parse JSON metadata' };
  }

  return {
    textAnalysis: analysisResponse.choices[0].message.content,
    jsonMetadata
  };
}

async function analyzeCallHierarchy(openai, fileMetadata) {
  const prompt = `Analyze the following file metadata and create a call hierarchy showing how the application flows from the entry point through various files and functions.
    Focus on the main execution path and important function calls between files.

    File metadata:
    ${JSON.stringify(fileMetadata, null, 2)}

    Provide the call hierarchy in a clear, structured format showing:
    1. Entry point file
    2. Main execution flow
    3. Important function calls between files
    4. Dependencies between modules
    5. A mapping of function calls`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini-2024-07-18",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.3,
    max_tokens: 10000
  });

  return response.choices[0].message.content;
}

async function generateSummary(openai, analysis) {
  const prompt = `Provide a concise summary of this project based on the following metadata:
    
    Repository Info: ${JSON.stringify(analysis.repository)}
    File Metadata: ${JSON.stringify(analysis.fileMetadata)}
    Call Hierarchy: ${analysis.callHierarchy}
    
    Key points to cover:
    1. Main purpose and functionality
    2. Tech stack and architecture
    3. Key components and their interactions
    4. Notable features
    5. Code organization and structure`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini-2024-07-18",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.3,
    max_tokens: 10000
  });

  return response.choices[0].message.content;
}