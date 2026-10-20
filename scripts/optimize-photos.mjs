// Turns the original photos in brand/instagram/ into web-ready files in public/images/photos/:
// AVIF (smallest) + JPEG fallback at several widths, metadata (EXIF/GPS) stripped. Run: npm run photos
import { mkdirSync, statSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = (p) => fileURLToPath(new URL(`../${p}`, import.meta.url))
const outDir = root('public/images/photos/')
mkdirSync(outDir, { recursive: true })

// Instagram post code → web file name. Keep in sync with src/content/images.ts.
export const PHOTOS = {
  DVZEnj4kWbk: 'entrance-monument',
  DU3mHgniDKV: 'village-view',
  DVZDeTjEVX7: 'preprimary-classroom',
  DVUzAnejeCu: 'kiswahili-lesson',
  DVY9FLKkQdq: 'pupils-on-campus',
  DVUyuaBkaSl: 'school-family-photo',
  DVY_PjqETyQ: 'hall-performance',
  DVUzRBzjaB0: 'porridge-time',
  'DVY-jY7kdco': 'assembly-hall',
  'DVUyk-CEWcA': 'campus-path',
  DVY8_MNkcqz: 'classroom-block',
  DVY9TdpEQnX: 'campus-garden',
  DVY7Pa4EUTd: 'cattle-path',
  DVY9dH5kcM6: 'lamb',
  'DVY-EoJkfXm': 'sunset',
  'DVY9-HrEfrb': 'open-plains',
  DVUyauSEWcY: 'visitors',
}

// The hero is shown full-width under a dark overlay, so it gets more sizes and stronger compression
// (target: ≤ 150 KB for the size most phones and laptops load).
const WIDTHS = { default: [480, 960], 'entrance-monument': [640, 960, 1200], 'village-view': [480, 1080] }
const QUALITY = { default: { avif: 52, jpeg: 72 }, 'entrance-monument': { avif: 45, jpeg: 58 } }

let total = 0
for (const [code, slug] of Object.entries(PHOTOS)) {
  const input = root(`brand/instagram/ir-${code}-1.jpg`)
  const meta = await sharp(input).metadata()
  for (const w of WIDTHS[slug] ?? WIDTHS.default) {
    const width = Math.min(w, meta.width)
    const q = QUALITY[slug] ?? QUALITY.default
    const base = sharp(input).rotate().resize({ width, withoutEnlargement: true })
    // sharp drops EXIF/GPS metadata unless .withMetadata() is called.
    await base.clone().avif({ quality: q.avif, effort: 5 }).toFile(`${outDir}${slug}-${w}.avif`)
    await base.clone().jpeg({ quality: q.jpeg, mozjpeg: true, progressive: true }).toFile(`${outDir}${slug}-${w}.jpg`)
    total += statSync(`${outDir}${slug}-${w}.avif`).size
  }
  console.log(`${slug.padEnd(22)} ${meta.width}×${meta.height}`)
}
// Social sharing preview (Open Graph): 1200×630 crop of the entrance photo.
await sharp(root('brand/instagram/ir-DVZEnj4kWbk-1.jpg')).resize(1200, 630, { fit: 'cover', position: 'centre' }).jpeg({ quality: 78, mozjpeg: true }).toFile(root('public/images/og-image.jpg'))

console.log(`\nAVIF total: ${(total / 1024).toFixed(0)} KB → public/images/photos/`)
