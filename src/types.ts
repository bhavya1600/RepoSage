export interface AnalysisState {
  status: 'idle' | 'loading' | 'analyzing' | 'complete' | 'error';
  currentStep?: string;
  error?: string;
  result?: string;
}

export interface FileAnalysis {
  path: string;
  summary: string;
  functionality: string;
  functions: {
    name: string;
    description: string;
    inputs: string[];
    outputs: string;
  }[];
  interactions: string[];
}

export interface FileMetadata {
  path: string;
  type: string;
  content: string;
  size: number;
}

export interface RepoStructure {
  name: string;
  path: string;
  type: 'file' | 'dir';
  children?: RepoStructure[];
}