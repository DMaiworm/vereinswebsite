import BaseNav from '@/components/shared/layout/BaseNav'
import SiteFooter from '@/components/shared/layout/SiteFooter'
import SponsorBand from '@/components/shared/layout/SponsorBand'
import { fetchClubConfig, fetchSponsors, fetchVorstand } from '@/lib/api'
import type { VorstandEintrag } from '@/lib/api'

const VORSTAND_NAV = [
 { label: 'Vorstand', href: '#', active: true },
 { label: 'Impressum', href: '../impressum' },
 { label: 'Mitglied werden', href: '../mitgliedschaft' },
]

function getInitials(name: string): string {
  const parts = name.trim().split(' ')
  return parts.length >= 2
    ? `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
    : name.slice(0, 2).toUpperCase()
}

export default async function VorstandPage() {
 let logoUrl: string | null = null
 let sponsors: Awaited<ReturnType<typeof fetchSponsors>> = []
 let vorstand: VorstandEintrag[] = []
 let abteilungsleiter: VorstandEintrag[] = []

 try {
   const config = await fetchClubConfig()
   logoUrl = config.logoWebUrl ?? config.logoUrl ?? null
   sponsors = await fetchSponsors().catch(() => [])
   const vorstandData = await fetchVorstand().catch(() => ({ vorstand: [], abteilungsleiter: [] }))
   vorstand = vorstandData.vorstand
   abteilungsleiter = vorstandData.abteilungsleiter
 } catch { /* fallback: empty lists */ }

 return (
 <div className="bg-surface text-on-surface font-body">
 <BaseNav
   logoUrl={logoUrl}
   clubName="Hünstetten"
   navItems={VORSTAND_NAV}
   ctaLabel="Mitglied werden"
   ctaHref="#join"
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
   {vorstand.length > 0 && (
     <section className="py-12 px-8 md:px-16 lg:px-24 bg-surface">
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
         {vorstand.map((person) => (
           <div key={person.id} className="group">
             <div className="relative rounded-3xl overflow-hidden shadow-lg mb-4 aspect-[4/5] bg-surface-container flex items-center justify-center">
               {person.fotoUrl ? (
                 /* eslint-disable-next-line @next/next/no-img-element */
                 <img
                   className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                   alt={`Portrait von ${person.name}, ${person.bezeichnung}`}
                   src={person.fotoUrl}
                 />
               ) : (
                 <span className="font-headline font-black text-5xl text-primary/30">
                   {getInitials(person.name)}
                 </span>
               )}
             </div>
             <h3 className="font-headline font-bold text-xl text-primary">{person.name}</h3>
             <p className="font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant">{person.bezeichnung}</p>
           </div>
         ))}
       </div>
     </section>
   )}

   {/* Unsere Abteilungsleiter */}
   {abteilungsleiter.length > 0 && (
     <section className="py-12 px-8 md:px-16 lg:px-24 bg-surface-container-low">
       <div className="text-center mb-16">
         <span className="font-label text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4 block">Kompetenz am Spielfeldrand</span>
         <h2 className="font-headline font-black text-4xl md:text-5xl text-primary tracking-tight uppercase">Unsere Abteilungsleiter</h2>
       </div>
       <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
         {abteilungsleiter.map((person) => (
           <div key={person.id} className="bg-white p-6 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-outline-variant/10 group">
             <div className="w-16 h-16 bg-primary-container rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform overflow-hidden">
               {person.fotoUrl ? (
                 /* eslint-disable-next-line @next/next/no-img-element */
                 <img
                   src={person.fotoUrl}
                   alt={person.name}
                   className="w-full h-full object-cover"
                 />
               ) : (
                 <span className="font-headline font-bold text-xl text-secondary-container">
                   {getInitials(person.name)}
                 </span>
               )}
             </div>
             <h3 className="font-headline font-bold text-lg text-primary mb-1">{person.name}</h3>
             <p className="font-label text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
               {person.abteilung ?? person.bezeichnung}
             </p>
           </div>
         ))}
       </div>
     </section>
   )}

   {/* Werde Teil des Teams CTA */}
   <section id="join" className="py-12 px-8 md:px-16 lg:px-24">
     <div className="max-w-6xl mx-auto rounded-[3rem] overflow-hidden bg-surface-container-lowest shadow-2xl flex flex-col md:flex-row border border-outline-variant/10">
       <div className="md:w-1/2 relative h-64 md:h-auto">
         {/* eslint-disable-next-line @next/next/no-img-element */}
         <img
           className="w-full h-full object-cover"
           alt="Diverse group of energetic volunteers collaborating around a table in a sunlit club room"
           src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTj99VrofU-niv9ncVZ5WtsSc8Ud-lByqrOOgSlp-Wzbh0h76AkncNLW6HfVbeoS3m6vojiTWAnrpBHfx2pxCJrVfe05GhGFSjZdJ4hxWitCgf6bzX3LfrORjecFgFdakJOGOzn9c7LJOYJadW8l1aMYU4A7hS1Cj9fCMor_j4arPxlzSS6CpJvslns3zU6JPqvHm4O_r4kOLPP7wFwLzxPL0DeZ9qFQ1v4tzzT4SV7n1crweyIEnYby_do_R2AgxYCS8rVXgKBY"
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
