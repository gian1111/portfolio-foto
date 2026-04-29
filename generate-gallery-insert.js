const fs = require('fs');
const path = require('path');

const projectDir = __dirname;
const imagesDir = path.join(projectDir, 'images-optimized');
const indexFile = path.join(projectDir, 'index.html');

if (!fs.existsSync(imagesDir)) {
  console.error('Create the images-optimized/ folder and put your photos there.');
  process.exit(1);
}

const exts = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
const files = fs.readdirSync(imagesDir)
  .filter(f => exts.includes(path.extname(f).toLowerCase()))
  .sort();

// Shuffle Fisher-Yates
for (let i = files.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [files[i], files[j]] = [files[j], files[i]];
}

if (files.length === 0) {
  console.error('No images found in images/ (supported: jpg, png, webp, gif).');
  process.exit(1);
}

const items = files.map(f => {
  return `<figure class="masonry-item">
  <img src="images-optimized/${encodeURI(f)}"
       alt=""
       loading="lazy"
       data-full="images-optimized/${encodeURI(f)}" />
</figure>`;
}).join('\n\n');

const startTag = '<div class="masonry" id="masonry">';
const endTag = '</div>';

let html = fs.readFileSync(indexFile, 'utf8');

// create backup
fs.writeFileSync(indexFile + '.bak', html, 'utf8');

const startIdx = html.indexOf(startTag);
if (startIdx === -1) {
  console.error('Could not find the masonry div in index.html');
  process.exit(1);
}
const endIdx = html.indexOf(endTag, startIdx);
if (endIdx === -1) {
  console.error('Could not find the end of masonry div in index.html');
  process.exit(1);
}


const before = html.slice(0, startIdx + startTag.length);
const after = html.slice(endIdx);

const newHtml = before + '\n\n' + items + '\n\n' + after;
fs.writeFileSync(indexFile, newHtml, 'utf8');

console.log(`Gallery inserted into index.html — ${files.length} images in random order (backup saved as index.html.bak).`);