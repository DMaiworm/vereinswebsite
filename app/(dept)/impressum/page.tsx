import BaseNav from '@/components/shared/layout/BaseNav'
import SiteFooter from '@/components/shared/layout/SiteFooter'
import SponsorBand from '@/components/shared/layout/SponsorBand'
import { fetchClubConfig, fetchSponsors } from '@/lib/api'

const IMPRESSUM_NAV = [
 { label: 'Impressum', href: '#', active: true },
 { label: 'Datenschutz', href: '#datenschutz' },
 { label: 'Satzung', href: '#satzung' },
 { label: 'Vorstand', href: '../vorstand' },
]

export default async function ImpressumPage() {
 let logoUrl: string | null = null
 let sponsors: Awaited<ReturnType<typeof fetchSponsors>> = []
 try {
 const config = await fetchClubConfig()
 logoUrl = config.logoWebUrl ?? config.logoUrl ?? null
 sponsors = await fetchSponsors().catch(() => [])
 } catch { /* fallback */ }

 return (
 <div className="bg-surface font-body text-on-surface">
 <BaseNav
 logoUrl={logoUrl}
 clubName="Hünstetten"
 departmentLabel="Impressum"
 navItems={IMPRESSUM_NAV}
 ctaLabel="Mitglied werden"
 ctaHref="#kontakt"
 homeHref="../"
 />

 <main className="pt-20">

 {/* Hero Section */}
 <section className="relative h-[400px] flex items-center justify-center overflow-hidden bg-primary">
 <div className="absolute inset-0 opacity-20 scale-110">
 {/* eslint-disable-next-line @next/next/no-img-element */}
 <img
 className="w-full h-full object-cover"
 alt="Cinematic low-angle shot of a premium synthetic running track with bold white lane markings"
 src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLZ5DaRpgAZQj0F8EwSvEpI3nBcw77fMDz0619Yx6PsFi6tmHRRdbGN7VQfNlGwP6xrhPp1fHZHvwPoP9Bxjkbtw9dCmsgElOaQWxOKwq0QiK9H6fIcyaLTsVqtXBQ_mOtyT3m4UEz8Sm1YowwaFPF5Kczo-3xfUyrQT7ox8WWl8_RnBfV0eA2yPhWxToEOGkm8ym2FF92JiKhjKR8wjY4TfXuoIiLkd6HFHGAU918J7umld55J8nrt4s68fMTf5OrX-pM_fup1NU"
 />
 </div>
 <div className="absolute inset-0 bg-gradient-to-br from-[rgba(5,40,86,0.90)] to-[rgba(34,62,109,0.40)]"></div>
 <div className="relative z-10 text-center px-4">
 <div className="inline-block bg-yellow-400 text-primary font-headline font-black px-4 py-1 mb-4 text-sm tracking-widest uppercase">Official Compliance</div>
 <h1 className="text-5xl md:text-7xl font-headline font-black text-white tracking-tighter uppercase leading-none">
 RECHTLICHES &amp; <br /><span className="text-yellow-400">IMPRESSUM</span>
 </h1>
 </div>
 </section>

 {/* Bento Layout Content */}
 <section id="kontakt" className="max-w-7xl mx-auto px-6 py-12">
 <div className="grid grid-cols-1 md:grid-cols-12 gap-8">

 {/* Impressum */}
 <div className="md:col-span-7 bg-surface-container-lowest rounded-3xl p-10 shadow-lg border-l-8 border-primary relative overflow-hidden">
 <span className="material-symbols-outlined text-primary/5 absolute -right-4 -bottom-4 text-9xl font-black">gavel</span>
 <h2 className="text-3xl font-headline font-black text-primary mb-8 uppercase tracking-tight">Impressum</h2>
 <div className="space-y-6 text-on-surface-variant leading-relaxed">
 <div>
 <p className="font-bold text-primary uppercase text-xs tracking-widest mb-1">Vereinsname</p>
 <p className="text-xl font-semibold text-on-surface">SG 1947 Hünstetten e.V.</p>
 </div>
 <div className="grid grid-cols-2 gap-8">
 <div>
 <p className="font-bold text-primary uppercase text-xs tracking-widest mb-1">Anschrift</p>
 <p>Sportweg 1<br />65510 Hünstetten<br />Deutschland</p>
 </div>
 <div>
 <p className="font-bold text-primary uppercase text-xs tracking-widest mb-1">Register</p>
 <p>Vereinsregister: VR 1234<br />Amtsgericht Wiesbaden<br />Steuernummer: 04/815/12345</p>
 </div>
 </div>
 <div>
 <p className="font-bold text-primary uppercase text-xs tracking-widest mb-1">Kontakt</p>
 <div className="flex flex-col gap-2">
 <a className="flex items-center gap-2 text-primary hover:underline" href="mailto:info@sg-huenstetten.de">
 <span className="material-symbols-outlined text-sm">mail</span> info@sg-huenstetten.de
 </a>
 <a className="flex items-center gap-2 text-primary hover:underline" href="tel:+49123456789">
 <span className="material-symbols-outlined text-sm">call</span> +49 (0) 6126 1234-0
 </a>
 </div>
 </div>
 </div>
 </div>

 {/* Datenschutz */}
 <div id="datenschutz" className="md:col-span-5 bg-primary-container text-white rounded-3xl p-10 shadow-2xl relative transform-none md:rotate-1">
 <h2 className="text-3xl font-headline font-black text-yellow-400 mb-6 uppercase tracking-tight">Datenschutz</h2>
 <p className="mb-8 text-on-primary-container leading-relaxed">
 Der Schutz Ihrer persönlichen Daten ist uns ein zentrales Anliegen. Wir verarbeiten Ihre Daten ausschließlich auf Grundlage der gesetzlichen Bestimmungen (DSGVO).
 </p>
 <ul className="space-y-4 mb-8">
 <li className="flex items-start gap-3">
 <span className="material-symbols-outlined text-yellow-400">verified_user</span>
 <span className="text-sm">Verschlüsselte Datenübertragung (SSL)</span>
 </li>
 <li className="flex items-start gap-3">
 <span className="material-symbols-outlined text-yellow-400">visibility_off</span>
 <span className="text-sm">Keine Weitergabe an unbefugte Dritte</span>
 </li>
 </ul>
 <button className="w-full bg-yellow-400 text-primary font-headline font-black py-4 rounded-xl hover:bg-white transition-colors uppercase tracking-widest">
 Vollständige Erklärung
 </button>
 </div>

 {/* Kindeswohl-Kodex */}
 <div className="md:col-span-12 bg-surface-container-low rounded-3xl p-10 border-r-8 border-primary shadow-lg relative">
 <div className="flex flex-col md:flex-row gap-10 items-center">
 <div className="w-full md:w-2/3">
 <h2 className="text-3xl font-headline font-black text-primary mb-6 uppercase tracking-tight">Kindeswohl-Kodex</h2>
 <p className="text-on-surface-variant leading-relaxed mb-6">
 Die SG 1947 Hünstetten e.V. bekennt sich uneingeschränkt zum Schutz von Kindern und Jugendlichen. Wir schaffen ein Umfeld des Vertrauens, in dem sportliche Entwicklung und persönliches Wohlergehen Hand in Hand gehen. Unser präventives Schutzkonzept ist fester Bestandteil unserer Vereinskultur und wird von allen Trainern und Betreuern aktiv gelebt.
 </p>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 <div className="flex items-center gap-3 bg-white p-4 rounded-xl border border-outline-variant">
 <span className="material-symbols-outlined text-primary">security</span>
 <span className="text-sm font-bold uppercase text-primary">Prävention &amp; Schutz</span>
 </div>
 <div className="flex items-center gap-3 bg-white p-4 rounded-xl border border-outline-variant">
 <span className="material-symbols-outlined text-primary">shield_person</span>
 <span className="text-sm font-bold uppercase text-primary">Qualifizierte Betreuung</span>
 </div>
 </div>
 </div>
 <div className="w-full md:w-1/3 bg-primary rounded-2xl p-8 text-center text-white ">
 <span className="material-symbols-outlined text-yellow-400 text-6xl mb-4">favorite</span>
 <p className="font-headline font-black uppercase text-lg leading-tight">Unsere Verantwortung,<br />Ihre Sicherheit.</p>
 </div>
 </div>
 </div>

 {/* Satzung */}
 <div id="satzung" className="md:col-span-12 lg:col-span-4 bg-surface-container-high rounded-3xl p-8 flex flex-col justify-between border-t-8 border-yellow-400 shadow-lg">
 <div>
 <h2 className="text-2xl font-headline font-black text-primary mb-4 uppercase tracking-tight">Unsere Satzung</h2>
 <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
 Die Satzung bildet das rechtliche Fundament der SG 1947 Hünstetten e.V. Sie definiert unsere Werte, Ziele und den organisatorischen Rahmen für unsere über 80-jährige Tradition.
 </p>
 </div>
 <a className="group flex items-center justify-between bg-white p-4 rounded-2xl border border-outline-variant hover:border-primary transition-all" href="#">
 <div className="flex items-center gap-4">
 <span className="material-symbols-outlined text-primary text-3xl">picture_as_pdf</span>
 <div>
 <p className="font-bold text-primary text-sm uppercase">Satzung_2024.pdf</p>
 <p className="text-xs text-on-surface-variant">2.4 MB • PDF Dokument</p>
 </div>
 </div>
 <span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">download</span>
 </a>
 </div>

 {/* Download-Bereich */}
 <div className="md:col-span-12 lg:col-span-8 bg-surface-container-high rounded-3xl p-8 border-t-8 border-primary shadow-lg">
 <h2 className="text-2xl font-headline font-black text-primary mb-6 uppercase tracking-tight">Download-Bereich</h2>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <a className="group flex items-center justify-between bg-white p-4 rounded-2xl border border-outline-variant hover:border-primary transition-all" href="#">
 <div className="flex items-center gap-4">
 <span className="material-symbols-outlined text-primary text-3xl">local_parking</span>
 <div>
 <p className="font-bold text-primary text-sm uppercase">Platzordnung.pdf</p>
 <p className="text-xs text-on-surface-variant">1.1 MB • PDF Dokument</p>
 </div>
 </div>
 <span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">download</span>
 </a>
 <a className="group flex items-center justify-between bg-white p-4 rounded-2xl border border-outline-variant hover:border-primary transition-all" href="#">
 <div className="flex items-center gap-4">
 <span className="material-symbols-outlined text-primary text-3xl">domain</span>
 <div>
 <p className="font-bold text-primary text-sm uppercase">Gebäudeordnung.pdf</p>
 <p className="text-xs text-on-surface-variant">0.8 MB • PDF Dokument</p>
 </div>
 </div>
 <span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">download</span>
 </a>
 </div>
 </div>

 {/* Vorstand */}
 <div id="vorstand" className="md:col-span-12 bg-surface-container-lowest rounded-3xl p-10 shadow-lg">
 <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
 <h2 className="text-3xl font-headline font-black text-primary uppercase tracking-tight">Der Vorstand</h2>
 <span className="text-xs font-bold text-primary bg-primary-fixed px-3 py-1 rounded-full uppercase tracking-widest">Wahlperiode 2023-2025</span>
 </div>
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
 {[
 { name: 'Hans Jung', role: '1. Vorsitzender' },
 { name: 'Petra Müller', role: 'Schatzmeisterin' },
 { name: 'Markus Weber', role: 'Sportwart' },
 { name: 'Julia Schmidt', role: 'Schriftführerin' },
 { name: 'Thomas Klein', role: 'Jugendwart' },
 { name: 'Bernd Wagner', role: 'Beisitzer' },
 ].map(({ name, role }) => (
 <div key={name} className="bg-surface p-6 rounded-2xl hover:shadow-md transition-shadow border-b-4 border-transparent hover:border-yellow-400">
 <p className="font-headline font-black text-primary text-lg leading-tight mb-1">{name}</p>
 <p className="text-xs font-bold text-primary/60 uppercase tracking-widest">{role}</p>
 </div>
 ))}
 </div>
 </div>

 </div>
 </section>

 </main>

 <SponsorBand sponsors={sponsors} variant="grey" />
 <SiteFooter logoUrl={logoUrl} departmentLabel="Impressum" variant="dark" />
 </div>
 )
}
