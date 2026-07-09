import { fetchClubConfig, fetchSponsors, fetchAbteilung } from '@/lib/api'
import type { AbteilungProfile } from '@/lib/api'

const FITNESS_ID = '29464fed-255d-4d5a-90d2-85546f97db9d'
import BaseNav from '@/components/shared/layout/BaseNav'
import SiteFooter from '@/components/shared/layout/SiteFooter'
import SponsorBand from '@/components/shared/layout/SponsorBand'
import TeamsInAbteilung from '@/components/fitness/TeamsInAbteilung'
import AbteilungHero from '@/components/shared/sections/AbteilungHero'
import StatsBar, { type StatsBarItem } from '@/components/shared/sections/StatsBar'
import KursInfoBox from '@/components/shared/sections/KursInfoBox'
import AbteilungCta from '@/components/shared/sections/AbteilungCta'
import KursplanDynamisch from '@/components/shared/sections/KursplanDynamisch'

const FITNESS_NAV = [
  { label: 'LadyFit',        href: '../ladyfit' },
  { label: 'ManFit',         href: '../manfit' },
  { label: 'Step-Aerobic',   href: '../step-aerobic' },
  { label: 'Tanzfitness',    href: '../tanzfitness' },
  { label: 'Workout',        href: '../workout' },
  { label: 'Fit-durchs-Jahr', href: '../fitdurchsjahr' },
  { label: 'SkiGym',         href: '../skigym' },
]

const FITNESS_STATS: StatsBarItem[] = [
  { value: '15+', label: 'Kurse Pro Woche', accent: 'primary' },
  { value: '300+', label: 'Aktive Mitglieder', accent: 'secondary' },
  { value: '80 J.', label: 'Vereinstradition', accent: 'primary' },
  { value: '6', label: 'Lizenzierte Trainer', accent: 'secondary' },
]

export default async function FitnessPage() {
  let logoUrl: string | null = null
  let sponsors: Awaited<ReturnType<typeof fetchSponsors>> = []
  let abteilung: AbteilungProfile | null = null
  try {
    const config = await fetchClubConfig()
    logoUrl = config.logoWebUrl ?? config.logoUrl ?? null
    sponsors = await fetchSponsors().catch(() => [])
  } catch { /* render without logo */ }
  try {
    abteilung = await fetchAbteilung(FITNESS_ID)
  } catch { /* fallback */ }

  return (
    <>
      <BaseNav
        logoUrl={logoUrl}
        navItems={FITNESS_NAV}
        groupCoursesIfOverflow
        ctaLabel="Jetzt Buchen"
        ctaHref="#cta"
      />

      <main className="pt-20">

        <AbteilungHero
          imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuAIBtPcaXq0RBTq-Gsff6FK7Z26LITHpOKNlLZyrVF9gaUtOYO5HB1-6aWdlvHb3HrE732uVzFZOnpH9h_ZE_ObRKF4LKzQfVTjgXf2HA7BNkDGAMJrtUiEzeXfGI6YVqBzrctLy_SVjO27qwr1sjM40KsCtudbAlLgqpwN_HGD31Z27J281R10YcsZCkLjq-ErfzmaLkp42QVRp8GzbGzr1CXYZAOt205XqUNaaI9g3yPCXsoKSHadr_rv5tDnQ7Nd7dpdl3yT8bI"
          imageAlt="Gruppe beim gemeinsamen Fitness-Training"
          badge="Kraft &amp; Ausdauer"
          title="Gemeinsam stärker werden."
          subtitle={abteilung?.description ?? 'Von Tanzfitness bis Workout, von LadyFit bis Ski-Training – bei uns findest du das passende Angebot. Für jedes Alter, jedes Level, jeden Montag.'}
          primaryCta={{ label: 'Kursplan entdecken' }}
          secondaryCta={{ label: 'Zur Probestunde' }}
        />

        <StatsBar items={FITNESS_STATS} />

        {/* Was ist Gesundheitssport */}
        <section className="py-12 bg-surface max-w-7xl mx-auto px-6">
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

        <TeamsInAbteilung mannschaften={abteilung?.mannschaften} />

        {/* Aktueller Kursplan */}
        <section className="py-12 bg-surface">
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
            {abteilung?.mannschaften && abteilung.mannschaften.length > 0
              ? <KursplanDynamisch mannschaften={abteilung.mannschaften} />
              : (
                <p className="text-sm text-on-surface-variant text-center py-8">
                  Kein aktueller Kursplan verfügbar. Bitte kontaktiere uns direkt.
                </p>
              )
            }
            <KursInfoBox
              title="Du bist unsicher, welcher Kurs passt?"
              description="Komm einfach zu einem kostenlosen Probetraining vorbei oder lass dich von unseren Trainern beraten."
              ctaLabel="Beratungsgespräch buchen"
            />
          </div>
        </section>

        {/* Fitness ist Prävention */}
        <section className="py-12 relative overflow-hidden">
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
                Fitness ist <br /><span className="text-secondary">Prävention.</span>
              </h2>
              <p className="text-on-surface-variant mb-6 leading-relaxed">Unser Fitness-Angebot ist darauf ausgelegt, muskuläre Dysbalancen auszugleichen, das Herz-Kreislauf-System zu stärken und die Beweglichkeit zu erhalten.</p>
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

        <AbteilungCta
          title="Bereit für Ihren ersten Kurs?"
          subtitle="Starten Sie noch heute Ihre Reise zu mehr Gesundheit und Wohlbefinden bei der SG Hünstetten."
          primaryLabel="Jetzt Kurs buchen"
          secondaryLabel="Probetraining vereinbaren"
        />

      </main>

      <SponsorBand sponsors={sponsors} variant="grey" />
      <SiteFooter logoUrl={logoUrl} departmentLabel="Fitness" variant="light" />
    </>
  )
}
