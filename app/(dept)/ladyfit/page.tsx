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

const LADYFIT_NAV = [
  { label: 'LadyFit',       href: '#',              active: true },
  { label: 'Trainingszeiten', href: '#trainingszeiten' },
  { label: 'Ansprechpartner', href: '#ansprechpartner' },
  { label: 'Fitness',         href: '../fitness' },
]

export default async function LadyFitPage() {
  let logoUrl: string | null = null
  let sponsors: Awaited<ReturnType<typeof fetchSponsors>> = []
  try {
    const config = await fetchClubConfig()
    logoUrl = config.logo_web_pfad ?? config.logo_url ?? null
    if (config.operator_id) sponsors = await fetchSponsors(config.operator_id).catch(() => [])
  } catch { /* fallback */ }

  return (
    <div className="bg-background font-body-md text-on-background">
      <BaseNav logoUrl={logoUrl} clubName="Hünstetten" departmentLabel="LadyFit" navItems={LADYFIT_NAV} ctaLabel="Jetzt Anmelden" homeHref="../" />
      <main className="pt-20">
        <KursHero
          imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuBYjUo"
          imageAlt="Women doing LadyFit gymnastics in a bright gym, smiling and exercising together"
          badge="BLEIB IN BEWEGUNG"
          title="LadyFit"
          subtitle="Funktionsgymnastik für Frauen jeden Alters – sanft, effektiv und ganzheitlich. Stärke, Beweglichkeit und Wohlbefinden in einer Stunde."
          primaryCta={{ label: 'Jetzt Anmelden' }}
          secondaryCta={{ label: 'Kursplan ansehen' }}
        />
        <KursInfoGrid
          kurszeit="Dienstags, 10:00 – 11:00 Uhr"
          ort="Gymnastikraum, Sportweg 1, Hünstetten"
          mitzubringen="Bequeme Kleidung, Matte, Handtuch, Getränk"
        />
        <ContentSplit
          title="Bewegung für Frauen jeden Alters"
          paragraphs={[
            'LadyFit vereint Elemente aus Yoga, Wirbelsäulen- und Beckenbodengymnastik zu einem ganzheitlichen Kurs für Frauen. Im Mittelpunkt steht die Stärkung der Rumpfmuskulatur – sanft, aber wirkungsvoll, ohne Gelenke, Sehnen oder Bänder zu überlasten.',
            'Mit Handgeräten und gezielten Übungen verbessern wir Beweglichkeit und Körperhaltung. Entspannungstechniken und Körperwahrnehmungsübungen sorgen dafür, dass du nach jeder Einheit nicht nur stärker, sondern auch ausgeglichener bist.',
          ]}
          checkItems={['Alle Altersgruppen', 'Keine Vorkenntnisse nötig']}
          imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuDyEy-z--qKZoTp_kyIFKq9qcnKBrULdY7ONPJkR2FV0Hr1eOd4R1xvT1oA2MvQyBMKBE0ZoNhOVTeYmNGvggusmZWMtTWLuWXp54kZqkLkS_QL0s_pUvWP4AFFoMEufGLs7PTUH0AQ59X_c9OkUjJPqalut2rvDcuB-F8Ug0epRe-c-R2yTCToiujrC7BOvwYVxeKozsiQyt_TqAjv_Tj3CzBJOmRHTBJaL8-NQd5xS4dwjQ52Z5oJUJrMlDkh12FoWtXDiAg7kKo"
          imageAlt="Close-up of a person performing a controlled pilates plank on a mat, emphasizing core alignment and muscle definition in soft focus"
        />
        <BentoSchwerpunkte
          title="Unsere Schwerpunkte"
          featured={[
            { icon: 'fitness_center', title: 'Funktionsgymnastik', description: 'Gezielte Kräftigung der Rumpfmuskulatur – sanft und gelenkschonend. Ideal für alle Altersgruppen ohne Vorkenntnisse.' },
            { icon: 'self_improvement', title: 'Wirbelsäule & Beckenboden', description: 'Spezielle Übungen aus Yoga und Wirbelsäulengymnastik stärken die Körpermitte und fördern eine gesunde Haltung.' },
          ]}
          small={[
            { icon: 'accessibility_new', title: 'Körperhaltung', description: 'Beweglichkeit und aufrechte Haltung durch gezielte Mobilisation.' },
            { icon: 'spa', title: 'Entspannung', description: 'Entspannungstechniken am Ende jeder Einheit für Körper und Geist.' },
            { icon: 'psychology', title: 'Körperwahrnehmung', description: 'Spüre deinen Körper bewusster – Übungen für mehr Achtsamkeit im Alltag.' },
          ]}
        />
        <KonzeptSection
          imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuBpa5zcifDK8y6PJsjpWiY9rv1uUfdgEFSk-5CY_7VeK8xx2jmm0c7Z8wLF8rCt3fQCdBi_Z9EimeH5_HY1wIWsVKdrCstFmWWJW1cMET2hZaF5H-ujOsgzheyfPFNQZ201Wy7jVmKEgFibezni1JZFO4x4oyLXYXGc5hsJgdzQT1wSqgLdbC3qdB67uibnEO3ecolhfk5jSWlqq7xXeh-T7_Q1NHWSHgv5HIiTEsmEb0l8PzgfvyHow7yjZolYuEwNCsjBrkd0_k8"
          imageAlt="Serene person in a modern light-filled studio practicing advanced pilates movements, focusing on form and precision"
          overlayQuote="Bewegung ist das beste Mittel gegen das Alter – für Körper und Geist."
          paragraphs={[
            'LadyFit ist speziell für Frauen konzipiert und verbindet bewährte Elemente aus Yoga, Wirbelsäulen- und Beckenbodengymnastik zu einem abwechslungsreichen Kurs. Handgeräte wie Bälle, Therabänder und Ringe machen die Übungen effektiver und abwechslungsreicher.',
            'Das Konzept setzt auf schonende, gelenkfreundliche Bewegungen – ohne Überlastung von Gelenken, Sehnen und Bändern. Jede Stunde endet mit einer Entspannungsphase, die Körperwahrnehmung schult und nachhaltig für mehr Wohlbefinden im Alltag sorgt.',
          ]}
          blockquote="Wer rastet, der rostet – aber wer sich mit Freude bewegt, bleibt jung. LadyFit ist deine Stunde nur für dich."
        />
        <TrainerCard
          role="Eure Trainerin"
          name="Marianne Schmicking"
          bio={`"Bewegung macht Freude – das möchte ich jeder Frau vermitteln. In meinem LadyFit-Kurs ist jede willkommen, egal welches Alter oder Fitnesslevel. Gemeinsam bleiben wir fit und aktiv."`}
          skills={['Funktionsgymnastik', 'Yoga & Entspannung']}
          imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuBvKIxfVGnG3xqOqFi3wnG8op37KzT9avb5YMJYa7OExTckTxr5MUawdZOh42NX0_B6LA6V3qkRhAAGumVJgCelq5ABsxJEi8cSwmOMsdwgl-Xf46CCiXBXucyUfOTTKN5McoDvcxpz2MbFpgD17rsY1O5U9lk8XaSyMbi4mm8_-e7e0E_gTKLPtGEpZTz6MXTeH_egS6bMQnUu7LsxEdxum5uyC8_rwzB5EHEseKlwbOIGzdIhd9eZaOfqgwWEjmtVoNLQwuyOrjY"
          imageAlt="Porträt von Trainerin Marianne Schmicking"
        />
        <KursCtaSection
          title="Bereit für dein erstes LadyFit-Training?"
          description="Dienstags um 10 Uhr ist deine Stunde. Schnapp dir deine Matte und komm einfach vorbei – keine Voranmeldung nötig beim Schnuppern."
          primaryLabel="Jetzt Anmelden"
          secondaryLabel="Frage stellen"
        />
      </main>
      <SponsorBand sponsors={sponsors} variant="grey" />
      <SiteFooter logoUrl={logoUrl} departmentLabel="LadyFit" variant="light" />
    </div>
  )
}
