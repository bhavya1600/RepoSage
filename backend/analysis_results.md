# 🔍 Repository Insights

## 📃 Project Details 
- **Name:** local-LLM-with-RAG
- **Description:** Running local Language Language Models (LLM) to perform Retrieval-Augmented Generation (RAG)
- **Primary Language:** Python

## 🤓 Project Understanding 
<details>
  <summary><strong>Peek Under the Hood 👀</strong></summary>

  1. **Project Overview**:  
This project implements a local Retrieval-Augmented Generation (RAG) system using Large Language Models (LLMs) via Ollama. It allows users to query PDF/Markdown documents using a command-line interface or an interactive Streamlit web UI.

2. **Main Components**:  
- `app.py`: Core RAG pipeline orchestrator (loads documents, generates embeddings, handles queries)  
- `document_loader.py`: Handles PDF/Markdown file parsing and preprocessing  
- `llm.py`: Manages LLM interactions with Ollama  
- `models.py`: Defines model configuration and embedding logic  
- `ui.py`: Streamlit web interface for user interaction  
- `Research/`: Directory containing sample PDF documents for RAG  
- `Chroma`: Vector database for storing/retrieving embeddings  

3. **Tech Stack**:  
- **Languages**: Python  
- **LLM Frameworks**: Ollama (Mistral/nomic-embed-text models), LangChain  
- **Vector DB**: Chroma  
- **Web Framework**: Streamlit  
- **Utilities**: PyPDF2, UV (Python package manager)  

4. **Architecture**:  
Modular monolithic architecture with:  
- Document ingestion layer (`document_loader.py`)  
- Embedding generation/storage layer (Ollama + Chroma)  
- LLM query processing layer (`llm.py`)  
- Dual interfaces (CLI via `app.py`, web via Streamlit)  

5. **Key Limitations/Constraints**:  
- Embeddings are regenerated on each run (inefficient for large datasets)  
- Local model execution requires significant memory/CPU resources  
- Streamlit UI lacks persistent state management between sessions  
- No authentication/authorization in the web interface  
- Limited to Ollama-supported models for embeddings/LLM

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
┣━━ 🧪 main() → Orchestrates RAG pipeline [app.py]
┃   ┣━━ 📦 models.check_if_model_is_available() → Ensures LLM model exists [models.py]
┃   ┃   ┣━━ 🔍 __is_model_available_locally() → Checks local Ollama models [models.py]
┃   ┃   ┗━━ 📥 __pull_model() → Downloads model if missing [models.py]
┃   ┣━━ 📦 models.check_if_model_is_available() → Ensures embedding model exists [models.py]
┃   ┗━━ 📁 document_loader.load_documents_into_database() → Processes docs [document_loader.py]
┃       ┣━━ 📂 load_documents() → Loads raw files [document_loader.py]
┃       ┃   ┣━━ 📄 PyPDFLoader.load() → For PDFs [langchain_community]
┃       ┃   ┗━━ 📝 TextLoader.load() → For Markdown [langchain_community]
┃       ┣━━ 🗜️ RecursiveCharacterTextSplitter.split_documents() → Chunks text [langchain]
┃       ┗━━ 🧠 OllamaEmbeddings.embed_documents() → Generates embeddings [langchain_ollama]
┃           ┗━━ 💾 Chroma.from_documents() → Stores in vector DB [langchain_community]
┗━━ 🔗 llm.getChatChain() → Creates query processing chain [llm.py]
    ┣━━ 🧩 ChatPromptTemplate.from_messages() → Creates prompt template [langchain_core]
    ┣━━ 🧠 ConversationBufferMemory() → Tracks conversation history [langchain.memory]
    ┣━━ 🔁 itemgetter() → Routes inputs through chain [operator]
    ┗━━ 📤 RunnablePassthrough.assign() → Final answer generation [langchain_core]
