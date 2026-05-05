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

const WORKOUT_NAV = [
  { label: 'Workout',        href: '#',              active: true },
  { label: 'Trainingszeiten', href: '#trainingszeiten' },
  { label: 'Ansprechpartner', href: '#ansprechpartner' },
  { label: 'Fitness',         href: '../fitness' },
]

export default async function WorkoutPage() {
  let logoUrl: string | null = null
  let sponsors: Awaited<ReturnType<typeof fetchSponsors>> = []
  try {
    const config = await fetchClubConfig()
    logoUrl = config.logo_web_pfad ?? config.logo_url ?? null
    if (config.operator_id) sponsors = await fetchSponsors(config.operator_id).catch(() => [])
  } catch { /* fallback */ }

  return (
    <div className="bg-background font-body-md text-on-background">
      <BaseNav logoUrl={logoUrl} clubName="Hünstetten" departmentLabel="Workout" navItems={WORKOUT_NAV} ctaLabel="Jetzt Anmelden" homeHref="/" />
      <main className="pt-20">
        <KursHero
          imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuBYjUo"
          imageAlt="Person doing bodyweight workout exercises in a gym, motivated and energetic"
          badge="AUSPOWERN & SPASS HABEN"
          title="Workout"
          subtitle="Ausdauer, Kraft und gute Musik – alles mit dem eigenen Körpergewicht. Für alle, die Lust auf Bewegung haben, egal wie alt oder fit."
          primaryCta={{ label: 'Jetzt Anmelden' }}
          secondaryCta={{ label: 'Kursplan ansehen' }}
        />
        <KursInfoGrid
          kurszeit="Dienstags, 19:00 – 20:00 Uhr"
          ort="Gymnastikraum, Sportweg 1, Hünstetten"
          mitzubringen="Sportkleidung, Handtuch, Getränk"
        />
        <ContentSplit
          title="Gemeinsam auspowern – mit Spaß"
          paragraphs={[
            'Beim Workout geht es darum, Ausdauer und Kraft aufzubauen – und dabei richtig Spaß zu haben. Alle Übungen werden mit dem eigenen Körpergewicht durchgeführt, kein Equipment nötig. Irina erklärt alles im Training, sodass du ohne Vorkenntnisse direkt einsteigen kannst.',
            'Motivierende Musik treibt die Gruppe an, das Miteinander motiviert noch mehr. Egal wie alt oder fit du bist – Hauptsache, du hast Lust auf Bewegung. Am Ende jeder Stunde zählt das Gefühl, wirklich etwas geleistet zu haben.',
          ]}
          checkItems={['Alle Altersgruppen', 'Keine Vorkenntnisse nötig']}
          imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuDyEy-z--qKZoTp_kyIFKq9qcnKBrULdY7ONPJkR2FV0Hr1eOd4R1xvT1oA2MvQyBMKBE0ZoNhOVTeYmNGvggusmZWMtTWLuWXp54kZqkLkS_QL0s_pUvWP4AFFoMEufGLs7PTUH0AQ59X_c9OkUjJPqalut2rvDcuB-F8Ug0epRe-c-R2yTCToiujrC7BOvwYVxeKozsiQyt_TqAjv_Tj3CzBJOmRHTBJaL8-NQd5xS4dwjQ52Z5oJUJrMlDkh12FoWtXDiAg7kKo"
          imageAlt="Close-up of a person performing a controlled pilates plank on a mat, emphasizing core alignment and muscle definition in soft focus"
        />
        <BentoSchwerpunkte
          title="Unsere Schwerpunkte"
          featured={[
            { icon: 'fitness_center', title: 'Kraft mit Körpergewicht', description: 'Alle Übungen nutzen das eigene Körpergewicht – kein Equipment, kein Schnickschnack. Effektiv, funktional und überall umsetzbar.' },
            { icon: 'favorite', title: 'Ausdauer & Kondition', description: '60 Minuten Bewegung zur motivierenden Musik trainieren Herz-Kreislauf-System und Grundlagenausdauer nachhaltig.' },
          ]}
          small={[
            { icon: 'groups', title: 'Gemeinschaft', description: 'Die Gruppe motiviert – gemeinsam kommt man weiter als alleine.' },
            { icon: 'music_note', title: 'Musik', description: 'Motivierende Beats halten das Tempo hoch und machen jede Einheit zum Erlebnis.' },
            { icon: 'emoji_people', title: 'Für alle', description: 'Egal wie fit – Irina passt die Übungen an, damit jeder mitkommt.' },
          ]}
        />
        <KonzeptSection
          imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuBpa5zcifDK8y6PJsjpWiY9rv1uUfdgEFSk-5CY_7VeK8xx2jmm0c7Z8wLF8rCt3fQCdBi_Z9EimeH5_HY1wIWsVKdrCstFmWWJW1cMET2hZaF5H-ujOsgzheyfPFNQZ201Wy7jVmKEgFibezni1JZFO4x4oyLXYXGc5hsJgdzQT1wSqgLdbC3qdB67uibnEO3ecolhfk5jSWlqq7xXeh-T7_Q1NHWSHgv5HIiTEsmEb0l8PzgfvyHow7yjZolYuEwNCsjBrkd0_k8"
          imageAlt="Serene person in a modern light-filled studio practicing advanced pilates movements, focusing on form and precision"
          overlayQuote="Am Ende geht es darum, dass du mit Spaß dich bewegt hast!"
          paragraphs={[
            'Das Workout-Konzept ist simpel und effektiv: alle Übungen mit dem eigenen Körpergewicht, zur motivierenden Musik, in guter Gesellschaft. Irina erklärt alles direkt im Training – du brauchst keine Vorkenntnisse, um sofort mitmachen zu können.',
            'Wer zur Probestunde möchte, meldet sich kurz bei Irina und nennt den gewünschten Termin. So kann sie die Stunde optimal vorbereiten und dich von Anfang an mitnehmen. Dienstags ab 19 Uhr – eine Stunde, die sich lohnt.',
          ]}
          blockquote="Schau doch einfach mal zu einem Probetraining vorbei – meld dich kurz vorab und schon kann es losgehen!"
        />
        <TrainerCard
          role="Eure Trainerin"
          name="Irina Djurganina"
          bio={`"Mir ist wichtig, dass sich jeder in meinem Kurs wohlfühlt und mit einem guten Gefühl nach Hause geht. Spaß an der Bewegung steht für mich immer an erster Stelle – der Rest kommt von alleine."`}
          skills={['Bodyweight Training', 'Kraft & Ausdauer']}
          imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuBvKIxfVGnG3xqOqFi3wnG8op37KzT9avb5YMJYa7OExTckTxr5MUawdZOh42NX0_B6LA6V3qkRhAAGumVJgCelq5ABsxJEi8cSwmOMsdwgl-Xf46CCiXBXucyUfOTTKN5McoDvcxpz2MbFpgD17rsY1O5U9lk8XaSyMbi4mm8_-e7e0E_gTKLPtGEpZTz6MXTeH_egS6bMQnUu7LsxEdxum5uyC8_rwzB5EHEseKlwbOIGzdIhd9eZaOfqgwWEjmtVoNLQwuyOrjY"
          imageAlt="Porträt von Trainerin Irina Djurganina"
        />
        <KursCtaSection
          title="Bereit für dein erstes Workout?"
          description="Dienstags ab 19 Uhr. Melde dich kurz bei Irina mit deinem Wunschtermin – und dann geht es los!"
          primaryLabel="Jetzt Anmelden"
          secondaryLabel="Frage stellen"
        />
      </main>
      <SponsorBand sponsors={sponsors} variant="grey" />
      <SiteFooter logoUrl={logoUrl} departmentLabel="Workout" variant="light" />
    </div>
  )
}
