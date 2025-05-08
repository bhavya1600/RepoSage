# 🔍 Repository Insights

## 📃 Project Details 
- **Name:** local-LLM-with-RAG
- **Description:** Running local Language Language Models (LLM) to perform Retrieval-Augmented Generation (RAG)
- **Primary Language:** Python

## 🤓 Project Understanding 
<details>
  <summary><strong>Peek Under the Hood 👀</strong></summary>

  ### Analysis of the Project

1. **Project Overview**:  
   This project implements a local Large Language Model (LLM) with Retrieval-Augmented Generation (RAG) capabilities. It uses Ollama to run LLMs locally, Langchain for processing, and Chroma for vector storage. The system allows users to interact with the RAG system via a command-line interface or a Streamlit-based web UI.

2. **Main Components**:  
   - **Document Loader**: Handles loading and processing of PDF and Markdown files (e.g., `document_loader.py`).  
   - **LLM Integration**: Uses Ollama to run LLMs like Mistral for text generation (`llm.py`).  
   - **Embeddings**: Implements embeddings using models like Nomic Embed Text for vector storage (`models.py`).  
   - **Vector Database**: Utilizes Chroma for efficient retrieval of similar text embeddings.  
   - **User Interface**: A Streamlit-based web UI (`ui.py`) for interactive user interaction.  
   - **Main Application**: Combines all components into a RAG pipeline (`app.py`).

3. **Tech Stack**:  
   - **Programming Language**: Python.  
   - **Frameworks/Libraries**: Langchain, Ollama, Chroma, PyPDF2, Streamlit.  
   - **Dependency Management**: UV (Astral).  

4. **Architecture**:  
   The system follows a modular architecture:  
   - **Document Processing**: Loads and processes documents into embeddings.  
   - **Vector Storage**: Embeddings are stored in Chroma for efficient retrieval.  
   - **LLM Integration**: Uses Ollama to generate responses based on retrieved context.  
   - **User Interaction**: Streamlit provides a web-based UI for user interaction.  

5. **Key Limitations/Constraints**:  
   - **Dependency on Local Setup**: The system is designed to run locally, which may limit scalability.  
   - **UV Dependency**: Uses UV for dependency management, which may not be familiar to all users.  
   - **Re-Loading Embeddings**: Embeddings are reloaded on each run, which is inefficient for production use.  
   - **Limited Documentation**: The provided README is minimal and could benefit from more detailed explanations and examples.

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

  ```
🚀 app.py (ENTRY POINT)
  ┣━━ 📋 parse_arguments() → Parses command-line arguments [app.py]
  ┃   ┗━━ Returns configuration for the application
  ┣━━ 🏋️♂️ main() → Runs the RAG pipeline and user interaction [app.py]
  ┃   ┣━━ 🔍 check_if_model_is_available() → Ensures LLM model is available [models.py]
  ┃   ┣━━ 📂 load_documents_into_database() → Loads documents and creates database [document_loader.py]
  ┃   ┣━━ 🔧 getChatChain() → Initializes the LLM chat chain [llm.py]
  ┃   ┗━━ 📱 Handles user input and interacts with the LLM
  ┣━━ 🌐 (Alternative Entry Point) ui.py → Streamlit-based web UI [ui.py]
  ┃   ┣━━ 📂 load_documents_into_database() → Loads documents and creates database [document_loader.py]
  ┃   ┣━━ 🔧 getStreamingChain() → Initializes streaming LLM chain [llm.py]
  ┃   ┣━━ 📬 Handles user input through web interface
  ┃   ┗━━ 📝 Displays streaming responses to user
  ┗━━ 📋 (Alternative Entry Point) CLI → Command-line interface for RAG interaction
```

</details>

## 📈 File Analyses  

<details>
  <summary><strong>File: <a href="https://github.com/amscotti/local-LLM-with-RAG/blob/main/app.py">app.py</a></strong></summary>

  ### 1. Main Purpose and Responsibilities

The `app.py` file serves as the main entry point for a local application that leverages Large Language Models (LLMs) with Retrieval-Augmented Generation (RAG) capabilities. Its primary responsibilities include:

