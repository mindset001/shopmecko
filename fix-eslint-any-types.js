// This script helps fix common ESLint issues in the project
const fs = require('fs');
const path = require('path');

// Function to replace 'any' types with proper types
function fixAnyTypes(filePath, properType = 'unknown') {
  const fullPath = path.join(process.cwd(), filePath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`File not found: ${fullPath}`);
    return;
  }
  
  let content = fs.readFileSync(fullPath, 'utf8');
  
  // Replace simple cases of any with the proper type
  // This is a simplified approach and might need manual review
  content = content.replace(/: any(?!\w)/g, `: ${properType}`);
  
  fs.writeFileSync(fullPath, content);
  console.log(`Fixed 'any' type issues in: ${filePath}`);
}

// Remove unused imports
function removeUnusedImports(filePath) {
  const fullPath = path.join(process.cwd(), filePath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`File not found: ${fullPath}`);
    return;
  }
  
  let content = fs.readFileSync(fullPath, 'utf8');
  const lines = content.split('\n');
  
  // Simple pattern matching for unused imports
  // This is very basic and would need improvements for a real solution
  const unused = [];
  const importRegex = /import\s+{([^}]+)}\s+from/g;
  let match;
  
  while ((match = importRegex.exec(content)) !== null) {
    const imports = match[1].split(',').map(item => item.trim());
    
    for (const imp of imports) {
      // Very naive check - this would need to be much more sophisticated in reality
      const cleanImp = imp.split(' as ')[0].trim();
      if (content.split(cleanImp).length <= 2) {
        unused.push(cleanImp);
      }
    }
  }
  
  // Warning: This is a very naive approach and could break code
  for (const unusedImport of unused) {
    content = content.replace(new RegExp(`\\b${unusedImport}\\b,?\\s*`, 'g'), '');
    content = content.replace(/import\s*{\s*}\s*from\s*['"][^'"]+['"]/g, '');
  }
  
  fs.writeFileSync(fullPath, content);
  console.log(`Attempted to fix unused imports in: ${filePath}`);
}

// List of files with 'any' type issues
const anyTypeFiles = [
  'src/app/seller/settings/page.tsx',
  'src/app/vehicle-owner/settings/page.tsx',
  'src/app/users/page.tsx',
  'src/components/admin/system-settings.tsx',
  'src/components/repairer/appointment-scheduler.tsx',
  'src/components/repairer/service-management.tsx',
  'src/components/repairer/service-quotes.tsx',
  'src/components/repairer/workshop-profile.tsx',
  'src/components/seller/inventory-management.tsx',
  'src/components/seller/order-management.tsx',
  'src/components/seller/product-catalog.tsx',
  'src/components/seller/store-profile.tsx',
  'src/components/settings/admin-settings.tsx',
  'src/components/settings/appearance-settings.tsx',
  'src/components/settings/general-settings.tsx',
  'src/components/settings/notification-settings.tsx',
  'src/components/settings/repairer-settings.tsx',
  'src/components/settings/security-settings.tsx',
  'src/components/settings/seller-settings.tsx',
  'src/components/settings/vehicle-owner-settings.tsx',
  'src/components/ui/profile-layout.tsx',
  'src/components/ui/settings-layout.tsx',
  'src/components/vehicle-owner/find-mechanics.tsx',
  'src/components/vehicle-owner/maintenance-history.tsx',
  'src/components/vehicle-owner/service-request-form.tsx',
  'src/components/vehicle-owner/service-requests.tsx',
  'src/components/vehicle-owner/vehicles-list.tsx',
  'src/context/AuthContext.tsx'
];

// Process files with any type issues
anyTypeFiles.forEach(filePath => {
  // For settings components, use a FormData type
  if (filePath.includes('settings') && !filePath.includes('layout')) {
    fixAnyTypes(filePath, 'FormDataType');
  } else {
    fixAnyTypes(filePath);
  }
});

console.log('\nScript execution complete. Please review changes before committing.');
console.log('Note: This is a basic script that may not fix all issues. Manual review is necessary.');