export function buildFileTree(files) {
  const tree = {
    name: 'root',
    type: 'directory',
    children: {}
  };

  for (const file of files) {
    const parts = file.path.split('/');
    let current = tree;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const isLast = i === parts.length - 1;
      const type = isLast ? file.type : 'directory';

      if (!current.children[part]) {
        current.children[part] = {
          name: part,
          type: type,
          children: {}
        };
      } else if (current.children[part].type !== type) {
        // Handle case where we previously created this as a file but it's actually a directory
        current.children[part].type = type;
        if (!current.children[part].children) {
          current.children[part].children = {};
        }
      }

      current = current.children[part];
    }
  }

  return sortFileTree(tree);
}

function sortFileTree(node) {
  // Sort children by type (directories first) and then alphabetically
  const sortedChildren = {};
  
  // Get all children entries and sort them
  const entries = Object.entries(node.children).sort((a, b) => {
    // Sort directories before files
    if (a[1].type !== b[1].type) {
      return a[1].type === 'directory' ? -1 : 1;
    }
    // Then sort alphabetically
    return a[0].localeCompare(b[0]);
  });

  // Recursively sort children
  for (const [name, child] of entries) {
    if (child.type === 'directory') {
      sortedChildren[name] = sortFileTree(child);
    } else {
      sortedChildren[name] = child;
    }
  }

  return {
    ...node,
    children: sortedChildren
  };
}