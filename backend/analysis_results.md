# 🔍 Repository Insights

## 📃 Project Details 
- **Name:** local-LLM-with-RAG
- **Description:** Running local Language Language Models (LLM) to perform Retrieval-Augmented Generation (RAG)
- **Primary Language:** Python

## 🤓 Project Understanding 
<details>
  <summary><strong>Peek Under the Hood 👀</strong></summary>

  The repository **local-LLM-with-RAG** is structured to facilitate the experimentation and implementation of local Large Language Models (LLMs) using Retrieval-Augmented Generation (RAG). Here’s a brief overview of its components, tech stack, and architecture based on the provided file structure:

### Main Components:
1. **Core Scripts**:
   - **`app.py`**: The main script for running the application, handling model loading, document processing, and querying.
   - **`document_loader.py`**: Responsible for loading documents (PDFs) from the specified directory.
   - **`llm.py`**: Likely contains logic related to interacting with the LLM, such as model initialization and querying.
   - **`models.py`**: This file may define the models used in the application, including configurations for LLMs and embeddings.

2. **User Interface**:
   - **`ui.py`**: A script to run the Streamlit web application, providing a graphical interface for user interaction with the RAG system.

3. **Data**:
   - **`Research/`**: A directory containing sample PDF documents that the application uses for testing and querying.

4. **Images**:
   - **`images/`**: Contains visual assets for the README and possibly for the Streamlit UI.

5. **Configuration and Dependency Management**:
   - **`pyproject.toml`**: Specifies project dependencies and configurations for the Python package manager.
   - **`pyrightconfig.json`**: Configuration file for type checking with Pyright, indicating a focus on type safety in development.
   - **`uv.lock`**: A lock file for managing dependencies with the UV package installer.

### Tech Stack:
- **Python**: The primary programming language used for development.
- **Ollama**: A platform for running LLMs locally.
- **Langchain**: A library for working with LLMs.
- **Chroma**: A vector database for managing embeddings.
- **Streamlit**: A framework for creating the web UI.
- **PyPDF**: A library for handling PDF files.
- **UV**: A package installer used for dependency management.

### Architecture:
The architecture is designed around a modular approach where:
- **Document Processing**: PDFs are loaded and processed to generate embeddings.
- **LLM Interaction**: The application interacts with the LLM to answer queries based on the loaded documents.
- **User Interaction**: Users can interact with the system through a command-line interface or a more user-friendly Streamlit web UI.

Overall, the project aims to provide a flexible environment for experimenting with local LLMs and RAG techniques, leveraging modern libraries and frameworks to enhance usability and functionality.

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

  Here's a structured call hierarchy for the **local-LLM-with-RAG** project, outlining the main execution path, important function calls, and dependencies between modules.

### Call Hierarchy

```plaintext
📁 main() → None [app.py]
├─ 🔷 check_if_model_is_available(model_name: str) → None [models.py]
├─ 🔷 load_documents_into_database(model_name: str, documents_path: str, reload: bool) → Chroma [document_loader.py]
│   ├─ 🟣 load_documents(path: str) → List[Document] [document_loader.py]
│   └─ 🟠 Chroma (database object) [document_loader.py]
└─ 🔶 getChatChain(llm, db) → function chat(question: str) [llm.py]
    ├─ 🟢 chat(question: str) → None [llm.py]
    └─ 🔴 getStreamingChain(question: str, memory, llm, db) → stream [llm.py]
```

### Entry Point File
- **`app.py`**: This is the main entry point of the application where the execution begins.

### Main Execution Flow
1. **`main()`** in `app.py` is called, which serves as the entry point.
2. **Model Availability Check**:
   - Calls **`check_if_model_is_available(model_name)`** from `models.py` to ensure the specified model is available locally.
3. **Document Loading**:
   - Calls **`load_documents_into_database(model_name, documents_path, reload)`** from `document_loader.py` to load documents into the Chroma database.
   - This function internally calls **`load_documents(path)`**, which loads documents from the specified directory.
