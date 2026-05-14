import BaseNav from '@/components/shared/layout/BaseNav'
import SiteFooter from '@/components/shared/layout/SiteFooter'
import SponsorBand from '@/components/shared/layout/SponsorBand'
import { fetchClubConfig, fetchSponsors, fetchAbteilung } from '@/lib/api'

const GESUNDHEITSSPORT_ID = '86f116c6-a406-4453-a63c-aca715a8c78e'
const TEAM_SHORT_NAME     = 'Achtsamkeit'
import KursHero from '@/components/shared/sections/KursHero'
import KursInfoGrid from '@/components/shared/sections/KursInfoGrid'
import ContentSplit from '@/components/shared/sections/ContentSplit'
import BentoSchwerpunkte from '@/components/shared/sections/BentoSchwerpunkte'
import KonzeptSection from '@/components/shared/sections/KonzeptSection'
import TrainerCard from '@/components/shared/sections/TrainerCard'
import KursCtaSection from '@/components/shared/sections/KursCtaSection'

const ACHTSAMKEIT_NAV = [
  { label: 'Kurse',           href: '#',              active: true },
  { label: 'Trainingszeiten', href: '#trainingszeiten' },
  { label: 'Ansprechpartner', href: '#ansprechpartner' },
  { label: 'Gesundheitssport', href: '../gesundheitssport' },
]

