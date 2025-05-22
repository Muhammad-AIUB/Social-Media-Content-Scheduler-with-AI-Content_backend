// Script to fix whitespace issues
const fs = require('fs');
const path = require('path');

// Files to fix
const filesToFix = [
  'backend/src/main.ts',
  'backend/src/users/users.controller.ts'
];

filesToFix.forEach(filePath => {
  try {
    // Read the file content
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Remove trailing spaces from each line
    content = content.replace(/[ \t]+$/gm, '');
    
    // Remove spaces in empty lines
    content = content.replace(/^\s+$/gm, '');
    
    // Ensure exactly one newline at the end of file
    content = content.replace(/\s*$/, '\n');
    
    // Format imports for controller files
    if (filePath.includes('controller.ts') && content.includes('import {')) {
      content = content.replace(
        /import\s*{\s*([^}]+)}\s*from\s*['"]([^'"]+)['"]/g, 
        (match, imports, from) => {
          const importItems = imports
            .split(',')
            .map(item => item.trim())
            .filter(item => item)
            .map(item => `  ${item},`)
            .join('\n');
          
          return `import {\n${importItems}\n} from '${from}'`;
        }
      );
    }
    
    // Write the fixed content back to the file
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed: ${filePath}`);
  } catch (error) {
    console.error(`Error fixing ${filePath}:`, error.message);
  }
});

console.log('Done fixing whitespace issues!'); 
