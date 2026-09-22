import fs from 'fs';
import path from 'path';

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    if (fs.statSync(dirFile).isDirectory()) {
      filelist = walkSync(dirFile, filelist);
    } else {
      if (dirFile.endsWith('.tsx') || dirFile.endsWith('.ts')) {
        filelist.push(dirFile);
      }
    }
  });
  return filelist;
};

const files = walkSync('src');
let filesModified = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  // Replace utility classes
  content = content.replace(/bg-red-/g, 'bg-primary-');
  content = content.replace(/text-red-/g, 'text-primary-');
  content = content.replace(/border-red-/g, 'border-primary-');
  content = content.replace(/from-red-/g, 'from-primary-');
  content = content.replace(/to-red-/g, 'to-primary-');
  content = content.replace(/via-red-/g, 'via-primary-');
  content = content.replace(/ring-red-/g, 'ring-primary-');
  content = content.replace(/shadow-red-/g, 'shadow-primary-');
  
  // Custom HEX strings in tailwind classes
  content = content.replace(/bg-\[\#ff2d2d\]/g, 'bg-primary-500');
  content = content.replace(/hover:bg-\[\#e60000\]/g, 'hover:bg-primary-600');
  
  // RGBA shadow colors (220,38,38 is red-600; 239,68,68 is red-500, 255,45,45 is custom red)
  // We'll map them to Lapis Lazuli roughly (38,97,156)
  content = content.replace(/rgba\(220,\s*38,\s*38,/g, 'rgba(38,97,156,');
  content = content.replace(/rgba\(239,\s*68,\s*68,/g, 'rgba(38,97,156,');
  content = content.replace(/rgba\(255,\s*45,\s*45,/g, 'rgba(38,97,156,');
  content = content.replace(/rgba\(153,\s*27,\s*27,/g, 'rgba(16,52,166,'); // darker

  // Replace gradient combinations to match new aesthetic
  content = content.replace(/from-emerald-500 to-teal-500/g, 'from-primary-300 to-primary-500');
  content = content.replace(/from-emerald-600 to-teal-600/g, 'from-primary-500 to-primary-600');
  content = content.replace(/from-blue-600 to-indigo-600/g, 'from-primary-500 to-primary-700');
  content = content.replace(/from-blue-700 to-indigo-700/g, 'from-primary-600 to-primary-900');
  content = content.replace(/from-rose-400 to-orange-400/g, 'from-primary-100 to-primary-300');
  content = content.replace(/to-orange-500/g, 'to-primary-500');
  content = content.replace(/to-rose-400/g, 'to-primary-300');

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    filesModified++;
  }
});

console.log(`Successfully updated ${filesModified} files.`);
