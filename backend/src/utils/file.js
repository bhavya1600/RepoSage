import { writeFile } from 'fs/promises';

export async function saveToFile(filename, analysis) {
  // Create base GitHub URL for the repository
  const repoUrl = `https://github.com/${analysis.repository.owner.login}/${analysis.repository.name}`;
  const branch = analysis.repository.default_branch;

  // Updated: Remove leading "root/" from file paths before encoding.
  const createGitHubLink = (filePath) => {
    const cleanPath = filePath.replace(/^root\/?/, '');
    const encodedPath = cleanPath.split('/').map(part => encodeURIComponent(part)).join('/');
    return `${repoUrl}/blob/${branch}/${encodedPath}`;
  };

  // Save the main markdown analysis with clean, human-readable format
  const mdContent = 
`# 🔍 Repository Insights

## 📃 Project Details 
- **Name:** ${analysis.repository.name}
- **Description:** ${analysis.repository.description}
- **Primary Language:** ${analysis.repository.language}

## 🤓 Project Understanding 
<details>
  <summary><strong>Peek Under the Hood 👀</strong></summary>

  ${analysis.projectUnderstanding}

</details>

## 🌲 Project Structure 
<details>
  <summary><strong>File Tree</strong></summary>

  ${formatFileTree(analysis.fileTree, '', repoUrl, branch)}

</details>

## 📞 Call Hierarchy 
<details>
  <summary><strong>Detailed Function Call Hierarchy</strong></summary>

  ${analysis.callHierarchy}

</details>

## 📈 File Analyses  
${analysis.fileAnalysis.map(file => `
<details>
  <summary><strong>File: <a href="${createGitHubLink(file.path)}">${file.path}</a></strong></summary>

  ${file.analysis}

  ---
</details>
`).join('')}

## ✒️ Project Summary 
${analysis.summary}`;

  // Ensure we're saving to the /tmp directory
  const tmpFilename = `/tmp/${filename.split('/').pop()}`;
  await writeFile(tmpFilename, mdContent, 'utf8');

  // Save the JSON metadata separately
  const jsonFilename = tmpFilename.replace('.md', '.json');
  const jsonContent = {
    repository: {
      name: analysis.repository.name,
      description: analysis.repository.description,
      language: analysis.repository.language
    },
    projectUnderstanding: analysis.projectUnderstanding,
    fileTree: analysis.fileTree,
    fileMetadata: analysis.fileMetadata,
    callHierarchy: analysis.callHierarchy,
    fileAnalysis: analysis.fileAnalysis.map(file => ({
      path: file.path,
      analysis: file.analysis
    })),
    summary: analysis.summary
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