import sharp from 'sharp';
import { readdirSync, statSync, existsSync, mkdirSync } from 'fs';
import { join, extname, basename } from 'path';

const inputDir  = './src/assets';
const outputDir = './public/assets';

if (!existsSync(outputDir)) mkdirSync(outputDir, { recursive: true });

const files = readdirSync(inputDir);

for (const file of files) {
  const ext = extname(file).toLowerCase();
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue;

  const inputPath   = join(inputDir, file);
  const webpFile    = basename(file, ext) + '.webp';
  const outputPath  = join(outputDir, webpFile);
  const sizeMB = statSync(inputPath).size / (1024 * 1024);

  await sharp(inputPath)
    .webp({ quality: 78 })
    .resize({ width: 1600, withoutEnlargement: true })
    .toFile(outputPath);

  const newSize = statSync(outputPath).size / (1024 * 1024);
  console.log(`${file}  ${sizeMB.toFixed(1)}MB → ${newSize.toFixed(2)}MB (webp)`);
}

console.log('\nDone!');
