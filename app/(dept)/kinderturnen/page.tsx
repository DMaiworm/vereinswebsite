import { fetchClubConfig, fetchSponsors } from '@/lib/api'
import { internalHref } from '@/lib/assetPath'
import BaseNav from '@/components/shared/layout/BaseNav'
import SiteFooter from '@/components/shared/layout/SiteFooter'
import SponsorBand from '@/components/shared/layout/SponsorBand'
import TeamsInAbteilung from '@/components/kinderturnen/TeamsInAbteilung'
import AbteilungHero from '@/components/shared/sections/AbteilungHero'
import StatsBar, { type StatsBarItem } from '@/components/shared/sections/StatsBar'
import KursInfoBox from '@/components/shared/sections/KursInfoBox'
import AbteilungCta from '@/components/shared/sections/AbteilungCta'

const KINDERTURNEN_NAV = [
  { label: 'Früh übt sich I',  href: '../fruehuebtsich-1' },
  { label: 'Früh übt sich II', href: '../fruehuebtsich-2' },
  { label: 'Kids in Bewegung', href: '../kids-in-bewegung' },
  { label: 'Grundschulturnen', href: '../grundschulturnen' },
]

const KURSPLAN = [
  {
    tag: 'Montag', zeit: '15:15 – 16:15',
    name: 'Früh übt sich (II)', untertitel: 'Eltern-Kind-Turnen',
    altersgruppe: '1,5 – 3 Jahre', badgeClass: 'bg-secondary-fixed text-on-secondary-fixed-variant',
    trainerin: 'Carina Faust', href: '/fruehuebtsich-2',
  },
  {
    tag: 'Dienstag', zeit: '15:30 – 16:15',
    name: 'Kids in Bewegung (Gr. 1)', untertitel: 'Turnen & Spielen',
    altersgruppe: '3,5 – 5 Jahre', badgeClass: 'bg-primary-fixed text-on-primary-fixed-variant',
    trainerin: 'Friederike Frömel', href: '/kids-in-bewegung',
  },
  {
    tag: 'Mittwoch', zeit: '15:15 – 16:00',
    name: 'Früh übt sich (I)', untertitel: 'Eltern-Kind-Turnen',
    altersgruppe: '6M – 1,5 Jahre', badgeClass: 'bg-tertiary-fixed text-on-tertiary-fixed-variant',
    trainerin: 'Carina Faust', href: '/fruehuebtsich-1',
  },
  {
    tag: 'Mittwoch', zeit: '16:45 – 17:30',
    name: 'Kids in Bewegung (Gr. 2)', untertitel: 'Turnen & Spielen',
    altersgruppe: '5 – 7 Jahre', badgeClass: 'bg-primary-fixed text-on-primary-fixed-variant',
    trainerin: 'Stefanie Specht', href: '/kids-in-bewegung',
  },
  {
    tag: 'Freitag', zeit: '17:30 – 18:30',
    name: 'Kinder stärken', untertitel: 'Sport, Spiel & Spaß',
    altersgruppe: '6 – 10 Jahre', badgeClass: 'bg-secondary-fixed text-on-secondary-fixed-variant',
    trainerin: 'Hanna Stein', href: '/grundschulturnen',
  },
] as const

const KINDERTURNEN_STATS: StatsBarItem[] = [
  { value: '4',    label: 'Altersgruppen',     accent: 'primary' },
  { value: '6M+',  label: 'Ab Säuglingsalter', accent: 'secondary' },
  { value: '80 J.', label: 'Vereinstradition', accent: 'primary' },
  { value: '6',    label: 'Trainerinnen',      accent: 'secondary' },
]

