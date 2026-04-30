import { fetchClubConfig, fetchSponsors } from '@/lib/api'
import BaseNav from '@/components/shared/layout/BaseNav'
import SiteFooter from '@/components/shared/layout/SiteFooter'
import SponsorBand from '@/components/shared/layout/SponsorBand'
import TeamsInAbteilung from '@/components/gesundheitssport/TeamsInAbteilung'

const GESUNDHEITSSPORT_NAV = [
  { label: 'Achtsamkeit', href: '../achtsamkeit' },
  { label: 'Pilates',     href: '../pilates' },
  { label: 'Rücken-Fit',  href: '../rueckenfit' },
  { label: 'Qi-Gong',     href: '../qi-gong' },
]

export default async function GesundheitssportPage() {
  let logoUrl: string | null = null
  let sponsors: Awaited<ReturnType<typeof fetchSponsors>> = []
  try {
    const config = await fetchClubConfig()
    logoUrl = config.logo_web_pfad ?? config.logo_url ?? null
    if (config.operator_id) sponsors = await fetchSponsors(config.operator_id).catch(() => [])
  } catch { /* render without logo */ }

  return (
    <>
      <BaseNav
        logoUrl={logoUrl}
        departmentLabel="Gesundheitssport"
        navItems={GESUNDHEITSSPORT_NAV}
        ctaLabel="Jetzt Buchen"
      />

      <main className="pt-20">

        {/* Hero Section */}
        <section className="relative h-[716px] min-h-[500px] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="Atmospheric wellness hall" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkoJ8nO3fnYj2XUWx9v1pq2cpUsdyJZpmlYUguR6cNqb9_151x46croRxDVFqp2V4sQ78wLQx3HpdEkRzo0Gwzj2vtCo-sD-H_HQLRIc9ZyicRJ9H1XMvi5ILo7fwIzY2qUOJ_HfqJa_yan0-nX5tJFsX_2K43aHelVYGb7h18qqqqy9EwCBSdBuCgRwfhnfjtEI2VXQItCUlqDBPuPwPpsVzuEVc4TSE1ToZd8myYtu-9jlAJk73eVJy5Aj8vQoZg3JtPkmow6xU" />
            {/* from-primary-container/60 → rgba fix per CLAUDE.md */}
            <div className="absolute inset-0 bg-gradient-to-r from-[rgba(5,40,86,0.6)] to-transparent"></div>
          </div>
          <div className="relative z-10 max-w-[1200px] mx-auto px-6 w-full">
            <div className="max-w-2xl text-white">
              <span className="inline-block px-4 py-1 bg-secondary-container text-on-secondary-container rounded-full text-label-lg mb-6 uppercase tracking-widest">SG Hünstetten</span>
              <h1 className="text-display-lg font-display-lg mb-4 text-white">Gesundheitssport: Balance für Körper &amp; Geist</h1>
              <p className="text-body-lg mb-8 opacity-90">Erleben Sie ein ganzheitliches Wohlbefinden. Bei uns verbinden wir moderne Sportwissenschaft mit achtsamer Bewegung, um Ihre Lebensqualität nachhaltig zu steigern.</p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-[#FDE000] text-[#222222] font-label-lg px-8 py-4 rounded-lg hover:brightness-110 transition-all font-bold">Jetzt Kurs buchen</button>
                <button className="border border-white/40 backdrop-blur-sm text-white font-label-lg px-8 py-4 rounded-lg hover:bg-white/10 transition-all font-bold">Unsere Philosophie</button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-surface py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center p-6 bg-surface-container-low rounded-2xl border-b-4 border-primary">
                <div className="font-headline font-black text-4xl text-primary mb-1">15+</div>
                <div className="text-sm font-bold text-on-surface-variant uppercase tracking-tighter">Kurse Pro Woche</div>
              </div>
              <div className="text-center p-6 bg-surface-container-low rounded-2xl border-b-4 border-secondary">
                <div className="font-headline font-black text-4xl text-primary mb-1">300+</div>
                <div className="text-sm font-bold text-on-surface-variant uppercase tracking-tighter">Aktive Mitglieder</div>
              </div>
              <div className="text-center p-6 bg-surface-container-low rounded-2xl border-b-4 border-primary">
                <div className="font-headline font-black text-4xl text-primary mb-1">80 J.</div>
                <div className="text-sm font-bold text-on-surface-variant uppercase tracking-tighter">Vereinstradition</div>
              </div>
              <div className="text-center p-6 bg-surface-container-low rounded-2xl border-b-4 border-secondary">
                <div className="font-headline font-black text-4xl text-primary mb-1">6</div>
                <div className="text-sm font-bold text-on-surface-variant uppercase tracking-tighter">Lizenzierte Trainer</div>
              </div>
            </div>
          </div>
        </section>

        {/* Was ist Gesundheitssport */}
        <section className="py-24 bg-surface max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="font-headline text-4xl font-black text-primary leading-tight">Was ist Gesundheitssport?</h2>
              <p className="text-on-surface-variant text-lg leading-relaxed">Gesundheitssport bei SG Hünstetten ist weit mehr als nur Training. Es ist eine gezielte Prävention und Rehabilitation, die darauf abzielt, funktionelle Defizite auszugleichen und die physische wie psychische Belastbarkeit zu erhöhen.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="p-6 bg-surface-container-low border border-outline-variant/10 rounded-2xl shadow-sm">
                  <span className="material-symbols-outlined text-primary mb-4 text-3xl">diversity_3</span>
                  <h4 className="font-headline font-bold text-primary mb-2">Alle Altersgruppen</h4>
                  <p className="text-sm text-on-surface-variant">Von dynamischen Übungen für junge Aktive bis hin zur Sturzprophylaxe im Alter.</p>
                </div>
                <div className="p-6 bg-surface-container-low border border-outline-variant/10 rounded-2xl shadow-sm">
                  <span className="material-symbols-outlined text-primary mb-4 text-3xl">auto_graph</span>
                  <h4 className="font-headline font-bold text-primary mb-2">Ganzheitlichkeit</h4>
                  <p className="text-sm text-on-surface-variant">Kombination aus Kraft, Beweglichkeit, Koordination und Entspannung.</p>
                </div>
              </div>
            </div>
            <div className="relative h-[480px] rounded-[2.5rem] overflow-hidden shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="About Wellness" className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" src="https://www.ntbwelt.de/fileadmin/_processed_/9/2/csm_2Was_ist_Gesundheitssport_b4beef281f.jpg" />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-[2.5rem]"></div>
            </div>
          </div>
        </section>

        <TeamsInAbteilung />

        {/* Aktueller Kursplan */}
        <section className="py-24 bg-surface">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <h2 className="font-headline text-4xl font-black text-primary mb-4">Aktueller Kursplan</h2>
                <p className="text-on-surface-variant max-w-md">Finde die passende Zeit für deine Gesundheit. Alle Kurse finden in der Turnhalle Hünstetten statt.</p>
              </div>
              <div className="flex gap-2 p-1 bg-surface-container-low rounded-xl">
                <button className="bg-surface-container-lowest text-primary font-bold px-6 py-2 rounded-lg shadow-sm">Alle</button>
                <button className="text-on-surface-variant font-bold px-6 py-2 rounded-lg hover:bg-surface-container-high transition-colors">Kids</button>
                <button className="text-on-surface-variant font-bold px-6 py-2 rounded-lg hover:bg-surface-container-high transition-colors">Best Ager</button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-separate border-spacing-y-4">
                <thead className="bg-surface-container-low">
                  <tr>
                    <th className="px-8 py-4 font-headline font-bold text-primary rounded-l-2xl">Zeit</th>
                    <th className="px-8 py-4 font-headline font-bold text-primary">Kursname</th>
                    <th className="px-8 py-4 font-headline font-bold text-primary">Zielgruppe</th>
                    <th className="px-8 py-4 font-headline font-bold text-primary">Trainer</th>
                    <th className="px-8 py-4 font-headline font-bold text-primary rounded-r-2xl">Aktion</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-surface-container-lowest hover:scale-[1.01] transition-transform duration-200">
                    <td className="px-8 py-6 rounded-l-2xl">
                      <div className="font-headline font-black text-primary">Montag</div>
                      <div className="text-xs font-bold text-on-surface-variant">09:00 - 10:30</div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="font-bold text-lg text-primary">Senior-Fit</div>
                      <div className="text-xs text-on-surface-variant">Präventionsgymnastik</div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="px-3 py-1 bg-tertiary-fixed text-on-tertiary-fixed-variant rounded-full text-[10px] font-black uppercase tracking-widest">Senioren</span>
                    </td>
                    <td className="px-8 py-6"><span className="font-medium">Martina W.</span></td>
                    <td className="px-8 py-6 rounded-r-2xl">
                      <button className="text-primary font-black text-xs uppercase tracking-widest border-b-2 border-secondary hover:text-secondary transition-colors">Anmelden</button>
                    </td>
                  </tr>
                  <tr className="bg-surface-container-lowest hover:scale-[1.01] transition-transform duration-200">
                    <td className="px-8 py-6 rounded-l-2xl">
                      <div className="font-headline font-black text-primary">Dienstag</div>
                      <div className="text-xs font-bold text-on-surface-variant">16:30 - 17:30</div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="font-bold text-lg text-primary">Power Kids</div>
                      <div className="text-xs text-on-surface-variant">Spiel, Spaß &amp; Motorik</div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="px-3 py-1 bg-secondary-fixed text-on-secondary-fixed-variant rounded-full text-[10px] font-black uppercase tracking-widest">6-10 Jahre</span>
                    </td>
                    <td className="px-8 py-6"><span className="font-medium">Lukas S.</span></td>
                    <td className="px-8 py-6 rounded-r-2xl">
                      <button className="text-primary font-black text-xs uppercase tracking-widest border-b-2 border-secondary hover:text-secondary transition-colors">Anmelden</button>
                    </td>
                  </tr>
                  <tr className="bg-surface-container-lowest hover:scale-[1.01] transition-transform duration-200">
                    <td className="px-8 py-6 rounded-l-2xl">
                      <div className="font-headline font-black text-primary">Donnerstag</div>
                      <div className="text-xs font-bold text-on-surface-variant">19:00 - 20:30</div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="font-bold text-lg text-primary">Body &amp; Soul Gym</div>
                      <div className="text-xs text-on-surface-variant">Ganzkörper-Workout</div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="px-3 py-1 bg-primary-fixed text-on-primary-fixed-variant rounded-full text-[10px] font-black uppercase tracking-widest">Erwachsene</span>
                    </td>
                    <td className="px-8 py-6"><span className="font-medium">Sina M.</span></td>
                    <td className="px-8 py-6 rounded-r-2xl">
                      <button className="text-primary font-black text-xs uppercase tracking-widest border-b-2 border-secondary hover:text-secondary transition-colors">Anmelden</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-12 p-8 bg-surface-container-low rounded-3xl flex flex-col md:flex-row items-center gap-8 border border-outline-variant/10">
              <div className="p-4 bg-surface-container-lowest rounded-2xl">
                <span className="material-symbols-outlined text-4xl text-primary">info</span>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h4 className="font-headline font-bold text-primary text-xl mb-1">Du bist unsicher, welcher Kurs passt?</h4>
                <p className="text-on-surface-variant text-sm">Komm einfach zu einem kostenlosen Probetraining vorbei oder lass dich von unseren Trainern beraten.</p>
              </div>
              <button className="bg-secondary-container text-on-secondary-container px-8 py-3 rounded-xl font-headline font-extrabold text-sm hover:scale-105 transition-transform shadow-md">
                Beratungsgespräch buchen
              </button>
            </div>
          </div>
        </section>

        {/* Gesundheitssport ist Prävention */}
        <section className="py-24 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
            <div className="w-full lg:w-1/2 relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="Yoga session" className="rounded-[3rem] shadow-2xl relative z-10 w-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfOznd2Yv2ObRCZnlOojk5zJnAUEUYoClcMnoveh4DKMnAC_jTq_DFgZyMXPqzwWP5Q8HX-pCNzzXlWZJtqvsYhESzph1ab_BpCh03OfxBzDnmb-Cgo2U43KNKZ6O-B8w0mWE2aZhSOyHuO-QAClRXriTyBx17LZeeVMTqdDd6T3DNOisYIi8JmmSqyujS9XDcTBZ_sXRTEyGPa_6OdWSaQ4EurOTLUR2kA5SImSgExEAjEyIjagss_eO2GwlvPrg2nL2LeUk2kQc" />
              <div className="absolute -bottom-6 -right-6 bg-secondary-container p-8 rounded-3xl shadow-xl z-20 hidden md:block">
                <div className="text-primary font-headline font-black text-2xl tracking-tighter italic">Seit 1944.</div>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <h2 className="font-headline text-4xl font-black text-primary mb-6 leading-tight">
                Gesundheitssport ist <br /><span className="text-secondary">Prävention.</span>
              </h2>
              <p className="text-on-surface-variant mb-6 leading-relaxed">Unser Angebot im Gesundheitssport ist darauf ausgelegt, muskuläre Dysbalancen auszugleichen, das Herz-Kreislauf-System zu stärken und die Beweglichkeit zu erhalten.</p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-on-surface-variant font-medium">
                  <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  Zertifizierte Präventionskurse
                </li>
                <li className="flex items-center gap-3 text-on-surface-variant font-medium">
                  <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  Individuelle Betreuung in Kleingruppen
                </li>
                <li className="flex items-center gap-3 text-on-surface-variant font-medium">
                  <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  Krankenkassen-Bezuschussung möglich
                </li>
              </ul>
              <a className="inline-flex items-center gap-2 text-primary font-black font-headline uppercase tracking-widest group" href="#">
                Mehr über Prävention erfahren
                <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">arrow_forward_ios</span>
              </a>
            </div>
          </div>
        </section>

        {/* Bereit für Ihren ersten Kurs? */}
        <section className="max-w-[1200px] mx-auto px-6 py-xl">
          <div className="bg-primary-container rounded-2xl p-lg text-center text-white relative overflow-hidden">
            <div className="relative z-10 py-12">
              <h2 className="font-headline text-3xl font-bold mb-6">Bereit für Ihren ersten Kurs?</h2>
              <p className="font-body text-lg mb-8 max-w-xl mx-auto opacity-90">Starten Sie noch heute Ihre Reise zu mehr Gesundheit und Wohlbefinden bei der SG Hünstetten.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button className="bg-secondary-container text-[#222222] px-10 py-4 rounded font-bold text-base transition-transform active:scale-95">Jetzt Kurs buchen</button>
                <button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-10 py-4 rounded font-bold text-base transition-transform active:scale-95 hover:bg-white/20">Probetraining vereinbaren</button>
              </div>
            </div>
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
          </div>
        </section>

      </main>

      <SponsorBand sponsors={sponsors} variant="grey" />
      <SiteFooter logoUrl={logoUrl} departmentLabel="Gesundheitssport" variant="light" />
    </>
  )
}
