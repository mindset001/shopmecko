// This script fixes TypeScript null reference errors in page.tsx
// Run this script using Node.js: node fix-page-errors.js

const fs = require('fs');
const path = require('path');

// Path to the file
const filePath = path.join(__dirname, 'src', 'app', 'page.tsx');

// Read the file
let content = fs.readFileSync(filePath, 'utf8');

// Replace all problematic querySelector expressions
content = content.replace(
  /e\.currentTarget\.querySelector\('span'\)\.style\.transform = 'scaleX\([01]\)';/g,
  (match) => {
    const scaleValue = match.includes('scaleX(1)') ? 'scaleX(1)' : 'scaleX(0)';
    return `safelySetStyle(e.currentTarget.querySelector('span'), 'transform', '${scaleValue}');`;
  }
);

content = content.replace(
  /e\.currentTarget\.querySelector\('\.feature-indicator'\)\.style\.transform = 'scaleX\([01]\)';/g,
  (match) => {
    const scaleValue = match.includes('scaleX(1)') ? 'scaleX(1)' : 'scaleX(0)';
    return `safelySetStyle(e.currentTarget.querySelector('.feature-indicator'), 'transform', '${scaleValue}');`;
  }
);

// Write the file back
fs.writeFileSync(filePath, content, 'utf8');

console.log('Fixed TypeScript null reference errors in page.tsx');
