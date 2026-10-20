// Generates lightweight SVG placeholder art in public/images/.
// Replace these with real, consented, EXIF-stripped photos (see README → Images).
// The logo and favicon are NOT generated here — they come from brand/ (see README → Logo).
// Run: npm run placeholders
import { mkdirSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const out = fileURLToPath(new URL('../public/images/', import.meta.url))
mkdirSync(out, { recursive: true })

const C = {
  navy: '#0F2D5C',
  blue: '#1E4FA3',
  sky: '#3A6FD8',
  pale: '#EEF3FC',
  yellow: '#F5C518',
  red: '#D7263D',
  green: '#1F8A4C',
  leaf: '#2FA35E',
}

const write = (name, svg) => writeFileSync(out + name, svg.replace(/\n\s*/g, '\n').trim() + '\n')

/** Rolling green hills, sun and a small school building — a nod to Kagera's landscape. */
function landscape(w, h, { label } = {}) {
  const hz = h * 0.58
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${C.sky}"/><stop offset="1" stop-color="#9DC1F5"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#sky)"/>
  <circle cx="${w * 0.8}" cy="${h * 0.22}" r="${h * 0.1}" fill="${C.yellow}"/>
  <path d="M0 ${hz} C ${w * 0.2} ${hz - h * 0.12}, ${w * 0.4} ${hz - h * 0.02}, ${w * 0.6} ${hz - h * 0.1} S ${w * 0.9} ${hz - h * 0.04}, ${w} ${hz - h * 0.08} V ${h} H 0 Z" fill="${C.leaf}"/>
  <path d="M0 ${hz + h * 0.12} C ${w * 0.25} ${hz + h * 0.02}, ${w * 0.5} ${hz + h * 0.16}, ${w * 0.75} ${hz + h * 0.06} S ${w} ${hz + h * 0.1}, ${w} ${hz + h * 0.1} V ${h} H 0 Z" fill="${C.green}"/>
  <g transform="translate(${w * 0.12} ${hz - h * 0.12})">
    <rect x="0" y="${h * 0.06}" width="${w * 0.2}" height="${h * 0.14}" fill="#FFF8E7"/>
    <polygon points="${-w * 0.015},${h * 0.065} ${w * 0.1},0 ${w * 0.215},${h * 0.065}" fill="${C.red}"/>
    <rect x="${w * 0.085}" y="${h * 0.12}" width="${w * 0.03}" height="${h * 0.08}" fill="${C.navy}"/>
    <rect x="${w * 0.025}" y="${h * 0.1}" width="${w * 0.035}" height="${h * 0.035}" fill="${C.sky}"/>
    <rect x="${w * 0.14}" y="${h * 0.1}" width="${w * 0.035}" height="${h * 0.035}" fill="${C.sky}"/>
  </g>
  ${[0.45, 0.52, 0.9].map((x, i) => `<g transform="translate(${w * x} ${hz - h * (0.02 + i * 0.01)})"><rect x="-4" y="0" width="8" height="${h * 0.1}" fill="#7A4E2D"/><ellipse cx="0" cy="0" rx="${h * 0.06}" ry="${h * 0.035}" fill="${C.leaf}"/><ellipse cx="${h * 0.03}" cy="${-h * 0.02}" rx="${h * 0.05}" ry="${h * 0.025}" fill="#3DBA6E"/></g>`).join('')}
  ${label ? caption(w, h, label) : ''}
</svg>`
}

function caption(w, h, text) {
  const fs = Math.round(Math.min(w, h) * 0.055)
  const pw = Math.min(w * 0.86, text.length * fs * 0.6 + fs * 2)
  return `<g font-family="system-ui, sans-serif" font-weight="700" text-anchor="middle">
    <rect x="${(w - pw) / 2}" y="${h - fs * 3.2}" width="${pw}" height="${fs * 2.1}" rx="${fs}" fill="${C.navy}" opacity="0.88"/>
    <text x="${w / 2}" y="${h - fs * 1.75}" font-size="${fs}" fill="#fff">${text}</text>
  </g>`
}

/** Playful scene: big soft shapes in brand colours plus a camera glyph and label. */
function scene(w, h, bg, a, b, label) {
  const r = Math.min(w, h)
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
  <rect width="${w}" height="${h}" fill="${bg}"/>
  <circle cx="${w * 0.15}" cy="${h * 0.2}" r="${r * 0.22}" fill="${a}" opacity="0.9"/>
  <circle cx="${w * 0.9}" cy="${h * 0.85}" r="${r * 0.3}" fill="${b}" opacity="0.85"/>
  <rect x="${w * 0.7}" y="${h * 0.08}" width="${r * 0.14}" height="${r * 0.14}" rx="${r * 0.03}" fill="${C.yellow}" transform="rotate(14 ${w * 0.77} ${h * 0.15})"/>
  <g transform="translate(${w / 2 - r * 0.12} ${h / 2 - r * 0.12})" fill="none" stroke="#fff" stroke-width="${r * 0.018}" stroke-linejoin="round">
    <rect x="0" y="${r * 0.05}" width="${r * 0.24}" height="${r * 0.17}" rx="${r * 0.03}"/>
    <path d="M${r * 0.07} ${r * 0.05} l${r * 0.025} -${r * 0.035} h${r * 0.05} l${r * 0.025} ${r * 0.035}"/>
    <circle cx="${r * 0.12}" cy="${r * 0.135}" r="${r * 0.045}"/>
  </g>
  ${caption(w, h, label)}
</svg>`
}

write('hero.svg', landscape(1600, 900))

write('head-teacher.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 720" width="600" height="720">
  <rect width="600" height="720" fill="${C.pale}"/>
  <circle cx="480" cy="110" r="70" fill="${C.yellow}"/>
  <circle cx="300" cy="300" r="120" fill="${C.blue}" opacity="0.9"/>
  <path d="M100 720 C 100 520, 500 520, 500 720 Z" fill="${C.blue}" opacity="0.9"/>
  ${caption(600, 720, 'Head Teacher photo')}
</svg>`)

const stages = [
  ['stage-pre-primary.svg', '#FFF4CC', C.yellow, C.red, 'Pre-Primary photo'],
  ['stage-lower-primary.svg', '#E6F4EC', C.green, C.sky, 'Lower Primary photo'],
  ['stage-upper-primary.svg', C.pale, C.sky, C.yellow, 'Upper Primary photo'],
]
for (const [name, bg, a, b, label] of stages) write(name, scene(800, 600, bg, a, b, label))

const gallery = [
  [800, 600, C.blue, C.yellow, C.green],
  [600, 800, C.green, C.yellow, C.sky],
  [800, 800, C.red, C.yellow, C.blue],
  [600, 800, C.sky, C.green, C.yellow],
  [800, 600, C.navy, C.red, C.yellow],
  [800, 800, C.green, C.sky, C.red],
  [800, 600, C.blue, C.green, C.yellow],
  [600, 800, C.red, C.sky, C.green],
  [800, 600, C.sky, C.yellow, C.red],
]
gallery.forEach(([w, h, bg, a, b], i) => write(`gallery-${i + 1}.svg`, scene(w, h, bg, a, b, `Photo ${i + 1} coming soon`)))

console.log('Placeholder images written to public/images/')
