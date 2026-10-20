import { useLocale } from '../../content/LocaleProvider'
import { cn } from '../../lib/cn'
import { useTheme } from '../../theme/ThemeProvider'
import { Badge } from '../ui/Badge'
import { Card } from '../ui/Card'
import { Reveal, RevealGroup, RevealItem } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import { Calendar, Info } from '../ui/Icon'

export function NewsEvents() {
  const { t } = useLocale()
  const theme = useTheme()
  const n = t.news
  const panel = theme.name === 'C' ? 'rounded-card border-2 border-blue-900 shadow-chunky' : theme.name === 'B' ? 'border-t-2 border-blue-900' : 'rounded-card shadow-soft'

  return (
    <section id="news" aria-labelledby="news-title" className="section-pad">
      <div className="container-site">
        <SectionHeading id="news-title" eyebrow={n.eyebrow} title={n.title} intro={n.intro} />

        <div className="grid gap-6 lg:grid-cols-3">
          <RevealGroup as="ul" className="grid gap-6 sm:grid-cols-2 lg:col-span-2">
            {n.events.map((ev, i) => (
              <RevealItem as="li" key={`${ev.title}-${i}`} className={i === 0 ? 'sm:col-span-2' : undefined}>
                <Card index={i}>
                  <div className="flex items-start gap-4">
                    {/* Date badge: red fill + white text (4.96:1) */}
                    <p className="flex w-16 shrink-0 flex-col items-center rounded-2xl bg-accent-red px-2 py-2 text-white">
                      <span className="font-heading text-2xl font-bold leading-none">{ev.day}</span>
                      <span className="mt-1 text-xs font-bold uppercase tracking-wider">{ev.month}</span>
                    </p>
                    <div>
                      <Badge tone="blue" className="mb-2">
                        {ev.tag}
                      </Badge>
                      <h3 className="text-h3">{ev.title}</h3>
                      <p className="mt-2 text-ink">{ev.text}</p>
                    </div>
                  </div>
                </Card>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className={cn('bg-blue-900 p-6 text-white sm:p-8', panel)} delay={0.1}>
            <h3 id="term-dates" className="flex items-center gap-2 text-h3 text-white">
              <Calendar aria-hidden="true" className="h-6 w-6 text-accent-yellow" />
              {n.termTitle}
            </h3>
            <dl className="mt-6 divide-y divide-white/15">
              {n.terms.map((term) => (
                <div key={term.term} className="flex flex-wrap items-baseline justify-between gap-2 py-3">
                  <dt className="font-bold">{term.term}</dt>
                  <dd className="text-white/90">{term.dates}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 flex items-start gap-2 text-sm text-white/90">
              <Info aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
              {n.termNote}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
