import { Octokit } from 'octokit';
import type { RepoStructure, FileMetadata } from '../types';

export class GitHubService {
  private octokit: Octokit;
  
  constructor(token?: string) {
    this.octokit = new Octokit({
      auth: token
    });
  }

  private parseGitHubUrl(url: string): { owner: string; repo: string } {
    const match = url.match(/github\.com\/([^/]+)\/([^/]+)/);
    if (!match) {
      throw new Error('Invalid GitHub repository URL');
    }
    return { owner: match[1], repo: match[2] };
  }

  async fetchRepository(url: string): Promise<{
    structure: RepoStructure;
    files: FileMetadata[];
  }> {
    const { owner, repo } = this.parseGitHubUrl(url);
    
    const { data: tree } = await this.octokit.rest.git.getTree({
      owner,
      repo,
      tree_sha: 'main',
      recursive: 'true'
    });

    const structure: RepoStructure = {
      name: repo,
      path: '',
      type: 'dir',
      children: []
    };

    const files: FileMetadata[] = [];
    
    for (const item of tree.tree) {
      if (this.isRelevantFile(item.path)) {
        const { data } = await this.octokit.rest.repos.getContent({
          owner,
          repo,
          path: item.path
        });

        if ('content' in data) {
          files.push({
            path: item.path,
            type: this.getFileType(item.path),
            content: Buffer.from(data.content, 'base64').toString(),
            size: item.size || 0
          });
        }
      }
      
      this.addToStructure(structure, item.path, item.type === 'blob' ? 'file' : 'dir');
    }

    return { structure, files };
  }

  private isRelevantFile(path: string): boolean {
    const irrelevantExtensions = ['.css', '.jpg', '.jpeg', '.png', '.gif', '.pdf', '.svg', '.ico'];
    return !irrelevantExtensions.some(ext => path.toLowerCase().endsWith(ext));
  }

  private getFileType(path: string): string {
    const ext = path.split('.').pop()?.toLowerCase() || '';
    return ext;
  }

  private addToStructure(root: RepoStructure, path: string, type: 'file' | 'dir'): void {
    const parts = path.split('/');
    let current = root;

    parts.forEach((part, index) => {
      if (index === parts.length - 1) {
        current.children = current.children || [];
        current.children.push({
          name: part,
          path: path,
          type: type
        });
      } else {
        current.children = current.children || [];
        let child = current.children.find(c => c.name === part);
        if (!child) {
          child = {
            name: part,
            path: parts.slice(0, index + 1).join('/'),
            type: 'dir',
            children: []
          };
          current.children.push(child);
        }
        current = child;
      }
    });
  }
}