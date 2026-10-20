/** Loaded on demand (React.lazy) only after the visitor taps "Load map". */
export default function MapFrame({ src, title }: { src: string; title: string }) {
  return (
    <iframe
      src={src}
      title={title}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className="h-full w-full border-0"
      allowFullScreen
    />
  )
}
