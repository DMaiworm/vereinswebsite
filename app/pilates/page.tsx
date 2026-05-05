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

const PILATES_NAV = [
  { label: 'Pilates',   href: '#',           active: true },
  { label: 'BodyART',   href: '#bodyart' },
  { label: 'Yoga',      href: '#yoga' },
  { label: 'Wellness',  href: '#wellness' },
  { label: 'Kursplan',  href: '#kursplan' },
  { label: 'Kontakt',   href: '#kontakt' },
]

export default async function PilatesPage() {
  let logoUrl: string | null = null
  let sponsors: Awaited<ReturnType<typeof fetchSponsors>> = []
  try {
    const config = await fetchClubConfig()
    logoUrl = config.logo_web_pfad ?? config.logo_url ?? null
    if (config.operator_id) sponsors = await fetchSponsors(config.operator_id).catch(() => [])
  } catch { /* fallback */ }

  return (
    <div className="bg-background font-body-md text-on-background">
      <BaseNav logoUrl={logoUrl} clubName="Hünstetten" departmentLabel="Pilates & BodyART" navItems={PILATES_NAV} ctaLabel="Jetzt Buchen" homeHref="/" />
      <main className="pt-20">
        <KursHero
          imageSrc="https://upload.wikimedia.org/wikipedia/commons/9/91/Pilates_01.jpg"
          imageAlt="Woman practicing mindful pilates movements in a bright airy studio with floor-to-ceiling windows and soft morning light"
          badge="MIND & BODY"
          title="Pilates & BodyART"
          subtitle="Kraft, Flexibilität und innere Balance. Erleben Sie die Verbindung von funktionalem Training und bewusster Achtsamkeit."
          primaryCta={{ label: 'Jetzt Buchen' }}
          secondaryCta={{ label: 'Kursplan ansehen' }}
        />
        <KursInfoGrid
          kurszeit="Montags, 18:30 – 19:30 Uhr"
          ort="Gymnastikraum, Sportweg 1, Hünstetten"
          mitzubringen="Bequeme Kleidung, Matte, Handtuch, Getränk"
        />
        <ContentSplit
          title="Ganzheitliche Bewegung für Körper & Geist"
          paragraphs={[
            'In unseren Pilates-Einheiten konzentrieren wir uns auf die Stärkung der tiefliegenden Rumpfmuskulatur. Durch kontrollierte, fließende Bewegungen verbessern wir nicht nur Ihre Körperhaltung, sondern fördern auch eine bewusste Atmung.',
            'BodyART ergänzt diesen Ansatz durch funktionales Training, das auf den Prinzipien von Yin und Yang basiert. Hierbei verbinden wir Kraft, Beweglichkeit und Entspannung zu einer harmonischen Einheit, die Ihren gesamten Körper kräftigt und mobilisiert.',
          ]}
          checkItems={['Präventionsgeprüft', 'Alle Level willkommen']}
          imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuDyEy-z--qKZoTp_kyIFKq9qcnKBrULdY7ONPJkR2FV0Hr1eOd4R1xvT1oA2MvQyBMKBE0ZoNhOVTeYmNGvggusmZWMtTWLuWXp54kZqkLkS_QL0s_pUvWP4AFFoMEufGLs7PTUH0AQ59X_c9OkUjJPqalut2rvDcuB-F8Ug0epRe-c-R2yTCToiujrC7BOvwYVxeKozsiQyt_TqAjv_Tj3CzBJOmRHTBJaL8-NQd5xS4dwjQ52Z5oJUJrMlDkh12FoWtXDiAg7kKo"
          imageAlt="Close-up of a person performing a controlled pilates plank on a mat, emphasizing core alignment and muscle definition in soft focus"
        />
        <BentoSchwerpunkte
          title="Unsere Schwerpunkte"
          featured={[
            { icon: 'fitness_center', title: 'Core Training', description: 'Das "Powerhouse" steht im Mittelpunkt. Gezielte Übungen für Bauch, Rücken und Beckenboden schaffen Stabilität von innen heraus.' },
            { icon: 'waves', title: 'Flow Movements', description: 'Fließende Bewegungsabfolgen aus dem BodyART fördern die Dynamik und verbinden Kraft mit Geschmeidigkeit.' },
          ]}
          small={[
            { icon: 'self_improvement', title: 'Flexibility', description: 'Mobilitätssteigerung durch dynamisches Dehnen.' },
            { icon: 'air', title: 'Breathing', description: 'Die bewusste Atmung als Taktgeber für jede Bewegung.' },
            { icon: 'balance', title: 'Balance', description: 'Mentale und physische Ausgeglichenheit finden.' },
          ]}
        />
        <KonzeptSection
          imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuBpa5zcifDK8y6PJsjpWiY9rv1uUfdgEFSk-5CY_7VeK8xx2jmm0c7Z8wLF8rCt3fQCdBi_Z9EimeH5_HY1wIWsVKdrCstFmWWJW1cMET2hZaF5H-ujOsgzheyfPFNQZ201Wy7jVmKEgFibezni1JZFO4x4oyLXYXGc5hsJgdzQT1wSqgLdbC3qdB67uibnEO3ecolhfk5jSWlqq7xXeh-T7_Q1NHWSHgv5HIiTEsmEb0l8PzgfvyHow7yjZolYuEwNCsjBrkd0_k8"
          imageAlt="Serene person in a modern light-filled studio practicing advanced pilates movements, focusing on form and precision"
          overlayQuote="Pilates ist die Kunst der bewussten Kontrolle über den eigenen Körper."
          paragraphs={[
            'Unser Pilates-Konzept basiert auf den fünf Säulen der klassischen Methode, interpretiert für den modernen Alltag. Im Zentrum steht die Zentrierung (Core) – die Kraft aus der Mitte, die uns Stabilität verleiht.',
            'Durch Kontrolle und Präzision in jeder Ausführung minimieren wir das Verletzungsrisiko und maximieren den Trainingseffekt. Die Verbindung mit einer tiefen, bewussten Atmung und fließenden Bewegungsabfolgen (Flow) schafft eine Synergie, die den Körper kräftigt und den Geist klärt.',
          ]}
          blockquote="Wir laden dich ein, Pilates nicht nur als Workout, sondern als ganzheitliche Methode zu erfahren, die Kraft, Beweglichkeit und mentale Fokus vereint."
        />
        <TrainerCard
          role="Eure Trainerin"
          name="Bettina Wredenhagen"
          bio={`"Meine Leidenschaft ist es, Menschen dabei zu unterstützen, ihre eigene Mitte zu finden. Mit einer Kombination aus Pilates und BodyART begleite ich euch auf dem Weg zu mehr Kraft und innerer Ruhe."`}
          skills={['Zertifizierte Pilates-Trainerin', 'BodyART Instructor']}
          imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuBvKIxfVGnG3xqOqFi3wnG8op37KzT9avb5YMJYa7OExTckTxr5MUawdZOh42NX0_B6LA6V3qkRhAAGumVJgCelq5ABsxJEi8cSwmOMsdwgl-Xf46CCiXBXucyUfOTTKN5McoDvcxpz2MbFpgD17rsY1O5U9lk8XaSyMbi4mm8_-e7e0E_gTKLPtGEpZTz6MXTeH_egS6bMQnUu7LsxEdxum5uyC8_rwzB5EHEseKlwbOIGzdIhd9eZaOfqgwWEjmtVoNLQwuyOrjY"
          imageAlt="Professional portrait of trainer Bettina Wredenhagen, smiling, dressed in high-quality sports gear, natural studio lighting"
        />
        <KursCtaSection
          title="Bereit für dein erstes Training?"
          description="Sichere dir jetzt einen Platz in unserem nächsten Kurs. Wir freuen uns darauf, dich in der SG Hünstetten begrüßen zu dürfen."
          primaryLabel="Kursplatz reservieren"
          secondaryLabel="Frage stellen"
        />
      </main>
      <SponsorBand sponsors={sponsors} variant="grey" />
      <SiteFooter logoUrl={logoUrl} departmentLabel="Pilates & BodyART" variant="light" />
    </div>
  )
}
