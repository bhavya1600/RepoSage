# 🤖 RepoSage AI

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A powerful tool for deep analysis of GitHub repositories, providing file-by-file insights, call hierarchy visualization, and AI-powered summaries using OpenAI's API.

**RepoSage** combines advanced reasoning models for multi-step, context-aware analysis of complex project structures with agile general models for fast, high-level summarization. This dual-model approach captures nuanced interdependencies and delivers more accurate, reliable insights than traditional one-shot methods.

Take a quick look on a sample report [here](https://github.com/bhavya1600/RepoSage/blob/main/backend/analysis_results.md).

---

![RepoSage](https://github.com/bhavya1600/RepoSage/blob/main/assets/RepoSageSS.png)

---
## 📑 Table of Contents 

- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Important Notes Before Running the Project](#important-notes-before-running-the-project)
        - [Cost Considerations](#cost-considerations)
        - [Configuration Options](#configuration-options)
- [Local Setup](#local-setup)
    - [Cloning the Repository](#cloning-the-repository)
    - [Backend Setup](#backend-setup)
    - [Create .env file in backend folder](#create-env-file-in-backend-folder)
    - [Frontend Setup](#frontend-setup)

- [Usage](#usage)
    - [Backend](#backend)
    - [Frontend](#frontend)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)
- [Contact](#contact)

---

## 📝 Introduction

**RepoSage** is a powerful tool for deep analysis of GitHub repositories, providing file-by-file insights, call hierarchy visualization, and AI-powered summaries using OpenAI's API.

The uniqueness of this project lies in its multi-step, AI-powered approach that goes far beyond traditional static or one-shot methods:

- **Multi-Layered Analysis**: It starts by fetching repository metadata, file trees, and README content, then leverages this context to analyze project structure, filter essential files, examine individual code files, generate a detailed call hierarchy, and finally produce a comprehensive project summary.


- **Hybrid AI Strategy**: It dynamically chooses between reasoning models (for in-depth, logical, multi-step tasks like call hierarchy generation and smart file filtering) and general models (for broad summarization tasks), ensuring both nuanced insights and efficient processing.


- **Smart File Filtering**: Instead of analyzing every file, it employs an AI-driven filter to identify only the most relevant files for analysis, using a robust fallback mechanism if needed.


- **Token and Response Management**: The analyzer monitors token usage to avoid limits by summarizing content when necessary and logs API responses for transparency and debugging.

By combining these elements, the analyzer.js provides a context-aware, detailed, and accurate understanding of a repository’s structure and functionality—delivering insights that traditional one-shot methods simply can’t match.

---
## ✨ Features 

- **Repository Analysis**: Comprehensive examination of GitHub repositories
- **AI-Powered Insights**: Integration with OpenAI for intelligent summarization
- **Call Hierarchy Visualization**: Understand project structure and function relationships
- **File-by-File Breakdown**: Detailed analysis of individual files
- **Modern Web Interface**: Responsive React frontend with Vite build system
- **Modular Architecture**: Clean separation between backend and frontend components

---

## 🛠️ Tech Stack 

### Backend
- **Language**: JavaScript (Node.js)
- **Framework**: Express.js (assumed based on common practices)
- **APIs**: OpenAI API for analysis and summarization
- **Utilities**: Custom utilities for file handling and GitHub API interactions

### Frontend
- **Library**: React
- **Build Tool**: Vite
- **Styling**: CSS

---


## 🚀 Getting Started 

### Prerequisites

- Node.js (v18+)
- npm (v9+)
- OpenAI API Key


### ⚠️ Important Notes Before Running the Project 

This project utilizes the [GitHub API](https://github.com/settings/tokens) and [OpenAI API](https://platform.openai.com/api-keys) for repository analysis and summarization. To run the project, you will need:

- A GitHub token to access GitHub's API.
- An OpenAI API key to interact with OpenAI's services.

#### 💰 Cost Considerations

Please be aware that this project is not free to run. It makes multiple API calls to OpenAI, and the cost will depend on the size of the repository being analyzed. The number of API calls varies based on the repository's complexity and size.

#### 🔧 Configuration Options

You can customize the following settings to optimize performance and cost:



- **Model Selection:**

    - The default model configuration is recommended for the best performance.
    - You can change the model used for each function call in **`backend/openaiConfig.json`** file.
    - For a more cost-effective analysis, use the configuration specified in the **`backend/openaiConfigQA.json`** file. (You can change it in **`backend/src/analyzer.js`** file)
&nbsp;
- **Token Limits:**
    -  Adjust the **`MAX_TOKENS_PER_REQUEST`** setting to control the token usage per repository.
&nbsp;
- **Recommendation**

    - For most users, the default configuration provides the best balance of performance and accuracy. However, if cost is a concern, consider switching to the cost-effective model as described above.



### 📦 Local Setup



Each function call to OpenAI API is logged in `apiResponsesLog.txt` file in the root of the project.

1. **Clone Repository**


   ```bash
   git clone https://github.com/your-username/github-repo-bot.git
   cd github-repo-bot
     ```


2. **Backend Setup**

   ```bash
   cd backend
   npm install
   ```

3. **Create .env file in backend folder:**

   ```bash
   cd backend

   OPENAI_API_KEY=your_openai_key_here
   GITHUB_TOKEN=your_github_token_here
   ```

3. **Frontend Setup**

   ```bash
   cd ../frontend
   npm install
   ```

4. **Configuration**

   Update OpenAI settings in backend/openaiConfig.json

    Modify server port in backend/index.js if needed

---

## 📦 Usage

### Backend
In seperate terminals run the following commands:
```bash
cd backend
npm start
```

### Frontend
```bash
cd frontend
npm run dev
```
Default port for frontend is [5173](http://localhost:5173). If it is already in use, you can change it in [frontend/vite.config.js](frontend/vite.config.js) file.


1. Enter GitHub repository URL in the input field

2. Click "Analyze Repository"

3. View real-time analysis progress

4. Download and Explore generated MarkDown reports containing:

    - Project summary
    - File-by-file analysis
    - Call hierarchy diagram
    - Code insights powered by OpenAI
---

## 🤝 Contributing

Contributions are welcome! If you have suggestions, improvements, or bug fixes, please:


1. Fork the repository.
2. Create a new branch (git checkout -b feature/your-feature).
3. Commit your changes (git commit -m 'Add some feature').
4. Push to the branch (git push origin feature/your-feature).
5. Open a Pull Request.


---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

--- 

## 🤝 Acknowledgments

- OpenAI: For providing the API that powers the analysis.
- Vite: For the modern and fast frontend build tooling.
- React: For the robust library used in building the user interface.


---

## 📧 Contact

For questions or feedback, please contact me at [bhavya1600@gmail.com](mailto:bhavya1600@gmail.com).



