# 🔍 Repository Insights

## 📃 Project Details 
- **Name:** local-LLM-with-RAG
- **Description:** Running local Language Language Models (LLM) to perform Retrieval-Augmented Generation (RAG)
- **Primary Language:** Python

## 🤓 Project Understanding 
<details>
  <summary><strong>Peek Under the Hood 👀</strong></summary>

  The repository **local-LLM-with-RAG** is structured to facilitate the development and testing of a Retrieval-Augmented Generation (RAG) system using local Large Language Models (LLMs). Below is a concise analysis of its file structure and components:

### Main Components:
1. **Core Scripts:**
   - `app.py`: The main application script that orchestrates the loading of documents, generating embeddings, and querying the LLM.
   - `document_loader.py`: Responsible for loading documents (PDFs) from the specified directory.
   - `llm.py`: Likely contains logic related to interacting with the LLM, such as model initialization and querying.
   - `models.py`: Possibly defines the models used, including configurations for the LLM and embeddings.

2. **User Interface:**
   - `ui.py`: This script sets up the Streamlit web UI, allowing users to interact with the application through a graphical interface.

3. **Data and Resources:**
   - `Research/`: A directory containing sample PDF documents used for testing the RAG functionality.
   - `images/`: Contains images used in the README and UI, enhancing visual understanding.

4. **Configuration and Dependency Management:**
   - `pyproject.toml`: Specifies project dependencies and configurations for the Python environment.
   - `pyrightconfig.json`: Configuration file for type checking with Pyright, ensuring code quality and type safety.
   - `uv.lock`: A lock file for the UV package manager, ensuring consistent dependency resolution.

5. **Documentation:**
   - `README.md`: Provides an overview of the project, setup instructions, and usage guidelines.
   - `.gitignore`: Specifies files and directories that should be ignored by Git, keeping the repository clean.

### Tech Stack:
- **Python**: The primary programming language used.
- **Ollama**: For running LLMs locally.
- **Langchain**: A library for working with LLMs.
- **Chroma**: A vector database for managing embeddings.
- **Streamlit**: For creating the web UI.
- **PyPDF**: For handling PDF document manipulation.
- **UV**: A package installer used for managing Python dependencies.

### Architecture:
The architecture follows a modular design where:
- The core logic is separated into different scripts for clarity and maintainability.
- The UI is handled separately, allowing for a user-friendly interaction layer.
- Document handling and model interaction are encapsulated in their respective modules, promoting reusability and ease of testing.

Overall, this repository serves as a robust experimental framework for developing a RAG system using local LLMs, with a focus on modularity and user interaction through a web interface.

</details>

## 🌲 Project Structure 
<details>
  <summary><strong>File Tree</strong></summary>

  📁 images/
