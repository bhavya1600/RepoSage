import { writeFile } from 'fs/promises';

export async function saveToFile(filename, analysis) {
  // Create base GitHub URL for the repository
  const repoUrl = `https://github.com/${analysis.repository.owner.login}/${analysis.repository.name}`;
  const branch = analysis.repository.default_branch;

  // Updated: Remove leading "root/" from file paths before encoding.
  const createGitHubLink = (filePath) => {
    const cleanPath = filePath.replace(/^root\/?/, '');
    const encodedPath = cleanPath.split('/').map(part => encodeURIComponent(part)).join('/');
    return `[${cleanPath}](${repoUrl}/blob/${branch}/${encodedPath})`;
  };

  // Save the main markdown analysis with clean, human-readable format
  const mdContent = `# Repository Analysis Results

## Repository Information
Name: ${analysis.repository.name}
Description: ${analysis.repository.description}
Primary Language: ${analysis.repository.language}

## Project Understanding
${analysis.projectUnderstanding}

## Project Structure
${formatFileTree(analysis.fileTree, '', repoUrl, branch)}

## Call Hierarchy
${analysis.callHierarchy}

## File Analyses
${analysis.fileAnalysis.map(file => `
### File: ${createGitHubLink(file.path)}
${file.analysis}`).join('\n---')}

## Final Summary
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

function formatFileTree(node, indent, repoUrl, branch, parentPath = '') {
  let result = '';
  // If this is the top-level "root", use an empty path; otherwise, accumulate normally.
  const currentPath =
    parentPath === '' && node.name === 'root'
      ? ''
      : parentPath
      ? `${parentPath}/${node.name}`
      : node.name;
  
  if (node.type === 'directory') {
    if (node.name !== 'root') {
      result += `${indent}📁 ${node.name}/\n`;
    }
    
    const childIndent = node.name === 'root' ? indent : indent + '&nbsp;&nbsp;&nbsp;&nbsp;';
    for (const child of Object.values(node.children)) {
      result += formatFileTree(child, childIndent, repoUrl, branch, currentPath);
    }
  } else {
    // Use node.path if available; otherwise use the accumulated currentPath
    let fullPath = node.path || currentPath;
    fullPath = fullPath.replace(/^root\/?/, '');
    const encodedPath = fullPath
      .split('/')
      .map(part => encodeURIComponent(part))
      .join('/');
    result += `${indent}📄 [${node.name}](${repoUrl}/blob/${branch}/${encodedPath})\n`;
  }
  
  return result;
}

function getFullPath(node) {
  // Use the full path if available
  if (node.path) return node.path;
  
  // Fallback: reconstruct the path using parent references
  let path = [];
  let current = node;
  while (current && current.name !== 'root') {
    path.unshift(current.name);
    current = current.parent;
  }
  // Updated: Remove leading "root/" if present.
  return path.join('/').replace(/^root\/?/, '');
}