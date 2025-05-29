import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import { MediaItem, MediaCategory } from '../lib/types/media';

// Helper function to generate ID from URL
function generateId(url: string): string {
  const fileName = url.split('/').pop()?.split('.')[0] || '';
  return fileName.replace(/[^a-zA-Z0-9-]/g, '-').toLowerCase();
}

// Helper function to extract file name
function extractFileName(url: string): string {
  return url.split('/').pop() || 'unknown';
}

// Helper function to categorize based on URL and description
function categorizeMedia(url: string, description: string): MediaCategory {
  const urlLower = url.toLowerCase();
  const descLower = description.toLowerCase();
  
  // Priority categorization
  if (urlLower.includes('logo') || urlLower.includes('hc_') || descLower.includes('happy campers logo')) return 'brand';
  if (descLower.includes('floor plan') || urlLower.includes('floorplan') || urlLower.includes('floor-plan')) return 'rvs/floor-plans';
  if (descLower.includes('interior') || descLower.includes('inside the rv') || descLower.includes('kitchenette')) return 'rvs/interiors';
  if (descLower.includes('staff') || descLower.includes('team') || descLower.includes('owner') || descLower.includes('employee')) return 'team';
  if (urlLower.includes('coast') || urlLower.includes('beach') || descLower.includes('ocean') || descLower.includes('coastal')) return 'scenery';
  if (urlLower.includes('mountain') || descLower.includes('mountain') || descLower.includes('forest')) return 'scenery';
  if (descLower.includes('illustration') || descLower.includes('cartoon') || descLower.includes('animated')) return 'lifestyle';
  if (urlLower.includes('festival') || urlLower.includes('vineyard') || descLower.includes('lifestyle')) return 'lifestyle';
  if (descLower.includes('blog') || urlLower.includes('blog')) return 'blog';
  if (descLower.includes('rv') || descLower.includes('motorhome') || descLower.includes('camper') || descLower.includes('winnebago')) return 'rvs/exteriors';
  
  return 'misc';
}

// Helper function to extract tags from description
function extractTags(url: string, description: string): string[] {
  const tags: string[] = [];
  const combined = `${url} ${description}`.toLowerCase();
  
  // RV related tags
  if (combined.includes('class a')) tags.push('class-a');
  if (combined.includes('class b')) tags.push('class-b');
  if (combined.includes('class c')) tags.push('class-c');
  if (combined.includes('travel trailer')) tags.push('travel-trailer');
  if (combined.includes('toy hauler')) tags.push('toy-hauler');
  if (combined.includes('motorhome')) tags.push('motorhome');
  if (combined.includes('rv')) tags.push('rv');
  if (combined.includes('camper')) tags.push('camper');
  
  // Location tags
  if (combined.includes('coast')) tags.push('coast');
  if (combined.includes('beach')) tags.push('beach');
  if (combined.includes('mountain')) tags.push('mountain');
  if (combined.includes('forest')) tags.push('forest');
  if (combined.includes('lake')) tags.push('lake');
  if (combined.includes('oregon')) tags.push('oregon');
  
  // Feature tags
  if (combined.includes('awning')) tags.push('awning');
  if (combined.includes('solar')) tags.push('solar');
  if (combined.includes('generator')) tags.push('generator');
  if (combined.includes('slide')) tags.push('slide-out');
  if (combined.includes('kitchen')) tags.push('kitchen');
  if (combined.includes('bathroom')) tags.push('bathroom');
  
  // Activity tags
  if (combined.includes('camping')) tags.push('camping');
  if (combined.includes('adventure')) tags.push('adventure');
  if (combined.includes('family')) tags.push('family');
  if (combined.includes('festival')) tags.push('festival');
  if (combined.includes('vineyard')) tags.push('vineyard');
  
  // Brand tags
  if (combined.includes('winnebago')) tags.push('winnebago');
  if (combined.includes('minnie winnie')) tags.push('minnie-winnie');
  if (combined.includes('thor')) tags.push('thor');
  if (combined.includes('chateau')) tags.push('chateau');
  
  // Other tags
  if (combined.includes('logo')) tags.push('logo');
  if (combined.includes('brand')) tags.push('brand');
  if (combined.includes('illustration')) tags.push('illustration');
  if (combined.includes('sunset')) tags.push('sunset');
  if (combined.includes('landscape')) tags.push('landscape');
  
  return [...new Set(tags)]; // Remove duplicates
}

