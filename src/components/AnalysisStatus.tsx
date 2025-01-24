import React from 'react';
import { Loader2 } from 'lucide-react';
import type { AnalysisState } from '../types';

interface Props {
  state: AnalysisState;
}

export function AnalysisStatus({ state }: Props) {
  if (state.status === 'idle') return null;

  return (
    <div className="mt-8 space-y-4">
      <div className="flex items-center space-x-3">
        {state.status === 'loading' || state.status === 'analyzing' ? (
          <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
        ) : state.status === 'complete' ? (
          <div className="w-5 h-5 rounded-full bg-green-500" />
        ) : (
          <div className="w-5 h-5 rounded-full bg-red-500" />
        )}
        <span className="font-medium capitalize">{state.status}</span>
      </div>
      
      {state.currentStep && (
        <p className="text-sm text-gray-600">{state.currentStep}</p>
      )}
      
      {state.error && (
        <p className="text-sm text-red-500">{state.error}</p>
      )}
    </div>
  );
}