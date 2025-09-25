// This script updates package.json to add a 'fix' command
// Run this script using Node.js: node add-fix-command.js

const fs = require('fs');
const path = require('path');

// Path to the file
const filePath = path.join(__dirname, 'package.json');

// Read the file
let content = fs.readFileSync(filePath, 'utf8');

// Parse the JSON
const packageJson = JSON.parse(content);

// Add the fix command if it doesn't exist
if (!packageJson.scripts.fix) {
  packageJson.scripts.fix = "node fix-all-settings.js && node fix-eslint.js && node fix-vehicle-owner-settings.js";
  
  // Format the package.json and write it back
  fs.writeFileSync(filePath, JSON.stringify(packageJson, null, 2), 'utf8');
  
  console.log('Added fix command to package.json');
} else {
  console.log('Fix command already exists in package.json');
}