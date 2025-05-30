// Page Storage Utilities
// Handles localStorage and file-based storage for pages

import { Page, PageListItem, PageStatus } from '@/lib/types/page';

const PAGES_STORAGE_KEY = 'hc_cms_pages';
const DRAFTS_STORAGE_KEY = 'hc_cms_drafts';

// Generate a unique ID for new pages
export const generatePageId = (): string => {
  return `page_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Generate a slug from title
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
};

// Load all pages from localStorage
export const loadPages = (): Page[] => {
  if (typeof window === 'undefined') return [];
  
  const stored = localStorage.getItem(PAGES_STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (error) {
      console.error('Error parsing stored pages:', error);
      return [];
    }
  }
  return [];
};

// Save pages to localStorage
export const savePages = (pages: Page[]): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(PAGES_STORAGE_KEY, JSON.stringify(pages));
  } catch (error) {
    console.error('Error saving pages:', error);
  }
};

// Get a single page by ID
export const getPageById = (id: string): Page | null => {
  const pages = loadPages();
  return pages.find(page => page.id === id) || null;
};

// Get a single page by slug
export const getPageBySlug = (slug: string): Page | null => {
  const pages = loadPages();
  return pages.find(page => page.slug === slug && page.status === 'published') || null;
};

// Save a single page (create or update)
export const savePage = (page: Page): void => {
  const pages = loadPages();
  const existingIndex = pages.findIndex(p => p.id === page.id);
  
  if (existingIndex >= 0) {
    pages[existingIndex] = {
      ...page,
      updatedAt: new Date().toISOString()
    };
  } else {
    pages.push(page);
  }
  
  savePages(pages);
};

// Delete a page
export const deletePage = (id: string): void => {
  const pages = loadPages();
  const filtered = pages.filter(page => page.id !== id);
  savePages(filtered);
};

// Get page list items (for table view)
export const getPageListItems = (): PageListItem[] => {
  const pages = loadPages();
  return pages.map(page => ({
    id: page.id,
    title: page.title,
    slug: page.slug,
    status: page.status,
    template: page.template,
    author: page.author,
    updatedAt: page.updatedAt,
    publishedAt: page.publishedAt
  }));
};

// Update page status
export const updatePageStatus = (id: string, status: PageStatus): void => {
  const page = getPageById(id);
  if (page) {
    page.status = status;
    if (status === 'published' && !page.publishedAt) {
      page.publishedAt = new Date().toISOString();
    }
    savePage(page);
  }
};

// Duplicate a page
export const duplicatePage = (id: string): Page | null => {
  const page = getPageById(id);
  if (page) {
    const newPage: Page = {
      ...page,
      id: generatePageId(),
      title: `${page.title} (Copy)`,
      slug: `${page.slug}-copy`,
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publishedAt: undefined,
      version: 1
    };
    savePage(newPage);
    return newPage;
  }
  return null;
};

// Auto-save draft functionality
export const saveDraft = (pageId: string, content: any): void => {
  if (typeof window === 'undefined') return;
  
  const drafts = JSON.parse(localStorage.getItem(DRAFTS_STORAGE_KEY) || '{}');
  drafts[pageId] = {
    content,
    savedAt: new Date().toISOString()
  };
  localStorage.setItem(DRAFTS_STORAGE_KEY, JSON.stringify(drafts));
};

// Load draft
export const loadDraft = (pageId: string): any => {
  if (typeof window === 'undefined') return null;
  
  const drafts = JSON.parse(localStorage.getItem(DRAFTS_STORAGE_KEY) || '{}');
  return drafts[pageId]?.content || null;
};

// Clear draft
export const clearDraft = (pageId: string): void => {
  if (typeof window === 'undefined') return;
  
  const drafts = JSON.parse(localStorage.getItem(DRAFTS_STORAGE_KEY) || '{}');
  delete drafts[pageId];
  localStorage.setItem(DRAFTS_STORAGE_KEY, JSON.stringify(drafts));
};

// Export page as JSON
export const exportPage = (page: Page): void => {
  const dataStr = JSON.stringify(page, null, 2);
  const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
  
  const exportFileDefaultName = `${page.slug}-${new Date().toISOString().split('T')[0]}.json`;
  
  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
};

// Import pages from JSON
export const importPages = async (file: File): Promise<Page[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const pages = JSON.parse(content);
        
        // Validate the imported data
        if (Array.isArray(pages)) {
          pages.forEach(page => savePage(page));
          resolve(pages);
        } else if (pages.id && pages.title && pages.slug) {
          // Single page import
          savePage(pages);
          resolve([pages]);
        } else {
          reject(new Error('Invalid page data format'));
        }
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
};
