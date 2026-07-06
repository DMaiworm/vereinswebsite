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

const TANZFITNESS_NAV = [
  { label: 'Tanzfitness',    href: '#',              active: true },
  { label: 'Trainingszeiten', href: '#trainingszeiten' },
  { label: 'Ansprechpartner', href: '#ansprechpartner' },
  { label: 'Fitness',         href: '../fitness' },
]

export default async function TanzfitnessPage() {
  let logoUrl: string | null = null
  let sponsors: Awaited<ReturnType<typeof fetchSponsors>> = []
  try {
    const config = await fetchClubConfig()
    logoUrl = config.logoWebUrl ?? config.logoUrl ?? null
    sponsors = await fetchSponsors().catch(() => [])
  } catch { /* fallback */ }

  return (
    <div className="bg-background font-body-md text-on-background">
      <BaseNav logoUrl={logoUrl} clubName="Hünstetten" departmentLabel="Tanzfitness" navItems={TANZFITNESS_NAV} ctaLabel="Jetzt Anmelden" homeHref="../" />
      <main className="pt-20">
        <KursHero
          imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuBYjUo"
          imageAlt="People dancing energetically in a fitness class with colorful lighting and great music"
          badge="ÄSTHETIK UND AUSDAUER"
          title="Tanzfitness"
          subtitle="Tanz trifft Training – 60 Minuten Musik, Bewegung und Ganzkörper-Workout. Lateinamerikanische Rhythmen, Pop, Hip Hop und die Hits der 70er, 80er und 90er warten auf dich."
          primaryCta={{ label: 'Jetzt Anmelden' }}
          secondaryCta={{ label: 'Kursplan ansehen' }}
        />
        <KursInfoGrid
          kurszeit="Montags, 18:30 – 20:00 Uhr"
          ort="Sporthalle Görsroth"
          mitzubringen="Sportkleidung, Hallenschuhe, Getränk"
        />
        <ContentSplit
          title="Tanzen und dabei so richtig auspowern"
          paragraphs={[
            'Tanzfitness verbindet die Ästhetik des Tanzes mit der Intensität eines echten Workouts. Du lernst nicht nur einen schönen Hüftschwung – du trainierst dabei auch alle Muskelgruppen und kommst in 60 Minuten richtig aus der Puste. Lateinamerikanische Rhythmen, Pop, Hip Hop und Remix-Klassiker aus den 70ern, 80ern und 90ern sorgen für die Energie.',
            'Die Stunde startet schwungvoll, wechselt zwischen intensiven und ruhigeren Tracks und schließt mit einem Dehnteil zur Regeneration. Probieren geht über Studieren – alle Altersklassen sind herzlich willkommen!',
          ]}
          checkItems={['Alle Altersklassen', 'Keine Vorkenntnisse nötig']}
          imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuDyEy-z--qKZoTp_kyIFKq9qcnKBrULdY7ONPJkR2FV0Hr1eOd4R1xvT1oA2MvQyBMKBE0ZoNhOVTeYmNGvggusmZWMtTWLuWXp54kZqkLkS_QL0s_pUvWP4AFFoMEufGLs7PTUH0AQ59X_c9OkUjJPqalut2rvDcuB-F8Ug0epRe-c-R2yTCToiujrC7BOvwYVxeKozsiQyt_TqAjv_Tj3CzBJOmRHTBJaL8-NQd5xS4dwjQ52Z5oJUJrMlDkh12FoWtXDiAg7kKo"
          imageAlt="Close-up of a person performing a controlled pilates plank on a mat, emphasizing core alignment and muscle definition in soft focus"
        />
        <BentoSchwerpunkte
          title="Unsere Schwerpunkte"
          featured={[
            { icon: 'fitness_center', title: 'Ganzkörper-Workout', description: '60 Minuten Bewegung trainieren alle Muskelgruppen – Arme, Beine, Bauch, Rücken. Tanz als Workout, der sich nie nach Arbeit anfühlt.' },
            { icon: 'music_note', title: 'Musik & Rhythmus', description: 'Latina, Pop, Hip Hop und Remixe der 70er/80er/90er – die Playlist macht den Unterschied und bringt jede Stunde zum Grooven.' },
          ]}
          small={[
            { icon: 'favorite', title: 'Ausdauer', description: 'Intensiver Herz-Kreislauf-Reiz durch 60 Minuten kontinuierliche Bewegung.' },
            { icon: 'accessibility_new', title: 'Ästhetik', description: 'Tänzerische Bewegungen schulen Koordination, Körpergefühl und Eleganz.' },
            { icon: 'self_improvement', title: 'Cool-Down', description: 'Ruhige Musik und Dehnung am Ende regenerieren die Muskulatur sanft.' },
          ]}
        />
        <KonzeptSection
          imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuBpa5zcifDK8y6PJsjpWiY9rv1uUfdgEFSk-5CY_7VeK8xx2jmm0c7Z8wLF8rCt3fQCdBi_Z9EimeH5_HY1wIWsVKdrCstFmWWJW1cMET2hZaF5H-ujOsgzheyfPFNQZ201Wy7jVmKEgFibezni1JZFO4x4oyLXYXGc5hsJgdzQT1wSqgLdbC3qdB67uibnEO3ecolhfk5jSWlqq7xXeh-T7_Q1NHWSHgv5HIiTEsmEb0l8PzgfvyHow7yjZolYuEwNCsjBrkd0_k8"
          imageAlt="Serene person in a modern light-filled studio practicing advanced pilates movements, focusing on form and precision"
          overlayQuote="Für Tanzen ist man nie zu jung oder zu alt – komm einfach vorbei!"
          paragraphs={[
            'Die Stunde startet direkt schwungvoll – und das ist Absicht. Zwischendurch sorgen ruhigere Lieder dafür, dass der Puls nicht dauerhaft im roten Bereich bleibt. So entsteht ein intelligentes Intervalltraining, das Ausdauer und Kraft gleichermaßen fördert, ohne zu überfordern.',
            'Am Ende der Stunde gibt es ruhigere Musik für ein gemeinsames Dehnen zur Muskelregeneration. Das Kursformat ist für alle Altersklassen geeignet – wer Lust auf Bewegung, Musik und Gemeinschaft hat, ist genau richtig.',
          ]}
          blockquote="Probieren geht über Studieren – komm für eine Probestunde einfach vorbei. Wir freuen uns auf dich!"
        />
        <TrainerCard
          role="Eure Trainerin"
          name="Celina Schneider"
          bio={`"Tanzfitness ist meine Leidenschaft – ich möchte, dass jeder spürt, wie viel Spaß Bewegung machen kann. Egal ob Profi oder Einsteiger: In meinem Kurs bist du willkommen und wirst von Anfang an mitgenommen."`}
          skills={['Tanzfitness', 'Ausdauer & Choreographie']}
          imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuBvKIxfVGnG3xqOqFi3wnG8op37KzT9avb5YMJYa7OExTckTxr5MUawdZOh42NX0_B6LA6V3qkRhAAGumVJgCelq5ABsxJEi8cSwmOMsdwgl-Xf46CCiXBXucyUfOTTKN5McoDvcxpz2MbFpgD17rsY1O5U9lk8XaSyMbi4mm8_-e7e0E_gTKLPtGEpZTz6MXTeH_egS6bMQnUu7LsxEdxum5uyC8_rwzB5EHEseKlwbOIGzdIhd9eZaOfqgwWEjmtVoNLQwuyOrjY"
          imageAlt="Porträt von Trainerin Celina Schneider"
        />
        <KursCtaSection
          title="Bereit, die Tanzfläche zu rocken?"
          description="Montags ab 18:30 Uhr in der Sporthalle Görsroth. Schnapp dir deine Hallenschuhe und komm einfach zur Probestunde – keine Anmeldung nötig."
          primaryLabel="Jetzt Anmelden"
          secondaryLabel="Frage stellen"
        />
      </main>
      <SponsorBand sponsors={sponsors} variant="grey" />
      <SiteFooter logoUrl={logoUrl} departmentLabel="Tanzfitness" variant="light" />
    </div>
  )
}
