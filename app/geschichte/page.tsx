import BaseNav from '@/components/shared/layout/BaseNav'
import SiteFooter from '@/components/shared/layout/SiteFooter'
import SponsorBand from '@/components/shared/layout/SponsorBand'
import { fetchClubConfig, fetchSponsors } from '@/lib/api'

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

export default async function GeschichtePage() {
 let logoUrl: string | null = null
 let sponsors: Awaited<ReturnType<typeof fetchSponsors>> = []
 try {
 const config = await fetchClubConfig()
 logoUrl = config.logo_web_pfad ?? config.logo_url ?? null
 if (config.operator_id) sponsors = await fetchSponsors(config.operator_id).catch(() => [])
 } catch { /* fallback */ }

 return (
 <div className="bg-background text-on-background font-body selection:bg-secondary-container selection:text-on-secondary-container">
 <BaseNav
 logoUrl={logoUrl}
 clubName="Hünstetten"
 departmentLabel="Chronik"
 navItems={GESCHICHTE_NAV}
 ctaLabel="Mitglied werden"
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
 <section id="chronik" className="py-16 bg-surface relative timeline-line">
 <div className="container mx-auto px-6 relative">

 {/* ERA 1: Gründungsjahre */}
 <div id="gruendung" className="mb-32">
 <div className="flex justify-center mb-16">
 <h2 className="text-3xl md:text-4xl font-headline font-black text-primary uppercase tracking-tight bg-secondary-container px-8 py-3 ">
 DIE GRÜNDUNGSJAHRE (1947–1959)
 </h2>
 </div>
 <div className="space-y-16">
 <MilestoneItem
 year="1947" align="left" dotClass="bg-primary"
 title="Offizielle Gründung"
 desc="Gründung der SG Görsroth unter US-Aufsicht. Erste Fußballspiele auf Behelfswiesen."
 imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuBCr92-H4tnQ9WAVqr-9qkm312g9VZwyTBuVw3CX-6oEoI-S86dV03sOOPaATGHWZvZM08mI8j8n8H2lq9YMeczWhEmE-CSkHWytcw1Ejx2LdV0eNnamkx7uCVReNJmnRHLPaDQT9hGOW3pQk9ysf2Bj24UI5I2fIBl4ow3TgsBWjbN5SvOCiwVfYH7apt2nNWFq5ORfSZV-hMnTtyWOWrbxdx1iPnqA_vKlCc9h03u3hUbKPGIf9A13XeBgWwW3EyLUuJRYsJIW5Y"
 />
 <MilestoneItem
 year="1950" align="right" dotClass="bg-primary"
 title="Erste Trikotsätze"
 desc="Durch Spenden der lokalen Wirtschaft konnten die ersten einheitlichen Trikots in Blau beschafft werden."
 imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuAQarl7RyYjhxQxy36sudRhK5POFS4L8WAQzqeDvQKMN_cl2llsf8wd1a8sS--1oBlmhy7ChBAa6jnDO60ydqPaHFdpybQsFYZR-Fd1-jedDHhQpuF_NyZZ4L95vNeOdTdbbF9GeubjFG2weqAiPaNlDzHAUK5tMQBwiJl6WDncTGLRV_XGWrs6kkt3Nt_A_KUpXfxKgW0sivFsl8CTViRqwsGj9w2i_cgC8WCnmMjn8e22IbT5PTwRZykTpLQG6AXztqr_BgFcUbE"
 />
 <MilestoneItem
 year="1954" align="left" dotClass="bg-primary"
 title="Weltmeister-Euphorie"
 desc={'Das "Wunder von Bern" löst einen ungeahnten Mitgliederboom in Hünstetten aus.'}
 />
 <MilestoneItem
 year="1958" align="right" dotClass="bg-primary"
 title="Jugendabteilung"
 desc="Gründung der ersten eigenständigen Jugendmannschaft zur Förderung lokaler Talente."
 />
 </div>

 {/* Gallery Break 1 */}
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
 </div>

 {/* ERA 2: Krise & Wiedergeburt */}
 <div className="mb-32 pt-24">
 <div className="flex justify-center mb-16">
 <h2 className="text-3xl md:text-4xl font-headline font-black text-white uppercase tracking-tight bg-primary px-8 py-3 ">
 KRISE &amp; WIEDERGEBURT (1960–1985)
 </h2>
 </div>
 <div className="space-y-16">
 <MilestoneItem
 year="1967" align="left" dotClass="bg-secondary-container"
 title="Diehlenhof-Bau"
 desc="Startschuss für den Bau der zentralen Sportstätte Diehlenhof durch massive Eigenleistung."
 />
 <MilestoneItem
 year="1972" align="right" dotClass="bg-secondary-container"
 title="Vereinsheim-Eröffnung"
 desc="Das neue Herzstück des Vereins wird eingeweiht. Ein Meilenstein für die Vereinskultur."
 imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuAHjpU5gkjvvIsdezU8rA-V2GdQU6WCdtmhHCKnv-hhts-FyzR2jOn8cBe_Bel9EV_CTWTZ65ndk6And98JyQFHkia8VmOfffw9zS5zDkS4TTYrmd_rR1vNmHNi9qLon9RHHIL_zzOFNeuU2W0tKu1ZupbSSg6TQXQls57n-mtQHn80ZPCJPP6MuZteIsba0MNR9ZWbT6pr1_mFmuGRnfIfvRzooCwYhbmSBPMIIOkoQ9xPFWvbLpx9UUbiBcx4yqMHe-5BpnDnBfw"
 />
 <MilestoneItem
 year="1975" align="left" dotClass="bg-secondary-container"
 title="Finanzielle Hürden"
 desc="Eine schwere Wirtschaftskrise fordert den Verein, wird aber durch außerordentliches Engagement der Mitglieder überwunden."
 />
 <MilestoneItem
 year="1982" align="right" dotClass="bg-secondary-container"
 title="35-jähriges Jubiläum"
 desc="Großes Festwochenende unterstreicht die gewachsene Bedeutung der SG für die Gemeinde."
 />
 <MilestoneItem
 year="1985" align="left" dotClass="bg-secondary-container"
 title="Modernisierung Flutlicht"
 desc="Erstmals ist Training und Spielbetrieb auch in den Abendstunden professionell möglich."
 />
 </div>
 </div>

 {/* ERA 3: Goldene Ära */}
 <div className="mb-32 pt-24">
 <div className="flex justify-center mb-16">
 <h2 className="text-3xl md:text-4xl font-headline font-black text-primary uppercase tracking-tight bg-secondary-container px-8 py-3 ">
 DIE GOLDENE ÄRA (1986–2005)
 </h2>
 </div>
 <div className="space-y-16">
 <MilestoneItem
 year="1989" align="right" dotClass="bg-primary"
 title="SG Hünstetten"
 desc="Offizielle Umbenennung zur SG Hünstetten zur besseren Repräsentation aller Ortsteile."
 imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuDEHCGlF_tJN4JsFC4OIdLMi9-vLuVcg0t_zxBnXil6IYSTiCSHvv9Xhd8XQ6MCLVKks7-DbiLmw1ttGVLjj0miziFkZfesxCzsJvyQsDivOjMN2-jRsLYQC41kAewgQ_r6Jnw8jO8zahkdIPOyjy_eY_ikoHRdqg6-mP4eZJAPze5J78ki1BXob-AOuXsAlTEJdQpDIHz5WzRSEHrrEwuWnBnbLVzQZ9p1aIJibDIRYYV2jTweMTOnRsGvbFdjam9AQsBuQt0qpXg"
 />
 <MilestoneItem
 year="1992" align="left" dotClass="bg-primary"
 title="Meisterschaft Bezirksliga"
 desc="Erstmals krönt sich die SG zum Meister und klopft an die Tür zum Profifußball."
 />
 <MilestoneItem
 year="1994" align="right" dotClass="bg-primary"
 title="Aufstieg Landesliga"
 desc="Der größte sportliche Erfolg der Vereinsgeschichte: Der Sprung in Hessens dritthöchste Spielklasse."
 />
 <MilestoneItem
 year="1998" align="left" dotClass="bg-primary"
 title="Gründung Alte Herren"
 desc="Um verdiente Spieler im Verein zu halten, wird eine eigene Ü35-Abteilung etabliert."
 />
 <MilestoneItem
 year="2002" align="right" dotClass="bg-primary"
 title="Sanierung Hauptplatz"
 desc="Der Rasenplatz im Diehlenhof wird nach neuesten ökologischen Standards saniert."
 imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuAXej0i19hfPPXBqCa7Vv0M2KzdExLgPCp6liJtkkPb1kL6t6sTPfD-_uJYOfIfZv5N6mJg56Tl62kbx2Rtv502io1LdwQxOcOBOUVfoGDSF1Ga67Ap8Q9X3mpZ4t20g53rkTo1zdk5GpUloNe0_JwlZgyDHlqFfta8LL2svef2RYDH4Tji7gPbF9HEpjJ7w3b1Q4ggPOh_Q5AeR-Y1aKeWu-7qPLtwXMP6Uu8LxRZauf2vz6vkSZzLUsNBr4LU6x75fEKYGQq1qIo"
 />
 </div>

 {/* Feature Gallery */}
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
 </div>

 {/* ERA 4: Moderne Expansion */}
 <div className="mb-32 pt-24">
 <div className="flex justify-center mb-16">
 <h2 className="text-3xl md:text-4xl font-headline font-black text-white uppercase tracking-tight bg-primary px-8 py-3 ">
 MODERNE EXPANSION (2006–HEUTE)
 </h2>
 </div>
 <div className="space-y-16">
 <MilestoneItem
 year="2010" align="left" dotClass="bg-secondary-container"
 title="Kunstrasen-Projekt"
 desc="Umstellung auf Ganzjahresbetrieb durch den ersten modernen Kunstrasenplatz der Region."
 />
 <MilestoneItem
 year="2013" align="right" dotClass="bg-secondary-container"
 title="A-Liga Meisterschaft"
 desc="Triumph durch Teamgeist nach einer Phase der Neuorientierung."
 />
 <MilestoneItem
 year="2016" align="left" dotClass="bg-secondary-container"
 title="Damenfußball"
 desc="Start der ersten Damenmannschaft, die binnen zwei Jahren in die Kreisoberliga aufsteigt."
 />
 <MilestoneItem
 year="2019" align="right" dotClass="bg-secondary-container"
 title="Expansion B-Klasse"
 desc="Kontinuierliche Entwicklung und Festigung der sportlichen Breite im Seniorenbereich."
 imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuCImSHRCxelstK56oKfQwxK6Cno7ZWzsT-d_PAwJVRubuaGenf63rq2OSLfJXOBXCxyVGoTEc_d7zR7gY2dTFn3tHpOjiXP41BC31IVZztafus0L5bpVgjvfH6s5B26lKjfTgustPjfOLEXgUPxn-PEGWXIPYAIG_Zuoc2TkLN8PN3XKzpXUVk2PcJyCFFi5QPzNFjrV79VxCTrRrsVB_47wevNocIAVA6uChXEu2CeR26nJ-8woM-faZHD3Slbxm06A-0RYn5A8y4"
 />
 <MilestoneItem
 year="2021" align="left" dotClass="bg-secondary-container"
 title="Digitale Transformation"
 desc="Einführung von Mitglieder-Apps und digitalen Trainingsplänen für alle Teams."
 />
 <MilestoneItem
 year="2024" align="right" dotClass="bg-secondary-container"
 title="80 Jahre Momentum"
 desc="Wir feiern acht Jahrzehnte Tradition und blicken mit Vision 2030 in die Zukunft."
 />
 </div>
 </div>

 </div>
 </section>

 {/* Social Responsibility */}
 <section id="gemeinschaft" className="py-16 vanguard-gradient text-white overflow-hidden">
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
 <section className="py-16 bg-white relative">
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
