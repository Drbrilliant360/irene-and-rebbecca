/**
 * Photos used on the site, with their real pixel sizes (prevents layout shift).
 * Originals live in brand/instagram/ (from the school's Instagram); `npm run photos`
 * turns them into the AVIF + JPEG sizes in public/images/photos/. Alt text lives in en.ts / sw.ts.
 *
 * Safeguarding: only use photos the school has parental consent for, never pair pupils'
 * full names with photos. The optimise script strips EXIF/location data.
 */

const photo = (slug: string, original: [number, number], widths = [480, 960]) => {
  const [ow, oh] = original
  const sizes = widths.map((w) => Math.min(w, ow))
  const set = (ext: string) => widths.map((w, i) => `/images/photos/${slug}-${w}.${ext} ${sizes[i]}w`).join(', ')
  const width = sizes[sizes.length - 1]
  return {
    src: `/images/photos/${slug}-${widths[widths.length - 1]}.jpg`,
    width,
    height: Math.round((width * oh) / ow),
    sources: { avif: set('avif'), srcSet: set('jpg') },
  }
}

const square = (slug: string, size = 1200) => photo(slug, [size, size])

export const images = {
  hero: photo('entrance-monument', [1200, 1200], [640, 960, 1200]),
  headTeacher: { src: '/images/head-teacher.svg', width: 600, height: 720 },
  stagePre: square('preprimary-classroom'),
  stageLower: square('kiswahili-lesson'),
  stageUpper: square('pupils-on-campus'),
  village: photo('village-view', [1080, 810], [480, 1080]),
  /** Gallery order; captions/alt text are in the same order in en.ts / sw.ts. */
  gallery: [
    square('school-family-photo'),
    square('hall-performance'),
    square('porridge-time'),
    square('assembly-hall'),
    square('campus-path'),
    square('classroom-block'),
    square('campus-garden', 1440),
    square('visitors'),
    square('cattle-path', 1125),
    square('lamb', 1440),
    square('sunset', 1440),
    square('open-plains', 1440),
  ],
} as const
