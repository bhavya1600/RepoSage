import { writeFile } from 'fs/promises';

export async function saveToFile(filename, analysis) {
  // Create base GitHub URL for the repository
  const repoUrl = `https://github.com/${analysis.repository.owner.login}/${analysis.repository.name}`;
  const branch = analysis.repository.default_branch;

  // Function to create GitHub file link with proper URL encoding
  const createGitHubLink = (filePath) => {
    const encodedPath = filePath.split('/').map(part => encodeURIComponent(part)).join('/');
    return `[${filePath}](${repoUrl}/blob/${branch}/${encodedPath})`;
  };

  // Save the main markdown analysis with clean, human-readable format
  const mdContent = `# Repository Analysis Results

## Repository Information
Name: ${analysis.repository.name}
Description: ${analysis.repository.description}
Primary Language: ${analysis.repository.language}

## Project Structure
${formatFileTree(analysis.fileTree, '', repoUrl, branch)}

## File Analyses
${analysis.fileAnalysis.map(file => `
### ${createGitHubLink(file.path)}
${file.analysis}`).join('\n')}

## Call Hierarchy
${analysis.callHierarchy}

## Summary
${analysis.summary}`;

  await writeFile(filename, mdContent, 'utf8');

  // Save the JSON metadata separately
  const jsonFilename = filename.replace('.md', '.json');
  const jsonContent = {
    repository: {
      name: analysis.repository.name,
      description: analysis.repository.description,
      language: analysis.repository.language
    },
    fileMetadata: analysis.fileMetadata,
    callHierarchy: analysis.callHierarchy
  };

  await writeFile(jsonFilename, JSON.stringify(jsonContent, null, 2), 'utf8');
}

function formatFileTree(node, indent, repoUrl, branch) {
  let result = '';
  
  if (node.type === 'directory') {
    if (node.name !== 'root') {
      result += `${indent}📁 ${node.name}/\n`;
    }
    
    const childIndent = node.name === 'root' ? indent : indent + '&nbsp;&nbsp;&nbsp;&nbsp;';
    for (const [name, child] of Object.entries(node.children)) {
      result += formatFileTree(child, childIndent, repoUrl, branch);
    }
  } else {
    // Create full path by combining parent directories
    let fullPath = getFullPath(node);
    // Encode the full path for the URL
    const encodedPath = fullPath.split('/').map(part => encodeURIComponent(part)).join('/');
    result += `${indent}📄 [${node.name}](${repoUrl}/blob/${branch}/${encodedPath})\n`;
  }
  
  return result;
}

function getFullPath(node) {
  let path = [];
  let current = node;
  
  // Traverse up the tree to build the full path
  while (current && current.name !== 'root') {
    path.unshift(current.name);
    current = current.parent;
  }
  
  return path.join('/');
}