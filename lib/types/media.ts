export interface MediaItem {
  id: string;
  url: string;
  thumbnailUrl?: string;
  name: string;
  fileName: string;
  altText: string;
  description?: string;
  category: MediaCategory;
  tags: string[];
  mimeType: string;
  size: number;
  dimensions?: {
    width: number;
    height: number;
  };
  metadata: {
    uploadedBy: string;
    uploadedAt: Date;
    source: 'upload' | 'import' | 'wordpress';
    originalUrl?: string;
  };
  usage: MediaUsage[];
}

export interface MediaUsage {
  type: 'rv' | 'blog' | 'page';
  id: string;
  title: string;
  field?: string; // e.g., 'heroImage', 'gallery[0]'
}

export type MediaCategory = 
  | 'brand'
  | 'rvs/exteriors' 
  | 'rvs/interiors'
  | 'rvs/floor-plans'
  | 'lifestyle'
  | 'scenery'
  | 'team'
  | 'blog'
  | 'misc';

export interface MediaFolder {
  id: string;
  name: string;
  path: string;
  parent?: string;
  itemCount: number;
}

export interface MediaLibraryState {
  items: MediaItem[];
  folders: MediaFolder[];
  selectedItems: string[];
  view: 'grid' | 'list';
  sortBy: 'name' | 'date' | 'size';
  filterBy: {
    category?: MediaCategory;
    search?: string;
    tags?: string[];
  };
}
