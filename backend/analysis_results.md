# Repository Insights 📓🔍

## Project Details 📃
- **Name:** RepoSage
- **Description:** A tool to help understand Github repositories, file by file with Call Hierarchy and Summary of the project.
- **Primary Language:** JavaScript

## Project Understanding 🤓
<details>
  <summary><strong>Peek Under the Hood 👀</strong></summary>

  Based on the provided file structure and metadata, **RepoSage** is a full-stack JavaScript application designed to analyze GitHub repositories comprehensively. Here's a concise overview of its main components, tech stack, and architecture:

### **Main Components**

1. **Backend (`backend` Directory)**
   - **Core Functionality**: Handles repository analysis, including fetching data from GitHub, processing file structures, generating call hierarchies, and leveraging OpenAI's API for AI-powered summaries.
   - **Key Files**:
     - `index.js`: Entry point for the backend server.
     - `analyzer.js`: Core logic for analyzing repositories.
     - `utils/`: Contains helper modules (`display.js`, `file.js`, `fileTree.js`, `github.js`) for various backend operations.
     - `openaiConfig.json` & `openaiConfigQA.json`: Configuration files for OpenAI API interactions.
     - `analysis_results.json` & `analysis_results.md`: Stores analysis outputs.

2. **Frontend (`frontend` Directory)**
   - **User Interface**: Provides a responsive React-based web interface where users can input GitHub repository URLs, initiate analyses, and view results.
   - **Key Files**:
     - `App.jsx` & `App.css`: Main React components and styling.
     - `main.jsx`: Application entry point.
     - `vite.config.js`: Configuration for the Vite build tool.
     - `public/`: Contains static assets like `vite.svg` and `react.svg`.

3. **Configuration & Utilities**
   - **Environment Setup**: `.env` files for managing API keys and tokens.
   - **Linting & Styling**: `.vscode/` settings and `eslint.config.js` ensure code quality and consistency.
   - **Package Management**: `package.json` and `package-lock.json` manage dependencies for both backend and frontend.

### **Tech Stack**

- **Backend**:
  - **Language**: JavaScript (Node.js)
  - **Framework**: Express.js (implied by common practices)
  - **APIs**: GitHub API for repository data, OpenAI API for analysis and summarization
  - **Utilities**: Custom scripts for file handling and API interactions

- **Frontend**:
  - **Library**: React
  - **Build Tool**: Vite for fast development and bundling
  - **Styling**: CSS for responsive and modern UI design

### **Architecture**

- **Separation of Concerns**: Clear division between frontend and backend, allowing independent development and scalability.
- **Modular Design**: Backend utilities are modularized for maintainability, while the frontend leverages React's component-based architecture for a dynamic user experience.
- **API-Driven**: The backend serves as an API provider, processing requests from the frontend, performing analyses, and returning results.
- **AI Integration**: Utilizes OpenAI's API to enhance repository analysis with intelligent summaries and insights.
- **Configuration Flexibility**: Supports customizable settings for model selection and token management to balance performance and cost.

### **Summary**

**RepoSage** is a robust tool that combines a Node.js backend with a React frontend to provide deep, AI-enhanced analysis of GitHub repositories. Its modular architecture, integration with powerful APIs, and user-friendly interface make it a valuable asset for developers seeking comprehensive insights into project structures and functionalities.

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

  This file (`backend/index.js`) is the main backend server that provides an API for analyzing GitHub repositories using GitHub's API and OpenAI's language model.

### **1. Main purpose and responsibilities**:  
- Acts as an Express.js server that exposes an API endpoint (`/api/analyze`) to analyze a given GitHub repository.  
- Fetches repository details, structure, and recent commits using GitHub's API.  
- Uses OpenAI's API to generate a detailed markdown report on the repository.  

### **2. Key functions and their purposes**:  
- **`app.post('/api/analyze', async (req, res) => { ... })`**  
  - **Inputs**:  
    - `repo` (string) → GitHub repository URL  
    - `githubToken` (string) → GitHub API token  
    - `openaiToken` (string) → OpenAI API token  
  - **Processing**:  
    - Extracts repository owner and name from the URL.  
    - Initializes GitHub and OpenAI clients.  
    - Fetches repository metadata, file structure, and recent commits from GitHub.  
    - Sends this data to OpenAI to generate a markdown report.  
    - Streams progress updates to the client.  
    - Saves the generated report to `analysis_results.md`.  
  - **Outputs**:  
    - Streams text updates to the client (`text/plain`).  
    - Saves a markdown report file (`analysis_results.md`).  

