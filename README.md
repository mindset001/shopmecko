# Full-Stack Next.js Application

A complete full-stack application built with Next.js, Node.js, Tailwind CSS, and shadcn/ui. This project demonstrates how to create a modern, responsive web application with server-side rendering and API routes.

## Features

- **Modern React Development** with Next.js App Router
- **Type Safety** with TypeScript
- **Beautiful UI** with Tailwind CSS and shadcn/ui components
- **Backend API Routes** with Next.js API handlers
- **Server and Client Components** using the latest React features
- **Responsive Design** for all device sizes

## Project Structure

```
├── public/              # Static files
├── src/
│   ├── app/             # Next.js App Router pages
│   │   ├── api/         # API routes
│   │   ├── users/       # Users page
│   │   ├── globals.css  # Global styles
│   │   ├── layout.tsx   # Root layout
│   │   └── page.tsx     # Home page
│   ├── components/      # React components
│   │   └── ui/          # shadcn/ui components
│   └── lib/             # Utility functions
├── components.json      # shadcn/ui configuration
├── next.config.ts       # Next.js configuration
├── package.json         # Project dependencies
├── postcss.config.mjs   # PostCSS configuration
├── tailwind.config.ts   # Tailwind CSS configuration
└── tsconfig.json        # TypeScript configuration
```

## Getting Started

### Prerequisites

- Node.js (v18 or newer)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a custom font.

## API Routes

This project includes several RESTful API endpoints:

- `GET /api/users` - Get all users
- `POST /api/users` - Create a new user
- `GET /api/users/[id]` - Get user by ID
- `PUT /api/users/[id]` - Update user by ID
- `DELETE /api/users/[id]` - Delete user by ID
- `GET /api/health` - Health check endpoint

## Components

The project uses [shadcn/ui](https://ui.shadcn.com/) for beautiful, accessible components:

- Button - For actions and links
- Card - For displaying content in a structured way
- Input - For form fields

## Customization

### Adding New Components

To add more shadcn/ui components:

```bash
npx shadcn-ui@latest add [component-name]
```

### Modifying Styles

You can customize the look and feel by modifying:

- `src/app/globals.css` - Global CSS
- `tailwind.config.ts` - Tailwind configuration

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - learn about Tailwind CSS
- [shadcn/ui Documentation](https://ui.shadcn.com/) - learn about shadcn/ui components

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
