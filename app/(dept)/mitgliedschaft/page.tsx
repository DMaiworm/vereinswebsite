import BaseNav from '@/components/shared/layout/BaseNav'
import SiteFooter from '@/components/shared/layout/SiteFooter'
import SponsorBand from '@/components/shared/layout/SponsorBand'
import { fetchClubConfig, fetchSponsors } from '@/lib/api'

const MITGLIEDSCHAFT_NAV = [
 { label: 'Vorteile', href: '#vorteile' },
 { label: 'Beiträge', href: '#beitraege' },
 { label: 'Anmeldung', href: '#anmeldung', active: true },
 { label: 'Downloads', href: '#downloads' },
]

const DOWNLOADS = [
 { label: 'Mitgliedsantrag (PDF)', desc: 'Offizielles Formular für die Anmeldung auf Papier' },
 { label: 'Einverständniserklärung', desc: 'Zustimmung für Minderjährige und Datennutzung' },
 { label: 'Vereinssatzung', desc: 'Grundregeln und rechtlicher Rahmen des Vereins' },
 { label: 'Datenschutzordnung', desc: 'Informationen zum Umgang mit Ihren Daten' },
]

export default async function MitgliedschaftPage() {
 let logoUrl: string | null = null
 let sponsors: Awaited<ReturnType<typeof fetchSponsors>> = []
 try {
 const config = await fetchClubConfig()
 logoUrl = config.logo_web_pfad ?? config.logo_url ?? null
 if (config.operator_id) sponsors = await fetchSponsors(config.operator_id).catch(() => [])
 } catch { /* fallback */ }

 return (
 <div className="bg-surface font-body text-on-surface">
 <BaseNav
 logoUrl={logoUrl}
 clubName="Hünstetten"
 departmentLabel="Mitgliedschaft"
 navItems={MITGLIEDSCHAFT_NAV}
 ctaLabel="Mitglied werden"
 homeHref="../"
 />

 <main className="pt-20">

 {/* Hero */}
 <section className="relative h-[819px] flex items-center overflow-hidden">
 <div className="absolute inset-0 z-0">
 {/* eslint-disable-next-line @next/next/no-img-element */}
 <img
 className="w-full h-full object-cover"
 alt="Hochdynamisches Sportfoto eines Sprinters auf einer Tartanbahn in der Abenddämmerung"
 src="https://lh3.googleusercontent.com/aida-public/AB6AXuDAn5eHc-tdLD8FR4hafp4dUgBQHaU3ftpl7RHpEFcFR8bBzVzfsX8oGXoAoZByEwg08VOUt-KpCRM6HqfPdRWKcxtQcsTCO_rDrKX2t2zGW957xiNaHmHVGglGW_IT6CUkEJOF6p2Eq9bcb8gMOpS8wBBlx3eOX_yTkHoiXiRfuVbyIiR6uvxzSZ9NNDoWoImz1GJA9VLqqcj6geROsRVrXjbuAccP1uTlo-LEj8gwpgBSwKnWoAIMki07_qfQ7vfziQoa4v7rmyw"
 />
 <div className="absolute inset-0 bg-gradient-to-r from-[rgba(5,40,86,1)] via-[rgba(5,40,86,0.60)] to-transparent"></div>
 </div>
 <div className="container mx-auto px-8 relative z-10">
 <div className="max-w-4xl">
 <span className="inline-block bg-secondary-container text-on-secondary-container px-4 py-1 rounded-full font-label font-bold text-xs tracking-[0.2em] uppercase mb-6 ">
 80 JAHRE EXZELLENZ
 </span>
 <h1 className="text-5xl md:text-7xl font-headline font-black text-white uppercase leading-[0.9] tracking-tight mb-8">
 Werde Teil der <br /><span className="text-secondary-container">Bewegung</span>
 </h1>
 <p className="text-xl text-white/90 max-w-2xl mb-10 leading-relaxed font-medium">
 Werde Teil einer lebendigen Gemeinschaft, die seit über 80 Jahren Tradition und sportliche Exzellenz in Hünstetten vereint. Entdecke deine Leidenschaft.
 </p>
 <div className="flex flex-wrap gap-4">
 <button className="bg-secondary-container text-on-secondary-container px-8 py-4 rounded-xl font-headline font-bold uppercase text-lg shadow-2xl hover:translate-x-2 transition-transform">
 Mitgliedsantrag Online
 </button>
 <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-xl font-headline font-bold uppercase text-lg hover:bg-white/20 transition-all">
 Vorteile Entdecken
 </button>
 </div>
 </div>
 </div>
 </section>

 {/* Benefits */}
 <section id="vorteile" className="py-12 bg-surface">
 <div className="container mx-auto px-8">
 <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
 <div className="max-w-2xl">
 <span className="text-primary font-label font-bold text-xs tracking-[0.3em] uppercase">Vorteile als Mitglied</span>
 <h2 className="text-4xl md:text-5xl font-headline font-black text-primary uppercase mt-4">Warum SG Hünstetten?</h2>
 </div>
 <div className="h-1 w-32 bg-secondary-container mb-2"></div>
 </div>
 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
 <div className="bg-surface-container-lowest p-8 rounded-3xl shadow-lg border-b-8 border-primary hover:-translate-y-2 transition-transform">
 <div className="w-16 h-16 bg-primary-container rounded-2xl flex items-center justify-center mb-6 ">
 <span className="material-symbols-outlined text-secondary-container text-3xl">groups</span>
 </div>
 <h3 className="text-2xl font-headline font-black text-primary uppercase mb-4">Gemeinschaft</h3>
 <p className="text-on-surface-variant leading-relaxed">Erlebe den Zusammenhalt in einem Verein, der Generationen verbindet und soziale Werte lebt.</p>
 </div>
 <div className="bg-surface-container-lowest p-8 rounded-3xl shadow-lg border-b-8 border-secondary-container hover:-translate-y-2 transition-transform">
 <div className="w-16 h-16 bg-primary-container rounded-2xl flex items-center justify-center mb-6 ">
 <span className="material-symbols-outlined text-secondary-container text-3xl">sports_and_outdoors</span>
 </div>
 <h3 className="text-2xl font-headline font-black text-primary uppercase mb-4">Professionalität</h3>
 <p className="text-on-surface-variant leading-relaxed">Zugang zu qualifizierten Trainern und modernen Sportanlagen für alle Altersgruppen.</p>
 </div>
 <div className="bg-surface-container-lowest p-8 rounded-3xl shadow-lg border-b-8 border-primary hover:-translate-y-2 transition-transform">
 <div className="w-16 h-16 bg-primary-container rounded-2xl flex items-center justify-center mb-6 ">
 <span className="material-symbols-outlined text-secondary-container text-3xl">diversity_1</span>
 </div>
 <h3 className="text-2xl font-headline font-black text-primary uppercase mb-4">Vielfalt</h3>
 <p className="text-on-surface-variant leading-relaxed">Vom Breitensport bis zum Leistungssport – wir bieten die passende Plattform für jeden.</p>
 </div>
 </div>
 </div>
 </section>

 {/* Membership Types & Fees */}
 <section id="beitraege" className="py-12 vanguard-gradient text-white overflow-hidden relative">
 <div className="absolute right-0 top-0 opacity-10 font-headline font-black text-[20rem] translate-x-1/2 -translate-y-1/2 select-none">SG</div>
 <div className="container mx-auto px-8 relative z-10">
 <div className="text-center mb-20">
 <h2 className="text-4xl md:text-5xl font-headline font-black uppercase tracking-tight text-secondary-container">
 Mitgliedschaft &amp; Beiträge
 </h2>
 <p className="text-white/70 mt-4 max-w-xl mx-auto">Wählen Sie das passende Modell für Ihre individuellen Bedürfnisse.</p>
 </div>
 <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
 {/* Standard */}
 <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-10 border border-white/10 flex flex-col items-center text-center">
 <h3 className="text-xl font-label font-bold tracking-widest uppercase mb-6">Standard</h3>
 <div className="text-5xl font-headline font-black text-secondary-container mb-4">
 120€<span className="text-lg text-white/60 ">/Jahr</span>
 </div>
 <p className="text-white/70 mb-8">Voller Zugang zu allen Sportabteilungen und Kursangeboten für Einzelpersonen.</p>
 <div className="mt-auto w-full">
 <button className="w-full py-3 rounded-xl border border-white/30 font-headline font-bold uppercase hover:bg-white/10 transition-all">
 Auswählen
 </button>
 </div>
 </div>
 {/* Familie – featured */}
 <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-10 border-2 border-secondary-container flex flex-col items-center text-center relative scale-105 shadow-2xl">
 <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-secondary-container text-on-secondary-container px-6 py-1 rounded-full font-label font-black text-[10px] uppercase tracking-[0.2em]">
 Bestseller
 </div>
 <h3 className="text-xl font-label font-bold tracking-widest uppercase mb-6">Familie</h3>
 <div className="text-5xl font-headline font-black text-secondary-container mb-4">
 240€<span className="text-lg text-white/60 ">/Jahr</span>
 </div>
 <p className="text-white/90 mb-8">Umfassender Schutz und Training für die gesamte Familie (Eltern + Kinder).</p>
 <div className="mt-auto w-full">
 <button className="w-full py-3 rounded-xl bg-secondary-container text-on-secondary-container font-headline font-bold uppercase hover:scale-105 active:scale-95 transition-all">
 Jetzt Anmelden
 </button>
 </div>
 </div>
 {/* Förderer */}
 <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-10 border border-white/10 flex flex-col items-center text-center">
 <h3 className="text-xl font-label font-bold tracking-widest uppercase mb-6">Förderer</h3>
 <div className="text-5xl font-headline font-black text-secondary-container mb-4">
 60€<span className="text-lg text-white/60 ">/Jahr</span>
 </div>
 <p className="text-white/70 mb-8">Unterstützen Sie die Vereinsarbeit und profitieren Sie von exklusiven Event-Einladungen.</p>
 <div className="mt-auto w-full">
 <button className="w-full py-3 rounded-xl border border-white/30 font-headline font-bold uppercase hover:bg-white/10 transition-all">
 Unterstützen
 </button>
 </div>
 </div>
 </div>
 </div>
 </section>

 {/* Application & Downloads Bento */}
 <section id="anmeldung" className="py-12 bg-surface-container-low">
 <div className="container mx-auto px-8">
 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
 {/* CTA Block */}
 <div className="lg:col-span-2 bg-primary rounded-3xl p-12 text-white flex flex-col justify-between overflow-hidden relative">
 <div className="relative z-10">
 <h2 className="text-4xl font-headline font-black uppercase leading-none mb-6">
 Bereit für den <span className="text-secondary-container">Start?</span>
 </h2>
 <p className="text-xl text-white/80 max-w-md mb-8">
 Der schnellste Weg in unser Team. Füllen Sie Ihren Antrag direkt online aus – einfach, sicher und papierlos.
 </p>
 <button className="bg-secondary-container text-on-secondary-container px-10 py-5 rounded-xl font-headline font-black uppercase text-xl shadow-xl hover:translate-x-4 transition-transform group">
 Jetzt Online Anmelden
 <span className="material-symbols-outlined align-middle ml-2 group-hover:translate-x-2 transition-transform">arrow_forward</span>
 </button>
 </div>
 <div className="absolute right-0 bottom-0 w-1/2 opacity-20 transform translate-x-10 translate-y-10">
 <span className="material-symbols-outlined text-[20rem]">edit_note</span>
 </div>
 </div>
 {/* Downloads */}
 <div id="downloads" className="bg-surface-container-lowest rounded-3xl p-8 shadow-lg">
 <h3 className="text-2xl font-headline font-black text-primary uppercase mb-8">Downloads</h3>
 <div className="space-y-4">
 {DOWNLOADS.map(({ label, desc }) => (
 <a
 key={label}
 className="flex items-center justify-between p-4 bg-surface hover:bg-surface-container-high rounded-xl transition-colors group"
 href="#"
 >
 <div className="flex flex-col">
 <span className="font-bold text-primary">{label}</span>
 <span className="text-xs text-on-surface-variant font-medium">{desc}</span>
 </div>
 <span className="material-symbols-outlined text-primary group-hover:translate-y-1 transition-transform">download</span>
 </a>
 ))}
 </div>
 </div>
 </div>
 </div>
 </section>

 {/* Milestones */}
 <section className="py-12 bg-surface overflow-hidden">
 <div className="container mx-auto px-8">
 <div className="text-center mb-16">
 <span className="text-primary font-label font-bold text-xs tracking-[0.3em] uppercase">Ehrenabteilung</span>
 <h2 className="text-4xl font-headline font-black text-primary uppercase mt-4">Mitgliedsjubiläen</h2>
 </div>
 <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
 <div className="bg-surface-container-high p-8 rounded-3xl text-center w-full md:w-64 hover:scale-110 transition-transform shadow-lg">
 <div className="text-primary font-headline font-black text-5xl mb-2">50</div>
 <div className="text-primary font-label font-bold text-sm tracking-widest uppercase">JAHRE</div>
 <div className="mt-4 h-1 w-12 bg-secondary-container mx-auto"></div>
 <p className="mt-4 text-on-surface-variant font-bold">Goldene Ehrennadel</p>
 <div className="mt-4 space-y-1 text-xs text-on-surface-variant/70 font-medium">
 <p>Hans Müller (Januar 1974)</p>
 <p>Ingrid Bauer (April 1974)</p>
 </div>
 </div>
 <div className="bg-primary p-10 rounded-3xl text-center -rotate-2 w-full md:w-72 hover:scale-110 transition-transform shadow-2xl">
 <div className="text-secondary-container font-headline font-black text-6xl mb-2">40</div>
 <div className="text-white font-label font-bold text-sm tracking-widest uppercase">JAHRE</div>
 <div className="mt-4 h-1 w-12 bg-secondary-container mx-auto"></div>
 <p className="mt-4 text-white font-bold">Silberne Ehrennadel</p>
 <div className="mt-4 space-y-1 text-xs text-white/70 font-medium">
 <p>Petra Schmidt (März 1984)</p>
 <p>Wolfgang Klein (Juli 1984)</p>
 <p>Thomas Meyer (Oktober 1984)</p>
 </div>
 </div>
 <div className="bg-surface-container-high p-8 rounded-3xl text-center w-full md:w-64 hover:scale-110 transition-transform shadow-lg">
 <div className="text-primary font-headline font-black text-5xl mb-2">25</div>
 <div className="text-primary font-label font-bold text-sm tracking-widest uppercase">JAHRE</div>
 <div className="mt-4 h-1 w-12 bg-secondary-container mx-auto"></div>
 <p className="mt-4 text-on-surface-variant font-bold">Ehrenurkunde</p>
 <div className="mt-4 space-y-1 text-xs text-on-surface-variant/70 font-medium">
 <p>Lukas Weber (Juni 1999)</p>
 <p>Sarah Wagner (September 1999)</p>
 </div>
 </div>
 </div>
 </div>
 </section>

 {/* Contact & Admin */}
 <section className="py-12 bg-white border-t-8 border-secondary-container">
 <div className="container mx-auto px-8">
 <div className="flex flex-col lg:flex-row gap-16 items-center">
 <div className="lg:w-1/2">
 <h2 className="text-4xl font-headline font-black text-primary uppercase mb-8">Kontakt &amp; Verwaltung</h2>
 <div className="space-y-8">
 <div className="flex gap-6 items-start">
 <div className="w-12 h-12 bg-primary flex items-center justify-center rounded-xl shrink-0">
 <span className="material-symbols-outlined text-secondary-container">person</span>
 </div>
 <div>
 <h4 className="font-headline font-black text-primary uppercase text-lg">Steffi Specht</h4>
 <p className="text-on-surface-variant">Leitung Mitgliederverwaltung</p>
 <a
 className="text-primary font-bold hover:underline decoration-secondary-container decoration-4"
 href="mailto:mitgliederverwaltung@sg-huenstetten.de"
 >
 mitgliederverwaltung@sg-huenstetten.de
 </a>
 </div>
 </div>
 <div className="flex gap-6 items-start">
 <div className="w-12 h-12 bg-primary flex items-center justify-center rounded-xl shrink-0">
 <span className="material-symbols-outlined text-secondary-container">location_on</span>
 </div>
 <div>
 <h4 className="font-headline font-black text-primary uppercase text-lg">Vereinsanschrift</h4>
 <p className="text-on-surface-variant">SG Hünstetten e.V.</p>
 <p className="text-on-surface-variant">Poststrasse 1, 65510 Hünstetten – Görsroth</p>
 </div>
 </div>
 </div>
 </div>
 <div className="lg:w-1/2 w-full h-[400px] rounded-3xl overflow-hidden shadow-2xl relative">
 {/* eslint-disable-next-line @next/next/no-img-element */}
 <img
 className="w-full h-full object-cover"
 alt="Luftaufnahme einer modernen Sportanlage in grüner Landschaft"
 src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtPLx1IuNGfHSvHkiS-Inpf5dmWIWSPweI0I1BonMgOGL5GvSSq41FFssbVu40NRXqD22TD6dZE6-g0OS7njKad3VcL0zk6U_caN4tVIpFMIztEX_Q3NhOfyCDWO_SoU3NDy-3D7sjJXbc1FNYHVBnBGS5dyJNEulHOUR-WSVPTauOGzSojpKPAxKiCK8lZNmCWapHAJJHxP_-_akzuJakXob_BDyW_a80dqN6oMPcKLIRG8p8Qhv7hrqW6-kEhGIjzGIfjYiBHCk"
 />
 <div className="absolute inset-0 bg-primary/20 hover:bg-transparent transition-colors"></div>
 </div>
 </div>
 </div>
 </section>

 </main>

 <SponsorBand sponsors={sponsors} variant="grey" />
 <SiteFooter logoUrl={logoUrl} departmentLabel="Mitgliedschaft" variant="dark" />
 </div>
 )
}
