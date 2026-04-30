import BaseNav from '@/components/shared/layout/BaseNav'
import SiteFooter from '@/components/shared/layout/SiteFooter'
import SponsorBand from '@/components/shared/layout/SponsorBand'
import { fetchClubConfig, fetchSponsors } from '@/lib/api'

const MANFIT_NAV = [
  { label: 'ManFit',         href: '#',              active: true },
  { label: 'Trainingszeiten', href: '#trainingszeiten' },
  { label: 'Ansprechpartner', href: '#ansprechpartner' },
  { label: 'Fitness',         href: '../fitness' },
]

export default async function ManFitPage() {
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
        departmentLabel="ManFit"
        navItems={MANFIT_NAV}
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
              alt="Men doing group gymnastics and functional training in a gym, active and motivated"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYjUo"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent z-10"></div>
          </div>
          <div className="relative z-20 max-w-[1200px] mx-auto px-6 w-full">
            <div className="max-w-2xl text-white">
              <span className="inline-block px-4 py-1 bg-secondary-container text-on-secondary-fixed rounded-full text-label-lg mb-6">MAN(N) BEWEGT SICH</span>
              <h1 className="text-display-lg font-display-lg mb-4 text-white">ManFit</h1>
              <p className="text-body-lg mb-8 opacity-90">Gymnasik und Funktionstraining für Männer – Kraft, Beweglichkeit und Ausdauer in einer Stunde. Für Einsteiger und Erfahrene ab 30 aufwärts.</p>
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
                <p className="text-on-surface-variant font-body-md">Dienstags, 18:30 – 19:30 Uhr</p>
              </div>
            </div>
            <div className="bg-white p-8 border border-surface-container-high rounded-xl shadow-sm flex items-start gap-4 transition-all hover:shadow-md">
              <span className="material-symbols-outlined text-primary-container text-3xl">location_on</span>
              <div>
                <h3 className="font-headline-md text-primary-container text-lg">Ort</h3>
                <p className="text-on-surface-variant font-body-md">Gymnastikraum, Sportweg 1, Hünstetten</p>
              </div>
            </div>
            <div className="bg-white p-8 border border-surface-container-high rounded-xl shadow-sm flex items-start gap-4 transition-all hover:shadow-md">
              <span className="material-symbols-outlined text-primary-container text-3xl">shopping_bag</span>
              <div>
                <h3 className="font-headline-md text-primary-container text-lg">Mitzubringen</h3>
                <p className="text-on-surface-variant font-body-md">Sportkleidung, Hallenschuhe, Getränk – und Lust auf Bewegung</p>
              </div>
            </div>
          </div>
        </section>

        {/* Content Split Section */}
        <section className="py-10 max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-headline-lg font-headline-lg text-primary-container mb-6">Männersport mit Spaßfaktor</h2>
            <div className="space-y-6 text-on-surface-variant text-body-md">
              <p>
                ManFit ist die Männergruppe der SG Hünstetten – speziell für erwachsene und ältere Männer, die fit bleiben oder wieder in Bewegung kommen wollen. Nach einem gründlichen Aufwärmen folgt Funktionsgymnastik mit Körpergewicht und Handgeräten wie Hanteln, Brasils, Therabändern oder Pezzibällen.
              </p>
              <p>
                Das Training zielt auf Kraft, Beweglichkeit und Koordination sowie die Stärkung des Herz-Kreislaufsystems. Zum Abschluss wartet ein intensives Dehnprogramm mit Entspannung – damit du die Woche mit einem guten Körpergefühl startest.
              </p>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-6">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                <span className="font-label-lg">Nur für Männer</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                <span className="font-label-lg">Reinschnuppern willkommen</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-[rgba(253,224,0,0.10)] rounded-full blur-3xl"></div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="relative rounded-2xl shadow-xl w-full aspect-[4/3] object-cover"
              alt="Close-up of a person performing a controlled pilates plank on a mat, emphasizing core alignment and muscle definition in soft focus"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyEy-z--qKZoTp_kyIFKq9qcnKBrULdY7ONPJkR2FV0Hr1eOd4R1xvT1oA2MvQyBMKBE0ZoNhOVTeYmNGvggusmZWMtTWLuWXp54kZqkLkS_QL0s_pUvWP4AFFoMEufGLs7PTUH0AQ59X_c9OkUjJPqalut2rvDcuB-F8Ug0epRe-c-R2yTCToiujrC7BOvwYVxeKozsiQyt_TqAjv_Tj3CzBJOmRHTBJaL8-NQd5xS4dwjQ52Z5oJUJrMlDkh12FoWtXDiAg7kKo"
            />
          </div>
        </section>

        {/* Bento Grid: Focus Areas */}
        <section className="py-10 bg-surface-container-low">
          <div className="max-w-[1200px] mx-auto px-6">
            <h2 className="text-headline-lg font-headline-lg text-primary-container mb-8 text-center">Unsere Schwerpunkte</h2>
            <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
              {/* Kraft & Ausdauer */}
              <div className="md:col-span-3 bg-white p-8 rounded-xl border border-surface-container-high transition-transform hover:-translate-y-1">
                <span className="inline-block p-3 bg-primary-fixed rounded-lg mb-6">
                  <span className="material-symbols-outlined text-primary-container text-3xl">fitness_center</span>
                </span>
                <h3 className="text-headline-md mb-4">Kraft &amp; Ausdauer</h3>
                <p className="text-on-surface-variant">Funktionsgymnastik mit Körpergewicht und Handgeräten – effektiv für Muskelaufbau und Herz-Kreislauf-Gesundheit.</p>
              </div>
              {/* Koordination */}
              <div className="md:col-span-3 bg-primary-container text-white p-8 rounded-xl transition-transform hover:-translate-y-1">
                <span className="inline-block p-3 bg-white/10 rounded-lg mb-6">
                  <span className="material-symbols-outlined text-white text-3xl">sports_gymnastics</span>
                </span>
                <h3 className="text-headline-md mb-4">Koordination &amp; Gleichgewicht</h3>
                <p className="opacity-80">Gezielte Übungen schulen die neuromuskuläre Koordination – Grundlage für sichere Bewegungen im Alltag und Sport.</p>
              </div>
              {/* Small Cards */}
              <div className="md:col-span-2 bg-white p-8 rounded-xl border border-surface-container-high transition-transform hover:-translate-y-1">
                <span className="material-symbols-outlined text-primary-container text-3xl mb-4">accessibility_new</span>
                <h3 className="text-label-lg uppercase tracking-widest text-primary-container mb-2">Beweglichkeit</h3>
                <p className="text-on-surface-variant text-sm">Mobilisation und Dehnung halten Gelenke und Muskeln geschmeidig.</p>
              </div>
              <div className="md:col-span-2 bg-white p-8 rounded-xl border border-surface-container-high transition-transform hover:-translate-y-1">
                <span className="material-symbols-outlined text-primary-container text-3xl mb-4">self_improvement</span>
                <h3 className="text-label-lg uppercase tracking-widest text-primary-container mb-2">Dehnung</h3>
                <p className="text-on-surface-variant text-sm">Intensives Dehnprogramm am Stundenende für Regeneration und Entspannung.</p>
              </div>
              <div className="md:col-span-2 bg-white p-8 rounded-xl border border-surface-container-high transition-transform hover:-translate-y-1">
                <span className="material-symbols-outlined text-primary-container text-3xl mb-4">groups</span>
                <h3 className="text-label-lg uppercase tracking-widest text-primary-container mb-2">Gemeinschaft</h3>
                <p className="text-on-surface-variant text-sm">Sport macht mehr Spaß in guter Gesellschaft – die Gruppe motiviert.</p>
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
                alt="Serene person in a modern light-filled studio practicing advanced pilates movements, focusing on form and precision"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBpa5zcifDK8y6PJsjpWiY9rv1uUfdgEFSk-5CY_7VeK8xx2jmm0c7Z8wLF8rCt3fQCdBi_Z9EimeH5_HY1wIWsVKdrCstFmWWJW1cMET2hZaF5H-ujOsgzheyfPFNQZ201Wy7jVmKEgFibezni1JZFO4x4oyLXYXGc5hsJgdzQT1wSqgLdbC3qdB67uibnEO3ecolhfk5jSWlqq7xXeh-T7_Q1NHWSHgv5HIiTEsmEb0l8PzgfvyHow7yjZolYuEwNCsjBrkd0_k8"
              />
              <div className="absolute bottom-6 right-6 bg-white/80 backdrop-blur-md p-6 rounded-xl border border-surface-container-high max-w-xs shadow-lg">
                <p className="text-primary-container font-lexend italic font-semibold text-sm leading-relaxed">&quot;Man(n) bewegt sich – und bleibt damit jung, stark und in bester Gesellschaft.&quot;</p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-headline-lg font-headline-lg text-primary-container mb-8">
                Das <span className="text-on-surface-variant/40 italic">Konzept</span>
              </h2>
              <div className="space-y-6 text-on-surface-variant text-body-lg leading-relaxed">
                <p>
                  ManFit ist die reine Männergruppe der SG Hünstetten – ein Kurs, der Männer jeden Alters dort abholt, wo sie stehen. Nach einem strukturierten Aufwärmen steht Funktionsgymnastik im Mittelpunkt: Übungen mit Hanteln, Brasils, Therabändern und Pezzibällen trainieren Kraft, Koordination und Ausdauer.
                </p>
                <p>
                  Das Konzept ist klar: keine Überlastung, aber echter Trainingseffekt. Jede Stunde schließt mit einem intensiven Dehnprogramm und Entspannung – damit Muskeln regenerieren und du gut in den Abend startest. Und natürlich macht Sport in der Gruppe einfach mehr Spaß.
                </p>
                <div className="bg-surface-container-low p-8 rounded-xl border-l-4 border-secondary-container italic font-medium text-primary-container text-body-md">
                  &quot;Einfach mal reinschnuppern – du wirst überrascht sein, wie viel Spaß eine Stunde ManFit macht.&quot;
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
                alt="Porträt von Trainerin Marianne Schmicking"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvKIxfVGnG3xqOqFi3wnG8op37KzT9avb5YMJYa7OExTckTxr5MUawdZOh42NX0_B6LA6V3qkRhAAGumVJgCelq5ABsxJEi8cSwmOMsdwgl-Xf46CCiXBXucyUfOTTKN5McoDvcxpz2MbFpgD17rsY1O5U9lk8XaSyMbi4mm8_-e7e0E_gTKLPtGEpZTz6MXTeH_egS6bMQnUu7LsxEdxum5uyC8_rwzB5EHEseKlwbOIGzdIhd9eZaOfqgwWEjmtVoNLQwuyOrjY"
              />
            </div>
            <div className="text-center md:text-left">
              <span className="text-secondary font-label-lg tracking-widest uppercase">Euer Übungsleiter</span>
              <h2 className="text-headline-lg font-headline-lg text-primary-container mt-2 mb-4">Michael Larisch</h2>
              <p className="text-on-surface-variant text-body-md mb-6 max-w-xl">
                &quot;Sport verbindet – und hält jung. In meinem ManFit-Kurs trainieren wir gemeinsam, motivieren uns gegenseitig und haben dabei auch noch eine Menge Spaß. Jeder ist willkommen, egal ob Einsteiger oder alter Hase.&quot;
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <span className="px-4 py-2 bg-surface-container text-on-surface rounded-full text-label-sm">Funktionstraining</span>
                <span className="px-4 py-2 bg-surface-container text-on-surface rounded-full text-label-sm">Kraft &amp; Koordination</span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-10 bg-primary-container text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="max-w-[800px] mx-auto px-6 text-center relative z-10">
            <h2 className="text-headline-lg mb-6">Bereit für dein erstes ManFit-Training?</h2>
            <p className="text-on-primary-container text-body-lg mb-8">
              Dienstags um 18:30 Uhr geht es los. Schnapp dir deine Hallenschuhe und schau einfach vorbei – reinschnuppern ist jederzeit möglich.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-secondary-container text-on-secondary-fixed font-label-lg px-10 py-5 rounded-lg hover:shadow-xl transition-all">Jetzt Anmelden</button>
              <button className="border border-white/30 text-white font-label-lg px-10 py-5 rounded-lg hover:bg-white/10 transition-all">Frage stellen</button>
            </div>
          </div>
        </section>

      </main>

      <SponsorBand sponsors={sponsors} variant="grey" />
      <SiteFooter logoUrl={logoUrl} departmentLabel="ManFit" variant="light" />

    </div>
  )
}
