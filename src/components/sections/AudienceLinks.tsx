import type { MouseEvent } from 'react'
import { useLocale } from '../../content/LocaleProvider'
import { icons } from '../../lib/icons'
import { cn } from '../../lib/cn'
import { scrollToHash } from '../../lib/scrollTo'
import { useTheme } from '../../theme/ThemeProvider'
import { RevealGroup, RevealItem } from '../ui/Reveal'
import { ArrowRight } from '../ui/Icon'

/** One-click routes for each audience, directly below the hero. */
export function AudienceLinks() {
  const { t } = useLocale()
  const theme = useTheme()

  const onNav = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    scrollToHash(e.currentTarget.hash)
  }

  return (
    <section aria-labelledby="audiences-title" className={cn('relative', theme.waves ? 'pb-8 pt-2' : 'py-10')}>
      <div className="container-site">
        <h2 id="audiences-title" className="sr-only">
          {t.audiences.title}
        </h2>
        <RevealGroup as="ul" className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {t.audiences.items.map((item) => {
            const Icon = icons[item.icon]
            return (
              <RevealItem as="li" key={item.id}>
                <a
                  href={item.target}
                  onClick={onNav}
                  className={cn(
                    'group relative flex h-full flex-col items-start gap-3 overflow-hidden p-4 transition-transform sm:flex-row sm:gap-4 sm:p-5 duration-300 motion-safe:hover:-translate-y-1 motion-safe:focus-visible:-translate-y-1',
                    theme.name === 'C' ? 'rounded-card border-2 border-blue-900 bg-blue-50 shadow-chunky' : theme.name === 'B' ? 'border-t-2 border-blue-900 bg-blue-50' : 'rounded-card bg-blue-50 shadow-soft',
                  )}
                >
                  {/* Fill layer grows from the bottom (transform only) */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 origin-bottom scale-y-0 bg-blue-700 transition-transform duration-300 ease-out group-hover:scale-y-100 group-focus-visible:scale-y-100"
                  />
                  <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-blue-700 shadow-soft sm:h-12 sm:w-12">
                    <Icon aria-hidden="true" className="h-6 w-6 motion-safe:group-hover:animate-bounce-once motion-safe:group-focus-visible:animate-bounce-once" />
                  </span>
                  <ArrowRight
                    aria-hidden="true"
                    className="absolute right-3 top-4 h-5 w-5 text-blue-700 sm:right-4 sm:top-5 transition-[transform,color] group-hover:translate-x-1 group-hover:text-white group-focus-visible:translate-x-1 group-focus-visible:text-white"
                  />
                  <span className="relative flex-1 sm:pr-6">
                    <span className="block font-heading text-base font-bold leading-snug text-blue-900 sm:text-lg transition-colors group-hover:text-white group-focus-visible:text-white">
                      {item.title}
                    </span>
                    <span className="mt-1 block text-sm text-ink transition-colors sm:text-base group-hover:text-white group-focus-visible:text-white">
                      {item.text}
                    </span>
                  </span>
                </a>
              </RevealItem>
            )
          })}
        </RevealGroup>
      </div>
    </section>
  )
}
