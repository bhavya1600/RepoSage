import OpenAI from 'openai';
import type { FileMetadata, FileAnalysis } from '../types';

export class AnalyzerService {
  private openai: OpenAI;
  
  constructor(apiKey: string) {
    this.openai = new OpenAI({
      apiKey,
      dangerouslyAllowBrowser: true
    });
  }

  async analyzeSummary(files: FileMetadata[]): Promise<string> {
    const filesList = files.map(f => `${f.path} (${f.type})`).join('\n');
    
    const response = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{
        role: 'system',
        content: 'Generate a concise summary of this repository based on its file structure.'
      }, {
        role: 'user',
        content: `Repository files:\n${filesList}`
      }]
    });

    return response.choices[0].message.content || '';
  }

  async analyzeFile(file: FileMetadata): Promise<{
    human: FileAnalysis;
    technical: any;
  }> {
    const response = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{
        role: 'system',
        content: 'Analyze this code file and provide two outputs: 1) Human readable analysis 2) Technical JSON data'
      }, {
        role: 'user',
        content: `File: ${file.path}\n\nContent:\n${file.content}`
      }]
    });

    const content = response.choices[0].message.content || '';
    const [humanPart, jsonPart] = content.split('---');

    return {
      human: this.parseHumanAnalysis(humanPart),
      technical: JSON.parse(jsonPart)
    };
  }

  private parseHumanAnalysis(text: string): FileAnalysis {
    // Simple parser for demonstration - in reality would need more robust parsing
    return {
      path: '',
      summary: text.split('\n')[0],
      functionality: text.split('\n')[1],
      functions: [],
      interactions: []
    };
  }

  async generateCallHierarchy(technicalData: any[]): Promise<string> {
    const response = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{
        role: 'system',
        content: 'Generate a call hierarchy diagram based on the technical analysis data.'
      }, {
        role: 'user',
        content: JSON.stringify(technicalData)
      }]
    });

    return response.choices[0].message.content || '';
  }

  async generateFinalExplanation(
    summary: string,
    fileAnalyses: FileAnalysis[],
    callHierarchy: string
  ): Promise<string> {
    const response = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{
        role: 'system',
        content: 'Generate a comprehensive explanation of the repository.'
      }, {
        role: 'user',
        content: JSON.stringify({ summary, fileAnalyses, callHierarchy })
      }]
    });

    return response.choices[0].message.content || '';
  }
}