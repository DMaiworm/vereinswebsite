import BaseNav from '@/components/shared/layout/BaseNav'
import SiteFooter from '@/components/shared/layout/SiteFooter'
import SponsorBand from '@/components/shared/layout/SponsorBand'
import { fetchClubConfig, fetchSponsors } from '@/lib/api'

const ACHTSAMKEIT_NAV = [
  { label: 'Kurse',           href: '#',              active: true },
  { label: 'Trainingszeiten', href: '#trainingszeiten' },
  { label: 'Ansprechpartner', href: '#ansprechpartner' },
  { label: 'Gesundheitssport', href: '../gesundheitssport' },
]

export default async function AchtsamkeitPage() {
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
        departmentLabel="Achtsamkeit & Entspannung"
        navItems={ACHTSAMKEIT_NAV}
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
              alt="Person in ruhiger Meditation in einem hellen, stimmungsvollen Raum mit sanftem Morgenlicht"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDYJzMmOfe4LWHo1KVI47hn1N5gnaL3avUyCIWdClbnTu7qHeuqo0CqS14M1yw4_u9qp9SIPxwmNaCPl1BAxExYbVVdzZu-po69HH5fMvxVqBWDdB15-tY74NulE9KkmCpjdrMvNfSYcDpY6obIAl4ePCdoTYJhQDY4qS1J5_OpqIoK2oCrdWUNT7gBakng1zNZCbtXQv6MLdvzsDUD_suUOoe5wKX1mr-OCCVcZ06mKJgMMsAjSncH7V_THp9ydoxt_potnwYOUU"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent z-10"></div>
          </div>
          <div className="relative z-20 max-w-[1200px] mx-auto px-6 w-full">
            <div className="max-w-2xl text-white">
              <span className="inline-block px-4 py-1 bg-secondary-container text-on-secondary-fixed rounded-full text-label-lg mb-6">EXKLUSIVES PROGRAMM</span>
              <h1 className="text-display-lg font-display-lg mb-4 text-white">Achtsamkeit &amp; Entspannung</h1>
              <p className="text-body-lg mb-8 opacity-90">Im Einklang mit dir und deinem Atem. Entdecke die Kraft der inneren Stille und finde deine Balance im Alltag.</p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-secondary-container text-on-secondary-fixed font-label-lg px-8 py-4 rounded-lg hover:brightness-110 transition-all">Jetzt Anmelden</button>
                <button className="border border-white/40 backdrop-blur-sm text-white font-label-lg px-8 py-4 rounded-lg hover:bg-white/10 transition-all">Kursplan ansehen</button>
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
                <p className="text-on-surface-variant font-body-md">Donnerstags, 19:30 – 20:30 Uhr</p>
              </div>
            </div>
            <div className="bg-white p-8 border border-surface-container-high rounded-xl shadow-sm flex items-start gap-4 transition-all hover:shadow-md">
              <span className="material-symbols-outlined text-primary-container text-3xl">location_on</span>
              <div>
                <h3 className="font-headline-md text-primary-container text-lg">Ort</h3>
                <p className="text-on-surface-variant font-body-md">Sportplatzstraße 12, Hünstetten</p>
              </div>
            </div>
            <div className="bg-white p-8 border border-surface-container-high rounded-xl shadow-sm flex items-start gap-4 transition-all hover:shadow-md">
              <span className="material-symbols-outlined text-primary-container text-3xl">shopping_bag</span>
              <div>
                <h3 className="font-headline-md text-primary-container text-lg">Mitzubringen</h3>
                <p className="text-on-surface-variant font-body-md">Decke, Kissen, Handtuch</p>
              </div>
            </div>
          </div>
        </section>

        {/* Content Split Section */}
        <section className="py-10 max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-headline-lg font-headline-lg text-primary-container mb-6">Innere Balance &amp; Achtsamkeit</h2>
            <div className="space-y-6 text-on-surface-variant text-body-md">
              <p>
                In unseren Achtsamkeitskursen lernen wir, den Moment bewusst wahrzunehmen. Durch gezielte Meditationsübungen und Atemtechniken finden wir zu mehr Ruhe und innerer Ausgeglichenheit – auch im hektischen Alltag.
              </p>
              <p>
                Die Verbindung aus Meditation, Yoga-Elementen und Sinneswahrnehmung schafft einen geschützten Raum für deine persönliche Auszeit. Wir laden jeden ein, unabhängig von Erfahrung oder Vorkenntnissen, diesen Weg gemeinsam zu gehen.
              </p>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-6">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                <span className="font-label-lg">Für alle Erfahrungslevel</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                <span className="font-label-lg">Zertifizierte Kursleiterin</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-[rgba(253,224,0,0.10)] rounded-full blur-3xl"></div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="relative rounded-2xl shadow-xl w-full aspect-[4/3] object-cover"
              alt="Person in ruhiger Meditationshaltung in einem hellen, modernen Raum"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuARiRyM77AztjpXLCGf3Bc2uOodrNjsyCD4vPuMFSuJ5fJlchxilf5pzTOg1U_DmiGB12aA_GfeheJ5S0zRHjPP1PNOm2iTWuIpvg48JkLgoNpbLuUcsFoiKwe37vyoBRpHMs8djYuCP4mUnr572PWkR23VZD_YEAGxYgQ5cOGDBkNJYM0eu4OdJejxDafBtVhiyJvyHOHMtqqF1IwhPc5RtVq9Mhvt-mOEYHd1FNK96B8fO8qUqUfVKpYUFiv1M94adXJFxh_DQn0"
            />
          </div>
        </section>

        {/* Bento Grid: Focus Areas */}
        <section className="py-10 bg-surface-container-low">
          <div className="max-w-[1200px] mx-auto px-6">
            <h2 className="text-headline-lg font-headline-lg text-primary-container mb-8 text-center">Unsere Schwerpunkte</h2>
            <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
              {/* Achtsamkeitsübungen */}
              <div className="md:col-span-3 bg-white p-8 rounded-xl border border-surface-container-high transition-transform hover:-translate-y-1">
                <span className="inline-block p-3 bg-primary-fixed rounded-lg mb-6">
                  <span className="material-symbols-outlined text-primary-container text-3xl">self_improvement</span>
                </span>
                <h3 className="text-headline-md mb-4">Achtsamkeitsübungen</h3>
                <p className="text-on-surface-variant">Geführte Übungen, die helfen, den gegenwärtigen Moment bewusst zu erleben und Gedanken ohne Wertung wahrzunehmen.</p>
              </div>
              {/* Meditation */}
              <div className="md:col-span-3 bg-primary-container text-white p-8 rounded-xl transition-transform hover:-translate-y-1">
                <span className="inline-block p-3 bg-white/10 rounded-lg mb-6">
                  <span className="material-symbols-outlined text-white text-3xl">psychology</span>
                </span>
                <h3 className="text-headline-md mb-4">Meditation</h3>
                <p className="opacity-80">Verschiedene Meditationstechniken für innere Stille, mentale Klarheit und einen erholsamen Ausgleich zum Alltag.</p>
              </div>
              {/* Small Cards */}
              <div className="md:col-span-2 bg-white p-8 rounded-xl border border-surface-container-high transition-transform hover:-translate-y-1">
                <span className="material-symbols-outlined text-primary-container text-3xl mb-4">fitness_center</span>
                <h3 className="text-label-lg uppercase tracking-widest text-primary-container mb-2">Yoga-Elemente</h3>
                <p className="text-on-surface-variant text-sm">Sanfte Bewegungsabfolgen zur Förderung von Flexibilität und Körperbewusstsein.</p>
              </div>
              <div className="md:col-span-2 bg-white p-8 rounded-xl border border-surface-container-high transition-transform hover:-translate-y-1">
                <span className="material-symbols-outlined text-primary-container text-3xl mb-4">air</span>
                <h3 className="text-label-lg uppercase tracking-widest text-primary-container mb-2">Atemübungen</h3>
                <p className="text-on-surface-variant text-sm">Bewusste Atemtechniken als Schlüssel zu Entspannung und innerer Ruhe.</p>
              </div>
              <div className="md:col-span-2 bg-white p-8 rounded-xl border border-surface-container-high transition-transform hover:-translate-y-1">
                <span className="material-symbols-outlined text-primary-container text-3xl mb-4">visibility</span>
                <h3 className="text-label-lg uppercase tracking-widest text-primary-container mb-2">Sinneswahrnehmung</h3>
                <p className="text-on-surface-variant text-sm">Übungen zur Schärfung der Sinne und bewussten Wahrnehmung des eigenen Körpers.</p>
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
                alt="Ruhige Person in einem lichtdurchfluteten Raum bei der Meditation"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDYJzMmOfe4LWHo1KVI47hn1N5gnaL3avUyCIWdClbnTu7qHeuqo0CqS14M1yw4_u9qp9SIPxwmNaCPl1BAxExYbVVdzZu-po69HH5fMvxVqBWDdB15-tY74NulE9KkmCpjdrMvNfSYcDpY6obIAl4ePCdoTYJhQDY4qS1J5_OpqIoK2oCrdWUNT7gBakng1zNZCbtXQv6MLdvzsDUD_suUOoe5wKX1mr-OCCVcZ06mKJgMMsAjSncH7V_THp9ydoxt_potnwYOUU"
              />
              <div className="absolute bottom-6 right-6 bg-white/80 backdrop-blur-md p-6 rounded-xl border border-surface-container-high max-w-xs shadow-lg">
                <p className="text-primary-container font-lexend italic font-semibold text-sm leading-relaxed">&quot;Der Moment ist das einzige, was wir wirklich besitzen.&quot;</p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-headline-lg font-headline-lg text-primary-container mb-8">
                Das <span className="text-on-surface-variant/40 italic">Konzept</span>
              </h2>
              <div className="space-y-6 text-on-surface-variant text-body-lg leading-relaxed">
                <p>
                  Unser Achtsamkeitskonzept verbindet bewährte Meditationstechniken mit modernen Erkenntnissen der Stressforschung. Im Mittelpunkt steht das bewusste Wahrnehmen des gegenwärtigen Moments – ohne Urteile, ohne Erwartungen.
                </p>
                <p>
                  Durch regelmäßige Praxis entwickeln wir die Fähigkeit, auch in stressigen Situationen ruhig und gelassen zu bleiben. Atemübungen, Körperwahrnehmung und stille Meditation ergänzen sich zu einem ganzheitlichen Entspannungsprogramm.
                </p>
                <div className="bg-surface-container-low p-8 rounded-xl border-l-4 border-secondary-container italic font-medium text-primary-container text-body-md">
                  &quot;Wir laden Sie ein, die hektische Außenwelt für eine Stunde hinter sich zu lassen und in die Stille einzutauchen.&quot;
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
                alt="Professionelles Portrait der Kursleiterin"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzLEwQK3DBMWkkbdT8M-sZfmJlZw6Xh4PlhUASPd0SCY3AYm15korwKMVfCy8JPgciPTUyfA_exRp6n3BpB2bgP0XjFLWLuKvf8Ymkd2q0IG4mlXNk6NNKBdXR9PscfTDNGgCflq5xgCahr_Kh4Tizz0l2VmmQPVp487xN6UuHigjmwbGGMRhNuC66LqAtX0Stuj9Fz15m7MpryejuPkQLjlBI-8A0L5zCF_O6_M-OArvOedmJeXFq41F5sQvRj43dXLFA16QInyY"
              />
            </div>
            <div className="text-center md:text-left">
              <span className="text-secondary font-label-lg tracking-widest uppercase">Deine Trainerin</span>
              <h2 className="text-headline-lg font-headline-lg text-primary-container mt-2 mb-4">Andrea Hoffmann</h2>
              <p className="text-on-surface-variant text-body-md mb-6 max-w-xl">
                &quot;Mit über 15 Jahren Erfahrung in der Achtsamkeitspraxis begleite ich Menschen auf ihrem Weg zu mehr innerer Ruhe und Lebensqualität. Jeder Schritt zählt – auch der kleinste.&quot;
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <span className="px-4 py-2 bg-surface-container text-on-surface rounded-full text-label-sm">Achtsamkeits-Coach</span>
                <span className="px-4 py-2 bg-surface-container text-on-surface rounded-full text-label-sm">Entspannungstherapeutin</span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-10 bg-primary-container text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="max-w-[800px] mx-auto px-6 text-center relative z-10">
            <h2 className="text-headline-lg mb-6">Bereit für deine Auszeit?</h2>
            <p className="text-on-primary-container text-body-lg mb-8">
              Sichere dir jetzt einen Platz in unserem nächsten Kurs. Wir freuen uns darauf, dich in der SG Hünstetten begrüßen zu dürfen.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-secondary-container text-on-secondary-fixed font-label-lg px-10 py-5 rounded-lg hover:shadow-xl transition-all">JETZT ZUM PROBETRAINING ANMELDEN</button>
              <button className="border border-white/30 text-white font-label-lg px-10 py-5 rounded-lg hover:bg-white/10 transition-all">AUF WARTELISTE SETZEN</button>
            </div>
            <p className="mt-6 text-on-primary-container text-label-sm opacity-70">Begrenzte Teilnehmerzahl – sichere dir rechtzeitig deinen Platz.</p>
          </div>
        </section>

      </main>

      <SponsorBand sponsors={sponsors} variant="grey" />
      <SiteFooter logoUrl={logoUrl} departmentLabel="Achtsamkeit & Entspannung" variant="light" />

    </div>
  )
}
