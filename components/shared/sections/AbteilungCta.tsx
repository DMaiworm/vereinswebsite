type AbteilungCtaProps = {
  title: string
  subtitle: string
  primaryLabel: string
  secondaryLabel: string
}

export default function AbteilungCta({ title, subtitle, primaryLabel, secondaryLabel }: AbteilungCtaProps) {
  return (
    <section className="max-w-[1200px] mx-auto px-6 py-12">
      <div className="bg-primary-container rounded-2xl p-lg text-center text-white relative overflow-hidden">
        <div className="relative z-10 py-6">
          <h2 className="font-headline text-3xl font-bold mb-6">{title}</h2>
          <p className="font-body text-lg mb-8 max-w-xl mx-auto opacity-90">{subtitle}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-secondary-container text-[#222222] px-10 py-4 rounded font-bold text-base transition-transform active:scale-95">{primaryLabel}</button>
            <button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-10 py-4 rounded font-bold text-base transition-transform active:scale-95 hover:bg-white/20">{secondaryLabel}</button>
          </div>
        </div>
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
      </div>
    </section>
  )
}