- **Model Availability Check**: Ensuring the required LLM and embedding models are available or can be downloaded.
- **Document Loading**: Loading documents from a specified directory into a vector database for efficient retrieval.
- **User Interaction**: Providing an interactive prompt where users can input questions, which are then answered using the LLM and RAG pipeline.
- **Command-Line Interface (CLI)**: Parsing command-line arguments to configure the application's behavior, such as specifying the model names and document paths.

### 2. Key Functions and Their Purposes

#### `main(llm_model_name: str, embedding_model_name: str, documents_path: str) -> None`
- **Inputs**:
  - `llm_model_name` (str): The name of the LLM model to use (e.g., "mistral").
  - `embedding_model_name` (str): The name of the embedding model to use (e.g., "nomic-embed-text").
  - `documents_path` (str): The path to the directory containing documents to load (e.g., "Research").
- **Processing**:
  - Checks if the specified LLM and embedding models are available.
  - Loads documents from the specified directory into a vector database.
  - Initializes the LLM and creates a chat chain for interacting with the RAG system.
  - Enters a loop to accept user input, process questions using the RAG system, and handle exit conditions.
- **Output**: None. The function runs interactively and exits when the user types "exit" or interrupts the process.

#### `parse_arguments() -> argparse.Namespace`
- **Inputs**: None.
- **Processing**:
  - Creates an argument parser to handle command-line arguments.
  - Defines three arguments: `--model` (default: "mistral"), `--embedding_model` (default: "nomic-embed-text"), and `--path` (default: "Research").
- **Output**:
  - Returns an `argparse.Namespace` object containing the parsed arguments, which can be accessed as attributes (e.g., `args.model`).

### 3. Important Interactions with Other Parts of the System