```

### Execution Flow Analysis
1. **Model Validation**  
   - `app.py` first validates both LLM and embedding models exist via `models.check_if_model_is_available()`
   - Uses Ollama API to check local availability, pulls models if missing

2. **Document Processing**  
   - `document_loader.load_documents_into_database()` handles:
     - File type detection (PDF/Markdown)
     - Text splitting (500-1000 char chunks)
     - Embedding generation (Ollama nomic-embed-text)
     - Vector storage (Chroma DB persistence)

3. **Query Pipeline Setup**  
   - `llm.getChatChain()` creates:
     - Contextual compression chain
     - Memory-aware prompt template
     - Streaming response handler
   - Combines LLM, vector DB, and conversation history

### Cross-File Dependencies
```
app.py → models.py (model validation)
app.py → document_loader.py (data ingestion)
app.py → llm.py (query processing)
document_loader.py → langchain_ollama (embeddings)
llm.py → langchain_core (prompts/runnables)
```

### Key Technical Path
1. CLI arguments → `parse_arguments()` → `main()`
2. Model checks → `__is_model_available_locally()` → `__pull_model()`
3. Document loading → `DirectoryLoader()` → format-specific loaders
4. Text processing → `RecursiveCharacterTextSplitter` → `Chroma.from_documents()`
5. Query handling → `getChatChain()` → `RunnableLambda` chains

### Critical Limitation Mapping
- **No embedding persistence**: `Chroma.from_documents()` recreates DB on each run
- **Memory intensity**: Ollama embeddings and LLMs require >8GB RAM
- **Statelessness**: `ConversationBufferMemory` resets on app restart

This hierarchy shows the core RAG pipeline from model validation through document processing to query execution, highlighting the LangChain components enabling the system's functionality.

</details>

## 📈 File Analyses  

<details>
  <summary><strong>File: <a href="https://github.com/amscotti/local-LLM-with-RAG/blob/main/app.py">app.py</a></strong></summary>

  ### 1. Main purpose and responsibilities

The `app.py` file serves as the main entry point for a local LLM (Large Language Model) application that uses RAG (Retrieval-Augmented Generation) with Ollama. Its primary responsibilities are:
1. Checking the availability of specified LLM and embedding models.
2. Loading documents from a specified directory into a vector database using an embedding model.
3. Initializing a chat chain with the LLM and the vector database.
4. Running an interactive loop to accept user questions, generate responses using the chat chain, and display them until the user exits.

### 2. Key functions and their purposes

- **`main(llm_model_name: str, embedding_model_name: str, documents_path: str) -> None`**:
  - **Inputs**:
    - `llm_model_name` (str): The name of the LLM model to use (e.g., "mistral").
    - `embedding_model_name` (str): The name of the embedding model to use (e.g., "nomic-embed-text").
    - `documents_path` (str): The path to the directory containing documents to load (e.g., "Research").
  - **Processing**:
    1. Checks if the specified LLM and embedding models are available using `check_if_model_is_available` (from `models.py`). If not, exits the program.
    2. Loads documents from `documents_path` into a vector database using `load_documents_into_database` (from `document_loader.py`).
    3. Initializes a `ChatOllama` instance with `llm_model_name`.
    4. Creates a chat chain using `getChatChain` (from `llm.py`) with the LLM and the vector database.
    5. Enters an interactive loop to accept user questions, generate responses using the chat chain, and print them until the user types "exit" or interrupts with `Ctrl+C`.
  - **Output**: None (interactive output to the console).

- **`parse_arguments() -> argparse.Namespace`**:
  - **Inputs**: None (reads command-line arguments).
  - **Processing**:
    1. Defines command-line arguments for the LLM model, embedding model, and document path using `argparse`.
    2. Parses and returns the arguments.
  - **Output**: An `argparse.Namespace` object containing the parsed arguments.

### 3. Important interactions with other parts of the system

- **`models.py`**: Uses `check_if_model_is_available` to verify the availability of the LLM and embedding models.
- **`document_loader.py`**: Uses `load_documents_into_database` to load documents into a vector database.
- **`llm.py`**: Uses `getChatChain` to create a chat chain with the LLM and the vector database.
- **`langchain_ollama`**: Uses `ChatOllama` to interact with the Ollama LLM.

### 4. Notable features or patterns

- **Modular Design**: The code is modular, with separate functions for checking model availability, loading documents, and creating the chat chain. This promotes reusability and separation of concerns.
- **Interactive Loop**: The main loop allows users to interact with the LLM in real-time, making it suitable for conversational applications.
- **Error Handling**: The code handles exceptions gracefully, such as model unavailability (`Exception`) and missing document directories (`FileNotFoundError`), and exits the program with an error message.
- **Command-Line Arguments**: Uses `argparse` to allow users to specify the LLM model, embedding model, and document path at runtime, providing flexibility.

### Overall

`app.py` is the central script that orchestrates the interaction between the user, the LLM, and the document database. It leverages other modules to check model availability, load documents, and create a chat chain, providing an interactive interface for querying the LLM with context from the loaded documents. The use of command-line arguments and modular design makes it adaptable and easy to extend.

  ---
</details>

<details>
  <summary><strong>File: <a href="https://github.com/amscotti/local-LLM-with-RAG/blob/main/document_loader.py">document_loader.py</a></strong></summary>

  ```python
