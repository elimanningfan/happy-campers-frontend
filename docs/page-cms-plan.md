# Page CMS Implementation Plan

## Overview
Build a comprehensive CMS system for managing static pages (non-blog content) in the Happy Campers RV Rentals admin panel.

## Phase 1: Core Infrastructure (Week 1)

### 1.1 Data Model & Schema
```typescript
interface Page {
  id: string;
  title: string;
  slug: string;
  status: 'draft' | 'published' | 'archived';
  template: 'default' | 'landing' | 'contact' | 'about' | 'custom';
  content: ContentBlock[];
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    ogImage?: string;
  };
  author: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  version: number;
  parentId?: string; // For nested pages
  order: number; // For menu ordering
}

interface ContentBlock {
  id: string;
  type: 'hero' | 'text' | 'image' | 'gallery' | 'cta' | 'features' | 'testimonials' | 'faq' | 'contact' | 'rv-showcase' | 'custom';
  content: any; // Block-specific content
  settings: BlockSettings;
  order: number;
}
```

### 1.2 Admin Routes Structure
```
/admin/pages
  /admin/pages                    - Page listing with filters
  /admin/pages/new               - Create new page
  /admin/pages/[id]/edit         - Edit existing page
  /admin/pages/[id]/preview      - Preview page
  /admin/pages/templates         - Manage page templates
  /admin/pages/blocks            - Content block library
```

## Phase 2: Page Management Interface (Week 1-2)

### 2.1 Page Listing Features
- Table view with columns: Title, URL, Template, Status, Last Modified, Actions
- Filters: Status, Template, Author
- Search by title or content
- Bulk actions: Publish, Archive, Delete
- Sortable by date, title, status
- Page hierarchy visualization for nested pages

### 2.2 Page Editor Features
- **Header Section**:
  - Page title input
  - URL slug generator with validation
  - Template selector
  - Status toggle (Draft/Published)
  - Save/Preview/Publish buttons

- **Content Builder**:
  - Drag-and-drop block interface
  - Block library sidebar
  - Real-time preview toggle
  - Undo/Redo functionality
  - Auto-save every 30 seconds

- **Sidebar Options**:
  - SEO settings panel
  - Featured image selector
  - Page settings (parent page, menu order)
  - Publishing options
  - Revision history

## Phase 3: Content Blocks System (Week 2-3)

### 3.1 Pre-built Content Blocks

#### Hero Block
```typescript
{
  type: 'hero',
  content: {
    title: string;
    subtitle?: string;
    backgroundImage?: string;
    backgroundVideo?: string;
    overlay?: boolean;
    ctaButtons: Array<{
      text: string;
      link: string;
      style: 'primary' | 'secondary';
    }>;
  }
}
```

#### Text Block
```typescript
{
  type: 'text',
  content: {
    text: string; // Rich text HTML
    columns: 1 | 2 | 3;
    alignment: 'left' | 'center' | 'right';
  }
}
```

#### RV Showcase Block
```typescript
{
  type: 'rv-showcase',
  content: {
    title?: string;
    description?: string;
    rvIds: string[];
    layout: 'grid' | 'carousel' | 'featured';
    showPricing: boolean;
    showAvailability: boolean;
  }
}
```

#### Features Block
```typescript
{
  type: 'features',
  content: {
    title?: string;
    features: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
    layout: 'grid' | 'list' | 'cards';
    columns: 2 | 3 | 4;
  }
}
```

#### Gallery Block
```typescript
{
  type: 'gallery',
  content: {
    title?: string;
    images: Array<{
      id: string;
      caption?: string;
      link?: string;
    }>;
    layout: 'grid' | 'masonry' | 'carousel';
    columns: 2 | 3 | 4 | 5;
  }
}
```

### 3.2 Block Editor Interface
- Visual block configuration panel
- Media picker integration
- Link picker with internal page search
- Style presets (colors, spacing, borders)
- Responsive preview (mobile/tablet/desktop)

