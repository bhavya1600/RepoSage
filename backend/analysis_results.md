# Repository Insights 📓🔍

## Project Details 📃
- **Name:** RepoSage
- **Description:** A tool to help understand Github repositories, file by file with Call Hierarchy and Summary of the project.
- **Primary Language:** JavaScript

## Project Understanding 🤓
<details>
  <summary><strong>Peek Under the Hood 👀</strong></summary>

  **RepoSage** is a comprehensive GitHub repository analysis tool structured with a clear separation between frontend and backend components. Here's a concise overview of its main components, tech stack, and architecture based on the provided file structure:

---

### **Main Components**

1. **Backend**
   - **Purpose**: Handles repository analysis, including fetching data from GitHub, processing files, generating call hierarchies, and interfacing with the OpenAI API for AI-powered summaries.
   - **Key Files & Directories**:
     - `index.js`: Entry point for the backend server, likely setting up Express.js routes and middleware.
     - `analyzer.js`: Core module responsible for analyzing repository data.
     - `openaiConfig.json` & `openaiConfigQA.json`: Configuration files for OpenAI API settings, allowing customization of model usage and token management.
     - `utils/`: Contains utility scripts such as `github.js` for GitHub API interactions, `file.js` and `fileTree.js` for file handling, and `display.js` for formatting outputs.
     - `package.json` & `package-lock.json`: Manage backend dependencies.
     - `postcss.config.js`: Configuration for PostCSS, suggesting CSS preprocessing is utilized.

2. **Frontend**
   - **Purpose**: Provides a user-friendly interface for users to input GitHub repository URLs, initiate analysis, and view the generated insights and summaries.
   - **Key Files & Directories**:
     - `App.jsx` & `App.css`: Main React component and its styling.
     - `main.jsx`: Entry point for the React application.
     - `assets/`: Contains static assets like images (`react.svg`, `vite.svg`).
     - `public/`: Holds the `index.html` and other public-facing assets.
     - `vite.config.js`: Configuration for Vite, enabling fast development and optimized builds.
     - `package.json` & `package-lock.json`: Manage frontend dependencies.
     - `eslint.config.js`: ESLint configuration ensuring code quality and consistency.

3. **Configuration & Support Files**
   - `.gitignore`: Specifies files and directories to be ignored by Git.
   - `.vscode/`: Contains VS Code specific settings and recommended extensions (`extensions.json`).
   - `README.md` & `LICENSE`: Provide project documentation and licensing information.

---

### **Tech Stack**

- **Backend**:
  - **Language**: JavaScript (Node.js)
  - **Framework**: Express.js
  - **APIs**: GitHub API for repository data, OpenAI API for AI-driven analysis and summarization
  - **Utilities**: Custom scripts for file handling and data processing

- **Frontend**:
  - **Library**: React
  - **Build Tool**: Vite for rapid development and efficient builds
  - **Styling**: CSS, with PostCSS integration for advanced CSS processing

- **Development Tools**:
  - **Code Quality**: ESLint for linting
  - **Version Control**: Git, with configurations tailored for both backend and frontend environments

---

### **Architecture**

- **Modular Structure**: Clear separation between backend and frontend directories, promoting maintainability and scalability.
  
- **API-Driven Communication**: The frontend interacts with the backend through RESTful APIs to fetch analysis results and display them to users.
  
- **AI Integration**: Utilizes OpenAI's APIs within the backend to generate intelligent summaries and insights, enhancing the depth of repository analysis.
  
- **Configuration Management**: Uses environment variables (`.env` files) and configuration JSON files to manage sensitive information and customizable settings, ensuring flexibility and security.
  
- **Logging & Monitoring**: Backend logs API responses (`apiResponsesLog.txt`) for transparency and debugging purposes, aiding in maintenance and issue resolution.

---

Overall, **RepoSage** leverages a modern JavaScript ecosystem with Node.js and React to deliver a robust tool for in-depth GitHub repository analysis. Its architecture emphasizes modularity, efficient development workflows, and intelligent data processing to provide users with comprehensive insights into their projects.

</details>

## Project Structure 🏯
<details>
  <summary><strong>File Tree🌲</strong></summary>

  📁 .vscode/
