import sharp from 'sharp';
import { readdirSync, statSync, renameSync, unlinkSync } from 'fs';
import { join, extname, basename } from 'path';

const assetsDir = 'src/assets';
const MAX_WIDTH = 1920;

const files = readdirSync(assetsDir).filter(f => {
  const ext = extname(f).toLowerCase();
  return ['.png', '.jpg', '.jpeg'].includes(ext) && !f.startsWith('Student_Marks');
});

console.log(`\nCompressing ${files.length} images in ${assetsDir}...\n`);

let totalBefore = 0, totalAfter = 0;

for (const file of files) {
  const inputPath = join(assetsDir, file);
  const ext = extname(file).toLowerCase();
  const sizeBefore = statSync(inputPath).size;
  totalBefore += sizeBefore;

  try {
    const pipeline = sharp(inputPath).resize({ width: MAX_WIDTH, withoutEnlargement: true });

    if (ext === '.jpg' || ext === '.jpeg') {
      // JPEGs: re-compress with mozjpeg
      const tmpPath = inputPath + '.tmp';
      await pipeline.jpeg({ quality: 80, mozjpeg: true }).toFile(tmpPath);
      const sizeAfter = statSync(tmpPath).size;
      
      if (sizeAfter < sizeBefore) {
        renameSync(tmpPath, inputPath);
        totalAfter += sizeAfter;
        const saved = ((sizeBefore - sizeAfter) / sizeBefore * 100).toFixed(1);
        console.log(`  ✓ ${file}: ${(sizeBefore/1024).toFixed(0)}KB → ${(sizeAfter/1024).toFixed(0)}KB (${saved}% saved)`);
      } else {
        unlinkSync(tmpPath);
        totalAfter += sizeBefore;
        console.log(`  ~ ${file}: already optimal, skipping`);
      }
    } else {
      // PNGs: convert to WebP for better compression, keep original too
      const webpPath = inputPath.replace(/\.png$/i, '.webp');
      await pipeline.webp({ quality: 82 }).toFile(webpPath);
      const sizeAfter = statSync(webpPath).size;
      totalAfter += sizeAfter;
      const saved = ((sizeBefore - sizeAfter) / sizeBefore * 100).toFixed(1);
      console.log(`  ✓ ${file} → ${basename(webpPath)}: ${(sizeBefore/1024).toFixed(0)}KB → ${(sizeAfter/1024).toFixed(0)}KB (${saved}% saved)`);
    }
  } catch (err) {
    console.error(`  ✗ ${file}: ${err.message}`);
    totalAfter += sizeBefore;
  }
}

console.log(`\n──────────────────────────────────────`);
console.log(`Total before: ${(totalBefore/1024/1024).toFixed(2)}MB`);
console.log(`Total after:  ${(totalAfter/1024/1024).toFixed(2)}MB`);
console.log(`Saved: ${((totalBefore - totalAfter)/1024/1024).toFixed(2)}MB (${((totalBefore-totalAfter)/totalBefore*100).toFixed(1)}%)`);
console.log(`\nNow update your image imports to use .webp where available!`);
