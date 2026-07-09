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


export default async function FruehUebtSich1Page() {
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
        departmentLabel="Früh übt sich (I)"
        ctaLabel="Jetzt Anmelden"
        ctaHref="#kontakt"
      />
      <main className="pt-20">
        <KursHero
          imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuARiRyM77AztjpXLCGf3Bc2uOodrNjsyCD4vPuMFSuJ5fJlchxilf5pzTOg1U_DmiGB12aA_GfeheJ5S0zRHjPP1PNOm2iTWuIpvg48JkLgoNpbLuUcsFoiKwe37vyoBRpHMs8djYuCP4mUnr572PWkR23VZD_YEAGxYgQ5cOGDBkNJYM0eu4OdJejxDafBtVhiyJvyHOHMtqqF1IwhPc5RtVq9Mhvt-mOEYHd1FNK96B8fO8qUqUfVKpYUFiv1M94adXJFxh_DQn0"
          imageAlt="Mutter und Baby beim spielerischen Turnen auf einer Matte"
          badge="Kleinkinder 6M – 1,5J"
          title="Früh übt sich (I) – Erste Schritte in Bewegung"
          subtitle="Erste Schritte in Bewegung mit Mama & Papa. Altersgerechte Förderung für die Kleinsten – gemeinsam und spielerisch."
          primaryCta={{ label: 'Jetzt Anmelden' }}
          secondaryCta={{ label: 'Mehr Details' }}
        />
        <KursInfoGrid
          kurszeit="Mittwochs, 15:15 – 16:00 Uhr"
          ort="Turnhalle, Hünstetten"
          mitzubringen="Bequeme Kleidung, Krabbeldecke, Lieblingsschmusetier"
          mitzubringenIcon="child_care"
        />
        <ContentSplit
          title="Bewegung von Anfang an"
          paragraphs={[
            'Schon in der Übergangszeit vom Baby zum Kleinkind fördert altersangemessene Bewegungsförderung die psychosoziale, geistige und motorische Entwicklung des Kindes.',
            'Das gemeinsam mit dem Erwachsenen verbrachte Bewegungsangebot – Lieder singen, Finger- und Schaukelspiele, kindgerechte Materialien – orientiert sich am individuellen Entwicklungsstand und stärkt die Bindung zwischen Kind und Bezugsperson.',
          ]}
          checkItems={['Altersgerecht & spielerisch', 'Eltern-Kind-Erlebnis']}
          imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuBkoJ8nO3fnYj2XUWx9v1pq2cpUsdyJZpmlYUguR6cNqb9_151x46croRxDVFqp2V4sQ78wLQx3HpdEkRzo0Gwzj2vtCo-sD-H_HQLRIc9ZyicRJ9H1XMvi5ILo7fwIzY2qUOJ_HfqJa_yan0-nX5tJFsX_2K43aHelVYGb7h18qqqqy9EwCBSdBuCgRwfhnfjtEI2VXQItCUlqDBPuPwPpsVzuEVc4TSE1ToZd8myYtu-9jlAJk73eVJy5Aj8vQoZg3JtPkmow6xU"
          imageAlt="Baby und Bezugsperson bei gemeinsamen Bewegungsübungen auf der Matte"
        />
        <BentoSchwerpunkte
          title="Unsere Schwerpunkte"
          featured={[
            { icon: 'child_care', title: 'Motorische Entwicklung', description: 'Spielerische Förderung der Grob- und Feinmotorik durch altersgerechte Bewegungsangebote, die sich am individuellen Entwicklungsstand orientieren.' },
            { icon: 'favorite', title: 'Bindungsstärkung', description: 'Gemeinsame Bewegungszeit intensiviert die Beziehung zwischen Kind und Bezugsperson und schafft unvergessliche gemeinsame Momente.' },
          ]}
          small={[
            { icon: 'music_note', title: 'Lieder & Reime', description: 'Finger- und Schaukelspiele mit musikalischer Begleitung.' },
            { icon: 'toys', title: 'Kindgerechte Materialien', description: 'Abwechslungsreiche Spielgeräte nach Entwicklungsstand.' },
            { icon: 'groups', title: 'Elternaustausch', description: 'Raum für vertrauensvollen Austausch unter den Begleitpersonen.' },
          ]}
        />
        <KonzeptSection
          imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuCfOznd2Yv2ObRCZnlOojk5zJnAUEUYoClcMnoveh4DKMnAC_jTq_DFgZyMXPqzwWP5Q8HX-pCNzzXlWZJtqvsYhESzph1ab_BpCh03OfxBzDnmb-Cgo2U43KNKZ6O-B8w0mWE2aZhSOyHuO-QAClRXriTyBx17LZeeVMTqdDd6T3DNOisYIi8JmmSqyujS9XDcTBZ_sXRTEyGPa_6OdWSaQ4EurOTLUR2kA5SImSgExEAjEyIjagss_eO2GwlvPrg2nL2LeUk2kQc"
          imageAlt="Baby erkundet spielerisch Bewegungsangebote in einer hellen Turnhalle"
          overlayQuote="Bewegung ist das erste Fenster, durch das Kinder die Welt entdecken."
          paragraphs={[
            'Unser Konzept für die Jüngsten basiert auf dem Grundsatz, dass jedes Kind seinen eigenen Entwicklungsrhythmus hat. Wir schaffen eine Umgebung, in der Neugier und Entdeckungsfreude im Mittelpunkt stehen.',
            'Gemeinsam mit einer Bezugsperson erlebt das Kind erste Bewegungsabenteuer – durch Lieder, Fingerspiele und kindgerechte Materialien. Der Austausch unter den Eltern ist ein wertvoller zusätzlicher Bestandteil.',
          ]}
          blockquote="Wir laden euch ein, die ersten Bewegungsabenteuer eures Kindes gemeinsam mit uns zu erleben."
        />
        <TrainerCard
          role="Deine Trainerin"
          name="Carina Faust"
          bio={`Carina begleitet die Kleinsten mit viel Geduld und Einfühlungsvermögen. Mit langjähriger Erfahrung in der frühkindlichen Bewegungsförderung schafft sie eine liebevolle Atmosphäre, in der jedes Kind und jede Bezugsperson willkommen ist. Kontakt: 0178 7820848 (WhatsApp)`}
          skills={['Frühkindliche Bewegungsförderung', 'Eltern-Kind-Turnen']}
          imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuCn4VCtKNcltSHmZy8bvxYgltXEW9pu7vIbjiqdXDSbjuNVNCy0IKs14FlfkpNJPt8XjpCVZzsLb0vAFW4kiFe49vr-jDwxqJ4tNFjOTrYtfHu19sv3zn29IGcsw3Lmh0_UBenObByoxTj6uMsVI-Pbido4kyHYdmK8BDLu_BYaigfMIDyCgQWTX3yXG_TzIKVww59Q11BBu-wuR47fYXkMztppo01qMgEF_BtNJed2SRvkiZ721Vk_7E3f2WoQO2V9l0XY7CIX9gg"
          imageAlt="Portrait Trainerin Carina Faust"
        />
        <KursCtaSection
          title="Bereit für die ersten Bewegungsabenteuer?"
          description="Sichere dir jetzt einen Platz in unserem nächsten Kurs. Wir freuen uns darauf, euch in der Turnhalle Hünstetten begrüßen zu dürfen."
          primaryLabel="Kursplatz reservieren"
          secondaryLabel="Kontakt aufnehmen"
        />
      </main>
      <SponsorBand sponsors={sponsors} variant="grey" />
      <SiteFooter logoUrl={logoUrl} departmentLabel="Früh übt sich (I)" variant="light" />
    </div>
  )
}
