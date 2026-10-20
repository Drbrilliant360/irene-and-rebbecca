import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { cn } from '../../lib/cn'

/** Decorative SVG wave with gentle parallax (off on mobile and under reduced motion). */
export function WaveDivider({ fill = 'var(--white)', className }: { fill?: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const mobile = useMediaQuery('(max-width: 767px)')
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [-6, 6])
  const parallax = !reduce && !mobile

  return (
    <div ref={ref} aria-hidden="true" className={cn('pointer-events-none relative h-12 overflow-hidden sm:h-20', className)}>
      <m.svg
        style={parallax ? { y } : undefined}
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className="absolute inset-x-0 -bottom-3 h-[calc(100%+24px)] w-full"
      >
        <path d="M0,55 C240,100 480,10 720,45 C960,80 1200,25 1440,55 L1440,100 L0,100 Z" fill={fill} />
      </m.svg>
    </div>
  )
}
