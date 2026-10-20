/**
 * Style directions. All three share content, components, tokens and accessibility rules;
 * only layout and decoration change. Pick the default in content/site.ts (`theme`),
 * or preview any of them with ?theme=a | b | c in the URL.
 */
export type ThemeName = 'A' | 'B' | 'C'

export interface ThemeVariant {
  name: ThemeName
  label: string
  hero: 'wave' | 'editorial' | 'bento'
  /** Base card surface. */
  card: string
  /** Shadow layer that fades in on hover/focus (opacity-only animation). */
  cardHoverShadow: string
  /** Card grid used by Why Us and Academics. */
  grid: string
  /** Extra classes for item i in a grid (bento spans). */
  span: (i: number) => string
  /** Static tilt for item i (Playful Bento). */
  tilt: (i: number) => string
  /** Whether cards lean slightly on hover (max 3°). */
  hoverTilt: boolean
  waves: boolean
  decor: 'dots' | 'none' | 'stickers'
  stats: 'band' | 'lines' | 'tiles'
  headingAlign: 'center' | 'left'
  altSection: string
}

const none = () => ''

export const variants: Record<ThemeName, ThemeVariant> = {
  A: {
    name: 'A',
    label: 'Joyful Classic',
    hero: 'wave',
    card: 'rounded-card bg-white shadow-soft',
    cardHoverShadow: 'shadow-lift',
    grid: 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3',
    span: none,
    tilt: none,
    hoverTilt: true,
    waves: true,
    decor: 'dots',
    stats: 'band',
    headingAlign: 'center',
    altSection: 'bg-blue-50',
  },
  B: {
    name: 'B',
    label: 'Modern Editorial',
    hero: 'editorial',
    card: 'rounded-none border-t-2 border-blue-900 bg-white',
    cardHoverShadow: 'shadow-soft',
    grid: 'grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3',
    span: (i) => (i === 0 ? 'lg:col-span-2' : ''),
    tilt: none,
    hoverTilt: false,
    waves: false,
    decor: 'none',
    stats: 'lines',
    headingAlign: 'left',
    altSection: 'bg-white border-y border-blue-900/10',
  },
  C: {
    name: 'C',
    label: 'Playful Bento',
    hero: 'bento',
    card: 'rounded-card border-2 border-blue-900 bg-white shadow-chunky',
    cardHoverShadow: 'shadow-chunky-lg',
    grid: 'grid gap-5 sm:grid-cols-2 lg:grid-cols-4',
    span: (i) => (i === 0 ? 'lg:col-span-2 lg:row-span-2' : i === 3 ? 'lg:col-span-2' : ''),
    tilt: (i) => (i % 3 === 1 ? 'lg:rotate-1' : i % 3 === 2 ? 'lg:-rotate-1' : ''),
    hoverTilt: false,
    waves: false,
    decor: 'stickers',
    stats: 'tiles',
    headingAlign: 'left',
    altSection: 'bg-blue-50',
  },
}

export const isThemeName = (value: unknown): value is ThemeName =>
  value === 'A' || value === 'B' || value === 'C'
