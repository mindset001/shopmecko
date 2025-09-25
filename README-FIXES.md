# ShopMeco Vehicle Service Marketplace

ShopMeco is a platform that connects vehicle owners with repairers and spare parts sellers.

## Project Setup

Follow these steps to set up the project:

1. **Install dependencies**
   ```
   npm install
   ```

2. **Run the development server**
   ```
   npm run dev
   ```

3. **Build for production**
   ```
   npm run build
   ```

4. **Start the production server**
   ```
   npm start
   ```

## Fix Scripts

This project includes several scripts to fix common issues:

### Fix All Issues

To fix all known issues in the project, run:
```
npm run fix
```

This will execute all the fix scripts in sequence:

- `fix-all-settings.js`: Fixes type issues in all settings components
- `fix-eslint.js`: Fixes common ESLint issues throughout the project
- `fix-vehicle-owner-settings.js`: Fixes specific issues in the vehicle owner settings
- `fix-auth-export.js`: Exports JwtPayload interface from auth.ts
- `fix-api-routes.js`: Fixes API route handlers to work with withAuth middleware
- `fix-zod-record.js`: Fixes Zod record validation in product API
- `fix-reviews-api.js`: Fixes type issues in the reviews API
- `fix-auth-context.js`: Fixes error handling in AuthContext for unknown error types

### Individual Fix Scripts

You can also run these scripts individually:

```
node fix-all-settings.js
node fix-eslint.js
node fix-vehicle-owner-settings.js
node fix-repairer-settings.js
node fix-auth-export.js
node fix-api-routes.js
node fix-zod-record.js
node fix-reviews-api.js
node fix-auth-context.js
```

## Project Structure

- `src/app`: Next.js app router pages
- `src/components`: React components
  - `src/components/settings`: Settings components for different user roles
  - `src/components/ui`: UI components
- `src/context`: React context providers
- `src/lib`: Utility functions and libraries
- `src/models`: Data models
- `src/types`: TypeScript type definitions

## TypeScript Type System

The project uses TypeScript for type safety. Key type definitions:

- `FormDataType` in `src/types/settings.ts`: Defines the structure for all settings forms
- Role-specific settings:
  - `vehicleOwnerSettings`
  - `repairerSettings`
  - `sellerSettings`
  - `adminSettings`

### Model System

The database models are defined in the `src/models` directory. The project uses:

- Mongoose for MongoDB object modeling
- TypeScript interfaces to ensure type safety
- Barrel exports pattern in `src/models/index.ts`

### API Routes

The API routes use:

- Next.js App Router for API endpoints
- Zod for request validation
- withAuth middleware for authentication and authorization
- Proper type definitions for request handlers

### Common Fixes

Several common fixes have been implemented:

1. **Exported Types in Models**: Fixed type re-exports in `models/index.ts` to work with TypeScript's isolatedModules
2. **Auth Middleware Compatibility**: Updated API route handlers to work with the withAuth middleware
3. **Zod Validation**: Fixed Zod record validation in product API routes
4. **Review API Types**: Added proper type assertions in the reviews API for safety