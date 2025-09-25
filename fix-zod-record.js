// This script fixes Zod validation issues in API routes
const fs = require('fs');

const fixZodRecord = () => {
  const filePath = 'src/app/api/products/[id]/route.ts';
  
  console.log(`Fixing Zod record issue in ${filePath}`);
  
  // Read the file
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace the problematic record validation
  const oldLine = `  specifications: z.record(z.string()).optional(),`;
  const newLine = `  specifications: z.record(z.string(), z.string()).optional(),`;
  
  if (content.includes(oldLine)) {
    content = content.replace(oldLine, newLine);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed Zod record issue in ${filePath}`);
  } else {
    console.log(`Could not find the specified line in ${filePath}`);
  }
};

fixZodRecord();