## Phase 4: Page Templates (Week 3)

### 4.1 Pre-built Templates

#### Homepage Template
- Hero section with video background
- Featured RVs showcase
- Why Choose Us features
- Testimonials
- CTA section
- Recent blog posts

#### About Page Template
- Hero with team photo
- Company story text
- Team members grid
- Values/mission section
- Awards/certifications
- CTA to contact

#### Services Page Template
- Service hero
- Service cards grid
- Process timeline
- FAQ section
- Contact CTA

#### Contact Page Template
- Contact hero
- Contact form
- Location map
- Business hours
- Phone/email info
- Social links

### 4.2 Template Management
- Template library view
- Create custom templates from existing pages
- Template versioning
- Template preview
- Import/Export templates

## Phase 5: Advanced Features (Week 4)

### 5.1 Visual Page Builder
- Inline editing mode
- Component property panels
- Spacing/padding controls
- Background options (color, image, video)
- Animation settings
- Custom CSS injection

### 5.2 SEO & Performance
- SEO analysis tool integration
- Open Graph preview
- Schema.org markup generator
- Page speed insights
- Image optimization warnings
- Mobile-friendliness checker

### 5.3 Workflow Features
- Scheduled publishing
- Draft preview links
- Approval workflow
- Change notifications
- Activity log
- Bulk import/export

## Phase 6: Integration & Polish (Week 4-5)

### 6.1 Frontend Integration
- Dynamic route handler for CMS pages
- Page component renderer
- Block component library
- SEO meta tag injection
- Sitemap generation
- 404 handling for unpublished pages

### 6.2 Media Library Integration
- Seamless image selection
- Gallery creation tools
- Image cropping/editing
- Alt text management
- CDN integration

### 6.3 Navigation Management
- Menu builder interface
- Drag-and-drop menu items
- Mega menu support
- Mobile menu configuration
- Footer link management

## Technical Stack

### Frontend
- **Editor**: TipTap or Editor.js for rich text
- **Page Builder**: Custom React components with react-dnd
- **Forms**: React Hook Form with Zod validation
- **State**: Zustand for editor state
- **API**: React Query for data fetching

### Backend (Future)
- **Database**: PostgreSQL with Prisma
- **API**: Next.js API routes or separate Express server
- **File Storage**: AWS S3 or Cloudinary
- **Cache**: Redis for page caching
- **Search**: Elasticsearch for content search

### UI Components Needed
- Draggable block list
- Block configuration panels
- Preview iframe component
- Template selector
- Media picker modal
- Link picker modal
- SEO preview card
- Revision diff viewer

## Implementation Priority

1. **MVP (2 weeks)**
   - Basic page CRUD
   - Simple text editor
   - Hero and text blocks only
   - Basic SEO fields
   - Frontend page renderer

2. **Enhanced (1 week)**
   - Additional content blocks
   - Drag-and-drop builder
   - Media integration
   - Page templates

3. **Advanced (1 week)**
   - Visual editing
   - Advanced SEO tools
   - Workflow features
   - Performance optimization

## Data Storage Strategy (Initially)

Since we're starting without a backend:
1. Use localStorage for draft pages
2. Export pages as JSON files
3. Store published pages in a `data/pages` directory
4. Use static generation for published pages

## Migration Path

When backend is ready:
1. Create database schema
2. Build migration script for JSON → Database
3. Implement API endpoints
4. Update frontend to use API
5. Add real-time collaboration features

## Success Metrics

- Page creation time < 5 minutes
- Page load speed < 2 seconds
- Editor performance smooth with 50+ blocks
- SEO score > 90/100
- Mobile responsive score 100%
- Zero data loss with auto-save

## Next Steps

1. Create UI mockups for page editor
2. Build basic page data structure
3. Implement simple page creator with hero + text blocks
4. Create frontend page renderer
5. Add drag-and-drop functionality
6. Expand block library
7. Implement templates
8. Add advanced features