### **3. Important interactions with other parts of the system**:  
- Uses **GitHub API** (via `@octokit/rest`) to fetch repository details, structure, and commits.  
- Uses **OpenAI API** (via `openai`) to generate a markdown report based on the repository data.  
- Saves the generated analysis to a file (`analysis_results.md`) in the `backend` directory.  

### **4. Notable features or patterns**:  
- **Streaming responses**: Uses `res.write()` to send real-time updates to the client.  
- **Error handling**: Catches and logs errors, ensuring responses are properly handled.  
- **File system operations**: Saves the analysis report using `fs.promises.writeFile()`.  
- **Environment separation**: Uses API tokens provided in the request body instead of hardcoding them.  

### **Overall**  
This file serves as the backend API for analyzing GitHub repositories. It integrates GitHub's API to fetch repository data and OpenAI's API to generate a structured report, providing insights into the repository's structure, activity, and potential improvements.

  ---
</details>

<details>
  <summary><strong>File: <a href="https://github.com/bhavya1600/RepoSage/blob/main/backend/src/analyzer.js">backend/src/analyzer.js</a></strong></summary>

  This file (`backend/src/analyzer.js`) is responsible for analyzing a GitHub repository's structure, extracting relevant files, and using OpenAI to generate insights about the project's architecture, code, and call hierarchy.

**1. Main purpose and responsibilities**:  
   - Fetches repository metadata and file structure from GitHub.  
   - Uses OpenAI to analyze project structure, summarize files, and generate insights.  
   - Identifies important files for analysis and processes them efficiently.  
   - Generates a call hierarchy and project summary.  

**2. Key functions and their purposes**:  
   - `createChatCompletion(openai, model, modelType, analysisPrompt)`:  
     - **Inputs**: `openai` (OpenAI instance), `model` (string), `modelType` (string), `analysisPrompt` (string).  
     - **Processing**: Calls OpenAI API to generate a response based on the given prompt.  
     - **Outputs**: Returns the AI-generated response (string).  

   - `saveApiCallContent(functionName, content)`:  
     - **Inputs**: `functionName` (string), `content` (string).  
     - **Processing**: Saves API responses to a log file.  
     - **Outputs**: None (writes to a file).  

   - `analyzeRepository(repoUrl)`:  
     - **Inputs**: `repoUrl` (string).  
     - **Processing**: Fetches repository metadata, file tree, README, and analyzes project structure. Filters and processes relevant files, then generates a summary and call hierarchy.  
     - **Outputs**: Returns an analysis object containing repository insights (JSON).  

   - `analyzeProjectStructure(openai, repoData, files, readmeContent)`:  
     - **Inputs**: `openai` (OpenAI instance), `repoData` (object), `files` (array), `readmeContent` (string).  
     - **Processing**: Uses OpenAI to generate an understanding of the project based on its structure.  
     - **Outputs**: Returns a textual summary of the project (string).  

   - `smartFileFilter(files, projectUnderstanding)`:  
     - **Inputs**: `files` (array), `projectUnderstanding` (string).  
     - **Processing**: Uses OpenAI to determine which files are essential for analysis. Falls back to predefined rules if AI fails.  
     - **Outputs**: Returns an array of important file objects.  

   - `summarizeContent(openai, content, fileTree)`:  
     - **Inputs**: `openai` (OpenAI instance), `content` (string), `fileTree` (array).  
     - **Processing**: Uses OpenAI to summarize a file's content.  
     - **Outputs**: Returns a summary of the file (string).  

   - `analyzeCode(openai, filePath, content, fileTree)`:  
     - **Inputs**: `openai` (OpenAI instance), `filePath` (string), `content` (string), `fileTree` (array).  
     - **Processing**: Uses OpenAI to generate both a human-readable explanation and structured metadata for a file.  
     - **Outputs**: Returns an object containing text analysis and JSON metadata.  

   - `analyzeCallHierarchy(openai, fileMetadata, projectUnderstanding)`:  
     - **Inputs**: `openai` (OpenAI instance), `fileMetadata` (array), `projectUnderstanding` (string).  
     - **Processing**: Uses OpenAI to generate a call hierarchy of function interactions.  
     - **Outputs**: Returns a structured call hierarchy (string).  

   - `generateSummary(openai, analysis)`:  
     - **Inputs**: `openai` (OpenAI instance), `analysis` (object).  
     - **Processing**: Uses OpenAI to generate a high-level summary of the project.  
     - **Outputs**: Returns a structured project summary (string).  

