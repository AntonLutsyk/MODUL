// Builds 160px WebP thumbnails of the project photos for places that show them at 44–96px.
//   node scripts/make-thumbs.mjs   (or: npm run thumbs)
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const dir = 'public/assets/projects';
const out = path.join(dir, 'thumb');
fs.mkdirSync(out, { recursive: true });
let before = 0, after = 0;
for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.jpg'))) {
  const dest = path.join(out, f.replace(/\.jpg$/, '.webp'));
  await sharp(path.join(dir, f)).resize(160, 160, { fit: 'cover' }).webp({ quality: 74 }).toFile(dest);
  before += fs.statSync(path.join(dir, f)).size; after += fs.statSync(dest).size;
}
console.log(`thumbnails: ${(before / 1024).toFixed(0)} KB of photos → ${(after / 1024).toFixed(0)} KB of thumbnails`);
