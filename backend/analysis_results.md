# 🔍 Repository Insights

## 📃 Project Details 
- **Name:** RepoSage
- **Description:** A tool to help understand Github repositories, file by file with Call Hierarchy and Summary of the project.
- **Primary Language:** JavaScript

## 🤓 Project Understanding 
<details>
  <summary><strong>Peek Under the Hood 👀</strong></summary>

  The **RepoSage** project is structured to facilitate deep analysis of GitHub repositories using a combination of a backend and a frontend. Here's a brief overview of its components, tech stack, and architecture based on the provided file structure:

### Main Components
1. **Backend**:
   - **Core Analysis Logic**: Located in `backend/src/analyzer.js`, this file likely contains the primary functionality for analyzing repositories, including the integration with OpenAI's API for generating insights.
   - **Configuration Files**: 
     - `openaiConfig.json` and `openaiConfigQA.json` define settings for interacting with the OpenAI API, including model selection and token management.
   - **Utilities**: The `utils` directory contains helper functions for various tasks, such as handling files (`file.js`), interacting with the GitHub API (`github.js`), and managing file trees (`fileTree.js`).
   - **Results Storage**: `analysis_results.json` and `analysis_results.md` store the output of the analysis, providing both structured data and human-readable reports.

2. **Frontend**:
   - **User Interface**: Built with React, the frontend files are located in the `frontend/src` directory. The main entry point is `main.jsx`, which initializes the application.
   - **Styling**: CSS files (`App.css`, `index.css`) are used for styling the application, ensuring a responsive and modern interface.
   - **Build Configuration**: `vite.config.js` is used for configuring Vite, the build tool that optimizes the frontend assets.

3. **Assets**:
   - The `assets` directory contains images and other static resources, such as `RepoSageSS.png`, which is likely used for branding or UI elements.

### Tech Stack
- **Backend**:
  - **Language**: JavaScript (Node.js)
  - **Framework**: Express.js (assumed based on common practices)
  - **APIs**: OpenAI API for analysis and summarization
  - **Utilities**: Custom scripts for file handling and GitHub API interactions

- **Frontend**:
  - **Library**: React for building the user interface
  - **Build Tool**: Vite for fast and modern frontend development
  - **Styling**: CSS for styling components

### Architecture
The architecture follows a modular design, separating the backend and frontend components:
- The **backend** handles data processing, API interactions, and analysis logic, while the **frontend** provides a user-friendly interface for input and output.
- Communication between the frontend and backend is likely facilitated through API calls, allowing users to input a GitHub repository URL and receive analysis results in real-time.
- The project employs a hybrid AI strategy, leveraging both reasoning models for in-depth analysis and general models for summarization, enhancing the overall effectiveness of the tool.

This structure supports a clear separation of concerns, making the project maintainable and scalable while providing a comprehensive tool for GitHub repository analysis.

</details>

## 🌲 Project Structure 
<details>
  <summary><strong>File Tree</strong></summary>

  📁 .vscode/