**3. Important interactions with other parts of the system**:  
   - Uses `Octokit` to fetch repository data from GitHub.  
   - Uses `OpenAI` API to analyze and summarize code.  
   - Reads configuration from `openaiConfig.json`.  
   - Utilizes helper functions from `utils/github.js` and `utils/fileTree.js`.  
   - Saves API responses to `apiResponsesLog.txt` for debugging.  

**4. Notable features or patterns**:  
   - **AI-driven analysis**: Uses OpenAI to extract meaningful insights from code.  
   - **Smart file filtering**: Dynamically selects important files for analysis.  
   - **Token management**: Prevents exceeding OpenAI token limits by summarizing content when necessary.  
   - **Call hierarchy generation**: Maps function interactions across files.  
   - **Error handling and fallbacks**: Ensures robustness even if AI filtering fails.  

Overall, this file orchestrates the process of analyzing a GitHub repository by leveraging GitHub APIs and OpenAI to extract meaningful insights, summarize code, and generate structured metadata.

  ---
</details>

<details>
  <summary><strong>File: <a href="https://github.com/bhavya1600/RepoSage/blob/main/backend/src/index.js">backend/src/index.js</a></strong></summary>

  This file sets up an Express.js backend server to analyze GitHub repositories and serve analysis results.

**1. Main purpose and responsibilities**:  
- Provides an API to analyze a GitHub repository and generate a report.  
- Serves the generated analysis file for download.  

**2. Key functions and their purposes**:  
- `stripAnsiCodes(str: string) -> string`: Removes ANSI color codes from a string to ensure clean output.  
- `app.get('/api/download-analysis', async (req, res))`:  
  - Inputs: None.  
  - Processing: Reads the `analysis_results.md` file and sends it as a downloadable response.  
  - Outputs: Sends the file content as `text/markdown`.  
- `app.post('/api/analyze', async (req, res))`:  
  - Inputs: JSON body with `{ repo: string, githubToken?: string, openaiToken?: string }`.  
  - Processing:  
    - Validates the repository URL.  
    - Sets up streaming logs to the client.  
    - Calls `analyzeRepository(repo)` to perform the analysis.  
    - Saves the results using `saveToFile()`.  
  - Outputs: Streams logs and sends `ANALYSIS_COMPLETE` upon success.  

**3. Important interactions with other parts of the system**:  
- Calls `analyzeRepository` from `analyzer.js` to perform the repository analysis.  
- Uses `saveToFile` from `utils/file.js` to store analysis results.  
- Uses `displayResults` from `utils/display.js` (though not explicitly used in this file).  
- Reads environment variables from `.env` using `dotenv`.  

**4. Notable features or patterns**:  
- Uses Express.js for API handling.  
- Implements streaming responses for real-time log updates.  
- Dynamically sets API tokens from request or environment variables.  
- Restores `console.log` after redirecting logs to the client.  

Overall, this file serves as the backend API for analyzing GitHub repositories, handling requests, processing analysis, and providing downloadable results.

  ---
</details>

<details>
  <summary><strong>File: <a href="https://github.com/bhavya1600/RepoSage/blob/main/backend/src/utils/display.js">backend/src/utils/display.js</a></strong></summary>

  This file is responsible for displaying analysis results in a structured and visually appealing way using the `chalk` library for colored terminal output.  

**1. Main purpose and responsibilities**:  
- Formats and prints repository analysis results, including repository details, summary, project structure, call hierarchy, and file analyses.  
- Uses indentation and icons to visually represent the project structure.  

**2. Key functions and their purposes**:  
- `displayResults(analysis: Object) -> void`  
  - **Inputs**: `analysis` (Object) containing repository details, summary, file tree, call hierarchy, and file analyses.  
  - **Processing**: Prints formatted repository information, summary, project structure, call hierarchy, and file-specific analyses using `chalk` for styling. Calls `displayFileTree` to print the file structure.  
  - **Outputs**: Logs formatted analysis results to the console.  

- `displayFileTree(node: Object, indent: String) -> void`  
  - **Inputs**: `node` (Object) representing a file or directory, `indent` (String) for formatting.  
  - **Processing**: Recursively prints the file tree structure with indentation and icons (`📁` for directories, `📄` for files).  
  - **Outputs**: Logs the structured file tree to the console.  

**3. Important interactions with other parts of the system**:  
- Receives `analysis` data, likely generated by `backend/src/analyzer.js`.  
- Uses `chalk` for styling console output.  
- Processes `fileTree`, which is likely constructed by `backend/src/utils/fileTree.js`.  

