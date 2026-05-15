interface TrainerCtaProps {
  imageSrc: string
  imageAlt?: string
  headline?: string
  subline?: string
  body?: string
  primaryLabel?: string
  secondaryLabel?: string
}

export default function TrainerCta({
  imageSrc,
  imageAlt = 'Trainer gesucht',
  headline = 'Gib dein Wissen weiter.',
  subline = 'Übungsleiter gesucht!',
  body = 'Wir suchen motivierte Köpfe, die unsere Jugend- und Erwachsenenteams mit frischen Impulsen voranbringen. Du liebst den Sport und arbeitest gerne mit Menschen? Dann bist du bei uns genau richtig.',
  primaryLabel = 'Jetzt bewerben',
  secondaryLabel = 'Anforderungsprofil',
}: TrainerCtaProps) {
  return (
    <section className="py-12 relative px-8">
      <div className="max-w-[1200px] mx-auto relative rounded-[3rem] overflow-hidden min-h-[600px] flex items-center shadow-2xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt={imageAlt} className="absolute inset-0 w-full h-full object-cover" src={imageSrc} />
        <div className="absolute inset-0 bg-primary/70 backdrop-blur-[2px]" />
        <div className="relative z-10 p-12 md:p-24 text-white max-w-3xl">
          <div className="bg-secondary-container text-on-secondary-container w-16 h-16 flex items-center justify-center rounded-full mb-8">
            <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>volunteer_activism</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-headline font-black mb-6 leading-[1.1] tracking-tighter uppercase">
            {headline} <br />
            <span className="text-secondary-container italic">{subline}</span>
          </h2>
          <p className="text-xl opacity-90 mb-10 leading-relaxed font-medium">{body}</p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-white text-primary px-8 py-4 rounded-xl font-headline font-bold hover:bg-secondary-container hover:text-on-secondary-container transition-all uppercase tracking-widest shadow-lg" type="button">
              {primaryLabel}
            </button>
            <button className="border-2 border-white/40 hover:border-white text-white px-8 py-4 rounded-xl font-headline font-bold transition-all uppercase tracking-widest" type="button">
              {secondaryLabel}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
