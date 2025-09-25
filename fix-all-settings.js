// This script fixes type issues in all settings components
// Run this script using Node.js: node fix-all-settings.js

const fs = require('fs');
const path = require('path');

// List of settings component files
const settingsFiles = [
  'src/components/settings/general-settings.tsx',
  'src/components/settings/security-settings.tsx',
  'src/components/settings/notification-settings.tsx',
  'src/components/settings/appearance-settings.tsx',
  'src/components/settings/vehicle-owner-settings.tsx',
  'src/components/settings/repairer-settings.tsx',
  'src/components/settings/seller-settings.tsx',
  'src/components/settings/admin-settings.tsx'
];

// Function to fix each file
function fixSettingsFile(filePath) {
  const fullPath = path.join(process.cwd(), filePath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`File not found: ${fullPath}`);
    return;
  }
  
  // Read the file
  let content = fs.readFileSync(fullPath, 'utf8');
  
  // Fix if there's an inline type definition
  if (content.includes("// Define FormData type") || 
      content.includes("type FormDataType =")) {
      
    // Make sure we have the right import for FormDataType
    if (!content.includes("import { FormDataType } from '@/types/settings'")) {
      // Replace the type definition with the import
      content = content.replace(
        /'use client';\s*(?:\/\/ Define FormData type.*?\};|\s*type FormDataType =.*?\};)/s,
        "'use client';\n\nimport { FormDataType } from '@/types/settings';"
      );
      
      // Clean up any duplicate imports that may exist later in the file
      content = content.replace(
        /import \{ FormDataType \} from '@\/types\/settings';.*?import \{ FormDataType \} from '@\/types\/settings';/s,
        "import { FormDataType } from '@/types/settings';"
      );
    }
  }
  
  // Write the file back
  fs.writeFileSync(fullPath, content, 'utf8');
  console.log(`Fixed type issues in: ${filePath}`);
}

// Process all files
settingsFiles.forEach(fixSettingsFile);

console.log('\nAll settings files have been fixed.');