// Helper to create a clean name from description
function createMediaName(url: string, description: string): string {
  // Try to extract meaningful name from URL first
  const fileName = extractFileName(url);
  const nameFromFile = fileName.split('.')[0]
    .replace(/[-_]/g, ' ')
    .replace(/\d+x\d+/g, '') // Remove dimensions
    .replace(/\s+/g, ' ')
    .trim();
  
  // If we have a good name from file, use it
  if (nameFromFile && nameFromFile.length > 3 && !nameFromFile.match(/^\d+$/)) {
    return nameFromFile
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  
  // Otherwise, create from description
  const firstSentence = description.split('.')[0];
  if (firstSentence.length < 50) {
    return firstSentence;
  }
  
  // Extract key info from description
  if (description.includes('floor plan')) return 'RV Floor Plan';
  if (description.includes('logo')) return 'Happy Campers Logo';
  if (description.includes('motorhome')) return 'Motorhome';
  if (description.includes('coast')) return 'Coastal View';
  if (description.includes('mountain')) return 'Mountain Scenery';
  if (description.includes('illustration')) return 'Lifestyle Illustration';
  
  // Default to first few words
  return description.split(' ').slice(0, 5).join(' ') + '...';
}

async function importMediaFromCSV() {
  console.log('Starting media import from CSV...');
  
  // Read CSV file - using cleaned version
  const csvPath = path.join(process.cwd(), '..', 'happy_campers_rv_images_descriptions_cleaned.csv');
  const csvContent = fs.readFileSync(csvPath, 'utf-8');
  
  // Parse CSV with proper options for multi-line fields
  const records = parse(csvContent, {
    columns: true,
    skip_empty_lines: true,
    relax_quotes: true,
    skip_records_with_empty_values: true
  });
  
  console.log(`Found ${records.length} records in cleaned CSV`);
  
  // Convert to MediaItem format
  const mediaItems: MediaItem[] = [];
  let skippedCount = 0;
  let processedCount = 0;
  
  records.forEach((record: any, index: number) => {
    // Field names from CSV header
    const url = record['Image URL'] || '';
    const description = record['Description'] || '';
    
    // Progress indicator
    process.stdout.write(`Processing: ${index + 1}/${records.length}\r`);
    
    // Skip if no URL
    if (!url || url.trim() === '') {
      skippedCount++;
      console.log(`\nSkipping record ${index + 1}: No URL`);
      return;
    }
    
    // Skip failed downloads or empty descriptions
    if (description.includes('Failed to download') || description.trim() === '') {
      skippedCount++;
      console.log(`\nSkipping record ${index + 1}: Failed download or empty description`);
      return;
    }
    
    const id = generateId(url);
    const fileName = extractFileName(url);
    const category = categorizeMedia(url, description);
    const tags = extractTags(url, description);
    const name = createMediaName(url, description);
    
    const mediaItem: MediaItem = {
      id,
      url: `/images/media/${fileName}`,
      thumbnailUrl: `/images/media/thumbnails/${fileName}`,
      name,
      fileName,
      altText: description.length > 100 ? description.substring(0, 100) + '...' : description,
      description,
      category,
      tags,
      mimeType: fileName.endsWith('.png') ? 'image/png' : 'image/jpeg',
      size: Math.floor(Math.random() * 2000000) + 100000, // Random size between 100KB-2MB
      dimensions: {
        width: Math.floor(Math.random() * 1000) + 800,
        height: Math.floor(Math.random() * 800) + 600
      },
      metadata: {
        uploadedBy: 'system',
        uploadedAt: new Date('2024-01-01'),
        source: 'wordpress',
        originalUrl: url
      },
      usage: []
    };
    
    mediaItems.push(mediaItem);
    processedCount++;
  });
  
  console.log(`\n\nSuccessfully processed ${processedCount} media items`);
  console.log(`Skipped ${skippedCount} items`);
  
  // Group by category for summary
  const categoryCounts: Record<string, number> = {};
  mediaItems.forEach(item => {
    categoryCounts[item.category] = (categoryCounts[item.category] || 0) + 1;
  });
  
  console.log('\nMedia distribution by category:');
  Object.entries(categoryCounts).forEach(([category, count]) => {
    console.log(`  ${category}: ${count} items`);
  });
  
  // Generate TypeScript file with all media items
  const tsContent = `import { MediaItem } from '@/lib/types/media';

// Auto-generated from CSV import on ${new Date().toISOString()}
// Total items: ${mediaItems.length}

export const importedMediaLibrary: MediaItem[] = ${JSON.stringify(mediaItems, null, 2)};

// Category counts
export const mediaCategoryCounts = ${JSON.stringify(categoryCounts, null, 2)};
`;
  
  const outputPath = path.join(process.cwd(), 'lib', 'data', 'imported-media.ts');
  fs.writeFileSync(outputPath, tsContent);
  
  console.log(`\n✅ Media import complete! Generated: ${outputPath}`);
  console.log('Next steps:');
  console.log('1. Update media-library.ts to use importedMediaLibrary');
  console.log('2. Download actual images from URLs to public/images/media/');
  console.log('3. Generate thumbnails for better performance');
}

// Run the import
importMediaFromCSV().catch(console.error);
