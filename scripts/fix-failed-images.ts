import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

// URLs that failed to download with their descriptions
const failedImages = [
  {
    url: 'https://www.happycampersrvrentals.com/wp-content/uploads/2020/06/rvfriends_6-360x212.jpg',
    description: 'RV friends enjoying camping together',
    fallbackName: 'rv-friends-camping.jpg'
  },
  {
    url: 'https://www.happycampersrvrentals.com/wp-content/uploads/2020/06/skisnowboard_8-360x212.jpg',
    description: 'Ski and snowboard adventure with RV',
    fallbackName: 'ski-snowboard-rv-adventure.jpg'
  },
  {
    url: 'https://www.happycampersrvrentals.com/wp-content/uploads/2020/06/SkiTrips_HappyCampers.png',
    description: 'Happy Campers ski trips graphic',
    fallbackName: 'happy-campers-ski-trips.png'
  },
  {
    url: 'https://www.happycampersrvrentals.com/wp-content/uploads/2024/10/Happy-Campgrounds-logo-large-1-360x187.png',
    description: 'Happy Campgrounds logo',
    fallbackName: 'happy-campgrounds-logo.png'
  },
  {
    url: 'https://www.happycampersrvrentals.com/wp-content/uploads/2020/05/RentalRates_Seasonal.png',
    description: 'Seasonal rental rates chart',
    fallbackName: 'rental-rates-seasonal.png'
  },
  {
    url: 'https://www.happycampersrvrentals.com/wp-content/uploads/2021/11/AnneMarie_CustomerReview_Thumbnail.jpg',
    description: 'AnneMarie customer review thumbnail',
    fallbackName: 'annemarie-customer-review.jpg'
  }
];

console.log('🔧 Analyzing failed image URLs...\n');

// Read the cleaned CSV to get the full descriptions
const csvPath = path.join(process.cwd(), '..', 'happy_campers_rv_images_descriptions_cleaned.csv');
const csvContent = fs.readFileSync(csvPath, 'utf-8');
const records = parse(csvContent, {
  columns: true,
  skip_empty_lines: true,
  relax_quotes: true
});

// Find the failed entries in the CSV
const failedEntries = records.filter((r: any) => 
  r['Description'] && r['Description'].includes('Failed to download')
);

console.log(`Found ${failedEntries.length} failed entries in CSV:\n`);

failedEntries.forEach((entry: any, index: number) => {
  console.log(`${index + 1}. URL: ${entry['Image URL']}`);
  
  // Try to extract meaningful info from the URL
  const urlParts = entry['Image URL'].split('/');
  const fileName = urlParts[urlParts.length - 1];
  
  console.log(`   Original filename: ${fileName}`);
  
  // Check if it's a tracking URL (like the Bing one)
  if (entry['Image URL'].includes('bat.bing.com')) {
    console.log('   ❌ This is a tracking pixel, not an actual image - should be excluded\n');
  } else if (entry['Image URL'].includes('//www.')) {
    console.log('   ❌ Malformed URL with double slashes - needs correction\n');
  } else {
    console.log('   ⚠️  Could be a valid image that needs manual download or alternative source\n');
  }
});

console.log('\n📋 Recommendations to get more images:\n');
console.log('1. Manual Download Options:');
console.log('   - Try accessing the URLs directly in a browser');
console.log('   - Look for alternative sizes (remove -360x212 from filename)');
console.log('   - Search for these images in the WordPress media library\n');

console.log('2. Alternative Sources:');
console.log('   - Check if these images exist under different URLs');
console.log('   - Look for higher resolution versions');
console.log('   - Consider creating new images for missing content\n');

console.log('3. Fix URL Issues:');
console.log('   - Remove the tracking pixel URL (Bing)');
console.log('   - Fix the double-slash URL for dummy.png');
console.log('   - Try parent directories for 404 errors\n');

// Generate a report of what we could try
const fixableUrls = failedEntries
  .filter((e: any) => !e['Image URL'].includes('bat.bing.com'))
  .map((e: any) => {
    const url = e['Image URL'];
    // Fix double slash issue
    const fixedUrl = url.replace('//www.', '/www.').replace('https://www.', 'https://www.');
    
    return {
      original: url,
      fixed: fixedUrl,
      alternates: [
        // Try without dimensions
        fixedUrl.replace('-360x212', ''),
        fixedUrl.replace('-360x187', ''),
        // Try different year paths
        fixedUrl.replace('/2020/', '/2021/'),
        fixedUrl.replace('/2020/', '/2022/'),
        fixedUrl.replace('/2020/', '/2023/'),
        fixedUrl.replace('/2020/', '/2024/')
      ]
    };
  });

console.log('4. URLs to retry with fixes:');
fixableUrls.forEach((item: any) => {
  console.log(`\n   Original: ${item.original}`);
  console.log(`   Fixed: ${item.fixed}`);
  console.log('   Alternatives to try:');
  item.alternates.forEach((alt: string) => console.log(`     - ${alt}`));
});
