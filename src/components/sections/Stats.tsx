import { useLocale } from '../../content/LocaleProvider'
import { cn } from '../../lib/cn'
import { useTheme } from '../../theme/ThemeProvider'
import { CountUp } from '../ui/CountUp'
import { RevealGroup, RevealItem } from '../ui/Reveal'

const tileColours = [
  'bg-accent-yellow text-blue-900',
  'bg-blue-700 text-white',
  'bg-accent-red text-white',
  'bg-accent-green-dark text-white',
]

/** "By the numbers". A stat with value: null shows its [PLACEHOLDER] instead of counting. */
export function Stats() {
  const { t } = useLocale()
  const theme = useTheme()

  const wrapper = {
    band: 'bg-blue-700 text-white',
    lines: 'bg-white text-blue-900',
    tiles: 'bg-white text-blue-900',
  }[theme.stats]

  return (
    <section aria-labelledby="stats-title" className={cn('py-14 sm:py-16', wrapper)}>
      <div className="container-site">
        <h2 id="stats-title" className={cn('mb-8 text-center text-h3', theme.stats === 'band' && 'text-white')}>
          {t.stats.title}
        </h2>
        <RevealGroup
          as="ul"
          className={cn(
            'grid grid-cols-2 lg:grid-cols-4',
            theme.stats === 'lines' ? 'divide-blue-900/15 lg:divide-x' : 'gap-5',
          )}
        >
          {t.stats.items.map((s, i) => (
            <RevealItem
              as="li"
              key={s.label}
              className={cn(
                'flex flex-col items-center justify-center p-4 text-center',
                theme.stats === 'tiles' && cn('rounded-card border-2 border-blue-900 p-6 shadow-chunky', tileColours[i % 4], i % 2 ? 'lg:rotate-1' : 'lg:-rotate-1'),
                theme.stats === 'lines' && 'border-t border-blue-900/15 py-8 lg:border-t-0',
              )}
            >
              <span className="font-heading text-4xl font-bold sm:text-5xl">
                {s.value === null ? (
                  <span className="text-2xl sm:text-3xl">
                    {s.placeholder}
                    {s.suffix}
                  </span>
                ) : (
                  <CountUp value={s.value} suffix={s.suffix} />
                )}
              </span>
              <span className={cn('mt-2 font-bold', theme.stats === 'band' ? 'text-white/90' : theme.stats === 'lines' && 'text-ink')}>
                {s.label}
              </span>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
