# Happy Campers RV Rental Platform - Frontend Prototype

A modern, responsive frontend prototype for Happy Campers RV Rental Platform built with Next.js 14, TypeScript, and Tailwind CSS.

## Features Implemented

### Core Components
- **Reusable UI Components**: Button, Card, Badge, Separator components using shadcn/ui
- **Header Component**: Responsive navigation with mobile menu support (includes Blog link)
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

- **Multi-step Inquiry Form** (`/inquiry`):
  - Progress tracking
  - Rental quote form

- **Contact Page** (`/contact`):
  - Contact form
  - Business information

- **Admin Dashboard** (`/admin`):
  - Overview statistics
  - Inquiry management
  - RV fleet management
  - Settings panel
  - Admin Inquiries List (`/admin/inquiries`):
    - Table view of all rental inquiries
    - Status filtering and search functionality  
    - Quick actions menu (View, Reply, Update Status)
    - Statistics cards showing inquiry metrics
  - Admin Inquiry Detail (`/admin/inquiries/[id]`):
    - Comprehensive inquiry information display
    - Customer details and history
    - Communication timeline with email/notes
    - Status management and team assignment
    - Quick actions (Convert to Booking, Generate Quote)
    - Internal notes system

- **Page CMS** (`/admin/pages`):
  - Complete content management system for static pages
  - Page management interface with status filtering
  - Visual page builder with content blocks:
    - Hero blocks with image/video backgrounds
    - Rich text blocks with column layouts
    - RV showcase blocks (coming soon)
    - Gallery blocks (coming soon)
    - CTA blocks (coming soon)
  - Page editor with tabbed interface:
    - General settings (title, slug, template)
    - Content builder with drag-and-drop
    - SEO settings (meta tags, keywords)
  - Auto-save functionality for drafts
  - Frontend page rendering at dynamic routes
  - Version control system

- **Blog Listing Page** (`/blog`):
  - Grid layout with blog post cards
  - Search functionality
  - Category and tag filtering
  - Popular posts sidebar
  - Pagination support
  - Mobile-responsive design

- **Blog Post Pages** (`/blog/[slug]`):
  - Full article display with rich content
  - Hero image with metadata overlay
  - Author information and bio
  - Categories and tags display
  - Social sharing buttons
  - Related posts section
  - Comments section placeholder
  - Breadcrumb navigation
  - Reading time estimate

### Data Integration
- **Real RV Data**: 10 RVs from happycampersrvrentals.com with accurate details
- **Blog Mock Data**: Sample blog posts with categories, tags, and author information
- **TypeScript Support**: Fully typed interfaces for RV data and blog content
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
│   ├── rvs/               # RV-related pages
│   │   ├── page.tsx       # RV browse page
│   │   └── [slug]/        # Dynamic RV detail pages
│   │       └── page.tsx
│   ├── blog/              # Blog pages
│   │   ├── page.tsx       # Blog listing page
│   │   └── [slug]/        # Dynamic blog post pages
│   │       └── page.tsx
│   ├── inquiry/           # Multi-step inquiry form
│   │   └── page.tsx
│   ├── contact/           # Contact page
│   │   └── page.tsx
│   └── admin/             # Admin dashboard
│       ├── page.tsx      # Admin dashboard
│       ├── layout.tsx    # Admin layout with sidebar
│       └── blog/         # Blog management
│           ├── page.tsx  # Blog dashboard
│           ├── posts/    # Post management
│           │   ├── page.tsx  # Post listing
│           │   ├── new/      # Create post
│           │   └── [id]/edit/ # Edit post
│           ├── categories/   # Category management
│           │   └── page.tsx
│           └── tags/         # Tag management
│               └── page.tsx
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── header.tsx        # Site header
│   └── footer.tsx        # Site footer
├── data/                 # Mock data
│   └── blog-posts.ts     # Blog posts, authors, categories, and tags
├── types/                # TypeScript type definitions
│   └── blog.ts           # Blog-related interfaces
├── lib/                  # Utilities and data
│   ├── rv-data.ts       # RV data and helper functions
│   └── utils.ts         # Utility functions
└── public/              # Static assets
    └── images/          # Image files
