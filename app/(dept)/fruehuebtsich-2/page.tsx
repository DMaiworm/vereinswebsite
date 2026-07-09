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


export default async function FruehUebtSich2Page() {
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
        departmentLabel="Früh übt sich (II)"
        ctaLabel="Jetzt Anmelden"
        ctaHref="#kontakt"
        homeHref="../"
      />
      <main className="pt-20">
        <KursHero
          imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuBkoJ8nO3fnYj2XUWx9v1pq2cpUsdyJZpmlYUguR6cNqb9_151x46croRxDVFqp2V4sQ78wLQx3HpdEkRzo0Gwzj2vtCo-sD-H_HQLRIc9ZyicRJ9H1XMvi5ILo7fwIzY2qUOJ_HfqJa_yan0-nX5tJFsX_2K43aHelVYGb7h18qqqqy9EwCBSdBuCgRwfhnfjtEI2VXQItCUlqDBPuPwPpsVzuEVc4TSE1ToZd8myYtu-9jlAJk73eVJy5Aj8vQoZg3JtPkmow6xU"
          imageAlt="Kleinkind turnt gemeinsam mit Elternteil an Turnstationen"
          badge="Kleinkinder 1,5 – 3J"
          title="Früh übt sich (II) – Gemeinsam turnen"
          subtitle="Gemeinsam turnen mit Mama, Papa oder Omi. Erste Turnversuche an verschiedenen Stationen – spielerisch und ohne Druck."
          primaryCta={{ label: 'Jetzt Anmelden' }}
          secondaryCta={{ label: 'Mehr Details' }}
        />
        <KursInfoGrid
          kurszeit="Montags, 15:15 – 16:15 Uhr"
          ort="Turnhalle, Hünstetten"
          mitzubringen="Bequeme Kleidung, Hallenschuhe (auch für Begleitperson), Getränk"
          mitzubringenIcon="child_care"
        />
        <ContentSplit
          title="Erste Turnversuche im eigenen Tempo"
          paragraphs={[
            'Das Kleinkinderturnen ist ein Angebot für Kinder ab ca. 1,5 bis 3 Jahren, die gemeinsam mit Mama, Papa oder auch Oma und Opa erste Turnversuche starten möchten.',
            'Im Vordergrund stehen freie Bewegung und Spiel an verschiedenen Turnstationen, ganz nach dem individuellen Entwicklungsstand und den persönlichen Fähigkeiten der Kinder. Die Stunde beginnt und endet stets mit einem Singkreis. Geschwisterkinder sind willkommen!',
          ]}
          checkItems={['Spielerisch & ohne Leistungsdruck', 'Geschwisterkinder willkommen']}
          imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuCfOznd2Yv2ObRCZnlOojk5zJnAUEUYoClcMnoveh4DKMnAC_jTq_DFgZyMXPqzwWP5Q8HX-pCNzzXlWZJtqvsYhESzph1ab_BpCh03OfxBzDnmb-Cgo2U43KNKZ6O-B8w0mWE2aZhSOyHuO-QAClRXriTyBx17LZeeVMTqdDd6T3DNOisYIi8JmmSqyujS9XDcTBZ_sXRTEyGPa_6OdWSaQ4EurOTLUR2kA5SImSgExEAjEyIjagss_eO2GwlvPrg2nL2LeUk2kQc"
          imageAlt="Kleinkind erkundet Bewegungslandschaft in der Turnhalle"
        />
        <BentoSchwerpunkte
          title="Unsere Schwerpunkte"
          featured={[
            { icon: 'emoji_people', title: 'Freie Bewegung', description: 'Spiel und Exploration an verschiedenen Turnstationen, angepasst an den Entwicklungsstand des Kindes – ganz in seinem eigenen Tempo.' },
            { icon: 'music_note', title: 'Gemeinschaft & Spaß', description: 'Sing- und Bewegungskreise stärken das Gemeinschaftsgefühl und machen Turnstunden zu einem unvergesslichen Erlebnis für die ganze Familie.' },
          ]}
          small={[
            { icon: 'balance', title: 'Koordination', description: 'Erste Kletterversuche, Balancieren und Springen.' },
            { icon: 'groups', title: 'Soziales Lernen', description: 'Kinder lernen voneinander und miteinander.' },
            { icon: 'child_care', title: 'Individuelle Förderung', description: 'Jedes Kind bestimmt sein eigenes Tempo.' },
          ]}
        />
        <KonzeptSection
          imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuBtn73rZ5diGM1vyNThrLrZ_Auu982bEmOSKvHyPu5ok42CC8Qkp5W9qQeEXYKExY6I3qbFPqDJ9D4k5tmrdNPj3W2sAACb-DJvuPD66lOLu4Tq2BJmw29nHfrHecBN3h1xUrkaJMzmiK72a8EkHtqgraD_I7_uNY9PYRX29JggWDz6ZQW6Ve_smJL1x3dh034Q1HQmT6yKpmCH3Xi_UrgwG8itG4nHN1zhjfJsYdPYzQzGwy7Nb3VjRN_wH8X17v8YyreGZsA54Bs"
          imageAlt="Kleinkinder spielen gemeinsam in einer hellen Turnhalle"
          overlayQuote="Beim Turnen mit Mama und Papa wächst nicht nur das Kind – auch die gemeinsame Freude."
          paragraphs={[
            'Unser Konzept verbindet Bewegungsfreude mit sozialem Lernen. Kinder erkunden spielerisch ihre Möglichkeiten, während Eltern einen wertvollen Austausch miteinander pflegen.',
            'Durch freie Bewegung an wechselnden Turnstationen entwickeln Kinder Koordination, Mut und Selbstvertrauen – stets begleitet und ermutigt durch ihre Bezugsperson.',
          ]}
          blockquote="Wir starten und beenden jede Stunde mit einem Singkreis. Beim Auf- und Abbau der Stationen dürfen alle mit anpacken."
        />
        <TrainerCard
          role="Deine Trainerin"
          name="Carina Faust"
          bio={`Mit ihrer Erfahrung in der frühkindlichen Bewegungsförderung schafft Carina eine offene und herzliche Atmosphäre für Kinder und Eltern. Für Anmeldung und Schnupperstunden meldet euch bitte per WhatsApp: 0178 7820848`}
          skills={['Frühkindliche Bewegungsförderung', 'Eltern-Kind-Turnen']}
          imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuCn4VCtKNcltSHmZy8bvxYgltXEW9pu7vIbjiqdXDSbjuNVNCy0IKs14FlfkpNJPt8XjpCVZzsLb0vAFW4kiFe49vr-jDwxqJ4tNFjOTrYtfHu19sv3zn29IGcsw3Lmh0_UBenObByoxTj6uMsVI-Pbido4kyHYdmK8BDLu_BYaigfMIDyCgQWTX3yXG_TzIKVww59Q11BBu-wuR47fYXkMztppo01qMgEF_BtNJed2SRvkiZ721Vk_7E3f2WoQO2V9l0XY7CIX9gg"
          imageAlt="Portrait Trainerin Carina Faust"
        />
        <KursCtaSection
          title="Bereit für gemeinsames Turnen?"
          description="Sichere dir jetzt einen Platz in unserem nächsten Kurs. Meldet euch gerne für eine Schnupperstunde an – wir freuen uns auf euch!"
          primaryLabel="Kursplatz reservieren"
          secondaryLabel="Kontakt aufnehmen"
        />
      </main>
      <SponsorBand sponsors={sponsors} variant="grey" />
      <SiteFooter logoUrl={logoUrl} departmentLabel="Früh übt sich (II)" variant="light" />
    </div>
  )
}
