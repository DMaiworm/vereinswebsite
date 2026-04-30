import BaseNav from '@/components/shared/layout/BaseNav'
import SiteFooter from '@/components/shared/layout/SiteFooter'
import SponsorBand from '@/components/shared/layout/SponsorBand'
import { fetchClubConfig, fetchSponsors } from '@/lib/api'

const QI_GONG_NAV = [
  { label: 'Qi-Gong',        href: '#',              active: true },
  { label: 'Trainingszeiten', href: '#trainingszeiten' },
  { label: 'Ansprechpartner', href: '#ansprechpartner' },
  { label: 'Gesundheitssport', href: '/gesundheitssport' },
]

export default async function QiGongPage() {
  let logoUrl: string | null = null
  let sponsors: Awaited<ReturnType<typeof fetchSponsors>> = []
  try {
    const config = await fetchClubConfig()
    logoUrl = config.logo_web_pfad ?? config.logo_url ?? null
    if (config.operator_id) sponsors = await fetchSponsors(config.operator_id).catch(() => [])
  } catch { /* fallback */ }

  return (
    <div className="bg-background font-body-md text-on-background">

      {/* Image error fallback */}
      <script dangerouslySetInnerHTML={{ __html: `
        document.addEventListener('DOMContentLoaded', function() {
          document.querySelectorAll('img').forEach(function(img) {
            img.addEventListener('error', function() {
              this.style.background = 'repeating-linear-gradient(45deg,#1a3260 0,#1a3260 2px,#223e6d 2px,#223e6d 14px)';
              this.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
            });
          });
        });
      `}} />

      <BaseNav
        logoUrl={logoUrl}
        clubName="Hünstetten"
        departmentLabel="Qi-Gong"
        navItems={QI_GONG_NAV}
        ctaLabel="Jetzt Anmelden"
        homeHref="/"
      />

      <main className="pt-20">

        {/* Hero Section */}
        <section className="relative h-[716px] min-h-[500px] flex items-center overflow-hidden">
          <div className="absolute inset-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="w-full h-full object-cover relative z-0"
              alt="Serene practitioner performing slow Qi-Gong movements in a sunlit, minimalist studio with warm morning light"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYjUo112Wi-WgPDDK7PADQgcZV3q89r7aad0btl-KJkrzoKZZ5iabaffXVsMRKUc3bRt5mMz1aVEzQQWm0litBpcHQ03eFDUaXtqAPnPOgjYWUgjKshEnW-aKnSY1nYFahGx9YwJQ_UnzmWqtPgsRR6zGfNZyLHA8deTVHOL_iDtz18uv60DUukH_-nIprBpL7RY6xOcrRfoD9qtucerAcwfNEEL2Jhgo0krkVz0ndcUTxqDDnIoMGrPRofTvtJfsp6Mx7gYttDXE"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent z-10"></div>
          </div>
          <div className="relative z-20 max-w-[1200px] mx-auto px-6 w-full">
            <div className="max-w-2xl text-white">
              <span className="inline-block px-4 py-1 bg-secondary-container text-on-secondary-fixed rounded-full text-label-lg mb-6">Qi-Gong &amp; Tai Chi</span>
              <h1 className="text-display-lg font-display-lg mb-4 text-white">Qi-Gong - Die Lebensenergie trainieren</h1>
              <p className="text-body-lg mb-8 opacity-90">Erlerne in entspannter Atmosphäre gesundheitsfördernde Elemente aus dem Qigong und Tai Chi.</p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-secondary-container text-on-secondary-fixed font-label-lg px-8 py-4 rounded-lg hover:brightness-110 transition-all">Jetzt Buchen</button>
                <button className="border border-white/40 backdrop-blur-sm text-white font-label-lg px-8 py-4 rounded-lg hover:bg-white/10 transition-all">Mehr Details</button>
              </div>
            </div>
          </div>
        </section>

        {/* Info Grid (Floating) */}
        <section className="relative z-20 -mt-12 px-6">
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-8 border border-surface-container-high rounded-xl shadow-sm flex items-start gap-4 transition-all hover:shadow-md">
              <span className="material-symbols-outlined text-primary-container text-3xl">schedule</span>
              <div>
                <h3 className="font-headline-md text-primary-container text-lg">Kurszeit</h3>
                <p className="text-on-surface-variant font-body-md">Dienstags, 17:15 – 18:15 Uhr</p>
              </div>
            </div>
            <div className="bg-white p-8 border border-surface-container-high rounded-xl shadow-sm flex items-start gap-4 transition-all hover:shadow-md">
              <span className="material-symbols-outlined text-primary-container text-3xl">location_on</span>
              <div>
                <h3 className="font-headline-md text-primary-container text-lg">Ort</h3>
                <p className="text-on-surface-variant font-body-md">Mehrzweckhalle, Görsroth</p>
              </div>
            </div>
            <div className="bg-white p-8 border border-surface-container-high rounded-xl shadow-sm flex items-start gap-4 transition-all hover:shadow-md">
              <span className="material-symbols-outlined text-primary-container text-3xl">inventory_2</span>
              <div>
                <h3 className="font-headline-md text-primary-container text-lg">Mitzubringen</h3>
                <p className="text-on-surface-variant font-body-md">Bequeme Kleidung, Decke, kleines Kissen, Handtuch</p>
              </div>
            </div>
          </div>
        </section>

        {/* Content Split Section */}
        <section className="py-10 max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-headline-lg font-headline-lg text-primary-container mb-6">Ganzheitliche Bewegung für Körper &amp; Geist</h2>
            <div className="space-y-6 text-on-surface-variant text-body-md">
              <p>
                Qigong und Tai Chi sind jahrtausendealte chinesische Bewegungs- und Meditationspraktiken, die darauf abzielen, die Lebensenergie (Qi) zu kultivieren und harmonisch fließen zu lassen.
              </p>
              <p>
                Durch die sanften Übungen verbessern Sie nachhaltig Ihre Beweglichkeit, Körperhaltung und Atmung. Regelmäßiges Training stärkt das Herz-Kreislauf-, Nerven- und Immunsystem und wirkt präventiv gegen Alltagsstress.
              </p>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-6">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                <span className="font-label-lg">Präventionsgeprüft</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                <span className="font-label-lg">Alle Level willkommen</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-[rgba(253,224,0,0.10)] rounded-full blur-3xl"></div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="relative rounded-2xl shadow-xl w-full aspect-[4/3] object-cover"
              alt="Minimalist Zen garden with smooth stones and a wooden floor, soft afternoon sunlight casting long shadows"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtorHc3E_8Dxrl9jFoY9uK6QEroFmTE4kmawy_h_-Oyp181KZGmc-n2MPL82MggXDWz7aWnHFNVCiJy_hY-kyPwRcjPXMIIZ1RblnGWhr0MENq3Hc-cq1N3ejAeiFcrAO6kUkEx7bzjPy6EZY3_cXlJNLzhEk38S90GueSJowMtlpLCkWLaIugs8L33n0AwdCzU76wBprPPltRz9jqorwtHk8YxRIGlP0ikpGxABrLbqeVyl60QrQenxX9fbfNKsc2dOVLWIAxVpE"
            />
          </div>
        </section>

        {/* Bento Grid: Focus Areas */}
        <section className="py-10 bg-surface-container-low">
          <div className="max-w-[1200px] mx-auto px-6">
            <h2 className="text-headline-lg font-headline-lg text-primary-container mb-8 text-center">Unsere Schwerpunkte</h2>
            <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
              <div className="md:col-span-3 bg-white p-8 rounded-xl border border-surface-container-high transition-transform hover:-translate-y-1">
                <span className="inline-block p-3 bg-primary-fixed rounded-lg mb-6">
                  <span className="material-symbols-outlined text-primary-container text-3xl">self_improvement</span>
                </span>
                <h3 className="text-headline-md mb-4">Achtsamkeit &amp; Entspannung</h3>
                <p className="text-on-surface-variant">Wir integrieren spezifische Konzentrations- und Atemübungen sowie Mobilisierungs- und Lockerungsübungen. Der Fokus liegt auf der bewussten Wahrnehmung des eigenen Körpers.</p>
              </div>
              <div className="md:col-span-3 bg-primary-container text-white p-8 rounded-xl transition-transform hover:-translate-y-1">
                <span className="inline-block p-3 bg-white/10 rounded-lg mb-6">
                  <span className="material-symbols-outlined text-white text-3xl">waves</span>
                </span>
                <h3 className="text-headline-md mb-4">Innere Ruhe</h3>
                <p className="opacity-80">Die Übungen bestehen aus zusammenhängenden, fließenden Bewegungsabläufen, die wie ein sanfter Fluss ineinander übergehen. Diese Meditation in Bewegung fördert die tiefe Gelassenheit.</p>
              </div>
              <div className="md:col-span-2 bg-white p-8 rounded-xl border border-surface-container-high transition-transform hover:-translate-y-1">
                <span className="material-symbols-outlined text-primary-container text-3xl mb-4">check_circle</span>
                <h3 className="text-label-lg uppercase tracking-widest text-primary-container mb-2">Fließende Abläufe</h3>
                <p className="text-on-surface-variant text-sm">Harmonische Bewegungen im Einklang.</p>
              </div>
              <div className="md:col-span-2 bg-white p-8 rounded-xl border border-surface-container-high transition-transform hover:-translate-y-1">
                <span className="material-symbols-outlined text-primary-container text-3xl mb-4">air</span>
                <h3 className="text-label-lg uppercase tracking-widest text-primary-container mb-2">Atemkontrolle</h3>
                <p className="text-on-surface-variant text-sm">Die Atmung als Quelle der Lebensenergie.</p>
              </div>
              <div className="md:col-span-2 bg-white p-8 rounded-xl border border-surface-container-high transition-transform hover:-translate-y-1">
                <span className="material-symbols-outlined text-primary-container text-3xl mb-4">psychology</span>
                <h3 className="text-label-lg uppercase tracking-widest text-primary-container mb-2">Mentale Stärke</h3>
                <p className="text-on-surface-variant text-sm">Fokus und Klarheit für den Alltag.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Das Konzept Section */}
        <section className="py-10 max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-[rgba(253,224,0,0.20)] rounded-3xl -z-10 rotate-6 blur-xl"></div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="rounded-2xl shadow-xl object-cover w-full h-[500px]"
                alt="Close-up of hands in a meditative mudra position, soft focus, high-end minimalist aesthetic"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAG1gZZs9uzPQqXKkH6Q7i_5cLT8rpQ6Nnc2PbSbsaXxc04w5vym6MbCiRUOlRytvOq83jpp3jrc9g8VL3XRb1fQhzX_RAghkhYTwPyEQQa1TM2Hjq_l76m-O2IxXD5nkub2euhL02ptr7ZFCGjdHWLoOx-cHA55XaQiTSXp2zGJuNZhwZqm6TIO_fgrwsczq_RmXw1Kobus-xC7pAkV6tN1AvVCs7QjaiKrKH1xq59xp0Wb5sJQ-EhSYo1EoTr2YzkgvglJYujDOQ"
              />
              <div className="absolute bottom-6 right-6 bg-white/80 backdrop-blur-md p-6 rounded-xl border border-surface-container-high max-w-xs shadow-lg">
                <p className="text-primary-container font-lexend italic font-semibold text-sm leading-relaxed">&quot;Qigong ist die Pflege der Lebensenergie durch bewusste Bewegung und Atmung.&quot;</p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-headline-lg font-headline-lg text-primary-container mb-8">
                Das <span className="text-on-surface-variant/40 italic">Konzept</span>
              </h2>
              <div className="space-y-6 text-on-surface-variant text-body-lg leading-relaxed">
                <p>
                  Unser Qi-Gong-Konzept verbindet traditionelle Weisheit mit modernen Erkenntnissen zur Stressprävention. Im Zentrum steht der freie Fluss des Qi – der Lebensenergie, die durch unsere Meridiane strömt.
                </p>
                <p>
                  Durch die präzise Ausführung der sanften Formen und die bewusste Lenkung der Aufmerksamkeit schalten wir den Parasympathikus ein – das Entspannungssystem unseres Körpers. So regenerieren wir auf tiefer Ebene.
                </p>
                <div className="bg-surface-container-low p-8 rounded-xl border-l-4 border-secondary-container italic font-medium text-primary-container text-body-md">
                  &quot;Wir laden dich ein, Qi-Gong nicht nur als Gymnastik, sondern als Weg zur inneren Meisterschaft und Gesundheit zu erfahren.&quot;
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trainer Section */}
        <section className="py-10 max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-10 items-center bg-white p-6 rounded-2xl border border-surface-container-high">
            <div className="w-48 h-48 rounded-full overflow-hidden flex-shrink-0 border-4 border-secondary-container">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="w-full h-full object-cover"
                alt="Portrait of professional health trainer Matthias Bähr in a clean sports environment, confident and welcoming expression"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzHD9lkY2CINGKxm6nFgjh2NQ9o8QkmzBSfiDFyywHHSDiQa3G1kJAFeddhxfyNk_VrA2RIALbndFprylD8McgGkD1mHhyhNPb0miFzBA8EHJDWsuRQGmKktDdq__22KPpFoz7hya5eh4DuX6YBczWgzpfqDv91eMVq5mOGtYcpxHePN2L3XgkK9ri8eQyIL1D0OYET5CWw-77DDtEY1OFGzOuZa7j3Bc9NezUD4A1DwdKZV_63vkWVfrQCN2jKehYSnejs3OMbqY"
              />
            </div>
            <div className="text-center md:text-left">
              <span className="text-secondary font-label-lg tracking-widest uppercase">Dein Trainer</span>
              <h2 className="text-headline-lg font-headline-lg text-primary-container mt-2 mb-4">Matthias Bähr</h2>
              <p className="text-on-surface-variant text-body-md mb-6 max-w-xl">
                &quot;Matthias begleitet dich mit langjähriger Erfahrung und einer tiefen Leidenschaft für die östlichen Bewegungskünste. Er legt großen Wert auf eine entspannte Atmosphäre, in der jeder Teilnehmer sein eigenes Tempo finden kann.&quot;
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <span className="px-4 py-2 bg-surface-container text-on-surface rounded-full text-label-sm">Gesundheitstrainer</span>
                <span className="px-4 py-2 bg-surface-container text-on-surface rounded-full text-label-sm">Qi-Gong Experte</span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-10 bg-primary-container text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="max-w-[800px] mx-auto px-6 text-center relative z-10">
            <h2 className="text-headline-lg mb-6">Bereit für dein erstes Training?</h2>
            <p className="text-on-primary-container text-body-lg mb-8">
              Sichere dir jetzt einen Platz in unserem nächsten Kurs. Wir freuen uns darauf, dich in der Mehrzweckhalle Görsroth begrüßen zu dürfen.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-secondary-container text-on-secondary-fixed font-label-lg px-10 py-5 rounded-lg hover:shadow-xl transition-all">Kursplatz reservieren</button>
              <button className="border border-white/30 text-white font-label-lg px-10 py-5 rounded-lg hover:bg-white/10 transition-all">Kontakt aufnehmen</button>
            </div>
          </div>
        </section>

      </main>

      <SponsorBand sponsors={sponsors} variant="grey" />
      <SiteFooter logoUrl={logoUrl} departmentLabel="Qi-Gong" variant="light" />

    </div>
  )
}
