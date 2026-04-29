const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, 'images');
if (!fs.existsSync(imagesDir)) {
  console.error('Create the images/ folder and put your photos there.');
  process.exit(1);
}

const exts = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
function escapeHtml(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;'); }

const files = fs.readdirSync(imagesDir)
  .filter(f => exts.includes(path.extname(f).toLowerCase()))
  .sort();

const out = files.map(f => {
  const name = path.parse(f).name.replace(/[-_]/g, ' ');
  const alt = escapeHtml(name);
  return `<figure class="masonry-item">
  <img src="images/${encodeURI(f)}"
       alt="${alt}"
       loading="lazy"
       data-full="images/${encodeURI(f)}" />
  <figcaption>${alt}</figcaption>
</figure>`;
});

if (out.length === 0) {
  console.error('No images found in images/ (supported: jpg, png, webp, gif).');
  process.exit(1);
}

// Output to stdout so you can redirect: node generate-gallery.js > snippet.html
console.log(out.join('\n\n'));