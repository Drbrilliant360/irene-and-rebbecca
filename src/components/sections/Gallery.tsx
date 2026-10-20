import { Expand, Instagram } from 'lucide-react'
import { lazy, Suspense, useState } from 'react'
import { useLocale } from '../../content/LocaleProvider'
import { site } from '../../content/site'
import { cn } from '../../lib/cn'
import { useTheme } from '../../theme/ThemeProvider'
import { ButtonLink } from '../ui/Button'
import { Reveal, RevealGroup, RevealItem } from '../ui/Reveal'
import { SafeImage } from '../ui/SafeImage'
import { SectionHeading } from '../ui/SectionHeading'

const Lightbox = lazy(() => import('../ui/Lightbox'))
const preloadLightbox = () => void import('../ui/Lightbox')

/** "Life at school" mosaic. A static, local gallery — no Instagram embed script. */
export function Gallery() {
  const { t } = useLocale()
  const theme = useTheme()
  const g = t.gallery
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="section-pad">
      <div className="container-site">
        <SectionHeading id="gallery-title" eyebrow={g.eyebrow} title={g.title} intro={g.intro} />

        <RevealGroup as="ul" className="columns-2 gap-4 md:columns-3 [&>li]:mb-4">
          {g.images.map((img, i) => (
            <RevealItem as="li" key={img.src} className="break-inside-avoid">
              <button
                type="button"
                onClick={() => setOpen(i)}
                aria-label={`${g.open}: ${img.caption}`}
                onPointerEnter={preloadLightbox}
                onFocus={preloadLightbox}
                className={cn(
                  'group relative block w-full overflow-hidden text-left',
                  theme.name === 'C' ? 'rounded-card border-2 border-blue-900 shadow-chunky' : theme.name === 'B' ? '' : 'rounded-card',
                  theme.name === 'C' && (i % 2 ? 'lg:rotate-1' : 'lg:-rotate-1'),
                )}
              >
                <SafeImage
                  {...img}
                  sizes="(min-width: 768px) 33vw, 50vw"
                  className="h-auto w-full transition-transform duration-500 motion-safe:group-hover:scale-105 motion-safe:group-focus-visible:scale-105"
                />
                <span className="absolute inset-0 flex items-end bg-gradient-to-t from-blue-900/90 via-blue-900/40 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <span className="flex w-full items-center justify-between gap-2 font-bold text-white">
                    {img.caption}
                    <Expand aria-hidden="true" className="h-5 w-5 shrink-0" />
                  </span>
                </span>
              </button>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-10 flex justify-center">
          <ButtonLink href={site.instagram} variant="outline">
            <Instagram aria-hidden="true" className="h-5 w-5" />
            {g.follow}
            <span className="sr-only"> {t.meta.opensNewTab}</span>
          </ButtonLink>
        </Reveal>
      </div>

      {open !== null && (
        <Suspense fallback={null}>
          <Lightbox images={g.images} index={open} onIndexChange={setOpen} onClose={() => setOpen(null)} labels={g.lightbox} />
        </Suspense>
      )}
    </section>
  )
}
