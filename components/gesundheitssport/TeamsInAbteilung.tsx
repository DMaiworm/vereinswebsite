import TeamRow from '@/components/shared/sections/TeamRow'

const TEAMS = [
  {
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuARiRyM77AztjpXLCGf3Bc2uOodrNjsyCD4vPuMFSuJ5fJlchxilf5pzTOg1U_DmiGB12aA_GfeheJ5S0zRHjPP1PNOm2iTWuIpvg48JkLgoNpbLuUcsFoiKwe37vyoBRpHMs8djYuCP4mUnr572PWkR23VZD_YEAGxYgQ5cOGDBkNJYM0eu4OdJejxDafBtVhiyJvyHOHMtqqF1IwhPc5RtVq9Mhvt-mOEYHd1FNK96B8fO8qUqUfVKpYUFiv1M94adXJFxh_DQn0',
    imageAlt: 'Achtsamkeit',
    tag: 'Mental Health',
    title: 'Achtsamkeit & Entspannung',
    description: 'Finden Sie Ihre innere Mitte. Dieser Kurs kombiniert bewusste Atemtechniken mit sanften Bewegungsabläufen, um Stress abzubauen und die mentale Klarheit zu fördern. Perfekt für den Ausgleich im hektischen Alltag.',
    href: '../achtsamkeit',
  },
  {
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDyEy-z--qKZoTp_kyIFKq9qcnKBrULdY7ONPJkR2FV0Hr1eOd4R1xvT1oA2MvQyBMKBE0ZoNhOVTeYmNGvggusmZWMtTWLuWXp54kZqkLkS_QL0s_pUvWP4AFFoMEufGLs7PTUH0AQ59X_c9OkUjJPqalut2rvDcuB-F8Ug0epRe-c-R2yTCToiujrC7BOvwYVxeKozsiQyt_TqAjv_Tj3CzBJOmRHTBJaL8-NQd5xS4dwjQ52Z5oJUJrMlDkh12FoWtXDiAg7kKo',
    imageAlt: 'Pilates',
    tag: 'Core Strength',
    title: 'Pilates & BodyART',
    description: 'Kräftigung von innen nach außen. Wir konzentrieren uns auf die tiefliegende Muskulatur, die Körperhaltung und den fließenden Übergang zwischen Kraft und Dehnung. Ein dynamisches Workout für einen starken Core.',
    href: '../pilates',
  },
  {
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxLauj7FyXKC3HaAG8ceccFJ27k9kVQtDgjQna6J7rHxyaQiPTstSigPgrN-JiWo3h24wvJelfsAMYFxDdD91a-CCNHVcYTmzk7nNkBleLmivbD5nUXTdznOk9gr9J0VyA_cJfCgTFzVDQbfY_DctXqBBKDzcPzntaSWSJ4Jy7h_gADXL4YwWNLlhWvQu4fqGqcZ3eezPoDMpNvW8gHy1tCZUPknGbUM9dmfafpwcpy6XrGYuwieec3rjLdHKoayaENpvc3c6TREQ',
    imageAlt: 'Rücken-Fit',
    tag: 'Prevention',
    title: 'Rücken-Fit',
    description: 'Ihre Wirbelsäule im Fokus. Durch gezielte Mobilisation und Kräftigung der Rückenmuskulatur beugen wir Schmerzen vor und verbessern Ihre Haltung nachhaltig. Ideal für Vielsitzer und Aktive.',
    href: '../rueckenfit',
  },
  {
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtn73rZ5diGM1vyNThrLrZ_Auu982bEmOSKvHyPu5ok42CC8Qkp5W9qQeEXYKExY6I3qbFPqDJ9D4k5tmrdNPj3W2sAACb-DJvuPD66lOLu4Tq2BJmw29nHfrHecBN3h1xUrkaJMzmiK72a8EkHtqgraD_I7_uNY9PYRX29JggWDz6ZQW6Ve_smJL1x3dh034Q1HQmT6yKpmCH3Xi_UrgwG8itG4nHN1zhjfJsYdPYzQzGwy7Nb3VjRN_wH8X17v8YyreGZsA54Bs',
    imageAlt: 'Qi-Gong',
    tag: 'Tradition',
    title: 'Qi-Gong',
    description: 'Die Kunst der Lebensenergie. Lernen Sie die traditionellen chinesischen Bewegungsformen kennen, die den Energiefluss im Körper harmonisieren und Ihre Selbstheilungskräfte aktivieren.',
    href: '../qi-gong',
  },
]

export default function TeamsInAbteilung() {
  return (
    <section className="bg-surface-container-low py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-headline text-4xl font-black text-primary mb-4">Unsere Spezialkurse</h2>
          <p className="text-on-surface-variant text-lg max-w-2xl mx-auto">Entdecken Sie das passende Programm für Ihre individuellen Ziele.</p>
        </div>
        <div className="space-y-20">
          {TEAMS.map((team, i) => (
            <TeamRow key={team.title} {...team} imageLeft={i % 2 === 0} />
          ))}
        </div>
      </div>
    </section>
  )
}
