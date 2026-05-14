import BaseNav from '@/components/shared/layout/BaseNav'
import SiteFooter from '@/components/shared/layout/SiteFooter'
import SponsorBand from '@/components/shared/layout/SponsorBand'
import { fetchClubConfig, fetchSponsors } from '@/lib/api'

const HERO_IMG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAIQu-mMb6znKt8RaFJN6N2-7uNWTYi6ao7w82x0rS6IBWpCrcPxHMMsTWHOcfae8qkElbCYCp19rDditLj45xsKtcxHeltn7ZonJ4XCkJP2-DRSCboPlukYhf9ORtKpRE_GykkbnulyTOceuDnZREwpD5C8WvEk9CTUho96Jbjlzb7Yia0tMk2THriDKnHU5lXDlZjz9pMNMnc2G4pHBV8SOLozDPXso1KC0v63dgA9xiOMSpKWha3AgDhkFQgqOs23j_iixlPhLQ'
const BENTO_IMG1 = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDF5eoRYMQBLfOwoyXAOm45795ncQliNga4OPJMEKm3DWDh0CzwZf_eFBKrk_ESTZtngutVV4cR7GYcJXkgm9nwmGV6vZEC5xOv-xqOYqc42lBb5cNH0fqD3Hrm7Jn7yDzv4_EJcSk2V5sFQbxSXEBsR9tTm2d0Ljje6xE9L1xoIj_TsyJOlC0bo7mucXRCEo6wQPfmZq7d8p9fto6zsnlqDo38Rp2E07YyZIKPurvREu3r9ADqtxPlEMEZ40JsHWSRFuFNSAxfFLk'
const BENTO_IMG2 = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCSNa1_UdsV6E-7D5gNP1Pdz66PvHG-auIJoKQuO4GxQICGVbjxlPi3rIloVC_VlKz9Nm5Y6BfFfom3t38yzBLDy6viIb6xV7sJt6hvp2xqXGRSkqvQuavfbKr6PGdlZOxhw6D-aGnoJPbJ21u7S8z1pV6JI4D4YdceA4aY4LUA_jp2hWH2yOa0MmCKX1HrPrNDceiGTXQYtRym4lRI9cM5AaXMPv_qPuZ2NdXL-pqLW8U5TO5GBf8zfbA_C-e5EUCmSlSdCXr0j0M'

const FAQ = [
  { q: 'Was ist ein JFV?', a: 'Ein Jugendförderverein (JFV) ist ein Zusammenschluss mehrerer Stammvereine, um die Jugendarbeit zu bündeln und leistungsorientierten Fußball anzubieten.' },
  { q: 'Was bedeutet das für die Mitgliedschaft?', a: 'Spieler bleiben Mitglied in ihrem Stammverein, erhalten aber das Spielrecht für den JFV.' },
  { q: 'Welche Altersklassen werden abgedeckt?', a: 'Wir decken alle Altersklassen von den Bambinis bis zur A-Jugend ab.' },
  { q: 'Wie läuft ein Probetraining ab?', a: 'Einfach Sportsachen einpacken und vorbeikommen! Nach einer kurzen Anmeldung bei den Trainern können die Kinder direkt mitmachen und den Teamgeist erleben.' },
  { q: 'Welche Ausrüstung wird benötigt?', a: 'Für den Start genügen einfache Sportkleidung und passende Fußballschuhe. Schienbeinschoner sind für die Sicherheit im Training jedoch von Beginn an Pflicht.' },
  { q: 'Gibt es einen Fahrdienst zu Spielen?', a: 'Wir organisieren uns in Fahrgemeinschaften. So fördern wir nicht nur den Austausch unter den Eltern, sondern entlasten auch die Umwelt und den Geldbeutel.' },
]

