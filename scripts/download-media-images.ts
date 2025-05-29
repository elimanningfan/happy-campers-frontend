import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';
import { importedMediaLibrary } from '../lib/data/imported-media';

// Create directories if they don't exist
const mediaDir = path.join(process.cwd(), 'public', 'images', 'media');
const thumbnailDir = path.join(mediaDir, 'thumbnails');

if (!fs.existsSync(mediaDir)) {
  fs.mkdirSync(mediaDir, { recursive: true });
}

if (!fs.existsSync(thumbnailDir)) {
  fs.mkdirSync(thumbnailDir, { recursive: true });
}

// Helper function to download a file
function downloadFile(url: string, destinationPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destinationPath);
    const protocol = url.startsWith('https') ? https : http;
    
    const request = protocol.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        // Handle redirects
        const redirectUrl = response.headers.location;
        if (redirectUrl) {
          file.close();
          fs.unlinkSync(destinationPath);
          downloadFile(redirectUrl, destinationPath).then(resolve).catch(reject);
          return;
        }
      }
      
      if (response.statusCode !== 200) {
        file.close();
        fs.unlinkSync(destinationPath);
        reject(new Error(`Failed to download: ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        resolve();
      });
    });
    
    request.on('error', (err) => {
      file.close();
      fs.unlinkSync(destinationPath);
      reject(err);
    });
    
    file.on('error', (err) => {
      file.close();
      fs.unlinkSync(destinationPath);
      reject(err);
    });
  });
}

// Extract filename from metadata URL
function getFileNameFromUrl(url: string): string {
  const urlParts = url.split('/');
  const fileName = urlParts[urlParts.length - 1];
  // Clean up filename - remove query params
  return fileName.split('?')[0];
}

// Main download function
async function downloadAllMedia() {
  console.log('🚀 Starting media download process...');
  console.log(`📁 Media directory: ${mediaDir}`);
  console.log(`📷 Total images to download: ${importedMediaLibrary.length}\n`);
  
  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;
  const errors: {url: string, error: string}[] = [];
  
  for (let i = 0; i < importedMediaLibrary.length; i++) {
    const item = importedMediaLibrary[i];
    const originalUrl = item.metadata?.originalUrl;
    
    if (!originalUrl) {
      console.log(`⚠️  [${i + 1}/${importedMediaLibrary.length}] No original URL for ${item.name}`);
      skipCount++;
      continue;
    }
    
    const fileName = getFileNameFromUrl(originalUrl);
    const destinationPath = path.join(mediaDir, fileName);
    
    // Skip if file already exists
    if (fs.existsSync(destinationPath)) {
      console.log(`✓ [${i + 1}/${importedMediaLibrary.length}] Already exists: ${fileName}`);
      successCount++;
      continue;
    }
    
    try {
      console.log(`⬇️  [${i + 1}/${importedMediaLibrary.length}] Downloading: ${fileName}`);
      await downloadFile(originalUrl, destinationPath);
      console.log(`✅ [${i + 1}/${importedMediaLibrary.length}] Downloaded: ${fileName}`);
      successCount++;
      
      // Add a small delay to avoid overwhelming the server
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error(`❌ [${i + 1}/${importedMediaLibrary.length}] Failed to download ${fileName}:`, error.message);
      errors.push({url: originalUrl, error: error.message});
      errorCount++;
    }
  }
  
  console.log('\n📊 Download Summary:');
  console.log(`✅ Successfully downloaded: ${successCount}`);
  console.log(`⚠️  Skipped (no URL or exists): ${skipCount}`);
  console.log(`❌ Failed: ${errorCount}`);
  
  if (errors.length > 0) {
    console.log('\n❌ Failed downloads:');
    errors.forEach(({url, error}) => {
      console.log(`  - ${url}`);
      console.log(`    Error: ${error}`);
    });
  }
  
  console.log('\n✨ Download process complete!');
  console.log('\nNext steps:');
  console.log('1. Update the media library to use local file paths');
  console.log('2. Generate thumbnails for better performance');
  console.log('3. Implement image optimization');
}

// Run the download
downloadAllMedia().catch(console.error);
