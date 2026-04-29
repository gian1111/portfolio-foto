const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, 'images');
const outputDir = path.join(__dirname, 'images-optimized');

if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

const exts = ['.jpg', '.jpeg', '.png', '.webp'];
const files = fs.readdirSync(imagesDir)
  .filter(f => exts.includes(path.extname(f).toLowerCase()));

(async () => {
  for (const file of files) {
    const input = path.join(imagesDir, file);
    const output = path.join(outputDir, path.parse(file).name + '.webp');

    await sharp(input)
      .resize(1920, null, { withoutEnlargement: true }) // max larghezza 1920px
      .webp({ quality: 80 })                            // converti in WebP, qualità 80%
      .toFile(output);

    console.log(`✓ ${file}`);
  }

  console.log(`\nDone! ${files.length} images saved in images-optimized/`);
})();