### 1. Main purpose and responsibilities
The `document_loader.py` file is responsible for loading documents from a specified directory, splitting them into smaller chunks, and then embedding and storing them in a Chroma vector database. It also provides functionality to reload the documents or use the existing database.

### 2. Key functions and their purposes
- **`load_documents_into_database(model_name: str, documents_path: str, reload: bool = True) -> Chroma`**:
  - **Inputs**:
    - `model_name` (str): The name of the Ollama embedding model to use.
    - `documents_path` (str): The path to the directory containing the documents to load.
    - `reload` (bool, optional): Whether to reload the documents or use the existing database. Defaults to True.
  - **Processing**:
    - If `reload` is True, it loads the documents from `documents_path`, splits them into chunks, and embeds them using the specified Ollama model before storing them in the Chroma database.
    - If `reload` is False, it simply loads the existing Chroma database.
  - **Output**:
    - Returns a `Chroma` object representing the vector database with the loaded documents.

- **`load_documents(path: str) -> List[Document]`**:
  - **Inputs**:
    - `path` (str): The path to the directory containing the documents to load.
  - **Processing**:
    - Checks if the path exists and raises a `FileNotFoundError` if it does not.
    - Uses `DirectoryLoader` with specific loaders for PDF and Markdown files to load the documents into a list of `Document` objects.
  - **Output**:
    - Returns a list of `Document` objects representing the loaded documents.

### 3. Important interactions with other parts of the system
- **`langchain_community.document_loaders`**: Uses `DirectoryLoader`, `PyPDFLoader`, and `TextLoader` to load documents from the filesystem.
- **`langchain_core.documents`**: Uses the `Document` class to represent loaded documents.
- **`langchain_ollama`**: Uses `OllamaEmbeddings` to generate embeddings for the documents.
- **`langchain_community.vectorstores`**: Uses `Chroma` to store and manage the vector database.
- **`langchain.text_splitter`**: Uses `RecursiveCharacterTextSplitter` to split documents into smaller chunks.

### 4. Notable features or patterns
- **Modular Loading**: The `load_documents` function supports loading multiple file types (PDF and Markdown) using different loaders, making it easy to extend to other file types.
- **Chunking**: Documents are split into smaller chunks using `RecursiveCharacterTextSplitter` to improve the efficiency of embedding and retrieval.
- **Persistence**: The Chroma database is persisted to disk (`PERSIST_DIRECTORY = "storage"`), allowing for reuse without reloading documents.
- **Conditional Reloading**: The `load_documents_into_database` function allows for conditional reloading of documents based on the `reload` parameter, providing flexibility in managing the database.

### Overall
The `document_loader.py` file provides a robust mechanism for loading, chunking, embedding, and storing documents in a vector database. It leverages the LangChain ecosystem to handle various document types and embedding models, and it offers flexibility in managing the database through conditional reloading. This file is crucial for setting up the document retrieval system in the project.

  ---
</details>

<details>
  <summary><strong>File: <a href="https://github.com/amscotti/local-LLM-with-RAG/blob/main/llm.py">llm.py</a></strong></summary>

  ### 1. Main purpose and responsibilities
