import { importedMediaLibrary } from './imported-media';

// Use the imported media library from CSV
export const initialMediaLibrary = importedMediaLibrary;

// Categories structure for the UI
export const mediaCategories = [
  { id: 'brand', name: 'Brand Assets', icon: '🏷️' },
  { id: 'rvs', name: 'RVs', icon: '🚐', 
    subcategories: [
      { id: 'rvs/exteriors', name: 'Exteriors' },
      { id: 'rvs/interiors', name: 'Interiors' },
      { id: 'rvs/floor-plans', name: 'Floor Plans' }
    ]
  },
  { id: 'lifestyle', name: 'Lifestyle', icon: '🏕️' },
  { id: 'scenery', name: 'Scenery', icon: '🏔️' },
  { id: 'team', name: 'Team', icon: '👥' },
  { id: 'blog', name: 'Blog', icon: '📝' },
  { id: 'misc', name: 'Miscellaneous', icon: '📁' }
];
