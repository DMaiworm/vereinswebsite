type KursCtaSectionProps = {
  title: string
  description: string
  primaryLabel: string
  secondaryLabel: string
  footnote?: string
}

export default function KursCtaSection({ title, description, primaryLabel, secondaryLabel, footnote }: KursCtaSectionProps) {
  return (
    <section className="py-12 bg-primary-container text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
      <div className="max-w-[800px] mx-auto px-6 text-center relative z-10">
        <h2 className="text-headline-lg mb-6">{title}</h2>
        <p className="text-on-primary-container text-body-lg mb-8">{description}</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-secondary-container text-on-secondary-fixed font-label-lg px-10 py-5 rounded-lg hover:shadow-xl transition-all">{primaryLabel}</button>
          <button className="border border-white/30 text-white font-label-lg px-10 py-5 rounded-lg hover:bg-white/10 transition-all">{secondaryLabel}</button>
        </div>
        {footnote && <p className="mt-6 text-on-primary-container/70 text-label-sm">{footnote}</p>}
      </div>
    </section>
  )
}
