# 🔍 Repository Insights 

## 📃 Project Details 
- **Name:** github-repo-bot
- **Description:** A tool to help understand Github repositories, file by file with Call Hierarchy and Summary of the project.
- **Primary Language:** JavaScript

## 👀 Project Understanding 
<details>
  <summary><strong>  Peek Under the Hood</strong></summary>

  Based on the provided file structure and repository metadata, here's a concise overview of the **GitHub Repo Bot** project:

### **Project Overview**
**GitHub Repo Bot** is a full-stack tool designed to help users understand GitHub repositories comprehensively. It provides insights into each file with call hierarchies and summarizes the overall project structure, enhancing repository navigation and comprehension.

### **Tech Stack**

- **Frontend:**
  - **Framework:** React.js
  - **Build Tool:** Vite
  - **Styling:** CSS
  - **Linting:** ESLint
  - **Key Files:**
    - `App.jsx`, `main.jsx`: Core React components.
    - `vite.config.js`: Configuration for Vite.
    - `public/`: Static assets like `vite.svg` and `react.svg`.

- **Backend:**
  - **Runtime:** Node.js
  - **Package Management:** npm (`package.json`, `package-lock.json`)
  - **Styling:** PostCSS (`postcss.config.js`)
  - **Configuration:** 
    - `openaiConfig.json`, `openaiConfigQA.json`: Likely configurations for integrating OpenAI APIs.
  - **Key Files:**
    - `index.js`: Entry point for the backend server.
    - `src/analyzer.js`: Core logic for analyzing repositories.
    - `src/utils/`: Utility modules for display, file handling, file tree generation, and GitHub interactions.

### **Architecture**

- **Modular Structure:**
  - **Frontend and Backend Separation:** Clearly divided into `frontend` and `backend` directories, ensuring a clean separation of concerns.
  
- **Backend Services:**
  - **Repository Analysis:** Utilizes scripts like `analyzer.js` to process and analyze GitHub repositories.
  - **OpenAI Integration:** Configured to interact with OpenAI services, possibly for generating summaries and call hierarchies.

- **Frontend Interface:**
  - **User Interface:** Built with React to provide an intuitive interface for users to explore repository details.
  - **Static Assets:** Managed within the `public` and `assets` directories for efficient loading and display.

### **Additional Components**

- **Configuration Files:**
  - `.gitignore`, `.vscode/extensions.json`: Standard configuration for version control and development environment.
  - `LICENSE`: MIT License, ensuring open-source distribution.
  
- **Utilities:**
  - Backend utilities (`display.js`, `file.js`, etc.) suggest functionalities for rendering data, handling files, and interacting with GitHub APIs.

### **Conclusion**

**GitHub Repo Bot** leverages a modern tech stack with React on the frontend and Node.js on the backend, integrating OpenAI services to provide in-depth analysis of GitHub repositories. Its modular architecture ensures scalability and maintainability, making it a valuable tool for developers seeking to understand and navigate complex codebases effectively.

</details>

## 🌲 Project Structure 
<details>
  <summary><strong>File Tree</strong></summary>

  📁 .vscode/
