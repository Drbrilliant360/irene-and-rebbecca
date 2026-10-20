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
                  <span className={cn('mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl', iconTints[i % iconTints.length])}>
                    <Icon aria-hidden="true" className="h-6 w-6" />
                  </span>
                  <h3 className="text-h3">{item.title}</h3>
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