The `llm.py` file is responsible for setting up and managing the conversational chain for a research assistant chatbot. It integrates LangChain components to handle conversation history, question rephrasing, document retrieval, and answer generation. The file provides two main functionalities:
1. `getStreamingChain`: Creates a streaming chain for real-time response generation.
2. `getChatChain`: Creates a chat chain for interactive conversations with memory management.

### 2. Key functions and their purposes

#### `_combine_documents(docs, document_prompt=DEFAULT_DOCUMENT_PROMPT, document_separator="\n\n")`
- **Inputs**:
  - `docs` (List[Document]): A list of documents to be combined.
  - `document_prompt` (PromptTemplate): Template for formatting each document (default: `DEFAULT_DOCUMENT_PROMPT`).
  - `document_separator` (str): Separator between documents (default: `"\n\n"`).
- **Processing**: Formats each document using `document_prompt` and joins them with `document_separator`.
- **Output**: A single string containing all formatted documents separated by `document_separator`.

#### `getStreamingChain(question: str, memory, llm, db)`
- **Inputs**:
  - `question` (str): The user's question.
  - `memory`: The conversation memory (not used in the function, but passed to the chain).
  - `llm`: The language model to use for generating responses.
  - `db`: The document database to retrieve relevant documents from.
- **Processing**:
  1. Creates a retriever from `db` with `k=10` documents.
  2. Sets up a chain that:
     - Formats the chat history from `memory`.
     - Rephrases the question using `CONDENSE_QUESTION_PROMPT` and `llm`.
     - Retrieves relevant documents using the rephrased question.
     - Combines the documents and generates an answer using `ANSWER_PROMPT` and `llm`.
- **Output**: A streaming chain that can be used to generate responses in real-time.

#### `getChatChain(llm, db)`
- **Inputs**:
  - `llm`: The language model to use for generating responses.
  - `db`: The document database to retrieve relevant documents from.
- **Processing**:
  1. Creates a retriever from `db` with `k=10` documents.
  2. Sets up a chain that:
     - Loads the chat history from `memory`.
     - Rephrases the question using `CONDENSE_QUESTION_PROMPT` and `llm`.
     - Retrieves relevant documents using the rephrased question.
     - Combines the documents and generates an answer using `ANSWER_PROMPT` and `llm`.
     - Saves the conversation to `memory`.
- **Output**: A `chat` function that can be called with a question to get a response and update the memory.

### 3. Important interactions with other parts of the system
- **LangChain**: The file heavily relies on LangChain components like `ConversationBufferMemory`, `ChatPromptTemplate`, `RunnableLambda`, and `RunnablePassthrough` to manage the conversational flow.
- **Document Database (`db`)**: The `db` parameter is used to retrieve relevant documents based on the user's question.
- **Language Model (`llm`)**: The `llm` parameter is used to generate responses and rephrase questions.
- **Streaming**: The `getStreamingChain` function uses `StreamingStdOutCallbackHandler` to stream responses in real-time.

### 4. Notable features or patterns
- **Conversation Memory**: The `ConversationBufferMemory` is used to store and retrieve conversation history.
- **Question Rephrasing**: The `CONDENSE_QUESTION_PROMPT` is used to rephrase follow-up questions into standalone questions.
- **Document Retrieval**: The `retriever` is used to fetch relevant documents based on the rephrased question.
- **Answer Generation**: The `ANSWER_PROMPT` is used to generate answers based on the retrieved documents and the user's question.
- **Streaming Support**: The `getStreamingChain` function provides a way to stream responses in real-time.

### Overall
The `llm.py` file is a crucial part of the research assistant chatbot, providing the logic for handling conversations, retrieving relevant documents, and generating answers. It uses LangChain components to manage the conversational flow and integrates with a document database to provide contextually relevant responses. The file supports both streaming and interactive chat modes, making it versatile for different use cases.

  ---
</details>

<details>
  <summary><strong>File: <a href="https://github.com/amscotti/local-LLM-with-RAG/blob/main/models.py">models.py</a></strong></summary>

  ### 1. Main purpose and responsibilities
