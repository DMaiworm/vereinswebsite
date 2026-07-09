import BaseNav from '@/components/shared/layout/BaseNav'
import SiteFooter from '@/components/shared/layout/SiteFooter'
import SponsorBand from '@/components/shared/layout/SponsorBand'
import { fetchClubConfig, fetchSponsors, fetchAbteilung } from '@/lib/api'

const GESUNDHEITSSPORT_ID = '86f116c6-a406-4453-a63c-aca715a8c78e'
const TEAM_SHORT_NAME     = 'Qi-Gong'
import KursHero from '@/components/shared/sections/KursHero'
import KursInfoGrid from '@/components/shared/sections/KursInfoGrid'
import ContentSplit from '@/components/shared/sections/ContentSplit'
import BentoSchwerpunkte from '@/components/shared/sections/BentoSchwerpunkte'
import KonzeptSection from '@/components/shared/sections/KonzeptSection'
import TrainerCard from '@/components/shared/sections/TrainerCard'
import KursCtaSection from '@/components/shared/sections/KursCtaSection'

const QI_GONG_NAV = [
  { label: 'Qi-Gong',        href: '#',              active: true },
  { label: 'Trainingszeiten', href: '#trainingszeiten' },
  { label: 'Ansprechpartner', href: '#ansprechpartner' },
  { label: 'Gesundheitssport', href: '../gesundheitssport' },
]

