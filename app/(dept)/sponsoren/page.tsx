import { fetchClubConfig, fetchSponsors } from '@/lib/api'
import BaseNav from '@/components/shared/layout/BaseNav'
import SiteFooter from '@/components/shared/layout/SiteFooter'
import UnserePartner from '@/components/shared/sections/UnserePartner'
import SponsorenEbenen from '@/components/shared/sections/SponsorenEbenen'
import VielfaltKooperation from '@/components/shared/sections/VielfaltKooperation'
import SponsoringInAction from '@/components/shared/sections/SponsoringInAction'

const SPONSOREN_NAV = [
 { label: 'Sponsoring', href: '#' },
 { label: 'Partner', href: '#partner', active: true },
 { label: 'Pakete', href: '#pakete' },
 { label: 'Kontakt', href: '#kontakt' },
]

export default async function SponsorenPage() {
 let logoUrl: string | null = null
 let sponsors: Awaited<ReturnType<typeof fetchSponsors>> = []
 try {
 const config = await fetchClubConfig()
 logoUrl = config.logoWebUrl ?? config.logoUrl
 sponsors = await fetchSponsors().catch(() => [])
 } catch { /* Fallback */ }
 return (
 <div className="bg-background font-body text-on-surface">

 <BaseNav logoUrl={logoUrl} clubName="Hünstetten" departmentLabel="Sponsoring" navItems={SPONSOREN_NAV} ctaLabel="Partner werden" ctaHref="#kontakt" />

 <main className="pt-16">

 {/* Hero Section */}
 <section className="relative h-[870px] flex items-center overflow-hidden vanguard-gradient">
 <div className="absolute inset-0 opacity-40">
 {/* eslint-disable-next-line @next/next/no-img-element */}
 <img alt="Dramatic sports stadium at night" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUnclHGaTb7Ch5I6cMu_-5Jb8cGqz8EDh_kVRCtUKnlnihHPEDD3J8l1x-YhcOi1fmP_rdvX-hmp_JMZbTyRm68ibX6JueOUsVr4TKjJyKhrU-SUnUm9cGHvdu_JGsSETd1UjHIi4uvAQ0p_JPoxAevAbGQpcKUMgX-whIZIQYcMmuW871T_NXwfuntqGgjifDBSX7Oc3AGLV9czUy4wHTyoJAMzqp6NaxMEAJw8f5O3BeMOF-NTitE6d_q4zI4I8G1qwHFz2da_U" />
 </div>
 <div className="container mx-auto px-8 relative z-10">
 <div className="max-w-4xl">
 <span className="inline-block bg-secondary-container text-on-secondary-container font-headline font-black uppercase px-4 py-1 tracking-widest mb-6 ">
 SG HÜNSTETTEN PARTNERSHIP
 </span>
 <h1 className="text-white font-headline font-black uppercase text-6xl md:text-8xl leading-[0.9] tracking-tighter mb-8">
 GEMEINSAM ZUM <span className="text-secondary-container">ERFOLG</span>
 </h1>
 <p className="text-white/90 text-xl md:text-2xl font-body max-w-2xl leading-relaxed">
 Seit 80 Jahren verbinden wir Tradition mit sportlicher Exzellenz. Werden Sie Teil unserer Vision und gestalten Sie die Zukunft des Sports in Hünstetten aktiv mit.
 </p>
 <div className="mt-12 flex flex-wrap gap-6">
 <button className="bg-secondary-container text-on-secondary-container font-headline font-black uppercase px-10 py-4 rounded-xl text-lg shadow-2xl hover:scale-105 transition-transform">
 JETZT PARTNER WERDEN
 </button>
 <button className="border-2 border-white/30 text-white font-headline font-bold uppercase px-10 py-4 rounded-xl text-lg backdrop-blur-sm hover:bg-white/10 transition-colors">
 UNSERE STORY
 </button>
 </div>
 </div>
 </div>
 <div className="absolute bottom-0 right-0 w-1/3 h-full bg-secondary-container/5 skew-x-[-15deg] translate-x-1/2"></div>
 </section>

 {/* Statistics Section */}
 <section className="py-12 bg-surface relative overflow-hidden">
 <div className="container mx-auto px-8">
 <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
 <div className="p-4 bg-surface-container-lowest rounded-3xl shadow-lg border-b-4 border-secondary-container transform hover:-translate-y-2 transition-transform">
 <div className="text-primary font-headline font-black text-5xl mb-2">45+</div>
 <div className="text-on-surface-variant font-label font-bold uppercase tracking-widest text-xs">Aktive Partner</div>
 </div>
 <div className="p-4 bg-surface-container-lowest rounded-3xl shadow-lg border-b-4 border-secondary-container transform hover:-translate-y-2 transition-transform">
 <div className="text-primary font-headline font-black text-5xl mb-2">800+</div>
 <div className="text-on-surface-variant font-label font-bold uppercase tracking-widest text-xs">Mitglieder</div>
 </div>
 <div className="p-4 bg-surface-container-lowest rounded-3xl shadow-lg border-b-4 border-secondary-container transform hover:-translate-y-2 transition-transform">
 <div className="text-primary font-headline font-black text-5xl mb-2">12</div>
 <div className="text-on-surface-variant font-label font-bold uppercase tracking-widest text-xs">Abteilungen</div>
 </div>
 <div className="p-4 bg-surface-container-lowest rounded-3xl shadow-lg border-b-4 border-secondary-container transform hover:-translate-y-2 transition-transform">
 <div className="text-primary font-headline font-black text-5xl mb-2">1944</div>
 <div className="text-on-surface-variant font-label font-bold uppercase tracking-widest text-xs">Gründungsjahr</div>
 </div>
 </div>
 </div>
 </section>

 {/* Integrated CTA Section */}
 <section id="kontakt" className="py-12 bg-surface-container-highest relative overflow-hidden">
 <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-16 items-center">
 <div>
 <h2 className="font-headline text-4xl md:text-5xl font-black text-primary leading-tight mb-6">
 Werden Sie Teil unserer <span className="bg-secondary-container px-2">Erfolgsgeschichte.</span>
 </h2>
 <p className="text-lg text-on-surface-variant mb-10 leading-relaxed">
 Wir bieten Unternehmen vielfältige Möglichkeiten, sich regional zu engagieren und die Markenpräsenz in einem hochemotionalen Umfeld zu steigern. Von Bandenwerbung bis hin zu digitalen Partnerschaften.
 </p>
 <div className="flex flex-col sm:flex-row gap-4">
 <a className="inline-flex items-center justify-center bg-primary text-on-primary px-8 py-4 rounded-lg font-bold hover:bg-primary-container transition-all shadow-xl shadow-primary/10" href="#">
 Partner-Pakete ansehen
 </a>
 <a className="inline-flex items-center justify-center bg-white text-primary border border-primary/10 px-8 py-4 rounded-lg font-bold hover:bg-surface-container-low transition-all" href="#">
 Kontakt aufnehmen
 </a>
 </div>
 </div>
 <div className="relative">
 <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl relative z-10">
 {/* eslint-disable-next-line @next/next/no-img-element */}
 <img alt="Business professionals shaking hands in a stadium setting" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2fU-GnIgjdeKaOcGDix24SdaWNRPMgVJg-GVmUqn_JqAo-RqgLyXnOIkkKig-BAR1Tdh2oORC3p_EZ-Rq1Gn_W4oZCGsOSQTtHYpgQ0eM_zm6kIWUDqDi673xTp8h4DnUWc6UGIe2iidaKJvFrwjQj3n_AvCj-gYi3k8Nm-NrEy0dS1Bb-B-D9xW2GOhB9DST3VGZ8987wiKl7DmPiwl-cR0u5CbJs98gdFS-8uDqkAQkejrrH6o2GN7UsdCw-BPnygkKK8aCwyM" />
 </div>
 <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-secondary-container rounded-2xl -z-0 opacity-50"></div>
 <div className="absolute -top-8 -right-8 w-32 h-32 border-4 border-primary rounded-full -z-0"></div>
 </div>
 </div>
 </section>

 <SponsorenEbenen />

 <VielfaltKooperation />

 <UnserePartner sponsors={sponsors} />

 <SponsoringInAction />

 </main>

 <SiteFooter logoUrl={logoUrl} departmentLabel="Sponsoring" />

 </div>
 )
}
