import TeamRow from '@/components/shared/sections/TeamRow'

const TEAMS = [
  {
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuARiRyM77AztjpXLCGf3Bc2uOodrNjsyCD4vPuMFSuJ5fJlchxilf5pzTOg1U_DmiGB12aA_GfeheJ5S0zRHjPP1PNOm2iTWuIpvg48JkLgoNpbLuUcsFoiKwe37vyoBRpHMs8djYuCP4mUnr572PWkR23VZD_YEAGxYgQ5cOGDBkNJYM0eu4OdJejxDafBtVhiyJvyHOHMtqqF1IwhPc5RtVq9Mhvt-mOEYHd1FNK96B8fO8qUqUfVKpYUFiv1M94adXJFxh_DQn0',
    imageAlt: 'Säugling und Erwachsener beim Eltern-Kind-Turnen',
    tag: 'Kleinkinder 6M – 1,5J',
    title: 'Früh übt sich (I)',
    description: 'Schon ab 6 Monaten fördern wir gemeinsam mit einer Bezugsperson die motorische und soziale Entwicklung durch Lieder, Fingerspiele und altersgerechte Bewegungsangebote.',
    href: '../fruehuebtsich-1',
  },
  {
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkoJ8nO3fnYj2XUWx9v1pq2cpUsdyJZpmlYUguR6cNqb9_151x46croRxDVFqp2V4sQ78wLQx3HpdEkRzo0Gwzj2vtCo-sD-H_HQLRIc9ZyicRJ9H1XMvi5ILo7fwIzY2qUOJ_HfqJa_yan0-nX5tJFsX_2K43aHelVYGb7h18qqqqy9EwCBSdBuCgRwfhnfjtEI2VXQItCUlqDBPuPwPpsVzuEVc4TSE1ToZd8myYtu-9jlAJk73eVJy5Aj8vQoZg3JtPkmow6xU',
    imageAlt: 'Kleinkinder turnen gemeinsam mit Eltern',
    tag: 'Kleinkinder 1,5 – 3J',
    title: 'Früh übt sich (II)',
    description: 'Gemeinsam mit Mama, Papa oder Oma und Opa entdecken Kleinkinder ab 1,5 Jahren an verschiedenen Turnstationen die Freude an Bewegung – in ihrem ganz eigenen Tempo.',
    href: '../fruehuebtsich-2',
  },
  {
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCfOznd2Yv2ObRCZnlOojk5zJnAUEUYoClcMnoveh4DKMnAC_jTq_DFgZyMXPqzwWP5Q8HX-pCNzzXlWZJtqvsYhESzph1ab_BpCh03OfxBzDnmb-Cgo2U43KNKZ6O-B8w0mWE2aZhSOyHuO-QAClRXriTyBx17LZeeVMTqdDd6T3DNOisYIi8JmmSqyujS9XDcTBZ_sXRTEyGPa_6OdWSaQ4EurOTLUR2kA5SImSgExEAjEyIjagss_eO2GwlvPrg2nL2LeUk2kQc',
    imageAlt: 'Kinder klettern und spielen in der Turnhalle',
    tag: 'Kinder 3 – 6 Jahre',
    title: 'Kids in Bewegung',
    description: 'Klettern, balancieren, spielen und lachen – in zwei Gruppen erkunden Kinder ab 3,5 Jahren Bewegungslandschaften und Turnstationen in der Mehrzweckhalle Görsroth.',
    href: '../kids-in-bewegung',
  },
  {
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtn73rZ5diGM1vyNThrLrZ_Auu982bEmOSKvHyPu5ok42CC8Qkp5W9qQeEXYKExY6I3qbFPqDJ9D4k5tmrdNPj3W2sAACb-DJvuPD66lOLu4Tq2BJmw29nHfrHecBN3h1xUrkaJMzmiK72a8EkHtqgraD_I7_uNY9PYRX29JggWDz6ZQW6Ve_smJL1x3dh034Q1HQmT6yKpmCH3Xi_UrgwG8itG4nHN1zhjfJsYdPYzQzGwy7Nb3VjRN_wH8X17v8YyreGZsA54Bs',
    imageAlt: 'Grundschulkinder beim Sport und Spiel',
    tag: 'Grundschulkinder 6 – 10J',
    title: 'Kinder stärken durch Sport, Spiel & Spaß',
    description: 'Austoben und erste Erfahrungen mit gezieltem Körper- und Schnelligkeitstraining machen – spielerisch, ohne Zwang, mit viel Spaß und neuen Freundschaften.',
    href: '../grundschulturnen',
  },
]

export default function TeamsInAbteilung() {
  return (
    <section className="bg-surface-container-low py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-headline text-4xl font-black text-primary mb-4">Unsere Kurse</h2>
          <p className="text-on-surface-variant text-lg max-w-2xl mx-auto">Für jedes Alter das passende Angebot – von den ersten Monaten bis ins Grundschulalter.</p>
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