export default async function QiGongPage() {
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
        departmentLabel="Qi-Gong"
        navItems={QI_GONG_NAV}
        ctaLabel="Jetzt Anmelden"
        ctaHref="#kontakt"
        homeHref="../"
        parentDepartment={{
          label: 'Gesundheitssport',
          href: '../gesundheitssport',
          siblings: [
            { label: 'Achtsamkeit & Entspannung', href: '../achtsamkeit' },
            { label: 'Pilates & BodyART', href: '../pilates' },
            { label: 'Rücken-Fit', href: '../rueckenfit' },
          ],
        }}
      />
      <main className="pt-20">
        <KursHero
          imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuBYjUo112Wi-WgPDDK7PADQgcZV3q89r7aad0btl-KJkrzoKZZ5iabaffXVsMRKUc3bRt5mMz1aVEzQQWm0litBpcHQ03eFDUaXtqAPnPOgjYWUgjKshEnW-aKnSY1nYFahGx9YwJQ_UnzmWqtPgsRR6zGfNZyLHA8deTVHOL_iDtz18uv60DUukH_-nIprBpL7RY6xOcrRfoD9qtucerAcwfNEEL2Jhgo0krkVz0ndcUTxqDDnIoMGrPRofTvtJfsp6Mx7gYttDXE"
          imageAlt="Serene practitioner performing slow Qi-Gong movements in a sunlit, minimalist studio with warm morning light"
          badge={team?.motto ?? 'Qi-Gong & Tai Chi'}
          title={team?.name ?? 'Qi-Gong - Die Lebensenergie trainieren'}
          subtitle={team?.description ?? 'Erlerne in entspannter Atmosphäre gesundheitsfördernde Elemente aus dem Qigong und Tai Chi.'}
          primaryCta={{ label: 'Jetzt Buchen' }}
          secondaryCta={{ label: 'Mehr Details' }}
        />
        <KursInfoGrid
          kurszeit="Dienstags, 17:15 – 18:15 Uhr"
          ort="Mehrzweckhalle, Görsroth"
          mitzubringen="Bequeme Kleidung, Decke, kleines Kissen, Handtuch"
          mitzubringenIcon="inventory_2"
        />
        <ContentSplit
          title="Ganzheitliche Bewegung für Körper & Geist"
          paragraphs={[
            'Qigong und Tai Chi sind jahrtausendealte chinesische Bewegungs- und Meditationspraktiken, die darauf abzielen, die Lebensenergie (Qi) zu kultivieren und harmonisch fließen zu lassen.',
            'Durch die sanften Übungen verbessern Sie nachhaltig Ihre Beweglichkeit, Körperhaltung und Atmung. Regelmäßiges Training stärkt das Herz-Kreislauf-, Nerven- und Immunsystem und wirkt präventiv gegen Alltagsstress.',
          ]}
          checkItems={['Präventionsgeprüft', 'Alle Level willkommen']}
          imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuAtorHc3E_8Dxrl9jFoY9uK6QEroFmTE4kmawy_h_-Oyp181KZGmc-n2MPL82MggXDWz7aWnHFNVCiJy_hY-kyPwRcjPXMIIZ1RblnGWhr0MENq3Hc-cq1N3ejAeiFcrAO6kUkEx7bzjPy6EZY3_cXlJNLzhEk38S90GueSJowMtlpLCkWLaIugs8L33n0AwdCzU76wBprPPltRz9jqorwtHk8YxRIGlP0ikpGxABrLbqeVyl60QrQenxX9fbfNKsc2dOVLWIAxVpE"
          imageAlt="Minimalist Zen garden with smooth stones and a wooden floor, soft afternoon sunlight casting long shadows"
        />
        <BentoSchwerpunkte
          title="Unsere Schwerpunkte"
          featured={[
            { icon: 'self_improvement', title: 'Achtsamkeit & Entspannung', description: 'Wir integrieren spezifische Konzentrations- und Atemübungen sowie Mobilisierungs- und Lockerungsübungen. Der Fokus liegt auf der bewussten Wahrnehmung des eigenen Körpers.' },
            { icon: 'waves', title: 'Innere Ruhe', description: 'Die Übungen bestehen aus zusammenhängenden, fließenden Bewegungsabläufen, die wie ein sanfter Fluss ineinander übergehen. Diese Meditation in Bewegung fördert die tiefe Gelassenheit.' },
          ]}
          small={[
            { icon: 'check_circle', title: 'Fließende Abläufe', description: 'Harmonische Bewegungen im Einklang.' },
            { icon: 'air', title: 'Atemkontrolle', description: 'Die Atmung als Quelle der Lebensenergie.' },
            { icon: 'psychology', title: 'Mentale Stärke', description: 'Fokus und Klarheit für den Alltag.' },
          ]}
        />
        <KonzeptSection
          imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuAG1gZZs9uzPQqXKkH6Q7i_5cLT8rpQ6Nnc2PbSbsaXxc04w5vym6MbCiRUOlRytvOq83jpp3jrc9g8VL3XRb1fQhzX_RAghkhYTwPyEQQa1TM2Hjq_l76m-O2IxXD5nkub2euhL02ptr7ZFCGjdHWLoOx-cHA55XaQiTSXp2zGJuNZhwZqm6TIO_fgrwsczq_RmXw1Kobus-xC7pAkV6tN1AvVCs7QjaiKrKH1xq59xp0Wb5sJQ-EhSYo1EoTr2YzkgvglJYujDOQ"
          imageAlt="Close-up of hands in a meditative mudra position, soft focus, high-end minimalist aesthetic"
          overlayQuote="Qigong ist die Pflege der Lebensenergie durch bewusste Bewegung und Atmung."
          paragraphs={[
            'Unser Qi-Gong-Konzept verbindet traditionelle Weisheit mit modernen Erkenntnissen zur Stressprävention. Im Zentrum steht der freie Fluss des Qi – der Lebensenergie, die durch unsere Meridiane strömt.',
            'Durch die präzise Ausführung der sanften Formen und die bewusste Lenkung der Aufmerksamkeit schalten wir den Parasympathikus ein – das Entspannungssystem unseres Körpers. So regenerieren wir auf tiefer Ebene.',
          ]}
          blockquote="Wir laden dich ein, Qi-Gong nicht nur als Gymnastik, sondern als Weg zur inneren Meisterschaft und Gesundheit zu erfahren."
        />
        <TrainerCard
          role="Dein Trainer"
          name="Matthias Bähr"
          bio={`"Matthias begleitet dich mit langjähriger Erfahrung und einer tiefen Leidenschaft für die östlichen Bewegungskünste. Er legt großen Wert auf eine entspannte Atmosphäre, in der jeder Teilnehmer sein eigenes Tempo finden kann."`}
          skills={['Gesundheitstrainer', 'Qi-Gong Experte']}
          imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuDzHD9lkY2CINGKxm6nFgjh2NQ9o8QkmzBSfiDFyywHHSDiQa3G1kJAFeddhxfyNk_VrA2RIALbndFprylD8McgGkD1mHhyhNPb0miFzBA8EHJDWsuRQGmKktDdq__22KPpFoz7hya5eh4DuX6YBczWgzpfqDv91eMVq5mOGtYcpxHePN2L3XgkK9ri8eQyIL1D0OYET5CWw-77DDtEY1OFGzOuZa7j3Bc9NezUD4A1DwdKZV_63vkWVfrQCN2jKehYSnejs3OMbqY"
          imageAlt="Portrait of professional health trainer Matthias Bähr in a clean sports environment, confident and welcoming expression"
        />
        <KursCtaSection
          title="Bereit für dein erstes Training?"
          description="Sichere dir jetzt einen Platz in unserem nächsten Kurs. Wir freuen uns darauf, dich in der Mehrzweckhalle Görsroth begrüßen zu dürfen."
          primaryLabel="Kursplatz reservieren"
          secondaryLabel="Kontakt aufnehmen"
        />
      </main>
      <SponsorBand sponsors={sponsors} variant="grey" />
      <SiteFooter logoUrl={logoUrl} departmentLabel="Qi-Gong" variant="light" />
    </div>
  )
}
