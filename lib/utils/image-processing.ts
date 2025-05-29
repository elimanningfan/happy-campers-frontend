import sharp from 'sharp';
import path from 'path';
import { promises as fs } from 'fs';

export interface ImageDimensions {
  width: number;
  height: number;
}

export interface ProcessingOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'jpeg' | 'png' | 'webp';
}

/**
 * Generate a thumbnail for an image
 */
export async function generateThumbnail(
  inputPath: string, 
  outputPath: string, 
  options: ProcessingOptions = {}
): Promise<ImageDimensions> {
  const {
    width = 300,
    height = 300,
    quality = 80,
    format = 'jpeg'
  } = options;

  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    // Process image
    const processed = await image
      .resize(width, height, {
        fit: 'cover',
        position: 'center'
      })
      .toFormat(format, { quality })
      .toBuffer();

    // Ensure output directory exists
    const outputDir = path.dirname(outputPath);
    await fs.mkdir(outputDir, { recursive: true });
    
    // Save processed image
    await fs.writeFile(outputPath, processed);

    return {
      width: metadata.width || 0,
      height: metadata.height || 0
    };
  } catch (error) {
    console.error('Error generating thumbnail:', error);
    throw error;
  }
}

/**
 * Get image dimensions without loading the entire image
 */
export async function getImageDimensions(imagePath: string): Promise<ImageDimensions> {
  try {
    const metadata = await sharp(imagePath).metadata();
    return {
      width: metadata.width || 0,
      height: metadata.height || 0
    };
  } catch (error) {
    console.error('Error getting image dimensions:', error);
    return { width: 0, height: 0 };
  }
}

/**
 * Optimize an image for web use
 */
export async function optimizeImage(
  inputPath: string,
  outputPath: string,
  options: ProcessingOptions = {}
): Promise<void> {
  const {
    width,
    height,
    quality = 85,
    format = 'webp'
  } = options;

  try {
    const image = sharp(inputPath);
    
    if (width || height) {
      image.resize(width, height, {
        fit: 'inside',
        withoutEnlargement: true
      });
    }

    await image
      .toFormat(format, { quality })
      .toFile(outputPath);
  } catch (error) {
    console.error('Error optimizing image:', error);
    throw error;
  }
}

/**
 * Generate multiple sizes for responsive images
 */
export async function generateResponsiveImages(
  inputPath: string,
  outputDir: string,
  baseName: string
): Promise<Record<string, string>> {
  const sizes = [
    { suffix: 'sm', width: 640 },
    { suffix: 'md', width: 768 },
    { suffix: 'lg', width: 1024 },
    { suffix: 'xl', width: 1280 },
    { suffix: '2xl', width: 1536 }
  ];

  const generated: Record<string, string> = {};

  await fs.mkdir(outputDir, { recursive: true });

  for (const size of sizes) {
    const outputName = `${baseName}-${size.suffix}.webp`;
    const outputPath = path.join(outputDir, outputName);
    
    try {
      await optimizeImage(inputPath, outputPath, {
        width: size.width,
        format: 'webp',
        quality: 85
      });
      
      generated[size.suffix] = `/images/media/responsive/${outputName}`;
    } catch (error) {
      console.error(`Error generating ${size.suffix} image:`, error);
    }
  }

  return generated;
}
