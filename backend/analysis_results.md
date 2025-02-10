# 🔍 Repository Insights

## 📃 Project Details 
- **Name:** RepoSage
- **Description:** A tool to help understand Github repositories, file by file with Call Hierarchy and Summary of the project.
- **Primary Language:** JavaScript

## 🤓 Project Understanding 
<details>
  <summary><strong>Peek Under the Hood 👀</strong></summary>

  **Repository Overview: RepoSage**

**Main Components:**
1. **Backend (`backend/`):**
   - **Core Functionality:** 
     - Handles repository analysis by interacting with GitHub and OpenAI APIs.
     - Manages AI-powered insights, call hierarchy generation, and file-by-file breakdowns.
   - **Key Files:**
     - `analyzer.js`: Primary script for performing analysis tasks.
     - `openaiConfig.json` & `openaiConfigQA.json`: Configuration files for OpenAI API interactions.
     - `utils/`: Contains utility modules for display handling, file management, file tree construction, and GitHub API interactions.
     - `nodemon.json`: Configuration for automatic server restarts during development.
     - `analysis_results.json` & `analysis_results.md`: Stores analysis outputs.

2. **Frontend (`frontend/`):**
   - **User Interface:**
     - Built with React, providing a responsive and modern web interface for users to input GitHub repository URLs and view analysis results.
   - **Key Files:**
     - `App.jsx` & `main.jsx`: Core React components.
     - `vite.config.js`: Configuration for Vite, the build tool optimizing frontend performance.
     - `assets/`: Contains static assets like images (e.g., `react.svg`, `vite.svg`).

**Tech Stack:**
- **Backend:**
  - **Language:** JavaScript (Node.js)
  - **Framework:** Express.js (implied from common practices)
  - **APIs:** GitHub API for repository data, OpenAI API for AI-driven analysis
  - **Utilities:** Custom scripts for handling API interactions and data processing
  - **Tools:** Nodemon for development, PostCSS for CSS processing

- **Frontend:**
  - **Library:** React
  - **Build Tool:** Vite for fast development and optimized builds
  - **Styling:** CSS, managed with PostCSS
  - **Tools:** ESLint for code linting

**Architecture:**
- **Modular Separation:** Clear division between backend and frontend, allowing independent development and deployment.
- **API-Driven Communication:** Frontend interacts with the backend via RESTful APIs to request repository analyses and retrieve results.
- **AI Integration:** Backend leverages OpenAI's APIs to perform deep, multi-step analyses and generate insightful summaries.
- **Utility Management:** Backend utilities streamline interactions with external APIs and handle file and data management efficiently.
- **Configuration Management:** Separate configuration files (`openaiConfig.json`, `nodemon.json`, etc.) facilitate easy adjustments to API settings and development workflows.

**Conclusion:**
RepoSage is a well-architected tool combining a Node.js backend with a React frontend to deliver comprehensive, AI-powered analyses of GitHub repositories. Its modular design, robust tech stack, and integration with powerful APIs ensure scalability, maintainability, and a seamless user experience.

</details>

