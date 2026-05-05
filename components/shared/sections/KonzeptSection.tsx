type KonzeptSectionProps = {
  imageSrc: string
  imageAlt: string
  overlayQuote: string
  paragraphs: string[]
  blockquote: string
}

export default function KonzeptSection({ imageSrc, imageAlt, overlayQuote, paragraphs, blockquote }: KonzeptSectionProps) {
  return (
    <section className="py-16 max-w-[1200px] mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="relative order-2 lg:order-1">
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-[rgba(253,224,0,0.20)] rounded-3xl -z-10 rotate-6 blur-xl"></div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="rounded-2xl shadow-xl object-cover w-full h-[500px]" alt={imageAlt} src={imageSrc} />
          <div className="absolute bottom-6 right-6 bg-white/80 backdrop-blur-md p-6 rounded-xl border border-surface-container-high max-w-xs shadow-lg">
            <p className="text-primary-container font-lexend italic font-semibold text-sm leading-relaxed">&quot;{overlayQuote}&quot;</p>
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <h2 className="text-headline-lg font-headline-lg text-primary-container mb-8">
            Das <span className="text-on-surface-variant/40 italic">Konzept</span>
          </h2>
          <div className="space-y-6 text-on-surface-variant text-body-lg leading-relaxed">
            {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
            <div className="bg-surface-container-low p-8 rounded-xl border-l-4 border-secondary-container italic font-medium text-primary-container text-body-md">
              &quot;{blockquote}&quot;
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