4. **LLM Interaction**:
   - Calls **`getChatChain(llm, db)`** from `llm.py` to create a chat chain for processing user queries.
   - This function returns a `chat` function that can be invoked to answer user questions.
5. **Chat Processing**:
   - The `chat(question)` function processes user input and retrieves answers based on the conversation history and loaded documents.
   - Optionally, it may call **`getStreamingChain(question, memory, llm, db)`** for streaming responses.

### Important Function Calls Between Files
- **`app.py`**:
  - Calls functions from `models.py`, `document_loader.py`, and `llm.py`.
- **`document_loader.py`**:
  - Calls **`load_documents(path)`** to load documents.
- **`llm.py`**:
  - Calls **`chat(question)`** and **`getStreamingChain(question, memory, llm, db)`** for processing queries.

### Dependencies Between Modules
- **`app.py`**:
  - Depends on: `models`, `document_loader`, `llm`, `langchain_ollama`, `argparse`, `sys`
  
- **`document_loader.py`**:
  - Depends on: `langchain_community`, `langchain_core`, `langchain_ollama`, `langchain_community.vectorstores`
  
- **`llm.py`**:
  - Depends on: `langchain`, `langchain_core`
  
- **`models.py`**:
  - Depends on: `ollama`, `tqdm`
  
- **`ui.py`**:
  - Depends on: `streamlit`, `os`, `langchain_ollama`, `document_loader`, `models`, `llm`

This structured representation provides a clear overview of how the application flows from the entry point through various files and functions, highlighting the important interactions and dependencies between different components of the project.

</details>

## 📈 File Analyses  

<details>
  <summary><strong>File: <a href="https://github.com/amscotti/local-LLM-with-RAG/blob/main/app.py">app.py</a></strong></summary>

  Give a one or two liner description of the code file.  
This code file (`app.py`) serves as the main entry point for a local language model application that utilizes document retrieval and question-answering capabilities.

**1. Main purpose and responsibilities**:  
The main purpose of this file is to initialize and run a local language model (LLM) application that allows users to ask questions based on documents loaded into a database, handling model availability checks and user input.

**2. Key functions and their purposes**:  
- `main(llm_model_name: str, embedding_model_name: str, documents_path: str) -> None`: This function expects three inputs: `llm_model_name` (str), `embedding_model_name` (str), and `documents_path` (str). It checks if the specified models are available, loads documents into a database, initializes a chat interface, and enters a loop to handle user queries until 'exit' is typed.
  
- `parse_arguments() -> argparse.Namespace`: This function does not expect any inputs. It processes command-line arguments to retrieve the LLM model name, embedding model name, and the path to the documents, returning these as a namespace object.

**3. Important interactions with other parts of the system**:  
The `app.py` file interacts with the `models` module to check model availability, the `document_loader` module to load documents into a database, and the `llm` module to create a chat interface for user interaction.

**4. Notable features or patterns**:  
The code employs exception handling to manage errors related to model availability and file loading, utilizes a command-line argument parser for flexible input, and implements a continuous loop for user interaction until a termination command is issued.

Overall, `app.py` orchestrates the setup and execution of a local language model application, enabling users to query information from a specified set of documents while ensuring robust error handling and user-friendly interaction.

  ---
</details>

<details>
  <summary><strong>File: <a href="https://github.com/amscotti/local-LLM-with-RAG/blob/main/document_loader.py">document_loader.py</a></strong></summary>

  **1. Main purpose and responsibilities**:  
The `document_loader.py` file is responsible for loading various document types from a specified directory, processing them into chunks, and storing them in a Chroma database for further use.

**2. Key functions and their purposes**:  
- **load_documents_into_database(model_name: str, documents_path: str, reload: bool = True) -> Chroma**: This function expects a model name (string), a documents path (string), and a reload flag (boolean). It loads documents from the specified path, splits them into chunks, and returns a Chroma database instance containing the embedded documents.
  