**4. Notable features or patterns**:  
- Uses recursion in `displayFileTree` to traverse and print hierarchical structures.  
- Leverages `chalk` for colored and bolded console output, improving readability.  
- Uses emoji symbols (`📊`, `📌`, `📁`, `📄`) for better visual distinction.  

Overall, this file enhances the readability of analysis results by formatting and displaying them in a structured and visually appealing manner in the console.

  ---
</details>

<details>
  <summary><strong>File: <a href="https://github.com/bhavya1600/RepoSage/blob/main/backend/src/utils/file.js">backend/src/utils/file.js</a></strong></summary>

  **1. Main purpose and responsibilities**:  
This file provides utility functions for saving repository analysis data to markdown and JSON files, formatting file structures, and generating GitHub links for files.  

**2. Key functions and their purposes**:  
- `saveToFile(filename: string, analysis: object) -> Promise<void>`  
  - **Inputs**:  
    - `filename` (string): The name of the markdown file to save.  
    - `analysis` (object): Contains repository details, file structure, function call hierarchy, and file analysis.  
  - **Processing**:  
    - Constructs a GitHub repository URL.  
    - Formats markdown content with repository insights, project structure, and file analyses.  
    - Saves the markdown content to a file.  
    - Extracts metadata and saves it as a JSON file.  
  - **Outputs**: Saves a markdown file (`.md`) and a JSON file (`.json`) with repository analysis data.  

- `formatFileTree(node: object, indent: string, repoUrl: string, branch: string, parentPath: string = '') -> string`  
  - **Inputs**:  
    - `node` (object): A file tree node representing a directory or file.  
    - `indent` (string): Indentation for formatting.  
    - `repoUrl` (string): Base URL of the GitHub repository.  
    - `branch` (string): Repository branch name.  
    - `parentPath` (string, optional): Parent directory path.  
  - **Processing**:  
    - Recursively formats the file tree into a structured markdown list.  
    - Generates clickable GitHub links for files.  
  - **Outputs**: A formatted string representing the file tree in markdown.  

- `getFullPath(node: object) -> string`  
  - **Inputs**:  
    - `node` (object): A file or directory node.  
  - **Processing**:  
    - Retrieves the full path of a file or directory by traversing parent references.  
    - Removes the leading `"root/"` prefix if present.  
  - **Outputs**: A string representing the full file path.  

**3. Important interactions with other parts of the system**:  
- Uses `fs/promises.writeFile` to save analysis results as markdown and JSON files.  
- Works with `backend/src/analyzer.js` to process repository analysis data.  
- Utilizes repository metadata and file structures from `analysis_results.json`.  
- Generates GitHub links for files, integrating with `backend/src/utils/github.js`.  

**4. Notable features or patterns**:  
- Uses **asynchronous file writing** for efficient I/O operations.  
- Implements **recursive tree traversal** to format file structures.  
- Uses **template literals** for clean markdown formatting.  
- Encodes file paths to ensure valid GitHub URLs.  

Overall, this utility file is responsible for converting repository analysis data into structured markdown and JSON formats, making it easier to review insights and navigate project files via GitHub links.

  ---
</details>

<details>
  <summary><strong>File: <a href="https://github.com/bhavya1600/RepoSage/blob/main/backend/src/utils/fileTree.js">backend/src/utils/fileTree.js</a></strong></summary>

  This file constructs a hierarchical file tree structure from a list of file paths and sorts it for better organization.  

**1. Main purpose and responsibilities**:  
This module processes a list of file paths and builds a structured tree representation of the file system, ensuring directories are correctly identified and sorted.  

**2. Key functions and their purposes**:  
- `buildFileTree(files)`:  
  - **Inputs**: `files` (Array of objects, each containing `path` (String) and `type` (String: 'file' or 'directory')).  
  - **Processing**: Iterates through file paths, splits them into parts, and constructs a nested tree structure where directories contain child elements. Ensures correct type assignment for directories and files.  
  - **Outputs**: Returns a sorted hierarchical file tree (Object) with nested `children` objects.  

- `sortFileTree(node)`:  
  - **Inputs**: `node` (Object representing a directory or file).  
  - **Processing**: Recursively sorts the children of a node, ensuring directories appear before files and all entries are sorted alphabetically.  
  - **Outputs**: Returns a sorted version of the input node (Object).  

