import { CheckCircle2 } from 'lucide-react'
import { m, useReducedMotion } from 'framer-motion'
import { Fragment, type MouseEvent } from 'react'
import { useLocale } from '../../content/LocaleProvider'
import { site } from '../../content/site'
import { cn } from '../../lib/cn'
import { scrollToHash } from '../../lib/scrollTo'
import { useTheme } from '../../theme/ThemeProvider'
import { Badge } from '../ui/Badge'
import { ButtonLink } from '../ui/Button'
import { FloatingShape } from '../ui/Decor'
import { SafeImage } from '../ui/SafeImage'
import { WaveDivider } from '../ui/WaveDivider'

const normalise = (word: string) => word.replace(/[^\p{L}’']/gu, '').toLowerCase()

/** Headline whose words rise in one by one; the highlight word gets a hand-drawn yellow underline. */
function Headline({ text, highlight, className }: { text: string; highlight: string; className?: string }) {
  const reduce = useReducedMotion()
  const words = text.split(' ')
  const underlineDelay = 0.15 + words.length * 0.08

  return (
    <h1 id="hero-title" className={cn('font-heading text-display font-bold', className)}>
      {words.map((word, i) => {
        const isHighlight = normalise(word) === normalise(highlight)
        return (
          <Fragment key={`${word}-${i}`}>
            <m.span
              className="relative inline-block"
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="relative z-10">{word}</span>
              {isHighlight && (
                <svg
                  aria-hidden="true"
                  viewBox="0 0 200 20"
                  preserveAspectRatio="none"
                  className="absolute -bottom-1 left-0 h-3 w-full sm:h-4"
                >
                  <m.path
                    d="M3 14 C 40 4, 90 4, 120 10 S 180 16, 197 6"
                    fill="none"
                    stroke="var(--yellow)"
                    strokeWidth="7"
                    strokeLinecap="round"
                    initial={reduce ? false : { pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.7, delay: underlineDelay, ease: 'easeOut' }}
                  />
                </svg>
              )}
            </m.span>{' '}
          </Fragment>
        )
      })}
    </h1>
  )
}

function Ctas({ inverted }: { inverted: boolean }) {
  const { t } = useLocale()
  const onNav = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    scrollToHash(e.currentTarget.hash)
  }
  return (
    <div className="mt-8 flex flex-wrap gap-3">
      <ButtonLink href="#contact" onClick={onNav} variant="accent" arrow>
        {t.cta.visit}
      </ButtonLink>
      <ButtonLink href="#admissions" onClick={onNav} variant={inverted ? 'light' : 'outline'}>
        {t.cta.apply}
      </ButtonLink>
      <ButtonLink href="#contact" onClick={onNav} variant={inverted ? 'light' : 'outline'}>
        {t.cta.enquire}
      </ButtonLink>
    </div>
  )
}

function AdmissionsBadge() {
  const { t } = useLocale()
  return (
    <Badge tone="green" className="shadow-soft">
      <CheckCircle2 aria-hidden="true" className="h-4 w-4" />
      {t.hero.badge}
    </Badge>
  )
}

export function Hero() {
  const { t } = useLocale()
  const theme = useTheme()
  const image = t.hero.image

  if (theme.hero === 'editorial') {
    return (
      <section id="home" aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-blue-900">
        <SafeImage {...image} priority sizes="100vw" className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-900 via-blue-900/85 to-blue-900/40" />
        <div className="container-site flex min-h-[78vh] flex-col justify-center py-20">
          <div className="max-w-3xl border-l-2 border-white/40 pl-6 sm:pl-10">
            <AdmissionsBadge />
            <Headline text={t.hero.headline} highlight={t.hero.highlight} className="mt-6 text-white" />
            <p className="mt-6 max-w-measure text-lg text-white/90 sm:text-xl">{t.hero.subline}</p>
            <Ctas inverted />
          </div>
        </div>
      </section>
    )
  }

  if (theme.hero === 'bento') {
    return (
      <section id="home" aria-labelledby="hero-title" className="bg-blue-50 py-10 sm:py-14">
        <div className="container-site grid gap-5 lg:grid-cols-12">
          <div className="relative rounded-card border-2 border-blue-900 bg-blue-700 p-8 text-white shadow-chunky sm:p-12 lg:col-span-7">
            <AdmissionsBadge />
            <Headline text={t.hero.headline} highlight={t.hero.highlight} className="mt-6 text-white" />
            <p className="mt-6 max-w-measure text-lg text-white/90">{t.hero.subline}</p>
            <Ctas inverted />
          </div>
          <div className="grid gap-5 lg:col-span-5">
            <div className="relative overflow-hidden rounded-card border-2 border-blue-900 shadow-chunky lg:rotate-1">
              <SafeImage {...image} priority sizes="(min-width: 1024px) 40vw, 100vw" className="h-full w-full object-cover" />
              <span className="absolute left-4 top-4 -rotate-6 rounded-full border-2 border-blue-900 bg-accent-yellow px-4 py-1.5 font-heading font-bold text-blue-900">
                {site.district} · {site.region}
              </span>
            </div>
            <div className="hidden grid-cols-3 gap-5 sm:grid">
              <span aria-hidden="true" className="h-16 rounded-2xl border-2 border-blue-900 bg-accent-yellow shadow-chunky" />
              <span aria-hidden="true" className="h-16 -rotate-2 rounded-2xl border-2 border-blue-900 bg-accent-red shadow-chunky" />
              <span aria-hidden="true" className="h-16 rotate-2 rounded-2xl border-2 border-blue-900 bg-accent-green shadow-chunky" />
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="home" aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-blue-900">
      <SafeImage {...image} priority sizes="100vw" className="absolute inset-0 -z-10 h-full w-full object-cover" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-900/95 via-blue-700/85 to-blue-700/55" />
      <FloatingShape className="right-[8%] top-16 h-16 w-16 rounded-full bg-accent-yellow/90" duration={7} />
      <FloatingShape className="right-[22%] top-[55%] hidden h-8 w-8 rounded-lg bg-accent-red/90 sm:block" duration={8} delay={1} />
      <FloatingShape className="left-[55%] top-10 hidden h-6 w-6 rounded-full bg-accent-green sm:block" duration={6} delay={0.5} />
      <div className="container-site relative pb-16 pt-14 sm:pb-24 sm:pt-20 lg:pb-32 lg:pt-28">
        <div className="max-w-3xl">
          <AdmissionsBadge />
          <Headline text={t.hero.headline} highlight={t.hero.highlight} className="mt-6 text-white" />
          <p className="mt-6 max-w-measure text-lg text-white/95 sm:text-xl">{t.hero.subline}</p>
          <Ctas inverted />
        </div>
      </div>
      <WaveDivider className="-mb-px" />
    </section>
  )
}