- **load_documents(path: str) -> List[Document]**: This function expects a path (string) to a directory containing documents. It checks if the path exists, raises a FileNotFoundError if not, and then loads and returns a list of Document objects from supported file types (PDF and Markdown) using appropriate loaders.

**3. Important interactions with other parts of the system**:  
The file interacts with the `langchain_community` library for document loading and embedding, specifically using `DirectoryLoader`, `PyPDFLoader`, and `TextLoader`. It also utilizes the `Chroma` vector store for storing the processed documents and `OllamaEmbeddings` for generating embeddings from the documents.

**4. Notable features or patterns**:  
The code employs a modular approach with separate functions for loading documents and integrating them into a database. It uses a dictionary to manage different loaders based on file types, and it incorporates error handling for non-existent paths. The use of a text splitter allows for efficient processing of large documents by breaking them into manageable chunks.

Overall, `document_loader.py` serves as a crucial component for document ingestion and processing, enabling the application to handle various document formats and prepare them for further analysis or retrieval.

  ---
</details>

<details>
  <summary><strong>File: <a href="https://github.com/amscotti/local-LLM-with-RAG/blob/main/llm.py">llm.py</a></strong></summary>

  Give a one or two liner description of the code file.
**1. Main purpose and responsibilities**: The `llm.py` file is responsible for handling interactions with a language model (LLM) to answer questions based on provided research documents, utilizing conversation memory and structured prompts.

**2. Key functions and their purposes**: 
- `getStreamingChain(question: str, memory, llm, db)`: This function expects a question (string), conversation memory, a language model instance, and a database. It processes the question to create a standalone version, retrieves relevant documents, and generates an answer using the LLM, returning a streaming response.
- `getChatChain(llm, db)`: This function expects a language model instance and a database. It constructs a chat interface that processes questions, retrieves relevant documents, and generates answers using the LLM, returning a callable chat function that saves context.

**3. Important interactions with other parts of the system**: The code interacts with a database to retrieve relevant documents based on the user's question, utilizes conversation memory to maintain context, and employs various Langchain components for prompt formatting and processing.

**4. Notable features or patterns**: The code employs a modular design with separate functions for streaming and chat interactions, uses prompt templates for structured input to the LLM, and incorporates a memory buffer to retain conversation history, enhancing the contextual relevance of responses.

Overall, the `llm.py` file serves as a crucial component in a research assistant application, enabling dynamic question answering through effective use of language models and memory management.

  ---
</details>

<details>
  <summary><strong>File: <a href="https://github.com/amscotti/local-LLM-with-RAG/blob/main/models.py">models.py</a></strong></summary>

  Give a one or two liner description of the code file.
**1. Main purpose and responsibilities**: This code file manages the retrieval and availability of machine learning models from the Ollama repository, ensuring that specified models are either available locally or pulled from the repository if not.

**2. Key functions and their purposes**: 
- `__pull_model(name: str) -> None`: This function expects a model name as input (string), processes the model pulling from the Ollama repository while displaying progress, and does not return any data.
- `__is_model_available_locally(model_name: str) -> bool`: This function expects a model name as input (string), checks if the model is available locally, and returns a boolean indicating availability.
- `get_list_of_models() -> list[str]`: This function retrieves a list of available models from the Ollama repository and returns it as a list of strings.
- `check_if_model_is_available(model_name: str) -> None`: This function expects a model name as input (string), checks its local availability, and pulls it from the repository if not available, raising exceptions if issues occur.

**3. Important interactions with other parts of the system**: The code interacts with the `ollama` library to check model availability and to pull models from the repository. It also utilizes the `tqdm` library for progress visualization during model downloading.

**4. Notable features or patterns**: The code employs private functions (indicated by the double underscore prefix) for internal logic, uses exception handling to manage errors gracefully, and incorporates progress tracking for model downloads, enhancing user experience.

Overall, this code file serves as a utility for managing machine learning models, ensuring that the necessary models are readily available for use in the application.

  ---
</details>

