import { MediaItem, MediaCategory } from '@/lib/types/media';

// Helper function to generate ID from URL
function generateId(url: string): string {
  return url.split('/').pop()?.split('.')[0] || Math.random().toString(36).substring(7);
}

// Helper function to extract file name
function extractFileName(url: string): string {
  return url.split('/').pop() || 'unknown';
}

// Helper function to categorize based on URL and description
function categorizeMedia(url: string, description: string): MediaCategory {
  const urlLower = url.toLowerCase();
  const descLower = description.toLowerCase();
  
  if (urlLower.includes('logo') || urlLower.includes('hc_')) return 'brand';
  if (descLower.includes('floor plan') || urlLower.includes('floorplan')) return 'rvs/floor-plans';
  if (descLower.includes('staff') || descLower.includes('team') || descLower.includes('person')) return 'team';
  if (urlLower.includes('coast') || urlLower.includes('mountain') || urlLower.includes('landscape')) return 'scenery';
  if (descLower.includes('illustration') || urlLower.includes('festivals') || urlLower.includes('vineyard')) return 'lifestyle';
  if (descLower.includes('rv') || descLower.includes('motorhome') || descLower.includes('camper')) return 'rvs/exteriors';
  if (urlLower.includes('blog')) return 'blog';
  
  return 'misc';
}

// Helper function to extract tags from description
function extractTags(description: string): string[] {
  const tags: string[] = [];
  
  // Common keywords to look for
  const keywords = [
    'rv', 'motorhome', 'camper', 'class a', 'class b', 'class c',
    'coast', 'mountain', 'beach', 'forest', 'sunset', 'landscape',
    'logo', 'brand', 'happy campers', 'team', 'staff', 'person',
    'illustration', 'cartoon', 'lifestyle', 'adventure', 'travel'
  ];
  
  const descLower = description.toLowerCase();
  keywords.forEach(keyword => {
    if (descLower.includes(keyword)) {
      tags.push(keyword.replace(' ', '-'));
    }
  });
  
  return [...new Set(tags)]; // Remove duplicates
}

// Pre-imported media from existing WordPress site
export const initialMediaLibrary: MediaItem[] = [
  {
    id: generateId('https://www.happycampersrvrentals.com/wp-content/uploads/2020/05/HC_Logo.png'),
    url: '/images/media/HC_Logo.png',
    thumbnailUrl: '/images/media/thumbnails/HC_Logo.png',
    name: 'Happy Campers Logo',
    fileName: 'HC_Logo.png',
    altText: 'Happy Campers RV Rentals Logo',
    description: 'The image is a logo for "Happy Campers RV Rentals." On the left side, there is a cartoon illustration of a person happily leaning out of the window of an RV. The RV is drawn in a simplified, iconic style, with a white body and black outlines and wheels. The person appears cheerful, with a smiling expression.',
    category: 'brand',
    tags: ['logo', 'brand', 'happy-campers'],
    mimeType: 'image/png',
    size: 45000,
    dimensions: { width: 400, height: 200 },
    metadata: {
      uploadedBy: 'system',
      uploadedAt: new Date('2024-01-01'),
      source: 'wordpress',
      originalUrl: 'https://www.happycampersrvrentals.com/wp-content/uploads/2020/05/HC_Logo.png'
    },
    usage: []
  },
  {
    id: generateId('https://happycampersrvrentals.com/wp-content/uploads/2020/05/hc_coast.jpg'),
    url: '/images/media/hc_coast.jpg',
    thumbnailUrl: '/images/media/thumbnails/hc_coast.jpg',
    name: 'Coastal RV Adventure',
    fileName: 'hc_coast.jpg',
    altText: 'RV parked at scenic coastal location',
    description: 'The image captures a scenic coastal landscape, featuring a rugged, rocky terrain leading down to a vast, calm sea. In the foreground, on the right side, there is a partial view of a camper van with a bicycle mounted on the back, suggesting adventure and exploration.',
    category: 'scenery',
    tags: ['coast', 'rv', 'adventure', 'landscape', 'travel'],
    mimeType: 'image/jpeg',
    size: 850000,
    dimensions: { width: 1920, height: 1080 },
    metadata: {
      uploadedBy: 'system',
      uploadedAt: new Date('2024-01-01'),
      source: 'wordpress',
      originalUrl: 'https://happycampersrvrentals.com/wp-content/uploads/2020/05/hc_coast.jpg'
    },
    usage: []
  },
  {
    id: generateId('https://www.happycampersrvrentals.com/wp-content/uploads/2020/05/2U1A0711-1-1-360x204.jpg'),
    url: '/images/media/chateau-campsite.jpg',
    thumbnailUrl: '/images/media/thumbnails/chateau-campsite.jpg',
    name: 'Chateau RV at Campsite',
    fileName: 'chateau-campsite.jpg',
    altText: 'Chateau motorhome with awning extended at campsite',
    description: 'The image shows a parked motorhome, model name "Chateau," in a scenic outdoor setting. The motorhome has a beige and gray color scheme with sleek graphic accents on its side. Its retractable awning is extended, providing shade.',
    category: 'rvs/exteriors',
    tags: ['rv', 'motorhome', 'chateau', 'campsite', 'camping'],
    mimeType: 'image/jpeg',
    size: 420000,
    dimensions: { width: 1280, height: 720 },
    metadata: {
      uploadedBy: 'system',
      uploadedAt: new Date('2024-01-01'),
      source: 'wordpress',
      originalUrl: 'https://www.happycampersrvrentals.com/wp-content/uploads/2020/05/2U1A0711-1-1-360x204.jpg'
    },
    usage: []
  },
  // Add more pre-imported items here...
];

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
