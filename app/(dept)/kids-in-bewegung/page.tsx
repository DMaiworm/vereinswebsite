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

const KIDS_NAV = [
  { label: 'Kids in Bewegung', href: '#',               active: true },
  { label: 'Grundschulturnen', href: '../grundschulturnen' },
  { label: 'Früh übt sich',    href: '../fruehuebtsich-1' },
  { label: 'Kinderturnen',     href: '../kinderturnen' },
]

export default async function KidsInBewegungPage() {
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
        departmentLabel="Kids in Bewegung"
        navItems={KIDS_NAV}
        ctaLabel="Jetzt Anmelden"
        ctaHref="#kontakt"
        homeHref="../"
        parentDepartment={{
          label: 'Kinderturnen',
          href: '../kinderturnen',
          siblings: [
            { label: 'Früh übt sich (I)', href: '../fruehuebtsich-1' },
            { label: 'Früh übt sich (II)', href: '../fruehuebtsich-2' },
            { label: 'Grundschulturnen', href: '../grundschulturnen' },
          ],
        }}
      />
      <main className="pt-20">
        <KursHero
          imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuCfOznd2Yv2ObRCZnlOojk5zJnAUEUYoClcMnoveh4DKMnAC_jTq_DFgZyMXPqzwWP5Q8HX-pCNzzXlWZJtqvsYhESzph1ab_BpCh03OfxBzDnmb-Cgo2U43KNKZ6O-B8w0mWE2aZhSOyHuO-QAClRXriTyBx17LZeeVMTqdDd6T3DNOisYIi8JmmSqyujS9XDcTBZ_sXRTEyGPa_6OdWSaQ4EurOTLUR2kA5SImSgExEAjEyIjagss_eO2GwlvPrg2nL2LeUk2kQc"
          imageAlt="Kinder klettern und spielen begeistert in einer bunten Turnhalle"
          badge="Kinder 3 – 6 Jahre"
          title="Kids in Bewegung – Toben, klettern, spielen"
          subtitle="Toben, klettern, spielen – mit Gleichaltrigen. Zwei Gruppen für unterschiedliche Altersgruppen in der Mehrzweckhalle Görsroth."
          primaryCta={{ label: 'Jetzt Anmelden' }}
          secondaryCta={{ label: 'Mehr Details' }}
        />
        <KursInfoGrid
          kurszeit="Dienstags, 15:30 – 16:15 Uhr"
          ort="Mehrzweckhalle, Görsroth"
          mitzubringen="Wasserflasche (kein Glas), Hallenturnschuhe, Sportkleidung"
          groupLabel="Gruppe 1 (ab 3,5 Jahren bis Vorschulalter)"
        />
        <KursInfoGrid
          kurszeit="Mittwochs, 16:45 – 17:30 Uhr"
          ort="Mehrzweckhalle, Görsroth"
          mitzubringen="Wasserflasche (kein Glas), Hallenturnschuhe, Sportkleidung"
          groupLabel="Gruppe 2 (Vorschule bis Ende 1. Klasse)"
        />
        <ContentSplit
          title="Motorik und Koordination spielerisch entwickeln"
          paragraphs={[
            'Kinder ab 3,5 Jahren bis ins frühe Grundschulalter können hier ihre motorischen und sensorischen Fähigkeiten trainieren. Wir bieten ein abwechslungsreiches Repertoire aus Bewegungsbaustellen, Bewegungslandschaften und Bewegungsgeschichten.',
            'Es wird geturnt, geklettert, gespielt und gelacht. Das Team freut sich über Hilfe beim Auf- und Abbau der Stationen.',
          ]}
          checkItems={['Zwei Altersgruppen', 'Teilnehmerzahl begrenzt']}
          imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuARiRyM77AztjpXLCGf3Bc2uOodrNjsyCD4vPuMFSuJ5fJlchxilf5pzTOg1U_DmiGB12aA_GfeheJ5S0zRHjPP1PNOm2iTWuIpvg48JkLgoNpbLuUcsFoiKwe37vyoBRpHMs8djYuCP4mUnr572PWkR23VZD_YEAGxYgQ5cOGDBkNJYM0eu4OdJejxDafBtVhiyJvyHOHMtqqF1IwhPc5RtVq9Mhvt-mOEYHd1FNK96B8fO8qUqUfVKpYUFiv1M94adXJFxh_DQn0"
          imageAlt="Kinder beim Klettern und Balancieren in der Mehrzweckhalle"
        />
        <BentoSchwerpunkte
          title="Unsere Schwerpunkte"
          featured={[
            { icon: 'sports_gymnastics', title: 'Motorik & Koordination', description: 'Klettern, Balancieren und erste koordinative Übungen werden spielerisch vermittelt – an wechselnden Turnstationen und Bewegungslandschaften.' },
            { icon: 'group', title: 'Gemeinschaft', description: 'Kinder lernen in der Gruppe miteinander und voneinander – Fairness, Teamgeist und soziale Kompetenzen werden spielerisch gefördert.' },
          ]}
          small={[
            { icon: 'landscape', title: 'Bewegungslandschaften', description: 'Wechselnde Turnstationen für immer neue Herausforderungen.' },
            { icon: 'auto_stories', title: 'Bewegungsgeschichten', description: 'Fantasievolle Traumreisen, die Kreativität und Bewegung verbinden.' },
            { icon: 'emoji_events', title: 'Ohne Leistungsdruck', description: 'Freude an Bewegung steht im Mittelpunkt – kein Vergleich, kein Druck.' },
          ]}
        />
        <KonzeptSection
          imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuBtn73rZ5diGM1vyNThrLrZ_Auu982bEmOSKvHyPu5ok42CC8Qkp5W9qQeEXYKExY6I3qbFPqDJ9D4k5tmrdNPj3W2sAACb-DJvuPD66lOLu4Tq2BJmw29nHfrHecBN3h1xUrkaJMzmiK72a8EkHtqgraD_I7_uNY9PYRX29JggWDz6ZQW6Ve_smJL1x3dh034Q1HQmT6yKpmCH3Xi_UrgwG8itG4nHN1zhjfJsYdPYzQzGwy7Nb3VjRN_wH8X17v8YyreGZsA54Bs"
          imageAlt="Kinder in einer Bewegungslandschaft, voller Energie und Lachen"
          overlayQuote="Wer als Kind Freude an Bewegung findet, trägt sie ein Leben lang in sich."
          paragraphs={[
            'Unser Konzept verbindet strukturierte Bewegungsangebote mit freiem Spielen. In jeder Stunde bauen wir eine neue Bewegungslandschaft auf – mit Klettergeräten, Balancierbalken und kreativen Stationen.',
            'Traumreisen und Bewegungsgeschichten laden die Fantasie der Kinder ein und verbinden Kreativität mit körperlicher Aktivität. Zwei Gruppen stellen sicher, dass jedes Kind optimal begleitet wird.',
          ]}
          blockquote="Unser Team freut sich über jeden neuen Besuch – und über Hilfe beim Auf- und Abbau der Stationen!"
        />
        <TrainerCard
          role="Gruppe 1 – Trainerin"
          name="Friederike Frömel & Anne Bicanic"
          bio={`Friederike und Anne begleiten eure Kinder (ab 3,5 Jahren bis Vorschulalter) dienstags von 15:30 bis 16:15 Uhr in der Mehrzweckhalle Görsroth. Anmeldung per E-Mail: friederikefroemel@hotmail.com`}
          skills={['Kindersport', 'Bewegungsförderung']}
          imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuCn4VCtKNcltSHmZy8bvxYgltXEW9pu7vIbjiqdXDSbjuNVNCy0IKs14FlfkpNJPt8XjpCVZzsLb0vAFW4kiFe49vr-jDwxqJ4tNFjOTrYtfHu19sv3zn29IGcsw3Lmh0_UBenObByoxTj6uMsVI-Pbido4kyHYdmK8BDLu_BYaigfMIDyCgQWTX3yXG_TzIKVww59Q11BBu-wuR47fYXkMztppo01qMgEF_BtNJed2SRvkiZ721Vk_7E3f2WoQO2V9l0XY7CIX9gg"
          imageAlt="Portrait Trainerin Friederike Frömel"
        />
        <TrainerCard
          role="Gruppe 2 – Trainerin"
          name="Stefanie Specht & Kerstin Hildebrand"
          bio={`Stefanie und Kerstin betreuen Kinder im Vorschul- und frühen Grundschulalter (5–7 Jahre) mittwochs von 16:45 bis 17:30 Uhr in der Mehrzweckhalle Görsroth. Anmeldung per WhatsApp: 0173-4689586`}
          skills={['Kindersport', 'Bewegungsförderung']}
          imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuBvKIxfVGnG3xqOqFi3wnG8op37KzT9avb5YMJYa7OExTckTxr5MUawdZOh42NX0_B6LA6V3qkRhAAGumVJgCelq5ABsxJEi8cSwmOMsdwgl-Xf46CCiXBXucyUfOTTKN5McoDvcxpz2MbFpgD17rsY1O5U9lk8XaSyMbi4mm8_-e7e0E_gTKLPtGEpZTz6MXTeH_egS6bMQnUu7LsxEdxum5uyC8_rwzB5EHEseKlwbOIGzdIhd9eZaOfqgwWEjmtVoNLQwuyOrjY"
          imageAlt="Portrait Trainerin Stefanie Specht"
        />
        <KursCtaSection
          title="Bereit für das erste Abenteuer?"
          description="Sichere dir jetzt einen Platz in einer unserer Gruppen. Wir freuen uns darauf, dein Kind in der Mehrzweckhalle Görsroth begrüßen zu dürfen."
          primaryLabel="Kursplatz reservieren"
          secondaryLabel="Kontakt aufnehmen"
          footnote="Teilnehmerzahl begrenzt – frühzeitig anmelden!"
        />
      </main>
      <SponsorBand sponsors={sponsors} variant="grey" />
      <SiteFooter logoUrl={logoUrl} departmentLabel="Kids in Bewegung" variant="light" />
    </div>
  )
}