## 🌲 Project Structure 
<details>
  <summary><strong>File Tree</strong></summary>

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
&nbsp;&nbsp;&nbsp;&nbsp;📄 [nodemon.json](https://github.com/bhavya1600/RepoSage/blob/main/backend/nodemon.json)
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

## 📞 Call Hierarchy 
<details>
  <summary><strong>Detailed Function Call Hierarchy</strong></summary>

  

</details>

## 📈 File Analyses  

<details>
  <summary><strong>File: <a href="https://github.com/bhavya1600/RepoSage/blob/main/backend/src/analyzer.js">backend/src/analyzer.js</a></strong></summary>

  This file is responsible for analyzing a GitHub repository by fetching its metadata, file structure, and content, then using OpenAI models to generate insights about the project.  

**1. Main purpose and responsibilities**:  
- Fetches repository metadata and file structure from GitHub.  
- Uses OpenAI models to analyze project structure, summarize files, and generate insights.  
- Filters relevant files for analysis and constructs a call hierarchy.  
- Generates a final project summary based on the analysis.  

**2. Key functions and their purposes**:  
- `createChatCompletion(openai, model, modelType, analysisPrompt)`: Takes an OpenAI instance, model name (string), model type (string), and prompt (string), then generates a response using OpenAI's chat completion API. Returns the AI-generated response (string).  
- `saveApiCallContent(functionName, content)`: Saves API responses to a log file. Takes a function name (string) and content (string), writes to a file, and returns nothing.  
- `analyzeRepository(repoUrl)`: Fetches repository metadata, file tree, and README content, then analyzes the project structure and relevant files. Takes a repository URL (string) and returns an analysis object (JSON).  
- `analyzeProjectStructure(openai, repoData, files, readmeContent)`: Uses OpenAI to generate an understanding of the project's structure. Takes an OpenAI instance, repository metadata (JSON), file list (array), and README content (string). Returns a project summary (string).  
- `smartFileFilter(files, projectUnderstanding)`: Uses OpenAI to filter essential files for analysis. Takes a file list (array) and project understanding (string), returns an array of important files (JSON).  
- `summarizeContent(openai, content, fileTree)`: Summarizes a file's content using OpenAI. Takes an OpenAI instance, file content (string), and file tree (array), returns a summary (string).  
- `analyzeCode(openai, filePath, content, fileTree)`: Analyzes a file's code and extracts metadata. Takes an OpenAI instance, file path (string), content (string), and file tree (array). Returns an object with text analysis (string) and JSON metadata.  
- `analyzeCallHierarchy(openai, fileMetadata, projectUnderstanding)`: Constructs a call hierarchy of the project. Takes an OpenAI instance, file metadata (JSON), and project understanding (string). Returns a structured call hierarchy (string).  
- `generateSummary(openai, analysis)`: Generates a final project summary. Takes an OpenAI instance and analysis object (JSON), returns a formatted project summary (string).  

**3. Important interactions with other parts of the system**:  
- Uses `github.js` to parse repository URLs.  
- Uses `fileTree.js` to construct the repository's file structure.  
- Reads OpenAI configuration from `openaiConfigQA.json`.  
- Fetches repository data using GitHub's API via `Octokit`.  
- Calls OpenAI's API for various analyses.  

**4. Notable features or patterns**:  
- Uses OpenAI models dynamically based on predefined configurations.  
- Implements a structured approach to analyzing repositories, filtering files, and summarizing content.  
- Handles API rate limits and token constraints by summarizing content when necessary.  
- Logs API responses for debugging and traceability.  

Overall, this file automates repository analysis by integrating GitHub API and OpenAI models, extracting insights into project structure, key files, and execution flow.

  ---
</details>

<details>
  <summary><strong>File: <a href="https://github.com/bhavya1600/RepoSage/blob/main/backend/src/index.js">backend/src/index.js</a></strong></summary>

  This file sets up an Express.js backend server to analyze GitHub repositories and serve analysis results.

**1. Main purpose and responsibilities**:  
- Provides an API to analyze a GitHub repository and save the results.  
- Serves the analysis results as a downloadable file.  

**2. Key functions and their purposes**:  
- `stripAnsiCodes(str: string) -> string`: Removes ANSI color codes from log messages.  
- `app.get('/api/download-analysis', async (req, res))`: Serves the `analysis_results.md` file as a downloadable markdown file.  
- `app.post('/api/analyze', async (req, res))`:  
  - Accepts a GitHub repository URL and optional API tokens.  
  - Runs the `analyzeRepository(repo: string) -> string` function to analyze the repository.  
  - Saves the results using `saveToFile(filename: string, content: string)`.  
  - Streams logs and progress updates to the client.  

**3. Important interactions with other parts of the system**:  
- Calls `analyzeRepository` from `analyzer.js` to perform the repository analysis.  
- Uses `saveToFile` from `utils/file.js` to store analysis results.  
- Uses `displayResults` from `utils/display.js` (though not directly in this file).  
- Reads environment variables from `.env` using `dotenv`.  

**4. Notable features or patterns**:  
- Uses Express.js with CORS and JSON middleware.  
- Implements streaming responses to send real-time logs to the client.  
- Redirects `console.log` to send logs to the client dynamically.  
- Restores the original `console.log` after analysis to prevent side effects.  

Overall, this file acts as the backend API for analyzing GitHub repositories, handling requests, running the analysis, saving results, and providing a downloadable report.

  ---
</details>

<details>
  <summary><strong>File: <a href="https://github.com/bhavya1600/RepoSage/blob/main/backend/src/utils/display.js">backend/src/utils/display.js</a></strong></summary>

  **1. Main purpose and responsibilities**:  
This file is responsible for formatting and displaying analysis results in a structured and visually appealing way using colored console output.  

**2. Key functions and their purposes**:  
- `displayResults(analysis)`:  
  - **Inputs**: `analysis` (object) containing repository details, summary, file tree, call hierarchy, and file-specific analyses.  
  - **Processing**: Uses `chalk` for colored console output, prints repository metadata, summary, project structure, call hierarchy, and file analyses in a readable format. Calls `displayFileTree` to visualize the file structure.  
  - **Outputs**: Logs formatted analysis results to the console (no return value).  

- `displayFileTree(node, indent)`:  
  - **Inputs**: `node` (object representing a file or directory in the file tree), `indent` (string for indentation formatting).  
  - **Processing**: Recursively traverses the file tree and prints directories and files with appropriate indentation and icons.  
  - **Outputs**: Logs the structured file tree to the console (no return value).  

**3. Important interactions with other parts of the system**:  
- Uses `chalk` for colored output.  
- Receives `analysis` data, likely generated by `analyzer.js`.  
- Calls `displayFileTree` to format and print the project structure.  

**4. Notable features or patterns**:  
- Uses recursion in `displayFileTree` to traverse nested directories.  
- Uses `chalk` for enhanced readability with colored console output.  
- Organizes output into clearly labeled sections for better clarity.  

Overall, this file enhances the readability of analysis results by structuring and formatting them in a visually appealing way using indentation, icons, and colors.

  ---
</details>

<details>
  <summary><strong>File: <a href="https://github.com/bhavya1600/RepoSage/blob/main/backend/src/utils/file.js">backend/src/utils/file.js</a></strong></summary>

  **1. Main purpose and responsibilities**:  
This module is responsible for saving repository analysis results in both Markdown and JSON formats, formatting file structures, and generating GitHub links for files.  

**2. Key functions and their purposes**:  
- `saveToFile(filename: string, analysis: object) -> Promise<void>`  
  - **Inputs**:  
    - `filename` (string): The name of the file to save the analysis.  
    - `analysis` (object): Contains repository details, file structure, call hierarchy, and file-specific analysis.  
  - **Processing**:  
    - Constructs a GitHub repository URL.  
    - Formats the analysis into a structured Markdown report.  
    - Saves the Markdown report to a file.  
    - Extracts key metadata and saves it as a JSON file.  
  - **Outputs**:  
    - Writes a Markdown file and a JSON file containing the analysis.  

- `formatFileTree(node: object, indent: string, repoUrl: string, branch: string, parentPath: string = '') -> string`  
  - **Inputs**:  
    - `node` (object): A file or directory node in the project structure.  
    - `indent` (string): The indentation level for formatting.  
    - `repoUrl` (string): The base GitHub repository URL.  
    - `branch` (string): The default branch name.  
    - `parentPath` (string, optional): The accumulated path of the parent directory.  
  - **Processing**:  
    - Recursively formats the file tree into a structured Markdown representation.  
    - Generates GitHub links for files.  
  - **Outputs**:  
    - Returns a formatted string representing the file structure.  

- `getFullPath(node: object) -> string`  
  - **Inputs**:  
    - `node` (object): A file or directory node.  
  - **Processing**:  
    - Constructs the full path of a file or directory by traversing parent references.  
    - Removes any leading `"root/"` from the path.  
  - **Outputs**:  
    - Returns the full path as a string.  

**3. Important interactions with other parts of the system**:  
- Uses `fs/promises` to write analysis results to files.  
- Works with `backend/src/analyzer.js` (likely the module generating the `analysis` object).  
- Interacts with `backend/src/utils/fileTree.js` to process file structures.  
- Generates GitHub links, which may be used in frontend components for navigation.  

**4. Notable features or patterns**:  
- Uses asynchronous file operations (`writeFile`).  
- Implements recursive functions for processing hierarchical file structures.  
- Encodes file paths for GitHub URLs to ensure proper linking.  
- Uses Markdown `<details>` elements for collapsible sections in reports.  

Overall, this module plays a crucial role in persisting repository analysis results in a structured and readable format, making it easier to review insights about a project's structure and functionality.

  ---
</details>

<details>
  <summary><strong>File: <a href="https://github.com/bhavya1600/RepoSage/blob/main/backend/src/utils/fileTree.js">backend/src/utils/fileTree.js</a></strong></summary>

  **1. Main purpose and responsibilities**:  
This module constructs a hierarchical file tree structure from a list of file paths and ensures that directories are listed before files while sorting them alphabetically.  

**2. Key functions and their purposes**:  
- `buildFileTree(files)`:  
  - **Inputs**: `files` (Array of objects, each containing `path` (String) and `type` (String, either `'file'` or `'directory'`)).  
  - **Processing**: Iterates through the file paths, breaking them into parts to construct a nested tree structure where directories contain child nodes. If a directory was previously misclassified as a file, it corrects the type. Finally, it calls `sortFileTree` to organize the structure.  
  - **Outputs**: Returns a structured file tree object (Object) with `name`, `type`, and `children` properties.  

- `sortFileTree(node)`:  
  - **Inputs**: `node` (Object representing a directory or file in the tree).  
  - **Processing**: Recursively sorts child nodes, ensuring directories appear before files and all entries are sorted alphabetically.  
  - **Outputs**: Returns a sorted version of the input node (Object).  

**3. Important interactions with other parts of the system**:  
- Likely used in conjunction with `backend/src/utils/file.js` to read file structures from the filesystem.  
- May be utilized by `backend/src/analyzer.js` to analyze or display file structures.  
- Could be relevant for `backend/src/utils/display.js` if the file tree needs to be rendered or logged.  

**4. Notable features or patterns**:  
- Uses a recursive approach to construct and sort the file tree.  
- Ensures directories are prioritized over files for better organization.  
- Handles cases where a directory was initially misclassified as a file.  

Overall, this module is responsible for transforming a flat list of file paths into a structured, hierarchical file tree while ensuring proper sorting and organization.

  ---
</details>

<details>
  <summary><strong>File: <a href="https://github.com/bhavya1600/RepoSage/blob/main/backend/src/utils/github.js">backend/src/utils/github.js</a></strong></summary>

  **1. Main purpose and responsibilities**:  
This module provides a utility function to parse GitHub repository URLs and extract the repository owner and name.  

**2. Key functions and their purposes**:  
- `parseGitHubUrl(url: string) -> { owner: string, repo: string }`  
  - **Inputs**: A GitHub repository URL (string).  
  - **Processing**:  
    - Parses the URL using the `URL` constructor.  
    - Extracts the repository owner and name from the pathname.  
    - Removes the `.git` extension if present.  
    - Throws an error if the URL format is invalid.  
  - **Outputs**: An object containing `owner` (string) and `repo` (string).  

**3. Important interactions with other parts of the system**:  
- Likely used in other backend modules that need to extract repository details from GitHub URLs, possibly for API requests or repository analysis.  

**4. Notable features or patterns**:  
- Uses JavaScript's built-in `URL` object for robust URL parsing.  
- Implements error handling to ensure valid GitHub URLs are processed correctly.  

Overall, this function ensures that GitHub repository URLs are correctly parsed and formatted for further use in the system.

  ---
</details>

<details>
  <summary><strong>File: <a href="https://github.com/bhavya1600/RepoSage/blob/main/frontend/index.html">frontend/index.html</a></strong></summary>

  The `index.html` file serves as the main entry point for the frontend, providing the root container for the React application and linking essential assets.  

**1. Main purpose and responsibilities**:  
This file initializes the frontend by defining the root HTML structure and loading the React application via `main.jsx`.  

**2. Key functions and their purposes**:  
This file does not contain JavaScript functions but serves as a static HTML template that:  
- Defines a `<div id="root"></div>` as the mounting point for the React app.  
- Loads the `main.jsx` script, which bootstraps the React application.  

**3. Important interactions with other parts of the system**:  
- Loads `/src/main.jsx`, which initializes the React app and renders it inside the `#root` div.  
- References `/vite.svg` as the favicon.  
- Uses Vite as the build tool, indicated by the module-based script loading.  

**4. Notable features or patterns**:  
- Uses the `<!doctype html>` declaration for modern HTML5 compliance.  
- Includes a `<meta viewport>` tag for responsive design.  
- Loads JavaScript as a module (`type="module"`) for ES module support.  

Overall, this file is a minimal HTML shell that provides a mounting point for the React application and ensures proper asset loading.

  ---
</details>

<details>
  <summary><strong>File: <a href="https://github.com/bhavya1600/RepoSage/blob/main/frontend/src/App.jsx">frontend/src/App.jsx</a></strong></summary>

  This file defines the main frontend component for a GitHub repository analysis tool.

**1. Main purpose and responsibilities**:  
The `App.jsx` component provides a user interface for submitting a GitHub repository URL, triggering an analysis request to a backend server, displaying real-time logs of the analysis process, and allowing users to download the analysis results.  

**2. Key functions and their purposes**:  
- `handleSubmit(e)`:  
  - **Inputs**: `e` (event object from form submission).  
  - **Processing**: Prevents default form submission, sends a POST request to `http://localhost:5000/api/analyze` with the repository URL, reads the response stream, updates logs dynamically, and tracks analysis completion.  
  - **Outputs**: Updates `logs` (string), `isLoading` (boolean), and `analysisComplete` (boolean).  

- `handleDownload()`:  
  - **Inputs**: None.  
  - **Processing**: Sends a GET request to `http://localhost:5000/api/download-analysis`, downloads the analysis file as `analysis_results.md`, and handles errors if the download fails.  
  - **Outputs**: Initiates file download and updates `logs` (string) in case of errors.  

**3. Important interactions with other parts of the system**:  
- Sends API requests to the backend (`http://localhost:5000/api/analyze` and `http://localhost:5000/api/download-analysis`).  
- Receives and processes streamed logs from the backend.  
- Updates UI state (`repo`, `logs`, `isLoading`, `analysisComplete`) based on backend responses.  

**4. Notable features or patterns**:  
- Uses React state (`useState`) to manage form inputs and UI updates.  
- Implements real-time log streaming using `fetch` and `ReadableStream`.  
- Provides dynamic UI feedback (loading states, progress updates, and conditional button activation).  

Overall, this component serves as the main user interface for interacting with the repository analysis backend, handling user input, displaying progress, and enabling result downloads.

  ---
</details>

<details>
  <summary><strong>File: <a href="https://github.com/bhavya1600/RepoSage/blob/main/frontend/src/main.jsx">frontend/src/main.jsx</a></strong></summary>

  A simple entry point for a React application that initializes and renders the root component.  

**1. Main purpose and responsibilities**:  
This file serves as the main entry point for the frontend React application. It sets up the root React component (`App`) and renders it inside the HTML element with the ID `root`.  

**2. Key functions and their purposes**:  
- `createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>)`:  
  - **Inputs**:  
    - `document.getElementById('root')`: Retrieves the root HTML element (expected to be a DOM element).  
    - `<StrictMode><App /></StrictMode>`: A React component tree wrapped in `StrictMode`.  
  - **Processing**:  
    - Initializes a React root using `createRoot`.  
    - Renders the `App` component inside `StrictMode`, which helps identify potential issues in the application.  
  - **Outputs**:  
    - Renders the React application inside the specified root element in the DOM.  

**3. Important interactions with other parts of the system**:  
- Imports and renders the `App` component (`frontend/src/App.jsx`), which serves as the main component of the application.  
- Imports global styles from `index.css` (`frontend/src/index.css`).  
- Uses `StrictMode` from React to enforce best practices and highlight potential issues.  

**4. Notable features or patterns**:  
- Uses React 18’s `createRoot` API for concurrent rendering capabilities.  
- Wraps the application in `StrictMode` to catch potential issues during development.  
- Keeps the entry point minimal and focused on initializing the application.  

Overall, this file is the starting point of the React frontend, responsible for mounting the `App` component into the DOM and ensuring best practices using `StrictMode`.

  ---
</details>

<details>
  <summary><strong>File: <a href="https://github.com/bhavya1600/RepoSage/blob/main/frontend/vite.config.js">frontend/vite.config.js</a></strong></summary>

  This file configures Vite, a fast build tool, to work with a React frontend project.  

**1. Main purpose and responsibilities**:  
Configures Vite to use the React plugin, enabling optimized development and build processes for the frontend.  

**2. Key functions and their purposes**:  
- `defineConfig({...})`:  
  - **Inputs**: An object containing Vite configuration options.  
  - **Processing**: Registers the React plugin to enable JSX support and optimizations.  
  - **Outputs**: A Vite configuration object.  

**3. Important interactions with other parts of the system**:  
- Uses `@vitejs/plugin-react` to enable React support.  
- Affects how the frontend (`frontend/src`) is built and served during development.  

**4. Notable features or patterns**:  
- Uses Vite’s `defineConfig` function for better TypeScript support and maintainability.  
- Minimal configuration, relying on Vite’s sensible defaults.  

Overall, this file ensures that Vite properly handles React files, optimizing the development and build process.

  ---
</details>


## ✒️ Project Summary 
"This project is a tool designed to analyze GitHub repositories using AI, providing file-by-file breakdowns, call hierarchies, and project summaries.  

1. **Main purpose and functionality**:  
   - RepoSage helps users understand GitHub repositories by analyzing their structure, extracting metadata, and generating AI-powered insights.  
   - It fetches repository details, processes files, and provides structured summaries and call hierarchies.  

2. **Tech stack and architecture**:  
   - **Backend**: Node.js with Express.js, using GitHub API for repository data and OpenAI API for AI-driven analysis.  
   - **Frontend**: React with Vite for fast development and optimized builds.  
   - **Utilities**: PostCSS for styling, ESLint for linting, and Nodemon for development automation.  

3. **Key components and their interactions**:  
   - **Backend (`backend/`)**:  
     - `analyzer.js`: Core logic for fetching repository data and analyzing it with OpenAI.  
     - `index.js`: Express server handling API requests for analysis and file downloads.  
     - `utils/`: Helper modules for GitHub API interactions, file tree construction, and result formatting.  
   - **Frontend (`frontend/`)**:  
     - `App.jsx`: Main React component for user interaction.  
     - `main.jsx`: Entry point rendering the UI.  
     - `vite.config.js`: Configuration for frontend optimization.  

4. **Notable features**:  
   - AI-powered repository analysis with OpenAI integration.  
   - File-by-file breakdown and call hierarchy generation.  
   - Interactive frontend for submitting repositories and viewing results.  
   - Downloadable analysis reports in markdown and JSON formats.  

5. **Code organization and structure**:  
   - **Backend**: Organized into `src/` with `utils/` for modular helper functions.  
   - **Frontend**: Uses React components, assets, and configuration files for a structured UI.  
   - **Configuration files**: `openaiConfig.json`, `nodemon.json`, and `vite.config.js` for easy customization.  

Overall, RepoSage is a well-structured tool that leverages AI to simplify GitHub repository analysis, making it easier for developers to understand and navigate complex projects."