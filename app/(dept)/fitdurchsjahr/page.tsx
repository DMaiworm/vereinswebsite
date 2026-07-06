import BaseNav from '@/components/shared/layout/BaseNav'
import SiteFooter from '@/components/shared/layout/SiteFooter'
import SponsorBand from '@/components/shared/layout/SponsorBand'
import { fetchClubConfig, fetchSponsors } from '@/lib/api'
import KursHero from '@/components/shared/sections/KursHero'
import KursInfoGrid from '@/components/shared/sections/KursInfoGrid'
import ContentSplit from '@/components/shared/sections/ContentSplit'
import BentoSchwerpunkte from '@/components/shared/sections/BentoSchwerpunkte'
import KonzeptSection from '@/components/shared/sections/KonzeptSection'
import TrainerCard from '@/components/shared/sections/TrainerCard'
import KursCtaSection from '@/components/shared/sections/KursCtaSection'

const FITDURCHSJAHR_NAV = [
  { label: 'Fit-durchs-Jahr', href: '#',              active: true },
  { label: 'Trainingszeiten',  href: '#trainingszeiten' },
  { label: 'Ansprechpartner',  href: '#ansprechpartner' },
  { label: 'Fitness',          href: '../fitness' },
]

export default async function FitDurchsJahrPage() {
  let logoUrl: string | null = null
  let sponsors: Awaited<ReturnType<typeof fetchSponsors>> = []
  try {
    const config = await fetchClubConfig()
    logoUrl = config.logoWebUrl ?? config.logoUrl ?? null
    sponsors = await fetchSponsors().catch(() => [])
  } catch { /* fallback */ }

  return (
    <div className="bg-background font-body-md text-on-background">
      <BaseNav logoUrl={logoUrl} clubName="Hünstetten" departmentLabel="Fit-durchs-Jahr" navItems={FITDURCHSJAHR_NAV} ctaLabel="Jetzt Anmelden" homeHref="../" />
      <main className="pt-20">
        <KursHero
          imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuBYjUo"
          imageAlt="Motivated group doing varied fitness training together outdoors and in the gym"
          badge="FIT DAS GANZE JAHR"
          title="Fit-durchs-Jahr"
          subtitle="Variantenreiches Ganzkörpertraining für alle, die sich sportlich weiterentwickeln und Fitness in der Gruppe genießen wollen – von April bis Oktober."
          primaryCta={{ label: 'Jetzt Anmelden' }}
          secondaryCta={{ label: 'Kursplan ansehen' }}
        />
        <KursInfoGrid
          kurszeit="Montags, 19:00 – 20:00 Uhr (Apr – Okt)"
          ort="Gymnastikraum, Sportweg 1, Hünstetten"
          mitzubringen="Sportkleidung, Hallenschuhe, Freude am Sport"
        />
        <ContentSplit
          title="Sportlich weiterentwickeln – gemeinsam"
          paragraphs={[
            'Fit-durchs-Jahr ist die ideale Plattform für motivierte Sportbegeisterte beiderlei Geschlechts, die ihre Fitness ganzheitlich verbessern wollen. Das Training zeigt jedem Teilnehmer seine sportliche Belastbarkeit auf und verhilft durch die positive Gruppendynamik zu höheren Zielen.',
            'Als Methoden kommen Konditions- und Funktionsgymnastik, Zirkeltraining, HIIT sowie Stabilisations- und Koordinationstraining zum Einsatz – ergänzt durch freudvolle Spiele. Neben dem Körpergewicht werden Kleinhanteln, Springseile, Brasils, Stepper und Gymnastikbälle eingesetzt.',
          ]}
          checkItems={['Offen für alle', 'Apr – Okt']}
          imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuDyEy-z--qKZoTp_kyIFKq9qcnKBrULdY7ONPJkR2FV0Hr1eOd4R1xvT1oA2MvQyBMKBE0ZoNhOVTeYmNGvggusmZWMtTWLuWXp54kZqkLkS_QL0s_pUvWP4AFFoMEufGLs7PTUH0AQ59X_c9OkUjJPqalut2rvDcuB-F8Ug0epRe-c-R2yTCToiujrC7BOvwYVxeKozsiQyt_TqAjv_Tj3CzBJOmRHTBJaL8-NQd5xS4dwjQ52Z5oJUJrMlDkh12FoWtXDiAg7kKo"
          imageAlt="Close-up of a person performing a controlled pilates plank on a mat, emphasizing core alignment and muscle definition in soft focus"
        />
        <BentoSchwerpunkte
          title="Unsere Schwerpunkte"
          featured={[
            { icon: 'fitness_center', title: 'Kraft & Ausdauer', description: 'Zirkeltraining und HIIT steigern Kraft, Kraftausdauer und Kondition – mit Körpergewicht und vielfältigen Sportgeräten.' },
            { icon: 'psychology', title: 'Koordination & Stabilisation', description: 'Gezielte Übungen verbessern Gleichgewicht, neuromuskuläre Kontrolle und Rumpfstabilität als Basis für alle Sportarten.' },
          ]}
          small={[
            { icon: 'bolt', title: 'Schnellkraft', description: 'Dynamische Übungen trainieren explosive Kraft und Reaktionsvermögen.' },
            { icon: 'accessibility_new', title: 'Beweglichkeit', description: 'Funktionsgymnastik und Dehnung halten Gelenke mobil und Muskeln geschmeidig.' },
            { icon: 'groups', title: 'Gemeinschaft', description: 'Die Gruppe motiviert – und Ballspiele machen jede Einheit zu einem echten Erlebnis.' },
          ]}
        />
        <KonzeptSection
          imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuBpa5zcifDK8y6PJsjpWiY9rv1uUfdgEFSk-5CY_7VeK8xx2jmm0c7Z8wLF8rCt3fQCdBi_Z9EimeH5_HY1wIWsVKdrCstFmWWJW1cMET2hZaF5H-ujOsgzheyfPFNQZ201Wy7jVmKEgFibezni1JZFO4x4oyLXYXGc5hsJgdzQT1wSqgLdbC3qdB67uibnEO3ecolhfk5jSWlqq7xXeh-T7_Q1NHWSHgv5HIiTEsmEb0l8PzgfvyHow7yjZolYuEwNCsjBrkd0_k8"
          imageAlt="Serene person in a modern light-filled studio practicing advanced pilates movements, focusing on form and precision"
          overlayQuote="Die optimale Gruppe fördert dein individuelles Potenzial – jeden Montag neu."
          paragraphs={[
            'Fit-durchs-Jahr läuft von Anfang April bis Ende Oktober und schließt damit nahtlos an SkiGym an – zusammen decken beide Kurse das ganze Jahr ab. Das Programm ist bewusst abwechslungsreich gestaltet: Kein Training gleicht dem anderen, weil Werner verschiedene Methoden und Geräte kombiniert.',
            'Dabei fördert die optimale Gruppenkonstellation individuelle Entwicklungspotenziale: Werner passt Intensität und Übungsauswahl so an, dass jeder gefordert, aber nicht überfordert wird. Freudvolle Spiele mit und ohne Ball sorgen dafür, dass die Stunde nie zur Pflicht wird.',
          ]}
          blockquote="Wer fit durchs Jahr trainiert, braucht sich auf den Skiern keine Sorgen zu machen – und umgekehrt."
        />
        <TrainerCard
          role="Euer Übungsleiter"
          name="Werner Harasta"
          bio={`"Fit-durchs-Jahr und SkiGym ergänzen sich perfekt – wer das ganze Jahr dabei ist, merkt, wie Kondition, Kraft und Koordination Stück für Stück wachsen. Ich freue mich über jeden, der mitmacht."`}
          skills={['Ganzkörpertraining', 'HIIT & Zirkeltraining']}
          imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuBvKIxfVGnG3xqOqFi3wnG8op37KzT9avb5YMJYa7OExTckTxr5MUawdZOh42NX0_B6LA6V3qkRhAAGumVJgCelq5ABsxJEi8cSwmOMsdwgl-Xf46CCiXBXucyUfOTTKN5McoDvcxpz2MbFpgD17rsY1O5U9lk8XaSyMbi4mm8_-e7e0E_gTKLPtGEpZTz6MXTeH_egS6bMQnUu7LsxEdxum5uyC8_rwzB5EHEseKlwbOIGzdIhd9eZaOfqgwWEjmtVoNLQwuyOrjY"
          imageAlt="Porträt von Übungsleiter Werner Harasta"
        />
        <KursCtaSection
          title="Bereit, das ganze Jahr fit zu bleiben?"
          description="Der Kurs startet Anfang April – montags um 19 Uhr. Komm einfach vorbei und überzeuge dich, wie viel Spaß abwechslungsreiches Training in guter Gesellschaft macht."
          primaryLabel="Jetzt Anmelden"
          secondaryLabel="Frage stellen"
        />
      </main>
      <SponsorBand sponsors={sponsors} variant="grey" />
      <SiteFooter logoUrl={logoUrl} departmentLabel="Fit-durchs-Jahr" variant="light" />
    </div>
  )
}
