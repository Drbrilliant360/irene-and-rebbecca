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
        <RevealGroup as="ul" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.audiences.items.map((item) => {
            const Icon = icons[item.icon]
            return (
              <RevealItem as="li" key={item.id}>
                <a
                  href={item.target}
                  onClick={onNav}
                  className={cn(
                    'group relative flex h-full items-start gap-4 overflow-hidden p-5 transition-transform duration-300 motion-safe:hover:-translate-y-1 motion-safe:focus-visible:-translate-y-1',
                    theme.name === 'C' ? 'rounded-card border-2 border-blue-900 bg-blue-50 shadow-chunky' : theme.name === 'B' ? 'border-t-2 border-blue-900 bg-blue-50' : 'rounded-card bg-blue-50 shadow-soft',
                  )}
                >
                  {/* Fill layer grows from the bottom (transform only) */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 origin-bottom scale-y-0 bg-blue-700 transition-transform duration-300 ease-out group-hover:scale-y-100 group-focus-visible:scale-y-100"
                  />
                  <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-blue-700 shadow-soft">
                    <Icon aria-hidden="true" className="h-6 w-6 motion-safe:group-hover:animate-bounce-once motion-safe:group-focus-visible:animate-bounce-once" />
                  </span>
                  <span className="relative flex-1">
                    <span className="flex items-center gap-2 font-heading text-lg font-bold text-blue-900 transition-colors group-hover:text-white group-focus-visible:text-white">
                      {item.title}
                      <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1 group-focus-visible:translate-x-1" />
                    </span>
                    <span className="mt-1 block text-ink transition-colors group-hover:text-white group-focus-visible:text-white">
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
