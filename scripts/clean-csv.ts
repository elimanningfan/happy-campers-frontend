import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import { stringify } from 'csv-stringify/sync';
import chalk from 'chalk';

async function cleanCSV() {
  console.log(chalk.blue('🔍 Analyzing and cleaning CSV...'));
  
  // Define paths
  const csvPath = path.join(process.cwd(), '..', 'happy_campers_rv_images_descriptions.csv');
  const backupPath = path.join(process.cwd(), '..', 'happy_campers_rv_images_descriptions.backup.csv');
  const outputPath = path.join(process.cwd(), '..', 'happy_campers_rv_images_descriptions_cleaned.csv');
  
  try {
    // Create backup of original
    fs.copyFileSync(csvPath, backupPath);
    console.log(chalk.gray(`  Created backup: ${backupPath}`));
    
    // Read and parse CSV
    const csvContent = fs.readFileSync(csvPath, 'utf-8');
    const records = parse(csvContent, {
      columns: true,
      skip_empty_lines: true,
      relax_quotes: true,
      skip_records_with_empty_values: true
    });

    // Track seen URLs and keep first occurrence
    const seenUrls = new Set();
    const uniqueRecords = [];
    const duplicateRows = [];

    records.forEach((record, index) => {
      const url = record['Image URL']?.trim();
      if (!url) return;

      if (!seenUrls.has(url)) {
        seenUrls.add(url);
        uniqueRecords.push(record);
      } else {
        duplicateRows.push(index + 2); // +2 for header and 0-based index
      }
    });

    // Generate cleaned CSV
    const output = stringify(uniqueRecords, {
      header: true,
      columns: ['Image URL', 'Description']
    });

    fs.writeFileSync(outputPath, output);
    
    // Generate report
    console.log('\n' + chalk.green('✅ CSV Cleanup Complete!'));
    console.log('='.repeat(40));
    console.log(chalk.bold('📊 Summary'));
    console.log(`- Total records: ${chalk.bold(records.length)}`);
    console.log(`- Unique records: ${chalk.green(uniqueRecords.length)}`);
    console.log(`- Duplicates removed: ${chalk.yellow(records.length - uniqueRecords.length)}`);
    
    if (duplicateRows.length > 0) {
      console.log('\n' + chalk.yellow('⚠️  Duplicate rows removed:') + ' ' + 
        duplicateRows.slice(0, 10).join(', ') + 
        (duplicateRows.length > 10 ? `, ...and ${duplicateRows.length - 10} more` : '')
      );
    }
    
    console.log('\n' + chalk.bold('💾 Output:') + ` ${outputPath}`);
    console.log(chalk.gray('  A backup of the original file was saved as: happy_campers_rv_images_descriptions.backup.csv'));
    
  } catch (error) {
    console.error(chalk.red('\n❌ Error during CSV cleanup:'));
    console.error(error);
    process.exit(1);
  }
}

cleanCSV().catch(console.error);
