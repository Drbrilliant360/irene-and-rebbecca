import { Menu } from 'lucide-react'
import { useRef, useState, type MouseEvent } from 'react'
import { useLocale } from '../../content/LocaleProvider'
import { NAV_IDS } from '../../content/types'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useScrollHeader } from '../../hooks/useScrollHeader'
import { cn } from '../../lib/cn'
import { scrollToHash } from '../../lib/scrollTo'
import { ButtonLink } from '../ui/Button'
import { LanguageToggle } from './LanguageToggle'
import { Logo } from './Logo'
import { MobileMenu } from './MobileMenu'

/**
 * Fixed header. Shrinking is done with transforms only (background layer scales,
 * contents move up), so nothing on the page shifts.
 */
export function Header() {
  const { t } = useLocale()
  const scrolled = useScrollHeader()
  const active = useActiveSection(NAV_IDS)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)

  const onNav = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    scrollToHash(e.currentTarget.hash)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-20">
      <div
        aria-hidden="true"
        className={cn(
          'absolute inset-0 origin-top bg-white transition-[transform,box-shadow] duration-300 ease-out',
          scrolled ? 'scale-y-[0.8] shadow-header' : 'scale-y-100',
        )}
      />
      <div
        className={cn(
          'container-site relative flex h-20 items-center justify-between gap-4 transition-transform duration-300 ease-out',
          scrolled && '-translate-y-2',
        )}
      >
        <a
          href="#home"
          onClick={onNav}
          className={cn('rounded-lg transition-transform duration-300 origin-left', scrolled && 'scale-90')}
        >
          <Logo />
        </a>

        <nav aria-label={t.nav.label} className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {NAV_IDS.map((id) => {
              const isActive = active === id
              return (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={onNav}
                    aria-current={isActive ? 'location' : undefined}
                    className={cn(
                      'group relative inline-flex min-h-11 items-center whitespace-nowrap rounded-lg px-3 font-bold transition-colors',
                      isActive ? 'text-blue-700' : 'text-blue-900 hover:text-blue-700',
                    )}
                  >
                    {t.nav[id]}
                    <span
                      aria-hidden="true"
                      className={cn(
                        'absolute inset-x-3 bottom-1 h-[3px] origin-center rounded-full bg-accent-yellow transition-transform duration-300',
                        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100',
                      )}
                    />
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageToggle className="hidden sm:inline-flex" />
          <ButtonLink href="#contact" onClick={onNav} size="sm" className="hidden whitespace-nowrap sm:inline-flex">
            {t.nav.enquire}
          </ButtonLink>
          <button
            ref={menuButton}
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={t.nav.openMenu}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-blue-900 hover:bg-blue-50 focus-visible:bg-blue-50 xl:hidden"
          >
            <Menu aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} active={active} />
    </header>
  )
}