export default async function KinderturnenPage() {
  let logoUrl: string | null = null
  let sponsors: Awaited<ReturnType<typeof fetchSponsors>> = []
  try {
    const config = await fetchClubConfig()
    logoUrl = config.logoWebUrl ?? config.logoUrl ?? null
    sponsors = await fetchSponsors().catch(() => [])
  } catch { /* render without logo */ }

  return (
    <>
      <BaseNav
        logoUrl={logoUrl}
        departmentLabel="Kinderturnen"
        navItems={KINDERTURNEN_NAV}
        groupCoursesIfOverflow
        ctaLabel="Probetraining"
        ctaHref="#cta"
      />

      <main className="pt-20">

        <AbteilungHero
          imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuARiRyM77AztjpXLCGf3Bc2uOodrNjsyCD4vPuMFSuJ5fJlchxilf5pzTOg1U_DmiGB12aA_GfeheJ5S0zRHjPP1PNOm2iTWuIpvg48JkLgoNpbLuUcsFoiKwe37vyoBRpHMs8djYuCP4mUnr572PWkR23VZD_YEAGxYgQ5cOGDBkNJYM0eu4OdJejxDafBtVhiyJvyHOHMtqqF1IwhPc5RtVq9Mhvt-mOEYHd1FNK96B8fO8qUqUfVKpYUFiv1M94adXJFxh_DQn0"
          imageAlt="Kinder turnen spielerisch in der Halle"
          badge="SG Hünstetten"
          title="Kinderturnen: Bewegungsfreude von Anfang an"
          subtitle="Von den ersten Bewegungsabenteuern im Säuglingsalter bis zum sportlichen Grundschulkind – bei uns findet jedes Kind den richtigen Kurs."
          primaryCta={{ label: 'Jetzt Kurs finden' }}
          secondaryCta={{ label: 'Mehr erfahren' }}
        />

        <StatsBar items={KINDERTURNEN_STATS} />

        {/* Was wir anbieten */}
        <section className="py-12 bg-surface max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="font-headline text-4xl font-black text-primary leading-tight break-words">Bewegungsförderung für alle Altersgruppen</h2>
              <p className="text-on-surface-variant text-lg leading-relaxed">Unsere Abteilung „Kinderturnen" begleitet Kinder von den ersten Lebensmonaten bis ins Grundschulalter mit einem altersgerechten und vielseitigen Bewegungsangebot. Dabei orientieren wir uns am individuellen Entwicklungsstand und schaffen einen Raum, in dem sich Kinder spielerisch ausprobieren und entwickeln können.</p>
              <p className="text-on-surface-variant leading-relaxed">Ab etwa 3 Jahren erweitern wir das Angebot um Bewegungslandschaften, Turnstationen und kreative Spiele. Im Grundschulalter können sich die Kinder auspowern und wichtige Koordinations- und Ausdauer-Grundlagen entwickeln – ganz ohne Leistungsdruck, aber mit viel Spaß.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="p-6 bg-surface-container-low border border-outline-variant/10 rounded-2xl shadow-sm">
                  <span className="material-symbols-outlined text-primary mb-4 text-3xl">child_care</span>
                  <h4 className="font-headline font-bold text-primary mb-2">Alle Altersgruppen</h4>
                  <p className="text-sm text-on-surface-variant">Von 6 Monaten bis 10 Jahren – für jede Entwicklungsphase das passende Angebot.</p>
                </div>
                <div className="p-6 bg-surface-container-low border border-outline-variant/10 rounded-2xl shadow-sm">
                  <span className="material-symbols-outlined text-primary mb-4 text-3xl">sports_gymnastics</span>
                  <h4 className="font-headline font-bold text-primary mb-2">Spielerisches Lernen</h4>
                  <p className="text-sm text-on-surface-variant">Bewegung, Koordination und Sozialverhalten werden spielerisch und ohne Druck gefördert.</p>
                </div>
              </div>
            </div>
            <div className="relative h-[480px] rounded-[2.5rem] overflow-hidden shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="Kinder beim Turnen in der Halle" className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfOznd2Yv2ObRCZnlOojk5zJnAUEUYoClcMnoveh4DKMnAC_jTq_DFgZyMXPqzwWP5Q8HX-pCNzzXlWZJtqvsYhESzph1ab_BpCh03OfxBzDnmb-Cgo2U43KNKZ6O-B8w0mWE2aZhSOyHuO-QAClRXriTyBx17LZeeVMTqdDd6T3DNOisYIi8JmmSqyujS9XDcTBZ_sXRTEyGPa_6OdWSaQ4EurOTLUR2kA5SImSgExEAjEyIjagss_eO2GwlvPrg2nL2LeUk2kQc" />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-[2.5rem]"></div>
            </div>
          </div>
        </section>

        <TeamsInAbteilung />

        {/* Aktueller Kursplan */}
        <section className="py-12 bg-surface">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <h2 className="font-headline text-4xl font-black text-primary mb-4">Aktueller Kursplan</h2>
                <p className="text-on-surface-variant max-w-md">Alle Kurse finden in der Turnhalle Hünstetten oder der Mehrzweckhalle Görsroth statt.</p>
              </div>
            </div>
            {/* Desktop: Tabelle */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-separate border-spacing-y-4">
                <thead className="bg-surface-container-low">
                  <tr>
                    <th className="px-8 py-4 font-headline font-bold text-primary rounded-l-2xl">Zeit</th>
                    <th className="px-8 py-4 font-headline font-bold text-primary">Kursname</th>
                    <th className="px-8 py-4 font-headline font-bold text-primary">Altersgruppe</th>
                    <th className="px-8 py-4 font-headline font-bold text-primary">Trainerin</th>
                    <th className="px-8 py-4 font-headline font-bold text-primary rounded-r-2xl">Aktion</th>
                  </tr>
                </thead>
                <tbody>
                  {KURSPLAN.map((kurs) => (
                    <tr key={`${kurs.tag}-${kurs.zeit}`} className="bg-surface-container-lowest hover:scale-[1.01] transition-transform duration-200">
                      <td className="px-8 py-6 rounded-l-2xl">
                        <div className="font-headline font-black text-primary">{kurs.tag}</div>
                        <div className="text-xs font-bold text-on-surface-variant">{kurs.zeit}</div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="font-bold text-lg text-primary">{kurs.name}</div>
                        <div className="text-xs text-on-surface-variant">{kurs.untertitel}</div>
                      </td>
                      <td className="px-8 py-6">
                        <span className={`px-3 py-1 ${kurs.badgeClass} rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap`}>{kurs.altersgruppe}</span>
                      </td>
                      <td className="px-8 py-6"><span className="font-medium text-on-surface">{kurs.trainerin}</span></td>
                      <td className="px-8 py-6 rounded-r-2xl">
                        <a href={internalHref(kurs.href)} className="text-primary font-black text-xs uppercase tracking-widest border-b-2 border-secondary hover:text-secondary transition-colors">Mehr erfahren</a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile: gestapelte Karten */}
            <div className="md:hidden space-y-4">
              {KURSPLAN.map((kurs) => (
                <div key={`${kurs.tag}-${kurs.zeit}`} className="bg-surface-container-lowest rounded-2xl p-6">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="font-headline font-black text-primary">{kurs.tag}</div>
                      <div className="text-xs font-bold text-on-surface-variant">{kurs.zeit}</div>
                    </div>
                    <span className={`px-3 py-1 ${kurs.badgeClass} rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap shrink-0`}>{kurs.altersgruppe}</span>
                  </div>
                  <div className="font-bold text-lg text-primary">{kurs.name}</div>
                  <div className="text-xs text-on-surface-variant mb-4">{kurs.untertitel}</div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-medium text-on-surface text-sm">{kurs.trainerin}</span>
                    <a href={internalHref(kurs.href)} className="text-primary font-black text-xs uppercase tracking-widest border-b-2 border-secondary hover:text-secondary transition-colors">Mehr erfahren</a>
                  </div>
                </div>
              ))}
            </div>
            <KursInfoBox
              title="Du weißt nicht, welcher Kurs zu deinem Kind passt?"
              description="Komm einfach zu einem Probetraining vorbei oder kontaktiere direkt die jeweilige Trainerin."
              ctaLabel="Trainerin kontaktieren"
            />
          </div>
        </section>

        {/* Warum Bewegung so wichtig ist */}
        <section className="py-12 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
            <div className="w-full lg:w-1/2 relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="Kinder spielen gemeinsam in der Turnhalle" className="rounded-[3rem] shadow-2xl relative z-10 w-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtn73rZ5diGM1vyNThrLrZ_Auu982bEmOSKvHyPu5ok42CC8Qkp5W9qQeEXYKExY6I3qbFPqDJ9D4k5tmrdNPj3W2sAACb-DJvuPD66lOLu4Tq2BJmw29nHfrHecBN3h1xUrkaJMzmiK72a8EkHtqgraD_I7_uNY9PYRX29JggWDz6ZQW6Ve_smJL1x3dh034Q1HQmT6yKpmCH3Xi_UrgwG8itG4nHN1zhjfJsYdPYzQzGwy7Nb3VjRN_wH8X17v8YyreGZsA54Bs" />
              <div className="absolute -bottom-6 -right-6 bg-secondary-container p-8 rounded-3xl shadow-xl z-20 hidden md:block">
                <div className="text-primary font-headline font-black text-2xl tracking-tighter italic">Seit 1944.</div>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <h2 className="font-headline text-4xl font-black text-primary mb-6 leading-tight">
                Warum Bewegung für Kinder so <br /><span className="text-secondary">wichtig ist.</span>
              </h2>
              <p className="text-on-surface-variant mb-6 leading-relaxed">Bewegung ist entscheidend für die gesunde Entwicklung von Kindern. Sie stärkt motorische Fähigkeiten, unterstützt die geistige Entwicklung und fördert das Selbstbewusstsein. Unser Kinderturnen bietet dafür einen geschützten Raum ohne Leistungsdruck.</p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-on-surface-variant font-medium">
                  <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  Motorische Fähigkeiten und Koordination
                </li>
                <li className="flex items-center gap-3 text-on-surface-variant font-medium">
                  <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  Soziale Kompetenzen und Teamgeist
                </li>
                <li className="flex items-center gap-3 text-on-surface-variant font-medium">
                  <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  Ausgleich zum Alltag, Stressabbau & Freude
                </li>
              </ul>
              <a className="inline-flex items-center gap-2 text-primary font-black font-headline uppercase tracking-widest group" href="#">
                Mehr über unsere Kurse erfahren
                <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">arrow_forward_ios</span>
              </a>
            </div>
          </div>
        </section>

        <AbteilungCta
          title="Bereit für das erste Abenteuer?"
          subtitle="Melde dein Kind jetzt für einen Kurs an und entdecke, was Kinderturnen bei der SG Hünstetten bedeutet."
          primaryLabel="Kurs finden"
          secondaryLabel="Kontakt aufnehmen"
        />

      </main>

      <SponsorBand sponsors={sponsors} variant="grey" />
      <SiteFooter logoUrl={logoUrl} departmentLabel="Kinderturnen" variant="light" />
    </>
  )
}
