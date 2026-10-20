import { lazy, Suspense } from 'react'
import { useLocale } from '../../content/LocaleProvider'
import { cn } from '../../lib/cn'
import { useTheme } from '../../theme/ThemeProvider'
import { SectionHeading } from '../ui/SectionHeading'

const Carousel = lazy(() => import('../ui/Carousel'))

export function Testimonials() {
  const { t } = useLocale()
  const theme = useTheme()
  const first = t.testimonials.items[0]

  // Until the carousel chunk arrives, show the first quote so nothing jumps.
  const fallback = (
    <figure className="mx-auto min-h-[16rem] max-w-3xl rounded-card bg-white p-8 text-center shadow-soft sm:p-12">
      <blockquote className="text-xl font-semibold sm:text-2xl">
        <p>“{first.quote}”</p>
      </blockquote>
      <figcaption className="mt-6 font-bold">{first.name}</figcaption>
    </figure>
  )

  return (
    <section aria-labelledby="testimonials-title" className={cn('section-pad', theme.altSection)}>
      <div className="container-site">
        <SectionHeading id="testimonials-title" eyebrow={t.testimonials.eyebrow} title={t.testimonials.title} align="center" />
        <Suspense fallback={fallback}>
          <Carousel labels={t.testimonials} />
        </Suspense>
      </div>
    </section>
  )
}
