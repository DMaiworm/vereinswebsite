export default function TrainerSection() {
  return (
    <section className="bg-surface-container-low py-12">
      <div className="max-w-5xl mx-auto px-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-12 bg-white p-8 md:p-12 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-500">
          <div className="w-48 h-48 md:w-64 md:h-64 flex-shrink-0 relative">
            <div className="absolute inset-0 bg-secondary-container/10 rounded-2xl rotate-3" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Marcus Weber, professional trainer"
              className="relative z-10 w-full h-full object-cover rounded-2xl shadow-md border-4 border-white"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBA6HvaCTqvbgaP0-GS6XU22Zgn9ZyuM56IaajABQjdZRi7modIcx7INu7wiRFyXP9JuDeJnC2nHjGLWr8DBVUWbxgyVlwlZeX7bLvPqDlftNpY6_qOyeTvgSn_pM_vEGRL-QqDTQ13cit45QiXMWM3wT_2rbqubJKv-W7ubwYE5eX_nF4GyRajkWzsN-yZu-wYx4psQgoRxcLbgWGV4M52jKnduUvkB1QPbukutX_3ZvFy1PUPNPuGV7z7o1jUSg__xjEqW6wYC80"
            />
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <h2 className="text-3xl font-headline font-black text-primary uppercase">Marcus Weber</h2>
              <span className="bg-primary-container text-primary-fixed px-3 py-1 rounded text-xs font-bold tracking-wider uppercase">B-Lizenz Trainer</span>
            </div>
            <h3 className="text-xl font-bold text-on-surface mb-6 leading-tight">
              Kompetente Betreuung <span className="text-primary/60">für jeden Spielertyp.</span>
            </h3>
            <p className="text-on-surface-variant leading-relaxed mb-8 max-w-2xl font-medium">
              Marcus ist der sportliche Leiter unserer Tischtennis-Sektion. Mit über 15 Jahren Erfahrung als lizensierter Trainer begleitet er sowohl unsere Jugend als auch die Seniorenteams mit fachlicher Expertise und Leidenschaft für den Vereinssport.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(['Technik-Training', 'Taktik-Analyse', 'Jugendförderung', 'Wettkampf-Coaching'] as const).map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  <span className="font-semibold text-sm text-on-surface">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
