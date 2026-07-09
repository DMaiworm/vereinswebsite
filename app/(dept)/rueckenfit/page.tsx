import BaseNav from '@/components/shared/layout/BaseNav'
import SiteFooter from '@/components/shared/layout/SiteFooter'
import SponsorBand from '@/components/shared/layout/SponsorBand'
import { fetchClubConfig, fetchSponsors, fetchAbteilung } from '@/lib/api'

const GESUNDHEITSSPORT_ID = '86f116c6-a406-4453-a63c-aca715a8c78e'
const TEAM_SHORT_NAME     = 'Rücken'
import KursHero from '@/components/shared/sections/KursHero'
import KursInfoGrid from '@/components/shared/sections/KursInfoGrid'
import ContentSplit from '@/components/shared/sections/ContentSplit'
import BentoSchwerpunkte from '@/components/shared/sections/BentoSchwerpunkte'
import KonzeptSection from '@/components/shared/sections/KonzeptSection'
import TrainerCard from '@/components/shared/sections/TrainerCard'
import KursCtaSection from '@/components/shared/sections/KursCtaSection'


export default async function RueckenfitPage() {
  let logoUrl: string | null = null
  let sponsors: Awaited<ReturnType<typeof fetchSponsors>> = []
  let team: Awaited<ReturnType<typeof fetchAbteilung>>['mannschaften'][number] | undefined
  try {
    const config = await fetchClubConfig()
    logoUrl = config.logoWebUrl ?? config.logoUrl ?? null
    sponsors = await fetchSponsors().catch(() => [])
  } catch { /* fallback */ }
  try {
    const abteilung = await fetchAbteilung(GESUNDHEITSSPORT_ID)
    team = abteilung.mannschaften.find(m => m.shortName === TEAM_SHORT_NAME)
  } catch { /* fallback */ }

  return (
    <div className="bg-background font-body-md text-on-background">
      <BaseNav
        logoUrl={logoUrl}
        clubName="Hünstetten"
        departmentLabel="Rücken-Fit"
        ctaLabel="Jetzt Anmelden"
        ctaHref="#kontakt"
        homeHref="../"
      />
      <main className="pt-20">
        <KursHero
          imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuAxLauj7FyXKC3HaAG8ceccFJ27k9kVQtDgjQna6J7rHxyaQiPTstSigPgrN-JiWo3h24wvJelfsAMYFxDdD91a-CCNHVcYTmzk7nNkBleLmivbD5nUXTdznOk9gr9J0VyA_cJfCgTFzVDQbfY_DctXqBBKDzcPzntaSWSJ4Jy7h_gADXL4YwWNLlhWvQu4fqGqcZ3eezPoDMpNvW8gHy1tCZUPknGbUM9dmfafpwcpy6XrGYuwieec3rjLdHKoayaENpvc3c6TREQ"
          imageAlt="Controlled back exercises being performed on a mat in a bright, modern fitness studio"
          badge={team?.motto ?? 'Vanguard Wellness Division'}
          title={team?.name ?? 'Rücken? Fit!'}
          subtitle={team?.description ?? 'Mobil und beweglich – ein Leben lang. Ganz getreu nach dem Motto: Rücken – Ich doch nicht!'}
          primaryCta={{ label: 'Kursplatz Sichern' }}
          secondaryCta={{ label: 'Kursplan ansehen' }}
        />
        <KursInfoGrid
          kurszeit="Mittwochs, 18:45 – 19:45 Uhr"
          ort="Gymnasium Hünstetten"
          mitzubringen="Eigene Fitnessmatte, Thera-Bänder, Brasils & Balance-Pads, Trinkflasche & Handtuch"
          mitzubringenIcon="fitness_center"
        />
        <ContentSplit
          title="Bewegung als Lebensqualität"
          paragraphs={[
            'Nadja Stalla leitet diesen präventiven Kurs mit Schwerpunkt Haltung und Bewegung. In einer Zeit, in der wir viel sitzen und uns oft einseitig belasten, ist ein starker Rücken das Fundament für Wohlbefinden.',
            'Unser Ziel ist es, Dysbalancen auszugleichen und die stabilisierende Tiefenmuskulatur zu aktivieren. Durch gezielte Übungen verbessern wir nicht nur die Kraft, sondern auch die Flexibilität und das Körperbewusstsein.',
          ]}
          checkItems={['Präventionsgeprüft', 'Alle Level willkommen']}
          imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuAIBtPcaXq0RBTq-Gsff6FK7Z26LITHpOKNlLZyrVF9gaUtOYO5HB1-6aWdlvHb3HrE732uVzFZOnpH9h_ZE_ObRKF4LKzQfVTjgXf2HA7BNkDGAMJrtUiEzeXfGI6YVqBzrctLy_SVjO27qwr1sjM40KsCtudbAlLgqpwN_HGD31Z27J281R10YcsZCkLjq-ErfzmaLkp42QVRp8GzbGzr1CXYZAOt205XqUNaaI9g3yPCXsoKSHadr_rv5tDnQ7Nd7dpdl3yT8bI"
          imageAlt="Focused athlete performing core stability exercises on a mat for back health"
        />
        <BentoSchwerpunkte
          title="Unsere Schwerpunkte"
          featured={[
            { icon: 'shield', title: 'Prävention', description: 'Vorbeugung von Bandscheibenvorfällen und chronischen Schmerzen durch gezielte Mobilisation.' },
            { icon: 'bolt', title: 'Kraftvoll', description: 'Stärkung der Rumpf- und Core-Muskulatur als Stütze für die Wirbelsäule.' },
          ]}
          small={[
            { icon: 'fitness_center', title: 'Beweglichkeit', description: 'Förderung der Mobilität durch klassische Rückenschule kombiniert mit modernen Elementen.' },
            { icon: 'accessibility_new', title: 'Körperhaltung', description: 'Korrektur von Haltungsfehlern für einen beschwerdefreien Alltag.' },
            { icon: 'self_improvement', title: 'Schmerzfrei', description: 'Nachhaltige Entlastung durch gezielte Tiefenmuskulatur-Aktivierung.' },
          ]}
        />
        <KonzeptSection
          imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuAxLauj7FyXKC3HaAG8ceccFJ27k9kVQtDgjQna6J7rHxyaQiPTstSigPgrN-JiWo3h24wvJelfsAMYFxDdD91a-CCNHVcYTmzk7nNkBleLmivbD5nUXTdznOk9gr9J0VyA_cJfCgTFzVDQbfY_DctXqBBKDzcPzntaSWSJ4Jy7h_gADXL4YwWNLlhWvQu4fqGqcZ3eezPoDMpNvW8gHy1tCZUPknGbUM9dmfafpwcpy6XrGYuwieec3rjLdHKoayaENpvc3c6TREQ"
          imageAlt="Instructor demonstrating therapeutic back strengthening movements"
          overlayQuote="Ein starker Rücken ist die Basis für ein bewegliches Leben."
          paragraphs={[
            'Rücken-Fit bei der SG Hünstetten ist mehr als nur Gymnastik. Wir kombinieren klassische Rückenschule mit modernen funktionellen Elementen, um ein ganzheitliches Training für Ihre Wirbelsäule zu bieten.',
            'Unser Fokus liegt auf der Vorbeugung von Beschwerden durch gezielte Mobilisation und die Stärkung der Rumpf- und Core-Muskulatur als Stütze für den Alltag. Wir korrigieren Haltungsfehler und fördern die langfristige Rückengesundheit.',
          ]}
          blockquote="Wer heute keine Zeit für seine Gesundheit hat, wird später viel Zeit für seine Krankheiten brauchen."
        />
        <TrainerCard
          role="Ihre Trainerin"
          name="Nadja Stalla"
          bio={`"B-Lizenz in Präventionssport - Haltung und Bewegung". Mit langjähriger Erfahrung und fachlicher Expertise begleitet Nadja Sie auf dem Weg zu einem beschwerdefreien Alltag. Ihr Fokus liegt auf der korrekten Ausführung und der individuellen Anpassung der Übungen.`}
          skills={['B-Lizenz Präventionssport', 'Haltung & Bewegung Expertin']}
          imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuCn4VCtKNcltSHmZy8bvxYgltXEW9pu7vIbjiqdXDSbjuNVNCy0IKs14FlfkpNJPt8XjpCVZzsLb0vAFW4kiFe49vr-jDwxqJ4tNFjOTrYtfHu19sv3zn29IGcsw3Lmh0_UBenObByoxTj6uMsVI-Pbido4kyHYdmK8BDLu_BYaigfMIDyCgQWTX3yXG_TzIKVww59Q11BBu-wuR47fYXkMztppo01qMgEF_BtNJed2SRvkiZ721Vk_7E3f2WoQO2V9l0XY7CIX9gg"
          imageAlt="Portrait of trainer Nadja Stalla, professional fitness instructor"
        />
        <KursCtaSection
          title="Bereit für Ihren starken Rücken?"
          description="Sichern Sie sich jetzt einen Platz in unserem nächsten Kurs. Wir freuen uns darauf, Sie in der SG Hünstetten begrüßen zu dürfen."
          primaryLabel="Kursplatz reservieren"
          secondaryLabel="Kontakt aufnehmen"
        />
      </main>
      <SponsorBand sponsors={sponsors} variant="grey" />
      <SiteFooter logoUrl={logoUrl} departmentLabel="Rücken-Fit" variant="light" />
    </div>
  )
}
