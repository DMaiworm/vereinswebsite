interface Ergebnis {
  heim: string
  gast: string
  score: string
  draw?: boolean
}

function getWinner(score: string, draw?: boolean): 'heim' | 'gast' | 'draw' {
  if (draw) return 'draw'
  const [h, g] = score.split(':').map(Number)
  if (isNaN(h) || isNaN(g) || h === g) return 'draw'
  return h > g ? 'heim' : 'gast'
}

interface NaechstesSpiel {
  info: string
  paarung: string
}

interface ZweiteSectionProps {
  teamName?: string
  ergebnisse?: Ergebnis[]
  naechsteSpiele?: NaechstesSpiel[]
}

const DEFAULT_ERGEBNISSE: Ergebnis[] = [
  { heim: 'SV Wallrabenstein',  gast: 'SG Hünstetten II', score: '1:2' },
  { heim: 'SG Hünstetten II',   gast: 'TuS Beuerbach',    score: '4:0' },
  { heim: 'SG Orlen',           gast: 'SG Hünstetten II', score: '1:1', draw: true },
]

const DEFAULT_NAECHSTE: NaechstesSpiel[] = [
  { info: 'SO, 15:00 UHR · HEIMSPIEL',  paarung: 'SG Hünstetten II vs. SV Neuhof' },
  { info: 'SO, 13:00 UHR · AUSWÄRTS',   paarung: 'FSV Wörsdorf vs. SG Hünstetten II' },
]

export default function ZweiteSection({
  teamName = '2. Mannschaft',
  ergebnisse = DEFAULT_ERGEBNISSE,
  naechsteSpiele = DEFAULT_NAECHSTE,
}: ZweiteSectionProps) {
  return (
    <section id="zweite" className="py-12 bg-surface">
      <div className="max-w-screen-2xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-16">

        {/* 2. Mannschaft */}
        <div className="lg:col-span-8">
          <span className="text-secondary font-headline font-bold text-lg">Unterbau &amp; Talentschmiede</span>
          <h2 className="text-5xl font-headline font-black tracking-tighter text-primary mt-2 mb-6">UNSERE &ldquo;ZWEITE&rdquo;</h2>
          <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-xl mb-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="w-full h-full object-cover"
              alt="Team photo of second team squad"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuACP3qpiuo2WuoIaNjeILX4XUQYPnRZ0jCvmQlDpKrF4IHMDINw4gSQlDXb4t0HQwr0KEyUkple8VHPTdMglBXZ2OLRRSCW_SCb0zQIGHyNGxJJ1y0r6ereFKb2zRfrMM77kt2svczmbML89JFYUgnTzEK4v-cgpYCRBnaaFiLiyhp7MQxdo5PhuvKFYXkkR5cQaQicgu5Zd4fBwPQI8DmZurP62VZF3XfzarmoaQnF7G1k9QnKVhGn9gHVZROphEy9t8X9DC2LqNo"
            />
            {/* from-primary/40 → rgba fix per CLAUDE.md */}
            <div className="absolute inset-0 bg-gradient-to-r from-[rgba(5,40,86,0.4)] to-transparent"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 bg-surface-container rounded-2xl">
              <h4 className="font-headline font-bold text-primary text-xl mb-4">Das Karrieresprungbrett</h4>
              <p className="text-on-surface-variant">Unsere Reserve ist weit mehr als eine zweite Wahl. Hier fokussieren wir uns auf junge Spieler, die über Spielpraxis den direkten Anschluss an den Kader der 1. Mannschaft suchen.</p>
            </div>
            <div className="p-8 bg-surface-container rounded-2xl">
              <h4 className="font-headline font-bold text-primary text-xl mb-4">Ehrgeiz &amp; Zusammenhalt</h4>
              <p className="text-on-surface-variant">Unter professionellen Bedingungen trainieren unsere Talente hart für ihren Traum. Die Durchlässigkeit zwischen den Teams ist unser größter Trumpf.</p>
            </div>
          </div>
        </div>

        {/* Spieltag-Zentrale */}
        <div className="lg:col-span-4">
          <div className="bg-surface-container-low rounded-3xl p-5 sticky top-32">
            <h3 className="text-xl font-headline font-extrabold text-primary mb-1 flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">sports_soccer</span>
              Spieltags-Zentrale
            </h3>
            <p className="text-xs font-bold text-secondary-container bg-primary inline-block px-2 py-0.5 rounded-full mb-5 ml-8 tracking-wide">
              SG Hünstetten · {teamName}
            </p>

            <div className="mb-6">
              <h4 className="text-xs font-bold text-outline uppercase tracking-widest mb-3">Letzte Ergebnisse</h4>
              <div className="space-y-2">
                {ergebnisse.map((e, i) => {
                  const winner = getWinner(e.score, e.draw)
                  return (
                    <div
                      key={i}
                      className="grid items-center gap-2 px-3 py-2.5 bg-white rounded-xl shadow-sm"
                      style={{ gridTemplateColumns: '1fr auto 1fr' }}
                    >
                      <span className={`text-sm text-right truncate ${winner === 'heim' ? 'font-bold text-primary' : 'font-medium text-on-surface-variant'}`}>
                        {e.heim}
                      </span>
                      <span className={`px-3 py-1 rounded-lg font-black text-white text-sm tabular-nums ${winner === 'draw' ? 'bg-outline' : 'bg-primary'}`}>
                        {e.score}
                      </span>
                      <span className={`text-sm text-left truncate ${winner === 'gast' ? 'font-bold text-primary' : 'font-medium text-on-surface-variant'}`}>
                        {e.gast}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-outline uppercase tracking-widest mb-3">Nächste Spiele</h4>
              <div className="space-y-3">
                {naechsteSpiele.map((s, i) => (
                  <div key={i} className={`p-3 border-l-4 bg-surface-container-highest rounded-r-xl ${i === 0 ? 'border-secondary-container' : 'border-outline-variant'}`}>
                    <p className="text-[9px] font-bold text-outline mb-1 tracking-widest uppercase">{s.info}</p>
                    <p className="text-xs font-bold text-primary leading-snug">{s.paarung}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
