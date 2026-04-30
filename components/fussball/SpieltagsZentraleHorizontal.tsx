interface Ergebnis {
  heim: string
  gast: string
  score: string
  draw?: boolean
}

interface NaechstesSpiel {
  datum: string   // z.B. "SA, 03.05."
  uhrzeit: string // z.B. "16:00 Uhr"
  typ: string     // z.B. "Heimspiel" | "Auswärts"
  paarung: string
}

interface SpieltagsZentraleHorizontalProps {
  teamName?: string
  ergebnisse?: Ergebnis[]
  naechsteSpiele?: NaechstesSpiel[]
}

function getWinner(score: string, draw?: boolean): 'heim' | 'gast' | 'draw' {
  if (draw) return 'draw'
  const [h, g] = score.split(':').map(Number)
  if (isNaN(h) || isNaN(g) || h === g) return 'draw'
  return h > g ? 'heim' : 'gast'
}

const DEFAULT_ERGEBNISSE: Ergebnis[] = [
  { heim: 'SV Wallrabenstein', gast: 'SG Hünstetten', score: '0:3' },
  { heim: 'SG Hünstetten',     gast: 'TuS Beuerbach',  score: '2:1' },
]

const DEFAULT_NAECHSTE: NaechstesSpiel[] = [
  { datum: 'SA, 03.05.', uhrzeit: '16:00 Uhr', typ: 'Heimspiel',  paarung: 'SG Hünstetten vs. SV Neuhof' },
  { datum: 'SA, 10.05.', uhrzeit: '15:00 Uhr', typ: 'Auswärts',   paarung: 'FSV Wörsdorf vs. SG Hünstetten' },
]

export default function SpieltagsZentraleHorizontal({
  teamName = '1. Mannschaft',
  ergebnisse = DEFAULT_ERGEBNISSE,
  naechsteSpiele = DEFAULT_NAECHSTE,
}: SpieltagsZentraleHorizontalProps) {
  return (
    <div className="mt-4 bg-surface-container-low rounded-2xl px-6 py-4 grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-x-10 gap-y-4 items-center">

      {/* Title + team badge */}
      <div className="flex flex-col gap-1 shrink-0">
        <span className="flex items-center gap-2 text-base font-headline font-extrabold text-primary">
          <span className="material-symbols-outlined text-secondary text-lg">sports_soccer</span>
          Spieltags-Zentrale
        </span>
        <span className="text-[10px] font-bold text-secondary-container bg-primary inline-block px-2 py-0.5 rounded-full tracking-wide w-fit">
          SG Hünstetten · {teamName}
        </span>
      </div>

      {/* Letzte Ergebnisse — 2 breite Cards */}
      <div>
        <p className="text-[9px] font-bold text-outline uppercase tracking-widest mb-2">Letzte Ergebnisse</p>
        <div className="flex flex-col gap-2">
          {ergebnisse.slice(0, 2).map((e, i) => {
            const winner = getWinner(e.score, e.draw)
            return (
              <div
                key={i}
                className="grid items-center gap-3 bg-white rounded-xl px-4 py-2.5 shadow-sm"
                style={{ gridTemplateColumns: '1fr auto 1fr' }}
              >
                <span className={`text-right text-sm truncate ${winner === 'heim' ? 'font-bold text-primary' : 'font-medium text-on-surface-variant'}`}>
                  {e.heim}
                </span>
                <span className={`px-3 py-1 rounded-lg font-black text-white tabular-nums text-sm ${winner === 'draw' ? 'bg-outline' : 'bg-primary'}`}>
                  {e.score}
                </span>
                <span className={`text-left text-sm truncate ${winner === 'gast' ? 'font-bold text-primary' : 'font-medium text-on-surface-variant'}`}>
                  {e.gast}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Nächste 2 Spiele */}
      <div className="shrink-0">
        <p className="text-[9px] font-bold text-outline uppercase tracking-widest mb-2">Nächste Spiele</p>
        <div className="flex gap-2">
          {naechsteSpiele.slice(0, 2).map((s, i) => (
            <div key={i} className={`p-3 border-l-4 bg-surface-container-highest rounded-r-xl min-w-[180px] ${i === 0 ? 'border-secondary-container' : 'border-outline-variant'}`}>
              <div className="flex items-baseline gap-1.5 mb-1">
                <span className="text-[10px] font-black text-primary">{s.datum}</span>
                <span className="text-[10px] font-bold text-outline">· {s.uhrzeit}</span>
              </div>
              <p className="text-[9px] font-bold text-outline uppercase tracking-widest mb-1">{s.typ}</p>
              <p className="text-xs font-bold text-primary leading-snug">{s.paarung}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
