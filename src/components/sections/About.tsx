import { useLocale } from '../../content/LocaleProvider'
import { cn } from '../../lib/cn'
import { useTheme } from '../../theme/ThemeProvider'
import { DotCluster } from '../ui/Decor'
import { Reveal } from '../ui/Reveal'
import { SafeImage } from '../ui/SafeImage'
import { SectionHeading } from '../ui/SectionHeading'
import { BadgeCheck, Compass, Target } from '../ui/Icon'

export function About() {
  const { t } = useLocale()
  const theme = useTheme()
  const a = t.about

  return (
    <section id="about" aria-labelledby="about-title" className="section-pad relative overflow-hidden">
      {theme.decor === 'dots' && <DotCluster className="right-4 top-10 hidden opacity-70 md:block" />}
      <div className="container-site">
        <SectionHeading id="about-title" eyebrow={a.eyebrow} title={a.title} />

        {/* Mission statement in large, confident type */}
        <Reveal>
          <p
            className={cn(
              'max-w-4xl font-heading text-mission font-semibold text-blue-900',
              theme.headingAlign === 'center' && 'mx-auto text-center',
            )}
          >
            {a.statement}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {[
            { ...a.mission, Icon: Target, accent: 'bg-accent-yellow' },
            { ...a.vision, Icon: Compass, accent: 'bg-accent-green' },
          ].map(({ title, text, Icon, accent }) => (
            <Reveal key={title} className={cn('relative p-6 sm:p-8', theme.card)}>
              <span className={cn('mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl text-blue-900', accent)}>
                <Icon aria-hidden="true" className="h-6 w-6" />
              </span>
              <h3 className="text-h3">{title}</h3>
              <p className="mt-2 text-ink">{text}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12">
          <figure
            className={cn(
              'overflow-hidden',
              theme.name === 'C' ? 'rounded-card border-2 border-blue-900 shadow-chunky' : theme.name === 'B' ? '' : 'rounded-card shadow-soft',
            )}
          >
            <SafeImage
              {...a.setting}
              sizes="(min-width: 1152px) 1088px, 100vw"
              className="aspect-[4/3] w-full object-cover sm:aspect-[21/9]"
            />
            <figcaption className="bg-blue-50 px-5 py-3 text-ink">{a.setting.caption}</figcaption>
          </figure>
        </Reveal>

        <div className="mt-12 grid items-center gap-8 sm:mt-16 sm:gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <figure
              className={cn(
                'relative mx-auto max-w-[15rem] overflow-hidden sm:max-w-sm',
                theme.name === 'C' ? 'rounded-card border-2 border-blue-900 shadow-chunky lg:-rotate-2' : theme.name === 'B' ? '' : 'rounded-card shadow-lift',
              )}
            >
              <SafeImage {...a.welcome.image} sizes="(min-width: 1024px) 30vw, 90vw" className="h-auto w-full object-cover" />
              <figcaption className="bg-blue-900 px-5 py-4 text-white">
                <span className="block font-heading text-lg font-bold">{a.welcome.name}</span>
                <span className="text-white/90">{a.welcome.role}</span>
              </figcaption>
            </figure>
          </Reveal>
          <Reveal className="lg:col-span-7" delay={0.1}>
            <h3 className="text-h2">{a.welcome.title}</h3>
            <div className="mt-4 max-w-measure space-y-4 text-lg text-ink">
              {a.welcome.text.map((p) => (
                <p key={p}>{p}</p>
              ))}
              {a.story.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <p className="mt-6 inline-flex items-center gap-2 rounded-full border-2 border-accent-green-dark bg-white px-4 py-2 font-bold text-accent-green-dark">
              <BadgeCheck aria-hidden="true" className="h-5 w-5" />
              {a.regBadge}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
