import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const assetsDir = path.resolve('./src/assets');
const files = fs.readdirSync(assetsDir);

async function optimize() {
  for (const file of files) {
    if (file.endsWith('.png') || file.endsWith('.jpg')) {
      const filePath = path.join(assetsDir, file);
      const tempPath = path.join(assetsDir, 'temp_' + file);
      
      console.log(`Optimizing ${file}...`);
      
      fs.copyFileSync(filePath, tempPath);
      
      try {
        if (file.endsWith('.png')) {
          await sharp(tempPath).png({ quality: 60, compressionLevel: 9, palette: true }).toFile(filePath);
        } else if (file.endsWith('.jpg')) {
          await sharp(tempPath).jpeg({ quality: 60, mozjpeg: true }).toFile(filePath);
        }
        console.log(`Finished ${file}`);
      } catch (err) {
        console.error(`Error with ${file}:`, err);
        // revert
        fs.copyFileSync(tempPath, filePath);
      } finally {
        fs.unlinkSync(tempPath);
      }
    }
  }
}

optimize();
