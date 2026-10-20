import { useLocale } from '../../content/LocaleProvider'
import { isPlaceholder, mailHref, site, telHref } from '../../content/site'
import { NAV_IDS } from '../../content/types'
import { Logo } from './Logo'
import { ArrowUp, ChevronDown, Instagram, Mail, MapPin, Phone } from '../ui/Icon'

const linkClass = 'inline-flex min-h-11 items-center text-white/90 underline-offset-4 hover:text-white hover:underline focus-visible:text-white'

function Detail({ icon: Icon, value, href }: { icon: typeof Phone; value: string; href?: string }) {
  const text = isPlaceholder(value) ? <span className="text-white/80">{value}</span> : value
  return (
    <li className="flex items-start gap-3">
      <Icon aria-hidden="true" className="mt-3 h-5 w-5 shrink-0 text-accent-yellow" />
      {href ? (
        <a href={href} className={linkClass}>
          {text}
        </a>
      ) : (
        <span className="py-2.5">{text}</span>
      )}
    </li>
  )
}

export function Footer() {
  const { t } = useLocale()
  const year = new Date().getFullYear()

  return (
    <footer className="bg-blue-900 text-white">
      <div className="container-site grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <Logo inverted />
          <p className="mt-4 max-w-sm text-white/90">{t.footer.description}</p>
          <p className="mt-4 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-bold">
            Reg. No. {site.regNo} · {site.regNo2} · {site.district} District, {site.region} Region, {site.country}
          </p>
        </div>

        <nav aria-labelledby="footer-links">
          <h2 id="footer-links" className="font-heading text-lg font-bold text-white">
            {t.footer.quickLinks}
          </h2>
          <ul className="mt-3">
            {NAV_IDS.map((id) => (
              <li key={id}>
                <a href={`#${id}`} className={linkClass}>
                  {t.nav[id]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-heading text-lg font-bold text-white">{t.footer.contactTitle}</h2>
          <ul className="mt-3 space-y-1">
            <Detail icon={Phone} value={site.phone} href={telHref(site.phone)} />
            <Detail icon={Mail} value={site.email} href={mailHref(site.email)} />
            <Detail icon={MapPin} value={site.address} />
            <li className="flex items-start gap-3">
              <Instagram aria-hidden="true" className="mt-3 h-5 w-5 shrink-0 text-accent-yellow" />
              <a href={site.instagram} target="_blank" rel="noopener noreferrer" className={linkClass}>
                {site.instagramHandle}
                <span className="sr-only"> {t.meta.opensNewTab}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-site">
        <details id="privacy" className="group rounded-2xl bg-white/5 px-5 py-1 open:pb-5">
          <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 font-bold underline-offset-4 hover:underline [&::-webkit-details-marker]:hidden">
            {t.footer.privacy}
            <ChevronDown className="h-5 w-5 shrink-0 transition-transform duration-300 group-open:rotate-180" />
          </summary>
          <div className="max-w-measure space-y-3 text-white/90">
            {t.footer.privacyText.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </details>
      </div>

      <div className="container-site flex flex-col gap-4 border-t border-white/15 py-6 mt-8 text-sm text-white/90 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {site.name}. {t.footer.rights}
        </p>
        <a href="#home" className={`${linkClass} gap-2`}>
          <ArrowUp aria-hidden="true" className="h-4 w-4" />
          {t.footer.backToTop}
        </a>
      </div>
    </footer>
  )
}
