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

const MANFIT_NAV = [
  { label: 'ManFit',         href: '#',              active: true },
  { label: 'Trainingszeiten', href: '#trainingszeiten' },
  { label: 'Ansprechpartner', href: '#ansprechpartner' },
  { label: 'Fitness',         href: '../fitness' },
]

export default async function ManFitPage() {
  let logoUrl: string | null = null
  let sponsors: Awaited<ReturnType<typeof fetchSponsors>> = []
  try {
    const config = await fetchClubConfig()
    logoUrl = config.logo_web_pfad ?? config.logo_url ?? null
    if (config.operator_id) sponsors = await fetchSponsors(config.operator_id).catch(() => [])
  } catch { /* fallback */ }

  return (
    <div className="bg-background font-body-md text-on-background">
      <BaseNav logoUrl={logoUrl} clubName="Hünstetten" departmentLabel="ManFit" navItems={MANFIT_NAV} ctaLabel="Jetzt Anmelden" homeHref="../" />
      <main className="pt-20">
        <KursHero
          imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuBYjUo"
          imageAlt="Men doing group gymnastics and functional training in a gym, active and motivated"
          badge="MAN(N) BEWEGT SICH"
          title="ManFit"
          subtitle="Gymnasik und Funktionstraining für Männer – Kraft, Beweglichkeit und Ausdauer in einer Stunde. Für Einsteiger und Erfahrene ab 30 aufwärts."
          primaryCta={{ label: 'Jetzt Anmelden' }}
          secondaryCta={{ label: 'Kursplan ansehen' }}
        />
        <KursInfoGrid
          kurszeit="Dienstags, 18:30 – 19:30 Uhr"
          ort="Gymnastikraum, Sportweg 1, Hünstetten"
          mitzubringen="Sportkleidung, Hallenschuhe, Getränk – und Lust auf Bewegung"
        />
        <ContentSplit
          title="Männersport mit Spaßfaktor"
          paragraphs={[
            'ManFit ist die Männergruppe der SG Hünstetten – speziell für erwachsene und ältere Männer, die fit bleiben oder wieder in Bewegung kommen wollen. Nach einem gründlichen Aufwärmen folgt Funktionsgymnastik mit Körpergewicht und Handgeräten wie Hanteln, Brasils, Therabändern oder Pezzibällen.',
            'Das Training zielt auf Kraft, Beweglichkeit und Koordination sowie die Stärkung des Herz-Kreislaufsystems. Zum Abschluss wartet ein intensives Dehnprogramm mit Entspannung – damit Muskeln regenerieren und du gut in den Abend startest.',
          ]}
          checkItems={['Nur für Männer', 'Reinschnuppern willkommen']}
          imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuDyEy-z--qKZoTp_kyIFKq9qcnKBrULdY7ONPJkR2FV0Hr1eOd4R1xvT1oA2MvQyBMKBE0ZoNhOVTeYmNGvggusmZWMtTWLuWXp54kZqkLkS_QL0s_pUvWP4AFFoMEufGLs7PTUH0AQ59X_c9OkUjJPqalut2rvDcuB-F8Ug0epRe-c-R2yTCToiujrC7BOvwYVxeKozsiQyt_TqAjv_Tj3CzBJOmRHTBJaL8-NQd5xS4dwjQ52Z5oJUJrMlDkh12FoWtXDiAg7kKo"
          imageAlt="Close-up of a person performing a controlled pilates plank on a mat, emphasizing core alignment and muscle definition in soft focus"
        />
        <BentoSchwerpunkte
          title="Unsere Schwerpunkte"
          featured={[
            { icon: 'fitness_center', title: 'Kraft & Ausdauer', description: 'Funktionsgymnastik mit Körpergewicht und Handgeräten – effektiv für Muskelaufbau und Herz-Kreislauf-Gesundheit.' },
            { icon: 'sports_gymnastics', title: 'Koordination & Gleichgewicht', description: 'Gezielte Übungen schulen die neuromuskuläre Koordination – Grundlage für sichere Bewegungen im Alltag und Sport.' },
          ]}
          small={[
            { icon: 'accessibility_new', title: 'Beweglichkeit', description: 'Mobilisation und Dehnung halten Gelenke und Muskeln geschmeidig.' },
            { icon: 'self_improvement', title: 'Dehnung', description: 'Intensives Dehnprogramm am Stundenende für Regeneration und Entspannung.' },
            { icon: 'groups', title: 'Gemeinschaft', description: 'Sport macht mehr Spaß in guter Gesellschaft – die Gruppe motiviert.' },
          ]}
        />
        <KonzeptSection
          imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuBpa5zcifDK8y6PJsjpWiY9rv1uUfdgEFSk-5CY_7VeK8xx2jmm0c7Z8wLF8rCt3fQCdBi_Z9EimeH5_HY1wIWsVKdrCstFmWWJW1cMET2hZaF5H-ujOsgzheyfPFNQZ201Wy7jVmKEgFibezni1JZFO4x4oyLXYXGc5hsJgdzQT1wSqgLdbC3qdB67uibnEO3ecolhfk5jSWlqq7xXeh-T7_Q1NHWSHgv5HIiTEsmEb0l8PzgfvyHow7yjZolYuEwNCsjBrkd0_k8"
          imageAlt="Serene person in a modern light-filled studio practicing advanced pilates movements, focusing on form and precision"
          overlayQuote="Man(n) bewegt sich – und bleibt damit jung, stark und in bester Gesellschaft."
          paragraphs={[
            'ManFit ist die reine Männergruppe der SG Hünstetten – ein Kurs, der Männer jeden Alters dort abholt, wo sie stehen. Nach einem strukturierten Aufwärmen steht Funktionsgymnastik im Mittelpunkt: Übungen mit Hanteln, Brasils, Therabändern und Pezzibällen trainieren Kraft, Koordination und Ausdauer.',
            'Das Konzept ist klar: keine Überlastung, aber echter Trainingseffekt. Jede Stunde schließt mit einem intensiven Dehnprogramm und Entspannung – damit Muskeln regenerieren und du gut in den Abend startest. Und natürlich macht Sport in der Gruppe einfach mehr Spaß.',
          ]}
          blockquote="Einfach mal reinschnuppern – du wirst überrascht sein, wie viel Spaß eine Stunde ManFit macht."
        />
        <TrainerCard
          role="Euer Übungsleiter"
          name="Michael Larisch"
          bio={`"Sport verbindet – und hält jung. In meinem ManFit-Kurs trainieren wir gemeinsam, motivieren uns gegenseitig und haben dabei auch noch eine Menge Spaß. Jeder ist willkommen, egal ob Einsteiger oder alter Hase."`}
          skills={['Funktionstraining', 'Kraft & Koordination']}
          imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuBvKIxfVGnG3xqOqFi3wnG8op37KzT9avb5YMJYa7OExTckTxr5MUawdZOh42NX0_B6LA6V3qkRhAAGumVJgCelq5ABsxJEi8cSwmOMsdwgl-Xf46CCiXBXucyUfOTTKN5McoDvcxpz2MbFpgD17rsY1O5U9lk8XaSyMbi4mm8_-e7e0E_gTKLPtGEpZTz6MXTeH_egS6bMQnUu7LsxEdxum5uyC8_rwzB5EHEseKlwbOIGzdIhd9eZaOfqgwWEjmtVoNLQwuyOrjY"
          imageAlt="Porträt von Trainerin Marianne Schmicking"
        />
        <KursCtaSection
          title="Bereit für dein erstes ManFit-Training?"
          description="Dienstags um 18:30 Uhr geht es los. Schnapp dir deine Hallenschuhe und schau einfach vorbei – reinschnuppern ist jederzeit möglich."
          primaryLabel="Jetzt Anmelden"
          secondaryLabel="Frage stellen"
        />
      </main>
      <SponsorBand sponsors={sponsors} variant="grey" />
      <SiteFooter logoUrl={logoUrl} departmentLabel="ManFit" variant="light" />
    </div>
  )
}
