type ContentSplitProps = {
  title: string
  paragraphs: string[]
  checkItems: string[]
  imageSrc: string
  imageAlt: string
}

export default function ContentSplit({ title, paragraphs, checkItems, imageSrc, imageAlt }: ContentSplitProps) {
  return (
    <section className="py-12 max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
      <div>
        <h2 className="text-headline-lg font-headline-lg text-primary-container mb-6">{title}</h2>
        <div className="space-y-6 text-on-surface-variant text-body-md">
          {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
        </div>
        {checkItems.length > 0 && (
          <div className="mt-8 grid grid-cols-2 gap-6">
            {checkItems.map((item) => (
              <div key={item} className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                <span className="font-label-lg">{item}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="relative">
        <div className="absolute -inset-4 bg-[rgba(253,224,0,0.10)] rounded-full blur-3xl"></div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="relative rounded-2xl shadow-xl w-full aspect-[4/3] object-cover" alt={imageAlt} src={imageSrc} />
      </div>
    </section>
  )
}