export default async function AchtsamkeitPage() {
  let logoUrl: string | null = null
  let sponsors: Awaited<ReturnType<typeof fetchSponsors>> = []
  let team: Awaited<ReturnType<typeof fetchAbteilung>>['mannschaften'][number] | undefined
  try {
    const config = await fetchClubConfig()
    logoUrl = config.logo_web_pfad ?? config.logo_url ?? null
    if (config.operator_id) sponsors = await fetchSponsors(config.operator_id).catch(() => [])
  } catch { /* fallback */ }
  try {
    const abteilung = await fetchAbteilung(GESUNDHEITSSPORT_ID)
    team = abteilung.mannschaften.find(m => m.short_name === TEAM_SHORT_NAME)
  } catch { /* fallback */ }

  return (
    <div className="bg-background font-body-md text-on-background">
      <BaseNav logoUrl={logoUrl} clubName="Hünstetten" departmentLabel="Achtsamkeit & Entspannung" navItems={ACHTSAMKEIT_NAV} ctaLabel="Jetzt Anmelden" homeHref="../" />
      <main className="pt-20">
        <KursHero
          imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuCDYJzMmOfe4LWHo1KVI47hn1N5gnaL3avUyCIWdClbnTu7qHeuqo0CqS14M1yw4_u9qp9SIPxwmNaCPl1BAxExYbVVdzZu-po69HH5fMvxVqBWDdB15-tY74NulE9KkmCpjdrMvNfSYcDpY6obIAl4ePCdoTYJhQDY4qS1J5_OpqIoK2oCrdWUNT7gBakng1zNZCbtXQv6MLdvzsDUD_suUOoe5wKX1mr-OCCVcZ06mKJgMMsAjSncH7V_THp9ydoxt_potnwYOUU"
          imageAlt="Person in ruhiger Meditation in einem hellen, stimmungsvollen Raum mit sanftem Morgenlicht"
          badge={team?.motto ?? 'EXKLUSIVES PROGRAMM'}
          title={team?.name ?? 'Achtsamkeit & Entspannung'}
          subtitle={team?.beschreibung ?? 'Im Einklang mit dir und deinem Atem. Entdecke die Kraft der inneren Stille und finde deine Balance im Alltag.'}
          primaryCta={{ label: 'Jetzt Anmelden' }}
          secondaryCta={{ label: 'Kursplan ansehen' }}
        />
        <KursInfoGrid
          kurszeit="Donnerstags, 19:30 – 20:30 Uhr"
          ort="Sportplatzstraße 12, Hünstetten"
          mitzubringen="Decke, Kissen, Handtuch"
        />
        <ContentSplit
          title="Innere Balance & Achtsamkeit"
          paragraphs={[
            'In unseren Achtsamkeitskursen lernen wir, den Moment bewusst wahrzunehmen. Durch gezielte Meditationsübungen und Atemtechniken finden wir zu mehr Ruhe und innerer Ausgeglichenheit – auch im hektischen Alltag.',
            'Die Verbindung aus Meditation, Yoga-Elementen und Sinneswahrnehmung schafft einen geschützten Raum für deine persönliche Auszeit. Wir laden jeden ein, unabhängig von Erfahrung oder Vorkenntnissen, diesen Weg gemeinsam zu gehen.',
          ]}
          checkItems={['Für alle Erfahrungslevel', 'Zertifizierte Kursleiterin']}
          imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuARiRyM77AztjpXLCGf3Bc2uOodrNjsyCD4vPuMFSuJ5fJlchxilf5pzTOg1U_DmiGB12aA_GfeheJ5S0zRHjPP1PNOm2iTWuIpvg48JkLgoNpbLuUcsFoiKwe37vyoBRpHMs8djYuCP4mUnr572PWkR23VZD_YEAGxYgQ5cOGDBkNJYM0eu4OdJejxDafBtVhiyJvyHOHMtqqF1IwhPc5RtVq9Mhvt-mOEYHd1FNK96B8fO8qUqUfVKpYUFiv1M94adXJFxh_DQn0"
          imageAlt="Person in ruhiger Meditationshaltung in einem hellen, modernen Raum"
        />
        <BentoSchwerpunkte
          title="Unsere Schwerpunkte"
          featured={[
            { icon: 'self_improvement', title: 'Achtsamkeitsübungen', description: 'Geführte Übungen, die helfen, den gegenwärtigen Moment bewusst zu erleben und Gedanken ohne Wertung wahrzunehmen.' },
            { icon: 'psychology', title: 'Meditation', description: 'Verschiedene Meditationstechniken für innere Stille, mentale Klarheit und einen erholsamen Ausgleich zum Alltag.' },
          ]}
          small={[
            { icon: 'fitness_center', title: 'Yoga-Elemente', description: 'Sanfte Bewegungsabfolgen zur Förderung von Flexibilität und Körperbewusstsein.' },
            { icon: 'air', title: 'Atemübungen', description: 'Bewusste Atemtechniken als Schlüssel zu Entspannung und innerer Ruhe.' },
            { icon: 'visibility', title: 'Sinneswahrnehmung', description: 'Übungen zur Schärfung der Sinne und bewussten Wahrnehmung des eigenen Körpers.' },
          ]}
        />
        <KonzeptSection
          imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuCDYJzMmOfe4LWHo1KVI47hn1N5gnaL3avUyCIWdClbnTu7qHeuqo0CqS14M1yw4_u9qp9SIPxwmNaCPl1BAxExYbVVdzZu-po69HH5fMvxVqBWDdB15-tY74NulE9KkmCpjdrMvNfSYcDpY6obIAl4ePCdoTYJhQDY4qS1J5_OpqIoK2oCrdWUNT7gBakng1zNZCbtXQv6MLdvzsDUD_suUOoe5wKX1mr-OCCVcZ06mKJgMMsAjSncH7V_THp9ydoxt_potnwYOUU"
          imageAlt="Ruhige Person in einem lichtdurchfluteten Raum bei der Meditation"
          overlayQuote="Der Moment ist das einzige, was wir wirklich besitzen."
          paragraphs={[
            'Unser Achtsamkeitskonzept verbindet bewährte Meditationstechniken mit modernen Erkenntnissen der Stressforschung. Im Mittelpunkt steht das bewusste Wahrnehmen des gegenwärtigen Moments – ohne Urteile, ohne Erwartungen.',
            'Durch regelmäßige Praxis entwickeln wir die Fähigkeit, auch in stressigen Situationen ruhig und gelassen zu bleiben. Atemübungen, Körperwahrnehmung und stille Meditation ergänzen sich zu einem ganzheitlichen Entspannungsprogramm.',
          ]}
          blockquote="Wir laden Sie ein, die hektische Außenwelt für eine Stunde hinter sich zu lassen und in die Stille einzutauchen."
        />
        <TrainerCard
          role="Deine Trainerin"
          name="Andrea Hoffmann"
          bio={`"Mit über 15 Jahren Erfahrung in der Achtsamkeitspraxis begleite ich Menschen auf ihrem Weg zu mehr innerer Ruhe und Lebensqualität. Jeder Schritt zählt – auch der kleinste."`}
          skills={['Achtsamkeits-Coach', 'Entspannungstherapeutin']}
          imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuCzLEwQK3DBMWkkbdT8M-sZfmJlZw6Xh4PlhUASPd0SCY3AYm15korwKMVfCy8JPgciPTUyfA_exRp6n3BpB2bgP0XjFLWLuKvf8Ymkd2q0IG4mlXNk6NNKBdXR9PscfTDNGgCflq5xgCahr_Kh4Tizz0l2VmmQPVp487xN6UuHigjmwbGGMRhNuC66LqAtX0Stuj9Fz15m7MpryejuPkQLjlBI-8A0L5zCF_O6_M-OArvOedmJeXFq41F5sQvRj43dXLFA16QInyY"
          imageAlt="Professionelles Portrait der Kursleiterin"
        />
        <KursCtaSection
          title="Bereit für deine Auszeit?"
          description="Sichere dir jetzt einen Platz in unserem nächsten Kurs. Wir freuen uns darauf, dich in der SG Hünstetten begrüßen zu dürfen."
          primaryLabel="JETZT ZUM PROBETRAINING ANMELDEN"
          secondaryLabel="AUF WARTELISTE SETZEN"
          footnote="Begrenzte Teilnehmerzahl – sichere dir rechtzeitig deinen Platz."
        />
      </main>
      <SponsorBand sponsors={sponsors} variant="grey" />
      <SiteFooter logoUrl={logoUrl} departmentLabel="Achtsamkeit & Entspannung" variant="light" />
    </div>
  )
}