```

## File Descriptions

### Blog System Files
- **`/data/blog-posts.ts`**: Contains mock blog posts, authors, categories, and tags data with helper functions
- **`/types/blog.ts`**: TypeScript interfaces for blog-related data structures
- **`/app/blog/page.tsx`**: Blog listing page with search, filtering, and pagination
- **`/app/blog/[slug]/page.tsx`**: Individual blog post page with full content display

## Next Steps

1. **Blog Admin CMS**: Implement post creation/editing interface
2. **Rich Text Editor**: Integrate Tiptap for content creation
3. **Comments System**: Add commenting functionality
4. **Search Functionality**: Enhance search with full-text capabilities
5. **Booking Calendar**: Add availability checking
6. **API Integration**: Connect to backend services
7. **Deployment**: Configure for Netlify/Vercel deployment

## Deployment

This project is ready to be deployed to Netlify or Vercel. Simply connect your GitHub repository to either platform and it will automatically build and deploy.

### Environment Variables

No environment variables are required for the current prototype.

## Scripts

### Available Scripts

- `npm run dev` - Starts the development server on port 4000
- `npm run build` - Creates a production build
- `npm start` - Runs the production build
- `npm run lint` - Runs ESLint to check code quality
- `npm run import-media` - Import media from CSV file
- `npm run download-media` - Download all media images from original URLs
- `npm run update-media-paths` - Update media library with downloaded image paths
- `npm run generate-thumbnails` - Generate thumbnails for existing images
- `npm run clean-csv` - Remove duplicate URLs from CSV file
- `npm run analyze-media` - Analyze media import data before importing

### Media Download Script

The `npm run download-media` script is used to download all media images from their original URLs. This script is useful for populating the media library with images from external sources.

## Media Library

The project includes a comprehensive media library system for managing images and media files.

**Features:**
- Grid and list view modes
- Search functionality across names, descriptions, and tags
- Category-based filtering (Brand, RVs, Lifestyle, Scenery, etc.)
- Bulk selection and management
- Drag-and-drop upload functionality
- File upload with automatic categorization
- Image metadata tracking
- Automatic thumbnail generation (300x300px)
- Media picker component for easy image selection in editors

**Scripts:**
- `npm run import-media`: Import media from CSV file
- `npm run download-media`: Download images from original URLs
- `npm run update-media-paths`: Update media library with downloaded image paths
- `npm run generate-thumbnails`: Generate thumbnails for existing images
- `npm run clean-csv`: Remove duplicate URLs from CSV file
- `npm run analyze-media`: Analyze media import data before importing

### Media Import Scripts

The project includes comprehensive scripts for importing media from CSV files:

- **`scripts/clean-csv.ts`**: Removes duplicate URLs from the CSV file while preserving the first occurrence
- **`scripts/analyze-media-import.ts`**: Analyzes the CSV file to check for duplicates and validate URLs
- **`scripts/import-media-from-csv.ts`**: Imports media items from CSV, generates metadata, and categorizes them
- **`scripts/download-media-images.ts`**: Downloads all images from their original URLs
- **`scripts/generate-thumbnails.ts`**: Creates 300x300px thumbnails for all media images

**Import Process:**
1. Clean the CSV file to remove duplicates: `npm run clean-csv`
2. Analyze the cleaned CSV: `npm run analyze-media`
3. Import media from CSV: `npm run import-media`
4. Download images: `npm run download-media`
5. Generate thumbnails: `npm run generate-thumbnails`

## Version History

### v0.4.9 - Page CMS Implementation
- **Implemented complete Page CMS** for managing static pages
- **Created page management interface** at `/admin/pages` with CRUD operations
- **Built visual page editor** with content blocks (Hero, Text)
- **Added drag-and-drop content builder** with block reordering
- **Implemented SEO management** with meta tags and keywords
- **Created frontend page renderer** for displaying CMS pages
- **Added dynamic routes** for CMS pages at `/{slug}`
- **Built page storage utilities** with localStorage and draft support
- **Created comprehensive type definitions** for pages and content blocks
- **Added edit functionality** for existing pages

### v0.4.8 - Media Import Enhancement
- **Fixed failed image downloads** from the CSV import process
- **Updated README** with comprehensive media import documentation
- **Created fix-failed-images script** to analyze and resolve download issues
- **Maintained data integrity** by preserving original CSV backup

### v0.4.7 - Media Upload & Image Processing
- **Implemented drag-and-drop upload** functionality in media library
- **Created upload API endpoint** with automatic thumbnail generation
- **Added image processing utilities** using Sharp library
- **Built media picker component** for selecting images in RV and blog editors
- **Integrated media picker** into RV edit page for gallery management
- **Generated thumbnails** for all 50 existing media images
- **Added upload dialog** with preview and category selection
- **Implemented proper error handling** for corrupt or invalid images

### v0.4.6 - Media Library System
- Implemented standalone media library at `/admin/media` as foundation for CMS
- Created comprehensive media types and data structures
- Built media library UI with grid/list views and filtering
- Added categories: Brand, RVs (Exteriors/Interiors/Floor Plans), Lifestyle, Scenery, Team, Blog
- Implemented search functionality across names, descriptions, and tags
- Added bulk selection and management features
- Pre-loaded sample media items with AI-generated descriptions from CSV
- Created smart categorization system based on URLs and descriptions
- Added media library to admin navigation
- Built as independent system to avoid breaking existing functionality

### Version 2.3.0 - December 28, 2024
- Added category management interface with CRUD operations
- Implemented tag management with bulk add functionality
- Added tag cloud visualization
- Enhanced category and tag usage statistics
- Created architecture.md file documenting project structure

### Version 2.2.0 - December 28, 2024
- Enhanced admin dashboard with blog statistics and quick actions
- Created post management interface with filtering and bulk actions
- Integrated Tiptap rich text editor for content creation
- Added new post creation page with SEO settings
- Implemented edit post page with full CRUD functionality
- Created admin layout with sidebar navigation

### Version 2.1.0 - December 28, 2024
- Added comprehensive blog system with listing and individual post pages
- Implemented blog post filtering by category and search
- Added author profiles and social sharing buttons
- Created mock blog data structure

### Version 2.0.0 - December 27, 2024
- Major refactor to Next.js 14 App Router
- Implemented RV detail pages with dynamic routing
- Enhanced UI with Tailwind CSS styling

### Version 1.0.0 - December 27, 2024
- Initial prototype with homepage
- Basic RV browsing functionality
- Responsive design foundation

## AI Blog Generation Setup

### Prerequisites

1. **Anthropic API Key**: Sign up at [anthropic.com](https://anthropic.com) to get your API key.

### Environment Variables

Add the following to your `.env.local` file:

```bash
# AI Blog Generation
ANTHROPIC_API_KEY=your-anthropic-api-key-here
```

### Usage

1. Navigate to **Admin Panel → Blog → Generate with AI**
2. Fill in the required fields:
   - **Topic**: Main subject of the blog post (e.g., "Best RV Camping Spots Near Bend, Oregon")
   - **Primary Keyword**: Main SEO keyword for ranking
   - **Secondary Keywords**: Additional keywords (comma-separated)
   - **Category**: Select the appropriate blog category
3. Click **Generate Blog Post**
4. The AI will:
   - Research the topic using web sources
   - Generate comprehensive, SEO-optimized content
   - Include relevant RV models from inventory
   - Select appropriate images from the media library
   - Format everything in proper HTML
5. Review and edit the generated content in the blog editor
6. Publish when ready!

### AI Generation Features

- **Smart Content Structure**: Generates posts with proper headings, table of contents, and sections
- **SEO Optimization**: Includes meta descriptions, keywords, and proper HTML formatting
- **Media Integration**: Automatically selects 3-6 relevant images from your media library
- **RV Inventory Links**: Includes links to relevant RV models based on content context
- **Brand Voice**: Maintains Happy Campers' friendly, enthusiastic tone
- **Research-Based**: Can include external research links (when using advanced models)
