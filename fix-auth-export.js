// This script adds an export for the JwtPayload interface
const fs = require('fs');
const path = require('path');

const fixAuthExport = () => {
  const filePath = 'src/lib/auth.ts';
  
  console.log(`Adding JwtPayload export in ${filePath}`);
  
  // Read the file
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Check if JwtPayload is already exported
  if (content.includes('export interface JwtPayload')) {
    console.log('JwtPayload is already exported, no change needed');
    return;
  }
  
  // Replace the interface declaration to export it
  const oldInterface = 'interface JwtPayload {';
  const newInterface = 'export interface JwtPayload {';
  
  if (content.includes(oldInterface)) {
    content = content.replace(oldInterface, newInterface);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Added export to JwtPayload interface in ${filePath}`);
  } else {
    console.log(`Could not find the interface in ${filePath}`);
  }
};

fixAuthExport();