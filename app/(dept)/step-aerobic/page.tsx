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


export default async function StepAerobicPage() {
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
        ctaLabel="Jetzt Anmelden"
        ctaHref="#kontakt"
        homeHref="../"
      />
      <main className="pt-20">
        <KursHero
          imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuBYjUo"
          imageAlt="Group doing energetic step aerobics on platforms in a bright fitness studio"
          badge="STEP BY STEP"
          title="Step-Aerobic"
          subtitle="Gelenkschonendes Herz-Kreislauf-Training mit Choreographie und Rhythmus. Kondition, Koordination und Spaß – alles in einer Stunde."
          primaryCta={{ label: 'Jetzt Anmelden' }}
          secondaryCta={{ label: 'Kursplan ansehen' }}
        />
        <KursInfoGrid
          kurszeit="Mittwochs, 20:00 – 21:00 Uhr"
          ort="Gymnastikraum, Sportweg 1, Hünstetten"
          mitzubringen="Sportkleidung, Hallenschuhe, Getränk"
        />
        <ContentSplit
          title="Tanzen, Schwitzen, Strahlen"
          paragraphs={[
            'Step-Aerobic kombiniert aerobisches Ausdauertraining mit dem Rhythmus einer Choreographie. Durch das Auf- und Absteigen der höhenverstellbaren Plattform werden Bein- und Gesäßmuskulatur gezielt gestärkt – gelenkschonend und effektiv.',
            'Ziel jeder Stunde ist es, drei verschiedene Choreographien zu erlernen und am Ende zusammenzuführen. Das schult nicht nur die Koordination, sondern macht auch echten Spaß. Die Gruppe hat mittleres Niveau – Anfänger sind trotzdem herzlich willkommen!',
          ]}
          checkItems={['Mittleres Niveau', 'Anfänger willkommen']}
          imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuDyEy-z--qKZoTp_kyIFKq9qcnKBrULdY7ONPJkR2FV0Hr1eOd4R1xvT1oA2MvQyBMKBE0ZoNhOVTeYmNGvggusmZWMtTWLuWXp54kZqkLkS_QL0s_pUvWP4AFFoMEufGLs7PTUH0AQ59X_c9OkUjJPqalut2rvDcuB-F8Ug0epRe-c-R2yTCToiujrC7BOvwYVxeKozsiQyt_TqAjv_Tj3CzBJOmRHTBJaL8-NQd5xS4dwjQ52Z5oJUJrMlDkh12FoWtXDiAg7kKo"
          imageAlt="Close-up of a person performing a controlled pilates plank on a mat, emphasizing core alignment and muscle definition in soft focus"
        />
        <BentoSchwerpunkte
          title="Unsere Schwerpunkte"
          featured={[
            { icon: 'favorite', title: 'Herz-Kreislauf-Training', description: 'Aerobisches Ausdauertraining auf dem Step – gelenkschonend, effektiv und nachhaltig für Kondition und Herzgesundheit.' },
            { icon: 'music_note', title: 'Choreographie & Rhythmus', description: 'Drei Choreographien pro Stunde – am Ende werden sie zusammengeführt. Tanzen und trainieren in einem, mit Musik und guter Stimmung.' },
          ]}
          small={[
            { icon: 'directions_run', title: 'Beine & Gesäß', description: 'Das Auf- und Absteigen kräftigt gezielt Bein- und Gesäßmuskulatur.' },
            { icon: 'accessibility_new', title: 'Koordination', description: 'Komplexe Bewegungsabfolgen schulen Koordination und Reaktionsvermögen.' },
            { icon: 'bolt', title: 'Rumpfstabilität', description: 'Schnelle Richtungswechsel aktivieren und stabilisieren die gesamte Rückenmuskulatur.' },
          ]}
        />
        <KonzeptSection
          imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuBpa5zcifDK8y6PJsjpWiY9rv1uUfdgEFSk-5CY_7VeK8xx2jmm0c7Z8wLF8rCt3fQCdBi_Z9EimeH5_HY1wIWsVKdrCstFmWWJW1cMET2hZaF5H-ujOsgzheyfPFNQZ201Wy7jVmKEgFibezni1JZFO4x4oyLXYXGc5hsJgdzQT1wSqgLdbC3qdB67uibnEO3ecolhfk5jSWlqq7xXeh-T7_Q1NHWSHgv5HIiTEsmEb0l8PzgfvyHow7yjZolYuEwNCsjBrkd0_k8"
          imageAlt="Serene person in a modern light-filled studio practicing advanced pilates movements, focusing on form and precision"
          overlayQuote="Step by Step – jede Choreographie macht dich stärker, koordinierter und glücklicher."
          paragraphs={[
            'Step-Aerobic arbeitet mit einer höhenverstellbaren Plattform – dem Step. Durch das rhythmische Auf- und Absteigen in verschiedene Richtungen entsteht ein abwechslungsreiches Ganzkörpertraining: Beine, Gesäß und Rumpf werden gestärkt, das Herz-Kreislauf-System auf Touren gebracht.',
            'Pro Stunde werden drei eigenständige Choreographien erarbeitet und am Ende zu einer großen Sequenz zusammengesetzt. Das Niveau der Gruppe ist mittel – wer neu einsteigt, sollte sich kurz vorab bei Bettina melden, damit die Stunde entsprechend aufgebaut werden kann.',
          ]}
          blockquote="Schnupper einfach rein – die Gruppe und Bettina freuen sich auf dich!"
        />
        <TrainerCard
          role="Eure Trainerin"
          name="Bettina Wredenhagen"
          bio={`"Step-Aerobic ist meine Leidenschaft – die Kombination aus Musik, Bewegung und Gemeinschaft macht jede Stunde besonders. Ich freue mich über jeden, der einfach mal reinschaut!"`}
          skills={['Step-Aerobic', 'Ausdauer & Choreographie']}
          imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuBvKIxfVGnG3xqOqFi3wnG8op37KzT9avb5YMJYa7OExTckTxr5MUawdZOh42NX0_B6LA6V3qkRhAAGumVJgCelq5ABsxJEi8cSwmOMsdwgl-Xf46CCiXBXucyUfOTTKN5McoDvcxpz2MbFpgD17rsY1O5U9lk8XaSyMbi4mm8_-e7e0E_gTKLPtGEpZTz6MXTeH_egS6bMQnUu7LsxEdxum5uyC8_rwzB5EHEseKlwbOIGzdIhd9eZaOfqgwWEjmtVoNLQwuyOrjY"
          imageAlt="Porträt von Trainerin Bettina Wredenhagen"
        />
        <KursCtaSection
          title="Bereit für deinen ersten Step?"
          description="Mittwochs um 20 Uhr steht der Step bereit. Melde dich kurz bei Bettina an – damit sie die Stunde optimal auf dich abstimmen kann."
          primaryLabel="Jetzt Anmelden"
          secondaryLabel="Frage stellen"
        />
      </main>
      <SponsorBand sponsors={sponsors} variant="grey" />
      <SiteFooter logoUrl={logoUrl} departmentLabel="Step-Aerobic" variant="light" />
    </div>
  )
}
