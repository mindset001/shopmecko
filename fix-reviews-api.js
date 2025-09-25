// This script fixes type issues in the reviews API route
const fs = require('fs');

const fixReviewsApi = () => {
  const filePath = 'src/app/api/reviews/route.ts';
  
  console.log(`Fixing type issues in ${filePath}`);
  
  // Read the file
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Fix 1: Property 'rating' does not exist error
  const queryRatingLine = /query\.rating = parseInt\(rating, 10\);/;
  if (queryRatingLine.test(content)) {
    content = content.replace(
      queryRatingLine, 
      '(query as any).rating = parseInt(rating, 10);'
    );
  }
  
  // Fix 2: Distribution indexing error
  content = content.replace(
    /const distribution = {};/,
    'const distribution: Record<number | string, number> = {};'
  );
  
  // Fix 3: Role comparison error
  content = content.replace(
    /validatedData\.targetType === 'repairer' && target\.role !== 'repairer'/g,
    "validatedData.targetType === 'repairer' && target.role !== 'REPAIRER'"
  );
  
  content = content.replace(
    /validatedData\.targetType === 'seller' && target\.role !== 'seller'/g,
    "validatedData.targetType === 'seller' && target.role !== 'SELLER'"
  );
  
  // Fix 4: Optional chaining for repairerId
  content = content.replace(
    /serviceRequest\.repairerId\.toString\(\) === validatedData\.targetId;/,
    'serviceRequest?.repairerId?.toString() === validatedData.targetId;'
  );
  
  // Fix 5: Target.ratings property
  const ratingsLinePattern = /currentRatings = target\.ratings \|\| \{ average: 0, count: 0 \};/g;
  content = content.replace(
    ratingsLinePattern,
    'currentRatings = (target as any).ratings || { average: 0, count: 0 };'
  );
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Fixed type issues in ${filePath}`);
};

fixReviewsApi();