&nbsp;&nbsp;&nbsp;&nbsp;📄 [extensions.json](https://github.com/bhavya1600/RepoSage/blob/main/.vscode/extensions.json)
📁 assets/
&nbsp;&nbsp;&nbsp;&nbsp;📄 [RepoSageSS.png](https://github.com/bhavya1600/RepoSage/blob/main/assets/RepoSageSS.png)
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

  ```
📁 analyzeRepository(repoUrl: string) → Promise<object> [backend/src/analyzer.js]
├─ 🔷 parseGitHubUrl(url: string) → object [backend/src/utils/github.js]
├─ 🔷 buildFileTree(files: array) → object [backend/src/utils/fileTree.js]
│  ├─ 🟣 sortFileTree(node: object) → object [backend/src/utils/fileTree.js]
│  └─ 🟠 formatFileTree(node: object, indent: string, repoUrl: string, branch: string, parentPath: string) → string [backend/src/utils/file.js]
├─ 🔷 analyzeProjectStructure(openai: OpenAI, repoData: object, files: array, readmeContent: string) → Promise<string> [backend/src/analyzer.js]
├─ 🔷 smartFileFilter(files: array, projectUnderstanding: string) → Promise<array> [backend/src/analyzer.js]
├─ 🔷 summarizeContent(openai: OpenAI, content: string, fileTree: array) → Promise<string> [backend/src/analyzer.js]
├─ 🔷 analyzeCode(openai: OpenAI, filePath: string, content: string, fileTree: array) → Promise<object> [backend/src/analyzer.js]
├─ 🔷 createChatCompletion(openai: OpenAI, model: string, modelType: string, analysisPrompt: string) → Promise<object> [backend/src/analyzer.js]
└─ 🔶 saveToFile(filename: string, analysis: object) → Promise<void> [backend/src/utils/file.js]
```

</details>

## 📈 File Analyses  

<details>
  <summary><strong>File: <a href="https://github.com/bhavya1600/RepoSage/blob/main/backend/src/analyzer.js">backend/src/analyzer.js</a></strong></summary>

  **Description**: The `analyzer.js` file is responsible for analyzing a GitHub repository's structure and content using the OpenAI API and Octokit to extract meaningful insights and summaries.

**1. Main purpose and responsibilities**: 
The main purpose of this file is to analyze a specified GitHub repository by fetching its metadata and file structure, then utilizing OpenAI's capabilities to generate insights, summaries, and call hierarchies based on the repository's content.

**2. Key functions and their purposes**: 
- `createChatCompletion(openai, model, modelType, analysisPrompt)`: This function expects `openai` (OpenAI instance), `model` (string), `modelType` (string), and `analysisPrompt` (string). It processes the prompt by calling OpenAI's chat completion API and returns the response data (object).
- `saveApiCallContent(functionName, content)`: This function expects `functionName` (string) and `content` (string). It processes the inputs by appending the content to a log file named `apiResponsesLog.txt` and does not return any data.
- `analyzeRepository(repoUrl)`: This function expects `repoUrl` (string). It processes the repository URL to fetch metadata and file tree, analyzes the project structure, and returns an analysis object (object).
- `analyzeProjectStructure(openai, repoData, files, readmeContent)`: This function expects `openai` (OpenAI instance), `repoData` (object), `files` (array), and `readmeContent` (string). It processes these inputs to generate a project understanding summary and returns this summary (string).
- `smartFileFilter(files, projectUnderstanding)`: This function expects `files` (array) and `projectUnderstanding` (string). It processes the inputs to filter and return an array of essential files (array).
- `summarizeContent(openai, content, fileTree)`: This function expects `openai` (OpenAI instance), `content` (string), and `fileTree` (array). It processes these inputs to generate a summary of the content and returns this summary (string).
- `analyzeCode(openai, filePath, content, fileTree)`: This function expects `openai` (OpenAI instance), `filePath` (string), `content` (string), and `fileTree` (array). It processes these inputs to generate a human-readable analysis and metadata of the code and returns an object containing both (object).
- `analyzeCallHierarchy(openai, fileMetadata, projectUnderstanding)`: This function expects `openai` (OpenAI instance), `fileMetadata` (array), and `projectUnderstanding` (string). It processes these inputs to create a call hierarchy and returns this hierarchy (string).
- `generateSummary(openai, analysis)`: This function expects `openai` (OpenAI instance) and `analysis` (object). It processes these inputs to generate a project summary and returns this summary (string).

**3. Important interactions with other parts of the system**: 
The file interacts with the OpenAI API to generate insights and summaries based on the repository's content. It also uses Octokit to fetch metadata and file trees from GitHub. Additionally, it utilizes utility functions from the `utils/github.js` and `utils/fileTree.js` files for parsing URLs and building file trees.

**4. Notable features or patterns**: 
- The use of asynchronous functions to handle API calls and file operations.
- The implementation of error handling for API responses and file operations.
- The modular approach with helper functions to separate concerns, such as filtering files and generating summaries.
- The integration of logging for API responses to a text file for later reference.

Overall, this file serves as a comprehensive tool for analyzing GitHub repositories, leveraging AI to provide detailed insights into project structure and functionality.

  ---
</details>

<details>
  <summary><strong>File: <a href="https://github.com/bhavya1600/RepoSage/blob/main/backend/src/utils/file.js">backend/src/utils/file.js</a></strong></summary>

  This code file provides functionality for saving analysis results of a GitHub repository into markdown and JSON formats.

**1. Main purpose and responsibilities**: 
The primary purpose of this file is to generate and save a detailed analysis report of a GitHub repository, including project details, file structure, and function call hierarchy, in both markdown and JSON formats.

**2. Key functions and their purposes**: 
- `saveToFile(filename: string, analysis: object)`: This function expects a filename (string) and an analysis object (object). It processes the analysis data to create a markdown report and a JSON file containing repository metadata and file analysis, then writes both files to the filesystem.
  
- `formatFileTree(node: object, indent: string, repoUrl: string, branch: string, parentPath: string)`: This function expects a file tree node (object), an indentation string (string), a repository URL (string), a branch name (string), and a parent path (string). It processes the file tree structure recursively to format it into a human-readable string representation, including links to files in the GitHub repository.

- `getFullPath(node: object)`: This function expects a node (object) and processes it to return the full path of the file or directory as a string, reconstructing it if necessary.

**3. Important interactions with other parts of the system**: 
The `saveToFile` function interacts with the filesystem to save the generated markdown and JSON files. It also utilizes the `formatFileTree` function to create a structured representation of the file tree from the analysis data, and it constructs GitHub links using the repository information provided in the analysis object.

**4. Notable features or patterns**: 
The code employs asynchronous file operations using `fs/promises` for writing files, ensuring non-blocking behavior. It also utilizes template literals for constructing markdown content dynamically, and it includes a recursive approach for formatting the file tree, which helps in maintaining a clear structure in the output.

Overall, this file is crucial for generating and saving comprehensive insights into a GitHub repository's structure and functionality, facilitating better understanding and documentation of the project.

  ---
</details>

<details>
  <summary><strong>File: <a href="https://github.com/bhavya1600/RepoSage/blob/main/backend/src/utils/fileTree.js">backend/src/utils/fileTree.js</a></strong></summary>

  This code file is responsible for constructing a hierarchical representation of a file system tree from a flat list of file paths.

**1. Main purpose and responsibilities**: 
The main purpose of `fileTree.js` is to build a structured file tree representation from an array of file objects, categorizing them into directories and files.

**2. Key functions and their purposes**: 
- `buildFileTree(files)`: This function expects an array of file objects (each with a `path` and `type`), processes this data to create a nested directory structure, and returns an object representing the file tree.
- `sortFileTree(node)`: This function expects a node of the file tree (an object), processes its children to sort them first by type (directories before files) and then alphabetically, and returns the sorted node.

**3. Important interactions with other parts of the system**: 
The `buildFileTree` function is likely called by other components in the backend that need to display or analyze the file structure. The output of this function can be used in various contexts, such as generating a visual representation of the file system or performing further analysis on the files.

**4. Notable features or patterns**: 
The code employs a recursive approach to build and sort the file tree, ensuring that directories are prioritized over files in the sorting process. It also handles the case where a file may be mistakenly identified as a directory by updating the type accordingly.

Overall, `fileTree.js` plays a crucial role in organizing file data into a user-friendly structure, facilitating easier navigation and management of files within the application.

  ---
</details>

<details>
  <summary><strong>File: <a href="https://github.com/bhavya1600/RepoSage/blob/main/backend/src/utils/github.js">backend/src/utils/github.js</a></strong></summary>

  Give a one or two liner description of the code file.
This code file provides utility functions for handling GitHub URLs, specifically for parsing repository information.

**1. Main purpose and responsibilities**: 
The main purpose of this file is to parse GitHub repository URLs and extract the owner and repository name from them.

**2. Key functions and their purposes**: 
- `parseGitHubUrl(url: string)`: This function expects a string input representing a GitHub repository URL, processes it to extract the owner and repository name, and returns an object containing these values as strings.

**3. Important interactions with other parts of the system**: 
This function can be used by other modules in the backend to validate and extract repository information from user-provided URLs, facilitating interactions with GitHub APIs or other functionalities that require repository details.

**4. Notable features or patterns**: 
The function employs error handling to manage invalid URLs and uses the URL API for robust parsing, ensuring that only correctly formatted GitHub URLs are processed.

Overall, this code file is essential for ensuring that GitHub URLs are correctly interpreted, providing a reliable way to extract necessary repository information for further operations within the application.

  ---
</details>

<details>
  <summary><strong>File: <a href="https://github.com/bhavya1600/RepoSage/blob/main/frontend/src/App.jsx">frontend/src/App.jsx</a></strong></summary>

  This code file is the main component of a React application that allows users to analyze GitHub repositories and download the analysis results.

**1. Main purpose and responsibilities**: 
The App component manages the state and functionality for submitting a GitHub repository URL for analysis and displaying logs of the analysis process, as well as providing a download option for the results.

**2. Key functions and their purposes**: 
- `handleSubmit`: This function expects an event object (`e`) as input, prevents the default form submission behavior, sets loading states, and sends a POST request to the backend API with the repository URL. It processes the streaming response to update logs and indicates when the analysis is complete. It returns nothing (void).
- `handleDownload`: This function expects no inputs, fetches the analysis results from the backend, creates a downloadable link for the results file, and triggers the download. It returns nothing (void).

**3. Important interactions with other parts of the system**: 
The component interacts with the backend API at `http://localhost:5000/api/analyze` for submitting the repository URL and `http://localhost:5000/api/download-analysis` for downloading the analysis results. It updates the UI based on the responses received from these API calls.

**4. Notable features or patterns**: 
The component uses React hooks (`useState`) for state management, handles asynchronous operations with `async/await`, and processes streaming responses using the `ReadableStream` API. It also implements error handling and conditional rendering based on the loading state and analysis completion status.

Overall, the App component serves as the user interface for the analysis tool, facilitating user input, displaying real-time logs, and enabling the download of results, effectively integrating frontend and backend functionalities.

  ---
</details>

<details>
  <summary><strong>File: <a href="https://github.com/bhavya1600/RepoSage/blob/main/frontend/src/main.jsx">frontend/src/main.jsx</a></strong></summary>

  Give a one or two liner description of the code file.
**1. Main purpose and responsibilities**: This file serves as the entry point for the React application, initializing the app and rendering it to the DOM.

**2. Key functions and their purposes**: 
- `createRoot(container: HTMLElement)`: This function expects a DOM element (container) where the React app will be rendered. It initializes a root for the React application.
- `render(element: ReactNode)`: This function expects a React element (in this case, `<App />`) and renders it within the specified root. It processes the component tree and outputs the rendered UI to the DOM.

**3. Important interactions with other parts of the system**: The file imports the main application component (`App`) and a CSS file for styling, ensuring that the app has the necessary structure and styles when rendered.

**4. Notable features or patterns**: The use of `StrictMode` is notable as it helps identify potential problems in the application during development by activating additional checks and warnings.

Overall, this file is crucial for bootstrapping the React application, ensuring that it is properly rendered and styled in the browser while adhering to best practices with the use of `StrictMode`.

  ---
</details>

<details>
  <summary><strong>File: <a href="https://github.com/bhavya1600/RepoSage/blob/main/frontend/vite.config.js">frontend/vite.config.js</a></strong></summary>

  Give a one or two liner description of the code file.  
This file configures Vite, a build tool, for a React application, enabling the use of React features and optimizations.

**1. Main purpose and responsibilities**:  
The main purpose of this file is to define the configuration settings for Vite, specifically to integrate React support into the application.

**2. Key functions and their purposes**:  
- `defineConfig`: This function expects an object as input (of type `Object`), processes the provided configuration settings, and returns a configuration object (of type `Object`) that Vite uses to build and serve the application.

**3. Important interactions with other parts of the system**:  
This configuration interacts with the Vite build tool and the React plugin, allowing the frontend application to utilize React features and optimizations during development and production builds.

**4. Notable features or patterns**:  
The use of the `defineConfig` function is a notable pattern that helps in providing type inference and autocompletion for the configuration object, enhancing developer experience.

Overall...  
This file is essential for setting up the development environment for a React application using Vite, ensuring that the application can leverage modern JavaScript features and React's capabilities efficiently.

  ---
</details>


## ✒️ Project Summary 
This project is a tool designed to analyze GitHub repositories, providing insights file by file, along with a call hierarchy and project summary.

1. **Main purpose and functionality**: The main purpose of RepoSage is to help users understand GitHub repositories by analyzing their structure and content using OpenAI's API. It generates insights, summaries, and call hierarchies based on the repository's files.

2. **Tech stack and architecture**: The project is built using JavaScript with a Node.js backend and a React frontend. It employs Express.js for backend services and Vite for frontend build processes, ensuring a modern and efficient development experience.

3. **Key components and their interactions**: The backend contains the core analysis logic, utilities for file handling and GitHub API interactions, and configuration files for OpenAI integration. The frontend provides a user interface that communicates with the backend via API calls, allowing users to input repository URLs and receive analysis results.

4. **Notable features**: RepoSage features deep analysis of repository metadata, file structures, and content summaries. It also includes functionality for generating call hierarchies and saving analysis results in both JSON and markdown formats.

5. **Code organization and structure**: The code is organized into a modular structure with separate directories for backend and frontend components. The backend consists of analysis logic, utility functions, and configuration files, while the frontend contains React components and styling files.

Overall, RepoSage serves as a comprehensive tool for developers seeking to gain insights into GitHub repositories.