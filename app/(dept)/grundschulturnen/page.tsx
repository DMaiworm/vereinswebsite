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

const GRUNDSCHUL_NAV = [
  { label: 'Grundschulturnen', href: '#',               active: true },
  { label: 'Kids in Bewegung', href: '../kids-in-bewegung' },
  { label: 'Früh übt sich',    href: '../fruehuebtsich-1' },
  { label: 'Kinderturnen',     href: '../kinderturnen' },
]

export default async function GrundschulturnenPage() {
  let logoUrl: string | null = null
  let sponsors: Awaited<ReturnType<typeof fetchSponsors>> = []
  try {
    const config = await fetchClubConfig()
    logoUrl = config.logo_web_pfad ?? config.logo_url ?? null
    if (config.operator_id) sponsors = await fetchSponsors(config.operator_id).catch(() => [])
  } catch { /* fallback */ }

  return (
    <div className="bg-background font-body-md text-on-background">
      <BaseNav logoUrl={logoUrl} clubName="Hünstetten" departmentLabel="Grundschulturnen" navItems={GRUNDSCHUL_NAV} ctaLabel="Jetzt Anmelden" homeHref="../" />
      <main className="pt-20">
        <KursHero
          imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuBtn73rZ5diGM1vyNThrLrZ_Auu982bEmOSKvHyPu5ok42CC8Qkp5W9qQeEXYKExY6I3qbFPqDJ9D4k5tmrdNPj3W2sAACb-DJvuPD66lOLu4Tq2BJmw29nHfrHecBN3h1xUrkaJMzmiK72a8EkHtqgraD_I7_uNY9PYRX29JggWDz6ZQW6Ve_smJL1x3dh034Q1HQmT6yKpmCH3Xi_UrgwG8itG4nHN1zhjfJsYdPYzQzGwy7Nb3VjRN_wH8X17v8YyreGZsA54Bs"
          imageAlt="Grundschulkinder beim aktiven Sport und Spiel in der Turnhalle"
          badge="Grundschulkinder 6 – 10J"
          title="Kinder stärken durch Sport, Spiel & Spaß"
          subtitle="Auspowern und Spaß haben mit Gleichaltrigen. Bewegung, Schnelligkeit und Teamgeist – spielerisch und ohne Zwang."
          primaryCta={{ label: 'Jetzt Anmelden' }}
          secondaryCta={{ label: 'Mehr Details' }}
        />
        <KursInfoGrid
          kurszeit="Freitags, 17:30 – 18:30 Uhr"
          ort="Turnhalle, Hünstetten"
          mitzubringen="Sportschuhe, Wasserflasche"
          mitzubringenIcon="sports"
        />
        <ContentSplit
          title="Austoben und Stärken entdecken"
          paragraphs={[
            'Kinder im Grundschulalter sind bewegungsfreudig und lieben den Ausgleich zum Sitzen in der Schule. In diesem Kurs haben sie die Möglichkeit, sich auszutoben und erste Erfahrungen mit gezieltem Körper- und Schnelligkeitstraining zu machen.',
            'Alles spielerisch und ohne Zwang. Kleine Spieleinheiten runden das Bewegungsprogramm ab. Die Möglichkeit, mit Gleichaltrigen Neues zu erlernen und Spaß an Spiel und Bewegung zu haben, wird hier großgeschrieben.',
          ]}
          checkItems={['Spielerisch & altersgerecht', 'Kein Leistungsdruck']}
          imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuCfOznd2Yv2ObRCZnlOojk5zJnAUEUYoClcMnoveh4DKMnAC_jTq_DFgZyMXPqzwWP5Q8HX-pCNzzXlWZJtqvsYhESzph1ab_BpCh03OfxBzDnmb-Cgo2U43KNKZ6O-B8w0mWE2aZhSOyHuO-QAClRXriTyBx17LZeeVMTqdDd6T3DNOisYIi8JmmSqyujS9XDcTBZ_sXRTEyGPa_6OdWSaQ4EurOTLUR2kA5SImSgExEAjEyIjagss_eO2GwlvPrg2nL2LeUk2kQc"
          imageAlt="Kinder beim aktiven Spielen und Bewegen in der Sporthalle"
        />
        <BentoSchwerpunkte
          title="Unsere Schwerpunkte"
          featured={[
            { icon: 'sprint', title: 'Schnelligkeit & Kraft', description: 'Spielerisches Körper- und Schnelligkeitstraining, das Grundlagen für ein aktives Leben legt und Spaß macht.' },
            { icon: 'sports', title: 'Spiel & Spaß', description: 'Spieleinheiten fördern Teamgeist, Fairness und die Freude an gemeinsamer Bewegung mit Gleichaltrigen.' },
          ]}
          small={[
            { icon: 'directions_run', title: 'Ausdauer', description: 'Spielerische Ausdauerübungen für mehr Fitness im Alltag.' },
            { icon: 'emoji_events', title: 'Ohne Leistungsdruck', description: 'Jedes Kind kann sein eigenes Tempo gehen.' },
            { icon: 'group', title: 'Neue Freundschaften', description: 'Gemeinsam Neues entdecken und dabei Gleichaltrige kennenlernen.' },
          ]}
        />
        <KonzeptSection
          imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuARiRyM77AztjpXLCGf3Bc2uOodrNjsyCD4vPuMFSuJ5fJlchxilf5pzTOg1U_DmiGB12aA_GfeheJ5S0zRHjPP1PNOm2iTWuIpvg48JkLgoNpbLuUcsFoiKwe37vyoBRpHMs8djYuCP4mUnr572PWkR23VZD_YEAGxYgQ5cOGDBkNJYM0eu4OdJejxDafBtVhiyJvyHOHMtqqF1IwhPc5RtVq9Mhvt-mOEYHd1FNK96B8fO8qUqUfVKpYUFiv1M94adXJFxh_DQn0"
          imageAlt="Kinder beim gemeinsamen Sporttreiben, voller Energie und Freude"
          overlayQuote="Sport im Grundschulalter legt das Fundament für ein Leben voller Bewegungsfreude."
          paragraphs={[
            'Unser Konzept für Grundschulkinder verbindet gezieltes Bewegungstraining mit dem natürlichen Spieltrieb der Kinder. Im Mittelpunkt steht die Freude an Bewegung – nicht das Ergebnis.',
            'Durch abwechslungsreiche Übungen entwickeln die Kinder Koordination, Schnelligkeit und Ausdauer. Gleichzeitig stärken gemeinsame Spielrunden den Teamgeist und fördern neue Freundschaften.',
          ]}
          blockquote="Wir, Hanna und Inken, freuen uns über jeden neuen Besuch und würden auch dein Kind gerne in unserer nächsten Stunde begrüßen."
        />
        <TrainerCard
          role="Deine Trainerin"
          name="Hanna Stein"
          bio={`Hanna begleitet die Kinder mit viel Energie und Begeisterung. Ihr Ziel ist es, jedem Kind den Spaß an Bewegung zu vermitteln und ein Umfeld zu schaffen, in dem sich alle wohlfühlen. Kontakt: 0176 66611304`}
          skills={['Kindersport', 'Spielpädagogik']}
          imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuCn4VCtKNcltSHmZy8bvxYgltXEW9pu7vIbjiqdXDSbjuNVNCy0IKs14FlfkpNJPt8XjpCVZzsLb0vAFW4kiFe49vr-jDwxqJ4tNFjOTrYtfHu19sv3zn29IGcsw3Lmh0_UBenObByoxTj6uMsVI-Pbido4kyHYdmK8BDLu_BYaigfMIDyCgQWTX3yXG_TzIKVww59Q11BBu-wuR47fYXkMztppo01qMgEF_BtNJed2SRvkiZ721Vk_7E3f2WoQO2V9l0XY7CIX9gg"
          imageAlt="Portrait Trainerin Hanna Stein"
        />
        <TrainerCard
          role="Deine Trainerin"
          name="Inken Bandow"
          bio={`Inken bringt Kreativität und Schwung in jede Stunde. Gemeinsam mit Hanna sorgt sie dafür, dass die Kinder neue Bewegungsformen entdecken und dabei Freundschaften schließen. Kontakt: 0176 24903592`}
          skills={['Kindersport', 'Bewegungspädagogik']}
          imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuBvKIxfVGnG3xqOqFi3wnG8op37KzT9avb5YMJYa7OExTckTxr5MUawdZOh42NX0_B6LA6V3qkRhAAGumVJgCelq5ABsxJEi8cSwmOMsdwgl-Xf46CCiXBXucyUfOTTKN5McoDvcxpz2MbFpgD17rsY1O5U9lk8XaSyMbi4mm8_-e7e0E_gTKLPtGEpZTz6MXTeH_egS6bMQnUu7LsxEdxum5uyC8_rwzB5EHEseKlwbOIGzdIhd9eZaOfqgwWEjmtVoNLQwuyOrjY"
          imageAlt="Portrait Trainerin Inken Bandow"
        />
        <KursCtaSection
          title="Bereit für das nächste Training?"
          description="Sichere dir jetzt einen Platz in unserem nächsten Kurs. Wir freuen uns darauf, dein Kind in der Turnhalle Hünstetten begrüßen zu dürfen."
          primaryLabel="Kursplatz reservieren"
          secondaryLabel="Kontakt aufnehmen"
        />
      </main>
      <SponsorBand sponsors={sponsors} variant="grey" />
      <SiteFooter logoUrl={logoUrl} departmentLabel="Grundschulturnen" variant="light" />
    </div>
  )
}
