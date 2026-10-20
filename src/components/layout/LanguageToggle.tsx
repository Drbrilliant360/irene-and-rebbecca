import { useLocale } from '../../content/LocaleProvider'
import type { Locale } from '../../content/types'
import { cn } from '../../lib/cn'

const options: { code: Locale; label: string; name: string }[] = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'sw', label: 'SW', name: 'Kiswahili' },
]

export function LanguageToggle({ className }: { className?: string }) {
  const { locale, setLocale, t } = useLocale()
  return (
    <div role="group" aria-label={t.meta.languageToggleLabel} className={cn('inline-flex rounded-full bg-blue-50 p-1', className)}>
      {options.map((o) => (
        <button
          key={o.code}
          type="button"
          lang={o.code}
          aria-pressed={locale === o.code}
          aria-label={o.name}
          onClick={() => setLocale(o.code)}
          className={cn(
            'min-h-11 min-w-11 rounded-full px-3 text-sm font-bold transition-colors',
            locale === o.code ? 'bg-blue-700 text-white' : 'text-blue-900 hover:bg-white focus-visible:bg-white',
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}
