import { useLocale } from '../../content/LocaleProvider'
import { icons } from '../../lib/icons'
import { cn } from '../../lib/cn'
import { useTheme } from '../../theme/ThemeProvider'
import { Card } from '../ui/Card'
import { Reveal, RevealGroup, RevealItem } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import { Check, Info } from '../ui/Icon'

export function Academics() {
  const { t } = useLocale()
  const theme = useTheme()
  const a = t.academics
  const panel = theme.name === 'C' ? 'rounded-card border-2 border-blue-900 shadow-chunky' : theme.name === 'B' ? 'border-t-2 border-blue-900' : 'rounded-card shadow-soft'

  return (
    <section id="academics" aria-labelledby="academics-title" className="section-pad">
      <div className="container-site">
        <SectionHeading id="academics-title" eyebrow={a.eyebrow} title={a.title} intro={a.intro} />

        <RevealGroup
          as="ul"
          className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] sm:-mx-6 sm:px-6 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden"
        >
          {a.stages.map((stage, i) => (
            <RevealItem as="li" key={stage.title} className="w-[82%] max-w-sm shrink-0 snap-center md:w-auto md:max-w-none">
              <Card index={i} image={stage.image} href="#admissions" linkLabel={t.cta.learnMore}>
                <p className="text-sm font-bold uppercase tracking-wider text-blue-700">{stage.range}</p>
                <h3 className="mt-1 text-h3">{stage.title}</h3>
                <p className="mt-2 text-ink">{stage.text}</p>
              </Card>
            </RevealItem>
          ))}
        </RevealGroup>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <Reveal className={cn('bg-blue-50 p-6 sm:p-8', panel)}>
            <h3 className="text-h3">{a.subjectsTitle}</h3>
            <ul className="mt-4 grid gap-x-3 gap-y-2 text-[0.9375rem] min-[360px]:grid-cols-2 sm:text-base">
              {a.subjects.map((s) => (
                <li key={s} className="flex min-w-0 items-center gap-2 [overflow-wrap:anywhere]">
                  <Check aria-hidden="true" className="h-5 w-5 shrink-0 text-accent-green-dark" />
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className={cn('bg-blue-50 p-6 sm:p-8', panel)} delay={0.1}>
            <h3 className="text-h3">{a.clubsTitle}</h3>
            <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {a.clubs.map((club) => {
                const Icon = icons[club.icon]
                return (
                  <li key={club.title} className="flex flex-col items-center gap-2 rounded-2xl bg-white p-4 text-center font-bold">
                    <Icon aria-hidden="true" className="h-7 w-7 text-blue-700" />
                    {club.title}
                  </li>
                )
              })}
            </ul>
          </Reveal>
        </div>

        <p className="mt-6 flex items-start gap-2 text-sm text-ink">
          <Info aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
          {a.note}
        </p>
      </div>
    </section>
  )
}
