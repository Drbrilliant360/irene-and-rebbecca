import { useLocale } from '../../content/LocaleProvider'

export function SkipLink() {
  const { t } = useLocale()
  return (
    <a
      href="#main"
      className="sr-only z-[100] rounded-full bg-accent-yellow px-5 py-3 font-bold text-blue-900 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
    >
      {t.nav.skip}
    </a>
  )
}