&nbsp;&nbsp;&nbsp;&nbsp;📄 [extensions.json](https://github.com/bhavya1600/github-repo-bot/blob/main/.vscode/extensions.json)
📁 backend/
&nbsp;&nbsp;&nbsp;&nbsp;📁 src/
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;📁 utils/
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;📄 [display.js](https://github.com/bhavya1600/github-repo-bot/blob/main/backend/src/utils/display.js)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;📄 [file.js](https://github.com/bhavya1600/github-repo-bot/blob/main/backend/src/utils/file.js)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;📄 [fileTree.js](https://github.com/bhavya1600/github-repo-bot/blob/main/backend/src/utils/fileTree.js)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;📄 [github.js](https://github.com/bhavya1600/github-repo-bot/blob/main/backend/src/utils/github.js)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;📄 [analyzer.js](https://github.com/bhavya1600/github-repo-bot/blob/main/backend/src/analyzer.js)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;📄 [index.css](https://github.com/bhavya1600/github-repo-bot/blob/main/backend/src/index.css)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;📄 [index.js](https://github.com/bhavya1600/github-repo-bot/blob/main/backend/src/index.js)
&nbsp;&nbsp;&nbsp;&nbsp;📄 [analysis_results.json](https://github.com/bhavya1600/github-repo-bot/blob/main/backend/analysis_results.json)
&nbsp;&nbsp;&nbsp;&nbsp;📄 [index.js](https://github.com/bhavya1600/github-repo-bot/blob/main/backend/index.js)
&nbsp;&nbsp;&nbsp;&nbsp;📄 [openaiConfig.json](https://github.com/bhavya1600/github-repo-bot/blob/main/backend/openaiConfig.json)
&nbsp;&nbsp;&nbsp;&nbsp;📄 [openaiConfigQA.json](https://github.com/bhavya1600/github-repo-bot/blob/main/backend/openaiConfigQA.json)
&nbsp;&nbsp;&nbsp;&nbsp;📄 [package-lock.json](https://github.com/bhavya1600/github-repo-bot/blob/main/backend/package-lock.json)
&nbsp;&nbsp;&nbsp;&nbsp;📄 [package.json](https://github.com/bhavya1600/github-repo-bot/blob/main/backend/package.json)
&nbsp;&nbsp;&nbsp;&nbsp;📄 [postcss.config.js](https://github.com/bhavya1600/github-repo-bot/blob/main/backend/postcss.config.js)
📁 frontend/
&nbsp;&nbsp;&nbsp;&nbsp;📁 public/
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;📄 [vite.svg](https://github.com/bhavya1600/github-repo-bot/blob/main/frontend/public/vite.svg)
&nbsp;&nbsp;&nbsp;&nbsp;📁 src/
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;📁 assets/
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;📄 [react.svg](https://github.com/bhavya1600/github-repo-bot/blob/main/frontend/src/assets/react.svg)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;📄 [App.css](https://github.com/bhavya1600/github-repo-bot/blob/main/frontend/src/App.css)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;📄 [App.jsx](https://github.com/bhavya1600/github-repo-bot/blob/main/frontend/src/App.jsx)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;📄 [index.css](https://github.com/bhavya1600/github-repo-bot/blob/main/frontend/src/index.css)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;📄 [main.jsx](https://github.com/bhavya1600/github-repo-bot/blob/main/frontend/src/main.jsx)
&nbsp;&nbsp;&nbsp;&nbsp;📄 [.gitignore](https://github.com/bhavya1600/github-repo-bot/blob/main/frontend/.gitignore)
&nbsp;&nbsp;&nbsp;&nbsp;📄 [eslint.config.js](https://github.com/bhavya1600/github-repo-bot/blob/main/frontend/eslint.config.js)
&nbsp;&nbsp;&nbsp;&nbsp;📄 [index.html](https://github.com/bhavya1600/github-repo-bot/blob/main/frontend/index.html)
&nbsp;&nbsp;&nbsp;&nbsp;📄 [package-lock.json](https://github.com/bhavya1600/github-repo-bot/blob/main/frontend/package-lock.json)
&nbsp;&nbsp;&nbsp;&nbsp;📄 [package.json](https://github.com/bhavya1600/github-repo-bot/blob/main/frontend/package.json)
&nbsp;&nbsp;&nbsp;&nbsp;📄 [README.md](https://github.com/bhavya1600/github-repo-bot/blob/main/frontend/README.md)
&nbsp;&nbsp;&nbsp;&nbsp;📄 [vite.config.js](https://github.com/bhavya1600/github-repo-bot/blob/main/frontend/vite.config.js)
📄 [.gitignore](https://github.com/bhavya1600/github-repo-bot/blob/main/.gitignore)
📄 [LICENSE](https://github.com/bhavya1600/github-repo-bot/blob/main/LICENSE)


</details>

## 📞 Call Hierarchy 
<details>
  <summary><strong>Detailed Function Call Hierarchy </strong></summary>

  

</details>

## 📈 File Analyses  

<details>
  <summary><strong>File: <a href="https://github.com/bhavya1600/github-repo-bot/blob/main/LICENSE">LICENSE</a></strong></summary>

  The `LICENSE` file contains the MIT License, which defines the terms under which the software can be used, modified, and distributed.  

**1. Main purpose and responsibilities**:  
Defines the legal permissions and limitations for using, modifying, and distributing the software.  

**2. Key functions and their purposes**:  
Not applicable (this is a legal document, not a code file).  

**3. Important interactions with other parts of the system**:  
Ensures that users and contributors understand their rights and responsibilities regarding the software's usage and distribution.  

**4. Notable features or patterns**:  
- Grants broad permissions for free use, modification, and distribution.  
- Requires attribution by including the copyright notice.  
- Disclaims warranties and liabilities to protect the author from legal claims.  

Overall, this file ensures that the project is open-source under the MIT License, allowing flexibility while protecting the author from legal risks.

  ---
</details>

<details>
  <summary><strong>File: <a href="https://github.com/bhavya1600/github-repo-bot/blob/main/backend/index.js">backend/index.js</a></strong></summary>

  This file (`backend/index.js`) sets up an Express.js server that analyzes a GitHub repository using the GitHub API and OpenAI's GPT model, then returns a structured report.

**1. Main purpose and responsibilities**:  
- Hosts an Express.js server to handle API requests.  
- Fetches repository details, structure, and recent commits from GitHub.  
- Uses OpenAI to generate a markdown-based analysis of the repository.  
- Streams updates to the client and saves the analysis to a file.  

**2. Key functions and their purposes**:  
- **`app.post('/api/analyze', async (req, res) => { ... })`**  
  - **Inputs**:  
    - `repo` (string) → GitHub repository URL  
    - `githubToken` (string) → GitHub API token  
    - `openaiToken` (string) → OpenAI API token  
  - **Processing**:  
    - Extracts repository owner and name from the URL.  
    - Initializes GitHub and OpenAI clients.  
    - Fetches repository metadata, structure, and recent commits.  
    - Sends real-time updates to the client.  
    - Requests OpenAI to generate a detailed markdown report.  
    - Saves the analysis to `analysis_results.md`.  
  - **Outputs**:  
    - Streams progress updates (string) to the client.  
    - Returns the generated markdown analysis (string).  

**3. Important interactions with other parts of the system**:  
- Uses the **GitHub API** (via `@octokit/rest`) to fetch repository details.  
- Uses **OpenAI's API** to generate a structured analysis.  
- Saves the analysis result to a file (`analysis_results.md`).  
- Uses **Express.js** to expose an API endpoint (`/api/analyze`).  

**4. Notable features or patterns**:  
- **Streaming responses**: Sends real-time updates to the client using `res.write()`.  
- **Error handling**: Catches and logs errors, ensuring proper response handling.  
- **Asynchronous operations**: Uses `async/await` for API calls and file operations.  
- **Markdown formatting**: Structures the analysis output in markdown for readability.  

Overall, this file acts as the backend API for analyzing GitHub repositories, leveraging GitHub's API for data retrieval and OpenAI for generating insightful reports.

  ---
</details>

<details>
  <summary><strong>File: <a href="https://github.com/bhavya1600/github-repo-bot/blob/main/backend/src/analyzer.js">backend/src/analyzer.js</a></strong></summary>

  This file is responsible for analyzing a GitHub repository by fetching its metadata, file structure, and content, then using OpenAI models to generate insights about the project.

**1. Main purpose and responsibilities**:  
- Fetches repository metadata and file structure from GitHub.  
- Uses OpenAI models to analyze project structure, summarize files, and generate insights.  
- Identifies important files for analysis and extracts key information.  
- Generates a call hierarchy and project summary.  

**2. Key functions and their purposes**:  
- `createChatCompletion(openai, model, modelType, analysisPrompt)`: Takes an OpenAI client, model details, and a prompt (string). Sends a request to OpenAI and returns the generated response (string).  
- `saveApiCallContent(functionName, content)`: Logs API responses to a file for debugging. Takes a function name (string) and content (string), writes to a log file, and returns nothing.  
- `analyzeRepository(repoUrl)`: Fetches repository metadata, file tree, and README content. Calls OpenAI models to analyze project structure, files, and call hierarchy. Returns an analysis object (JSON).  
- `analyzeProjectStructure(openai, repoData, files, readmeContent)`: Uses OpenAI to analyze the project structure based on metadata, README, and file list. Returns a textual project understanding (string).  
- `smartFileFilter(files, projectUnderstanding)`: Filters essential files for analysis using OpenAI. Takes a file list (array) and project understanding (string), returns a filtered file list (array).  
- `summarizeContent(openai, content, fileTree)`: Summarizes a file’s content using OpenAI. Takes file content (string) and file tree (array), returns a summary (string).  
- `analyzeCode(openai, filePath, content, fileTree)`: Analyzes a file’s functionality and metadata using OpenAI. Takes file path (string), content (string), and file tree (array), returns an object with text analysis (string) and JSON metadata.  
- `analyzeCallHierarchy(openai, fileMetadata, projectUnderstanding)`: Generates a call hierarchy using OpenAI. Takes file metadata (array) and project understanding (string), returns a structured call hierarchy (string).  
- `generateSummary(openai, analysis)`: Creates a project summary using OpenAI. Takes an analysis object (JSON), returns a structured summary (string).  

**3. Important interactions with other parts of the system**:  
- Uses `github.js` for parsing repository URLs.  
- Uses `fileTree.js` to build the repository file structure.  
- Reads configuration from `openaiConfigQA.json`.  
- Interacts with OpenAI API for AI-driven analysis.  
- Fetches repository data using GitHub’s API via Octokit.  

**4. Notable features or patterns**:  
- Uses OpenAI models for AI-driven code analysis and summarization.  
- Implements a structured pipeline for repository analysis.  
- Logs API responses for debugging and reproducibility.  
- Filters files intelligently using AI to optimize token usage.  
- Uses structured prompts for OpenAI to ensure consistent responses.  

Overall, this file serves as the core analysis engine, leveraging GitHub and OpenAI APIs to extract meaningful insights from a repository’s structure and code.

  ---
</details>

<details>
  <summary><strong>File: <a href="https://github.com/bhavya1600/github-repo-bot/blob/main/backend/src/index.js">backend/src/index.js</a></strong></summary>

  This file sets up an Express.js server to analyze GitHub repositories and serve analysis results.

**1. Main purpose and responsibilities**:  
- Hosts an Express.js API server.  
- Provides endpoints to analyze a GitHub repository and download analysis results.  

**2. Key functions and their purposes**:  
- `stripAnsiCodes(str: string) -> string`: Removes ANSI color codes from a string.  
- `app.get('/api/download-analysis')`: Serves the `analysis_results.md` file for download.  
  - Inputs: None.  
  - Processing: Reads the file from disk.  
  - Outputs: Sends the file content as a response.  
- `app.post('/api/analyze')`: Analyzes a GitHub repository and streams logs to the client.  
  - Inputs: `{ repo: string, githubToken?: string, openaiToken?: string }` from request body.  
  - Processing:  
    - Validates the repository URL.  
    - Uses provided or environment tokens.  
    - Redirects `console.log` to stream logs to the client.  
    - Calls `analyzeRepository(repo)` to perform analysis.  
    - Saves results to `analysis_results.md`.  
  - Outputs: Streams logs and analysis completion message to the client.  

**3. Important interactions with other parts of the system**:  
- Calls `analyzeRepository` from `analyzer.js` to perform repository analysis.  
- Uses `saveToFile` from `utils/file.js` to store analysis results.  
- Reads `analysis_results.md` for download functionality.  

**4. Notable features or patterns**:  
- Uses Express.js with CORS and JSON middleware.  
- Implements streaming responses for real-time log updates.  
- Dynamically modifies `console.log` to send logs to the client.  
- Uses environment variables for API tokens.  

Overall, this file is the backend entry point, handling API requests for repository analysis and result retrieval.

  ---
</details>

<details>
  <summary><strong>File: <a href="https://github.com/bhavya1600/github-repo-bot/blob/main/backend/src/utils/display.js">backend/src/utils/display.js</a></strong></summary>

  **1. Main purpose and responsibilities**:  
This file is responsible for displaying analysis results in a structured and visually appealing format using colored console output.  

**2. Key functions and their purposes**:  
- `displayResults(analysis)`:  
  - **Inputs**: `analysis` (Object) containing repository details, summary, file tree, call hierarchy, and file analyses.  
  - **Processing**: Formats and prints repository information, summary, project structure, call hierarchy, and file analyses using `chalk` for colored output. Calls `displayFileTree` to visualize the file structure.  
  - **Outputs**: Logs formatted analysis results to the console (String output).  

- `displayFileTree(node, indent)`:  
  - **Inputs**: `node` (Object representing a file or directory in the file tree), `indent` (String for indentation formatting).  
  - **Processing**: Recursively traverses the file tree, printing directories and files with appropriate indentation and icons.  
  - **Outputs**: Logs the hierarchical file structure to the console (String output).  

**3. Important interactions with other parts of the system**:  
- Uses `chalk` for colored console output.  
- Receives `analysis` data, likely generated by `backend/src/analyzer.js`.  
- Calls `displayFileTree` to format and print the repository structure.  

**4. Notable features or patterns**:  
- Uses recursion in `displayFileTree` to traverse and print hierarchical data.  
- Leverages `chalk` for enhanced readability with colors and bold text.  
- Uses emoji icons to improve visual representation of different elements.  

Overall, this file enhances the user experience by presenting analysis results in a structured, readable, and visually appealing manner in the console.

  ---
</details>

<details>
  <summary><strong>File: <a href="https://github.com/bhavya1600/github-repo-bot/blob/main/backend/src/utils/file.js">backend/src/utils/file.js</a></strong></summary>

  **1. Main purpose and responsibilities**:  
This file is responsible for saving repository analysis results in both Markdown and JSON formats, formatting file structures, and generating GitHub links for files.  

**2. Key functions and their purposes**:  
- `saveToFile(filename: string, analysis: object) -> Promise<void>`  
  - **Inputs**:  
    - `filename` (string): The name of the file to save the analysis.  
    - `analysis` (object): Contains repository details, file structure, function call hierarchy, and file analyses.  
  - **Processing**:  
    - Constructs a GitHub repository URL.  
    - Formats Markdown content with repository details, file tree, call hierarchy, and file analyses.  
    - Saves the formatted Markdown content to a file.  
    - Saves a JSON version of the metadata separately.  
  - **Outputs**:  
    - Writes a Markdown file (`.md`) and a JSON file (`.json`) to disk.  

- `formatFileTree(node: object, indent: string, repoUrl: string, branch: string, parentPath: string = '') -> string`  
  - **Inputs**:  
    - `node` (object): A file or directory node in the file tree.  
    - `indent` (string): Indentation for formatting.  
    - `repoUrl` (string): The base GitHub repository URL.  
    - `branch` (string): The repository branch name.  
    - `parentPath` (string, optional): The accumulated path of the parent directory.  
  - **Processing**:  
    - Recursively formats the file tree into a structured Markdown list.  
    - Generates GitHub links for files.  
  - **Outputs**:  
    - Returns a formatted string representing the file tree in Markdown.  

- `getFullPath(node: object) -> string`  
  - **Inputs**:  
    - `node` (object): A file or directory node.  
  - **Processing**:  
    - Retrieves the full path of a file or directory.  
    - If `node.path` exists, it returns that; otherwise, it reconstructs the path using parent references.  
  - **Outputs**:  
    - Returns a string representing the full file path.  

**3. Important interactions with other parts of the system**:  
- Uses `fs/promises` to write analysis results to files.  
- Works with `backend/src/analyzer.js` (likely the source of `analysis` data).  
- Generates GitHub links using repository details from `analysis.repository`.  
- Formats file structures, possibly interacting with `backend/src/utils/fileTree.js`.  

**4. Notable features or patterns**:  
- Uses async/await for file operations.  
- Recursively processes file trees for structured output.  
- Encodes file paths for GitHub links.  
- Uses Markdown `<details>` tags for collapsible sections.  

Overall, this file plays a crucial role in exporting repository analysis results in a structured and readable format, making it easier to review project insights and navigate the file structure via GitHub links.

  ---
</details>

<details>
  <summary><strong>File: <a href="https://github.com/bhavya1600/github-repo-bot/blob/main/backend/src/utils/fileTree.js">backend/src/utils/fileTree.js</a></strong></summary>

  This file constructs a hierarchical file tree structure from a list of file paths and sorts it for better organization.  

**1. Main purpose and responsibilities**:  
- Converts a flat list of file paths into a structured tree representation.  
- Ensures directories are correctly identified and structured.  
- Sorts the tree with directories appearing before files and in alphabetical order.  

**2. Key functions and their purposes**:  
- `buildFileTree(files)`:  
  - **Inputs**: `files` (Array of objects, each containing `path` (String) and `type` (String, either 'file' or 'directory')).  
  - **Processing**: Iterates through file paths, breaking them into parts to construct a nested tree structure. Ensures directories are correctly identified and prevents conflicts between files and directories with the same name.  
  - **Outputs**: Returns a structured file tree object (JSON-like format) with nested `children` objects.  

- `sortFileTree(node)`:  
  - **Inputs**: `node` (Object representing a directory or file in the tree).  
  - **Processing**: Recursively sorts the children of a node, ensuring directories appear before files and all entries are sorted alphabetically.  
  - **Outputs**: Returns a sorted version of the input node (Object).  

**3. Important interactions with other parts of the system**:  
- Likely used in conjunction with `backend/src/utils/file.js` for file-related operations.  
- May be utilized in `backend/src/analyzer.js` to process and analyze file structures.  
- Could be exposed to the frontend for displaying a structured file tree in the UI.  

**4. Notable features or patterns**:  
- Uses recursion to build and sort the tree structure.  
- Ensures directories are correctly identified even if they were initially misclassified as files.  
- Implements a sorting mechanism that prioritizes directories over files for better readability.  

Overall, this module plays a crucial role in organizing and structuring file data, ensuring a clear hierarchical representation that can be used for display or further processing.

  ---
</details>

<details>
  <summary><strong>File: <a href="https://github.com/bhavya1600/github-repo-bot/blob/main/backend/src/utils/github.js">backend/src/utils/github.js</a></strong></summary>

  This file provides utility functions for handling GitHub repository URLs.  

**1. Main purpose and responsibilities**:  
This module is responsible for parsing GitHub repository URLs and extracting relevant details like the repository owner and name.  

**2. Key functions and their purposes**:  
- `parseGitHubUrl(url: string) -> { owner: string, repo: string }`  
  - **Inputs**: A GitHub repository URL (string).  
  - **Processing**:  
    - Parses the URL using the `URL` constructor.  
    - Extracts the repository owner and name from the pathname.  
    - Removes `.git` from the repository name if present.  
    - Throws an error if the URL format is invalid.  
  - **Outputs**: An object containing `owner` (string) and `repo` (string).  

**3. Important interactions with other parts of the system**:  
- Likely used in other backend modules to extract repository details when interacting with GitHub APIs or processing GitHub-related data.  

**4. Notable features or patterns**:  
- Uses JavaScript's `URL` constructor for robust URL parsing.  
- Implements error handling to ensure valid GitHub URLs.  

Overall, this utility function ensures that GitHub repository URLs are correctly parsed and formatted for further processing in the system.

  ---
</details>

<details>
  <summary><strong>File: <a href="https://github.com/bhavya1600/github-repo-bot/blob/main/frontend/eslint.config.js">frontend/eslint.config.js</a></strong></summary>

  This file configures ESLint for the frontend, ensuring code quality and enforcing best practices, particularly for JavaScript and React.  

**1. Main purpose and responsibilities**:  
- Defines ESLint rules and settings for the frontend project.  
- Ensures consistent coding standards, detects potential errors, and enforces best practices for JavaScript and React.  

**2. Key functions and their purposes**:  
- **ESLint Configuration Object**:  
  - **Inputs**: Accepts JavaScript and JSX files (`**/*.{js,jsx}`).  
  - **Processing**:  
    - Sets ECMAScript version to the latest.  
    - Defines global browser variables.  
    - Configures ESLint plugins for React, React Hooks, and React Refresh.  
    - Applies recommended rules from ESLint, React, and React Hooks.  
    - Disables `react/jsx-no-target-blank` rule.  
    - Warns when components are not exported correctly for React Refresh.  
  - **Outputs**: Provides ESLint rules and settings for linting JavaScript and React code.  

**3. Important interactions with other parts of the system**:  
- Works with the frontend's JavaScript and JSX files to enforce linting rules.  
- Uses ESLint plugins (`eslint-plugin-react`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`) to apply React-specific linting.  
- Ignores the `dist` directory to prevent linting built files.  

**4. Notable features or patterns**:  
- Uses ESLint's recommended configurations for JavaScript and React.  
- Supports modern ECMAScript features and JSX.  
- Ensures React Hooks are used correctly.  
- Integrates React Refresh for better development experience with hot reloading.  

Overall, this file ensures high code quality in the frontend by enforcing best practices and preventing common issues in JavaScript and React development.

  ---
</details>

<details>
  <summary><strong>File: <a href="https://github.com/bhavya1600/github-repo-bot/blob/main/frontend/index.html">frontend/index.html</a></strong></summary>

  The `index.html` file serves as the main entry point for the frontend, providing the root container for the React application and linking to the main JavaScript file.  

**1. Main purpose and responsibilities**:  
This file initializes the frontend by defining the root HTML structure and loading the React application via `main.jsx`.  

**2. Key functions and their purposes**:  
- This file does not contain JavaScript functions but serves as the base HTML document.  
- It includes a `<div id="root"></div>` where React mounts the application.  
- It loads the main React entry point (`/src/main.jsx`) as a module script.  

**3. Important interactions with other parts of the system**:  
- It interacts with `frontend/src/main.jsx`, which initializes the React app and renders components into the `#root` div.  
- It references `/vite.svg` for the favicon.  

**4. Notable features or patterns**:  
- Uses the `<!doctype html>` declaration for modern HTML5 compliance.  
- Loads the script as a module (`type="module"`) to support ES module imports.  
- Includes a `<meta name="viewport" />` tag for responsive design.  

Overall, this file acts as the foundational HTML structure for the React application, ensuring the app is mounted and displayed properly in the browser.

  ---
</details>

<details>
  <summary><strong>File: <a href="https://github.com/bhavya1600/github-repo-bot/blob/main/frontend/src/App.jsx">frontend/src/App.jsx</a></strong></summary>

  This file defines the main frontend component for a GitHub repository analysis tool, handling user input, API communication, and displaying progress logs.

**1. Main purpose and responsibilities**:  
- Provides a user interface for submitting a GitHub repository URL and optional API tokens.  
- Sends the repository details to a backend API for analysis and displays real-time progress logs.  
- Allows users to download the analysis results once the process is complete.  

**2. Key functions and their purposes**:  
- `handleSubmit(e: Event) -> void`:  
  - Prevents default form submission, initializes loading state, and clears logs.  
  - Sends a POST request to `http://localhost:5000/api/analyze` with repository details.  
  - Reads the response stream, processes log messages, and updates the UI accordingly.  
  - Handles errors and updates the state when the analysis is complete.  

- `handleDownload() -> void`:  
  - Sends a request to `http://localhost:5000/api/download-analysis`.  
  - If successful, creates a downloadable link for the analysis results file (`analysis_results.md`).  
  - Handles errors and updates logs if the download fails.  

**3. Important interactions with other parts of the system**:  
- Communicates with the backend (`backend/index.js`) via API endpoints (`/api/analyze` and `/api/download-analysis`).  
- Uses React state (`useState`) to manage user input, logs, and UI states.  
- Dynamically updates the UI based on API responses and user interactions.  

**4. Notable features or patterns**:  
- Uses React hooks (`useState`) for state management.  
- Implements streaming response handling for real-time log updates.  
- Provides a clean and interactive UI with form validation and conditional button states.  

Overall, this component serves as the main interface for users to analyze GitHub repositories, integrating frontend logic with backend API calls while maintaining a responsive and user-friendly experience.

  ---
</details>

<details>
  <summary><strong>File: <a href="https://github.com/bhavya1600/github-repo-bot/blob/main/frontend/src/main.jsx">frontend/src/main.jsx</a></strong></summary>

  **1. Main purpose and responsibilities**:  
This file serves as the entry point for the React frontend application, rendering the root component (`App.jsx`) into the DOM.  

**2. Key functions and their purposes**:  
- `createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>)`  
  - **Inputs**:  
    - `document.getElementById('root')`: Retrieves the root DOM element where the React app will be mounted.  
    - `<StrictMode><App /></StrictMode>`: Wraps the main `App` component inside React's `StrictMode` for highlighting potential issues.  
  - **Processing**:  
    - Uses `createRoot` from `react-dom/client` to create a concurrent rendering root.  
    - Calls `.render()` to mount the `App` component inside the root DOM element.  
  - **Outputs**:  
    - Renders the React application inside the specified DOM element (`root`).  

**3. Important interactions with other parts of the system**:  
- Imports `App` from `App.jsx`, which serves as the main component of the frontend.  
- Imports `index.css` to apply global styles to the application.  
- Uses `StrictMode` to enforce best practices and detect potential issues in the React component tree.  

**4. Notable features or patterns**:  
- Uses React 18's `createRoot` API for improved rendering performance.  
- Wraps the application in `StrictMode`, which helps catch potential problems during development.  
- Keeps the entry point minimal, focusing only on mounting the root component.  

Overall, this file is responsible for bootstrapping the React frontend by rendering the `App` component into the DOM, ensuring best practices with `StrictMode`, and applying global styles.

  ---
</details>

<details>
  <summary><strong>File: <a href="https://github.com/bhavya1600/github-repo-bot/blob/main/frontend/vite.config.js">frontend/vite.config.js</a></strong></summary>

  The `vite.config.js` file configures Vite, a fast frontend build tool, for a React-based project.  

**1. Main purpose and responsibilities**:  
This file sets up Vite to work with React by defining necessary plugins and configurations for the development and build process.  

**2. Key functions and their purposes**:  
- `defineConfig(config: object) -> object`:  
  - Expects a configuration object.  
  - Processes and returns a structured configuration for Vite.  
  - In this case, it includes the React plugin to enable JSX and other React-specific optimizations.  

**3. Important interactions with other parts of the system**:  
- Uses `@vitejs/plugin-react` to integrate React with Vite.  
- Affects how the frontend (`frontend/src`) is built and served during development and production.  

**4. Notable features or patterns**:  
- Uses Vite’s `defineConfig` function for better TypeScript support and structured configuration.  
- Implements a plugin-based architecture, allowing easy extension of Vite’s functionality.  

Overall, this file ensures that Vite properly handles React files, optimizing development speed and build performance.

  ---
</details>


## ✒️ Project Summary 
This project is a **GitHub repository analysis tool** that helps users understand repositories by providing file-by-file insights, call hierarchies, and project summaries.  

1. **Main purpose and functionality**:  
   - Analyzes GitHub repositories to extract metadata, file structures, and code relationships.  
   - Uses OpenAI to generate summaries, call hierarchies, and insights for better project comprehension.  
   - Provides a frontend interface for users to input repository details and view analysis results.  

2. **Tech stack and architecture**:  
   - **Frontend**: React.js with Vite for fast development, styled using CSS, and linted with ESLint.  
   - **Backend**: Node.js with Express, integrating GitHub API and OpenAI for repository analysis.  
   - **Storage & Config**: Uses JSON files for OpenAI configurations and analysis results.  

3. **Key components and their interactions**:  
   - **Frontend (React)**: Handles user input, sends API requests, and displays analysis results.  
   - **Backend (Node.js & Express)**: Fetches repository data, processes it using OpenAI, and returns structured insights.  
   - **Utility Modules**: Handle file processing (`file.js`), GitHub API interactions (`github.js`), and structured file tree generation (`fileTree.js`).  

4. **Notable features**:  
   - **AI-powered analysis**: Uses OpenAI to generate summaries and call hierarchies.  
   - **Real-time streaming updates**: Sends live progress updates during repository analysis.  
   - **Downloadable reports**: Allows users to save analysis results as markdown or JSON files.  
   - **File tree visualization**: Displays a structured view of the repository's file hierarchy.  

5. **Code organization and structure**:  
   - **Frontend (`frontend/`)**: Contains React components, assets, and configuration files.  
   - **Backend (`backend/`)**: Includes API server (`index.js`), repository analyzer (`analyzer.js`), and utility scripts.  
   - **Utilities (`backend/src/utils/`)**: Modular helper functions for file handling, GitHub API calls, and display formatting.  
   - **Configuration & Metadata**: `.gitignore`, `LICENSE`, and OpenAI configuration files.  

Overall, **GitHub Repo Bot** is a powerful tool that simplifies repository exploration by leveraging AI-driven insights, structured file analysis, and an intuitive frontend for seamless navigation.