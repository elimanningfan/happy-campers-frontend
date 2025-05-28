# Happy Campers RV Rental Platform - Frontend Prototype

A modern, responsive frontend prototype for Happy Campers RV Rental Platform built with Next.js 14, TypeScript, and Tailwind CSS.

## Features Implemented

### Core Components
- **Reusable UI Components**: Button, Card components using shadcn/ui
- **Header Component**: Responsive navigation with mobile menu support
- **Footer Component**: Company info, quick links, and contact details

### Pages
- **Homepage**: 
  - Hero section with call-to-action
  - Featured RVs showcase
  - Company statistics
  - Why Choose Us section
  
- **RV Browse Page** (`/rvs`):
  - Grid layout with RV cards
  - Filtering by RV type, sleeping capacity, and price range
  - Mobile-responsive filter sidebar
  - Real-time filter updates
  
- **RV Detail Pages** (`/rvs/[slug]`):
  - Image gallery with navigation
  - Detailed specifications
  - Features categorized by type
  - Highlights and ideal usage scenarios
  - Call-to-action buttons for inquiries

### Data Integration
- **Real RV Data**: 10 RVs from happycampersrvrentals.com with accurate details
- **TypeScript Support**: Fully typed interfaces for RV data
- **Helper Functions**: Filtering, searching, and data retrieval utilities

## Tech Stack

- **Framework**: [Next.js 14+](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
happy-campers-frontend/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Homepage
│   ├── layout.tsx         # Root layout
│   ├── globals.css        # Global styles
│   └── rvs/               # RV-related pages
│       ├── page.tsx       # RV browse page
│       └── [slug]/        # Dynamic RV detail pages
│           └── page.tsx
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── header.tsx        # Site header
│   └── footer.tsx        # Site footer
├── lib/                  # Utilities and data
│   ├── rv-data.ts       # RV data and helper functions
│   └── utils.ts         # Utility functions
└── public/              # Static assets
    └── images/          # Image files
```

## Next Steps

1. **Multi-step Inquiry Form**: Implement the rental inquiry process
2. **Admin Dashboard**: Create mockup for RV and inquiry management
3. **Contact Page**: Add contact information and form
4. **Search Functionality**: Implement RV search feature
5. **Booking Calendar**: Add availability checking
6. **Deployment**: Configure for Netlify/Vercel deployment

## Deployment

This project is ready to be deployed to Netlify or Vercel. Simply connect your GitHub repository to either platform and it will automatically build and deploy.

### Environment Variables

No environment variables are required for the current prototype.

## Version History

- **v0.1.0** - Initial prototype with homepage, RV browsing, and detail pages
