import TeamRow from '@/components/shared/sections/TeamRow'

const KURSE_POOL = [
  {
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDTrCqQJp9RfHn2Zgo_i5FUJMka-M-nwIcBYq0U70-EIZoWPKZCsbHUcm6feRax1RvzMdzJ1tJPK2gHJXnZmblpqCXPJiGm-MQDfZR25NO-F9KHAFX6C5NtANSePJ6bzG9uUCpXq-Q8kl4XNIdY7mtbVFz4zG4DUrcyRgNlFKfnhv154Q-wBFHYL2m5C00OhRwVtkyK2mlBekn-I7BWwT-62Vx2v7foAyb9XwLwiS34zDUc2QfuwoQBDl5neQsEqBIlcaB7NFH8Bw',
    imageAlt: 'LadyFit Gymnastics',
    tag: 'Bleib in Bewegung',
    title: 'LadyFit',
    description: 'Funktionsgymnastik für Frauen jeden Alters – mit Elementen aus Yoga, Wirbelsäulen- und Beckenbodengymnastik. Schwerpunkt ist die Stärkung der Rumpfmuskulatur, Verbesserung der Beweglichkeit und Korrektur von Fehlhaltungen. Schonend für Gelenke, Sehnen und Bänder.',
    href: './ladyfit',
  },
  {
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYjUo112Wi-WgPDDK7PADQgcZV3q89r7aad0btl-KJkrzoKZZ5iabaffXVsMRKUc3bRt5mMz1aVEzQQWm0litBpcHQ03eFDUaXtqAPnPOgjYWUgjKshEnW-aKnSY1nYFahGx9YwJQ_UnzmWqtPgsRR6zGfNZyLHA8deTVHOL_iDtz18uv60DUukH_-nIprBpL7RY6xOcrRfoD9qtucerAcwfNEEL2Jhgo0krkVz0ndcUTxqDDnIoMGrPRofTvtJfsp6Mx7gYttDXE',
    imageAlt: 'Qi-Gong',
    tag: 'Tradition',
    title: 'Qi-Gong',
    description: 'Lernen Sie die traditionellen chinesischen Bewegungsformen kennen, die den Energiefluss im Körper harmonisieren und die Selbstheilungskräfte aktivieren. Ein Kurs für alle, die innere Ruhe und Ausgeglichenheit suchen.',
    href: './qi-gong',
  },
  {
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxLauj7FyXKC3HaAG8ceccFJ27k9kVQtDgjQna6J7rHxyaQiPTstSigPgrN-JiWo3h24wvJelfsAMYFxDdD91a-CCNHVcYTmzk7nNkBleLmivbD5nUXTdznOk9gr9J0VyA_cJfCgTFzVDQbfY_DctXqBBKDzcPzntaSWSJ4Jy7h_gADXL4YwWNLlhWvQu4fqGqcZ3eezPoDMpNvW8gHy1tCZUPknGbUM9dmfafpwcpy6XrGYuwieec3rjLdHKoayaENpvc3c6TREQ',
    imageAlt: 'Step-Aerobic',
    tag: 'Step by Step',
    title: 'Step-Aerobic',
    description: 'Gelenkschonendes Herz-Kreislauf-Training auf einer höhenverstellbaren Plattform. Trainiert Bein- und Gesäßmuskulatur, stärkt den Rumpf und steigert Koordination sowie Kondition. Mittleres Niveau – Anfänger willkommen!',
    href: './step-aerobic',
  },
  {
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCDYJzMmOfe4LWHo1KVI47hn1N5gnaL3avUyCIWdClbnTu7qHeuqo0CqS14M1yw4_u9qp9SIPxwmNaCPl1BAxExYbVVdzZu-po69HH5fMvxVqBWDdB15-tY74NulE9KkmCpjdrMvNfSYcDpY6obIAl4ePCdoTYJhQDY4qS1J5_OpqIoK2oCrdWUNT7gBakng1zNZCbtXQv6MLdvzsDUD_suUOoe5wKX1mr-OCCVcZ06mKJgMMsAjSncH7V_THp9ydoxt_potnwYOUU',
    imageAlt: 'Achtsamkeit & Entspannung',
    tag: 'Mental Health',
    title: 'Achtsamkeit & Entspannung',
    description: 'Finden Sie Ihre innere Mitte. Dieser Kurs kombiniert bewusste Atemtechniken mit sanften Bewegungsabläufen, um Stress abzubauen und die mentale Klarheit zu fördern. Perfekt für den Ausgleich im hektischen Alltag.',
    href: './achtsamkeit',
  },
  {
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtn73rZ5diGM1vyNThrLrZ_Auu982bEmOSKvHyPu5ok42CC8Qkp5W9qQeEXYKExY6I3qbFPqDJ9D4k5tmrdNPj3W2sAACb-DJvuPD66lOLu4Tq2BJmw29nHfrHecBN3h1xUrkaJMzmiK72a8EkHtqgraD_I7_uNY9PYRX29JggWDz6ZQW6Ve_smJL1x3dh034Q1HQmT6yKpmCH3Xi_UrgwG8itG4nHN1zhjfJsYdPYzQzGwy7Nb3VjRN_wH8X17v8YyreGZsA54Bs',
    imageAlt: 'Tanzfitness',
    tag: 'Ästhetik und Ausdauer',
    title: 'Tanzfitness',
    description: 'Die Verbindung aus Tanzästhetik und Fitness-Ausdauer. 60 Minuten Bewegung mit lateinamerikanischen, Pop- und Hip-Hop-Sounds trainiert den ganzen Körper. Für alle Altersklassen – einfach zur Probestunde vorbeikommen!',
    href: './tanzfitness',
  },
  {
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkoJ8nO3fnYj2XUWx9v1pq2cpUsdyJZpmlYUguR6cNqb9_151x46croRxDVFqp2V4sQ78wLQx3HpdEkRzo0Gwzj2vtCo-sD-H_HQLRIc9ZyicRJ9H1XMvi5ILo7fwIzY2qUOJ_HfqJa_yan0-nX5tJFsX_2K43aHelVYGb7h18qqqqy9EwCBSdBuCgRwfhnfjtEI2VXQItCUlqDBPuPwPpsVzuEVc4TSE1ToZd8myYtu-9jlAJk73eVJy5Aj8vQoZg3JtPkmow6xU',
    imageAlt: 'Workout',
    tag: 'Spaß an der Bewegung',
    title: 'Workout',
    description: 'Ausdauer und Kraft gemeinsam zur Musik trainieren – für alle Alters- und Fitnessstufen. Alle Übungen mit dem eigenen Körpergewicht, keine Vorkenntnisse nötig. Hauptsache Spaß! Einfach zum Probetraining vorbeikommen.',
    href: './workout',
  },
  {
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDyEy-z--qKZoTp_kyIFKq9qcnKBrULdY7ONPJkR2FV0Hr1eOd4R1xvT1oA2MvQyBMKBE0ZoNhOVTeYmNGvggusmZWMtTWLuWXp54kZqkLkS_QL0s_pUvWP4AFFoMEufGLs7PTUH0AQ59X_c9OkUjJPqalut2rvDcuB-F8Ug0epRe-c-R2yTCToiujrC7BOvwYVxeKozsiQyt_TqAjv_Tj3CzBJOmRHTBJaL8-NQd5xS4dwjQ52Z5oJUJrMlDkh12FoWtXDiAg7kKo',
    imageAlt: 'Pilates & BodyART',
    tag: 'Core Strength',
    title: 'Pilates & BodyART',
    description: 'Kräftigung von innen nach außen. Wir konzentrieren uns auf die tiefliegende Muskulatur, die Körperhaltung und den fließenden Übergang zwischen Kraft und Dehnung. Ein dynamisches Workout für einen starken Core.',
    href: './pilates',
  },
]

function pickKurs() {
  const week = Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000))
  return { kurs: KURSE_POOL[week % KURSE_POOL.length], imageLeft: week % 2 === 0 }
}

export default function KursDerWocheSection() {
  const { kurs, imageLeft } = pickKurs()

  return (
    <section className="bg-surface-container-low py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-6">
          <span className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-xs font-black uppercase tracking-widest mb-4">
            Kurs der Woche
          </span>
          <h2 className="font-headline font-black text-primary" style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}>Unsere Abteilungen stellen sich vor</h2>
        </div>
        <TeamRow {...kurs} imageLeft={imageLeft} />
      </div>
    </section>
  )
}
