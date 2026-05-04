import TeamRow from '@/components/shared/sections/TeamRow'

const TEAMS = [
  {
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDTrCqQJp9RfHn2Zgo_i5FUJMka-M-nwIcBYq0U70-EIZoWPKZCsbHUcm6feRax1RvzMdzJ1tJPK2gHJXnZmblpqCXPJiGm-MQDfZR25NO-F9KHAFX6C5NtANSePJ6bzG9uUCpXq-Q8kl4XNIdY7mtbVFz4zG4DUrcyRgNlFKfnhv154Q-wBFHYL2m5C00OhRwVtkyK2mlBekn-I7BWwT-62Vx2v7foAyb9XwLwiS34zDUc2QfuwoQBDl5neQsEqBIlcaB7NFH8Bw',
    imageAlt: 'LadyFit Gymnastics',
    tag: 'Bleib in Bewegung',
    title: 'LadyFit',
    description: 'Funktionsgymnastik für Frauen jeden Alters – mit Elementen aus Yoga, Wirbelsäulen- und Beckenbodengymnastik. Schwerpunkt ist die Stärkung der Rumpfmuskulatur, Verbesserung der Beweglichkeit und Korrektur von Fehlhaltungen. Schonend für Gelenke, Sehnen und Bänder.',
    meta: 'Di 10:00 – 11:00 Uhr · Übungsleiterin: Marianne Schmicking',
    href: '../ladyfit',
  },
  {
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAIBtPcaXq0RBTq-Gsff6FK7Z26LITHpOKNlLZyrVF9gaUtOYO5HB1-6aWdlvHb3HrE732uVzFZOnpH9h_ZE_ObRKF4LKzQfVTjgXf2HA7BNkDGAMJrtUiEzeXfGI6YVqBzrctLy_SVjO27qwr1sjM40KsCtudbAlLgqpwN_HGD31Z27J281R10YcsZCkLjq-ErfzmaLkp42QVRp8GzbGzr1CXYZAOt205XqUNaaI9g3yPCXsoKSHadr_rv5tDnQ7Nd7dpdl3yT8bI',
    imageAlt: 'ManFit Gymnastics',
    tag: 'Man(n) bewegt sich',
    title: 'ManFit',
    description: 'Reine Männergruppe für erwachsene und ältere Männer. Nach dem Aufwärmen folgt Funktionsgymnastik mit dem eigenen Körpergewicht oder Handgeräten wie Hanteln, Brasils, Therabändern und Pezzibällen. Abschluss mit intensivem Dehnprogramm und Entspannung.',
    meta: 'Di 18:30 – 19:30 Uhr · Übungsleiter: Michael Larisch',
    href: '../manfit',
  },
  {
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxLauj7FyXKC3HaAG8ceccFJ27k9kVQtDgjQna6J7rHxyaQiPTstSigPgrN-JiWo3h24wvJelfsAMYFxDdD91a-CCNHVcYTmzk7nNkBleLmivbD5nUXTdznOk9gr9J0VyA_cJfCgTFzVDQbfY_DctXqBBKDzcPzntaSWSJ4Jy7h_gADXL4YwWNLlhWvQu4fqGqcZ3eezPoDMpNvW8gHy1tCZUPknGbUM9dmfafpwcpy6XrGYuwieec3rjLdHKoayaENpvc3c6TREQ',
    imageAlt: 'Step-Aerobic',
    tag: 'Step by Step',
    title: 'Step-Aerobic',
    description: 'Gelenkschonendes Herz-Kreislauf-Training auf einer höhenverstellbaren Plattform. Trainiert Bein- und Gesäßmuskulatur, stärkt den Rumpf und steigert Koordination sowie Kondition. Ziel: drei Choreographien lernen, die am Ende zusammengefügt werden. Mittleres Niveau – Anfänger willkommen!',
    meta: 'Mi 20:00 – 21:00 Uhr · Übungsleiterin: Bettina Wredenhagen',
    href: '../step-aerobic',
  },
  {
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtn73rZ5diGM1vyNThrLrZ_Auu982bEmOSKvHyPu5ok42CC8Qkp5W9qQeEXYKExY6I3qbFPqDJ9D4k5tmrdNPj3W2sAACb-DJvuPD66lOLu4Tq2BJmw29nHfrHecBN3h1xUrkaJMzmiK72a8EkHtqgraD_I7_uNY9PYRX29JggWDz6ZQW6Ve_smJL1x3dh034Q1HQmT6yKpmCH3Xi_UrgwG8itG4nHN1zhjfJsYdPYzQzGwy7Nb3VjRN_wH8X17v8YyreGZsA54Bs',
    imageAlt: 'Tanzfitness',
    tag: 'Ästhetik und Ausdauer',
    title: 'Tanzfitness',
    description: 'Die Verbindung aus Tanzästhetik und Fitness-Ausdauer. 60 Minuten Bewegung mit lateinamerikanischen, Pop- und Hip-Hop-Sounds trainiert den ganzen Körper. Für alle Altersklassen – von dynamisch bis gemäßigt. Einfach zur Probestunde vorbeikommen!',
    meta: 'Mo 18:30 – 20:00 Uhr · Übungsleiterin: Celina Schneider',
    href: '../tanzfitness',
  },
  {
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkoJ8nO3fnYj2XUWx9v1pq2cpUsdyJZpmlYUguR6cNqb9_151x46croRxDVFqp2V4sQ78wLQx3HpdEkRzo0Gwzj2vtCo-sD-H_HQLRIc9ZyicRJ9H1XMvi5ILo7fwIzY2qUOJ_HfqJa_yan0-nX5tJFsX_2K43aHelVYGb7h18qqqqy9EwCBSdBuCgRwfhnfjtEI2VXQItCUlqDBPuPwPpsVzuEVc4TSE1ToZd8myYtu-9jlAJk73eVJy5Aj8vQoZg3JtPkmow6xU',
    imageAlt: 'Workout',
    tag: 'Spaß an der Bewegung',
    title: 'Workout',
    description: 'Ausdauer und Kraft gemeinsam zur Musik trainieren – für alle Alters- und Fitnessstufen. Alle Übungen mit dem eigenen Körpergewicht, keine Vorkenntnisse nötig. Hauptsache Spaß! Einfach zum Probetraining vorbeikommen.',
    meta: 'Di 19:00 – 20:00 Uhr · Übungsleiterin: Irina Djurganina',
    href: '../workout',
  },
  {
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCfOznd2Yv2ObRCZnlOojk5zJnAUEUYoClcMnoveh4DKMnAC_jTq_DFgZyMXPqzwWP5Q8HX-pCNzzXlWZJtqvsYhESzph1ab_BpCh03OfxBzDnmb-Cgo2U43KNKZ6O-B8w0mWE2aZhSOyHuO-QAClRXriTyBx17LZeeVMTqdDd6T3DNOisYIi8JmmSqyujS9XDcTBZ_sXRTEyGPa_6OdWSaQ4EurOTLUR2kA5SImSgExEAjEyIjagss_eO2GwlvPrg2nL2LeUk2kQc',
    imageAlt: 'Fit das ganze Jahr',
    tag: 'April – Oktober',
    title: 'Fit das ganze Jahr',
    description: 'Variantenreiches Ganzkörpertraining für motivierte Sportler beiderlei Geschlechts: Kraft, Beweglichkeit, Koordination, HIIT und Zirkeltraining. Mit eigenem Körpergewicht und diversen Geräten. Die positive Gruppenkonstellation treibt zu höheren sportlichen Zielen.',
    meta: 'Mo 19:00 – 20:00 Uhr · Apr – Okt · Übungsleiter: Werner Harasta',
    href: '../fitdurchsjahr',
  },
  {
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYjUo112Wi-WgPDDK7PADQgcZV3q89r7aad0btl-KJkrzoKZZ5iabaffXVsMRKUc3bRt5mMz1aVEzQQWm0litBpcHQ03eFDUaXtqAPnPOgjYWUgjKshEnW-aKnSY1nYFahGx9YwJQ_UnzmWqtPgsRR6zGfNZyLHA8deTVHOL_iDtz18uv60DUukH_-nIprBpL7RY6xOcrRfoD9qtucerAcwfNEEL2Jhgo0krkVz0ndcUTxqDDnIoMGrPRofTvtJfsp6Mx7gYttDXE',
    imageAlt: 'Fit in die Skisaison',
    tag: 'November – März',
    title: 'Fit in die Skisaison',
    description: 'Fit starten, weniger Muskelkater, weniger Verletzungen. Skisportmotorisch orientiert, aber für alle geeignet, die sich fit halten wollen. Kraft, Schnellkraft, Koordination und Rumpfstabilität stehen im Fokus – mit HIIT, Zirkeltraining und motivierenden Gruppenspielen.',
    meta: 'Mo 19:00 – 20:00 Uhr · Nov – Mär · Übungsleiter: Werner Harasta',
    href: '../skigym',
  },
]

export default function TeamsInAbteilung() {
  return (
    <section className="bg-surface-container-low py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-8">
          <h2 className="font-headline text-4xl font-black text-primary mb-4">Unsere Übungsgruppen</h2>
          <p className="text-on-surface-variant text-lg max-w-2xl mx-auto">Für jeden das passende Angebot – von Frauen-Gymnastik über Männer-Fitness bis hin zu Step-Aerobic und Tanzfitness.</p>
        </div>
        <div className="space-y-10">
          {TEAMS.map((team, i) => (
            <TeamRow key={team.title} {...team} imageLeft={i % 2 === 0} />
          ))}
        </div>
      </div>
    </section>
  )
}
