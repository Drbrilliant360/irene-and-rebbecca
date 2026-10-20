import { site } from '../../content/site'
import { cn } from '../../lib/cn'

/** Placeholder crest — replace public/images/logo.svg with the school's real logo. */
export function Logo({ inverted, className }: { inverted?: boolean; className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-3', className)}>
      <img src="/images/logo.svg" alt="" width={48} height={48} className="h-12 w-12 shrink-0" />
      <span className="flex flex-col leading-none">
        <span className={cn('whitespace-nowrap font-heading text-lg font-bold sm:text-xl', inverted ? 'text-white' : 'text-blue-900')}>
          {site.shortName}
        </span>
        <span className={cn('whitespace-nowrap text-xs font-bold uppercase tracking-wider', inverted ? 'text-white/80' : 'text-ink')}>
          Primary School
        </span>
      </span>
    </span>
  )
}
