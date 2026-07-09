export interface GaleriePhoto {
  src: string
  alt: string
}

interface GalerieSnapshotsProps {
  title?: string
  main: GaleriePhoto
  topRight1: GaleriePhoto
  topRight2: GaleriePhoto
  bottom: GaleriePhoto
}

export default function GalerieSnapshots({
  title = 'Momentaufnahmen',
  main,
  topRight1,
  topRight2,
  bottom,
}: GalerieSnapshotsProps) {
  return (
    <section id="galerie" className="py-12 bg-surface">
      <div className="max-w-[1440px] mx-auto px-8">
        <h2 className="text-2xl sm:text-4xl font-headline font-black text-primary mb-16 uppercase tracking-wide sm:tracking-widest text-center break-words">
          {title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Big image — 2×2 */}
          <div className="md:col-span-2 md:row-span-2 rounded-2xl overflow-hidden shadow-lg group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt={main.alt} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500" src={main.src} />
          </div>
          {/* Top right small */}
          <div className="rounded-2xl overflow-hidden shadow-lg group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt={topRight1.alt} className="w-full h-[300px] object-cover group-hover:scale-110 transition-all duration-500" src={topRight1.src} />
          </div>
          {/* Second right small */}
          <div className="rounded-2xl overflow-hidden shadow-lg group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt={topRight2.alt} className="w-full h-[300px] object-cover group-hover:scale-110 transition-all duration-500" src={topRight2.src} />
          </div>
          {/* Wide bottom */}
          <div className="md:col-span-2 rounded-2xl overflow-hidden shadow-lg h-[400px] group relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt={bottom.alt} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500" src={bottom.src} />
            <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors" />
          </div>
        </div>
      </div>
    </section>
  )
}
