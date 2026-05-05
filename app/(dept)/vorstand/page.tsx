import BaseNav from '@/components/shared/layout/BaseNav'
import SiteFooter from '@/components/shared/layout/SiteFooter'
import SponsorBand from '@/components/shared/layout/SponsorBand'
import { fetchClubConfig, fetchSponsors } from '@/lib/api'

const VORSTAND_NAV = [
 { label: 'Vorstand', href: '#', active: true },
 { label: 'Impressum', href: '../impressum' },
 { label: 'Mitglied werden', href: '../mitgliedschaft' },
]

const BOARD_MEMBERS = [
 { name: 'Marcus Wagner', role: '1. Vorsitzender', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAM_aOS3_GNeGuXmimMJ5jaP-mcFOcHc0HAcuraoC5-ym8lOv7ZBWcWIOolhpn-gi8ZOT3-qV9BlIsNDdP4AI6Sac_UxJ27AfEHEuZHNcHO2cfZzscv88JwN4tz1NlDECEBTDQeKUPwVLkUBFcchB2-fvXwurBVTNxT2M1kbXBwcFnI8j-uFsTYzbUfIxEHveQR8UhK8RPf4sUhgOPwOUJNTvC0r_xL83cFHbg1sNDUerHqKoRjYaOlXPn7Qff1vzntzTQPpmI4rhg' },
 { name: 'Lena Schmidt', role: '2. Vorsitzende', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAh0OAw0HDWKYd3bX36_v9UC1YmuDJ72zYBIEW4pzFWDyb5NLvqtvvBOlpy1Yi7cSWqAWqssCeXvKRXIHx3k7yZrU1fjjeYNYI3IDvThKDJTo78fYA5zGRTrHSqaaSIj_hyLHKaT14Hmu7IUKvzE6tmGj8oIBAnSPKV8RN_MXy3T1wRT_Ii3Xtgs1kNVrOkyFyFs-a3o5cTLqpUBzjTRAAGHDJhojNBr75lozQuj8B56IB892EP3fzW6x40KeCEO7Qbt6I4kidzh6w' },
 { name: 'Thomas Meyer', role: 'Kassierer', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdTXsXats0_eoLQ-nA4qvewNcsnF27DVni-9-V6yXKAjaDFksLxcLnZ5cuMHoZyAlJmnk8w89ru1Np3aaT1NodAz-HQzq0dDq0TpRlNO2_5mieoaFJet8wukIQmYhk3bLJ323Rrq8kY1DUeSoWYFhS8b1nXEAw5k8-OwLUKyn6mi8dTUsDR0fIEW2GtBkwAqsF0iDkXeUDI5-eqVjIINcIn-sV-g07VVLU2qGI_qRnwDkkkwGA9Z5E85NcAUOQuPe4w-KahtZhqNc' },
 { name: 'Julia Weber', role: 'Schriftführerin', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFHic0h5j-33UQs26VJMnjBosG4q1Sp0St5q0p3uzVJnkOjiYRMBYmE6yw_yMn8kkh8bU-6CoOSfnRC1PwYSYN_NA6j5WUmc7e4F7rwE4tKf0SSSWPVWltOC_XE2hA0dhD7jyHkp_BUZXuGgBBSkzNGIBtHGPIfV5YesDEqeEZUMkOfrK4w1Hq9d1TDTmhDOE3hg4_9fNKwA8k1wqRVxEdxWIhyV3r5UU4stxWpQsqnz0ybib92faXMmgqkNzSbyb_dKnrzlUhkvI' },
 { name: 'Hans-Peter Keller', role: 'Beisitzer', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuASBrt3GBJkZnyQRDnKu0nakLpIS3QUpsmXfKDonacnb541c2z3JwBdTjVVq4G-fh2mPPFxG5Dg21kzXC8xuhhbXBq01bbhwdFFpESKTDDvVc3x1uO0zHazuBLt6jrl6x76JA5WAPhjPksG75KNgOJqnkXoYFTx6p8g5ZdjnbKpGeBXRmGgK-99ajI0FLsB36OJnEYbMTIMyctpGXbgThcrIi9qowDeHdqepxoq7WhJJJI59bJv33-1y1FYDcMB8OAF3PAEuHluKtQ' },
]

const DEPT_LEADERS = [
 { name: 'Christian Wolf', dept: 'Fußball', icon: 'sports_soccer' },
 { name: 'Anja Fischer', dept: 'Tennis', icon: 'sports_tennis' },
 { name: 'Sandra Bäcker', dept: 'Turnen', icon: 'fitness_center' },
 { name: 'Lukas Hoffmann', dept: 'Leichtathletik', icon: 'directions_run' },
 { name: 'Bernd Zorn', dept: 'Tischtennis', icon: 'sports_kabaddi' },
 { name: 'Heike Klein', dept: 'Fitness', icon: 'monitor_heart' },
 { name: 'Markus Reuter', dept: 'Badminton', icon: 'badminton' },
]

export default async function VorstandPage() {
 let logoUrl: string | null = null
 let sponsors: Awaited<ReturnType<typeof fetchSponsors>> = []
 try {
 const config = await fetchClubConfig()
 logoUrl = config.logo_web_pfad ?? config.logo_url ?? null
 if (config.operator_id) sponsors = await fetchSponsors(config.operator_id).catch(() => [])
 } catch { /* fallback */ }

 return (
 <div className="bg-surface text-on-surface font-body">
 <BaseNav
 logoUrl={logoUrl}
 clubName="Hünstetten"
 departmentLabel="Vorstand"
 navItems={VORSTAND_NAV}
 ctaLabel="Mitglied werden"
 homeHref="../"
 />

 <main className="pt-20">

 {/* Hero Section */}
 <section className="relative h-[819px] flex items-center overflow-hidden">
 <div className="absolute inset-0 z-0">
 {/* eslint-disable-next-line @next/next/no-img-element */}
 <img
 className="w-full h-full object-cover grayscale brightness-50"
 alt="Diverse group of sports club members standing in a close-knit circle with arms around each other"
 src="https://lh3.googleusercontent.com/aida-public/AB6AXuCh1pf0PSe1OH69Y5mYNCALr2HDz_5Drd4CCchPUP3owl6nV3zzMXR3DWEkooLDG2BHaqGReOSBAoJMKHqqWxE_kt9DUC4AvDqucOOW6HZltS52J2bbotldlH81cUruU6FJJPCBnblrHnpF77bRTrZCkqnmnrD8NoEudmMO6lb0wvVQZHAK1UsHL8qccqh3AGY9lMmZev8WqP7vp8Y5ZE8IE9bVc8GnQgMc_1ZnHlDegQYqrghmvXOfSlsscqnULQyTcMFjtqkty_A"
 />
 <div className="absolute inset-0 vanguard-gradient opacity-40 mix-blend-multiply"></div>
 </div>
 <div className="relative z-10 px-8 md:px-16 lg:px-24 max-w-5xl">
 <span className="inline-block bg-secondary-container text-on-secondary-container px-4 py-1 rounded-full font-label text-xs font-bold uppercase tracking-widest mb-6 ">
 80 YEARS OF EXCELLENCE
 </span>
 <h1 className="font-headline font-black text-5xl md:text-7xl text-white leading-[0.9] tracking-tight mb-6">
 GEMEINSAM FÜR <br /> <span className="text-secondary-container">HÜNSTETTEN</span>
 </h1>
 <p className="font-body text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed">
 Seit 1944 schlägt das Herz unseres Vereins durch die unermüdliche Kraft des Ehrenamts. Wir feiern die Menschen, die hinter den Kulissen die Zukunft unserer Gemeinschaft gestalten.
 </p>
 </div>
 </section>

 {/* Der Vorstand */}
 <section className="py-16 px-8 md:px-16 lg:px-24 bg-surface">
 <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
 <div>
 <h2 className="font-headline font-black text-4xl md:text-5xl text-primary tracking-tight uppercase">
 Der Vorstand
 </h2>
 <div className="h-2 w-32 bg-secondary-container mt-4"></div>
 </div>
 <p className="font-body text-on-surface-variant max-w-md">
 Das strategische Rückgrat unseres Vereins. Mit Leidenschaft und Weitblick führen sie die SG Hünstetten in das nächste Jahrzehnt.
 </p>
 </div>
 <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
 {BOARD_MEMBERS.map(({ name, role, img }) => (
 <div key={name} className="group">
 <div className="relative rounded-3xl overflow-hidden shadow-lg mb-4 aspect-[4/5]">
 {/* eslint-disable-next-line @next/next/no-img-element */}
 <img
 className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
 alt={`Portrait von ${name}, ${role}`}
 src={img}
 />
 </div>
 <h3 className="font-headline font-bold text-xl text-primary">{name}</h3>
 <p className="font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant">{role}</p>
 </div>
 ))}
 </div>
 </section>

 {/* Unsere Abteilungsleiter */}
 <section className="py-16 px-8 md:px-16 lg:px-24 bg-surface-container-low">
 <div className="text-center mb-16">
 <span className="font-label text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4 block">Kompetenz am Spielfeldrand</span>
 <h2 className="font-headline font-black text-4xl md:text-5xl text-primary tracking-tight uppercase">Unsere Abteilungsleiter</h2>
 </div>
 <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
 {DEPT_LEADERS.map(({ name, dept, icon }) => (
 <div key={name} className="bg-white p-6 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-outline-variant/10 group">
 <div className="w-16 h-16 bg-primary-container rounded-2xl flex items-center justify-center mb-6 text-secondary-container group-hover:scale-110 transition-transform">
 <span className="material-symbols-outlined text-3xl">{icon}</span>
 </div>
 <h3 className="font-headline font-bold text-lg text-primary mb-1">{name}</h3>
 <p className="font-label text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">{dept}</p>
 </div>
 ))}
 </div>
 </section>

 {/* Die Stillen Helfer */}
 <section className="py-16 px-8 md:px-16 lg:px-24 bg-primary text-white overflow-hidden relative">
 <div className="absolute top-0 right-0 opacity-10 font-headline font-black text-[15rem] leading-none select-none pointer-events-none translate-x-20">
 HEROES
 </div>
 <div className="relative z-10">
 <div className="max-w-3xl mb-16">
 <h2 className="font-headline font-black text-4xl md:text-5xl text-secondary-container tracking-tight uppercase mb-6">Die Stillen Helfer</h2>
 <p className="font-body text-xl text-white/80 leading-relaxed">
 Abseits des Scheinwerferlichts sorgen sie für einen reibungslosen Ablauf. Ohne ihre Expertise in Verwaltung, Betreuung und Technik wäre unser Vereinsleben nicht denkbar.
 </p>
 </div>
 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
 <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
 <span className="material-symbols-outlined text-secondary-container text-4xl mb-6">groups</span>
 <h3 className="font-headline font-bold text-2xl mb-2">Monika Lang</h3>
 <p className="font-label text-xs font-bold uppercase tracking-widest text-secondary-container mb-4">Mitgliederverwaltung</p>
 <p className="text-white/70 font-body text-sm">Behält seit 15 Jahren den Überblick über unsere wachsende Gemeinschaft und ist die erste Stimme am Telefon.</p>
 </div>
 <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
 <span className="material-symbols-outlined text-secondary-container text-4xl mb-6">child_care</span>
 <h3 className="font-headline font-bold text-2xl mb-2">Dieter Fuchs</h3>
 <p className="font-label text-xs font-bold uppercase tracking-widest text-secondary-container mb-4">Jugendwohl</p>
 <p className="text-white/70 font-body text-sm">Setzt sich leidenschaftlich für die Sicherheit und Förderung unserer jüngsten Talente ein.</p>
 </div>
 <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
 <span className="material-symbols-outlined text-secondary-container text-4xl mb-6">terminal</span>
 <h3 className="font-headline font-bold text-2xl mb-2">Erik Baum</h3>
 <p className="font-label text-xs font-bold uppercase tracking-widest text-secondary-container mb-4">IT-Support</p>
 <p className="text-white/70 font-body text-sm">Digitalisiert die SG Hünstetten und sorgt dafür, dass unsere Webseite und Systeme stabil laufen.</p>
 </div>
 </div>
 <div className="mt-16 flex flex-wrap gap-4 items-center">
 <span className="font-label text-xs font-bold uppercase tracking-widest text-white/50">Danke auch an:</span>
 {['Platzwarte', 'Kiosk-Team', 'Trikot-Wäsche', 'Fahrer', 'Events-Orga'].map((tag) => (
 <span key={tag} className="px-4 py-2 bg-white/5 rounded-full text-xs font-bold border border-white/10">{tag}</span>
 ))}
 </div>
 </div>
 </section>

 {/* Werde Teil des Teams CTA */}
 <section id="join" className="py-16 px-8 md:px-16 lg:px-24">
 <div className="max-w-6xl mx-auto rounded-[3rem] overflow-hidden bg-surface-container-lowest shadow-2xl flex flex-col md:flex-row border border-outline-variant/10">
 <div className="md:w-1/2 relative h-64 md:h-auto">
 {/* eslint-disable-next-line @next/next/no-img-element */}
 <img
 className="w-full h-full object-cover"
 alt="Diverse group of energetic volunteers collaborating around a table in a sunlit club room"
 src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTj99VrofU-niv9ncVZ5WtsSc8Ud-lByqrOOgSlp-Wzbh0h76AkncNLW6HfVbeoS3m6vojiTWAnrpBHfx2pxCJrVfe05GhGFSjZdJ4hxWitCgf6wzEx3LfrORjecFgFdakJOGOzn9c7LJOYJadW8l1aMYU4A7hS1Cj9fCMor_j4arPxlzSS6CpJvslns3zU6JPqvHm4O_r4kOLPP7wFwLzxPL0DeZ9qFQ1v4tzzT4SV7n1crweyIEnYby_do_R2AgxYCS8rVXgKBY"
 />
 <div className="absolute inset-0 bg-primary/20"></div>
 </div>
 <div className="md:w-1/2 p-12 md:p-20 flex flex-col justify-center">
 <h2 className="font-headline font-black text-4xl md:text-5xl text-primary tracking-tight uppercase mb-6 leading-none">
 Werde Teil <br /> des Teams
 </h2>
 <p className="font-body text-lg text-on-surface-variant mb-10">
 Jede helfende Hand macht einen Unterschied. Ob als Trainer, Helfer bei Festen oder in der Organisation – bei uns findest du deinen Platz.
 </p>
 <div className="flex flex-col sm:flex-row gap-4">
 <button className="bg-secondary-container text-on-secondary-container px-8 py-4 rounded-xl font-headline font-black uppercase tracking-wider shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95">
 Jetzt Kontaktieren
 </button>
 <button className="bg-primary-container text-white px-8 py-4 rounded-xl font-headline font-black uppercase tracking-wider shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95">
 Offene Stellen
 </button>
 </div>
 </div>
 </div>
 </section>

 </main>

 <SponsorBand sponsors={sponsors} variant="grey" />
 <SiteFooter logoUrl={logoUrl} departmentLabel="Vorstand" variant="dark" />
 </div>
 )
}
