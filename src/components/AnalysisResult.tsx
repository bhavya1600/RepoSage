import React from 'react';
import { marked } from 'marked';
import { Download } from 'lucide-react';

interface Props {
  markdown: string;
}

export function AnalysisResult({ markdown }: Props) {
  const downloadMarkdown = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'repository-analysis.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Analysis Result</h2>
        <button
          onClick={downloadMarkdown}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Download className="w-4 h-4" />
          <span>Download</span>
        </button>
      </div>
      
      <div 
        className="prose prose-blue max-w-none bg-white rounded-lg p-8 shadow-lg"
        dangerouslySetInnerHTML={{ __html: marked(markdown) }}
      />
    </div>
  );
}