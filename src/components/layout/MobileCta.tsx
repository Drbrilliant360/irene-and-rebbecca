import { MessageCircle } from 'lucide-react'
import { useLocale } from '../../content/LocaleProvider'
import { useScrollHeader } from '../../hooks/useScrollHeader'
import { cn } from '../../lib/cn'
import { scrollToHash } from '../../lib/scrollTo'

/** Persistent "Enquire Now" pill on small phones, where the header has no room for it. */
export function MobileCta() {
  const { t } = useLocale()
  const scrolled = useScrollHeader(400)
  return (
    <a
      href="#contact"
      onClick={(e) => {
        e.preventDefault()
        scrollToHash('#contact')
      }}
      tabIndex={scrolled ? undefined : -1}
      aria-hidden={scrolled ? undefined : true}
      className={cn(
        'fixed bottom-4 right-4 z-40 inline-flex min-h-12 items-center gap-2 rounded-full bg-blue-700 px-5 font-bold text-white shadow-lift transition-[transform,opacity] duration-300 sm:hidden',
        scrolled ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0',
      )}
    >
      <MessageCircle aria-hidden="true" className="h-5 w-5" />
      {t.nav.enquire}
    </a>
  )
}
