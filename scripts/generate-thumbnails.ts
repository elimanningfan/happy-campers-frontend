#!/usr/bin/env tsx

import { promises as fs } from 'fs';
import path from 'path';
import { generateThumbnail, getImageDimensions } from '../lib/utils/image-processing';

async function generateAllThumbnails() {
  console.log('🖼️  Generating thumbnails for media library...\n');

  const mediaDir = path.join(process.cwd(), 'public', 'images', 'media');
  const thumbnailDir = path.join(mediaDir, 'thumbnails');

  try {
    // Ensure directories exist
    await fs.mkdir(thumbnailDir, { recursive: true });

    // Get all files in media directory
    const files = await fs.readdir(mediaDir);
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
    });

    console.log(`Found ${imageFiles.length} images to process...\n`);

    let processed = 0;
    let skipped = 0;
    let errors = 0;

    for (const file of imageFiles) {
      const sourcePath = path.join(mediaDir, file);
      const thumbnailPath = path.join(thumbnailDir, file);

      // Check if thumbnail already exists
      try {
        await fs.access(thumbnailPath);
        console.log(`⏭️  Skipping ${file} (thumbnail exists)`);
        skipped++;
        continue;
      } catch {
        // Thumbnail doesn't exist, proceed with generation
      }

      try {
        // Get image dimensions
        const dimensions = await getImageDimensions(sourcePath);
        console.log(`📐 ${file}: ${dimensions.width}x${dimensions.height}`);

        // Generate thumbnail
        await generateThumbnail(sourcePath, thumbnailPath, {
          width: 300,
          height: 300,
          format: 'jpeg',
          quality: 80
        });

        console.log(`✅ Generated thumbnail for ${file}`);
        processed++;
      } catch (error) {
        console.error(`❌ Error processing ${file}:`, error);
        errors++;
      }
    }

    console.log('\n📊 Summary:');
    console.log(`   Total images: ${imageFiles.length}`);
    console.log(`   Processed: ${processed}`);
    console.log(`   Skipped: ${skipped}`);
    console.log(`   Errors: ${errors}`);

  } catch (error) {
    console.error('Error generating thumbnails:', error);
    process.exit(1);
  }
}

// Run the script
generateAllThumbnails().catch(console.error);
