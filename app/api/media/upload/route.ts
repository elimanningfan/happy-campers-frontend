import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { MediaItem, MediaCategory } from '@/lib/types/media';
import { generateThumbnail, getImageDimensions } from '@/lib/utils/image-processing';

export const runtime = 'nodejs';

// Helper function to generate unique filename
function generateUniqueFilename(originalName: string): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  const ext = path.extname(originalName);
  const baseName = path.basename(originalName, ext).replace(/[^a-zA-Z0-9-_]/g, '-');
  return `${baseName}-${timestamp}-${random}${ext}`;
}

// Helper function to generate ID from filename
function generateId(fileName: string): string {
  return fileName.split('.')[0].toLowerCase().replace(/[^a-z0-9-]/g, '-');
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];
    const category = formData.get('category') as MediaCategory || 'misc';
    
    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No files uploaded' }, { status: 400 });
    }

    const uploadedMedia: MediaItem[] = [];

    // Ensure media directory exists
    const mediaDir = path.join(process.cwd(), 'public', 'images', 'media');
    const thumbnailDir = path.join(mediaDir, 'thumbnails');
    
    await mkdir(mediaDir, { recursive: true });
    await mkdir(thumbnailDir, { recursive: true });

    // Process each file
    for (const file of files) {
      try {
        // Validate file type
        if (!file.type.startsWith('image/')) {
          console.warn(`Skipping non-image file: ${file.name}`);
          continue;
        }

        // Generate unique filename
        const uniqueFilename = generateUniqueFilename(file.name);
        const filePath = path.join(mediaDir, uniqueFilename);
        const thumbnailPath = path.join(thumbnailDir, uniqueFilename);
        
        // Convert file to buffer and save
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        await writeFile(filePath, buffer);

        // Get image dimensions
        const dimensions = await getImageDimensions(filePath);

        // Generate thumbnail
        try {
          await generateThumbnail(filePath, thumbnailPath, {
            width: 300,
            height: 300,
            format: 'jpeg',
            quality: 80
          });
        } catch (error) {
          console.error(`Error generating thumbnail for ${file.name}:`, error);
        }

        // Create media item
        const mediaItem: MediaItem = {
          id: generateId(uniqueFilename),
          url: `/images/media/${uniqueFilename}`,
          thumbnailUrl: `/images/media/thumbnails/${uniqueFilename}`,
          name: file.name.split('.')[0].replace(/[-_]/g, ' '),
          fileName: uniqueFilename,
          altText: file.name.split('.')[0].replace(/[-_]/g, ' '),
          description: '',
          category: category,
          tags: [],
          mimeType: file.type,
          size: file.size,
          dimensions: dimensions,
          metadata: {
            uploadedBy: 'admin',
            uploadedAt: new Date().toISOString(),
            source: 'upload'
          },
          usage: []
        };

        uploadedMedia.push(mediaItem);
      } catch (error) {
        console.error(`Error processing file ${file.name}:`, error);
      }
    }

    if (uploadedMedia.length === 0) {
      return NextResponse.json({ error: 'No files were successfully uploaded' }, { status: 400 });
    }

    // Here you would typically save to database
    // For now, we'll just return the uploaded items
    
    return NextResponse.json({
      success: true,
      uploaded: uploadedMedia.length,
      media: uploadedMedia
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload files' },
      { status: 500 }
    );
  }
}
