// This script fixes error handling in AuthContext.tsx
const fs = require('fs');

const fixAuthContext = () => {
  const filePath = 'src/context/AuthContext.tsx';
  
  console.log(`Fixing error handling in ${filePath}`);
  
  // Read the file
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Fix 1: 'err' is of type 'unknown' in login
  content = content.replace(
    /setError\(err\.message \|\| 'An error occurred during login'\);/g, 
    "setError(err instanceof Error ? err.message : 'An error occurred during login');"
  );
  
  // Fix 2: 'err' is of type 'unknown' in registration
  content = content.replace(
    /setError\(err\.message \|\| 'An error occurred during registration'\);/g, 
    "setError(err instanceof Error ? err.message : 'An error occurred during registration');"
  );
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Fixed error handling in ${filePath}`);
};

fixAuthContext();