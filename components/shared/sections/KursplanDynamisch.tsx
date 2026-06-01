import type { AbteilungProfile } from '@/lib/api'

type Mannschaft = AbteilungProfile['mannschaften'][number]

interface Row {
  mannschaft: Mannschaft
  wochentag: string
  zeit: string
  ort: string
  trainerName: string
}

function buildRows(mannschaften: Mannschaft[]): Row[] {
  const rows: Row[] = []
  for (const m of mannschaften) {
    if (m.training_slots.length === 0) {
      // Mannschaft ohne Buchungen: zeige Zeile ohne Zeitangabe
      rows.push({
        mannschaft: m,
        wochentag:  '–',
        zeit:       '–',
        ort:        '–',
        trainerName: m.trainer[0]
          ? `${m.trainer[0].vorname} ${m.trainer[0].nachname}`
          : '–',
      })
    } else {
      for (const slot of m.training_slots) {
        rows.push({
          mannschaft:  m,
          wochentag:   slot.wochentag,
          zeit:        `${slot.start_time.slice(0, 5)} – ${slot.end_time.slice(0, 5)} Uhr`,
          ort:         slot.resource,
          trainerName: m.trainer[0]
            ? `${m.trainer[0].vorname} ${m.trainer[0].nachname}`
            : '–',
        })
      }
    }
  }
  return rows
}

interface Props {
  mannschaften?: Mannschaft[]
}

export default function KursplanDynamisch({ mannschaften }: Props) {
  if (!mannschaften || mannschaften.length === 0) return null

  const rows = buildRows(mannschaften)
  if (rows.length === 0) return null

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-separate border-spacing-y-4">
        <thead className="bg-surface-container-low">
          <tr>
            <th className="px-8 py-4 font-headline font-bold text-primary rounded-l-2xl">Zeit</th>
            <th className="px-8 py-4 font-headline font-bold text-primary">Kursname</th>
            <th className="px-8 py-4 font-headline font-bold text-primary">Trainer</th>
            <th className="px-8 py-4 font-headline font-bold text-primary rounded-r-2xl">Ort</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={`${row.mannschaft.id}-${i}`}
              className="bg-surface-container-lowest hover:scale-[1.01] transition-transform duration-200"
            >
              <td className="px-8 py-6 rounded-l-2xl">
                <div className="font-headline font-black text-primary">{row.wochentag}</div>
                <div className="text-xs font-bold text-on-surface-variant">{row.zeit}</div>
              </td>
              <td className="px-8 py-6">
                <div className="font-bold text-lg text-primary">{row.mannschaft.name}</div>
                {row.mannschaft.beschreibung && (
                  <div className="text-xs text-on-surface-variant">{row.mannschaft.beschreibung}</div>
                )}
              </td>
              <td className="px-8 py-6">
                <span className="font-medium">{row.trainerName}</span>
              </td>
              <td className="px-8 py-6 rounded-r-2xl">
                <span className="text-sm text-on-surface-variant">{row.ort}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