The `models.py` file is responsible for managing interactions with the Ollama service, specifically focusing on checking the availability of models locally, pulling models from the Ollama repository if they are not available, and listing available models. It ensures that the required models are present and can be used by other parts of the system.

### 2. Key functions and their purposes

- **`__pull_model(name: str) -> None`**:
  - **Inputs**: 
    - `name` (str): The name of the model to pull from the Ollama repository.
  - **Processing**: 
    - Streams the model pull progress from Ollama.
    - Uses `tqdm` to display a progress bar for each digest (part of the model) being downloaded.
    - Updates the progress bar as parts of the model are downloaded.
  - **Output**: None. The function is responsible for pulling the model and displaying progress.

- **`__is_model_available_locally(model_name: str) -> bool`**:
  - **Inputs**: 
    - `model_name` (str): The name of the model to check for local availability.
  - **Processing**: 
    - Attempts to retrieve the model details using `ollama.show(model_name)`.
    - Returns `True` if the model is available locally, `False` otherwise.
  - **Output**: A boolean indicating whether the model is available locally.

- **`get_list_of_models() -> list[str]`**:
  - **Inputs**: None.
  - **Processing**: 
    - Calls `ollama.list()` to get a list of available models.
    - Extracts the model names from the response.
  - **Output**: A list of strings representing the names of available models.

- **`check_if_model_is_available(model_name: str) -> None`**:
  - **Inputs**: 
    - `model_name` (str): The name of the model to check and potentially pull.
  - **Processing**: 
    - Checks if the model is available locally using `__is_model_available_locally`.
    - If not available, attempts to pull the model using `__pull_model`.
    - Raises exceptions if there are issues communicating with Ollama or if the model cannot be found.
  - **Output**: None. Ensures the model is available locally or raises an exception.

### 3. Important interactions with other parts of the system
- **Ollama Service**: The file interacts directly with the Ollama service to list, check, and pull models.
- **`tqdm` Library**: Used to display progress bars when pulling models.
- **Potential Callers**: Other parts of the system (e.g., `llm.py` or `app.py`) might call `check_if_model_is_available` to ensure a model is ready for use.

### 4. Notable features or patterns
- **Progress Tracking**: Uses `tqdm` to provide visual feedback on the progress of model downloads.
- **Error Handling**: Includes exception handling to manage issues with Ollama communication or missing models.
- **Private Functions**: Uses `__` prefix for internal functions (`__pull_model`, `__is_model_available_locally`) to indicate they are not meant for external use.

### Overall
The `models.py` file serves as a bridge between the application and the Ollama service, ensuring that required models are available locally. It abstracts the complexity of checking and pulling models, providing a simple interface (`check_if_model_is_available`) for other parts of the system to use. The use of `tqdm` enhances user experience by providing visual feedback during model downloads.

  ---
</details>

<details>
  <summary><strong>File: <a href="https://github.com/amscotti/local-LLM-with-RAG/blob/main/ui.py">ui.py</a></strong></summary>

  ### 1. Main purpose and responsibilities
The `ui.py` file is responsible for creating the Streamlit-based user interface for the Local LLM with RAG (Retrieval-Augmented Generation) application. It handles user interactions, manages session state, and orchestrates the flow of data between the user, the document database, and the language model. Key responsibilities include:
- Providing a sidebar for model selection and document indexing.
- Displaying chat messages and handling user input.
- Initializing and managing the language model and document database.
- Invoking the RAG chain to generate responses based on user queries and indexed documents.

### 2. Key functions and their purposes
- **`get_list_of_models()`**:
  - **Inputs**: None.
  - **Processing**: Retrieves a list of available language models from the `models.py` module.
  - **Output**: A list of model names (`List[str]`).

- **`load_documents_into_database(EMBEDDING_MODEL, folder_path)`**:
  - **Inputs**: 
    - `EMBEDDING_MODEL` (str): The name of the embedding model to use.
    - `folder_path` (str): The path to the folder containing documents to index.
  - **Processing**: Loads documents from the specified folder, creates embeddings, and stores them in a Chroma database.
  - **Output**: A Chroma database instance (`Chroma`).

