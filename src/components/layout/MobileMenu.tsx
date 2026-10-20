import { X } from 'lucide-react'
import { AnimatePresence, m, useReducedMotion } from 'framer-motion'
import { useRef, type MouseEvent } from 'react'
import { useLocale } from '../../content/LocaleProvider'
import { NAV_IDS, type NavId } from '../../content/types'
import { useFocusTrap } from '../../hooks/useFocusTrap'
import { cn } from '../../lib/cn'
import { scrollToHash } from '../../lib/scrollTo'
import { ButtonLink } from '../ui/Button'
import { LanguageToggle } from './LanguageToggle'
import { Logo } from './Logo'

interface MobileMenuProps {
  open: boolean
  onClose: () => void
  active: NavId
}

/** Full-screen menu: focus trapped, Esc closes, focus returns to the menu button. */
export function MobileMenu({ open, onClose, active }: MobileMenuProps) {
  const reduce = useReducedMotion()
  return (
    <AnimatePresence>
      {open && (
        <m.div
          key="menu"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduce ? undefined : { opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[60] xl:hidden"
        >
          <MenuPanel onClose={onClose} active={active} />
        </m.div>
      )}
    </AnimatePresence>
  )
}

function MenuPanel({ onClose, active }: Omit<MobileMenuProps, 'open'>) {
  const { t } = useLocale()
  const ref = useRef<HTMLDivElement>(null)
  const navigating = useRef(false)
  useFocusTrap(ref, true, onClose, () => !navigating.current)

  const onNav = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    navigating.current = true
    onClose()
    scrollToHash(e.currentTarget.hash)
  }

  return (
    <div
      ref={ref}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label={t.nav.label}
      className="flex h-full flex-col overflow-y-auto bg-white"
    >
      <div className="container-site flex h-20 shrink-0 items-center justify-between">
        <Logo />
        <button
          type="button"
          onClick={onClose}
          aria-label={t.nav.closeMenu}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full text-blue-900 hover:bg-blue-50 focus-visible:bg-blue-50"
        >
          <X aria-hidden="true" className="h-7 w-7" />
        </button>
      </div>
      <nav aria-label={t.nav.label} className="container-site flex-1 py-6">
        <ul className="flex flex-col gap-1">
          {NAV_IDS.map((id) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={onNav}
                aria-current={active === id ? 'location' : undefined}
                className={cn(
                  'flex min-h-14 items-center rounded-2xl px-4 font-heading text-2xl font-bold transition-colors',
                  active === id ? 'bg-blue-50 text-blue-700' : 'text-blue-900 hover:bg-blue-50 focus-visible:bg-blue-50',
                )}
              >
                {active === id && <span aria-hidden="true" className="mr-3 h-3 w-3 rounded-full bg-accent-yellow" />}
                {t.nav[id]}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="container-site flex flex-col gap-4 pb-10">
        <LanguageToggle className="self-start" />
        <ButtonLink href="#contact" onClick={onNav} arrow className="w-full">
          {t.nav.enquire}
        </ButtonLink>
      </div>
    </div>
  )
}
