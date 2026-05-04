type TeamRowProps = {
  imageUrl: string
  imageAlt: string
  tag: string
  title: string
  description: string
  meta?: string
  href: string
  imageLeft?: boolean
}

export default function TeamRow({ imageUrl, imageAlt, tag, title, description, meta, href, imageLeft = true }: TeamRowProps) {
  return (
    <div className={`flex flex-col ${imageLeft ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center group`}>
      <div className="w-full md:w-1/2 overflow-hidden rounded-[2rem] bg-surface-container shadow-xl border border-outline-variant/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt={imageAlt} className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105" src={imageUrl} />
      </div>
      <div className="w-full md:w-1/2">
        <div className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-6">{tag}</div>
        <h3 className="font-headline text-3xl font-bold text-primary mb-6">{title}</h3>
        <p className="text-on-surface-variant text-lg leading-relaxed mb-4">{description}</p>
        {meta && (
          <p className="text-on-surface-variant text-sm mb-6">
            <span className="font-semibold text-primary">{meta}</span>
          </p>
        )}
        <a href={href} className="flex items-center gap-2 text-primary font-black font-headline uppercase tracking-widest hover:text-secondary transition-colors group">
          Mehr erfahren
          <span className="material-symbols-outlined text-sm group-hover:translate-x-2 transition-transform">arrow_forward_ios</span>
        </a>
      </div>
    </div>
  )
}
