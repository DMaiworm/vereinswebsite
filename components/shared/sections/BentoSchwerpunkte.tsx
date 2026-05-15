type BentoItem = {
  icon: string
  title: string
  description: string
}

type BentoSchwerpunkteProps = {
  title: string
  featured: [BentoItem, BentoItem]
  small: BentoItem[]
}

export default function BentoSchwerpunkte({ title, featured, small }: BentoSchwerpunkteProps) {
  return (
    <section className="py-12 bg-surface-container-low">
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="text-headline-lg font-headline-lg text-primary-container mb-8 text-center">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          <div className="md:col-span-3 bg-white p-8 rounded-xl border border-surface-container-high transition-transform hover:-translate-y-1">
            <span className="inline-block p-3 bg-primary-fixed rounded-lg mb-6">
              <span className="material-symbols-outlined text-primary-container text-3xl">{featured[0].icon}</span>
            </span>
            <h3 className="text-headline-md mb-4">{featured[0].title}</h3>
            <p className="text-on-surface-variant">{featured[0].description}</p>
          </div>
          <div className="md:col-span-3 bg-primary-container text-white p-8 rounded-xl transition-transform hover:-translate-y-1">
            <span className="inline-block p-3 bg-white/10 rounded-lg mb-6">
              <span className="material-symbols-outlined text-white text-3xl">{featured[1].icon}</span>
            </span>
            <h3 className="text-headline-md mb-4">{featured[1].title}</h3>
            <p className="opacity-80">{featured[1].description}</p>
          </div>
          {small.map((item) => (
            <div key={item.title} className="md:col-span-2 bg-white p-8 rounded-xl border border-surface-container-high transition-transform hover:-translate-y-1">
              <span className="material-symbols-outlined text-primary-container text-3xl mb-4">{item.icon}</span>
              <h3 className="text-label-lg uppercase tracking-widest text-primary-container mb-2">{item.title}</h3>
              <p className="text-on-surface-variant text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
