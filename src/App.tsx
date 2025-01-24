import React, { useState } from 'react';
import { GitHubService } from './services/github';
import { AnalyzerService } from './services/analyzer';
import { AnalysisStatus } from './components/AnalysisStatus';
import { AnalysisResult } from './components/AnalysisResult';
import { Github } from 'lucide-react';
import type { AnalysisState } from './types';

function App() {
  const [url, setUrl] = useState('');
  const [state, setState] = useState<AnalysisState>({
    status: 'idle'
  });

  const analyze = async () => {
    try {
      setState({ status: 'loading', currentStep: 'Initializing...' });
      
      // Initialize services
      const githubService = new GitHubService();
      const analyzerService = new AnalyzerService(import.meta.env.VITE_OPENAI_API_KEY);
      
      // Fetch repository data
      setState({ status: 'loading', currentStep: 'Fetching repository data...' });
      const { structure, files } = await githubService.fetchRepository(url);
      
      // Generate initial summary
      setState({ status: 'analyzing', currentStep: 'Generating repository summary...' });
      const summary = await analyzerService.analyzeSummary(files);
      
      // Analyze each file
      const analyses = [];
      const technicalData = [];
      
      for (const file of files) {
        setState({
          status: 'analyzing',
          currentStep: `Analyzing ${file.path}...`
        });
        
        const analysis = await analyzerService.analyzeFile(file);
        analyses.push(analysis.human);
        technicalData.push(analysis.technical);
      }
      
      // Generate call hierarchy
      setState({
        status: 'analyzing',
        currentStep: 'Generating call hierarchy...'
      });
      const callHierarchy = await analyzerService.generateCallHierarchy(technicalData);
      
      // Generate final explanation
      setState({
        status: 'analyzing',
        currentStep: 'Generating final explanation...'
      });
      const finalExplanation = await analyzerService.generateFinalExplanation(
        summary,
        analyses,
        callHierarchy
      );
      
      // Create final markdown
      const markdown = `# Repository Analysis

## Summary
${summary}

## File Analysis
${analyses.map(a => `
### ${a.path}
${a.summary}

**Main Functionality:**
${a.functionality}

**Functions:**
${a.functions.map(f => `- ${f.name}: ${f.description}`).join('\n')}

**System Interactions:**
${a.interactions.join('\n')}
`).join('\n')}

## Call Hierarchy
\`\`\`
${callHierarchy}
\`\`\`

## Final Explanation
${finalExplanation}
`;
      
      setState({
        status: 'complete',
        result: markdown
      });
      
    } catch (error) {
      setState({
        status: 'error',
        error: error instanceof Error ? error.message : 'An unknown error occurred'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Github className="mx-auto h-12 w-12 text-blue-500" />
          <h1 className="mt-4 text-4xl font-bold text-gray-900">
            GitHub Repository Analyzer
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Analyze any GitHub repository to understand its structure, functionality, and architecture
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex space-x-4">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter GitHub repository URL"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={analyze}
              disabled={state.status === 'loading' || state.status === 'analyzing'}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Analyze
            </button>
          </div>

          <AnalysisStatus state={state} />
        </div>

        {state.status === 'complete' && state.result && (
          <AnalysisResult markdown={state.result} />
        )}
      </div>
    </div>
  );
}

export default App;