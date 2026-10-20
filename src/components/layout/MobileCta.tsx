import { useEffect, useState } from 'react'
import { useLocale } from '../../content/LocaleProvider'
import { useScrollHeader } from '../../hooks/useScrollHeader'
import { cn } from '../../lib/cn'
import { scrollToHash } from '../../lib/scrollTo'
import { Message } from '../ui/Icon'

/**
 * Persistent "Enquire Now" pill on small phones, where the header has no room for it.
 * Appears after the hero and hides while the contact section (its destination) is on screen.
 */
export function MobileCta() {
  const { t } = useLocale()
  const scrolled = useScrollHeader(400)
  const [atContact, setAtContact] = useState(false)

  useEffect(() => {
    const contact = document.getElementById('contact')
    if (!contact || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(([entry]) => setAtContact(entry.isIntersecting), { threshold: 0.05 })
    io.observe(contact)
    return () => io.disconnect()
  }, [])

  const visible = scrolled && !atContact

  return (
    <a
      href="#contact"
      onClick={(e) => {
        e.preventDefault()
        scrollToHash('#contact')
      }}
      tabIndex={visible ? undefined : -1}
      aria-hidden={visible ? undefined : true}
      style={{ bottom: 'max(1rem, env(safe-area-inset-bottom))' }}
      className={cn(
        'fixed right-4 z-40 inline-flex min-h-12 items-center gap-2 rounded-full bg-blue-700 px-5 font-bold text-white shadow-lift transition-[transform,opacity] duration-300 sm:hidden',
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0',
      )}
    >
      <Message aria-hidden="true" className="h-5 w-5" />
      {t.nav.enquire}
    </a>
  )
}
