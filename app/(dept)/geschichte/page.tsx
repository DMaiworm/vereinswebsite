import BaseNav from '@/components/shared/layout/BaseNav'
import SiteFooter from '@/components/shared/layout/SiteFooter'
import SponsorBand from '@/components/shared/layout/SponsorBand'
import { fetchClubConfig, fetchSponsors, fetchGeschichte } from '@/lib/api'

const GESCHICHTE_NAV = [
 { label: 'Gründung', href: '#gruendung' },
 { label: 'Chronik', href: '#chronik', active: true },
 { label: 'Gemeinschaft', href: '#gemeinschaft' },
 { label: 'Mitglied werden', href: '../mitgliedschaft' },
]

type MilestoneProps = {
 year: string
 title: string
 desc: string
 imageUrl?: string
 dotClass: string
 align: 'left' | 'right'
}

function MilestoneItem({ year, title, desc, imageUrl, dotClass, align }: MilestoneProps) {
 const card = (
 <div className={`bg-white p-6 rounded-2xl shadow-md inline-block ${align === 'left' ? 'border-r-4 border-primary' : 'border-l-4 border-secondary-container'}`}>
 <span className="text-3xl font-headline font-black text-primary block mb-1">{year}</span>
 <h4 className="font-headline font-bold text-lg uppercase mb-2">{title}</h4>
 <p className="text-sm text-on-surface-variant max-w-sm">{desc}</p>
 </div>
 )

 const img = imageUrl ? (
 // eslint-disable-next-line @next/next/no-img-element
 <img alt={`Geschichte ${year}`} className="w-32 h-24 object-cover rounded-xl shadow-lg border-2 border-white grayscale" src={imageUrl} />
 ) : null

 const dot = <div className={`z-10 w-4 h-4 ${dotClass} rounded-full absolute left-4 md:left-1/2 md:-ml-2 mt-4 md:mt-0`}></div>

 if (align === 'left') {
 return (
 <div className="relative flex flex-col md:flex-row items-center">
 <div className="md:w-1/2 md:pr-12 md:text-right">{card}</div>
 {dot}
 <div className="md:w-1/2 md:pl-12 mt-4 md:mt-0">{img}</div>
 </div>
 )
 }
 return (
 <div className="relative flex flex-col md:flex-row items-center">
 <div className="md:w-1/2 md:pr-12 md:text-right order-2 md:order-1 mt-4 md:mt-0">
 {img && <div className="ml-auto w-fit">{img}</div>}
 </div>
 {dot}
 <div className="md:w-1/2 md:pl-12 order-1 md:order-2">{card}</div>
 </div>
 )
}

// Styling alterniert zwischen geraden (0,2) und ungeraden (1,3) Ären-Indizes
const ERA_STYLES = [
 { headerBg: 'bg-secondary-container', headerText: 'text-primary',   dotClass: 'bg-primary' },
 { headerBg: 'bg-primary',             headerText: 'text-white',     dotClass: 'bg-secondary-container' },
]

