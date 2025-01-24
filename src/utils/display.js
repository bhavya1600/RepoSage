import chalk from 'chalk';

export function displayResults(analysis) {
  console.log(chalk.bold.blue('\n📊 Analysis Results'));
  
  console.log(chalk.bold('\n📌 Repository Information:'));
  console.log(`Name: ${analysis.repository.name}`);
  console.log(`Description: ${analysis.repository.description}`);
  console.log(`Language: ${analysis.repository.language}`);

  console.log(chalk.bold('\n🌳 Project Structure:'));
  displayFileTree(analysis.fileTree, '');

  console.log(chalk.bold('\n📝 File Analyses:'));
  for (const file of analysis.fileAnalysis) {
    console.log(chalk.bold(`\n${file.path}:`));
    console.log(file.analysis);
  }

  console.log(chalk.bold('\n🔄 Call Hierarchy:'));
  console.log(analysis.callHierarchy);

  console.log(chalk.bold('\n📋 Summary:'));
  console.log(analysis.summary);

  console.log(chalk.bold('\n💾 Output Files:'));
  console.log('- analysis_results.md (Human-readable analysis)');
  console.log('- analysis_results.json (Machine-readable metadata)');
}

function displayFileTree(node, indent) {
  if (node.type === 'directory') {
    if (node.name !== 'root') {
      console.log(`${indent}📁 ${node.name}/`);
      indent += '  ';
    }
    
    for (const [name, child] of Object.entries(node.children)) {
      displayFileTree(child, indent);
    }
  } else {
    console.log(`${indent}📄 ${node.name}`);
  }
}