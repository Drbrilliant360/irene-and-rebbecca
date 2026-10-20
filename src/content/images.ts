/**
 * Image files and their real pixel sizes (used for width/height to prevent layout shift).
 * Swap a file in public/images/ and update its size here. Alt text lives in en.ts / sw.ts.
 *
 * Safeguarding: only use photos the school has parental consent for, never pair pupils'
 * full names with photos, and strip EXIF/location data before uploading.
 */
export const images = {
  hero: { src: '/images/hero.svg', width: 1600, height: 900 },
  headTeacher: { src: '/images/head-teacher.svg', width: 600, height: 720 },
  stagePre: { src: '/images/stage-pre-primary.svg', width: 800, height: 600 },
  stageLower: { src: '/images/stage-lower-primary.svg', width: 800, height: 600 },
  stageUpper: { src: '/images/stage-upper-primary.svg', width: 800, height: 600 },
  gallery: [
    { src: '/images/gallery-1.svg', width: 800, height: 600 },
    { src: '/images/gallery-2.svg', width: 600, height: 800 },
    { src: '/images/gallery-3.svg', width: 800, height: 800 },
    { src: '/images/gallery-4.svg', width: 600, height: 800 },
    { src: '/images/gallery-5.svg', width: 800, height: 600 },
    { src: '/images/gallery-6.svg', width: 800, height: 800 },
    { src: '/images/gallery-7.svg', width: 800, height: 600 },
    { src: '/images/gallery-8.svg', width: 600, height: 800 },
    { src: '/images/gallery-9.svg', width: 800, height: 600 },
  ],
} as const