<details>
  <summary><strong>File: <a href="https://github.com/amscotti/local-LLM-with-RAG/blob/main/pyproject.toml">pyproject.toml</a></strong></summary>

  Give a one or two liner description of the code file.
**1. Main purpose and responsibilities**: This file defines the project metadata and dependencies for a Python application, specifying the required packages and Python version for the project "local-llm-with-rag".

**2. Key functions and their purposes**: 
- The `project` section specifies the project name, version, description, and readme file.
- The `requires-python` field indicates the minimum Python version required for the project, which is a string (">=3.12").
- The `dependencies` list includes specific package versions and their constraints, ensuring that the application has the necessary libraries for functionality.

**3. Important interactions with other parts of the system**: The dependencies listed in this file are crucial for the application's functionality, as they will be installed in the environment where the application runs, allowing modules like `streamlit`, `langchain`, and `chromadb` to be utilized in the code files such as `app.py`, `llm.py`, and `ui.py`.

**4. Notable features or patterns**: The use of version constraints in the dependencies ensures compatibility and stability of the project, while the inclusion of a readme file reference helps maintain documentation alongside the codebase.

Overall, the `pyproject.toml` file serves as a central configuration point for managing project dependencies and metadata, facilitating the setup and execution of the Python application.

  ---
</details>

<details>
  <summary><strong>File: <a href="https://github.com/amscotti/local-LLM-with-RAG/blob/main/ui.py">ui.py</a></strong></summary>

  Give a one or two liner description of the code file.
**1. Main purpose and responsibilities**: This file implements a Streamlit web application that allows users to interact with a local language model (LLM) for document retrieval and question answering using a retrieval-augmented generation (RAG) approach.

**2. Key functions and their purposes**: 
- `get_list_of_models()`: This function retrieves a list of available models, returning a list of strings representing model names.
- `load_documents_into_database(EMBEDDING_MODEL, folder_path)`: This function takes a string `EMBEDDING_MODEL` and a string `folder_path`, processes the documents in the specified folder to create embeddings, and returns a database object.
- `getStreamingChain(prompt, messages, llm, db)`: This function expects a string `prompt`, a list of message dictionaries `messages`, an LLM object `llm`, and a database object `db`, processes the input to generate a response stream, and returns a streaming response.

**3. Important interactions with other parts of the system**: The `ui.py` file interacts with the `document_loader` to load documents into a database, utilizes the `models` module to fetch available models, and calls functions from `llm` to generate responses based on user queries.

**4. Notable features or patterns**: The use of Streamlit's session state to maintain the state of the application across user interactions, the implementation of a chat interface for user interaction, and the handling of document indexing and error messages for user feedback.

Overall, `ui.py` serves as the user interface for the application, facilitating document indexing and interaction with a language model for question answering, while managing application state and user inputs effectively.

  ---
</details>


## ✒️ Project Summary 
This project is a local implementation of Large Language Models (LLMs) using Retrieval-Augmented Generation (RAG) techniques.

1. **Main purpose and functionality**: The project allows users to interact with local LLMs to answer queries based on documents, leveraging a chat interface for seamless user experience.

2. **Tech stack and architecture**: Built primarily in Python, it utilizes frameworks and libraries such as Ollama for LLMs, Langchain for model interaction, Chroma for managing embeddings, and Streamlit for the user interface.

3. **Key components and their interactions**: The core components include `app.py` for application execution, `document_loader.py` for loading and processing documents, `llm.py` for managing LLM interactions, and `ui.py` for the Streamlit user interface. These components work together to load documents, check model availability, and facilitate user queries.

4. **Notable features**: The project supports document loading from various formats, provides a chat interface for user interactions, and allows for real-time responses through streaming capabilities.

5. **Code organization and structure**: The code is organized into modules, each responsible for specific functionalities, making it modular and easy to maintain. The main entry point is `app.py`, which orchestrates the flow of the application.

Overall, this project provides a robust framework for experimenting with local LLMs and RAG techniques, enhancing usability and functionality through modern libraries and a user-friendly interface.