export default async function JFVPage() {
  let logoUrl: string | null = null
  let sponsors: Awaited<ReturnType<typeof fetchSponsors>> = []
  try {
    const config = await fetchClubConfig()
    logoUrl = config.logo_web_pfad ?? config.logo_url ?? null
    if (config.operator_id) sponsors = await fetchSponsors(config.operator_id).catch(() => [])
  } catch { /* fallback */ }

  return (
    <div className="bg-white font-body text-on-background">
      <BaseNav
        logoUrl={logoUrl}
        clubName="Hünstetten"
        departmentLabel="Jugendfußball (JFV)"
        navItems={[
          { label: 'Altersklassen', href: '#altersklassen', active: true },
          { label: 'Highlights',    href: '#highlights' },
          { label: 'FAQ',           href: '#faq' },
        ]}
        ctaLabel="Probetraining"
        homeHref="../"
      />

      <main className="pt-20">

        {/* Hero */}
        <section className="relative flex items-center overflow-hidden" style={{ minHeight: '78vh' }}>
          <div className="absolute inset-0 z-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={HERO_IMG} alt="Jugendfußball JFV Hünstetten" className="w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(83,136,175,0.4) 0%, rgba(5,40,86,0.6) 100%)' }} />
          </div>
          <div className="max-w-screen-xl mx-auto px-6 md:px-16 relative z-10 w-full">
            <div className="flex flex-row items-center gap-10">
              <div className="flex-1">
                <h1 className="text-white font-body font-black uppercase tracking-tighter leading-none mb-6">
                  <span className="block" style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)' }}>JUGENDFUSSBALL BEIM</span>
                  <span className="block" style={{ fontSize: 'clamp(2.5rem,8vw,4.5rem)', color: '#FDE000' }}>JFV HÜNSTETTEN</span>
                </h1>
                <p className="text-lg md:text-xl leading-relaxed mb-10" style={{ color: 'rgba(255,255,255,0.9)' }}>
                  Vom ersten Ballkontakt bis zur Meisterschaft — Bambinis bis A{'‑'}Jugend.<br />Wir formen echte Teamplayer auf und neben dem Platz.
                </p>
                <div className="flex flex-row gap-4">
                  <button className="px-6 py-4 rounded-xl font-body font-black italic text-lg uppercase shadow-2xl hover:scale-105 transition-transform" style={{ backgroundColor: '#5388AF', color: '#ffffff' }}>
                    Probetraining vereinbaren
                  </button>
                  <button className="px-6 py-4 rounded-xl font-body font-black italic text-lg uppercase shadow-2xl hover:scale-105 transition-transform" style={{ backgroundColor: '#8B2319', color: '#ffffff' }}>
                    Unterstützer werden
                  </button>
                </div>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/jfv-logo.png" alt="JFV Hünstetten Logo" className="hidden md:block shrink-0 drop-shadow-2xl" style={{ width: 'clamp(180px,18vw,280px)' }} />
            </div>
          </div>
        </section>

        {/* Altersklassen */}
        <section id="altersklassen" className="py-12 overflow-hidden" style={{ backgroundColor: '#3e6b8d' }}>
          <div className="max-w-screen-xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div className="max-w-3xl">