&nbsp;&nbsp;&nbsp;&nbsp;📄 [streamlit_ui.png](https://github.com/amscotti/local-LLM-with-RAG/blob/main/images/streamlit_ui.png)
&nbsp;&nbsp;&nbsp;&nbsp;📄 [wizard_experimenting.jpg](https://github.com/amscotti/local-LLM-with-RAG/blob/main/images/wizard_experimenting.jpg)
📁 Research/
&nbsp;&nbsp;&nbsp;&nbsp;📄 [2304.03442v1.pdf](https://github.com/amscotti/local-LLM-with-RAG/blob/main/Research/2304.03442v1.pdf)
&nbsp;&nbsp;&nbsp;&nbsp;📄 [2305.14325.pdf](https://github.com/amscotti/local-LLM-with-RAG/blob/main/Research/2305.14325.pdf)
&nbsp;&nbsp;&nbsp;&nbsp;📄 [2308.10848.pdf](https://github.com/amscotti/local-LLM-with-RAG/blob/main/Research/2308.10848.pdf)
&nbsp;&nbsp;&nbsp;&nbsp;📄 [2309.14391.pdf](https://github.com/amscotti/local-LLM-with-RAG/blob/main/Research/2309.14391.pdf)
📄 [.gitignore](https://github.com/amscotti/local-LLM-with-RAG/blob/main/.gitignore)
📄 [app.py](https://github.com/amscotti/local-LLM-with-RAG/blob/main/app.py)
📄 [document_loader.py](https://github.com/amscotti/local-LLM-with-RAG/blob/main/document_loader.py)
📄 [LICENSE](https://github.com/amscotti/local-LLM-with-RAG/blob/main/LICENSE)
📄 [llm.py](https://github.com/amscotti/local-LLM-with-RAG/blob/main/llm.py)
📄 [models.py](https://github.com/amscotti/local-LLM-with-RAG/blob/main/models.py)
📄 [pyproject.toml](https://github.com/amscotti/local-LLM-with-RAG/blob/main/pyproject.toml)
📄 [pyrightconfig.json](https://github.com/amscotti/local-LLM-with-RAG/blob/main/pyrightconfig.json)
📄 [readme.md](https://github.com/amscotti/local-LLM-with-RAG/blob/main/readme.md)
📄 [ui.py](https://github.com/amscotti/local-LLM-with-RAG/blob/main/ui.py)
📄 [uv.lock](https://github.com/amscotti/local-LLM-with-RAG/blob/main/uv.lock)


</details>

## 📞 Call Hierarchy 
<details>
  <summary><strong>Detailed Function Call Hierarchy</strong></summary>

  Here's a structured call hierarchy for the **local-LLM-with-RAG** project, detailing the main execution flow, important function calls between files, and dependencies between modules.

### Call Hierarchy

```
📁 main() → None [app.py]
├─ 🔷 parse_arguments() → argparse.Namespace [app.py]
│   └─ (parses command-line arguments)
├─ 🔷 check_if_model_is_available(llm_model_name: str) → None [models.py]
│   └─ 🔶 __is_model_available_locally(model_name: str) → bool [models.py]
│       └─ (checks local model availability)
├─ 🔷 load_documents_into_database(model_name: str, documents_path: str, reload: bool) → Chroma [document_loader.py]
│   ├─ 🔶 load_documents(path: str) → List[Document] [document_loader.py]
│   │   └─ (loads documents from the specified directory)
│   └─ (loads documents into Chroma database after splitting text)
└─ 🔷 getChatChain(llm, db) → chat function [llm.py]
    └─ 🔶 chat(question: str) → None [llm.py]
        └─ (processes a question and retrieves an answer)
```

### Entry Point File
- **`app.py`**: This is the main entry point of the application where the execution starts.

### Main Execution Flow
1. **`main()`** is called, which serves as the entry point.
2. **`parse_arguments()`** is invoked to parse command-line arguments for model and document path.
3. **`check_if_model_is_available(llm_model_name)`** checks if the specified LLM model is available locally.
   - Calls **`__is_model_available_locally(model_name)`** to verify local availability.
4. **`load_documents_into_database(model_name, documents_path, reload)`** is called to load documents into the database.
   - Calls **`load_documents(path)`** to load documents from the specified directory.
5. **`getChatChain(llm, db)`** is called to create a chat function for processing questions.
   - Calls **`chat(question)`** to process user questions and retrieve answers.

### Important Function Calls Between Files
- **`app.py`**
  - Calls functions from **`models.py`**, **`document_loader.py`**, and **`llm.py`**.
- **`document_loader.py`**
  - Loads documents and interacts with the Chroma database.
- **`llm.py`**
  - Handles the logic for querying the LLM and managing chat interactions.

### Dependencies Between Modules
- **`app.py`** depends on:
  - `models` (for model availability checks)
  - `document_loader` (for loading documents)
  - `llm` (for LLM interaction)
- **`document_loader.py`** depends on:
  - `langchain_community.document_loaders` (for loading documents)
  - `langchain_ollama` (for embeddings)
  - `langchain_community.vectorstores` (for Chroma database)
- **`llm.py`** depends on:
  - `langchain` (for LLM processing)
- **`models.py`** depends on:
  - `ollama` (for model management)

This structured hierarchy provides a clear understanding of how the application flows from the entry point through various files and functions, highlighting the main execution path and important function calls between files.

</details>

## 📈 File Analyses  

<details>
  <summary><strong>File: <a href="https://github.com/amscotti/local-LLM-with-RAG/blob/main/app.py">app.py</a></strong></summary>

  Give a one or two liner description of the code file.  
This code file (`app.py`) serves as the main entry point for a local application that utilizes a language model to answer user queries based on documents loaded from a specified directory.

**1. Main purpose and responsibilities**:  
The main purpose of this file is to initialize and run a local language model (LLM) application that allows users to ask questions based on documents, leveraging a retrieval-augmented generation (RAG) approach.

**2. Key functions and their purposes**:  
- `main(llm_model_name: str, embedding_model_name: str, documents_path: str) -> None`: This function expects the names of the LLM and embedding models, along with the path to the documents. It checks the availability of the models, loads the documents into a database, initializes the chat interface, and handles user input for querying the model.
  
- `parse_arguments() -> argparse.Namespace`: This function does not take any inputs and returns a namespace containing command-line arguments for the model names and document path, allowing users to customize the execution parameters.

**3. Important interactions with other parts of the system**:  
The `main` function interacts with the `check_if_model_is_available` function from `models` to verify model availability, and with `load_documents_into_database` from `document_loader` to load documents into a database. It also utilizes the `getChatChain` function from `llm` to create a chat interface for user interactions.

**4. Notable features or patterns**:  
The code employs a command-line interface for user input, utilizes exception handling for robustness, and implements a continuous loop for user queries until an exit command is given. It also follows a modular design by separating concerns into different functions and modules.

Overall...  
This `app.py` file effectively orchestrates the initialization and operation of a local LLM application, enabling users to interact with a model based on the content of specified documents while ensuring error handling and user-friendly command-line interactions.

  ---
</details>

<details>
  <summary><strong>File: <a href="https://github.com/amscotti/local-LLM-with-RAG/blob/main/document_loader.py">document_loader.py</a></strong></summary>

  **1. Main purpose and responsibilities**:  
The `document_loader.py` file is responsible for loading various document types (PDF and Markdown) from a specified directory, processing them into manageable chunks, and storing them in a Chroma database for further use.

**2. Key functions and their purposes**:  
- `load_documents_into_database(model_name: str, documents_path: str, reload: bool = True) -> Chroma`: This function expects a model name (string), a documents path (string), and a reload flag (boolean). It loads documents from the specified path, splits them into chunks, and returns a Chroma database instance containing the embedded documents.
  
- `load_documents(path: str) -> List[Document]`: This function expects a path (string) to a directory. It checks if the path exists, loads PDF and Markdown documents using appropriate loaders, and returns a list of loaded Document objects.

**3. Important interactions with other parts of the system**:  
The `document_loader.py` interacts with the Chroma vector store to persist the loaded documents and with the OllamaEmbeddings for creating embeddings of the documents. It also utilizes the `langchain_community` library for document loading and text splitting.

**4. Notable features or patterns**:  
The code employs a modular design, separating the loading and processing of documents into distinct functions. It uses a dictionary to map file extensions to their respective loaders, allowing for easy extensibility if new document types need to be supported in the future. The use of a text splitter ensures that documents are processed in manageable chunks, which is beneficial for embedding and retrieval tasks.

Overall, the `document_loader.py` file plays a crucial role in preparing and managing document data for further processing in the application.

  ---
</details>

<details>
  <summary><strong>File: <a href="https://github.com/amscotti/local-LLM-with-RAG/blob/main/llm.py">llm.py</a></strong></summary>

  Give a one or two liner description of the code file.
**1. Main purpose and responsibilities**: This file defines functionality for processing questions and retrieving answers based on research documents using a conversational memory model and language model.

**2. Key functions and their purposes**: 
- `getStreamingChain(question: str, memory, llm, db)`: This function expects a string `question`, a memory object, a language model `llm`, and a database `db`. It processes the question by condensing it, retrieving relevant documents, and generating an answer, returning a stream of responses.
- `getChatChain(llm, db)`: This function expects a language model `llm` and a database `db`. It sets up a conversational chain that retrieves documents and generates answers based on user questions, returning a `chat` function that can be invoked with a question.

**3. Important interactions with other parts of the system**: The code interacts with a database to retrieve relevant documents, utilizes a language model for generating answers, and employs a memory mechanism to maintain the context of the conversation.

**4. Notable features or patterns**: The code uses a modular approach with functions for different types of chains (streaming and chat), leverages prompts for formatting questions and answers, and incorporates a memory buffer to manage conversation history effectively.

Overall, this file serves as a core component for handling user inquiries in a research context, enabling dynamic interactions based on previous conversations and relevant document retrieval.

  ---
</details>

<details>
  <summary><strong>File: <a href="https://github.com/amscotti/local-LLM-with-RAG/blob/main/models.py">models.py</a></strong></summary>

  Give a one or two liner description of the code file.
**1. Main purpose and responsibilities**: This file manages the retrieval and availability of machine learning models from the Ollama repository, ensuring that required models are either locally available or downloaded.

**2. Key functions and their purposes**: 
- `__pull_model(name: str) -> None`: This function expects a model name as input (string), processes the model download from the Ollama repository while displaying progress, and does not return any data.
- `__is_model_available_locally(model_name: str) -> bool`: This function expects a model name as input (string), checks if the model is available locally, and returns a boolean indicating availability.
- `get_list_of_models() -> list[str]`: This function retrieves a list of available model names from the Ollama repository and returns it as a list of strings.
- `check_if_model_is_available(model_name: str) -> None`: This function expects a model name as input (string), checks its local availability, and pulls it from the repository if not available, raising exceptions for errors.

**3. Important interactions with other parts of the system**: The code interacts with the Ollama API to check for model availability and to download models. It utilizes the `tqdm` library for progress visualization during model downloads.

**4. Notable features or patterns**: The use of private functions (indicated by the double underscore prefix) suggests encapsulation of functionality. The code also employs exception handling to manage errors related to model availability and network communication.

Overall, this file serves as a crucial component for managing machine learning models, ensuring that the application can access the necessary models efficiently and with user feedback during downloads.

  ---
</details>

<details>
  <summary><strong>File: <a href="https://github.com/amscotti/local-LLM-with-RAG/blob/main/pyproject.toml">pyproject.toml</a></strong></summary>

  Give a one or two liner description of the code file.
**1. Main purpose and responsibilities**: The `pyproject.toml` file defines the project metadata, dependencies, and Python version requirements for the "local-llm-with-rag" project.

**2. Key functions and their purposes**: 
- The `name` field specifies the project name as a string.
- The `version` field indicates the current version of the project as a string.
- The `description` field provides a brief description of the project as a string.
- The `readme` field points to the README file for additional project documentation as a string.
- The `requires-python` field specifies the minimum required Python version as a string.
- The `dependencies` list includes specific package versions and their requirements as strings, which are necessary for the project to run.

**3. Important interactions with other parts of the system**: This file interacts with the package management system (like `pip` or `poetry`) to install the specified dependencies, ensuring that the project has all necessary libraries to function correctly.

**4. Notable features or patterns**: The use of specific versioning for dependencies indicates a focus on stability and compatibility, while the inclusion of a `readme` field suggests an emphasis on documentation for users and developers.

Overall, the `pyproject.toml` file serves as a crucial configuration file that outlines the project's identity, dependencies, and environment requirements, facilitating smooth development and deployment.

  ---
</details>

<details>
  <summary><strong>File: <a href="https://github.com/amscotti/local-LLM-with-RAG/blob/main/ui.py">ui.py</a></strong></summary>

  **1. Main purpose and responsibilities**:  
The `ui.py` file serves as the user interface for a local language model application using Streamlit, allowing users to select models, index documents, and interact with the model through a chat interface.

**2. Key functions and their purposes**:  
- **get_list_of_models()**: This function retrieves a list of available models from the `models` module. It returns a list of strings representing model names.
- **load_documents_into_database(EMBEDDING_MODEL, folder_path)**: This function takes a string `EMBEDDING_MODEL` and a string `folder_path`, processes the documents in the specified folder to create embeddings, and loads them into a database. It returns a database object.
- **getStreamingChain(prompt, messages, llm, db)**: This function expects a string `prompt`, a list of message dictionaries `messages`, an instance of the language model `llm`, and a database object `db`. It processes the input to generate a streaming response from the language model based on the conversation history and indexed documents. It returns a stream of responses.

**3. Important interactions with other parts of the system**:  
The `ui.py` file interacts with the `document_loader` module for loading documents, the `models` module for fetching model names, and the `llm` module for generating responses. It also utilizes Streamlit's session state to maintain the state of the application across user interactions.

**4. Notable features or patterns**:  
The file employs Streamlit's session state to manage user selections and chat history, ensuring a smooth user experience. It includes input validation for the folder path and provides user feedback through messages and warnings, enhancing usability.

Overall, `ui.py` is a crucial component that facilitates user interaction with a local language model, enabling document indexing and real-time question answering through a chat interface.

  ---
</details>


## ✒️ Project Summary 
This project is a framework for developing and testing a Retrieval-Augmented Generation (RAG) system using local Large Language Models (LLMs).

1. **Main purpose and functionality**: The project enables users to run local LLMs to perform RAG, allowing for enhanced document retrieval and question answering capabilities through a user-friendly web interface.

2. **Tech stack and architecture**: The project is built primarily in Python and utilizes libraries such as Ollama for LLMs, Langchain for model interactions, Chroma for managing embeddings, and Streamlit for the web UI. Its architecture is modular, separating core functionalities into distinct scripts.

3. **Key components and their interactions**: The main components include `app.py` (the entry point that orchestrates the application), `document_loader.py` (for loading and processing documents), `llm.py` (for interacting with the LLM), and `ui.py` (for the user interface). These components interact through function calls, enabling document loading, model checking, and user queries.

4. **Notable features**: The project supports loading documents from various formats, querying LLMs for responses, and provides a Streamlit-based UI for easy interaction. It also includes functionalities for checking model availability and managing embeddings.

5. **Code organization and structure**: The code is organized into several scripts, each handling specific tasks, such as document loading, LLM interaction, and UI setup. Configuration files like `pyproject.toml` manage dependencies, while the `README.md` offers documentation and usage instructions.

Overall, this repository serves as a robust experimental framework for developing a RAG system using local LLMs, emphasizing modularity and user interaction through a web interface.