- **Models Module**: Uses `check_if_model_is_available` to verify if the specified models are available. If not, it attempts to pull them (though the exact mechanism isn't shown in the provided code).
- **Document Loader Module**: Uses `load_documents_into_database` to load documents from the specified directory into a vector database. This likely involves parsing document formats, extracting text, and embedding the text using the specified embedding model.
- **LLM Module**: Uses `getChatChain` to create a chat chain that combines the LLM with the vector database for RAG functionality.
- **LangChain Ollama**: Uses `ChatOllama` to interface with the Ollama service for running the specified LLM model.

### 4. Notable Features or Patterns

- **Modular Architecture**: The application is structured into separate modules (`models.py`, `document_loader.py`, `llm.py`) for different functionalities, promoting code organization and maintainability.
- **Command-Line Interface**: The use of `argparse` allows users to configure the application's behavior via command-line arguments, making it flexible and easy to use.
- **Exception Handling**: The application includes error handling for missing documents and keyboard interrupts, ensuring a clean exit and user-friendly experience.
- **Interactive Mode**: The while loop provides an interactive prompt, allowing users to ask multiple questions in a single session.
- **RAG Implementation**: The application integrates LLMs with vector databases to enable context-aware responses, leveraging the power of both local documents and large language models.

### Overall

The `app.py` file is the central component of this application, orchestrating the setup and execution of a RAG system. It ensures that all necessary components (models, document loading, and user interaction) are properly configured and functioning together. By leveraging external libraries like `langchain_ollama` and maintaining a modular structure, the application is both efficient and easy to extend. The inclusion of a command-line interface and interactive prompt makes it accessible to users while maintaining robust error handling and resource management.

  ---
</details>

<details>
  <summary><strong>File: <a href="https://github.com/amscotti/local-LLM-with-RAG/blob/main/document_loader.py">document_loader.py</a></strong></summary>

  ### 1. Main purpose and responsibilities
The `document_loader.py` file is responsible for loading and processing documents from a specified directory into a vector database (Chroma). It supports multiple document formats (PDF, Markdown, and HTML) and handles document splitting, embedding, and database persistence. This module acts as the document ingestion engine for the system.

---

### 2. Key functions and their purposes

#### **`load_documents_into_database(model_name: str, documents_path: str, reload: bool = True) -> Chroma`**
- **Inputs**: 
  - `model_name` (str): Name of the Ollama model to use for embeddings.
  - `documents_path` (str): Path to the directory containing documents to load.
  - `reload` (bool): Whether to reload documents from scratch (default: True).
- **Processing**:
  - If `reload` is True, it loads raw documents, splits them into chunks, creates embeddings using the specified model, and persists them in the Chroma database.
  - If `reload` is False, it connects to an existing Chroma database without reloading documents.
- **Output**: 
  - Returns a Chroma database instance with the loaded documents.

#### **`load_documents(path: str) -> List[Document]`**
- **Inputs**:
  - `path` (str): Path to the directory containing documents to load.
- **Processing**:
  - Checks if the directory exists and raises a `FileNotFoundError` if it does not.
  - Uses different document loaders based on file extensions (`.pdf`, `.md`, `.html`).
  - Loads all documents of supported types and returns them as a list of Document objects.
- **Output**:
  - Returns a list of loaded documents (`List[Document]`).

---

### 3. Important interactions with other parts of the system
- **With `app.py`**: Likely used to trigger document loading and database population.
- **With `llm.py` or `models.py`**: The embeddings are created using Ollama, which may be configured elsewhere in the system.
- **With `ui.py`**: Probably used to load documents when building the user interface or responding to user queries.
- **With `Chroma` database**: Persists document embeddings and metadata for later retrieval.

---

### 4. Notable features or patterns
1. **Modular Document Loading**: The `load_documents` function uses a dictionary-based approach to map file extensions to their respective loaders. This makes the code extensible and easy to maintain.
2. **Multithreading**: The PDF loader (`PyPDFLoader`) uses multithreading (`use_multithreading=True`), which improves performance for large directories of PDFs.
3. **Lazy Loading**: When `reload=False`, the function connects to an existing Chroma database without reloading documents, which improves performance for subsequent runs.
4. **Type Safety**: The code uses Python type hints throughout, ensuring better maintainability and developer experience.
5. **Progress Tracking**: The loaders provide progress feedback (`show_progress=True`), which is helpful for monitoring long-running operations.

---

### Overall
The `document_loader.py` is a critical component of the system, handling the ingestion and preprocessing of documents. It efficiently loads multiple document types, splits them into manageable chunks, and stores them in a vector database for later use. The modular design and use of LangChain libraries make it both powerful and maintainable. This module ensures that the system can handle diverse document formats while maintaining performance and scalability.

  ---
</details>

<details>
  <summary><strong>File: <a href="https://github.com/amscotti/local-LLM-with-RAG/blob/main/llm.py">llm.py</a></strong></summary>

  ### 1. Main purpose and responsibilities
The `llm.py` file is the core component of a question-answering system that leverages large language models (LLMs) and research documents. Its primary responsibilities include:
- Processing user questions to generate standalone, context-aware queries.
- Retrieving relevant research documents based on the processed queries.
- Using LLMs to generate answers based on the retrieved documents and the processed queries.
- Handling memory to maintain conversation context for subsequent interactions.

### 2. Key functions and their purposes

#### `_combine_documents(docs, document_prompt=DEFAULT_DOCUMENT_PROMPT, document_separator="\n\n")`
- **Inputs**:
  - `docs`: List of documents retrieved from the database.
  - `document_prompt` (PromptTemplate): Template used to format each document.
  - `document_separator` (str): String used to join formatted documents.
- **Processing**: Formats each document using the provided prompt and joins them into a single string with the specified separator.
- **Output**: A single string containing all formatted documents, separated by the specified separator.

#### `getStreamingChain(question: str, memory, llm, db)`
- **Inputs**:
  - `question` (str): The user's question.
  - `memory`: Object handling conversation memory.
  - `llm`: The large language model used for generating answers.
  - `db`: The database used to retrieve relevant documents.
- **Processing**:
  1. Creates a retriever from the database to fetch up to 10 most relevant documents.
  2. Processes the question to create a standalone query based on the conversation history.
  3. Retrieves documents related to the standalone query.
  4. Combines the retrieved documents into a context string.
  5. Uses the LLM to generate an answer based on the context and the processed question, streaming the output.
- **Output**: A streaming chain that can be used to process the question and generate a streamed response.

#### `getChatChain(llm, db)`
- **Inputs**:
  - `llm`: The large language model used for generating answers.
  - `db`: The database used to retrieve relevant documents.
- **Processing**:
  1. Creates a retriever from the database to fetch up to 10 most relevant documents.
  2. Sets up memory to track conversation history.
  3. Processes the question to create a standalone query based on the conversation history.
  4. Retrieves documents related to the standalone query.
  5. Combines the retrieved documents into a context string.
  6. Uses the LLM to generate an answer based on the context and the processed question.
  7. Saves the conversation context for future interactions.
- **Output**: A chat function that can be used to process questions and generate non-streaming responses, maintaining conversation context.

### 3. Important interactions with other parts of the system
- **`app.py`**: Likely uses the chains created by `getStreamingChain` and `getChatChain` to handle user interactions and display responses.
- **`ui.py`**: Probably interacts with `llm.py` to handle user interface logic and display the results of the LLM's responses.
- **`document_loader.py`**: May work with `llm.py` to load and format research documents for use in the system.
- **`models.py`**: Could provide the LLMs and other models used by `llm.py`.

### 4. Notable features or patterns
- **Modular Chain Architecture**: Uses LangChain's Runnable components to create modular, composable chains for processing questions and generating answers.
- **Context-Aware Processing**: Reformulates follow-up questions to be standalone based on the conversation history, improving the quality of answers.
- **Streaming Support**: Provides support for streaming LLM outputs, enabling real-time response generation.
- **Memory Integration**: Uses `ConversationBufferMemory` to maintain context across interactions, allowing for coherent multi-turn conversations.
- **Template-Based Prompts**: Uses `PromptTemplate` and `ChatPromptTemplate` for defining structured inputs to the LLM, ensuring consistent and clear prompts.

### Overall
The `llm.py` file is the core of the system's natural language processing capabilities. It orchestrates the entire process of turning user questions into meaningful answers by leveraging LLMs, research documents, and conversation history. Its use of LangChain's components ensures modularity and scalability, while its integration with other parts of the system (like the UI and document loaders) makes it a critical hub for the application's functionality.

  ---
</details>

<details>
  <summary><strong>File: <a href="https://github.com/amscotti/local-LLM-with-RAG/blob/main/models.py">models.py</a></strong></summary>

  ### 1. Main purpose and responsibilities
The `models.py` file is responsible for managing machine learning models within the system. It handles model downloading, checking availability, and providing a list of available models through integration with the Ollama service. The file ensures that models are available locally before they are used, improving the system's reliability and user experience.

### 2. Key functions and their purposes

- **`__pull_model(name: str) -> None`**:
  - **Inputs**: 
    - `name` (str): The name of the model to pull from the Ollama repository.
  - **Processing**: 
    - Initiates the download of the specified model using the Ollama API.
    - Monitors the download progress and displays a progress bar for each part of the model being downloaded.
    - Handles the streaming of progress updates and manages multiple parts of the model download concurrently.
  - **Output**: 
    - None. The function's purpose is to download the model locally, which is reflected in the system's file storage.

- **`__is_model_available_locally(model_name: str) -> bool`**:
  - **Inputs**: 
    - `model_name` (str): The name of the model to check for local availability.
  - **Processing**: 
    - Calls the Ollama API to check if the model is installed locally.
    - Catches any errors that may occur during the API call and returns False if an error is encountered.
  - **Output**: 
    - Returns a boolean indicating whether the model is available locally.

- **`get_list_of_models() -> list[str]`**:
  - **Inputs**: 
    - None.
  - **Processing**: 
    - Retrieves a list of all models available in the Ollama repository.
    - Extracts the model names from the API response and compiles them into a list.
  - **Output**: 
    - Returns a list of strings, where each string is the name of a model available in the Ollama repository.

- **`check_if_model_is_available(model_name: str) -> None`**:
  - **Inputs**: 
    - `model_name` (str): The name of the model to check for availability.
  - **Processing**: 
    - Uses `__is_model_available_locally` to determine if the model is already installed.
    - If the model is not available, it calls `__pull_model` to download the model.
    - Includes error handling to catch any issues during the availability check or download process.
  - **Output**: 
    - None. The function ensures the model is available locally, either by verifying its presence or downloading it if necessary.

### 3. Important interactions with other parts of the system
The `models.py` file interacts with:
- **Ollama API**: To manage model downloads and availability checks.
- **`tqdm`**: To display progress bars during model downloads, improving user feedback.
- **Other components**: Likely interacts with the main application or UI components to trigger model downloads or verify availability before using a model.

### 4. Notable features or patterns
- **Modular Design**: The file focuses solely on model management, adhering to the single responsibility principle.
- **Progress Tracking**: Uses `tqdm` to provide visual feedback during model downloads, enhancing user experience.
- **Error Handling**: Includes exception handling to manage potential issues during model availability checks and downloads.
- **Helper Functions**: Uses private functions (prefixed with double underscores) for internal operations, keeping the public API clean.
- **Streamed Downloads**: Implements streaming for model downloads, allowing for more efficient handling of large files.

### Overall
The `models.py` file serves as the core component for managing machine learning models within the system. It efficiently handles model downloads, checks for local availability, and provides a list of available models. By integrating with the Ollama service and utilizing the `tqdm` library for progress tracking, it ensures a seamless and user-friendly experience while maintaining robust error handling and clean code structure.

  ---
</details>

<details>
  <summary><strong>File: <a href="https://github.com/amscotti/local-LLM-with-RAG/blob/main/pyproject.toml">pyproject.toml</a></strong></summary>

  ### 1. Main purpose and responsibilities
The `pyproject.toml` file is the primary configuration file for a Python project, defining metadata and dependencies required for building, installing, and distributing the package. It specifies the project's name, version, description, and the Python packages it depends on.

### 2. Key functions and their purposes
- **`name = "local-llm-with-rag"`**:
  - **Input**: None
  - **Processing**: Defines the name of the Python package.
  - **Output**: The package name "local-llm-with-rag" is used for installation and distribution.

- **`version = "0.1.0"`**:
  - **Input**: None
  - **Processing**: Specifies the version of the package using semantic versioning.
  - **Output**: Version number "0.1.0" is used for tracking updates and ensuring compatibility.

- **`description = "Add your description here"`**:
  - **Input**: None
  - **Processing**: Provides a brief description of the project.
  - **Output**: The description is displayed when the package is installed or viewed in package repositories.

- **`readme = "README.md"`**:
  - **Input**: None
  - **Processing**: Points to the README file that contains project documentation and setup instructions.
  - **Output**: The README.md is used to generate documentation and provide installation instructions.

- **`requires-python = ">=3.12"`**:
  - **Input**: None
  - **Processing**: Specifies the minimum version of Python required to run the project.
  - **Output**: Ensures compatibility with Python versions 3.12 and above.

- **`dependencies = [...]`**:
  - **Input**: None
  - **Processing**: Lists all the Python packages required for the project to function.
  - **Output**: When the package is installed, these dependencies are automatically installed.

### 3. Important interactions with other parts of the system
The `pyproject.toml` file is used by Python's package management tools like `pip` and `setuptools` to:
- Install the required dependencies when the package is installed.
- Build the package for distribution.
- Validate the package structure and metadata.

### 4. Notable features or patterns
- **Semantic Versioning**: The version number "0.1.0" follows semantic versioning (SemVer) standards, which helps in managing releases and dependencies.
- **Dependency Management**: The file specifies exact versions of dependencies (e.g., "langchain==0.3.18"), ensuring consistent environments and preventing version conflicts.
- **PEP 621 Compliance**: The file adheres to PEP 621, the standard for Python project metadata, ensuring compatibility with modern packaging tools.

### Overall
The `pyproject.toml` file is a critical component of the project, defining its metadata and dependencies. It ensures that the project can be installed, built, and distributed consistently across different environments, leveraging Python's packaging ecosystem to manage dependencies and versioning effectively.

  ---
</details>

<details>
  <summary><strong>File: <a href="https://github.com/amscotti/local-LLM-with-RAG/blob/main/ui.py">ui.py</a></strong></summary>

  ### 1. Main purpose and responsibilities
The `ui.py` file serves as the user interface for a RAG (Retrieval-Augmented Generation) application built with Streamlit. Its primary responsibilities include:
- Providing a web-based interface for users to interact with the application.
- Allowing users to select and manage different language models (LLMs).
- Enabling document indexing from a specified folder.
- Facilitating chat interactions where users can ask questions, with responses generated using the selected LLM and indexed documents.

### 2. Key functions and their purposes
- **`st.title("Local LLM with RAG 📚")`**:
  - **Purpose**: Displays the title of the application.

- **`get_list_of_models()`**:
  - **Purpose**: Retrieves a list of available LLM models for the user to select from.

- **`load_documents_into_database(EMBEDDING_MODEL, folder_path)`**:
  - **Purpose**: Loads documents from the specified folder into a database, likely using embeddings for retrieval.

- **`getStreamingChain(prompt, messages, llm, db)`**:
  - **Purpose**: Creates a streaming chain that processes the user's prompt, using the LLM and database to generate a response.

### 3. Important interactions with other parts of the system
- **With `document_loader.py`**: Handles the loading and indexing of documents from the specified folder.
- **With `models.py`**: Manages the list of available LLM models.
- **With `llm.py`**: Interfaces with the selected LLM to generate responses.
- **With Streamlit**: Uses Streamlit's state management and UI components to build the interactive interface.

### 4. Notable features or patterns
- **Streamlit Integration**: Uses Streamlit for building a user-friendly web interface with minimal code.
- **State Management**: Uses Streamlit's session state to maintain application state across user interactions.
- **Dynamic UI**: The interface is dynamic, with conditional rendering based on whether documents have been indexed or not.
- **Streaming Responses**: The chat interface supports streaming responses, providing real-time feedback to the user.

### Overall
The `ui.py` file is the core of the application, providing a user-friendly interface that integrates various components (document loading, model selection, and response generation) into a cohesive experience. It leverages Streamlit's capabilities to create an interactive and responsive application, making it accessible to users without requiring deep technical knowledge.

  ---
</details>


## ✒️ Project Summary 
This project is a local implementation of a Large Language Model (LLM) with Retrieval-Augmented Generation (RAG) capabilities, enabling users to interact with documents through a local AI system.

1. **Main purpose and functionality**:  
   The system allows users to load documents (PDFs, Markdown, etc.), convert them into embeddings, and query them using a local LLM (e.g., Mistral via Ollama). It supports both command-line and web-based interfaces for user interaction.

2. **Tech stack and architecture**:  
   Built with Python, Langchain, Ollama, and Chroma for vector storage. The architecture processes documents into embeddings, stores them in Chroma, and uses Ollama for LLM interactions, with a Streamlit UI for user access.

3. **Key components and their interactions**:  
   - Document loading and processing (`document_loader.py`).  
   - Local LLM integration and chaining (`llm.py`).  
   - Embeddings and vector database management (`models.py`).  
   - Streamlit-based web UI for interaction (`ui.py`).  
   - Main application script (`app.py`) orchestrating the pipeline.

4. **Notable features**:  
   - Local operation for privacy and efficiency.  
   - Support for multiple document formats.  
   - Real-time streaming responses via the LLM.  
   - Web-based UI for user-friendly interaction.

5. **Code organization and structure**:  
   The project is structured into modules for document handling, LLM integration, embeddings, and UI, with a main application script to tie everything together. Configuration and dependencies are managed through `pyproject.toml`.

Overall, the project provides a comprehensive solution for running a local RAG system, combining ease of use with powerful AI capabilities.