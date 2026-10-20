import { useState, type ImgHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'
import { ImageOff } from './Icon'

interface SafeImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt' | 'width' | 'height'> {
  src: string
  alt: string
  width: number
  height: number
  /** Above-the-fold image: load eagerly with high priority. */
  priority?: boolean
  /** Optional modern formats, e.g. { avif: '/images/hero.avif', webp: '/images/hero.webp' }. */
  sources?: { avif?: string; webp?: string; srcSet?: string }
  /** Accepted (and ignored) so ImageContent objects can be spread straight in. */
  caption?: string
}

/** <img> with explicit size (no layout shift), lazy loading, and a coloured fallback if the file fails. */
export function SafeImage({ src, alt, width, height, priority, sources, className, sizes, caption: _caption, ...rest }: SafeImageProps) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div
        role={alt ? 'img' : undefined}
        aria-label={alt || undefined}
        aria-hidden={alt ? undefined : true}
        className={cn('flex items-center justify-center bg-blue-50 text-blue-700', className)}
        style={{ aspectRatio: `${width} / ${height}` }}
      >
        <ImageOff aria-hidden="true" className="h-8 w-8 opacity-60" />
      </div>
    )
  }

  const img = (
    <img
      {...rest}
      src={src}
      srcSet={sources?.srcSet}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      // React 18 warns on the camelCase prop; the lowercase attribute is passed through as-is.
      {...{ fetchpriority: priority ? 'high' : 'auto' }}
      onError={() => setFailed(true)}
      className={className}
    />
  )

  if (!sources?.avif && !sources?.webp) return img
  return (
    <picture>
      {sources.avif && <source type="image/avif" srcSet={sources.avif} sizes={sizes} />}
      {sources.webp && <source type="image/webp" srcSet={sources.webp} sizes={sizes} />}
      {img}
    </picture>
  )
}