- **`getStreamingChain(prompt, messages, llm, db)`**:
  - **Inputs**: 
    - `prompt` (str): The user's question or input.
    - `messages` (List[Dict]): The chat history.
    - `llm` (ChatOllama): The language model instance.
    - `db` (Chroma): The document database.
  - **Processing**: Constructs a RAG chain using the provided inputs and streams the response.
  - **Output**: A generator that yields the response tokens (`Generator[str, None, None]`).

### 3. Important interactions with other parts of the system
- **`models.py`**: Provides the list of available language models via `get_list_of_models()`.
- **`document_loader.py`**: Handles document loading and indexing into the Chroma database via `load_documents_into_database()`.
- **`llm.py`**: Constructs the RAG chain and streams responses via `getStreamingChain()`.
- **`langchain_ollama`**: Used to instantiate the `ChatOllama` language model.
- **`streamlit`**: Provides the UI framework for the application.

### 4. Notable features or patterns
- **Session State Management**: Uses `st.session_state` to persist the language model, document database, and chat messages across interactions.
- **Streaming Responses**: Uses a generator to stream the language model's response to the user in real-time.
- **Conditional UI Rendering**: Disables chat input until documents are indexed and shows appropriate warnings or info messages based on the application state.
- **Modular Design**: Separates concerns by delegating specific tasks to other modules (e.g., document loading, model listing, RAG chain construction).

### Overall
The `ui.py` file serves as the central hub for the Streamlit application, integrating the language model, document database, and user interface. It provides a seamless experience for users to select models, index documents, and interact with the RAG-powered chatbot. The code is well-structured, leveraging session state to maintain context and using modular functions to keep responsibilities clear. The use of streaming responses enhances the user experience by providing real-time feedback.

  ---
</details>


## ✒️ Project Summary 
This project is a local Retrieval-Augmented Generation (RAG) system that uses Large Language Models (LLMs) via Ollama to query PDF and Markdown documents. It provides both a command-line interface and an interactive Streamlit web UI for user interaction.

1. **Main purpose and functionality**:
   - The project allows users to interact with local LLMs to perform RAG on PDF and Markdown documents.
   - It supports querying documents using a command-line interface or a Streamlit web UI.
   - The system loads documents, generates embeddings, and stores them in a Chroma vector database for efficient retrieval.

2. **Tech stack and architecture**:
   - **Languages**: Python
   - **LLM Frameworks**: Ollama (Mistral/nomic-embed-text models), LangChain
   - **Vector DB**: Chroma
   - **Web Framework**: Streamlit
   - **Utilities**: PyPDF2, UV (Python package manager)
   - The architecture is modular monolithic, with separate layers for document ingestion, embedding generation/storage, LLM query processing, and dual interfaces (CLI and web).

3. **Key components and their interactions**:
   - `app.py`: Orchestrates the RAG pipeline, including model validation, document loading, and query processing.
   - `document_loader.py`: Handles loading and preprocessing of PDF and Markdown documents.
   - `llm.py`: Manages interactions with the LLM, including creating query processing chains.
   - `models.py`: Provides functions to manage and interact with Ollama models, including checking availability and pulling models.
   - `ui.py`: Implements the Streamlit web interface for user interaction.
   - `Chroma`: Vector database for storing and retrieving document embeddings.

4. **Notable features**:
   - Supports both CLI and web interfaces for user interaction.
   - Uses Ollama for local LLM and embedding generation.
   - Integrates with LangChain for document processing and query handling.
   - Provides a modular architecture for easy extension and customization.

5. **Code organization and structure**:
   - The code is organized into separate modules for different functionalities, such as document loading, LLM interaction, and model management.
   - Each module is responsible for a specific aspect of the RAG pipeline, promoting modularity and maintainability.
   - The project uses a combination of Python scripts and configuration files to manage dependencies and settings.

Overall, this project provides a comprehensive solution for performing RAG on local documents using LLMs, with a focus on modularity and ease of use.