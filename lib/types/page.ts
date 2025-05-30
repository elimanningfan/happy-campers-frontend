// Page CMS Type Definitions

export type PageStatus = 'draft' | 'published' | 'archived';
export type PageTemplate = 'default' | 'landing' | 'contact' | 'about' | 'custom';
export type BlockType = 'hero' | 'text' | 'image' | 'gallery' | 'cta' | 'features' | 'testimonials' | 'faq' | 'contact' | 'rv-showcase' | 'custom';

// SEO Metadata
export interface PageSEO {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  ogImage?: string;
  canonicalUrl?: string;
}

// Block Settings for styling and configuration
export interface BlockSettings {
  backgroundColor?: string;
  textColor?: string;
  padding?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  margin?: {
    top: number;
    bottom: number;
  };
  customClasses?: string;
  fullWidth?: boolean;
}

// Hero Block Content
export interface HeroBlockContent {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  backgroundVideo?: string;
  overlay?: boolean;
  overlayOpacity?: number;
  alignment?: 'left' | 'center' | 'right';
  ctaButtons?: Array<{
    text: string;
    link: string;
    style: 'primary' | 'secondary' | 'outline';
    openInNewTab?: boolean;
  }>;
}

// Text Block Content
export interface TextBlockContent {
  text: string; // Rich text HTML
  columns?: 1 | 2 | 3;
  alignment?: 'left' | 'center' | 'right' | 'justify';
}

// RV Showcase Block Content
export interface RVShowcaseBlockContent {
  title?: string;
  description?: string;
  rvIds: string[];
  layout: 'grid' | 'carousel' | 'featured';
  showPricing: boolean;
  showAvailability: boolean;
  limit?: number;
}

// Features Block Content
export interface FeaturesBlockContent {
  title?: string;
  subtitle?: string;
  features: Array<{
    icon: string;
    title: string;
    description: string;
    link?: string;
  }>;
  layout: 'grid' | 'list' | 'cards';
  columns: 2 | 3 | 4;
}

// Gallery Block Content
export interface GalleryBlockContent {
  title?: string;
  images: Array<{
    id: string;
    url: string;
    alt: string;
    caption?: string;
    link?: string;
  }>;
  layout: 'grid' | 'masonry' | 'carousel' | 'slider';
  columns: 2 | 3 | 4 | 5;
  spacing?: 'none' | 'small' | 'medium' | 'large';
}

// CTA Block Content
export interface CTABlockContent {
  title: string;
  description?: string;
  backgroundImage?: string;
  backgroundColor?: string;
  buttons: Array<{
    text: string;
    link: string;
    style: 'primary' | 'secondary' | 'outline';
  }>;
}

// Union type for all block contents
export type BlockContent = 
  | { type: 'hero'; content: HeroBlockContent }
  | { type: 'text'; content: TextBlockContent }
  | { type: 'rv-showcase'; content: RVShowcaseBlockContent }
  | { type: 'features'; content: FeaturesBlockContent }
  | { type: 'gallery'; content: GalleryBlockContent }
  | { type: 'cta'; content: CTABlockContent };

// Content Block Definition
export interface ContentBlock {
  id: string;
  type: BlockType;
  content: any; // Will be typed based on type
  settings?: BlockSettings;
  order: number;
  isVisible: boolean;
}

// Page Definition
export interface Page {
  id: string;
  title: string;
  slug: string;
  status: PageStatus;
  template: PageTemplate;
  content: ContentBlock[];
  seo: PageSEO;
  author: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  version: number;
  parentId?: string;
  order: number;
  featuredImage?: string;
}

// Page List Item (for table views)
export interface PageListItem {
  id: string;
  title: string;
  slug: string;
  status: PageStatus;
  template: PageTemplate;
  author: string;
  updatedAt: string;
  publishedAt?: string;
}
