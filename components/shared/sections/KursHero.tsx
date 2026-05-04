type KursHeroProps = {
  imageSrc: string
  imageAlt: string
  badge: string
  title: string
  subtitle: string
  primaryCta: { label: string }
  secondaryCta: { label: string }
}

export default function KursHero({ imageSrc, imageAlt, badge, title, subtitle, primaryCta, secondaryCta }: KursHeroProps) {
  return (
    <section className="relative h-[716px] min-h-[500px] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="w-full h-full object-cover relative z-0" alt={imageAlt} src={imageSrc} />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent z-10"></div>
      </div>
      <div className="relative z-20 max-w-[1200px] mx-auto px-6 w-full">
        <div className="max-w-2xl text-white">
          <span className="inline-block px-4 py-1 bg-secondary-container text-on-secondary-fixed rounded-full text-label-lg mb-6">{badge}</span>
          <h1 className="text-display-lg font-display-lg mb-4 text-white">{title}</h1>
          <p className="text-body-lg mb-8 opacity-90">{subtitle}</p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-secondary-container text-on-secondary-fixed font-label-lg px-8 py-4 rounded-lg hover:brightness-110 transition-all">{primaryCta.label}</button>
            <button className="border border-white/40 backdrop-blur-sm text-white font-label-lg px-8 py-4 rounded-lg hover:bg-white/10 transition-all">{secondaryCta.label}</button>
          </div>
        </div>
      </div>
    </section>
  )
}