**3. Important interactions with other parts of the system**:  
- Likely used by other backend utilities (e.g., `file.js`) to process and display file structures.  
- May interact with `github.js` to analyze repository structures.  
- Could be used in the frontend to visualize file hierarchies.  

**4. Notable features or patterns**:  
- Uses recursion for sorting nested structures.  
- Ensures directories are processed before files for clarity.  
- Handles cases where a path is initially misclassified as a file but later identified as a directory.  

Overall, this module is essential for structuring and organizing file data, making it easier to process and display hierarchical file structures.

  ---
</details>

<details>
  <summary><strong>File: <a href="https://github.com/bhavya1600/RepoSage/blob/main/backend/src/utils/github.js">backend/src/utils/github.js</a></strong></summary>

  **1. Main purpose and responsibilities**:  
This file provides utility functions for handling GitHub repository URLs, specifically extracting the repository owner and name from a given URL.  

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
- Likely used in other backend modules that need to extract repository details from a GitHub URL, possibly for API requests or repository analysis.  

**4. Notable features or patterns**:  
- Uses the `URL` constructor for robust URL parsing.  
- Implements error handling to ensure valid GitHub URLs.  
- Removes `.git` suffix to standardize repository names.  

Overall, this function ensures that GitHub repository URLs are correctly parsed and formatted for further processing in the system.

  ---
</details>

<details>
  <summary><strong>File: <a href="https://github.com/bhavya1600/RepoSage/blob/main/frontend/index.html">frontend/index.html</a></strong></summary>

  The `index.html` file serves as the main entry point for the frontend, providing the basic HTML structure and linking to the React application.  

**1. Main purpose and responsibilities**:  
This file initializes the frontend by defining the root container (`<div id="root"></div>`) where the React app will be mounted and linking the main JavaScript entry point (`/src/main.jsx`).  

**2. Key functions and their purposes**:  
This file does not contain JavaScript functions but serves as a static HTML template. It:  
- Loads metadata (`charset`, `viewport`, `title`).  
- Defines a favicon (`vite.svg`).  
- Provides a `<div id="root"></div>` as the mounting point for React.  
- Loads the main React entry script (`/src/main.jsx`).  

**3. Important interactions with other parts of the system**:  
- The `<script type="module" src="/src/main.jsx"></script>` loads the React application, which is responsible for rendering the UI.  
- The `<div id="root"></div>` is used by React to inject and manage the app’s components dynamically.  

**4. Notable features or patterns**:  
- Uses Vite as the build tool, indicated by the favicon (`vite.svg`) and module-based script loading.  
- Minimalist structure, relying on React for content rendering.  
- Uses modern HTML5 features (`<meta viewport>`, `<script type="module">`).  

Overall, this file acts as a lightweight container for the React application, ensuring the app is properly initialized and rendered within the browser.

  ---
</details>

<details>
  <summary><strong>File: <a href="https://github.com/bhavya1600/RepoSage/blob/main/frontend/src/App.jsx">frontend/src/App.jsx</a></strong></summary>

  The `App.jsx` file serves as the main frontend component for the application, handling user input, triggering backend analysis, and displaying progress logs.

**1. Main purpose and responsibilities**:  
- Provides a user interface for submitting a GitHub repository URL along with optional API tokens.  
- Sends a request to the backend to analyze the repository and displays real-time progress logs.  
- Allows users to download the analysis results once the process is complete.  

**2. Key functions and their purposes**:  
- `handleSubmit(e: Event) -> void`:  
  - Prevents default form submission behavior.  
  - Sends a POST request to `http://localhost:5000/api/analyze` with the repository URL and optional API tokens.  
  - Reads the response stream, processes log messages, and updates the UI accordingly.  
  - Handles errors and updates the loading state.  

- `handleDownload() -> void`:  
  - Sends a request to `http://localhost:5000/api/download-analysis` to retrieve the analysis results.  
  - Creates a downloadable link for the user to save the `analysis_results.md` file.  
  - Handles errors if the download fails.  

**3. Important interactions with other parts of the system**:  
- Communicates with the backend (`backend/index.js`) via API endpoints (`/api/analyze` and `/api/download-analysis`).  
- Uses React state (`useState`) to manage form inputs, logs, loading state, and analysis completion status.  
- Dynamically updates the UI based on backend responses.  

**4. Notable features or patterns**:  
- Uses React hooks (`useState`) for state management.  
- Implements streaming response handling to update logs in real-time.  
- Provides a clean and interactive UI with form validation and dynamic button states.  