&nbsp;&nbsp;&nbsp;&nbsp;📄 [extensions.json](https://github.com/bhavya1600/RepoSage/blob/main/.vscode/extensions.json)
📁 backend/
&nbsp;&nbsp;&nbsp;&nbsp;📁 src/
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;📁 utils/
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;📄 [display.js](https://github.com/bhavya1600/RepoSage/blob/main/backend/src/utils/display.js)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;📄 [file.js](https://github.com/bhavya1600/RepoSage/blob/main/backend/src/utils/file.js)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;📄 [fileTree.js](https://github.com/bhavya1600/RepoSage/blob/main/backend/src/utils/fileTree.js)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;📄 [github.js](https://github.com/bhavya1600/RepoSage/blob/main/backend/src/utils/github.js)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;📄 [analyzer.js](https://github.com/bhavya1600/RepoSage/blob/main/backend/src/analyzer.js)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;📄 [index.css](https://github.com/bhavya1600/RepoSage/blob/main/backend/src/index.css)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;📄 [index.js](https://github.com/bhavya1600/RepoSage/blob/main/backend/src/index.js)
&nbsp;&nbsp;&nbsp;&nbsp;📄 [analysis_results.json](https://github.com/bhavya1600/RepoSage/blob/main/backend/analysis_results.json)
&nbsp;&nbsp;&nbsp;&nbsp;📄 [analysis_results.md](https://github.com/bhavya1600/RepoSage/blob/main/backend/analysis_results.md)
&nbsp;&nbsp;&nbsp;&nbsp;📄 [index.js](https://github.com/bhavya1600/RepoSage/blob/main/backend/index.js)
&nbsp;&nbsp;&nbsp;&nbsp;📄 [openaiConfig.json](https://github.com/bhavya1600/RepoSage/blob/main/backend/openaiConfig.json)
&nbsp;&nbsp;&nbsp;&nbsp;📄 [openaiConfigQA.json](https://github.com/bhavya1600/RepoSage/blob/main/backend/openaiConfigQA.json)
&nbsp;&nbsp;&nbsp;&nbsp;📄 [package-lock.json](https://github.com/bhavya1600/RepoSage/blob/main/backend/package-lock.json)
&nbsp;&nbsp;&nbsp;&nbsp;📄 [package.json](https://github.com/bhavya1600/RepoSage/blob/main/backend/package.json)
&nbsp;&nbsp;&nbsp;&nbsp;📄 [postcss.config.js](https://github.com/bhavya1600/RepoSage/blob/main/backend/postcss.config.js)
📁 frontend/
&nbsp;&nbsp;&nbsp;&nbsp;📁 public/
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;📄 [vite.svg](https://github.com/bhavya1600/RepoSage/blob/main/frontend/public/vite.svg)
&nbsp;&nbsp;&nbsp;&nbsp;📁 src/
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;📁 assets/
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;📄 [react.svg](https://github.com/bhavya1600/RepoSage/blob/main/frontend/src/assets/react.svg)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;📄 [App.css](https://github.com/bhavya1600/RepoSage/blob/main/frontend/src/App.css)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;📄 [App.jsx](https://github.com/bhavya1600/RepoSage/blob/main/frontend/src/App.jsx)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;📄 [index.css](https://github.com/bhavya1600/RepoSage/blob/main/frontend/src/index.css)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;📄 [main.jsx](https://github.com/bhavya1600/RepoSage/blob/main/frontend/src/main.jsx)
&nbsp;&nbsp;&nbsp;&nbsp;📄 [.gitignore](https://github.com/bhavya1600/RepoSage/blob/main/frontend/.gitignore)
&nbsp;&nbsp;&nbsp;&nbsp;📄 [eslint.config.js](https://github.com/bhavya1600/RepoSage/blob/main/frontend/eslint.config.js)
&nbsp;&nbsp;&nbsp;&nbsp;📄 [index.html](https://github.com/bhavya1600/RepoSage/blob/main/frontend/index.html)
&nbsp;&nbsp;&nbsp;&nbsp;📄 [package-lock.json](https://github.com/bhavya1600/RepoSage/blob/main/frontend/package-lock.json)
&nbsp;&nbsp;&nbsp;&nbsp;📄 [package.json](https://github.com/bhavya1600/RepoSage/blob/main/frontend/package.json)
&nbsp;&nbsp;&nbsp;&nbsp;📄 [README.md](https://github.com/bhavya1600/RepoSage/blob/main/frontend/README.md)
&nbsp;&nbsp;&nbsp;&nbsp;📄 [vite.config.js](https://github.com/bhavya1600/RepoSage/blob/main/frontend/vite.config.js)
📄 [.gitignore](https://github.com/bhavya1600/RepoSage/blob/main/.gitignore)
📄 [LICENSE](https://github.com/bhavya1600/RepoSage/blob/main/LICENSE)
📄 [README.md](https://github.com/bhavya1600/RepoSage/blob/main/README.md)


</details>

## Call Hierarchy 📞
<details>
  <summary><strong>Detailed Function Call Hierarchy 🪜</strong></summary>

  

</details>

## File Analyses 📈 

<details>
  <summary><strong>File: <a href="https://github.com/bhavya1600/RepoSage/blob/main/backend/index.js">backend/index.js</a></strong></summary>

  This file sets up an Express.js backend server that analyzes a given GitHub repository using the GitHub API and OpenAI's GPT model, then generates a markdown report.

**1. Main purpose and responsibilities**:  
- Provides an API endpoint (`/api/analyze`) to analyze a GitHub repository.  
- Fetches repository details, structure, and recent commits using the GitHub API.  
- Uses OpenAI's GPT model to generate a detailed markdown report on the repository.  
- Streams progress updates to the client and saves the analysis to a file.  

**2. Key functions and their purposes**:  
- **POST `/api/analyze`**:  
  - **Inputs**: `repo` (string, GitHub repo URL), `githubToken` (string, GitHub API token), `openaiToken` (string, OpenAI API key).  
  - **Processing**:  
    - Extracts repo owner and name from the URL.  
    - Initializes GitHub and OpenAI clients.  
    - Fetches repo details, file structure, and recent commits.  
    - Sends this data to OpenAI for analysis.  
    - Streams progress updates to the client.  
    - Saves the generated markdown report to `analysis_results.md`.  
  - **Outputs**: Streams progress messages (string) and the final markdown report (string).  

**3. Important interactions with other parts of the system**:  
- Uses `Octokit` to interact with the GitHub API for fetching repo details, contents, and commits.  
- Uses `OpenAI` to generate a markdown report based on the fetched data.  
- Writes the analysis result to `analysis_results.md` in the backend directory.  
- Uses Express.js and CORS to handle API requests from the frontend.  

**4. Notable features or patterns**:  
- **Streaming responses**: Uses `res.write()` to send real-time updates to the client.  
- **Error handling**: Catches errors and ensures responses are sent even if an error occurs.  
- **Asynchronous operations**: Uses `async/await` for API calls and file operations.  
- **Middleware usage**: Uses `express.json()` and `cors()` for handling JSON requests and cross-origin requests.  

Overall, this file serves as the backend API for analyzing GitHub repositories, integrating GitHub and OpenAI APIs, and providing real-time progress updates to the client.

  ---
</details>

<details>
  <summary><strong>File: <a href="https://github.com/bhavya1600/RepoSage/blob/main/backend/src/analyzer.js">backend/src/analyzer.js</a></strong></summary>

  This file (`backend/src/analyzer.js`) is responsible for analyzing a GitHub repository's structure, extracting metadata, filtering relevant files, and using OpenAI models to generate insights about the project.

### **1. Main purpose and responsibilities**:  
- Fetches repository metadata and file structure from GitHub.  
- Uses OpenAI models to analyze project structure, summarize files, and generate insights.  
- Filters important files for analysis and determines call hierarchy.  
- Generates a structured summary of the project.  

### **2. Key functions and their purposes**:  
- `createChatCompletion(openai, model, modelType, analysisPrompt)`:  
  - **Inputs**: OpenAI instance, model name (string), model type (string), analysis prompt (string).  
  - **Processing**: Calls OpenAI's API to generate a response based on the given prompt.  
  - **Output**: Returns the AI-generated response (string).  

- `saveApiCallContent(functionName, content)`:  
  - **Inputs**: Function name (string), content (string).  
  - **Processing**: Saves API responses to a log file.  
  - **Output**: None (writes to file).  

- `analyzeRepository(repoUrl)`:  
  - **Inputs**: GitHub repository URL (string).  
  - **Processing**: Fetches repository metadata, retrieves file tree, analyzes project structure, filters files, and generates insights using OpenAI.  
  - **Output**: Returns an analysis object containing repository details, file analysis, metadata, and summary (object).  

- `analyzeProjectStructure(openai, repoData, files, readmeContent)`:  
  - **Inputs**: OpenAI instance, repository metadata (object), list of files (array), README content (string).  
  - **Processing**: Uses OpenAI to analyze the project structure based on file names and README content.  
  - **Output**: Returns a textual summary of the project structure (string).  

- `smartFileFilter(files, projectUnderstanding)`:  
  - **Inputs**: List of repository files (array), project understanding (string).  
  - **Processing**: Uses OpenAI to determine essential files for analysis. Falls back to manual filtering if AI fails.  
  - **Output**: Returns a filtered list of important files (array).  

- `summarizeContent(openai, content, fileTree)`:  
  - **Inputs**: OpenAI instance, file content (string), file tree (array).  
  - **Processing**: Uses OpenAI to generate a summary of the file’s functionality.  
  - **Output**: Returns a summarized version of the file content (string).  

- `analyzeCode(openai, filePath, content, fileTree)`:  
  - **Inputs**: OpenAI instance, file path (string), file content (string), file tree (array).  
  - **Processing**: Uses OpenAI to generate a human-readable explanation and structured metadata for the file.  
  - **Output**: Returns an object containing text analysis (string) and JSON metadata (string).  

- `analyzeCallHierarchy(openai, fileMetadata, projectUnderstanding)`:  
  - **Inputs**: OpenAI instance, file metadata (array), project understanding (string).  
  - **Processing**: Uses OpenAI to generate a call hierarchy of function interactions.  
  - **Output**: Returns a structured call hierarchy (string).  

- `generateSummary(openai, analysis)`:  
  - **Inputs**: OpenAI instance, analysis object (object).  
  - **Processing**: Uses OpenAI to generate a structured summary of the project.  
  - **Output**: Returns a textual project summary (string).  

### **3. Important interactions with other parts of the system**:  
- Uses `Octokit` to interact with the GitHub API for fetching repository data and file contents.  
- Uses `OpenAI` to analyze code, summarize content, and generate insights.  
- Imports utility functions from `utils/github.js` and `utils/fileTree.js` for parsing GitHub URLs and building file trees.  
- Reads configuration from `openaiConfig.json` to determine model settings.  

### **4. Notable features or patterns**:  
- **AI-Powered Analysis**: Uses OpenAI models to analyze project structure, summarize files, and generate insights.  
- **Smart File Filtering**: Dynamically selects important files using AI or fallback logic.  
- **Call Hierarchy Generation**: Constructs a structured execution flow of the project.  
- **Logging API Responses**: Saves OpenAI responses for debugging and reference.  
- **Error Handling & Fallbacks**: Implements fallback mechanisms in case AI filtering fails.  

### **Overall**  
This file serves as the core logic for analyzing a GitHub repository, leveraging GitHub API and OpenAI models to extract meaningful insights, summarize code, and generate structured reports about the project's structure and execution flow.

  ---
</details>

<details>
  <summary><strong>File: <a href="https://github.com/bhavya1600/RepoSage/blob/main/backend/src/index.js">backend/src/index.js</a></strong></summary>

  This file sets up an Express.js backend server that provides API endpoints for analyzing a GitHub repository and serving the analysis results.

**1. Main purpose and responsibilities**:  
- Hosts an Express.js server to handle API requests.  
- Provides an endpoint to analyze a GitHub repository and stream logs to the client.  
- Serves the analysis results as a downloadable file.  

**2. Key functions and their purposes**:  
- `stripAnsiCodes(str: string) -> string`: Removes ANSI color codes from log messages before sending them to the client.  
- `app.get('/api/download-analysis')`:  
  - Inputs: HTTP request.  
  - Processing: Reads the `analysis_results.md` file and sends it as a response.  
  - Outputs: Markdown file content (text/markdown).  
- `app.post('/api/analyze')`:  
  - Inputs: JSON body containing `{ repo: string, githubToken?: string, openaiToken?: string }`.  
  - Processing:  
    - Validates the repository URL.  
    - Uses provided or environment tokens.  
    - Redirects `console.log` to stream logs to the client.  
    - Calls `analyzeRepository(repo)` to perform analysis.  
    - Saves results to `analysis_results.md`.  
  - Outputs: Streams logs, signals analysis completion, and sends errors if any.  

**3. Important interactions with other parts of the system**:  
- Calls `analyzeRepository` from `analyzer.js` to perform repository analysis.  
- Uses `saveToFile` from `utils/file.js` to store analysis results.  
- Reads `analysis_results.md` to serve it as a downloadable file.  
- Uses environment variables from `.env` for API tokens.  

**4. Notable features or patterns**:  
- Uses Express.js with CORS and JSON middleware.  
- Implements streaming responses to send real-time logs to the client.  
- Overrides `console.log` to capture and send logs dynamically.  
- Gracefully restores `console.log` in case of errors.  

Overall, this file is the core backend server that facilitates repository analysis by handling API requests, executing the analysis process, and serving the results efficiently.

  ---
</details>

<details>
  <summary><strong>File: <a href="https://github.com/bhavya1600/RepoSage/blob/main/backend/src/utils/display.js">backend/src/utils/display.js</a></strong></summary>

  This file is responsible for displaying analysis results in a structured and visually appealing format using colored console output.  

**1. Main purpose and responsibilities**:  
- Formats and prints repository analysis results to the console in a readable way.  
- Uses color coding (via `chalk`) to enhance readability.  
- Displays repository metadata, summary, project structure, call hierarchy, and file-specific analyses.  

**2. Key functions and their purposes**:  
- `displayResults(analysis)`:  
  - **Inputs**: `analysis` (Object) containing repository details, summary, file tree, call hierarchy, and file analyses.  
  - **Processing**: Prints repository metadata, summary, project structure, call hierarchy, and file-specific analyses using `console.log` with `chalk` for styling. Calls `displayFileTree` to visualize the file structure.  
  - **Outputs**: Logs formatted analysis results to the console (no return value).  

- `displayFileTree(node, indent)`:  
  - **Inputs**: `node` (Object) representing a file or directory in the project structure, `indent` (String) for formatting indentation.  
  - **Processing**: Recursively traverses the file tree, printing directories with an 📁 icon and files with a 📄 icon, applying indentation for hierarchy visualization.  
  - **Outputs**: Logs the structured file tree to the console (no return value).  

**3. Important interactions with other parts of the system**:  
- Receives `analysis` data from the backend analysis process (likely generated by `analyzer.js`).  
- Uses `displayFileTree` to recursively print the project structure.  
- Outputs results that reference `analysis_results.md` and `analysis_results.json`, which are likely generated elsewhere in the backend.  

**4. Notable features or patterns**:  
- Uses `chalk` for colored and bold console output, improving readability.  
- Implements recursion in `displayFileTree` to handle nested directories dynamically.  
- Uses emojis (📊, 📁, 📄) to make the output visually distinct and user-friendly.  

Overall, this file enhances the presentation of repository analysis results, making them more readable and structured for developers reviewing the output.

  ---
</details>

<details>
  <summary><strong>File: <a href="https://github.com/bhavya1600/RepoSage/blob/main/backend/src/utils/file.js">backend/src/utils/file.js</a></strong></summary>

  **1. Main purpose and responsibilities**:  
This module handles saving analysis results to both Markdown (`.md`) and JSON (`.json`) files, while also formatting file structures and generating GitHub links for repository files.  

**2. Key functions and their purposes**:  
- `saveToFile(filename: string, analysis: object) -> Promise<void>`  
  - **Inputs**:  
    - `filename` (string): The name of the file to save the Markdown content.  
    - `analysis` (object): Contains repository details, project insights, file structures, and analysis results.  
  - **Processing**:  
    - Constructs a GitHub repository URL.  
    - Formats the analysis data into a structured Markdown report.  
    - Saves the Markdown report to the specified file.  
    - Extracts key metadata and saves it separately as a JSON file.  
  - **Outputs**: Saves analysis results in `.md` and `.json` formats.  

- `formatFileTree(node: object, indent: string, repoUrl: string, branch: string, parentPath?: string) -> string`  
  - **Inputs**:  
    - `node` (object): Represents a file or directory in the project structure.  
    - `indent` (string): Formatting indentation for display.  
    - `repoUrl` (string): Base GitHub repository URL.  
    - `branch` (string): Repository branch name.  
    - `parentPath` (optional string): The accumulated path of the parent directory.  
  - **Processing**:  
    - Recursively formats the file tree into a readable structure.  
    - Generates clickable GitHub links for files.  
  - **Outputs**: Returns a formatted string representing the file tree.  

- `getFullPath(node: object) -> string`  
  - **Inputs**:  
    - `node` (object): A file or directory node.  
  - **Processing**:  
    - Retrieves the full path of a file or directory.  
    - If `node.path` exists, it is used directly; otherwise, the path is reconstructed from parent references.  
  - **Outputs**: Returns the full file path as a string.  

**3. Important interactions with other parts of the system**:  
- Uses `fs/promises` to write analysis results to files.  
- Interacts with `analysis` data, which likely originates from `backend/src/analyzer.js`.  
- Generates GitHub links for files, suggesting integration with `backend/src/utils/github.js`.  
- Uses `fileTree` data, possibly processed by `backend/src/utils/fileTree.js`.  

**4. Notable features or patterns**:  
- Uses async/await for file operations to ensure non-blocking execution.  
- Implements recursive tree traversal for formatting file structures.  
- Encodes file paths for GitHub URLs to handle special characters.  
- Uses Markdown `<details>` tags for collapsible sections, improving readability.  

Overall, this module is responsible for saving structured analysis reports, formatting file structures, and ensuring repository files are easily accessible via GitHub links.

  ---
</details>

<details>
  <summary><strong>File: <a href="https://github.com/bhavya1600/RepoSage/blob/main/backend/src/utils/fileTree.js">backend/src/utils/fileTree.js</a></strong></summary>

  **1. Main purpose and responsibilities**:  
This module constructs a hierarchical file tree structure from a list of file paths and ensures the tree is sorted with directories appearing before files.  

**2. Key functions and their purposes**:  
- `buildFileTree(files)`:  
  - **Inputs**: `files` (array of objects, each containing `path` (string) and `type` (string, either 'file' or 'directory')).  
  - **Processing**: Iterates through the file paths, splitting them into parts and constructing a nested tree structure where directories contain child elements. Ensures that if a directory was mistakenly identified as a file, it is corrected.  
  - **Outputs**: Returns a sorted hierarchical file tree object with `name`, `type`, and `children` properties (object).  

- `sortFileTree(node)`:  
  - **Inputs**: `node` (object representing a directory or file in the tree).  
  - **Processing**: Recursively sorts the children of each directory, ensuring directories appear before files and all entries are sorted alphabetically.  
  - **Outputs**: Returns a sorted version of the input file tree node (object).  

**3. Important interactions with other parts of the system**:  
- Likely interacts with `backend/src/utils/file.js` for file-related operations.  
- May be used in `backend/src/analyzer.js` or other backend logic to structure and display file system data.  
- Could be utilized in `backend/src/utils/display.js` to present the file tree in a readable format.  

**4. Notable features or patterns**:  
- Uses a recursive approach to construct and sort the file tree.  
- Ensures directories are prioritized over files when sorting.  
- Handles cases where a file is mistakenly treated as a directory and corrects it dynamically.  

Overall, this module is responsible for transforming a flat list of file paths into a structured, sorted file tree, making it easier to navigate and process file system data.

  ---
</details>

<details>
  <summary><strong>File: <a href="https://github.com/bhavya1600/RepoSage/blob/main/backend/src/utils/github.js">backend/src/utils/github.js</a></strong></summary>

  This file provides utility functions for handling GitHub repository URLs.  

**1. Main purpose and responsibilities**:  
This module is responsible for parsing GitHub repository URLs to extract the repository owner and name in a structured format.  

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
- Likely used in other backend utilities or API handlers to extract repository details from user-provided GitHub URLs.  
- May interact with functions that fetch repository data or analyze repository contents.  

**4. Notable features or patterns**:  
- Uses `URL` API for robust URL parsing.  
- Implements error handling to ensure valid GitHub URLs.  
- Removes `.git` suffix for cleaner repository names.  

Overall, this function ensures that GitHub repository URLs are correctly parsed and standardized for further processing in the system.

  ---
</details>

<details>
  <summary><strong>File: <a href="https://github.com/bhavya1600/RepoSage/blob/main/frontend/eslint.config.js">frontend/eslint.config.js</a></strong></summary>

  The `eslint.config.js` file configures ESLint for the frontend, ensuring code quality and enforcing best practices, particularly for JavaScript and React.  

**1. Main purpose and responsibilities**:  
This file sets up ESLint for the frontend, specifying linting rules, plugins, and configurations to enforce coding standards and prevent common errors in JavaScript and React code.  

**2. Key functions and their purposes**:  
- The configuration object defines:  
  - `ignores`: Specifies files (`dist/`) to be ignored.  
  - `files`: Targets JavaScript and JSX files for linting.  
  - `languageOptions`: Sets ECMAScript version, global variables, and parser options.  
  - `settings`: Defines React version (`18.3`).  
  - `plugins`: Includes ESLint plugins for React, React Hooks, and React Refresh.  
  - `rules`: Merges recommended rules from ESLint, React, and React Hooks, while customizing specific rules (e.g., disabling `react/jsx-no-target-blank` and configuring `react-refresh/only-export-components`).  

**3. Important interactions with other parts of the system**:  
- Ensures consistent coding standards in `frontend/src/` files.  
- Works with ESLint plugins (`eslint-plugin-react`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`) to enforce React-specific best practices.  
- Helps maintain code quality and prevent runtime errors in React components.  

**4. Notable features or patterns**:  
- Uses a modular ESLint configuration approach with plugins and recommended rule sets.  
- Supports modern ECMAScript features (`ecmaVersion: 'latest'`).  
- Customizes specific React rules for better development flexibility.  

Overall, this file ensures that the frontend codebase adheres to best practices, reducing potential bugs and improving maintainability.

  ---
</details>

<details>
  <summary><strong>File: <a href="https://github.com/bhavya1600/RepoSage/blob/main/frontend/index.html">frontend/index.html</a></strong></summary>

  The `index.html` file serves as the main entry point for the frontend, providing the base HTML structure and linking to the React application.  

**1. Main purpose and responsibilities**:  
This file initializes the frontend by defining the root HTML structure and loading the React application via `main.jsx`.  

**2. Key functions and their purposes**:  
- This file does not contain functions but serves as a static entry point that:  
  - Loads the React app by including `<script type="module" src="/src/main.jsx"></script>`.  
  - Provides a `<div id="root"></div>` where React mounts the application.  

**3. Important interactions with other parts of the system**:  
- It interacts with `frontend/src/main.jsx`, which initializes the React app and renders it inside the `#root` div.  
- It references `/vite.svg` as the favicon.  

**4. Notable features or patterns**:  
- Uses the `<!doctype html>` declaration for modern HTML standards.  
- Includes `<meta>` tags for character encoding and viewport settings for responsiveness.  
- Uses Vite’s module-based script loading for efficient bundling and development.  

Overall, this file acts as the foundational HTML structure for the frontend, ensuring that the React application is properly initialized and displayed in the browser.

  ---
</details>

<details>
  <summary><strong>File: <a href="https://github.com/bhavya1600/RepoSage/blob/main/frontend/src/App.jsx">frontend/src/App.jsx</a></strong></summary>

  This file defines the main frontend component for a GitHub repository analysis tool, handling user input, API requests, and displaying progress logs.

**1. Main purpose and responsibilities**:  
- Provides a UI for users to input a GitHub repository URL and optional API tokens.  
- Sends requests to a backend API to analyze the repository.  
- Displays real-time progress logs and allows users to download the analysis results.  

**2. Key functions and their purposes**:  
- `handleSubmit(e: Event) -> void`:  
  - Prevents form submission default behavior.  
  - Sends a POST request to `http://localhost:5000/api/analyze` with repository details.  
  - Reads and processes streamed response logs, updating UI accordingly.  
- `handleDownload() -> void`:  
  - Fetches the analysis results from `http://localhost:5000/api/download-analysis`.  
  - Creates a downloadable link for the results file (`analysis_results.md`).  

**3. Important interactions with other parts of the system**:  
- Communicates with the backend API (`backend/index.js`) for repository analysis and result retrieval.  
- Uses React state (`useState`) to manage form inputs, logs, and UI updates.  
- Dynamically updates UI based on backend responses.  

**4. Notable features or patterns**:  
- Uses React hooks (`useState`) for state management.  
- Implements streaming response handling for real-time log updates.  
- Provides a clean UI with form validation and conditional button states.  

Overall, this file serves as the main user interface for initiating and monitoring GitHub repository analysis, ensuring smooth interaction with the backend.

  ---
</details>

<details>
  <summary><strong>File: <a href="https://github.com/bhavya1600/RepoSage/blob/main/frontend/src/main.jsx">frontend/src/main.jsx</a></strong></summary>

  **1. Main purpose and responsibilities**:  
This file serves as the entry point for the React frontend application, initializing and rendering the root React component (`App`) into the DOM.  

**2. Key functions and their purposes**:  
- `createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>)`:  
  - **Inputs**:  
    - `document.getElementById('root')`: Retrieves the DOM element with the ID `root` (HTMLElement).  
  - **Processing**:  
    - Uses React's `createRoot` API to create a root container for rendering the React application.  
    - Wraps the `App` component in `<StrictMode>`, which helps identify potential issues in the application during development.  
  - **Outputs**:  
    - Renders the `App` component inside the `root` DOM element (no return value).  

**3. Important interactions with other parts of the system**:  
- Imports `App` from `./App.jsx`, which serves as the main component of the application.  
- Imports `index.css` for global styling.  
- Uses `StrictMode` from React to enforce best practices and detect potential issues.  

**4. Notable features or patterns**:  
- Uses React 18's `createRoot` API instead of the older `ReactDOM.render`, improving performance and concurrency support.  
- Wraps the application in `StrictMode`, which helps catch potential problems in development.  

Overall, this file is essential for bootstrapping the React frontend, ensuring that the `App` component is properly rendered into the DOM with best practices in place.

  ---
</details>

<details>
  <summary><strong>File: <a href="https://github.com/bhavya1600/RepoSage/blob/main/frontend/vite.config.js">frontend/vite.config.js</a></strong></summary>

  The `vite.config.js` file configures Vite, a fast frontend build tool, for a React-based project.  

**1. Main purpose and responsibilities**:  
This file sets up Vite to work with React by defining necessary plugins and configurations for the development and build process.  

**2. Key functions and their purposes**:  
- `defineConfig({ plugins: [react()] })`:  
  - **Inputs**: An object with a `plugins` array containing `react()`.  
  - **Processing**: Uses Vite’s `defineConfig` function to structure the configuration and includes the React plugin to enable JSX and other React-specific optimizations.  
  - **Outputs**: Exports the Vite configuration object.  

**3. Important interactions with other parts of the system**:  
- Works with `frontend/package.json` where dependencies like `vite` and `@vitejs/plugin-react` are defined.  
- Affects how `frontend/src/main.jsx` and other React components are processed and served during development.  

**4. Notable features or patterns**:  
- Uses `defineConfig` for better TypeScript support and structured configuration.  
- Includes `@vitejs/plugin-react` to enable React-specific optimizations.  

Overall, this file ensures that Vite properly handles React files, optimizing the development experience and build process.

  ---
</details>


## Project Summary ✒️
This project is a **GitHub repository analysis tool** that helps users understand repositories file by file, providing summaries and call hierarchies using AI.  

1. **Main purpose and functionality**:  
   - RepoSage fetches and analyzes GitHub repositories, generating structured insights, summaries, and call hierarchies.  
   - It leverages the GitHub API to retrieve repository data and the OpenAI API to generate AI-powered explanations.  
   - Users input a GitHub repository URL, and the tool processes its structure, key files, and dependencies to provide a comprehensive analysis.  

2. **Tech stack and architecture**:  
   - **Backend**: Built with Node.js and Express.js, it handles API requests, fetches repository data, and processes it using OpenAI.  
   - **Frontend**: Developed with React and Vite, it provides an interactive UI for users to input repository URLs and view analysis results.  
   - **APIs**: GitHub API for repository data retrieval and OpenAI API for AI-driven summaries and insights.  
   - **Development tools**: ESLint for code quality, PostCSS for styling, and Git for version control.  

3. **Key components and their interactions**:  
   - **Backend**:  
     - `index.js`: Sets up the Express server and API routes.  
     - `analyzer.js`: Handles repository analysis, including metadata extraction and AI-powered insights.  
     - `utils/`: Contains helper modules for GitHub API interactions, file handling, and display formatting.  
   - **Frontend**:  
     - `App.jsx`: Main React component handling user input and API communication.  
     - `main.jsx`: Entry point rendering the React application.  
     - `vite.config.js`: Configures Vite for optimized builds.  

4. **Notable features**:  
   - **AI-powered analysis**: Uses OpenAI to generate summaries and call hierarchies for better repository understanding.  
   - **File-by-file breakdown**: Analyzes individual files, filtering essential ones for deeper inspection.  
   - **Call hierarchy visualization**: Provides insights into function calls and dependencies within the project.  
   - **Real-time updates**: Streams analysis progress to the frontend for an interactive experience.  
   - **Downloadable reports**: Allows users to save analysis results in Markdown and JSON formats.  

5. **Code organization and structure**:  
   - **Modular architecture**: Clear separation between backend (Node.js) and frontend (React).  
   - **Utility modules**: Dedicated helper functions for GitHub API interactions, file handling, and display formatting.  
   - **Configuration management**: Uses `.env` files and JSON configurations for API settings and customization.  
   - **Logging and debugging**: Maintains logs of API responses for transparency and troubleshooting.  

Overall, RepoSage is a powerful tool that simplifies GitHub repository analysis by leveraging AI to generate structured insights, making it easier for developers to understand and navigate complex codebases.