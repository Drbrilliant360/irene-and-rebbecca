import { lazy, Suspense, useState } from 'react'
import { useLocale } from '../../content/LocaleProvider'
import { isPlaceholder, mailHref, site, telHref, whatsappHref } from '../../content/site'
import { cn } from '../../lib/cn'
import { useTheme } from '../../theme/ThemeProvider'
import { Button, ButtonLink } from '../ui/Button'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import { Briefcase, Clock, Mail, MapPin, Phone, WhatsApp } from '../ui/Icon'
const MapFrame = lazy(() => import('./MapFrame'))
// react-hook-form + zod live in their own chunk so they don't delay the first paint.
const ContactForm = lazy(() => import('./ContactForm'))

function DetailRow({ icon: Icon, label, value, href }: { icon: typeof Phone; label: string; value: string; href?: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-blue-700">
        <Icon aria-hidden="true" className="h-5 w-5" />
      </span>
      <div>
        <dt className="text-sm font-bold text-ink">{label}</dt>
        <dd className="font-bold">
          {href ? (
            <a href={href} className="text-blue-700 underline-offset-4 hover:underline">
              {value}
            </a>
          ) : (
            <span className={cn(isPlaceholder(value) && 'placeholder-chip')}>{value}</span>
          )}
        </dd>
      </div>
    </div>
  )
}

function MapBlock() {
  const { t } = useLocale()
  const [load, setLoad] = useState(false)
  const m = t.contact.map

  return (
    <div className="overflow-hidden rounded-card bg-blue-50">
      <div className="aspect-[4/3] w-full sm:aspect-video">
        {load && site.mapEmbedUrl ? (
          <Suspense fallback={null}>
            <MapFrame src={site.mapEmbedUrl} title={`${m.title} — ${site.name}`} />
          </Suspense>
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
            <MapPin aria-hidden="true" className="h-10 w-10 text-accent-red" />
            <p className="font-heading text-lg font-bold">
              {site.district}, {site.region}
            </p>
            {site.mapEmbedUrl ? (
              <>
                <Button variant="outline" size="sm" onClick={() => setLoad(true)}>
                  {m.load}
                </Button>
                <p className="text-sm text-ink">{m.note}</p>
              </>
            ) : (
              <p className="text-sm text-ink">{m.unavailable}</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export function Contact() {
  const { t } = useLocale()
  const theme = useTheme()
  const c = t.contact
  const wa = whatsappHref(site.whatsapp)
  const panel = theme.name === 'C' ? 'rounded-card border-2 border-blue-900 shadow-chunky' : theme.name === 'B' ? 'border-t-2 border-blue-900' : 'rounded-card shadow-soft'

  return (
    <section id="contact" aria-labelledby="contact-title" className={cn('section-pad', theme.altSection)}>
      <div className="container-site">
        <SectionHeading id="contact-title" eyebrow={c.eyebrow} title={c.title} intro={c.intro} />

        <div className="grid gap-8 lg:grid-cols-12">
          <Reveal className={cn('relative bg-white p-6 sm:p-8 lg:col-span-7', panel)}>
            <Suspense fallback={<div className="min-h-[40rem]" aria-busy="true" />}>
              <ContactForm />
            </Suspense>
          </Reveal>

          <div className="space-y-6 lg:col-span-5">
            <Reveal className={cn('bg-white p-6 sm:p-8', panel)} delay={0.1}>
              <h3 className="text-h3">{c.details.title}</h3>
              <dl className="mt-5 space-y-4">
                <DetailRow icon={Phone} label={c.details.phone} value={site.phone} href={telHref(site.phone)} />
                <DetailRow icon={Mail} label={c.details.email} value={site.email} href={mailHref(site.email)} />
                <DetailRow icon={MapPin} label={c.details.address} value={`${site.address} · ${site.district}, ${site.region}`} />
                <DetailRow icon={Clock} label={c.details.hoursTitle} value={c.details.hours.join(' · ')} />
              </dl>
              <div className="mt-6">
                {wa ? (
                  <ButtonLink href={wa} variant="whatsapp">
                    <WhatsApp aria-hidden="true" className="h-5 w-5" />
                    {c.whatsapp}
                    <span className="sr-only"> {t.meta.opensNewTab}</span>
                  </ButtonLink>
                ) : (
                  <span className="inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-dashed border-accent-green-dark px-5 font-bold text-accent-green-dark">
                    <WhatsApp aria-hidden="true" className="h-5 w-5" />
                    {c.whatsapp} · {site.whatsapp}
                  </span>
                )}
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <h3 className="mb-3 text-h3">{c.map.title}</h3>
              <MapBlock />
            </Reveal>

            <Reveal className={cn('bg-blue-900 p-6 text-white sm:p-8', panel)} delay={0.2}>
              <h3 id="staff" className="flex items-center gap-2 text-h3 text-white">
                <Briefcase aria-hidden="true" className="h-6 w-6 text-accent-yellow" />
                {c.staff.title}
              </h3>
              <p className="mt-2 text-white/90">{c.staff.text}</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