Overall, `App.jsx` serves as the core user interface for initiating and monitoring repository analysis, ensuring smooth interaction between the frontend and backend.

  ---
</details>

<details>
  <summary><strong>File: <a href="https://github.com/bhavya1600/RepoSage/blob/main/frontend/src/main.jsx">frontend/src/main.jsx</a></strong></summary>

  **1. Main purpose and responsibilities**:  
This file serves as the entry point for the React frontend application, initializing and rendering the root React component (`App`) into the DOM.  

**2. Key functions and their purposes**:  
- `createRoot(document.getElementById('root')).render(...)`:  
  - **Inputs**: Takes a DOM element (`#root`, an HTML element).  
  - **Processing**: Creates a React root and renders the `App` component inside a `<StrictMode>` wrapper.  
  - **Outputs**: Renders the React application into the specified DOM element.  

**3. Important interactions with other parts of the system**:  
- Imports `App` from `./App.jsx`, which is the main component of the application.  
- Imports global styles from `./index.css` for styling.  
- Uses `StrictMode` from React, which helps identify potential issues in the application during development.  

**4. Notable features or patterns**:  
- Uses React 18’s `createRoot` API for concurrent rendering.  
- Wraps the application in `StrictMode` to enforce best practices and catch potential issues.  

Overall, this file is crucial for bootstrapping the React application, ensuring that the `App` component is properly mounted in the DOM and benefiting from React’s modern rendering optimizations.

  ---
</details>

<details>
  <summary><strong>File: <a href="https://github.com/bhavya1600/RepoSage/blob/main/frontend/vite.config.js">frontend/vite.config.js</a></strong></summary>

  The `vite.config.js` file configures Vite, a fast frontend build tool, for a React-based project.  

**1. Main purpose and responsibilities**:  
This file sets up Vite to work with React by defining the necessary plugins and configurations.  

**2. Key functions and their purposes**:  
- `defineConfig({...})`:  
  - **Inputs**: An object containing Vite configuration options.  
  - **Processing**: Registers the React plugin to enable JSX support and optimizations.  
  - **Outputs**: A Vite configuration object used by the build system.  

**3. Important interactions with other parts of the system**:  
- Uses `@vitejs/plugin-react` to enable React support in the frontend.  
- Affects how frontend files (`frontend/src`) are processed and served during development and build.  

**4. Notable features or patterns**:  
- Uses Vite's `defineConfig` function for better TypeScript support and structured configuration.  
- Minimalistic setup, relying on Vite's defaults with only the React plugin added.  

Overall, this file ensures that the frontend project is correctly configured to use Vite with React, optimizing development and build processes.

  ---
</details>


## Project Summary ✒️
This project is a **full-stack JavaScript application** designed to analyze GitHub repositories by providing file-by-file insights, call hierarchies, and AI-generated summaries.  

1. **Main purpose and functionality**:  
   - RepoSage helps users understand GitHub repositories by analyzing their structure, extracting key metadata, and generating AI-powered summaries.  
   - It fetches repository data, processes file structures, and provides a detailed breakdown of project components.  

2. **Tech stack and architecture**:  
   - **Backend**: Node.js with Express.js, GitHub API for repository data, and OpenAI API for AI-powered insights.  
   - **Frontend**: React with Vite for fast development and a responsive UI.  
   - **Architecture**: API-driven, modular design with a clear separation between backend and frontend.  

3. **Key components and their interactions**:  
   - **Backend**: Handles repository analysis, processes file structures, and integrates with OpenAI for summaries.  
   - **Frontend**: Provides a user-friendly interface for inputting repository URLs, viewing progress, and downloading analysis results.  
   - **Utilities**: Helper modules manage file handling, API interactions, and formatting of analysis results.  

4. **Notable features**:  
   - AI-powered project summaries and file analysis.  
   - Call hierarchy generation for better code understanding.  
   - Real-time updates during repository analysis.  
   - Downloadable analysis results in markdown and JSON formats.  

5. **Code organization and structure**:  
   - **Backend (`backend/`)**: Contains core logic (`analyzer.js`), utilities (`utils/`), and configuration files.  
   - **Frontend (`frontend/`)**: React-based UI components (`App.jsx`, `main.jsx`), styling (`App.css`), and configuration (`vite.config.js`).  
   - **Utilities**: Modular helper functions for GitHub API interactions, file handling, and display formatting.  

Overall, **RepoSage is a powerful tool for developers to gain deep insights into GitHub repositories, leveraging AI to simplify project understanding and improve code navigation.**