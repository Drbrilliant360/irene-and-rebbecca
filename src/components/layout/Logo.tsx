import { site } from '../../content/site'
import { cn } from '../../lib/cn'
import { LogoMark } from './LogoMark'

/** School logo mark beside the name. `inverted` draws the mark's lines in white for dark backgrounds. */
export function Logo({ inverted, className }: { inverted?: boolean; className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-3', className)}>
      <LogoMark weight={1.8} className={cn('h-14 w-[69px] shrink-0', inverted ? 'text-white' : 'text-[#2A2266]')} />
      <span className="flex flex-col leading-none">
        <span className={cn('whitespace-nowrap font-heading text-lg font-bold sm:text-xl', inverted ? 'text-white' : 'text-blue-900')}>
          {site.shortName}
        </span>
        <span className={cn('whitespace-nowrap text-xs font-bold uppercase tracking-wider', inverted ? 'text-white/80' : 'text-ink')}>
          Primary School
        </span>
      </span>
      <span className="sr-only">{site.name}</span>
    </span>
  )
}
