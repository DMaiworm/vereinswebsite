type KursInfoGridProps = {
  kurszeit: string
  ort: string
  mitzubringen: string
  mitzubringenIcon?: string
}

export default function KursInfoGrid({ kurszeit, ort, mitzubringen, mitzubringenIcon = 'shopping_bag' }: KursInfoGridProps) {
  return (
    <section className="relative z-20 -mt-12 px-6">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 border border-surface-container-high rounded-xl shadow-sm flex items-start gap-4 transition-all hover:shadow-md">
          <span className="material-symbols-outlined text-primary-container text-3xl">schedule</span>
          <div>
            <h3 className="font-headline-md text-primary-container text-lg">Kurszeit</h3>
            <p className="text-on-surface-variant font-body-md">{kurszeit}</p>
          </div>
        </div>
        <div className="bg-white p-8 border border-surface-container-high rounded-xl shadow-sm flex items-start gap-4 transition-all hover:shadow-md">
          <span className="material-symbols-outlined text-primary-container text-3xl">location_on</span>
          <div>
            <h3 className="font-headline-md text-primary-container text-lg">Ort</h3>
            <p className="text-on-surface-variant font-body-md">{ort}</p>
          </div>
        </div>
        <div className="bg-white p-8 border border-surface-container-high rounded-xl shadow-sm flex items-start gap-4 transition-all hover:shadow-md">
          <span className="material-symbols-outlined text-primary-container text-3xl">{mitzubringenIcon}</span>
          <div>
            <h3 className="font-headline-md text-primary-container text-lg">Mitzubringen</h3>
            <p className="text-on-surface-variant font-body-md">{mitzubringen}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
