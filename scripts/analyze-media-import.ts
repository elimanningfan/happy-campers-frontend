import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import axios from 'axios';
import { MediaItem } from '../lib/types/media';
import chalk from 'chalk';

// Types for our analysis
interface MediaAnalysis {
  totalInCSV: number;
  existingInMediaLibrary: number;
  accessible: {
    count: number;
    urls: string[];
  };
  inaccessible: {
    count: number;
    urls: Array<{ url: string; status: number | string }>;
  };
  categories: Record<string, number>;
  fileTypes: Record<string, number>;
  duplicates: string[];
}

// Helper to check if URL is already in media library
function isInMediaLibrary(url: string, mediaLibrary: MediaItem[]): boolean {
  const fileName = url.split('/').pop() || '';
  return mediaLibrary.some(item => item.fileName === fileName);
}

// Helper to get file type from URL
function getFileType(url: string): string {
  const ext = url.split('.').pop()?.toLowerCase() || 'unknown';
  return ext in { jpg: 1, jpeg: 1, png: 1, gif: 1, webp: 1, svg: 1 } ? ext : 'other';
}

// Helper to check URL accessibility with retries
async function checkUrlAccessibility(url: string, retries = 2): Promise<{ status: number | string; url: string }> {
  try {
    const response = await axios.head(url, { 
      maxRedirects: 5,
      timeout: 10000,
      validateStatus: () => true // Don't throw on HTTP errors
    });
    return { status: response.status, url };
  } catch (error: any) {
    if (retries > 0) {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait before retry
      return checkUrlAccessibility(url, retries - 1);
    }
    return { status: error.code || 'UNKNOWN_ERROR', url };
  }
}

// Process CSV and analyze media
async function analyzeMediaImport() {
  console.log(chalk.blue('🚀 Starting media import analysis...\n'));
  
  // Load existing media library
  let mediaLibrary: MediaItem[] = [];
  try {
    const mediaPath = path.join(process.cwd(), 'lib/data/media-library.ts');
    const mediaContent = fs.readFileSync(mediaPath, 'utf-8');
    const mediaMatch = mediaContent.match(/export const mediaLibrary: MediaItem\[\] = (\[.*?\])/s);
    if (mediaMatch && mediaMatch[1]) {
      mediaLibrary = eval(`(${mediaMatch[1]})`);
    }
  } catch (error) {
    console.warn(chalk.yellow('⚠️  Could not load existing media library, assuming empty'));
  }

  // Read CSV file - using the cleaned version
  const csvPath = path.join(process.cwd(), '..', 'happy_campers_rv_images_descriptions_cleaned.csv');
  const csvContent = fs.readFileSync(csvPath, 'utf-8');
  
  // Parse CSV
  const records = parse(csvContent, {
    columns: true,
    skip_empty_lines: true,
    relax_quotes: true,
    skip_records_with_empty_values: true
  });

  // Initialize analysis
  const analysis: MediaAnalysis = {
    totalInCSV: records.length,
    existingInMediaLibrary: 0,
    accessible: { count: 0, urls: [] },
    inaccessible: { count: 0, urls: [] },
    categories: {},
    fileTypes: {},
    duplicates: []
  };

  // Track seen URLs to find duplicates
  const seenUrls = new Map<string, number>();
  
  console.log(chalk.blue('🔍 Analyzing CSV records...'));
  
  // Process each record
  for (let i = 0; i < records.length; i++) {
    const record = records[i];
    const url = record['Image URL'] || '';
    
    if (!url) continue;
    
    // Check for duplicates
    if (seenUrls.has(url)) {
      analysis.duplicates.push(`Row ${i + 2}: ${url} (also at row ${seenUrls.get(url)! + 2})`);
      continue;
    }
    seenUrls.set(url, i);
    
    // Check if already in media library
    if (isInMediaLibrary(url, mediaLibrary)) {
      analysis.existingInMediaLibrary++;
      continue;
    }
    
    // Check file type
    const fileType = getFileType(url);
    analysis.fileTypes[fileType] = (analysis.fileTypes[fileType] || 0) + 1;
    
    // Check URL accessibility (in parallel batches)
    if (i < 5) { // Just check first 5 URLs for initial analysis
      process.stdout.write(chalk.gray(`  Checking URL ${i + 1}/${records.length}...\r`));
      const result = await checkUrlAccessibility(url);
      
      if (result.status === 200) {
        analysis.accessible.count++;
        analysis.accessible.urls.push(url);
      } else {
        analysis.inaccessible.count++;
        analysis.inaccessible.urls.push(result);
      }
    }
  }

  // Generate report
  console.log('\n' + chalk.green('✅ Analysis Complete!\n'));
  
  console.log(chalk.bold('📊 Import Analysis Report'));
  console.log('='.repeat(40));
  
  // Summary
  console.log(chalk.bold('\n📋 Summary'));
  console.log(`- Total in CSV: ${chalk.bold(analysis.totalInCSV)}`);
  console.log(`- Already in library: ${chalk.green(analysis.existingInMediaLibrary)}`);
  console.log(`- New to import: ${chalk.blue(analysis.totalInCSV - analysis.existingInMediaLibrary)}`);
  
  // File types
  console.log(chalk.bold('\n📂 File Types'));
  Object.entries(analysis.fileTypes)
    .sort((a, b) => b[1] - a[1])
    .forEach(([type, count]) => {
      console.log(`- ${type.toUpperCase()}: ${count}`);
    });
  
  // URL Check (sample)
  console.log(chalk.bold('\n🔗 URL Check (first 5 URLs)'));
  console.log(`- Accessible: ${chalk.green(analysis.accessible.count)}`);
  console.log(`- Inaccessible: ${chalk.red(analysis.inaccessible.count)}`);
  
  if (analysis.inaccessible.urls.length > 0) {
    console.log(chalk.yellow('\n⚠️  Inaccessible URLs:'));
    analysis.inaccessible.urls.forEach((item, i) => {
      console.log(`  ${i + 1}. ${item.url} (${item.status})`);
    });
  }
  
  // Duplicates
  if (analysis.duplicates.length > 0) {
    console.log(chalk.yellow('\n⚠️  Duplicate URLs:'));
    analysis.duplicates.slice(0, 5).forEach(dup => console.log(`  - ${dup}`));
    if (analysis.duplicates.length > 5) {
      console.log(`  ...and ${analysis.duplicates.length - 5} more`);
    }
  }
  
  // Recommendations
  console.log(chalk.bold('\n💡 Recommendations'));
  if (analysis.inaccessible.count > 0) {
    console.log(`- ${chalk.yellow('Warning:')} Some URLs are not accessible. Check network or update URLs.`);
  }
  if (analysis.duplicates.length > 0) {
    console.log(`- ${chalk.yellow('Warning:')} Found ${analysis.duplicates.length} duplicate URLs. Consider removing duplicates.`);
  }
  
  const newCount = analysis.totalInCSV - analysis.existingInMediaLibrary;
  if (newCount > 0) {
    console.log(`- ${chalk.blue('Info:')} Ready to import ${newCount} new media items.`);
  } else {
    console.log(`- ${chalk.green('Success:')} All media items are already imported.`);
  }
  
  console.log('\n' + chalk.green('✨ Analysis complete! Run `npm run import-media` to proceed with import.'));
}

// Run the analysis
analyzeMediaImport().catch(console.error);
