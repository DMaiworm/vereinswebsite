import TeamRow from '@/components/shared/sections/TeamRow'
import type { AbteilungProfile } from '@/lib/api'

type Mannschaft = AbteilungProfile['mannschaften'][number]

/* Fallback-Bilder solange foto_url in der DB leer ist */
const FALLBACK_IMAGES: Record<string, { url: string; alt: string }> = {
  'cd977d89-068b-4ba6-8f7e-0dcebff52d13': {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuARiRyM77AztjpXLCGf3Bc2uOodrNjsyCD4vPuMFSuJ5fJlchxilf5pzTOg1U_DmiGB12aA_GfeheJ5S0zRHjPP1PNOm2iTWuIpvg48JkLgoNpbLuUcsFoiKwe37vyoBRpHMs8djYuCP4mUnr572PWkR23VZD_YEAGxYgQ5cOGDBkNJYM0eu4OdJejxDafBtVhiyJvyHOHMtqqF1IwhPc5RtVq9Mhvt-mOEYHd1FNK96B8fO8qUqUfVKpYUFiv1M94adXJFxh_DQn0',
    alt: 'Achtsamkeit & Entspannung',
  },
  '8112e8ce-f741-47ea-9c59-feeabd21b82e': {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDyEy-z--qKZoTp_kyIFKq9qcnKBrULdY7ONPJkR2FV0Hr1eOd4R1xvT1oA2MvQyBMKBE0ZoNhOVTeYmNGvggusmZWMtTWLuWXp54kZqkLkS_QL0s_pUvWP4AFFoMEufGLs7PTUH0AQ59X_c9OkUjJPqalut2rvDcuB-F8Ug0epRe-c-R2yTCToiujrC7BOvwYVxeKozsiQyt_TqAjv_Tj3CzBJOmRHTBJaL8-NQd5xS4dwjQ52Z5oJUJrMlDkh12FoWtXDiAg7kKo',
    alt: 'Pilates & BodyART',
  },
  'dd0609ba-1e72-406c-b723-0814b9efdf0c': {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxLauj7FyXKC3HaAG8ceccFJ27k9kVQtDgjQna6J7rHxyaQiPTstSigPgrN-JiWo3h24wvJelfsAMYFxDdD91a-CCNHVcYTmzk7nNkBleLmivbD5nUXTdznOk9gr9J0VyA_cJfCgTFzVDQbfY_DctXqBBKDzcPzntaSWSJ4Jy7h_gADXL4YwWNLlhWvQu4fqGqcZ3eezPoDMpNvW8gHy1tCZUPknGbUM9dmfafpwcpy6XrGYuwieec3rjLdHKoayaENpvc3c6TREQ',
    alt: 'Rücken-Fit',
  },
  '85f8aa90-e9a2-49d2-a96a-46f3b350bef3': {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtn73rZ5diGM1vyNThrLrZ_Auu982bEmOSKvHyPu5ok42CC8Qkp5W9qQeEXYKExY6I3qbFPqDJ9D4k5tmrdNPj3W2sAACb-DJvuPD66lOLu4Tq2BJmw29nHfrHecBN3h1xUrkaJMzmiK72a8EkHtqgraD_I7_uNY9PYRX29JggWDz6ZQW6Ve_smJL1x3dh034Q1HQmT6yKpmCH3Xi_UrgwG8itG4nHN1zhjfJsYdPYzQzGwy7Nb3VjRN_wH8X17v8YyreGZsA54Bs',
    alt: 'Qi-Gong',
  },
}

/* Slug-Mapping über short_name */
const SLUG_MAP: Record<string, string> = {
  Achtsamkeit: '../achtsamkeit',
  Pilates:     '../pilates',
  'Qi-Gong':   '../qi-gong',
  'Rücken':    '../rueckenfit',
}

interface Props {
  mannschaften?: Mannschaft[]
}

export default function TeamsInAbteilung({ mannschaften }: Props) {
  const teams = mannschaften && mannschaften.length > 0
    ? mannschaften.map(m => ({
        id:          m.id,
        imageUrl:    m.foto_url ?? FALLBACK_IMAGES[m.id]?.url ?? '',
        imageAlt:    FALLBACK_IMAGES[m.id]?.alt ?? m.name,
        tag:         m.motto ?? '',
        title:       m.name,
        description: m.beschreibung ?? '',
        href:        SLUG_MAP[m.short_name ?? ''] ?? '#',
      }))
    : HARDCODED_TEAMS

  return (
    <section className="bg-surface-container-low py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-headline text-4xl font-black text-primary mb-4">Unsere Spezialkurse</h2>
          <p className="text-on-surface-variant text-lg max-w-2xl mx-auto">Entdecken Sie das passende Programm für Ihre individuellen Ziele.</p>
        </div>
        <div className="space-y-20">
          {teams.map((team, i) => (
            <TeamRow key={team.title} {...team} imageLeft={i % 2 === 0} />
          ))}
        </div>
      </div>
    </section>
  )
}

const HARDCODED_TEAMS = [
  {
    id: 'cd977d89-068b-4ba6-8f7e-0dcebff52d13',
    imageUrl: FALLBACK_IMAGES['cd977d89-068b-4ba6-8f7e-0dcebff52d13'].url,
    imageAlt: 'Achtsamkeit',
    tag: 'Mental Health',
    title: 'Achtsamkeit & Entspannung',
    description: 'Finden Sie Ihre innere Mitte. Dieser Kurs kombiniert bewusste Atemtechniken mit sanften Bewegungsabläufen, um Stress abzubauen und die mentale Klarheit zu fördern. Perfekt für den Ausgleich im hektischen Alltag.',
    href: '../achtsamkeit',
  },
  {
    id: '8112e8ce-f741-47ea-9c59-feeabd21b82e',
    imageUrl: FALLBACK_IMAGES['8112e8ce-f741-47ea-9c59-feeabd21b82e'].url,
    imageAlt: 'Pilates',
    tag: 'Core Strength',
    title: 'Pilates & BodyART',
    description: 'Kräftigung von innen nach außen. Wir konzentrieren uns auf die tiefliegende Muskulatur, die Körperhaltung und den fließenden Übergang zwischen Kraft und Dehnung. Ein dynamisches Workout für einen starken Core.',
    href: '../pilates',
  },
  {
    id: 'dd0609ba-1e72-406c-b723-0814b9efdf0c',
    imageUrl: FALLBACK_IMAGES['dd0609ba-1e72-406c-b723-0814b9efdf0c'].url,
    imageAlt: 'Rücken-Fit',
    tag: 'Prävention',
    title: 'Rücken-Fit',
    description: 'Ihre Wirbelsäule im Fokus. Durch gezielte Mobilisation und Kräftigung der Rückenmuskulatur beugen wir Schmerzen vor und verbessern Ihre Haltung nachhaltig. Ideal für Vielsitzer und Aktive.',
    href: '../rueckenfit',
  },
  {
    id: '85f8aa90-e9a2-49d2-a96a-46f3b350bef3',
    imageUrl: FALLBACK_IMAGES['85f8aa90-e9a2-49d2-a96a-46f3b350bef3'].url,
    imageAlt: 'Qi-Gong',
    tag: 'Tradition',
    title: 'Qi-Gong',
    description: 'Die Kunst der Lebensenergie. Lernen Sie die traditionellen chinesischen Bewegungsformen kennen, die den Energiefluss im Körper harmonisieren und Ihre Selbstheilungskräfte aktivieren.',
    href: '../qi-gong',
  },
]
