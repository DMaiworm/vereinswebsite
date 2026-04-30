import BaseNav from '@/components/shared/layout/BaseNav'
import SiteFooter from '@/components/shared/layout/SiteFooter'
import SponsorBand from '@/components/shared/layout/SponsorBand'
import { fetchClubConfig, fetchSponsors } from '@/lib/api'

const LADYFIT_NAV = [
  { label: 'LadyFit',       href: '#',              active: true },
  { label: 'Trainingszeiten', href: '#trainingszeiten' },
  { label: 'Ansprechpartner', href: '#ansprechpartner' },
  { label: 'Fitness',         href: './fitness' },
]

export default async function LadyFitPage() {
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
        departmentLabel="LadyFit"
        navItems={LADYFIT_NAV}
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
              alt="Women doing LadyFit gymnastics in a bright gym, smiling and exercising together"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYjUo"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent z-10"></div>
          </div>
          <div className="relative z-20 max-w-[1200px] mx-auto px-6 w-full">
            <div className="max-w-2xl text-white">
              <span className="inline-block px-4 py-1 bg-secondary-container text-on-secondary-fixed rounded-full text-label-lg mb-6">BLEIB IN BEWEGUNG</span>
              <h1 className="text-display-lg font-display-lg mb-4 text-white">LadyFit</h1>
              <p className="text-body-lg mb-8 opacity-90">Funktionsgymnastik für Frauen jeden Alters – sanft, effektiv und ganzheitlich. Stärke, Beweglichkeit und Wohlbefinden in einer Stunde.</p>
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
                <p className="text-on-surface-variant font-body-md">Dienstags, 10:00 – 11:00 Uhr</p>
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
                <p className="text-on-surface-variant font-body-md">Bequeme Kleidung, Matte, Handtuch, Getränk</p>
              </div>
            </div>
          </div>
        </section>

        {/* Content Split Section */}
        <section className="py-10 max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-headline-lg font-headline-lg text-primary-container mb-6">Bewegung für Frauen jeden Alters</h2>
            <div className="space-y-6 text-on-surface-variant text-body-md">
              <p>
                LadyFit vereint Elemente aus Yoga, Wirbelsäulen- und Beckenbodengymnastik zu einem ganzheitlichen Kurs für Frauen. Im Mittelpunkt steht die Stärkung der Rumpfmuskulatur – sanft, aber wirkungsvoll, ohne Gelenke, Sehnen oder Bänder zu überlasten.
              </p>
              <p>
                Mit Handgeräten und gezielten Übungen verbessern wir Beweglichkeit und Körperhaltung. Entspannungstechniken und Körperwahrnehmungsübungen sorgen dafür, dass du nach jeder Einheit nicht nur stärker, sondern auch ausgeglichener bist.
              </p>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-6">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                <span className="font-label-lg">Alle Altersgruppen</span>
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
              {/* Funktionsgymnastik */}
              <div className="md:col-span-3 bg-white p-8 rounded-xl border border-surface-container-high transition-transform hover:-translate-y-1">
                <span className="inline-block p-3 bg-primary-fixed rounded-lg mb-6">
                  <span className="material-symbols-outlined text-primary-container text-3xl">fitness_center</span>
                </span>
                <h3 className="text-headline-md mb-4">Funktionsgymnastik</h3>
                <p className="text-on-surface-variant">Gezielte Kräftigung der Rumpfmuskulatur – sanft und gelenkschonend. Ideal für alle Altersgruppen ohne Vorkenntnisse.</p>
              </div>
              {/* Wirbelsäule & Beckenboden */}
              <div className="md:col-span-3 bg-primary-container text-white p-8 rounded-xl transition-transform hover:-translate-y-1">
                <span className="inline-block p-3 bg-white/10 rounded-lg mb-6">
                  <span className="material-symbols-outlined text-white text-3xl">self_improvement</span>
                </span>
                <h3 className="text-headline-md mb-4">Wirbelsäule &amp; Beckenboden</h3>
                <p className="opacity-80">Spezielle Übungen aus Yoga und Wirbelsäulengymnastik stärken die Körpermitte und fördern eine gesunde Haltung.</p>
              </div>
              {/* Small Cards */}
              <div className="md:col-span-2 bg-white p-8 rounded-xl border border-surface-container-high transition-transform hover:-translate-y-1">
                <span className="material-symbols-outlined text-primary-container text-3xl mb-4">accessibility_new</span>
                <h3 className="text-label-lg uppercase tracking-widest text-primary-container mb-2">Körperhaltung</h3>
                <p className="text-on-surface-variant text-sm">Beweglichkeit und aufrechte Haltung durch gezielte Mobilisation.</p>
              </div>
              <div className="md:col-span-2 bg-white p-8 rounded-xl border border-surface-container-high transition-transform hover:-translate-y-1">
                <span className="material-symbols-outlined text-primary-container text-3xl mb-4">spa</span>
                <h3 className="text-label-lg uppercase tracking-widest text-primary-container mb-2">Entspannung</h3>
                <p className="text-on-surface-variant text-sm">Entspannungstechniken am Ende jeder Einheit für Körper und Geist.</p>
              </div>
              <div className="md:col-span-2 bg-white p-8 rounded-xl border border-surface-container-high transition-transform hover:-translate-y-1">
                <span className="material-symbols-outlined text-primary-container text-3xl mb-4">psychology</span>
                <h3 className="text-label-lg uppercase tracking-widest text-primary-container mb-2">Körperwahrnehmung</h3>
                <p className="text-on-surface-variant text-sm">Spüre deinen Körper bewusster – Übungen für mehr Achtsamkeit im Alltag.</p>
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
                <p className="text-primary-container font-lexend italic font-semibold text-sm leading-relaxed">&quot;Bewegung ist das beste Mittel gegen das Alter – für Körper und Geist.&quot;</p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-headline-lg font-headline-lg text-primary-container mb-8">
                Das <span className="text-on-surface-variant/40 italic">Konzept</span>
              </h2>
              <div className="space-y-6 text-on-surface-variant text-body-lg leading-relaxed">
                <p>
                  LadyFit ist speziell für Frauen konzipiert und verbindet bewährte Elemente aus Yoga, Wirbelsäulen- und Beckenbodengymnastik zu einem abwechslungsreichen Kurs. Handgeräte wie Bälle, Therabänder und Ringe machen die Übungen effektiver und abwechslungsreicher.
                </p>
                <p>
                  Das Konzept setzt auf schonende, gelenkfreundliche Bewegungen – ohne Überlastung von Gelenken, Sehnen und Bändern. Jede Stunde endet mit einer Entspannungsphase, die Körperwahrnehmung schult und nachhaltig für mehr Wohlbefinden im Alltag sorgt.
                </p>
                <div className="bg-surface-container-low p-8 rounded-xl border-l-4 border-secondary-container italic font-medium text-primary-container text-body-md">
                  &quot;Wer rastet, der rostet – aber wer sich mit Freude bewegt, bleibt jung. LadyFit ist deine Stunde nur für dich.&quot;
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
              <span className="text-secondary font-label-lg tracking-widest uppercase">Eure Trainerin</span>
              <h2 className="text-headline-lg font-headline-lg text-primary-container mt-2 mb-4">Marianne Schmicking</h2>
              <p className="text-on-surface-variant text-body-md mb-6 max-w-xl">
                &quot;Bewegung macht Freude – das möchte ich jeder Frau vermitteln. In meinem LadyFit-Kurs ist jede willkommen, egal welches Alter oder Fitnesslevel. Gemeinsam bleiben wir fit und aktiv.&quot;
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <span className="px-4 py-2 bg-surface-container text-on-surface rounded-full text-label-sm">Funktionsgymnastik</span>
                <span className="px-4 py-2 bg-surface-container text-on-surface rounded-full text-label-sm">Yoga &amp; Entspannung</span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-10 bg-primary-container text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="max-w-[800px] mx-auto px-6 text-center relative z-10">
            <h2 className="text-headline-lg mb-6">Bereit für dein erstes LadyFit-Training?</h2>
            <p className="text-on-primary-container text-body-lg mb-8">
              Dienstags um 10 Uhr ist deine Stunde. Schnapp dir deine Matte und komm einfach vorbei – keine Voranmeldung nötig beim Schnuppern.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-secondary-container text-on-secondary-fixed font-label-lg px-10 py-5 rounded-lg hover:shadow-xl transition-all">Jetzt Anmelden</button>
              <button className="border border-white/30 text-white font-label-lg px-10 py-5 rounded-lg hover:bg-white/10 transition-all">Frage stellen</button>
            </div>
          </div>
        </section>

      </main>

      <SponsorBand sponsors={sponsors} variant="grey" />
      <SiteFooter logoUrl={logoUrl} departmentLabel="LadyFit" variant="light" />

    </div>
  )
}
