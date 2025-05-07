# 🔍 Repository Insights

## 📃 Project Details 
- **Name:** local-LLM-with-RAG
- **Description:** Running local Language Language Models (LLM) to perform Retrieval-Augmented Generation (RAG)
- **Primary Language:** Python

## 🤓 Project Understanding 
<details>
  <summary><strong>Peek Under the Hood 👀</strong></summary>

  1. **Project Overview**:  
   An experimental project for running local LLMs (via Ollama) with Retrieval-Augmented Generation (RAG) to answer questions using documents (PDFs/Markdown). Includes a Streamlit-based web UI for interaction.

2. **Main Components**:  
   - `app.py`: Core script for processing documents, generating embeddings, and answering queries.  
   - `document_loader.py`: Handles loading and parsing of PDF/Markdown files.  
   - `llm.py`: Manages interactions with Ollama for LLM inference and embeddings.  
   - `models.py`: Defines data models and Chroma vector database integration.  
   - `ui.py`: Streamlit web interface for user interaction.  
   - `Research/`: Directory containing sample PDF documents for RAG.  

3. **Tech Stack**:  
   - **Languages**: Python  
   - **Frameworks/Libraries**:  
     - [Ollama](https://ollama.ai/) for local LLMs/embeddings  
     - [LangChain](https://github.com/langchain/langchain) for RAG orchestration  
     - [Chroma](https://docs.trychroma.com/) for vector storage  
     - [Streamlit](https://streamlit.io/) for web UI  
     - [PyPDF](https://pypi.org/project/PyPDF2/) for PDF parsing  
     - [UV](https://astral.sh/uv) for dependency management  

4. **Architecture**:  
   Modular monorepo with a pipeline:  
   `Document Loader` → `Embedding Generation (Ollama)` → `Chroma Vector DB` → `LLM Query (Ollama + LangChain)` → `Streamlit UI`.  
   Separation of concerns between data processing, model interaction, and user interface.

5. **Key Limitations/Constraints**:  
   - Embeddings are reloaded on each run (non-persistent storage).  
   - Experimental focus with minimal production-ready optimizations.  
   - Relies on Ollama's local model execution, limiting cloud/deployment flexibility.  
   - No explicit error handling or scalability features.

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
┣━━ 🔄 main(llm_model_name: str, embedding_model_name: str, documents_path: str) → None [app.py]
┃   ┣━━ 🧪 check_if_model_is_available(model_name: str) → None [models.py]
┃   ┃   ┣━━ 📥 __is_model_available_locally(model_name: str) → bool [models.py]
┃   ┃   ┗━━ 📥 __pull_model(name: str) → None [models.py]
┃   ┣━━ 📁 load_documents_into_database(model_name: str, documents_path: str, reload: bool) → Chroma [document_loader.py]
┃   ┃   ┣━━ 📄 load_documents(path: str) → List[Document] [document_loader.py]
┃   ┃   ┣━━ 📄 RecursiveCharacterTextSplitter() → TextSplitter [langchain.text_splitter]
┃   ┃   ┣━━ 📦 OllamaEmbeddings(model_name: str) → Embeddings [langchain_ollama]
┃   ┃   ┗━━ 🗄️ Chroma.from_documents() → VectorDB [langchain_community.vectorstores]
┃   ┣━━ 🤖 getChatChain(llm: ChatOllama, db: Chroma) → Function [llm.py]
┃   ┃   ┣━━ 🧠 _combine_documents(docs: List, document_prompt: PromptTemplate, separator: str) → str [llm.py]
┃   ┃   ┣━━ 🧠 ChatPromptTemplate.from_messages() → Prompt [langchain_core.prompts]
┃   ┃   ┗━━ 🧠 ConversationBufferMemory() → Memory [langchain.memory]
┃   ┗━━ 🧑‍💻 User interaction loop (query processing) [app.py]
┃       ┗━━ 🤖 chat_chain.invoke(question: str) → Response [llm.py]

🚀 ui.py (ENTRY POINT - Streamlit Web UI)
┣━━ 🖥️ Streamlit app initialization [ui.py]
┃   ┣━━ 📦 get_list_of_models() → List[str] [models.py]
┃   ┣━━ 📁 load_documents_into_database(embedding_model: str, documents_path: str) → Chroma [document_loader.py]
┃   ┗━━ 🤖 getStreamingChain(question: str, memory: Memory, llm: ChatOllama, db: Chroma) → StreamingChain [llm.py]
┃       ┣━━ 🧠 StreamingStdOutCallbackHandler() → Callback [langchain.callbacks]
┃       ┗━━ 🧠 get_buffer_string() → str [langchain_core.messages]

📦 Module Dependencies
┣━━ app.py ➡ models.py (model availability checks)
┣━━ app.py ➡ document_loader.py (document ingestion)
┣━━ app.py ➡ llm.py (chat chain creation)
┣━━ ui.py ➡ models.py (model listing)
┣━━ ui.py ➡ document_loader.py (document ingestion)
┣━━ ui.py ➡ llm.py (streaming chain)
┗━━ All ➡ langchain_ollama (LLM/embeddings)
    ┗━━ All ➡ langchain_core (base classes)
```

### Key Execution Flow Analysis:
1. **Main CLI Execution Path** (`app.py`):
   - `main()` → `check_if_model_is_available()` (models.py)
   - `main()` → `load_documents_into_database()` (document_loader.py)
   - `main()` → `getChatChain()` (llm.py)
   - Chat loop → `chat_chain.invoke()` (llm.py)

2. **Web UI Execution Path** (`ui.py`):
   - Streamlit app → `get_list_of_models()` (models.py)
   - Document upload → `load_documents_into_database()` (document_loader.py)
   - Query handling → `getStreamingChain()` (llm.py)

3. **Cross-File Dependencies**:
   - `document_loader.py` uses `OllamaEmbeddings` and `Chroma` from LangChain
   - `llm.py` combines `ChatOllama` with `Chroma` retriever for RAG
   - Both entry points share common dependencies on `models.py` and `document_loader.py`

4. **Critical Function Calls**:
   - `check_if_model_is_available()` ensures required Ollama models are present
   - `load_documents_into_database()` handles document parsing, splitting, and vectorization
   - `getChatChain()`/`getStreamingChain()` create LangChain pipelines for RAG

This architecture follows a clear separation of concerns:
- **Data Layer**: `document_loader.py` handles document ingestion and vectorization
- **Model Layer**: `llm.py` and `models.py` manage LLM interactions
- **Interface Layer**: `app.py` (CLI) and `ui.py` (Streamlit) provide user-facing entry points

The application supports both direct CLI usage and a web-based interface while maintaining a consistent RAG pipeline through shared modules.

</details>

## 📈 File Analyses  

<details>
  <summary><strong>File: <a href="https://github.com/amscotti/local-LLM-with-RAG/blob/main/app.py">app.py</a></strong></summary>

  ### 1. Main purpose and responsibilities
The `app.py` file serves as the main entry point for a local LLM (Large Language Model) with RAG (Retrieval-Augmented Generation) using Ollama. Its primary responsibilities include:
1. Parsing command-line arguments to configure the LLM and embedding models, as well as the path to the documents.
2. Checking the availability of the specified LLM and embedding models, and attempting to pull them if they are not available.
3. Loading documents into a database using the specified embedding model.
4. Initializing the LLM and setting up the chat chain for interaction.
5. Running a continuous loop to accept user questions, process them using the chat chain, and display responses until the user exits.

### 2. Key functions and their purposes

- **`main(llm_model_name: str, embedding_model_name: str, documents_path: str) -> None`**:
  - **Inputs**:
    - `llm_model_name` (str): The name of the LLM model to use (e.g., "mistral").
    - `embedding_model_name` (str): The name of the embedding model to use (e.g., "nomic-embed-text").
    - `documents_path` (str): The path to the directory containing documents to load (e.g., "Research").
  - **Processing**:
    1. Checks if the specified LLM and embedding models are available; if not, attempts to pull them.
    2. Loads documents from `documents_path` into a database using the specified embedding model.
    3. Initializes the LLM and sets up the chat chain.
    4. Enters a loop to accept user questions, processes them using the chat chain, and prints responses until the user types "exit" or interrupts with `Ctrl+C`.
  - **Output**: None (runs interactively until terminated).

- **`parse_arguments() -> argparse.Namespace`**:
  - **Inputs**: None (reads command-line arguments).
  - **Processing**:
    1. Defines command-line arguments for the LLM model (`--model`), embedding model (`--embedding_model`), and document path (`--path`).
    2. Parses the command-line arguments and returns them as a `Namespace` object.
  - **Output**: `argparse.Namespace` containing the parsed arguments.

### 3. Important interactions with other parts of the system
- **`models.py`**: Uses `check_if_model_is_available` to verify the availability of the specified LLM and embedding models.
- **`document_loader.py`**: Uses `load_documents_into_database` to load documents from `documents_path` into a database using the specified embedding model.
- **`llm.py`**: Uses `getChatChain` to set up the chat chain with the initialized LLM and the document database.
- **`langchain_ollama`**: Uses `ChatOllama` to initialize the LLM with the specified model name.

### 4. Notable features or patterns
- **Command-line Interface**: Uses `argparse` to allow users to specify the LLM model, embedding model, and document path at runtime.
- **Model Availability Check**: Ensures that the required models are available before proceeding, and attempts to pull them if not.
- **Interactive Loop**: Provides an interactive command-line interface for users to ask questions and receive responses until they choose to exit.
- **Modular Design**: Relies on separate modules (`models.py`, `document_loader.py`, `llm.py`) for specific functionalities, promoting separation of concerns.

### Overall
`app.py` is the central script that orchestrates the interaction between the user, the LLM, and the document database. It leverages other modules to handle model availability, document loading, and chat chain setup, providing a streamlined command-line interface for users to interact with the system. The script is designed to be flexible, allowing users to specify different models and document paths, and to be robust by handling potential errors such as missing models or documents.

  ---
</details>

<details>
  <summary><strong>File: <a href="https://github.com/amscotti/local-LLM-with-RAG/blob/main/document_loader.py">document_loader.py</a></strong></summary>

  ### 1. Main purpose and responsibilities
The `document_loader.py` file is responsible for loading documents from a specified directory, splitting them into smaller chunks, and then embedding these chunks into a vector database (Chroma) using the Ollama embeddings model. It also provides functionality to reload documents if needed.

### 2. Key functions and their purposes

- **`load_documents_into_database(model_name: str, documents_path: str, reload: bool = True) -> Chroma`**:
  - **Inputs**:
    - `model_name` (str): The name of the Ollama embeddings model to use.
    - `documents_path` (str): The path to the directory containing the documents to load.
    - `reload` (bool, optional): Whether to reload the documents or use the existing database. Defaults to True.
  - **Processing**:
    - If `reload` is True, it loads the documents from `documents_path` using `load_documents`, splits them into chunks using `TEXT_SPLITTER`, and then embeds them into the Chroma database using the specified Ollama embeddings model.
    - If `reload` is False, it loads the existing Chroma database from the `PERSIST_DIRECTORY`.
  - **Output**:
    - Returns a `Chroma` database instance with the loaded documents.

- **`load_documents(path: str) -> List[Document]`**:
  - **Inputs**:
    - `path` (str): The path to the directory containing documents to load.
  - **Processing**:
    - Checks if the path exists and raises a `FileNotFoundError` if it does not.
    - Uses `DirectoryLoader` with `PyPDFLoader` to load PDF files and `TextLoader` to load Markdown files.
    - Extends the list of documents with the loaded files.
  - **Output**:
    - Returns a list of `Document` objects loaded from the specified directory.

### 3. Important interactions with other parts of the system
- The file interacts with `langchain_community.document_loaders` to load documents of different types (PDF, Markdown).
- It uses `langchain_ollama` for embeddings and `langchain_community.vectorstores` for storing embeddings in the Chroma database.
- The `TEXT_SPLITTER` is an instance of `RecursiveCharacterTextSplitter` from `langchain.text_splitter`, used to split documents into smaller chunks.

### 4. Notable features or patterns
- The code uses a dictionary (`loaders`) to map file extensions to their respective loaders, making it easy to extend support for additional file types.
- The `load_documents_into_database` function conditionally reloads documents based on the `reload` flag, allowing for flexibility in updating the database.
- The use of `Chroma.from_documents` and `Chroma` constructors ensures that the database is either created from scratch or loaded from an existing directory, depending on the `reload` flag.

### Overall
The `document_loader.py` file provides a structured way to load, split, and embed documents into a vector database using the Ollama embeddings model. It supports multiple file types and allows for conditional reloading of documents, making it a flexible and reusable component in the system.

  ---
</details>

<details>
  <summary><strong>File: <a href="https://github.com/amscotti/local-LLM-with-RAG/blob/main/llm.py">llm.py</a></strong></summary>

  ### 1. Main purpose and responsibilities
The `llm.py` file is responsible for setting up and managing the conversational chain for a research assistant chatbot. It integrates LangChain components to handle memory, question rephrasing, document retrieval, and answer generation. The file provides two main functionalities:
1. **Streaming Chain**: A chain that streams responses to questions using retrieved documents and chat history.
2. **Chat Chain**: A chain that handles interactive chat sessions with memory, allowing the chatbot to maintain context across multiple turns.

### 2. Key functions and their purposes

#### `_combine_documents(docs, document_prompt=DEFAULT_DOCUMENT_PROMPT, document_separator="\n\n")`:
- **Inputs**:
  - `docs` (List[Document]): A list of documents to combine.
  - `document_prompt` (PromptTemplate): A template to format each document (default is `DEFAULT_DOCUMENT_PROMPT`).
  - `document_separator` (str): A separator to join the formatted documents (default is `"\n\n"`).
- **Processing**: Formats each document using `document_prompt` and joins them with `document_separator`.
- **Output**: A single string containing all formatted documents.

#### `getStreamingChain(question: str, memory, llm, db)`:
- **Inputs**:
  - `question` (str): The user's question.
  - `memory`: The chat history memory (not used in the function, but passed for consistency).
  - `llm`: The language model to use for generating answers.
  - `db`: The document database to retrieve relevant documents.
- **Processing**:
  1. Sets up a retriever from `db` with `k=10`.
  2. Constructs a chain that:
     - Loads chat history from `memory` (but `memory` is not actually used here).
     - Rephrases the question using `CONDENSE_QUESTION_PROMPT` and `llm`.
     - Retrieves documents based on the rephrased question.
     - Combines the documents and generates an answer using `ANSWER_PROMPT` and `llm`.
- **Output**: A streaming generator for the answer.

#### `getChatChain(llm, db)`:
- **Inputs**:
  - `llm`: The language model to use for generating answers.
  - `db`: The document database to retrieve relevant documents.
- **Processing**:
  1. Sets up a retriever from `db` with `k=10`.
  2. Constructs a chain that:
     - Loads chat history from `memory` (global `ConversationBufferMemory`).
     - Rephrases the question using `CONDENSE_QUESTION_PROMPT` and `llm`.
     - Retrieves documents based on the rephrased question.
     - Combines the documents and generates an answer using `ANSWER_PROMPT` and `llm`.
     - Saves the question and answer to `memory`.
  3. Returns a `chat(question: str)` function that invokes the chain and updates memory.
- **Output**: A `chat(question: str)` function that can be called to get responses and update memory.

### 3. Important interactions with other parts of the system
- **LangChain**: The file heavily relies on LangChain components (`ConversationBufferMemory`, `ChatPromptTemplate`, `RunnableLambda`, etc.) to build the conversational chain.
- **Document Database (`db`)**: The `db` parameter is expected to be a LangChain retriever-compatible object (e.g., a vector store) that provides relevant documents for a given query.
- **Language Model (`llm`)**: The `llm` parameter is expected to be a LangChain-compatible language model (e.g., OpenAI, HuggingFace) used for generating answers and rephrasing questions.

### 4. Notable features or patterns
- **Memory Management**: Uses `ConversationBufferMemory` to maintain chat history across turns, but note that `getStreamingChain` does not actually use the passed `memory` (it is hardcoded to use `memory` from the global scope in `getChatChain`).
- **Modular Chain Construction**: The conversational chain is built using LangChain's `RunnablePassthrough` and `RunnableLambda` to create a pipeline of operations (rephrasing, retrieval, answer generation).
- **Streaming Support**: `getStreamingChain` returns a streaming generator, allowing for real-time output of the answer.
- **Prompt Engineering**: Uses carefully designed prompts (`CONDENSE_QUESTION_PROMPT`, `ANSWER_PROMPT`) to guide the language model's behavior.

### Overall
The `llm.py` file provides the core functionality for a research assistant chatbot by integrating LangChain components to handle memory, document retrieval, and answer generation. It supports both streaming responses and interactive chat sessions with memory. The code is modular and relies on LangChain's abstractions to build the conversational pipeline. However, there is a discrepancy in how `memory` is handled between `getStreamingChain` and `getChatChain`, which should be addressed for consistency.

  ---
</details>

<details>
  <summary><strong>File: <a href="https://github.com/amscotti/local-LLM-with-RAG/blob/main/models.py">models.py</a></strong></summary>

  ### 1. Main purpose and responsibilities
The `models.py` file is responsible for managing interactions with the Ollama service to check the availability of machine learning models, pull them if they are not available locally, and list available models. It ensures that the required models are present and can be used by other parts of the system.

### 2. Key functions and their purposes

- **`__pull_model(name: str) -> None`**:
  - **Inputs**: 
    - `name` (str): The name of the model to pull from the Ollama repository.
  - **Processing**: 
    - Initiates a pull request to the Ollama service for the specified model.
    - Streams the download progress, updating a progress bar for each digest (part of the model).
    - Closes the progress bar when a new digest is encountered or when the download is complete.
  - **Output**: None. The function is responsible for downloading the model and updating the progress bars.

- **`__is_model_available_locally(model_name: str) -> bool`**:
  - **Inputs**: 
    - `model_name` (str): The name of the model to check for local availability.
  - **Processing**: 
    - Attempts to retrieve information about the model using `ollama.show(model_name)`.
    - Returns `True` if the model is found locally, `False` if an error occurs (indicating the model is not available).
  - **Output**: A boolean indicating whether the model is available locally.

- **`get_list_of_models() -> list[str]`**:
  - **Inputs**: None.
  - **Processing**: 
    - Calls `ollama.list()` to get a list of all available models in the Ollama repository.
    - Extracts the model names from the response and returns them as a list of strings.
  - **Output**: A list of strings representing the names of available models.

- **`check_if_model_is_available(model_name: str) -> None`**:
  - **Inputs**: 
    - `model_name` (str): The name of the model to check and potentially pull.
  - **Processing**: 
    - Checks if the model is available locally using `__is_model_available_locally`.
    - If not available, attempts to pull the model using `__pull_model`.
    - Raises exceptions if there are issues communicating with the Ollama service or if the model cannot be found.
  - **Output**: None. The function ensures the model is available locally or raises an exception.

### 3. Important interactions with other parts of the system
- The file interacts with the `ollama` library to manage models (pull, list, show).
- It uses `tqdm` to display progress bars during model downloads.
- The functions in this file are likely used by other parts of the system (e.g., `llm.py` or `app.py`) to ensure models are available before attempting to use them.

### 4. Notable features or patterns
- **Lazy Loading**: Models are only pulled when they are not available locally, reducing unnecessary downloads.
- **Progress Tracking**: Uses `tqdm` to provide visual feedback on the download progress of models.
- **Error Handling**: Raises specific exceptions when there are issues with the Ollama service or model availability.
- **Encapsulation**: Private functions (`__pull_model`, `__is_model_available_locally`) are used to hide implementation details from the rest of the system.

### Overall
The `models.py` file provides essential functionality for managing machine learning models in the Ollama repository. It ensures that models are available locally, handles downloading them if necessary, and provides a list of available models. The file is designed to be modular and reusable, with clear separation of concerns and robust error handling.

  ---
</details>

<details>
  <summary><strong>File: <a href="https://github.com/amscotti/local-LLM-with-RAG/blob/main/ui.py">ui.py</a></strong></summary>

  ### 1. Main purpose and responsibilities
The `ui.py` file is responsible for creating a Streamlit-based user interface for a local Large Language Model (LLM) with Retrieval-Augmented Generation (RAG) capabilities. It allows users to:
1. Select a model from a list of available models.
2. Specify a folder path containing documents to be indexed.
3. Index the documents into a Chroma database using embeddings.
4. Interact with the LLM by asking questions, leveraging the indexed documents for context.

### 2. Key functions and their purposes
The code does not define any functions but uses Streamlit's interactive components to build the UI and manage the application's state. The key interactions are:
1. **Model Selection**:
   - Uses `st.sidebar.selectbox` to let the user choose a model from `st.session_state["list_of_models"]`.
   - If the selected model changes, it updates `st.session_state["ollama_model"]` and `st.session_state["llm"]` with a new `ChatOllama` instance.

2. **Folder Path Input**:
   - Uses `st.sidebar.text_input` to accept a folder path (`PATH` defaults to "Research").
   - Validates the path and displays an error if invalid.

3. **Indexing Documents**:
   - When the "Index Documents" button is clicked, it calls `load_documents_into_database` to create embeddings and load documents into Chroma.
   - The resulting database is stored in `st.session_state.db`.

4. **Chat Interface**:
   - Displays previous chat messages from `st.session_state.messages`.
   - Uses `st.chat_input` to accept user questions.
   - If `st.session_state.db` is not `None`, it calls `getStreamingChain` to generate a response, which is streamed to the UI and appended to `st.session_state.messages`.

### 3. Important interactions with other parts of the system
- **`document_loader.py`**: The `load_documents_into_database` function is imported from here to handle document indexing.
- **`models.py`**: The `get_list_of_models` function is imported to populate the model selection dropdown.
- **`llm.py`**: The `getStreamingChain` function is imported to generate responses to user queries using the LLM and the indexed documents.
- **`langchain_ollama`**: The `ChatOllama` class is used to instantiate the selected LLM.

### 4. Notable features or patterns
- **Session State Management**: The code uses `st.session_state` to persist the model, database, and chat messages across reruns.
- **Streaming Responses**: The `getStreamingChain` function streams the LLM's response to the UI in real-time.
- **Error Handling**: The UI provides warnings and errors for invalid folder paths or unindexed documents.
- **Modularity**: The UI is separated from the core logic (document loading, model management, and LLM interaction), which is handled by other modules.

### Overall
The `ui.py` file provides a user-friendly interface for interacting with a local LLM using RAG. It handles model selection, document indexing, and chat interactions, delegating the core functionality to other modules. The use of Streamlit makes it easy to build and deploy the application, while session state management ensures a smooth user experience.

  ---
</details>


## ✒️ Project Summary 
### Project Summary

This project is an experimental implementation of a **local Language Model (LLM) with Retrieval-Augmented Generation (RAG)**. It uses **Ollama** to run LLMs locally and **LangChain** for RAG to answer questions based on user-provided documents (PDFs or Markdown files). The project includes a **Streamlit-based web UI** for interactive use.

---

1. **Main purpose and functionality**:
   - **Purpose**: Enable users to run LLMs locally and perform RAG to answer questions using their own documents.
   - **Functionality**:
     - Load and parse PDF/Markdown documents.
     - Generate embeddings for document chunks using Ollama.
     - Store embeddings in a Chroma vector database.
     - Answer user queries by retrieving relevant documents and generating responses with the LLM.
     - Provide both a CLI and a Streamlit web UI for interaction.

2. **Tech stack and architecture**:
   - **Languages**: Python
   - **Frameworks/Libraries**:
     - **Ollama**: Local LLM execution and embeddings.
     - **LangChain**: RAG orchestration.
     - **Chroma**: Vector storage.
     - **Streamlit**: Web UI.
     - **PyPDF**: PDF parsing.
     - **UV**: Dependency management.
   - **Architecture**: Modular monorepo with a pipeline:
     - Document Loader → Embedding Generation (Ollama) → Chroma Vector DB → LLM Query (Ollama + LangChain) → Streamlit UI.

3. **Key components and their interactions**:
   - **`app.py`**: Main CLI script for checking model availability, loading documents, and running the chat loop.
   - **`document_loader.py`**: Loads and splits documents, generates embeddings, and stores them in Chroma.
   - **`llm.py`**: Creates LangChain pipelines for RAG (chat and streaming chains).
   - **`models.py`**: Manages Ollama models (checking availability, pulling models).
   - **`ui.py`**: Streamlit web UI for document upload and querying.
   - **`Research/`**: Sample PDF documents for testing.

4. **Notable features**:
   - Supports both CLI and web UI.
   - Uses local LLMs via Ollama, ensuring privacy and offline use.
   - Modular design allows easy swapping of components (e.g., vector DB, document loaders).
   - Includes a sample set of research papers for quick testing.

5. **Code organization and structure**:
   - **Entry Points**: `app.py` (CLI), `ui.py` (Streamlit UI).
   - **Core Modules**:
     - `document_loader.py`: Document processing and embedding.
     - `llm.py`: RAG chain construction.
     - `models.py`: Ollama model management.
   - **Dependencies**: Managed via `pyproject.toml` and `uv.lock`.
   - **Data**: Sample documents in `Research/` directory.

---

**Overall**, this project provides a flexible and locally executable framework for experimenting with RAG using local LLMs, with a focus on modularity and ease of use through both CLI and web interfaces.