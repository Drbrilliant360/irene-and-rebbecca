import { m, useReducedMotion, useScroll } from 'framer-motion'
import { useRef, type MouseEvent } from 'react'
import { useLocale } from '../../content/LocaleProvider'
import { site } from '../../content/site'
import { cn } from '../../lib/cn'
import { scrollToHash } from '../../lib/scrollTo'
import { useTheme } from '../../theme/ThemeProvider'
import { ButtonLink } from '../ui/Button'
import { Reveal, RevealGroup, RevealItem } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import { Download, FileText, Wallet } from '../ui/Icon'

const stepColours = ['bg-accent-yellow text-blue-900', 'bg-accent-red text-white', 'bg-accent-green-dark text-white', 'bg-blue-700 text-white']

/** Enquire → Visit → Apply → Join, with a connecting line that draws as you scroll. */
function Timeline() {
  const { t } = useLocale()
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 55%'] })

  return (
    <div ref={ref} className="relative">
      {/* Vertical line (mobile) */}
      <div aria-hidden="true" className="absolute bottom-6 left-6 top-6 w-1 -translate-x-1/2 rounded-full bg-blue-900/10 lg:hidden">
        <m.div className="h-full w-full origin-top rounded-full bg-blue-700" style={reduce ? undefined : { scaleY: scrollYProgress }} />
      </div>
      {/* Horizontal line (desktop) */}
      <div aria-hidden="true" className="absolute left-[12.5%] right-[12.5%] top-6 hidden h-1 -translate-y-1/2 rounded-full bg-blue-900/10 lg:block">
        <m.div className="h-full w-full origin-left rounded-full bg-blue-700" style={reduce ? undefined : { scaleX: scrollYProgress }} />
      </div>

      <RevealGroup as="ol" className="relative grid gap-8 lg:grid-cols-4 lg:gap-6">
        {t.admissions.steps.map((step, i) => (
          <RevealItem as="li" key={step.title} className="flex gap-5 lg:flex-col lg:items-center lg:text-center">
            <span
              className={cn(
                'relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-heading text-xl font-bold ring-4 ring-white',
                stepColours[i],
              )}
            >
              {i + 1}
            </span>
            <div>
              <h3 className="text-h3">{step.title}</h3>
              <p className="mt-1 text-ink">{step.text}</p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  )
}

export function Admissions() {
  const { t } = useLocale()
  const theme = useTheme()
  const a = t.admissions
  const panel = theme.name === 'C' ? 'rounded-card border-2 border-blue-900 shadow-chunky' : theme.name === 'B' ? 'border-t-2 border-blue-900' : 'rounded-card shadow-soft'

  const onNav = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    scrollToHash(e.currentTarget.hash)
  }

  return (
    <section id="admissions" aria-labelledby="admissions-title" className={cn('section-pad', theme.altSection)}>
      <div className="container-site">
        <SectionHeading id="admissions-title" eyebrow={a.eyebrow} title={a.title} intro={a.intro} />
        <Timeline />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <Reveal className={cn('bg-white p-6 sm:p-8', panel)}>
            <h3 className="flex items-center gap-2 text-h3">
              <FileText aria-hidden="true" className="h-6 w-6 text-blue-700" />
              {a.docsTitle}
            </h3>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-ink marker:text-blue-700">
              {a.docs.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal className={cn('flex flex-col bg-white p-6 sm:p-8', panel)} delay={0.1}>
            <h3 className="flex items-center gap-2 text-h3">
              <Wallet aria-hidden="true" className="h-6 w-6 text-blue-700" />
              {a.feesTitle}
            </h3>
            <p className="mt-4 text-ink">{a.feesText}</p>
            <div className="mt-auto flex flex-wrap gap-3 pt-6">
              <ButtonLink href="#contact" onClick={onNav} arrow>
                {t.cta.apply}
              </ButtonLink>
              {site.prospectusUrl ? (
                <ButtonLink href={site.prospectusUrl} variant="outline" download>
                  <Download aria-hidden="true" className="h-4 w-4" />
                  {a.prospectus}
                </ButtonLink>
              ) : (
                <span className="inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-dashed border-blue-900/30 px-5 font-bold text-ink">
                  <Download aria-hidden="true" className="h-4 w-4" />
                  {a.prospectusSoon}
                </span>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
