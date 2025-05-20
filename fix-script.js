// This is a Node.js script to fix line endings
const fs = require('fs');
const path = require('path');

// Files to fix
const filesToFix = [
  'backend/src/auth/guards/jwt-auth.guard.ts',
  'backend/src/auth/guards/local-auth.guard.ts',
  'backend/src/auth/interfaces/jwt-payload.interface.ts',
  'backend/src/auth/strategies/local.strategy.ts', 
  'backend/src/auth/auth.controller.ts',
  'backend/src/posts/posts.controller.ts'
];

filesToFix.forEach(filePath => {
  try {
    // Read the file content
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Replace CRLF with LF
    let fixedContent = content.replace(/\r\n/g, '\n');
    
    // Ensure the file ends with exactly one newline
    if (!fixedContent.endsWith('\n')) {
      fixedContent += '\n';
    } else if (fixedContent.endsWith(' \n')) {
      // Replace trailing space + newline with just newline
      fixedContent = fixedContent.replace(/ \n$/, '\n');
    } else if (fixedContent.endsWith('\n\n')) {
      // Remove extra newline at the end
      fixedContent = fixedContent.slice(0, -1);
    }
    
    // Write the fixed content back to the file
    fs.writeFileSync(filePath, fixedContent, 'utf8');
    console.log(`Fixed: ${filePath}`);
  } catch (error) {
    console.error(`Error fixing ${filePath}:`, error.message);
  }
});

console.log('Done fixing files!'); 
