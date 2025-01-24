export function parseGitHubUrl(url) {
  try {
    const urlObj = new URL(url);
    const [, owner, repo] = urlObj.pathname.split('/');
    
    if (!owner || !repo) {
      throw new Error('Invalid GitHub repository URL format');
    }

    return {
      owner,
      repo: repo.replace('.git', '')
    };
  } catch (error) {
    throw new Error('Invalid GitHub repository URL');
  }
}