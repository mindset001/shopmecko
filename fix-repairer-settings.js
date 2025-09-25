// This script fixes the type issues in repairer-settings.tsx
// Run this script using Node.js: node fix-repairer-settings.js

const fs = require('fs');
const path = require('path');

// Path to the file
const filePath = path.join(__dirname, 'src', 'components', 'settings', 'repairer-settings.tsx');

// Read the file
let content = fs.readFileSync(filePath, 'utf8');

// First, let's ensure we're using the imported FormDataType
if (content.includes("// Define FormData type based on the state structure")) {
  // Find the end of the type definition
  const startMarker = "'use client';";
  const endMarker = "repairerSettings?: {";
  
  // Find the position of the end marker
  const startPos = content.indexOf(startMarker);
  const typeDefStart = content.indexOf("// Define FormData type");
  const endTypeDefPos = content.indexOf(endMarker);
  
  // Extract everything after the type definition
  const importStatement = "'use client';\n\nimport { FormDataType } from '@/types/settings';";
  
  // Find the first import statement after the type definition
  const firstImportPos = content.indexOf("import ", endTypeDefPos);
  let restOfFile = "";
  
  if (firstImportPos !== -1) {
    restOfFile = content.substring(firstImportPos);
  } else {
    // If no import found, find the next section
    const nextSectionPos = content.indexOf("interface", endTypeDefPos);
    if (nextSectionPos !== -1) {
      restOfFile = content.substring(nextSectionPos);
    }
  }
  
  // Rebuild the content
  content = importStatement + "\n\n" + restOfFile;
}

// Write the file back
fs.writeFileSync(filePath, content, 'utf8');

console.log('Fixed repairer-settings.tsx type issues');