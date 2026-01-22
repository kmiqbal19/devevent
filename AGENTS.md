# AGENTS.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview
Startup Explore is a Next.js 16 application for discovering developer events (hackathons, meetups, conferences). The project uses:
- **Next.js 16.1.4** with App Router (React 19)
- **TypeScript** with strict mode enabled
- **Tailwind CSS v4** for styling
- **PostHog** for analytics
- **MongoDB** via Mongoose for data persistence
- **OGL** for WebGL-based visual effects

## Development Commands

### Running the Development Server
```bash
npm run dev
```
Runs Next.js in Turbo mode on http://localhost:3000

### Building for Production
```bash
npm run build
```

### Starting Production Server
```bash
npm start
```

### Linting
```bash
npm run lint
```
Uses ESLint with Next.js config. Configuration is in `eslint.config.mjs`.

## Code Architecture

### Directory Structure
- **`/app`** - Next.js App Router pages and layouts
  - `layout.tsx` - Root layout with font configuration (Schibsted Grotesk, Martian Mono), PostHog provider, Navbar, and LightRays background
  - `page.tsx` - Home page displaying featured events
  - `providers.tsx` - Client-side PostHog initialization
  - `globals.css` - Global styles and Tailwind configuration

- **`/components`** - React components
  - `LightRays.tsx` - WebGL-based animated light rays background using OGL library
  - `EventCard.tsx` - Event display card component
  - `Navbar.tsx` - Navigation header
  - `ExploreBtn.tsx` - Call-to-action button

- **`/lib`** - Utilities and constants
  - `constants.ts` - Type definitions (`EventType`) and mock event data
  - `utils.ts` - Utility functions (likely includes `cn` helper for class merging)

- **`/public`** - Static assets (images, icons)

### Key Configuration Files
- **`tsconfig.json`** - Path alias `@/*` maps to project root for imports
- **`components.json`** - shadcn/ui configuration using "new-york" style with Lucide icons
- **`next.config.ts`** - Currently minimal Next.js configuration
- **`.env.local`** - Contains PostHog keys and MongoDB connection string (DO NOT commit)

### Technology-Specific Notes

#### PostHog Analytics
PostHog is initialized client-side in `app/providers.tsx` using environment variables:
- `NEXT_PUBLIC_POSTHOG_KEY`
- `NEXT_PUBLIC_POSTHOG_HOST`

The PostHogProvider wraps the entire application in `layout.tsx`.

#### MongoDB/Mongoose
Mongoose is installed but not yet integrated into the codebase. When implementing database features:
- Connection string is in `MONGODB_URI` environment variable
- Create database connection utility in `/lib` directory
- Use Next.js API routes in `/app/api` for database operations

#### Styling Approach
- Uses Tailwind CSS v4 with custom configuration
- Custom fonts loaded via `next/font/google`
- CSS variables for theming (configured via `components.json`)
- `cn()` utility from `lib/utils.ts` for conditional class merging

#### Custom Visual Effects
The `LightRays` component is a complex WebGL implementation using OGL (Open Graphics Library wrapper). It features:
- Customizable ray origin, color, speed, and spread
- Mouse tracking and interaction
- Performance optimizations (intersection observer, reduced DPR)
- Multiple configuration props for visual effects

When modifying `LightRays.tsx`, be aware of WebGL context management and cleanup to prevent memory leaks.

## Import Path Conventions
Always use the `@/` alias for imports:
```typescript
import EventCard from "@/components/EventCard"
import { events } from "@/lib/constants"
```

## Component Patterns
- Server Components by default (no `"use client"` directive)
- Client Components explicitly marked with `"use client"` (e.g., `providers.tsx`, `LightRays.tsx`)
- TypeScript interfaces defined inline or imported from `lib/constants.ts`

## Environment Variables
Required environment variables (stored in `.env.local`):
- `NEXT_PUBLIC_POSTHOG_KEY` - PostHog project API key
- `NEXT_PUBLIC_POSTHOG_HOST` - PostHog API host URL
- `MONGODB_URI` - MongoDB connection string

When adding new environment variables for client-side use, prefix with `NEXT_PUBLIC_`.

## Current Git Branch
The current branch is `implement-posthog`, suggesting recent PostHog integration work.
