interface AlteHerrenBannerProps {
  imageSrc?: string
  imageAlt?: string
  tagline?: string
  title?: string
  description?: string
  ctaLabel?: string
}

export default function AlteHerrenBanner({
  imageSrc = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPIYsb43XGuYJPaQPMsMkUxdP1MiQ-2FS6AfGfmI272VB6MSI11yEgJX0PyxIIqiBcy_AmskdhJwP_824zxujCJiqdAIBXlCVl3LT9cTQS31cJsVUnjQ4Hy402hjpa7VK8xfj12ihI3hJkQlDpw6JGah09c25k9erGCUErHwVhE0mVBdplggsrrhTrrfF1fY6yZYqLxUYkFVVioMYieixqVTHE9i2_MAe368jFMQzvu3bG4sTNCba8ZxQ02fLPn1lf-HOwt7TxHVc',
  imageAlt = 'Social soccer game at sunset',
  tagline = 'Gemeinschaft & Fußball',
  title = 'ALTE HERREN',
  description = 'Für die Legenden, die den Ball noch immer am liebsten am Fuß haben. Freizeitkicker mit Leidenschaft, Gemeinschaft und bester Stimmung nach dem Abpfiff.',
  ctaLabel = 'Mitkicken',
}: AlteHerrenBannerProps) {
  return (
    <section id="alte-herren" className="relative py-12 overflow-hidden">
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="w-full h-full object-cover" alt={imageAlt} src={imageSrc} />
        {/* bg-primary/70 → rgba fix per CLAUDE.md */}
        <div className="absolute inset-0 bg-[rgba(5,40,86,0.7)] backdrop-blur-[2px]"></div>
      </div>
      <div className="relative z-10 max-w-screen-2xl mx-auto px-8 text-center">
        <span className="inline-block text-secondary-container font-headline font-bold text-lg mb-4 tracking-[0.2em] uppercase">
          {tagline}
        </span>
        <h2 className="text-4xl md:text-6xl font-headline font-black text-white mb-6 uppercase tracking-tighter">
          {title}
        </h2>
        <p className="text-white text-xl md:text-2xl max-w-2xl mx-auto mb-10 font-medium leading-relaxed drop-shadow-lg">
          {description}
        </p>
        <button className="bg-secondary-container text-on-secondary-container px-12 py-5 rounded-full font-headline font-black text-lg uppercase tracking-widest hover:scale-105 active:scale-95 shadow-2xl transition-all duration-300">
          {ctaLabel}
        </button>
      </div>
    </section>
  )
}
