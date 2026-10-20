import { m, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion'
import { useRef, type PointerEvent, type ReactNode, type RefObject } from 'react'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { cn } from '../../lib/cn'

/** Thin yellow bar at the top of the page showing how far the visitor has read. */
export function ScrollProgress() {
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const smooth = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 })
  return (
    <m.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[55] h-[3px] origin-left bg-accent-yellow"
      style={{ scaleX: reduce ? scrollYProgress : smooth }}
    />
  )
}

/**
 * Slow scroll parallax for a section's background (moves at ~25% of scroll speed).
 * Off on small screens and under reduced motion. Pass the section element as `target`.
 */
export function useParallax(target: RefObject<HTMLElement>, distance = 80): MotionValue<number> | undefined {
  const reduce = useReducedMotion()
  const mobile = useMediaQuery('(max-width: 767px)')
  const { scrollYProgress } = useScroll({ target, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, distance])
  return reduce || mobile ? undefined : y
}

/**
 * Tilts its content a few degrees towards the pointer (mouse/trackpad only).
 * Transform-only, resets on leave, does nothing on touch or under reduced motion.
 */
export function TiltBox({ children, className, max = 5 }: { children: ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const finePointer = useMediaQuery('(hover: hover) and (pointer: fine)')
  const active = finePointer && !reduce

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!active || !el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    el.style.transform = `perspective(900px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg)`
  }
  const reset = () => {
    if (ref.current) ref.current.style.transform = ''
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className={cn('transition-transform duration-200 ease-out will-change-transform', className)}
    >
      {children}
    </div>
  )
}
