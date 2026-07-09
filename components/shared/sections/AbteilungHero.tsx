import { renderMarkdownInline } from '@/lib/markdown'

type Cta = { label: string; href?: string }

type AbteilungHeroProps = {
  imageSrc: string
  imageAlt: string
  badge: string
  title: string
  subtitle: string
  primaryCta: Cta
  secondaryCta: Cta
}

export default function AbteilungHero({ imageSrc, imageAlt, badge, title, subtitle, primaryCta, secondaryCta }: AbteilungHeroProps) {
  return (
    <section className="relative h-[716px] min-h-[500px] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt={imageAlt} className="w-full h-full object-cover" src={imageSrc} />
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(5,40,86,0.6)] to-transparent"></div>
      </div>
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 w-full">
        <div className="max-w-2xl text-white">
          <span className="inline-block px-4 py-1 bg-secondary-container text-on-secondary-container rounded-full text-label-lg mb-6 uppercase tracking-widest">{badge}</span>
          <h1 className="text-display-lg font-display-lg mb-4 text-white break-words hyphens-auto">{title}</h1>
          <p className="text-body-lg mb-8 opacity-90" dangerouslySetInnerHTML={{ __html: renderMarkdownInline(subtitle) }} />
          <div className="flex flex-wrap gap-4">
            <button className="bg-[#FDE000] text-[#222222] font-label-lg px-8 py-4 rounded-lg hover:brightness-110 transition-all font-bold">{primaryCta.label}</button>
            <button className="border border-white/40 backdrop-blur-sm text-white font-label-lg px-8 py-4 rounded-lg hover:bg-white/10 transition-all font-bold">{secondaryCta.label}</button>
          </div>
        </div>
      </div>
    </section>
  )
}
