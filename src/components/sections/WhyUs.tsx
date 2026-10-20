import { useLocale } from '../../content/LocaleProvider'
import { icons } from '../../lib/icons'
import { cn } from '../../lib/cn'
import { useTheme } from '../../theme/ThemeProvider'
import { Card } from '../ui/Card'
import { RevealGroup, RevealItem } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

const iconTints = ['bg-accent-yellow text-blue-900', 'bg-accent-red text-white', 'bg-accent-green-dark text-white']

export function WhyUs() {
  const { t } = useLocale()
  const theme = useTheme()
  const w = t.whyUs

  return (
    <section id="why-us" aria-labelledby="why-title" className={cn('section-pad', theme.altSection)}>
      <div className="container-site">
        <SectionHeading id="why-title" eyebrow={w.eyebrow} title={w.title} intro={w.intro} />
        <RevealGroup as="ul" className={theme.grid}>
          {w.items.map((item, i) => {
            const Icon = icons[item.icon]
            return (
              <RevealItem as="li" key={item.title} className={theme.span(i)}>
                <Card index={i}>
                  <div className="flex items-center gap-3 sm:block">
                    <span
                      className={cn(
                        'inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl sm:mb-4 sm:h-12 sm:w-12',
                        iconTints[i % iconTints.length],
                      )}
                    >
                      <Icon aria-hidden="true" className="h-5 w-5 sm:h-6 sm:w-6" />
                    </span>
                    <h3 className="text-h3">{item.title}</h3>
                  </div>
                  <p className="mt-2 text-ink">{item.text}</p>
                </Card>
              </RevealItem>
            )
          })}
        </RevealGroup>
      </div>
    </section>
  )
}
