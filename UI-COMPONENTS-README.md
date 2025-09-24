# UI Components Installation

To use the UI components in the ShopMeco application, you need to install some dependencies.

## Required packages

The following packages are required for the UI components:

1. `@radix-ui/react-label` - For the Label component
2. `@radix-ui/react-dialog` - For the Dialog component
3. `@radix-ui/react-select` - For the Select component
4. `class-variance-authority` - For styling variants

## Installation

You can install these packages by running:

```bash
# Using npm
npm install @radix-ui/react-label @radix-ui/react-dialog @radix-ui/react-select class-variance-authority

# Using yarn
yarn add @radix-ui/react-label @radix-ui/react-dialog @radix-ui/react-select class-variance-authority
```

Alternatively, you can use the `install-ui-components.bat` script provided in the root directory of the project.

## Usage

The UI components are set up in the `src/components/ui` directory:

- `label.tsx` - The Label component
- `dialog.tsx` - The Dialog component for modals
- `select.tsx` - The Select component for dropdowns

Import them in your components as needed:

```tsx
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
```
