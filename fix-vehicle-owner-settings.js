// This script fixes the type issues in vehicle-owner-settings.tsx
// Run this script using Node.js: node fix-vehicle-owner-settings.js

const fs = require('fs');
const path = require('path');

// Path to the file
const filePath = path.join(__dirname, 'src', 'components', 'settings', 'vehicle-owner-settings.tsx');

// Read the file
let content = fs.readFileSync(filePath, 'utf8');

// First, let's ensure we're using the imported FormDataType
if (content.includes("// Define FormData type based on the state structure")) {
  content = content.replace(
    /'use client';\s*\/\/ Define FormData type based on the state structure.*/s,
    "'use client';\n\nimport { FormDataType } from '@/types/settings';"
  );
}

// Write the file back
fs.writeFileSync(filePath, content, 'utf8');

console.log('Fixed vehicle-owner-settings.tsx type issues');