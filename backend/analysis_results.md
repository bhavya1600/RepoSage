# 🔍 Repository Insights

## 📃 Project Details 
- **Name:** local-LLM-with-RAG
- **Description:** Running local Language Language Models (LLM) to perform Retrieval-Augmented Generation (RAG)
- **Primary Language:** Python

## 🤓 Project Understanding 
<details>
  <summary><strong>Peek Under the Hood 👀</strong></summary>

  1. **Project Overview**: The project aims to run local Large Language Models (LLMs) with Ollama to perform Retrieval-Augmented Generation (RAG) for answering questions based on sample PDFs. It includes a command-line interface and a Streamlit web UI for interaction.

2. **Main Components**:
   - **app.py**: Main script for running the project, handling model loading, document processing, and RAG.
   - **document_loader.py**: Handles loading and processing of documents.
   - **llm.py**: Contains logic for interacting with the LLM.
   - **models.py**: Manages model configurations and loading.
   - **ui.py**: Script for running the Streamlit UI.
   - **Research**: Directory containing sample PDF and Markdown files for testing.
   - **images**: Directory for storing images used in the README.

3. **Tech Stack**:
   - **Languages**: Python
   - **Libraries/Frameworks**:
     - [Langchain](https://github.com/langchain/langchain): For working with LLMs.
     - [Ollama](https://ollama.ai/): For running LLMs locally.
     - [Chroma](https://docs.trychroma.com/): For vector database operations.
     - [PyPDF2](https://pypi.org/project/PyPDF2/): For PDF file manipulation.
     - [Streamlit](https://streamlit.io/): For creating the web UI.
     - [UV](https://astral.sh/uv): For package installation and management.

4. **Architecture**:
   - **High-Level Pattern**: The project follows a modular architecture with clear separation of concerns. The main components are:
     - **Data Loading**: `document_loader.py` handles loading and preprocessing of documents.
     - **Model Management**: `models.py` and `llm.py` manage model configurations and interactions.
     - **Main Application Logic**: `app.py` orchestrates the entire process, including document processing, embedding generation, and RAG.
     - **Web Interface**: `ui.py` provides a Streamlit-based UI for user interaction.

5. **Key Limitations/Constraints**:
   - **Embedding Redownload**: The embeddings are reloaded each time the application runs, which is not efficient and is only done for testing purposes.
   - **Static Document Directory**: The `Research` directory contains static documents, which may not be ideal for dynamic or large-scale applications.
   - **Command-Line Dependency**: The main application relies on command-line arguments for specifying models and document paths, which might be cumbersome for frequent use.

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

  Certainly! Below is the call hierarchy for the provided project, structured in a clear, hierarchical format. The main entry point is highlighted, and the primary execution flow is traced through the application.

```
🚀 app.py (ENTRY POINT)
├── 📂 parse_arguments() → Parses command-line arguments [app.py]
│   └── 📂 main(llm_model_name: str, embedding_model_name: str, documents_path: str) → Executes the main logic of the application [app.py]
│       ├── 📂 check_if_model_is_available(model_name: str) → Ensures the model is available locally [models.py]
│       ├── 📂 load_documents_into_database(model_name: str, documents_path: str, reload: bool = True) → Loads documents into the Chroma database [document_loader.py]
│       │   └── 📂 load_documents(path: str) → Loads documents from the specified directory [document_loader.py]
│       ├── 📂 getStreamingChain(question: str, memory: ConversationBufferMemory, llm: language model, db: database) → Creates a streaming chain for generating responses [llm.py]
│       │   └── 📂 _combine_documents(docs: list of documents, document_prompt: optional, document_separator: optional) → Combines documents into a single string [llm.py]
│       └── 📂 get_list_of_models() → Retrieves a list of available models from the Ollama repository [models.py]
```

### Explanation:

1. **Entry Point**:
   - The main entry point is `app.py`, specifically the `main` function. This function is called after parsing the command-line arguments.

2. **Execution Flow**:
   - The `main` function in `app.py` is the primary execution path.
   - It first checks if the specified model is available locally using `check_if_model_is_available` from `models.py`.
   - It then loads the documents into the Chroma database using `load_documents_into_database` from `document_loader.py`.
   - After loading the documents, it creates a streaming chain for generating responses using `getStreamingChain` from `llm.py`.
   - The `_combine_documents` function from `llm.py` is used to combine the documents into a single string, which is then passed to the streaming chain.

3. **Cross-File Calls**:
   - `app.py` calls `models.py` to check if the model is available.
   - `app.py` calls `document_loader.py` to load documents into the database.
   - `app.py` calls `llm.py` to create a streaming chain for generating responses.

4. **Module Dependencies**:
   - `app.py` depends on `models.py`, `document_loader.py`, and `llm.py`.
   - `document_loader.py` depends on `langchain_community`, `langchain_core`, `langchain_ollama`, and `langchain`.
   - `llm.py` depends on `langchain` and `langchain_core`.
   - `models.py` depends on `ollama` and `tqdm`.

### Visual Mapping:

```
🚀 app.py (ENTRY POINT)
├── 📂 parse_arguments() → Parses command-line arguments [app.py]
│   └── 📂 main(llm_model_name: str, embedding_model_name: str, documents_path: str) → Executes the main logic of the application [app.py]
│       ├── 📂 check_if_model_is_available(model_name: str) → Ensures the model is available locally [models.py]
│       ├── 📂 load_documents_into_database(model_name: str, documents_path: str, reload: bool = True) → Loads documents into the Chroma database [document_loader.py]
│       │   └── 📂 load_documents(path: str) → Loads documents from the specified directory [document_loader.py]
│       ├── 📂 getStreamingChain(question: str, memory: ConversationBufferMemory, llm: language model, db: database) → Creates a streaming chain for generating responses [llm.py]
│       │   └── 📂 _combine_documents(docs: list of documents, document_prompt: optional, document_separator: optional) → Combines documents into a single string [llm.py]
│       └── 📂 get_list_of_models() → Retrieves a list of available models from the Ollama repository [models.py]
```

This structure clearly shows the flow of the application from the entry point through the various files and functions, highlighting the dependencies and significant function calls between different modules.

</details>

## 📈 File Analyses  

<details>
  <summary><strong>File: <a href="https://github.com/amscotti/local-LLM-with-RAG/blob/main/app.py">app.py</a></strong></summary>

  ### 1. Main purpose and responsibilities
The `app.py` file is the main entry point of the application, responsible for setting up the environment, loading models, and handling user interactions. It uses LangChain and Ollama for language model operations and integrates with a document loader to provide a question-answering system based on retrieved documents.

### 2. Key functions and their purposes
- **`main(llm_model_name: str, embedding_model_name: str, documents_path: str) -> None`**:
  - **Inputs**:
    - `llm_model_name` (str): The name of the language model to use.
    - `embedding_model_name` (str): The name of the embedding model to use.
    - `documents_path` (str): The path to the directory containing documents to load.
  - **Processing**:
    - Checks if the specified models are available and attempts to download them if not.
    - Loads documents into a database using the specified embedding model.
    - Initializes a chat chain using the language model and the database.
    - Enters an infinite loop where it prompts the user for questions and processes them using the chat chain.
  - **Output**: None

- **`parse_arguments() -> argparse.Namespace`**:
  - **Inputs**: None
  - **Processing**: Parses command-line arguments to configure the application.
  - **Output**: `argparse.Namespace` object containing the parsed arguments.

### 3. Important interactions with other parts of the system
- **`models.py`**: `check_if_model_is_available` is called to check if the specified models are available.
- **`document_loader.py`**: `load_documents_into_database` is used to load documents into a database.
- **`llm.py`**: `ChatOllama` and `getChatChain` are used to initialize the language model and the chat chain.
- **`argparse`**: `parse_arguments` is used to handle command-line arguments.

### 4. Notable features or patterns
- **Error Handling**: The `main` function includes error handling for model availability and document loading, ensuring the application can gracefully handle issues.
- **Command-Line Interface**: The use of `argparse` for command-line argument parsing allows for flexible configuration of the application.
- **Infinite Loop**: The `main` function runs in an infinite loop, allowing for continuous interaction with the user until the user decides to exit.

### Overall
The `app.py` file serves as the main driver of the application, setting up the environment, loading necessary models, and providing an interactive interface for users to ask questions based on the provided documents. It leverages other modules for model management, document loading, and chat functionality, ensuring a modular and maintainable design.

  ---
</details>

<details>
  <summary><strong>File: <a href="https://github.com/amscotti/local-LLM-with-RAG/blob/main/document_loader.py">document_loader.py</a></strong></summary>

  ### 1. Main purpose and responsibilities
The `document_loader.py` file is responsible for loading documents from a specified directory and preparing them for storage in a vector database using the Chroma library. It handles the process of splitting the text into manageable chunks and creating embeddings for these chunks using an external model. This file plays a crucial role in the data preprocessing pipeline, ensuring that the documents are ready for further processing such as querying or indexing.

### 2. Key functions and their purposes
- **`load_documents_into_database(model_name: str, documents_path: str, reload: bool = True) -> Chroma`**:
  - **Inputs**:
    - `model_name` (str): The name of the model used for generating embeddings.
    - `documents_path` (str): The path to the directory containing the documents to be loaded.
    - `reload` (bool, optional): A flag indicating whether to reload the documents. Defaults to `True`.
  - **Processing**:
    - Checks if `reload` is `True`. If so, it loads the documents, splits them into chunks, creates embeddings using the specified model, and stores them in the Chroma database.
    - If `reload` is `False`, it simply loads the documents from the existing Chroma database.
  - **Output**:
    - `Chroma`: The Chroma database containing the loaded and embedded documents.

- **`load_documents(path: str) -> List[Document]`**:
  - **Inputs**:
    - `path` (str): The path to the directory containing the documents to be loaded.
  - **Processing**:
    - Validates if the specified path exists. If not, it raises a `FileNotFoundError`.
    - Defines loaders for different file types (PDF, Markdown).
    - Iterates over the supported file types, loads the documents using the appropriate loader, and compiles them into a list.
  - **Output**:
    - `List[Document]`: A list of loaded documents.

### 3. Important interactions with other parts of the system
- **Interaction with `app.py`**: `document_loader.py` is likely called from `app.py` during the initialization of the application to ensure that the documents are preprocessed and stored in the database.
- **Interaction with `Chroma`**: It interacts with the Chroma vector database to store the processed documents and their embeddings.
- **Interaction with `OllamaEmbeddings`**: It uses the `OllamaEmbeddings` class to generate embeddings for the document chunks.
- **Interaction with `RecursiveCharacterTextSplitter`**: It uses this class to split the documents into smaller chunks before storing them.

### 4. Notable features or patterns
- **Modular Design**: The file is modular, with separate functions for loading documents and storing them in the database. This makes it easier to maintain and extend.
- **Support for Multiple Document Types**: It supports loading multiple types of documents (PDF, Markdown) by dynamically choosing the appropriate loader based on the file extension.
- **Chunking and Embedding**: The documents are first split into chunks for better manageability and then embedded using an external model, which is a common approach in information retrieval systems.
- **Reloading Mechanism**: The `reload` parameter allows for reprocessing the documents, which can be useful for updating the database without having to manually delete and recreate it.

### Overall
The `document_loader.py` file is a critical component of the system responsible for preprocessing and storing documents in a structured format. It leverages various libraries and tools to handle different document types, split the text into manageable chunks, and create embeddings for efficient storage and retrieval. Its modular design and support for multiple document types make it flexible and adaptable to different use cases.

  ---
</details>

<details>
  <summary><strong>File: <a href="https://github.com/amscotti/local-LLM-with-RAG/blob/main/llm.py">llm.py</a></strong></summary>

  ### 1. Main purpose and responsibilities
The `llm.py` file is responsible for defining and configuring the interaction between a language model (LLM) and the rest of the application. It primarily focuses on creating and managing chains of operations that involve question-answering, document retrieval, and streaming responses. This file is crucial for integrating the LLM with the application's user interface and database.

### 2. Key functions and their purposes
- **`_combine_documents(docs, document_prompt=DEFAULT_DOCUMENT_PROMPT, document_separator="\n\n") -> str`**:
  - **Inputs**: 
    - `docs` (List): A list of documents to be combined.
    - `document_prompt` (PromptTemplate): A template for formatting each document.
    - `document_separator` (str): A string used to separate document content.
  - **Processing**: The function formats each document using the provided `document_prompt` and joins them with the specified `document_separator`.
  - **Output**: A single string containing all documents formatted and separated as specified.

- **`getStreamingChain(question: str, memory, llm, db) -> RunnableLambda`**:
  - **Inputs**: 
    - `question` (str): The question to be answered.
    - `memory` (ConversationBufferMemory): The memory object to store the conversation history.
    - `llm` (LanguageModel): The language model to be used.
    - `db` (Database): The database to retrieve relevant documents.
  - **Processing**: 
    - It sets up a chain of operations that includes condensing the question, retrieving relevant documents, and generating an answer using the LLM.
    - The chain is configured to stream the response to the user.
  - **Output**: A `RunnableLambda` object representing the chain of operations.

- **`getChatChain(llm, db) -> Callable[[str], None]`**:
  - **Inputs**: 
    - `llm` (LanguageModel): The language model to be used.
    - `db` (Database): The database to retrieve relevant documents.
  - **Processing**: 
    - It sets up a chain of operations that includes condensing the question, retrieving relevant documents, and generating an answer using the LLM.
    - The chain is configured to handle chat interactions and stream responses.
  - **Output**: A callable function that takes a question and processes it using the configured chain.

### 3. Important interactions with other parts of the system
- **Interaction with `document_loader.py`**: The `getStreamingChain` and `getChatChain` functions rely on a database (`db`) to retrieve relevant documents for the question. This interaction is crucial for ensuring that the LLM has access to the necessary context.
- **Interaction with `ui.py` and `app.py`**: The `getStreamingChain` and `getChatChain` functions are designed to be used in the application's user interface and backend. They provide the logic for handling user questions and generating responses.
- **Interaction with `models.py`**: The functions use a language model (`llm`) and a conversation memory (`memory`), which are likely defined in `models.py`.

### 4. Notable features or patterns
- **Use of LangChain**: The file extensively uses LangChain, a library for building applications that use language models. This includes the use of `RunnableLambda`, `RunnablePassthrough`, and `PromptTemplate`.
- **Streaming Responses**: The `getStreamingChain` function is specifically designed to stream responses, which is useful for real-time interactions.
- **Memory Management**: The use of `ConversationBufferMemory` ensures that the conversation history is maintained and can be used to improve the context for subsequent questions.

### Overall
The `llm.py` file plays a central role in integrating the language model with the rest of the application. It defines and configures chains of operations that handle question-answering, document retrieval, and streaming responses. The file leverages LangChain for its operations and ensures that the conversation history is maintained for better context.

  ---
</details>

<details>
  <summary><strong>File: <a href="https://github.com/amscotti/local-LLM-with-RAG/blob/main/models.py">models.py</a></strong></summary>

  ### 1. Main purpose and responsibilities
The `models.py` file is responsible for managing the availability and retrieval of machine learning models from the Ollama repository. It includes functionalities to check if a model is available locally, retrieve a list of all available models, and ensure that a specific model is downloaded if it is not already present.

### 2. Key functions and their purposes
- **`__pull_model(name: str) -> None`**:
  - **Inputs**: 
    - `name` (str): The name of the model to be pulled.
  - **Processing**: 
    - This function handles the downloading of a model from the Ollama repository. It uses the `ollama.pull` method to download the model in a streaming manner, updating a progress bar for each chunk of data being downloaded. It also manages the closure of progress bars when chunks are fully downloaded.
  - **Output**: 
    - None (side effects include updating progress bars and downloading the model).

- **`__is_model_available_locally(model_name: str) -> bool`**:
  - **Inputs**: 
    - `model_name` (str): The name of the model to check.
  - **Processing**: 
    - This function checks if the specified model is available locally by attempting to call `ollama.show` on the model name. If `ollama.show` succeeds, the model is considered available; otherwise, it raises an `ollama.ResponseError`.
  - **Output**: 
    - `bool`: Returns `True` if the model is available locally, `False` otherwise.

- **`get_list_of_models() -> list[str]`**:
  - **Inputs**: 
    - None.
  - **Processing**: 
    - This function retrieves a list of all available models from the Ollama repository using the `ollama.list()` method, which returns a dictionary containing information about the models. It then extracts and returns the list of model names.
  - **Output**: 
    - `list[str]`: A list of strings representing the names of the available models.

- **`check_if_model_is_available(model_name: str) -> None`**:
  - **Inputs**: 
    - `model_name` (str): The name of the model to check.
  - **Processing**: 
    - This function first checks if the specified model is available locally using `__is_model_available_locally`. If the model is not available, it calls `__pull_model` to download the model from the Ollama repository. If any exceptions occur during these operations, it raises an exception indicating the failure.
  - **Output**: 
    - None (raises exceptions on failure).

### 3. Important interactions with other parts of the system
- The `models.py` file interacts with the `ollama` library to manage model downloads and availability checks.
- It communicates with the Ollama API through methods like `ollama.pull`, `ollama.show`, and `ollama.list`.
- It provides utility functions that can be used by other parts of the application, such as `app.py` or `ui.py`, to manage models dynamically.

### 4. Notable features or patterns
- **Progress Tracking**: The `__pull_model` function uses `tqdm` to track the progress of the download, providing a visual indicator of the download status.
- **Exception Handling**: The `check_if_model_is_available` function includes comprehensive error handling to ensure that any issues during the model retrieval process are properly communicated to the user.
- **Lazy Loading**: The `__is_model_available_locally` function checks for local availability before attempting to download, ensuring that unnecessary downloads are avoided.

### Overall
The `models.py` file plays a crucial role in managing the lifecycle of machine learning models within the application. It ensures that models are available locally and provides tools for downloading them efficiently. The use of progress tracking and robust error handling enhances the reliability and user experience of the application.

  ---
</details>

<details>
  <summary><strong>File: <a href="https://github.com/amscotti/local-LLM-with-RAG/blob/main/ui.py">ui.py</a></strong></summary>

  ### 1. Main purpose and responsibilities
The `ui.py` file is responsible for creating the user interface for a Streamlit application that allows users to interact with a local Large Language Model (LLM) using a Retrieval-Augmented Generation (RAG) approach. It handles the selection of models, loading of documents, and the chat interface for querying the model.

### 2. Key functions and their purposes
- **`st.title("Local LLM with RAG 📚")`**:
  - **Inputs**: None.
  - **Processing**: Sets the title of the Streamlit app.
  - **Output**: None.

- **`st.sidebar.selectbox("Select a model:", st.session_state["list_of_models"])`**:
  - **Inputs**: None.
  - **Processing**: Displays a sidebar select box for the user to choose a model from a list stored in `st.session_state`.
  - **Output**: The selected model.

- **`st.sidebar.text_input("Enter the folder path:", PATH)`**:
  - **Inputs**: None.
  - **Processing**: Displays a sidebar text input for the user to enter a folder path.
  - **Output**: The entered folder path.

- **`st.sidebar.button("Index Documents")`**:
  - **Inputs**: None.
  - **Processing**: Displays a sidebar button to trigger the indexing of documents.
  - **Output**: A boolean indicating if the button was clicked.

- **`st.error("The provided path is not a valid directory. Please enter a valid folder path.")`**:
  - **Inputs**: None.
  - **Processing**: Displays an error message if the provided path is not a valid directory.
  - **Output**: None.

- **`st.info("All set to answer questions!")`**:
  - **Inputs**: None.
  - **Processing**: Displays an info message once the documents are indexed.
  - **Output**: None.

- **`st.warning("Please enter a folder path to load documents into the database.")`**:
  - **Inputs**: None.
  - **Processing**: Displays a warning message if no folder path is provided.
  - **Output**: None.

- **`st.chat_message(message["role"]):`**:
  - **Inputs**: `message` (dictionary).
  - **Processing**: Displays a chat message with the specified role (e.g., user, assistant).
  - **Output**: None.

- **`st.chat_input("Question (indexing required)", disabled=True)`**:
  - **Inputs**: None.
  - **Processing**: Displays a chat input field that is disabled until documents are indexed.
  - **Output**: None.

- **`st.write_stream(stream)`**:
  - **Inputs**: `stream` (streaming response from the model).
  - **Processing**: Writes the streaming response to the chat interface.
  - **Output**: None.

### 3. Important interactions with other parts of the system
- **`streamlit`**: The application uses Streamlit for creating the user interface.
- **`document_loader.py`**: The `load_documents_into_database` function is called to load documents into a database.
- **`llm.py`**: The `getStreamingChain` function is used to create a streaming chain for generating responses.
- **`models.py`**: The `get_list_of_models` function is used to retrieve a list of available models.
- **`langchain_ollama`**: The `ChatOllama` class is used to interact with the LLM.

### 4. Notable features or patterns
- **Session State**: The file extensively uses `st.session_state` to store and manage application state, such as the selected model, database, and chat messages.
- **Streaming Responses**: The chat interface supports streaming responses from the model, providing a more natural and interactive experience.
- **Error Handling**: The file includes basic error handling, such as checking if the provided folder path is valid.

### Overall
The `ui.py` file serves as the primary interface for users to interact with a local LLM using a RAG approach. It manages the selection of models, loading of documents, and the chat interface for querying the model. The file leverages Streamlit for the user interface and integrates with other components to provide a seamless and interactive experience.

  ---
</details>


## ✒️ Project Summary 
This project is a local implementation of Large Language Models (LLMs) with Retrieval-Augmented Generation (RAG) for answering questions based on sample PDFs using Ollama.

1. **Main purpose and functionality**: The project aims to run local LLMs to perform RAG, providing a command-line interface and a Streamlit web UI for interaction.

2. **Tech stack and architecture**: The tech stack includes Python, Langchain, Ollama, Chroma, PyPDF2, Streamlit, and UV. The architecture follows a modular design with clear separation of concerns, including data loading, model management, and main application logic.

3. **Key components and their interactions**: The main components are `app.py`, `document_loader.py`, `llm.py`, and `models.py`. `app.py` orchestrates the process, `document_loader.py` handles document loading, `llm.py` manages model interactions, and `models.py` ensures model availability. The `ui.py` script provides a Streamlit-based UI.

4. **Notable features**: Key features include the use of Ollama for local LLMs, Chroma for vector database operations, and Streamlit for a user-friendly web interface. The project also includes a command-line dependency and a static document directory for testing.

5. **Code organization and structure**: The code is organized into modules and scripts, with clear imports and dependencies. The file tree shows a well-structured project with separate directories for images, research documents, and other assets.

Overall, this project provides a comprehensive solution for running local LLMs with RAG, leveraging modern Python libraries and frameworks.