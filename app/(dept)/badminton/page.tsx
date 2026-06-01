import BadmintonNav from '@/components/badminton/BadmintonNav'
import SiteFooter from '@/components/shared/layout/SiteFooter'
import SponsorBand from '@/components/shared/layout/SponsorBand'
import AktuellesSection from '@/components/home/AktuellesSection'
import GalerieGrid from '@/components/shared/sections/GalerieGrid'
import ShopGrid from '@/components/shared/sections/ShopGrid'
import TeamIntro1 from '@/components/shared/team/TeamIntro1'
import TeamIntro2 from '@/components/shared/team/TeamIntro2'
import { fetchClubConfig, fetchAbteilung, fetchSponsors, fetchPublicNews } from '@/lib/api'
import type { Trainer, GalerieItem, AbteilungProfile, TrainingSlot, NewsEintrag } from '@/lib/api'
import type { ShopProduct } from '@/components/shared/sections/ShopGrid'
// ─── Helpers ────────────────────────────────────────────────────────────────

function formatTrainingSlot(slot: TrainingSlot): string {
  return `${slot.wochentag.substring(0, 2)}. · ${slot.von.slice(0, 5)} – ${slot.bis.slice(0, 5)} · ${slot.ort}`
}

// ─── Static content ──────────────────────────────────────────────────────────

const products: ShopProduct[] = [
  {
    name: 'Allwetter-Jacke "Pro"',
    sub: 'Deep Blue Legacy',
    price: '79,90 €',
    badge: 'Bestseller',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2V573FaaC-lVusVrI44uQ4b8GywIhs4Pv0YY4uVEcQjsfykdHlJ-3ZMSIeq3S64XdL0FCElOAV6zVUGd7s1jTe443LBiv2DLff75lhUr14QiT4FeN6Qh96s6W2wFEpZX3QhOiHyw48c3dtFldd14dli3cmS76ZXS5wW9IYsevyF1vFDiUo-YADYAW_s99PcHaRs7glmpNMEkTJiChfx1e2Rtrmh2rDCm23aZFYayg5B7mDjFyEGGbn4HVw8XEZdSK1LjID0ig-Tg',
  },
  {
    name: 'Fan-Schal',
    sub: 'Kinetic Tradition',
    price: '14,90 €',
    badge: null,
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7Q0bbCYYA1o_fEJC1eE-OLtre38sf5ox-Bg7V6gWKq15a0uG4Yimd7dc7otaKOcYE1z0Re6QIyPMZxd1FIkNnJ-rAGWHi7sxUa_w9I60zy6XjW8fOVTx8WyM_UM4mdRV5MpDa2T2kQyGE7YzclOTBuk9wxzWFxW5tuSL2mzsp4Mes8pjXVEkNfJOp7gdMnGdy8xvUR_cL7c7OaLt0RL-1OdK-PWvwaS_j_G4LYcJVsjpmbKdQOss3Q0hSpHd3UyKMGhes1Ht4hLs',
  },
  {
    name: 'Wintermütze Classic',
    sub: 'Kinetic Blue / Gold',
    price: '19,90 €',
    badge: null,
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_qcexn1QakqKyUiv8NnEoXBxrrrv1hwlj6hLy4s_vZRMVG85imVveu9LIO3pA9J-3--xC9TQh5Dwu8Bs4tIW-veoBLWATFFU-_h5FF3U1Z3ppoE9Fgl5K3khNTTOpEQrx7aNpcWd6rT95mZ8MkPqsejrODHpPsPPMgUYvfodbsONlxMlbH9KNxKXZxWqO32xsyPJCnd6JKAvCF9cKh2IhgoGRMEU03loYW3PDjXWCGJ56x1UUt8159dza99Z5DXkt_3rgmKeNiZo',
  },
  {
    name: 'Polo-Shirt Kinetic',
    sub: 'Premium Performance',
    price: '34,90 €',
    badge: null,
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtv0I899I6DiERhzC4IisiBfNU5ZLu-IClwoxh8ARV2DAO1CCk9re4gyyv9mzxrw2wT_PwxspLBwvkUUn4wtmZbJieXKFZNaz6mWwAARsLfCl6mqwPDsCyDVWSNKxu0jXT7RR5Qbkj4WUvdpQVmclOWkOa8_zR-3ZyiZ2AkCvwnCocgrWzMe8d_3Um-Jfkc1mw0Oi3w54CvMdM61IekryK3sikL075v7rJdTdt2AIMcMnL9YPy2oUL_PCjUv4gJ9NRpaScXzgqd-8',
  },
]

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function BadmintonPage() {
  const config = await fetchClubConfig().catch(() => null)
  const badmintonDept = config?.departments.find(d =>
    d.name.toLowerCase().includes('badminton')
  )

  const abteilung: AbteilungProfile | null = badmintonDept
    ? await fetchAbteilung(badmintonDept.id).catch(() => null)
    : null

  const sponsors = config?.operator_id
    ? await fetchSponsors(config.operator_id).catch(() => [])
    : []

  const vereinsNews: NewsEintrag[] = config?.operator_id
    ? await fetchPublicNews({ operatorId: config.operator_id, ebene: 'verein' }).then(r => r.news).catch(() => [])
    : []

  const erwachseneTeam = abteilung?.mannschaften.find(m =>
    m.name.toLowerCase().includes('erwachsene')
  )
  const jugendTeam = abteilung?.mannschaften.find(m =>
    m.name.toLowerCase().includes('jugend')
  )

  const allGalerie: GalerieItem[] = [
    ...(erwachseneTeam?.galerie ?? []),
    ...(jugendTeam?.galerie ?? []),
  ]

  return (
    <>
      <BadmintonNav logoUrl={config?.logo_web_pfad ?? config?.logo_url} clubName={config?.short_name ?? config?.name} />
      <main>
        <Hero trainingSlot={erwachseneTeam?.training_slots?.[0] ? formatTrainingSlot(erwachseneTeam.training_slots[0]) : undefined} />
        <AktuellesSection news={vereinsNews} />
        <div id="erwachsene">
          <ErwachseneSection
            leitung={erwachseneTeam?.trainer.find(t => t.is_primary) ?? abteilung?.leitung}
            teamFotoUrl={erwachseneTeam?.foto_url ?? null}
            motto={erwachseneTeam?.motto ?? null}
          />
        </div>
        <GalerieGrid
          galerie={allGalerie}
          sectionNum="03 — Galerie"
          title={<>Kinetic <span className="text-outline-navy">Moments</span></>}
          background="bg-chalk"
        />
        <div id="jugend">
          <JugendSection
            trainers={jugendTeam?.trainer ?? []}
            teamFotoUrl={jugendTeam?.foto_url ?? null}
            alterVon={jugendTeam?.alter_von ?? null}
            alterBis={jugendTeam?.alter_bis ?? null}
          />
        </div>
        <EngagementSection />
        <ShopGrid variant="md3" products={products} />
        <SponsorBand sponsors={sponsors} />
      </main>
      <SiteFooter logoUrl={config?.logo_web_pfad ?? config?.logo_url} departmentLabel="Badminton" />
    </>
  )
}

