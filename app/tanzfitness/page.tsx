import BaseNav from '@/components/shared/layout/BaseNav'
import SiteFooter from '@/components/shared/layout/SiteFooter'
import SponsorBand from '@/components/shared/layout/SponsorBand'
import { fetchClubConfig, fetchSponsors } from '@/lib/api'

const TANZFITNESS_NAV = [
  { label: 'Tanzfitness',    href: '#',              active: true },
  { label: 'Trainingszeiten', href: '#trainingszeiten' },
  { label: 'Ansprechpartner', href: '#ansprechpartner' },
  { label: 'Fitness',         href: '/fitness' },
]

export default async function TanzfitnessPage() {
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
        departmentLabel="Tanzfitness"
        navItems={TANZFITNESS_NAV}
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
              alt="People dancing energetically in a fitness class with colorful lighting and great music"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYjUo"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent z-10"></div>
          </div>
          <div className="relative z-20 max-w-[1200px] mx-auto px-6 w-full">
            <div className="max-w-2xl text-white">
              <span className="inline-block px-4 py-1 bg-secondary-container text-on-secondary-fixed rounded-full text-label-lg mb-6">ÄSTHETIK UND AUSDAUER</span>
              <h1 className="text-display-lg font-display-lg mb-4 text-white">Tanzfitness</h1>
              <p className="text-body-lg mb-8 opacity-90">Tanz trifft Training – 60 Minuten Musik, Bewegung und Ganzkörper-Workout. Lateinamerikanische Rhythmen, Pop, Hip Hop und die Hits der 70er, 80er und 90er warten auf dich.</p>
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
                <p className="text-on-surface-variant font-body-md">Montags, 18:30 – 20:00 Uhr</p>
              </div>
            </div>
            <div className="bg-white p-8 border border-surface-container-high rounded-xl shadow-sm flex items-start gap-4 transition-all hover:shadow-md">
              <span className="material-symbols-outlined text-primary-container text-3xl">location_on</span>
              <div>
                <h3 className="font-headline-md text-primary-container text-lg">Ort</h3>
                <p className="text-on-surface-variant font-body-md">Sporthalle Görsroth</p>
              </div>
            </div>
            <div className="bg-white p-8 border border-surface-container-high rounded-xl shadow-sm flex items-start gap-4 transition-all hover:shadow-md">
              <span className="material-symbols-outlined text-primary-container text-3xl">shopping_bag</span>
              <div>
                <h3 className="font-headline-md text-primary-container text-lg">Mitzubringen</h3>
                <p className="text-on-surface-variant font-body-md">Sportkleidung, Hallenschuhe, Getränk</p>
              </div>
            </div>
          </div>
        </section>

        {/* Content Split Section */}
        <section className="py-10 max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-headline-lg font-headline-lg text-primary-container mb-6">Tanzen und dabei so richtig auspowern</h2>
            <div className="space-y-6 text-on-surface-variant text-body-md">
              <p>
                Tanzfitness verbindet die Ästhetik des Tanzes mit der Intensität eines echten Workouts. Du lernst nicht nur einen schönen Hüftschwung – du trainierst dabei auch alle Muskelgruppen und kommst in 60 Minuten richtig aus der Puste. Lateinamerikanische Rhythmen, Pop, Hip Hop und Remix-Klassiker aus den 70ern, 80ern und 90ern sorgen für die Energie.
              </p>
              <p>
                Die Stunde startet schwungvoll, wechselt zwischen intensiven und ruhigeren Tracks und schließt mit einem Dehnteil zur Regeneration. Probieren geht über Studieren – alle Altersklassen sind herzlich willkommen!
              </p>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-6">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                <span className="font-label-lg">Alle Altersklassen</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                <span className="font-label-lg">Keine Vorkenntnisse nötig</span>
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
              {/* Ganzkörper-Workout */}
              <div className="md:col-span-3 bg-white p-8 rounded-xl border border-surface-container-high transition-transform hover:-translate-y-1">
                <span className="inline-block p-3 bg-primary-fixed rounded-lg mb-6">
                  <span className="material-symbols-outlined text-primary-container text-3xl">fitness_center</span>
                </span>
                <h3 className="text-headline-md mb-4">Ganzkörper-Workout</h3>
                <p className="text-on-surface-variant">60 Minuten Bewegung trainieren alle Muskelgruppen – Arme, Beine, Bauch, Rücken. Tanz als Workout, der sich nie nach Arbeit anfühlt.</p>
              </div>
              {/* Musik & Rhythmus */}
              <div className="md:col-span-3 bg-primary-container text-white p-8 rounded-xl transition-transform hover:-translate-y-1">
                <span className="inline-block p-3 bg-white/10 rounded-lg mb-6">
                  <span className="material-symbols-outlined text-white text-3xl">music_note</span>
                </span>
                <h3 className="text-headline-md mb-4">Musik &amp; Rhythmus</h3>
                <p className="opacity-80">Latina, Pop, Hip Hop und Remixe der 70er/80er/90er – die Playlist macht den Unterschied und bringt jede Stunde zum Grooven.</p>
              </div>
              {/* Small Cards */}
              <div className="md:col-span-2 bg-white p-8 rounded-xl border border-surface-container-high transition-transform hover:-translate-y-1">
                <span className="material-symbols-outlined text-primary-container text-3xl mb-4">favorite</span>
                <h3 className="text-label-lg uppercase tracking-widest text-primary-container mb-2">Ausdauer</h3>
                <p className="text-on-surface-variant text-sm">Intensiver Herz-Kreislauf-Reiz durch 60 Minuten kontinuierliche Bewegung.</p>
              </div>
              <div className="md:col-span-2 bg-white p-8 rounded-xl border border-surface-container-high transition-transform hover:-translate-y-1">
                <span className="material-symbols-outlined text-primary-container text-3xl mb-4">accessibility_new</span>
                <h3 className="text-label-lg uppercase tracking-widest text-primary-container mb-2">Ästhetik</h3>
                <p className="text-on-surface-variant text-sm">Tänzerische Bewegungen schulen Koordination, Körpergefühl und Eleganz.</p>
              </div>
              <div className="md:col-span-2 bg-white p-8 rounded-xl border border-surface-container-high transition-transform hover:-translate-y-1">
                <span className="material-symbols-outlined text-primary-container text-3xl mb-4">self_improvement</span>
                <h3 className="text-label-lg uppercase tracking-widest text-primary-container mb-2">Cool-Down</h3>
                <p className="text-on-surface-variant text-sm">Ruhige Musik und Dehnung am Ende regenerieren die Muskulatur sanft.</p>
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
                <p className="text-primary-container font-lexend italic font-semibold text-sm leading-relaxed">&quot;Für Tanzen ist man nie zu jung oder zu alt – komm einfach vorbei!&quot;</p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-headline-lg font-headline-lg text-primary-container mb-8">
                Das <span className="text-on-surface-variant/40 italic">Konzept</span>
              </h2>
              <div className="space-y-6 text-on-surface-variant text-body-lg leading-relaxed">
                <p>
                  Die Stunde startet direkt schwungvoll – und das ist Absicht. Zwischendurch sorgen ruhigere Lieder dafür, dass der Puls nicht dauerhaft im roten Bereich bleibt. So entsteht ein intelligentes Intervalltraining, das Ausdauer und Kraft gleichermaßen fördert, ohne zu überfordern.
                </p>
                <p>
                  Am Ende der Stunde gibt es ruhigere Musik für ein gemeinsames Dehnen zur Muskelregeneration. Das Kursformat ist für alle Altersklassen geeignet – wer Lust auf Bewegung, Musik und Gemeinschaft hat, ist genau richtig.
                </p>
                <div className="bg-surface-container-low p-8 rounded-xl border-l-4 border-secondary-container italic font-medium text-primary-container text-body-md">
                  &quot;Probieren geht über Studieren – komm für eine Probestunde einfach vorbei. Wir freuen uns auf dich!&quot;
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
                alt="Porträt von Trainerin Celina Schneider"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvKIxfVGnG3xqOqFi3wnG8op37KzT9avb5YMJYa7OExTckTxr5MUawdZOh42NX0_B6LA6V3qkRhAAGumVJgCelq5ABsxJEi8cSwmOMsdwgl-Xf46CCiXBXucyUfOTTKN5McoDvcxpz2MbFpgD17rsY1O5U9lk8XaSyMbi4mm8_-e7e0E_gTKLPtGEpZTz6MXTeH_egS6bMQnUu7LsxEdxum5uyC8_rwzB5EHEseKlwbOIGzdIhd9eZaOfqgwWEjmtVoNLQwuyOrjY"
              />
            </div>
            <div className="text-center md:text-left">
              <span className="text-secondary font-label-lg tracking-widest uppercase">Eure Trainerin</span>
              <h2 className="text-headline-lg font-headline-lg text-primary-container mt-2 mb-4">Celina Schneider</h2>
              <p className="text-on-surface-variant text-body-md mb-6 max-w-xl">
                &quot;Tanzfitness ist meine Leidenschaft – ich möchte, dass jeder spürt, wie viel Spaß Bewegung machen kann. Egal ob Profi oder Einsteiger: In meinem Kurs bist du willkommen und wirst von Anfang an mitgenommen.&quot;
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <span className="px-4 py-2 bg-surface-container text-on-surface rounded-full text-label-sm">Tanzfitness</span>
                <span className="px-4 py-2 bg-surface-container text-on-surface rounded-full text-label-sm">Ausdauer &amp; Choreographie</span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-10 bg-primary-container text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="max-w-[800px] mx-auto px-6 text-center relative z-10">
            <h2 className="text-headline-lg mb-6">Bereit, die Tanzfläche zu rocken?</h2>
            <p className="text-on-primary-container text-body-lg mb-8">
              Montags ab 18:30 Uhr in der Sporthalle Görsroth. Schnapp dir deine Hallenschuhe und komm einfach zur Probestunde – keine Anmeldung nötig.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-secondary-container text-on-secondary-fixed font-label-lg px-10 py-5 rounded-lg hover:shadow-xl transition-all">Jetzt Anmelden</button>
              <button className="border border-white/30 text-white font-label-lg px-10 py-5 rounded-lg hover:bg-white/10 transition-all">Frage stellen</button>
            </div>
          </div>
        </section>

      </main>

      <SponsorBand sponsors={sponsors} variant="grey" />
      <SiteFooter logoUrl={logoUrl} departmentLabel="Tanzfitness" variant="light" />

    </div>
  )
}
