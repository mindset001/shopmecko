// This script helps fix common ESLint issues in the project
const fs = require('fs');
const path = require('path');

// List of files with "let to const" issues
const letToConstFiles = [
  'src/app/repairer/dashboard/page.tsx',
  // Add other files here as needed
];

// Function to replace let with const where variables aren't reassigned
function fixLetToConst(filePath) {
  const fullPath = path.join(process.cwd(), filePath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`File not found: ${fullPath}`);
    return;
  }
  
  let content = fs.readFileSync(fullPath, 'utf8');
  
  // Replace let with const for variables that are never reassigned
  // This is a simple replacement and might need manual review
  content = content.replace(/let\s+([a-zA-Z0-9_]+)\s+=\s+([^;]+);(?!\s*\1\s*=)/g, 'const $1 = $2;');
  
  fs.writeFileSync(fullPath, content);
  console.log(`Fixed let to const issues in: ${filePath}`);
}

// Fix unescaped entities in JSX
function fixUnescapedEntities(filePath) {
  const fullPath = path.join(process.cwd(), filePath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`File not found: ${fullPath}`);
    return;
  }
  
  let content = fs.readFileSync(fullPath, 'utf8');
  
  // Replace single quotes with &apos;
  content = content.replace(/(\w)'(\w)/g, '$1&apos;$2');
  
  // Replace double quotes with &quot;
  content = content.replace(/(\w)"(\w)/g, '$1&quot;$2');
  
  fs.writeFileSync(fullPath, content);
  console.log(`Fixed unescaped entities in: ${filePath}`);
}

// Process files
letToConstFiles.forEach(fixLetToConst);

// List of files with unescaped entities
const unescapedEntitiesFiles = [
  'src/app/contact/page.tsx',
  'src/app/page.tsx',
  'src/app/services/page.tsx',
  'src/components/settings/repairer-settings.tsx',
  'src/components/settings/security-settings.tsx',
  'src/components/settings/seller-settings.tsx',
  'src/components/ui/cta-section.tsx',
  'src/components/ui/how-it-works-section.tsx',
  'src/components/ui/testimonial-card.tsx',
  'src/components/vehicle-owner/maintenance-history.tsx',
  'temp/page.tsx',
  'temp/service-sections.tsx',
  'temp/services-page-fixed.tsx',
  'temp/testimonials.tsx',
];

unescapedEntitiesFiles.forEach(fixUnescapedEntities);

console.log('\nScript execution complete. Please review changes before committing.');