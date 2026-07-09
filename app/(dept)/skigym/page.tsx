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


export default async function SkiGymPage() {
  let logoUrl: string | null = null
  let sponsors: Awaited<ReturnType<typeof fetchSponsors>> = []
  try {
    const config = await fetchClubConfig()
    logoUrl = config.logoWebUrl ?? config.logoUrl ?? null
    sponsors = await fetchSponsors().catch(() => [])
  } catch { /* fallback */ }

  return (
    <div className="bg-background font-body-md text-on-background">
      <BaseNav
        logoUrl={logoUrl}
        clubName="Hünstetten"
        departmentLabel="SkiGym"
        ctaLabel="Jetzt Anmelden"
        ctaHref="#kontakt"
      />
      <main className="pt-20">
        <KursHero
          imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuBYjUo"
          imageAlt="Skiers on a snowy slope, energetic and fit, ready for the season"
          badge="FIT IN DIE SKISAISON"
          title="SkiGym"
          subtitle="Mehr Power auf der Piste, weniger Muskelkater danach. Fitnesstraining für Wintersportler und alle, die sich ganzjährig fit halten wollen."
          primaryCta={{ label: 'Jetzt Anmelden' }}
          secondaryCta={{ label: 'Kursplan ansehen' }}
        />
        <KursInfoGrid
          kurszeit="Montags, 19:00 – 20:00 Uhr (Nov – Mär)"
          ort="Gymnastikraum, Sportweg 1, Hünstetten"
          mitzubringen="Sportkleidung, Hallenschuhe, gute Laune"
        />
        <ContentSplit
          title="Stärker auf der Piste, fitter im Alltag"
          paragraphs={[
            'SkiGym ist skisportmotorisch orientiert – aber weil Skifahren ein echter Ganzkörpersport ist, profitieren hier nicht nur Wintersportler. Der Kurs ist offen für Sportbegeisterte beiderlei Geschlechts und aller Altersgruppen, die sich fit halten und ihre Leistung steigern wollen.',
            'Das Aufwärmen startet mit freudvollen Spielen in der Gruppe. Der Hauptteil wechselt zwischen Funktionsgymnastik, Zirkeltraining und HIIT – mit Körpergewicht, Brasils, Steppern, Medizinbällen und Balancematten. Abgeschlossen wird mit einem Ballspiel und dem obligatorischen Nachdehnen.',
          ]}
          checkItems={['Für alle Sportler', 'Nov – März']}
          imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuDyEy-z--qKZoTp_kyIFKq9qcnKBrULdY7ONPJkR2FV0Hr1eOd4R1xvT1oA2MvQyBMKBE0ZoNhOVTeYmNGvggusmZWMtTWLuWXp54kZqkLkS_QL0s_pUvWP4AFFoMEufGLs7PTUH0AQ59X_c9OkUjJPqalut2rvDcuB-F8Ug0epRe-c-R2yTCToiujrC7BOvwYVxeKozsiQyt_TqAjv_Tj3CzBJOmRHTBJaL8-NQd5xS4dwjQ52Z5oJUJrMlDkh12FoWtXDiAg7kKo"
          imageAlt="Close-up of a person performing a controlled pilates plank on a mat, emphasizing core alignment and muscle definition in soft focus"
        />
        <BentoSchwerpunkte
          title="Unsere Schwerpunkte"
          featured={[
            { icon: 'bolt', title: 'Kraft & Schnellkraft', description: 'Funktions- und Konditionsgymnastik sowie HIIT steigern Kraft, Kraftausdauer und Dynamik – genau das, was auf der Piste zählt.' },
            { icon: 'fitness_center', title: 'Rumpfstabilität', description: 'Ein stabiler Rumpf ist die Basis für sichere Fahrten. Zirkeltraining und Balanceübungen kräftigen die Körpermitte gezielt.' },
          ]}
          small={[
            { icon: 'accessibility_new', title: 'Beweglichkeit', description: 'Dehnen und Mobilisation verbessern die Bewegungsreichweite – weniger Verletzungsrisiko.' },
            { icon: 'psychology', title: 'Koordination', description: 'Balancematten und reaktive Übungen schulen Gleichgewicht und neuromuskuläre Kontrolle.' },
            { icon: 'favorite', title: 'Ausdauer', description: 'Herz-Kreislauf-Training sorgt für die nötige Kondition, um den ganzen Tag auf der Piste zu stehen.' },
          ]}
        />
        <KonzeptSection
          imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuBpa5zcifDK8y6PJsjpWiY9rv1uUfdgEFSk-5CY_7VeK8xx2jmm0c7Z8wLF8rCt3fQCdBi_Z9EimeH5_HY1wIWsVKdrCstFmWWJW1cMET2hZaF5H-ujOsgzheyfPFNQZ201Wy7jVmKEgFibezni1JZFO4x4oyLXYXGc5hsJgdzQT1wSqgLdbC3qdB67uibnEO3ecolhfk5jSWlqq7xXeh-T7_Q1NHWSHgv5HIiTEsmEb0l8PzgfvyHow7yjZolYuEwNCsjBrkd0_k8"
          imageAlt="Serene person in a modern light-filled studio practicing advanced pilates movements, focusing on form and precision"
          overlayQuote="Mehr Power, weniger Muskelkater – fit in die Saison mit SkiGym."
          paragraphs={[
            'SkiGym läuft von Anfang November bis Ende März – genau in der Zeit, in der Wintersportler ihre Form aufbauen oder erhalten wollen. Der Kurs ist zwar skisportmotorisch ausgerichtet, aber da Skifahren ein Ganzkörpersport ist, profitieren alle davon: mehr Kraft, bessere Koordination, weniger Verletzungsrisiko.',
            'Die optimale Gruppenkonstellation fördert individuelle Entwicklungspotenziale – Werner passt das Training so an, dass sowohl Einsteiger als auch Fortgeschrittene ihren Nutzen ziehen. Neben Körpergewicht kommen Brasils, Stepper, Medizinbälle und Balancematten zum Einsatz.',
          ]}
          blockquote="Wer im November anfängt zu trainieren, fährt im Dezember mit einem ganz anderen Körpergefühl auf die Piste."
        />
        <TrainerCard
          role="Euer Übungsleiter"
          name="Werner Harasta"
          bio={`"Skifahren macht am meisten Spaß, wenn der Körper mitmacht. Mit SkiGym bereite ich euch so vor, dass ihr stark, beweglich und verletzungsfrei in die Saison startet – und auch am letzten Skitag noch Power habt."`}
          skills={['Wintersportmotorik', 'HIIT & Zirkeltraining']}
          imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuBvKIxfVGnG3xqOqFi3wnG8op37KzT9avb5YMJYa7OExTckTxr5MUawdZOh42NX0_B6LA6V3qkRhAAGumVJgCelq5ABsxJEi8cSwmOMsdwgl-Xf46CCiXBXucyUfOTTKN5McoDvcxpz2MbFpgD17rsY1O5U9lk8XaSyMbi4mm8_-e7e0E_gTKLPtGEpZTz6MXTeH_egS6bMQnUu7LsxEdxum5uyC8_rwzB5EHEseKlwbOIGzdIhd9eZaOfqgwWEjmtVoNLQwuyOrjY"
          imageAlt="Porträt von Übungsleiter Werner Harasta"
        />
        <KursCtaSection
          title="Bereit für die Piste?"
          description="SkiGym startet Anfang November – montags um 19 Uhr. Komm einfach vorbei und überzeuge dich selbst, wie viel besser du nach ein paar Einheiten auf den Skiern stehst."
          primaryLabel="Jetzt Anmelden"
          secondaryLabel="Frage stellen"
        />
      </main>
      <SponsorBand sponsors={sponsors} variant="grey" />
      <SiteFooter logoUrl={logoUrl} departmentLabel="SkiGym" variant="light" />
    </div>
  )
}
