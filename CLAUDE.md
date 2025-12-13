# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` - Start development server (http://localhost:3000)
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run Biome linter
- `npm run format` - Format code with Biome

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **React**: 19.2 with React Compiler enabled
- **Styling**: Tailwind CSS 4 via PostCSS
- **Linting/Formatting**: Biome (replaces ESLint/Prettier)

## Architecture

This is a Next.js App Router project using the `app/` directory structure:
- `app/layout.js` - Root layout with Geist font configuration
- `app/page.js` - Home page component
- `app/globals.css` - Global styles with Tailwind and CSS custom properties

## Biome Configuration

Biome is configured with:
- 2-space indentation
- React and Next.js recommended rules
- Auto-organize imports enabled
- `noUnknownAtRules` disabled (for Tailwind's `@theme` directive)
