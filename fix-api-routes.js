// This script fixes the API route handlers to work with the withAuth middleware
const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Find all API route files with possible issues
const apiRouteFiles = glob.sync('src/app/api/**/**/route.ts');

apiRouteFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let modified = false;

  // Check for route handlers with params parameter that don't match withAuth expected signature
  const routeHandlerWithParamsRegex = /async function (\w+)\(req: NextRequest,( user: any,)? \{ params \}: \{ params: \{ id: string; \}; \}\)/g;
  
  if (routeHandlerWithParamsRegex.test(content)) {
    // Reset regex state
    routeHandlerWithParamsRegex.lastIndex = 0;
    
    // This is a route handler with params that needs fixing
    content = content.replace(routeHandlerWithParamsRegex, (match, handlerName, userParam) => {
      console.log(`Fixing route handler ${handlerName} in ${file}`);
      
      // If it already has user param, adjust to make it compatible
      if (userParam) {
        return `async function ${handlerName}(req: NextRequest, user: JwtPayload | undefined)`;
      } else {
        // Otherwise, just add the user param
        return `async function ${handlerName}(req: NextRequest, user?: JwtPayload)`;
      }
    });
    
    // Update the handler to extract params from the request
    if (content !== fs.readFileSync(file, 'utf8')) {
      // Add JwtPayload import if not present
      if (!content.includes('JwtPayload')) {
        content = content.replace(
          'import { withAuth }',
          'import { withAuth, JwtPayload }'
        );
      }
      
      // Fix function bodies to extract params from URL
      content = content.replace(
        /const (\w+)Id = params\.id;/g, 
        'const { id } = req.nextUrl.pathname.match(/\\/([^\\/]+)$/)?.groups || {};\n    const $1Id = id;'
      );
      
      modified = true;
    }
  }

  // Fix the export statements for withAuth
  const exportWithAuthRegex = /export const (PUT|DELETE|GET|POST) = withAuth\((\w+), \{ requiresAuth: (true|false)(, allowedRoles: \[.*\])? \}\);/g;
  
  if (exportWithAuthRegex.test(content)) {
    // Reset regex state
    exportWithAuthRegex.lastIndex = 0;
    
    content = content.replace(exportWithAuthRegex, (match, method, handler, requiresAuth, rolesParam) => {
      console.log(`Fixing export for ${method} handler in ${file}`);
      
      // Create a wrapper function that adapts the params format
      const wrapperName = `${handler}Wrapper`;
      const rolesStr = rolesParam || '';
      
      // Add the wrapper function before exports
      if (!content.includes(`function ${wrapperName}`)) {
        // Find the last function in the file
        const lastFunctionPos = content.lastIndexOf('async function');
        const insertPos = content.indexOf('export', lastFunctionPos);
        
        if (insertPos !== -1) {
          const wrapperFunction = `
/**
 * Wrapper for ${handler} to make it compatible with withAuth
 */
function ${wrapperName}(req: NextRequest, user?: JwtPayload) {
  // Extract params from the URL if needed
  const params = { id: req.nextUrl.pathname.match(/\\/([^\\/]+)$/)?.groups?.[1] || req.nextUrl.pathname.split('/').pop() || '' };
  return ${handler}(req, user, { params });
}
`;
          content = content.slice(0, insertPos) + wrapperFunction + content.slice(insertPos);
        }
      }
      
      return `export const ${method} = withAuth(${wrapperName}, { requiresAuth: ${requiresAuth}${rolesParam || ''} });`;
    });
    
    modified = true;
  }

  // Save changes if needed
  if (modified) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});

console.log('API route handlers fixed successfully!');