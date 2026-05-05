import type { GalerieItem } from '@/lib/api'

interface GalerieGridProps {
  galerie?: GalerieItem[]
  sectionNum?: string
  title?: React.ReactNode
  background?: string
  staticMain?: {
    src: string
    caption?: string
    testimonial?: string
    testimonialAutor?: string
  }
  staticSecondary?: {
    src: string
    caption?: string
  }
  height?: number
}

export default function GalerieGrid({
  galerie,
  sectionNum = '03 — Galerie',
  title,
  background = 'bg-chalk',
  staticMain,
  staticSecondary,
  height = 480,
}: GalerieGridProps) {
  const hasDb = galerie && galerie.length > 0

  const mainItem: GalerieItem | null = hasDb
    ? galerie[0]
    : staticMain
    ? {
        foto_url: staticMain.src,
        titel: staticMain.caption ?? null,
        testimonial_text: staticMain.testimonial ?? null,
        testimonial_autor: staticMain.testimonialAutor ?? null,
      }
    : null

  const secondaryItem: GalerieItem | null =
    galerie && galerie.length > 1
      ? galerie[1]
      : staticSecondary
      ? {
          foto_url: staticSecondary.src,
          titel: staticSecondary.caption ?? null,
          testimonial_text: null,
          testimonial_autor: null,
        }
      : null

  return (
    <section className={`py-16 ${background}`}>
      <div className="max-w-screen-xl mx-auto px-6 md:px-10">

        <div className="flex items-end justify-between mb-10 gap-6 flex-wrap">
          <div>
            <p className="sec-num mb-3">{sectionNum}</p>
            <h2 className="display-giant text-navy" style={{ fontSize: 'clamp(32px, 5vw, 72px)' }}>
              {title ?? <>Kinetic <span className="text-outline-navy">Moments</span></>}
            </h2>
          </div>
          <button className="label-cap text-navy/50 hover:text-navy transition-colors flex items-center gap-2">
            Alle ansehen <span className="material-symbols-outlined text-sm">grid_view</span>
          </button>
        </div>

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 lg:col-span-8 img-zoom rounded-lg overflow-hidden relative" style={{ height }}>
            {mainItem?.foto_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img alt={mainItem.titel ?? 'Galerie'} className="w-full h-full object-cover" src={mainItem.foto_url} />
            ) : (
              <div className="w-full h-full bg-mist-mid" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-navy/85 to-transparent flex flex-col items-start justify-end p-8 pointer-events-none">
              {mainItem?.titel && (
                <p className="font-display font-bold text-chalk text-xl tracking-display">{mainItem.titel}</p>
              )}
              {mainItem?.testimonial_text && (
                <p className="text-chalk/60 text-sm mt-2 italic">
                  &ldquo;{mainItem.testimonial_text}&rdquo;
                  {mainItem.testimonial_autor && (
                    <span className="not-italic text-chalk/40 ml-2">— {mainItem.testimonial_autor}</span>
                  )}
                </p>
              )}
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4 flex flex-col gap-4" style={{ height }}>
            {secondaryItem?.foto_url ? (
              <div className="img-zoom rounded-lg overflow-hidden flex-1 relative grayscale hover:grayscale-0 transition-all duration-700">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt={secondaryItem.titel ?? 'Galerie'} className="w-full h-full object-cover" src={secondaryItem.foto_url} />
                {secondaryItem.titel && (
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent flex items-end p-5 pointer-events-none">
                    <p className="font-display font-semibold text-chalk text-sm tracking-display">{secondaryItem.titel}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="rounded-lg flex-1 bg-mist-mid" />
            )}
            <div className="bg-navy rounded-lg flex-1 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-navy-mid transition-colors group p-6">
              <span className="material-symbols-outlined fill-icon text-gold text-4xl group-hover:scale-110 transition-transform">gallery_thumbnail</span>
              <p className="label-cap text-chalk/60 text-center">Vereins-Galerie<br />entdecken</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