/* ─── Hero ─────────────────────────────────────────────────────────────────── */

function Hero({ trainingSlot }: { trainingSlot?: string }) {
  return (
    <header className="relative flex flex-col justify-end overflow-hidden bg-navy noise" style={{ height: '65vh', maxHeight: '700px', minHeight: '500px' }}>

      <div className="absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="Badminton action – SG Hünstetten"
          className="w-full h-full object-cover object-center"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEW12x43wlBcxUzb24JqvEESnUc6M0Noxf15GlwByQy7IwAodrihrKTteKlNKqzKt1L8QfBNQzu_eyaZt-_J9qmr4hqkDEZVl38j4gjjC-Hye62QWqyfxtMGNMddgv7QnphjHmGlAEpSo1ZKd5_WRNch5seVBuDKgY2fGZipOd5PaP_W1OO4u7zXh_7LHshtmc-ihtaFLcNX3D2oneac_8t5AxafQPiUmrf7n-oWM00r3wLF1IRvYGVQDqt7UxcISZG1Leo_FlXzM"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/80 via-navy/20 to-transparent" />
      </div>

      <div className="absolute inset-0 z-0 flex items-center justify-end pointer-events-none pr-8 md:pr-16 overflow-hidden">
        <span
          className="text-outline-chalk font-display font-black uppercase leading-none select-none"
          style={{ fontSize: 'clamp(50px, 11vw, 160px)', letterSpacing: '-0.04em', opacity: 0.3 }}
        >
          BADMINTON
        </span>
      </div>

      <div className="relative z-10 max-w-screen-xl mx-auto w-full px-6 md:px-10 pb-0">
        <div className="anim-up mb-6">
          <span className="inline-flex items-center gap-2 border border-gold/40 text-gold label-cap px-3 py-1.5 rounded-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
            80 Jahre Kinetic Heritage
          </span>
        </div>

        <h1 className="anim-up-2 display-giant text-chalk mb-8" style={{ fontSize: 'clamp(2.25rem, 6vw, 5rem)' }}>
          Speed<br />
          <span style={{ WebkitTextStroke: '2px #fde000', color: 'transparent' }}>&amp;</span>
          <span className="text-gold"> Tradition</span>
        </h1>

        <div className="anim-up-3 border-t border-white/15 grid grid-cols-2 md:grid-cols-4 divide-x divide-white/15 mt-2">
          <div className="py-5 pr-6 md:col-span-2">
            <p className="label-cap text-gold mb-2">Nächstes Training</p>
            <p className="text-chalk font-display font-semibold text-sm tracking-display">
              {trainingSlot ?? 'Nächstes Training – Details folgen'}
            </p>
          </div>
          <div className="py-5 px-6 hidden md:block">
            <p className="label-cap text-chalk/30 mb-2">Smash Speed</p>
            <p className="text-chalk font-display font-black text-2xl tracking-tightest">
              400 <span className="text-sm font-normal text-chalk/40">km/h</span>
            </p>
          </div>
          <div className="py-5 pl-6 flex items-center">
            <button className="group flex items-center gap-3 bg-gold text-navy font-display font-bold label-cap px-6 py-3 rounded-sm hover:bg-gold-dim active:scale-95 transition-all w-full justify-center md:w-auto">
              Probetraining
              <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

/* ─── Erwachsene ────────────────────────────────────────────────────────────── */

function ErwachseneSection({
  leitung,
  teamFotoUrl,
  motto,
}: {
  leitung?: Trainer | null
  teamFotoUrl?: string | null
  motto?: string | null
}) {
  const coach = leitung ?? {
    vorname: 'Norman', nachname: 'Eby',
    email: 'eby@sg-huenstetten.de',
    bio: 'Über 20 Jahre Erfahrung im Leistungssport. Koordiniert das Training für alle Leistungsklassen.',
    foto_url: null, telefon: null, id: '', is_primary: true,
  }

  return (
    <section className="bg-navy noise relative overflow-hidden">
      <div className="absolute top-0 left-0 pointer-events-none overflow-hidden w-full" style={{ zIndex: 0 }}>
        <span
          className="font-display font-black uppercase leading-none select-none block text-outline-chalk"
          style={{ fontSize: 'clamp(40px, 9vw, 130px)', letterSpacing: '-0.04em', opacity: 0.06, marginTop: '-0.1em', whiteSpace: 'nowrap' }}
        >
          ERWACHSENE
        </span>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-16 relative" style={{ zIndex: 2 }}>
        <div className="flex items-end justify-between mb-6 gap-6 flex-wrap">
          <div>
            <p className="sec-num text-chalk/40 mb-3">02 — Erwachsenen-Abteilung</p>
            <h2 className="display-giant text-chalk" style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}>
              Hobby &amp; <span className="text-gold">Leistung</span>
            </h2>
            {motto && <p className="label-cap text-gold/60 mt-3 tracking-label">{motto}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TeamIntro1
            trainers={[coach]}
            theme="dark"
            rolePrimary="Head Coach / Abteilungsleiter"
          />
          <div className="img-zoom relative rounded-lg overflow-hidden" style={{ minHeight: 320 }}>
            {teamFotoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img alt="Erwachsenen-Team – SG Hünstetten" className="w-full h-full object-cover" src={teamFotoUrl} />
            ) : (
              <div className="w-full h-full bg-navy-mid" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-navy/90 to-transparent flex flex-col justify-end p-8">
              <p className="label-cap text-gold mb-2">Bezirksliga · Hobbyrunde</p>
              <h4 className="font-display font-black text-chalk text-xl tracking-display mb-5">Erfolgreich in der Liga</h4>
              <button className="self-start bg-gold text-navy label-cap px-6 py-2.5 rounded-sm hover:bg-gold-dim active:scale-95 transition-all flex items-center gap-2">
                Auf Warteliste setzen <span className="material-symbols-outlined text-sm">how_to_reg</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Jugend ────────────────────────────────────────────────────────────────── */

function JugendSection({
  trainers,
  teamFotoUrl,
  alterVon,
  alterBis,
}: {
  trainers: Trainer[]
  teamFotoUrl?: string | null
  alterVon?: number | null
  alterBis?: number | null
}) {
  const displayTrainers = trainers.length > 0 ? trainers.slice(0, 2) : []
  const ageLabel = alterVon && alterBis ? `${alterVon}–${alterBis} Jahre` : alterVon ? `Ab ${alterVon} Jahren` : null

  return (
    <section className="py-12 bg-mist">
      <div className="max-w-screen-xl mx-auto px-6 md:px-10">

        <div className="mb-6">
          <p className="sec-num mb-3">04 — Jugend</p>
          <div className="flex items-end gap-8 flex-wrap">
            <h2 className="display-giant text-navy" style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}>
              Jugend-<span className="text-gold">Entwicklung</span>
            </h2>
            {ageLabel && (
              <p className="text-ink-soft/50 text-sm max-w-sm leading-relaxed mb-2 font-body">
                {ageLabel} · altersgerechtes Training und viel Spaß an der Bewegung.
              </p>
            )}
          </div>
        </div>

        <TeamIntro2
          trainers={displayTrainers}
          theme="light"
          rolePrimary="Jugend-Koordinatorin"
          className="mb-6"
        />

        <div className="img-zoom relative rounded-lg overflow-hidden" style={{ height: 440 }}>
          {teamFotoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img alt="Jugend Training – SG Hünstetten" className="w-full h-full object-cover" src={teamFotoUrl} />
          ) : (
            <div className="w-full h-full bg-mist-mid" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-navy/85 to-transparent flex flex-col justify-end p-10">
            <h4 className="font-display font-black text-chalk text-3xl tracking-display mb-3">Pure Emotion &amp; Sport</h4>
            <div className="flex items-center gap-4 flex-wrap">
              <button className="border border-white/25 text-chalk label-cap px-6 py-2.5 rounded-sm hover:bg-white/10 transition-all">
                Zum Probetraining
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Engagement ────────────────────────────────────────────────────────────── */

function EngagementSection() {
  return (
    <section className="py-12 bg-chalk">
      <div className="max-w-screen-xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-2 h-2 rounded-full bg-red-600 inline-block" />
              <span className="label-cap text-red-600">Dringend gesucht</span>
            </div>
            <h2 className="font-display font-black uppercase text-navy mb-6" style={{ fontSize: 'clamp(22px, 3vw, 42px)' }}>
              Übungsleiter<br />gesucht!
            </h2>
            <p className="text-ink-soft/50 text-sm leading-relaxed max-w-md mb-8">
              Du liebst Badminton und arbeitest gerne mit Menschen? Auch Einsteiger ohne Lizenz willkommen – wir unterstützen dich bei der Ausbildung.
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="bg-navy text-chalk label-cap px-8 py-3 rounded-sm hover:bg-navy-mid active:scale-95 transition-all flex items-center gap-2">
                Jetzt bewerben <span className="material-symbols-outlined text-sm">campaign</span>
              </button>
              <button className="border border-wire text-navy label-cap px-8 py-3 rounded-sm hover:bg-mist transition-all">
                Infos anfordern
              </button>
            </div>
          </div>
          <div className="img-zoom rounded-lg overflow-hidden" style={{ aspectRatio: '16/9' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="Coaching team" className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxgrmvoOGnw_4i5EDL4rAywE3WZBKoN0w7hAikSnYhA5I1-D1lydZN9U7XJ6Fwms_833oYFoJ3ouZ8ndlF37OLREFRNTHlQsCqJry6JS2vVJ7JSu_CLq4REsbojKcbPxlSS6PrbetfvYzYjWPPKUXieNy1tWv3EWpPU1OKMn5BbPeSo_WF7sQGE0BSvnqXN9pirEsq9ui9N8KP3R9I5f9mTwlvSG8ov9EZqaFj22AIWlnO9OOeTMCFIbbg_6545jr9wF9JPJcp9nI"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