<h2 className="font-body font-black uppercase leading-none text-[#FDE000]" style={{ fontSize: 'clamp(2rem,5vw,3rem)' }}>
                  DIE JFV <span className="text-white">ENTWICKLUNGSREISE</span>
                </h2>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Funinho – Taubenblau */}
              <div className="group p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden" style={{ backgroundColor: '#5388AF', borderBottom: '8px solid #FDE000' }}>
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <span className="material-symbols-outlined text-8xl text-white">sports_soccer</span>
                </div>
                <div className="mb-6 text-white">
                  <span className="material-symbols-outlined text-5xl">child_care</span>
                </div>
                <h3 className="text-2xl font-body font-black uppercase text-white mb-2">FUNINHO – 3 gegen 3</h3>
                <p className="font-body font-bold italic mb-6" style={{ color: '#FDE000' }}>BALLKONTAKTE, TORE &amp; TAKTIK</p>
                <div className="flex items-center gap-2 mb-8 px-4 py-2 rounded-full w-fit text-white" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
                  <span className="material-symbols-outlined text-sm">schedule</span>
                  <span className="text-sm font-bold">Bambini, F-Jugend (&lt;6 bis 8 Jahre)</span>
                </div>
                <p className="leading-relaxed" style={{ color: 'rgba(255,255,255,0.85)' }}>Der Fokus liegt auf spielerischem Erlernen der Grundlagen, Koordination und vor allem der Freude an der Bewegung im Team.</p>
              </div>

              {/* Kleinfeld – Rot, featured */}
              <div className="group p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden md:-translate-y-8" style={{ backgroundColor: '#8B2319', borderBottom: '8px solid #FDE000' }}>
                <div className="mb-6" style={{ color: '#FDE000' }}>
                  <span className="material-symbols-outlined text-5xl">strategy</span>
                </div>
                <h3 className="text-2xl font-body font-black uppercase text-white mb-2">KLEINFELD</h3>
                <p className="font-body font-bold italic mb-6" style={{ color: '#FDE000' }}>ENTWICKLUNG &amp; TECHNIK</p>
                <div className="flex items-center gap-2 mb-8 text-white px-4 py-2 rounded-full w-fit" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
                  <span className="material-symbols-outlined text-sm">schedule</span>
                  <span className="text-sm font-bold">10 bis 14 Jahre</span>
                </div>
                <p className="leading-relaxed" style={{ color: 'rgba(255,255,255,0.85)' }}>Individuelle Technikschulung und taktisches Verständnis rücken in den Vordergrund. Wir fördern jedes Talent gezielt und leistungsgerecht.</p>
              </div>

              {/* Großfeld – Taubenblau */}
              <div className="group p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden" style={{ backgroundColor: '#5388AF', borderBottom: '8px solid #FDE000' }}>
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <span className="material-symbols-outlined text-8xl text-white">military_tech</span>
                </div>
                <div className="mb-6 text-white">
                  <span className="material-symbols-outlined text-5xl">stadium</span>
                </div>
                <h3 className="text-2xl font-body font-black uppercase text-white mb-2">GROSSFELD – 11 gegen 11</h3>
                <p className="font-body font-bold italic mb-6" style={{ color: '#FDE000' }}>LEISTUNG &amp; WETTKAMPF</p>
                <div className="flex items-center gap-2 mb-8 px-4 py-2 rounded-full w-fit text-white" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
                  <span className="material-symbols-outlined text-sm">schedule</span>
                  <span className="text-sm font-bold">15 bis 18 Jahre</span>
                </div>
                <p className="leading-relaxed" style={{ color: 'rgba(255,255,255,0.85)' }}>Vorbereitung auf den Herrenbereich durch intensives Training, komplexe Taktik und die Teilnahme an überregionalen Wettbewerben.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Bento Grid / Highlights */}
        <section id="highlights" className="py-12" style={{ backgroundColor: '#FDE000' }}>
          <div className="max-w-screen-xl mx-auto px-6">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridTemplateRows: '300px 280px', gap: '16px' }} className="hidden md:grid">
              {/* Big card – spans 2 cols × 2 rows */}
              <div style={{ gridColumn: '1 / 3', gridRow: '1 / 3' }} className="relative overflow-hidden rounded-3xl group shadow-lg">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={BENTO_IMG1} alt="Training JFV" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 flex flex-col justify-end p-8" style={{ background: 'linear-gradient(to top, rgba(5,40,86,0.9) 0%, transparent 100%)' }}>
                  <h4 className="text-white font-body font-black text-3xl mb-2 uppercase">MODERNE TRAININGSKONZEPTE</h4>
                  <p style={{ color: 'rgba(255,255,255,0.8)' }}>Professionelles Training nach DFB-Standards für jede Altersklasse.</p>
                </div>
              </div>
              {/* Teamgeist – col 3–4, row 1 */}
              <div style={{ gridColumn: '3 / 5', gridRow: '1 / 2' }} className="relative overflow-hidden rounded-3xl group shadow-lg">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={BENTO_IMG2} alt="Teamgeist" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 flex flex-col justify-end p-6" style={{ background: 'linear-gradient(to top, rgba(83,136,175,0.8) 0%, transparent 100%)' }}>
                  <h4 className="text-white font-body font-black text-2xl uppercase">TEAMGEIST ERLEBEN</h4>
                </div>
              </div>
              {/* Top Ausstattung – col 3, row 2 */}
              <div style={{ gridColumn: '3 / 4', gridRow: '2 / 3', backgroundColor: '#ffffff' }} className="relative overflow-hidden rounded-3xl shadow-lg flex flex-col items-center justify-center p-6 text-center">
                <span className="material-symbols-outlined text-6xl mb-4" style={{ color: '#052856' }}>workspace_premium</span>
                <h4 className="font-body font-black text-xl uppercase" style={{ color: '#052856' }}>TOP AUSSTATTUNG</h4>
              </div>
              {/* 10+ Teams – col 4, row 2 */}
              <div style={{ gridColumn: '4 / 5', gridRow: '2 / 3', backgroundColor: '#8B2319' }} className="relative overflow-hidden rounded-3xl shadow-lg flex flex-col items-center justify-center p-6 text-center">
                <span className="material-symbols-outlined text-6xl text-white mb-4">groups</span>
                <h4 className="text-white font-body font-black text-xl uppercase">10+ TEAMS</h4>
              </div>
            </div>
            {/* Mobile stacked */}
            <div className="flex flex-col gap-4 md:hidden">
              <div className="relative overflow-hidden rounded-3xl shadow-lg" style={{ height: '280px' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={BENTO_IMG1} alt="Training JFV" className="w-full h-full object-cover" />
                <div className="absolute inset-0 flex flex-col justify-end p-6" style={{ background: 'linear-gradient(to top, rgba(5,40,86,0.9) 0%, transparent 100%)' }}>
                  <h4 className="text-white font-body font-black text-2xl uppercase">MODERNE TRAININGSKONZEPTE</h4>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-3xl shadow-lg" style={{ height: '220px' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={BENTO_IMG2} alt="Teamgeist" className="w-full h-full object-cover" />
                <div className="absolute inset-0 flex flex-col justify-end p-6" style={{ background: 'linear-gradient(to top, rgba(83,136,175,0.8) 0%, transparent 100%)' }}>
                  <h4 className="text-white font-body font-black text-xl uppercase">TEAMGEIST ERLEBEN</h4>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-3xl shadow-lg flex flex-col items-center justify-center p-6 text-center bg-white" style={{ height: '180px' }}>
                  <span className="material-symbols-outlined text-5xl mb-3" style={{ color: '#052856' }}>workspace_premium</span>
                  <h4 className="font-body font-black text-lg uppercase" style={{ color: '#052856' }}>TOP AUSSTATTUNG</h4>
                </div>
                <div className="rounded-3xl shadow-lg flex flex-col items-center justify-center p-6 text-center" style={{ height: '180px', backgroundColor: '#8B2319' }}>
                  <span className="material-symbols-outlined text-5xl text-white mb-3">groups</span>
                  <h4 className="text-white font-body font-black text-lg uppercase">10+ TEAMS</h4>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-12" style={{ backgroundColor: '#8B2319' }}>
          <div className="max-w-4xl mx-auto px-6">
            <div className="flex flex-row items-center justify-between mb-12 gap-6">
              <h2 className="font-body font-black uppercase" style={{ fontSize: 'clamp(1.8rem,4vw,2.5rem)', color: '#FDE000' }}>
                HÄUFIG GESTELLTE FRAGEN
              </h2>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/jfv-logo.png" alt="JFV Hünstetten Logo" className="hidden md:block shrink-0 drop-shadow-2xl" style={{ width: 'clamp(100px,10vw,160px)' }} />
            </div>
            <div className="grid md:grid-cols-2 gap-4 items-start">
              <div className="space-y-4">
                {FAQ.slice(0, 3).map((item) => (
                  <div key={item.q} className="rounded-2xl overflow-hidden" style={{ backgroundColor: '#5388AF' }}>
                    <div className="p-6 pb-2">
                      <span className="text-lg font-body font-black uppercase text-white">{item.q}</span>
                    </div>
                    <div className="px-6 pb-6 leading-relaxed text-white" style={{ opacity: 0.85 }}>{item.a}</div>
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                {FAQ.slice(3).map((item) => (
                  <div key={item.q} className="rounded-2xl overflow-hidden" style={{ backgroundColor: '#5388AF' }}>
                    <div className="p-6 pb-2">
                      <span className="text-lg font-body font-black uppercase text-white">{item.q}</span>
                    </div>
                    <div className="px-6 pb-6 leading-relaxed text-white" style={{ opacity: 0.85 }}>{item.a}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

      </main>

      <SponsorBand sponsors={sponsors} variant="grey" />
      <SiteFooter logoUrl={logoUrl} departmentLabel="Jugendfußball (JFV)" variant="dark" />
    </div>
  )
}
