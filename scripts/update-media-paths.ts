import fs from 'fs';
import path from 'path';

// Function to get the actual file extension from media directory
function findActualFile(baseName: string): string | null {
  const mediaDir = path.join(process.cwd(), 'public', 'images', 'media');
  const files = fs.readdirSync(mediaDir);
  
  // Try to find a file that starts with the base name
  const baseNameLower = baseName.toLowerCase();
  for (const file of files) {
    if (file.toLowerCase().includes(baseNameLower)) {
      return file;
    }
  }
  
  return null;
}

// Function to extract file name from URL path
function extractFileName(url: string): string {
  const parts = url.split('/');
  const fileName = parts[parts.length - 1];
  return fileName.split('.')[0]; // Remove extension
}

// Read the imported media file
const importedMediaPath = path.join(process.cwd(), 'lib', 'data', 'imported-media.ts');
let content = fs.readFileSync(importedMediaPath, 'utf-8');

// Extract the media items array
const mediaMatch = content.match(/export const importedMediaLibrary: MediaItem\[\] = (\[[\s\S]*\]);/);
if (!mediaMatch) {
  console.error('Could not find media library in file');
  process.exit(1);
}

// Parse the media items
const mediaItems = eval(mediaMatch[1]);

console.log('Updating media paths...');
let updateCount = 0;

// Update each item's URL
mediaItems.forEach((item: any) => {
  const baseName = extractFileName(item.fileName);
  const actualFile = findActualFile(baseName);
  
  if (actualFile && actualFile !== item.fileName) {
    console.log(`Updating ${item.fileName} -> ${actualFile}`);
    item.url = `/images/media/${actualFile}`;
    item.fileName = actualFile;
    // Keep thumbnail URL as is for now
    updateCount++;
  }
});

// Write back the updated content
const newContent = `import { MediaItem } from '@/lib/types/media';

// Auto-generated from CSV import on ${new Date().toISOString()}
// Total items: ${mediaItems.length}
// Updated paths to match actual downloaded files

export const importedMediaLibrary: MediaItem[] = ${JSON.stringify(mediaItems, null, 2)};`;

fs.writeFileSync(importedMediaPath, newContent);

console.log(`\n✅ Updated ${updateCount} file paths`);
console.log('Media library is now using actual downloaded images!');
