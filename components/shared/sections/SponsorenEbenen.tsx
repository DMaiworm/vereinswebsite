export default function SponsorenEbenen() {
  return (
    <section id="pakete" className="py-12 bg-surface relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-8">
          <div>
            <h2 className="text-5xl font-black text-primary uppercase tracking-tighter font-headline">SPONSOREN EBENEN</h2>
          </div>
          <p className="max-w-md text-on-surface-variant font-medium">
            Wählen Sie die Ebene, die am besten zu Ihren Unternehmenszielen passt.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {/* Card: Verein */}
          <div className="group bg-surface-container-lowest p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border-b-8 border-transparent hover:border-secondary-container flex flex-col">
            <div className="w-16 h-16 bg-primary-container rounded-2xl flex items-center justify-center mb-8 rotate-3 group-hover:rotate-6 transition-transform">
              <span className="material-symbols-outlined text-secondary-container text-3xl">corporate_fare</span>
            </div>
            <h3 className="text-3xl font-black text-primary uppercase font-headline mb-4">VEREIN</h3>
            <p className="text-on-surface-variant mb-8 flex-grow">Maximale Sichtbarkeit auf gesamter Vereinsebene. Werden Sie zum tragenden Pfeiler unserer gesamten Sportgemeinschaft.</p>
            <ul className="space-y-4 mb-10 text-sm font-bold text-primary/70">
              <li className="flex items-center gap-3"><span className="material-symbols-outlined text-secondary text-lg">check_circle</span> Logo auf allen Kommunikationsmitteln</li>
              <li className="flex items-center gap-3"><span className="material-symbols-outlined text-secondary text-lg">check_circle</span> Exklusiver Hauptpartner-Status</li>
              <li className="flex items-center gap-3"><span className="material-symbols-outlined text-secondary text-lg">check_circle</span> Premium-Bandenwerbung</li>
            </ul>
            <button className="w-full py-4 rounded-xl border-2 border-primary text-primary font-black uppercase hover:bg-secondary-container hover:border-secondary-container hover:text-primary transition-all">DETAILS ANFRAGEN</button>
          </div>
          {/* Card: Abteilung */}
          <div className="group bg-primary p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border-b-8 border-transparent hover:border-secondary-container flex flex-col">
            <div className="w-16 h-16 bg-primary-container rounded-2xl flex items-center justify-center mb-8 rotate-3 group-hover:rotate-6 transition-transform">
              <span className="material-symbols-outlined text-secondary-container text-3xl">sports_soccer</span>
            </div>
            <h3 className="text-3xl font-black text-white uppercase font-headline mb-4">ABTEILUNG</h3>
            <p className="text-white/70 mb-8 flex-grow">Gezielte Unterstützung für spezifische Sportarten. Verbinden Sie Ihre Marke mit der Leidenschaft einer Sparte.</p>
            <ul className="space-y-4 mb-10 text-sm font-bold text-white/70">
              <li className="flex items-center gap-3"><span className="material-symbols-outlined text-secondary-container text-lg">check_circle</span> Spartenspezifisches Marketing</li>
              <li className="flex items-center gap-3"><span className="material-symbols-outlined text-secondary-container text-lg">check_circle</span> Event-Präsenz bei Turnieren</li>
              <li className="flex items-center gap-3"><span className="material-symbols-outlined text-secondary-container text-lg">check_circle</span> Social Media Co-Branding</li>
            </ul>
            <button className="w-full py-4 rounded-xl border-2 border-white text-white font-black uppercase hover:bg-secondary-container hover:border-secondary-container hover:text-primary transition-all">DETAILS ANFRAGEN</button>
          </div>
          {/* Card: Mannschaft */}
          <div className="group bg-surface-container-lowest p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border-b-8 border-transparent hover:border-secondary-container flex flex-col">
            <div className="w-16 h-16 bg-primary-container rounded-2xl flex items-center justify-center mb-8 rotate-3 group-hover:rotate-6 transition-transform">
              <span className="material-symbols-outlined text-secondary-container text-3xl">groups</span>
            </div>
            <h3 className="text-3xl font-black text-primary uppercase font-headline mb-4">MANNSCHAFT</h3>
            <p className="text-on-surface-variant mb-8 flex-grow">Die Basis des Erfolgs. Unterstützen Sie direkt ein Team – von der Jugend bis zu den Senioren.</p>
            <ul className="space-y-4 mb-10 text-sm font-bold text-primary/70">
              <li className="flex items-center gap-3"><span className="material-symbols-outlined text-secondary text-lg">check_circle</span> Trikotwerbung (Brust/Ärmel)</li>
              <li className="flex items-center gap-3"><span className="material-symbols-outlined text-secondary text-lg">check_circle</span> Nennung in Spielberichten</li>
              <li className="flex items-center gap-3"><span className="material-symbols-outlined text-secondary text-lg">check_circle</span> Team-Event Partnerschaft</li>
            </ul>
            <button className="w-full py-4 rounded-xl border-2 border-primary text-primary font-black uppercase hover:bg-secondary-container hover:border-secondary-container hover:text-primary transition-all">DETAILS ANFRAGEN</button>
          </div>
        </div>
      </div>
    </section>
  )
}