export default async function GeschichtePage() {
 let logoUrl: string | null = null
 let sponsors: Awaited<ReturnType<typeof fetchSponsors>> = []
 let aeren: Awaited<ReturnType<typeof fetchGeschichte>>['aeren'] = []

 try {
   const config = await fetchClubConfig()
   logoUrl = config.logoWebUrl ?? config.logoUrl ?? null
   sponsors = await fetchSponsors().catch(() => [])
   const geschichte = await fetchGeschichte()
   aeren = geschichte.aeren
 } catch { /* fallback */ }

 return (
 <div className="bg-background text-on-background font-body selection:bg-secondary-container selection:text-on-secondary-container">
 <BaseNav
 logoUrl={logoUrl}
 clubName="Hünstetten"
 navItems={GESCHICHTE_NAV}
 ctaLabel="Mitglied werden"
 ctaHref="../mitgliedschaft"
 homeHref="../"
 />

 <main className="pt-20">

 {/* Hero */}
 <section className="relative h-[600px] flex items-center overflow-hidden">
 <div className="absolute inset-0 z-0">
 {/* eslint-disable-next-line @next/next/no-img-element */}
 <img
 alt="Historisches Sportfeld"
 className="w-full h-full object-cover grayscale opacity-40"
 src="https://lh3.googleusercontent.com/aida-public/AB6AXuASr3Y_PQzy5GE_Gw-EQ0tCF35PHEPSIIHY_fswx86DtzqROpMLYxolyM6Fc4fDEXkkycgIQgrorIHscbjK2HrE2XUGtrZvqH7z2D0QnH-5MGMzXA9CkGrn3JJ09t82aLB40BGjbI3_KOaYh0TKQXzNilb5UmF5CtlAD0KdMjHdB52HRgYLJTVcWo4HYY33oPepACunc167hDggd4EFVIll7hxY6VQ9WAzUcxz_CMVis_3lJLqGpNTvIxJ2_3mqBIGWfh_J2A5ubxk"
 />
 <div className="absolute inset-0 bg-gradient-to-r from-[rgba(5,40,86,1)] via-[rgba(5,40,86,0.80)] to-transparent"></div>
 </div>
 <div className="relative z-10 container mx-auto px-6">
 <div className="max-w-4xl">
 <span className="inline-block bg-secondary-container text-on-secondary-container font-headline font-black uppercase tracking-widest px-4 py-1 mb-6 ">
 SEIT 1947
 </span>
 <h1 className="text-5xl md:text-7xl font-headline font-black text-white uppercase tracking-tighter leading-[0.9] mb-4">
 UNSERE GESCHICHTE <br />
 <span className="text-secondary-container">80 JAHRE MOMENTUM</span>
 </h1>
 <p className="text-xl md:text-2xl font-body text-white/80 max-w-2xl font-medium">
 Von bescheidenen Anfängen bis zum modernen Sportverein – begleiten Sie uns durch acht Jahrzehnte voller Leidenschaft.
 </p>
 </div>
 </div>
 </section>

 {/* Timeline */}
 <section id="chronik" className="py-12 bg-surface relative timeline-line">
 <div className="container mx-auto px-6 relative">

 {aeren.length === 0 ? (
 <div className="text-center py-24">
 <p className="text-2xl font-headline font-black text-on-surface-variant uppercase tracking-tight">
 Vereinsgeschichte wird gerade gepflegt.
 </p>
 <p className="mt-3 text-on-surface-variant">Schauen Sie bald wieder vorbei.</p>
 </div>
 ) : (
 aeren.map((aera, aeraIdx) => {
 const style = ERA_STYLES[aeraIdx % 2]
 const isFirstAera = aeraIdx === 0
 return (
 <div key={aera.id} id={isFirstAera ? 'gruendung' : undefined} className={`mb-32 ${aeraIdx > 0 ? 'pt-24' : ''}`}>
 <div className="flex justify-center mb-16">
 <h2 className={`text-3xl md:text-4xl font-headline font-black ${style.headerText} uppercase tracking-tight ${style.headerBg} px-8 py-3`}>
 {aera.titel.toUpperCase()}{aera.zeitraum ? ` (${aera.zeitraum})` : ''}
 </h2>
 </div>
 <div className="space-y-16">
 {aera.meilensteine.map((ms, msIdx) => (
 <MilestoneItem
 key={ms.id}
 year={String(ms.jahr)}
 title={ms.titel}
 desc={ms.beschreibung ?? ''}
 imageUrl={ms.fotoUrl ?? undefined}
 dotClass={style.dotClass}
 align={msIdx % 2 === 0 ? 'left' : 'right'}
 />
 ))}
 </div>

 {/* Gallery Break nach Ära 1 (Gründungsjahre) */}
 {aeraIdx === 0 && (
 <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-4 px-4">
 {[
 'AB6AXuBXy1aNQxb9UwdtGX-8uThPUI8kwKQNZtkutDoebsjBTeWac7vENSQn1qmOIDFCKRgkrQQXm7nomJI7iGy-SuxBnf2ks14vBp7SbE2ztjy3i70VxszyyAEuGklVr_3FxqnCuGddK7DvTgUzpydN6wHMzYpyw0MjwhWErf5ilicIv1uuN5ZipXeXtrpQsV-rZ3xjZ34iKMyx6LM9wVyQ9lfAuMzclLAMgEiGOKc_1SS5A0ulBunV38P9_iiqcMnkpgiJnttEf0phFxA',
 'AB6AXuDtZwwDhJIdtrp6GKFjnt5dtvBAK0OgpWhv5OEE3KN8kb4fltRpwNSgkMUVx0o0As9sfI3eafwcY6mDnBKwYDoGmgMBzzRXdq0fU8-5CepiTADx0ihbc7WP-G3ike5YflNwpWDFspQ5yVBKZpvcPklL7d_orYcEIHggsC6uHwpXPHl7M2up_aRz3SUuHH1ehyvOEuNhRnwQUBiHZV_LHaPb8EY3_7IDvCV3albpXfJqNmRUFLy1KJA5F9SFZRb6VEl3t7QM3MuPf1Q',
 'AB6AXuBXYuqHSJ-97RRMqM5wvz2cxyH_TvV26RF01jlLk3V3hlSVAUMzQNS5pkX_IKX7vGk7vkQh3sUmAMegIYne15C2UICFNBDOShziTGoJjSDCtJXxm7qhO55EiVGUfaAXhdUo_Hv25QoM-JeIJ8dh6j7jfdJEOD-i5HO7vb4iDZ-nFers1poSOfwvXh-37XGtUm4dm9BqQ4-Zs_ooa79Y6Wr_H05vN6QNYSjjwG3-EOp1UTS8n_jx1spQuJoqq-yni0QfEH0-rc8X3p8',
 'AB6AXuDG0avMdm5qyqMBOZy5fMBWjfwmrhTFXPVhFcmVxrcAWtKtuWHX93zyCBaNUA2a5dUnWcA_SCb0zQIGHyNGxJJ1y0r6ereFKb2zRfrMM77kt2svczmbML89JFYUgnTzEK4v-cgpYCRBnaaFiLiyhp7MQxdo5PhuvKFYXkkR5cQaQicgu5Zd4fBwPQI8DmZurP62VZF3XfzarmoaQnF7G1k9QnKVhGn9gHVZROphEy9t8X9DC2LqNo',
 ].map((id, i) => (
 <div key={i} className={`aspect-square bg-slate-200 rounded-3xl overflow-hidden group ${i % 2 === 1 ? 'translate-y-8' : ''}`}>
 {/* eslint-disable-next-line @next/next/no-img-element */}
 <img
 alt={`Historisches Foto ${i + 1}`}
 className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
 src={`https://lh3.googleusercontent.com/aida-public/${id}`}
 />
 </div>
 ))}
 </div>
 )}

 {/* Feature Gallery nach Ära 3 (Die Goldene Ära) */}
 {aeraIdx === 2 && (
 <div className="mt-24 px-4">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-primary p-12 rounded-[3rem]">
 <div className="space-y-6">
 <h3 className="text-3xl font-headline font-black text-secondary-container uppercase">Legenden von Hünstetten</h3>
 <p className="text-white/80 font-body text-lg">
 Ein Blick in das Fotoarchiv zeigt die Emotionen der 90er Jahre – von dramatischen Derbys bis zu rauschenden Aufstiegsfeiern.
 </p>
 <button className="bg-secondary-container text-primary px-8 py-3 rounded-xl font-bold uppercase tracking-widest hover:scale-105 transition-transform">
 ZUM ARCHIV
 </button>
 </div>
 <div className="grid grid-cols-2 gap-4">
 {[
 'AB6AXuBbKU2gNZUaNwEl2jwZP3JrYIM43n_Fo2HYmeu-oqhqowM0YHxCS1swajNJROzf6044Zm6dpjBdqZuPbry_jaYIgsxbO7Dmab2CjocseHkaZbtydtKwL_G3dbHRr7Xs9B58TruMRnwtz9jfWfTrgumt6gA7u2dYqGfdJ18iWxmn4z5Gha2fRMla2C2WioolgDKGpabfiZBV_7qk_gZhlL7I6W1Ygg7fOAS_sdMqg9X6AMqM-CKbqROnaGHSHGUFgsUtBXzaEBpO8ww',
 'AB6AXuA0X2Sm9-ikU1sIUiqLHqvO6C7wYBFgAJHY8vTqGjsWN-cleAuvPpAfsJB8mMXPL2-G9t5938wym-RGeOsLBotR55dCDzIhNV6rh1vo-rpx65lzPU_AXI7tjluD8DO9yksUaYxeKjazAjwRvaS6lhJPpqiZp9v_t_DXGMWhcH-cCT-aCCf3-Ny8x3wq5pwHlzD0zhmfynIx0R6EMC-WrvdQmRC0G49yRxdbaHdkFsZtEQXVwDBDvI5mLj_Um4RsPou_Jpll_mOQjkM',
 ].map((id, i) => (
 <div key={i} className="aspect-square bg-white/10 rounded-2xl p-2">
 {/* eslint-disable-next-line @next/next/no-img-element */}
 <img
 className="w-full h-full object-cover rounded-xl grayscale hover:grayscale-0 transition-all duration-300"
 alt={`Archivfoto ${i + 1}`}
 src={`https://lh3.googleusercontent.com/aida-public/${id}`}
 />
 </div>
 ))}
 </div>
 </div>
 </div>
 )}
 </div>
 )
 })
 )}

 </div>
 </section>

 {/* Social Responsibility */}
 <section id="gemeinschaft" className="py-12 vanguard-gradient text-white overflow-hidden">
 <div className="container mx-auto px-6">
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
 <div>
 <span className="font-headline font-bold uppercase tracking-widest text-secondary-container mb-4 block">
 GEMEINSCHAFT ERLEBEN
 </span>
 <h2 className="text-4xl md:text-5xl font-headline font-black uppercase tracking-tighter mb-8 leading-none">
 Verantwortung &amp; <br />Inklusion
 </h2>
 <p className="text-xl text-white/80 mb-10 leading-relaxed font-body">
 Für uns endet der Sport nicht am Spielfeldrand. Die SG Hünstetten setzt sich aktiv für Integration und Inklusion ein. Wir fördern Programme für Menschen mit Behinderungen und arbeiten eng mit lokalen Schulen zusammen, um Jugendlichen nicht nur sportliche, sondern auch soziale Werte zu vermitteln.
 </p>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
 <div className="flex items-start gap-4">
 <span className="material-symbols-outlined text-secondary-container text-4xl">diversity_3</span>
 <div>
 <h4 className="font-headline font-bold uppercase text-sm tracking-widest mb-1">Integration</h4>
 <p className="text-white/60 text-sm">Vielfalt ist unsere Stärke auf und neben dem Platz.</p>
 </div>
 </div>
 <div className="flex items-start gap-4">
 <span className="material-symbols-outlined text-secondary-container text-4xl">accessibility_new</span>
 <div>
 <h4 className="font-headline font-bold uppercase text-sm tracking-widest mb-1">Inklusion</h4>
 <p className="text-white/60 text-sm">Sport ohne Barrieren für alle Generationen.</p>
 </div>
 </div>
 </div>
 </div>
 <div className="relative">
 <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl rotate-[-2deg]">
 {/* eslint-disable-next-line @next/next/no-img-element */}
 <img
 className="w-full h-full object-cover"
 alt="Jubelfeier Jugendmannschaft"
 src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsxAVpHfCyU7JL3PJ6GAlTB1mww8Xtpmjt2xJOPZRWsGt0OZJUXUDk8VHMokhK7gOLZxaGhZxyo51-oEjyjjcA6yEQSEkcBqPM0LSANfpUSpceVaw1-hYKqaAk-lxWH0lqCD1x-Olmo58-rmW0EYm5BqHe9oWNKkPvB2b1ivi_NcISeZv1L1Gb38Qo4a50AzMJ4df6KG5RckjFP5tAFv2lXKl_NL3bRL7Xd2m8ZeAZcLKaCaM4i7AJPf9FV2M-Kc8Qfb2o7BXoTUw"
 />
 </div>
 <div className="absolute -bottom-8 -left-8 bg-secondary-container text-on-secondary-container p-6 rounded-2xl shadow-xl max-w-xs rotate-[4deg]">
 <p className="font-headline font-bold uppercase text-lg leading-tight">
 &ldquo;Sport verbindet Welten, wo Worte oft fehlen.&rdquo;
 </p>
 </div>
 </div>
 </div>
 </div>
 </section>

 {/* Future Outlook */}
 <section className="py-12 bg-white relative">
 <div className="container mx-auto px-6">
 <div className="bg-surface-container-low rounded-[3rem] p-8 md:p-16 relative overflow-hidden flex flex-col md:flex-row items-center gap-12 border-b-8 border-primary">
 <div className="md:w-3/5 relative z-10">
 <h2 className="text-4xl md:text-5xl font-headline font-black text-primary uppercase tracking-tighter mb-6">
 SG Hünstetten im Wandel
 </h2>
 <p className="text-xl text-on-surface-variant font-body mb-8 leading-relaxed">
 Wir blicken stolz zurück, aber fokussiert nach vorn. Die Zukunft der SG Hünstetten liegt in der Transformation zu einem modernen Mehrspartenverein. Mit Schwerpunkten auf Gesundheit, Prävention und innovativen Sportkonzepten gestalten wir die nächsten 80 Jahre Momentum.
 </p>
 <button className="bg-primary text-white font-headline font-bold px-10 py-4 rounded-xl uppercase tracking-widest hover:bg-primary-container transition-all hover:translate-x-2">
 Unsere Vision 2030
 </button>
 </div>
 <div className="md:w-2/5">
 <div className="grid grid-cols-2 gap-4">
 <div className="aspect-square rounded-2xl bg-secondary-container flex items-center justify-center p-6 text-center">
 <span className="font-headline font-black text-primary text-xl leading-none">MODERNER MULTISPORT</span>
 </div>
 <div className="aspect-square rounded-2xl bg-primary flex items-center justify-center p-6 text-center">
 <span className="font-headline font-black text-secondary-container text-xl leading-none">PRÄVENTION &amp; GESUNDHEIT</span>
 </div>
 </div>
 </div>
 </div>
 </div>
 </section>

 </main>

 <SponsorBand sponsors={sponsors} variant="grey" />
 <SiteFooter logoUrl={logoUrl} departmentLabel="Chronik" variant="dark" />
 </div>
 )
}
