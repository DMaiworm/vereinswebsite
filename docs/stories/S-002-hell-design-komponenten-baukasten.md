# S-002 – Hell-Design Komponenten-Baukasten

**Status:** done  
**Erstellt:** 2026-05-04  
**Bereich:** components/shared/sections/, app/fitness/, app/gesundheitssport/

---

## Problem

`app/fitness/page.tsx` und `app/gesundheitssport/page.tsx` teilen sich 5 nahezu identische
HTML-Blöcke, die zurzeit **copy-paste** sind. Jede Textänderung muss doppelt gepflegt werden.
Dazu haben `components/fitness/TeamsInAbteilung.tsx` und
`components/gesundheitssport/TeamsInAbteilung.tsx` dasselbe strukturelle Muster
(Foto links/rechts alternierend), aber hardcoded Daten – kein gemeinsames Primitiv.

---

## Ist-Analyse: Was ist copy-paste?

### Tier 1 – 100 % identischer Code (sofort extrahierbar)

| Block | In fitness/page.tsx | In gesundheitssport/page.tsx | Diff |
|-------|--------------------|-----------------------------|------|
| **Stats / KPI-Leiste** | Z. 59–80 | Z. 55–77 | identisch |
| **"Unsicher welcher Kurs?"-Infobox** | Z. 259–270 | Z. 188–200 | identisch |
| **"Bereit für Ihren ersten Kurs?"-CTA-Banner** | Z. 312–326 | Z. 241–255 | fast identisch (nur py-xl vs py-10) |

### Tier 2 – Gleiche Struktur, andere Texte/Bilder (parametrisierbar)

| Block | Struktur | Props |
|-------|----------|-------|
| **Abteilungs-Hero** | h-716px, Gradient, Badge, H1, Subtext, 2 Buttons | imageSrc, badge, title, subtitle, primaryCta, secondaryCta |
| **TeamRow** | Foto links oder rechts, Tag, H3, Text, Zeit/Trainer, "Mehr erfahren"-Link | imageUrl, imageAlt, tag, title, description, meta?, href, imageLeft |

### Was bereits gut ist (nicht anfassen)

- `ShopGrid`, `GalerieSnapshots`, `TrainerCta`, `NewsGrid` → bereits shared ✅
- Badminton: komplett anderes Designsystem → OUT OF SCOPE
- Fußball Staff-Grid: sportspezifisch → OUT OF SCOPE
- Kursplan-Tabelle: verschieden genug (Spalten, Filter) → OUT OF SCOPE für diese Story

---

## Ziel

Fünf neue Komponenten in `components/shared/sections/` für das **Hell-Design**:

```
components/shared/sections/
  StatsBar.tsx          ← KPI-Leiste (4 Kacheln)
  KursInfoBox.tsx       ← "Unsicher welcher Kurs?"-Box
  AbteilungCta.tsx      ← "Bereit für Ihren ersten Kurs?"-Banner
  AbteilungHero.tsx     ← Abteilungs-Hero (Hell-Design)
  TeamRow.tsx           ← Einzelne Foto-links/rechts Zeile
```

Danach werden `fitness/page.tsx` und `gesundheitssport/page.tsx` auf diese Komponenten umgestellt.
Die `TeamsInAbteilung`-Komponenten beider Abteilungen nutzen dann `<TeamRow>`.

---

## Akzeptanzkriterien

1. **`StatsBar`** – exportiert eine `StatsBarItem[]`-gesteuerte Komponente.
   Die 4 Kacheln (Wert + Label, border-bottom alternierend primary/secondary) kommen via Props.
   fitness und gesundheitssport zeigen dieselbe Leiste mit denselben Zahlen → ein Import reicht.

2. **`KursInfoBox`** – exportiert eine Komponente mit Props `title`, `description`, `ctaLabel`.
   Beide Seiten importieren sie statt des inline-Blocks.

3. **`AbteilungCta`** – exportiert eine Komponente mit Props `title`, `subtitle`, `primaryLabel`,
   `secondaryLabel`. Hintergrund: `bg-primary-container`, immer dunkel, 2 Buttons.

4. **`AbteilungHero`** – exportiert eine Komponente mit Props:
   - `imageSrc: string`, `imageAlt: string`
   - `badge: string` (z.B. "Kraft & Ausdauer")
   - `title: string`, `subtitle: string`
   - `primaryCta: { label: string; href?: string }`
   - `secondaryCta: { label: string; href?: string }`
   Gradient-Overlay mit `from-[rgba(5,40,86,0.6)]` (kein `from-primary/60`).

5. **`TeamRow`** – exportiert eine Komponente mit Props:
   - `imageUrl: string`, `imageAlt: string`
   - `tag: string` (Pill oben links)
   - `title: string`, `description: string`
   - `meta?: string` (optional: "Di 10:00 – 11:00 Uhr · Trainer: XY")
   - `href: string`
   - `imageLeft?: boolean` (default: `true` → gerade Index; `false` → ungerade Index)

6. **`fitness/TeamsInAbteilung.tsx`** und **`gesundheitssport/TeamsInAbteilung.tsx`**
   verwenden `<TeamRow>` intern. Keine inline-Duplikation mehr.

7. **`fitness/page.tsx`** und **`gesundheitssport/page.tsx`** nutzen alle 5 neuen Komponenten.
   Die inline-HTML-Blöcke für Stats, InfoBox, CTA, Hero sind entfernt.

8. **Kein visueller Unterschied**: Playwright-Screenshots von fitness und gesundheitssport
   vor/nach sind gleich.

9. **Build fehlerfrei** (`npm run build`).

---

## Technische Notizen

### Wichtig: Hell-Design (CDN Tailwind v3)

Alle Komponenten werden auf **Hell-Design-Seiten** eingesetzt. Sie müssen mit den CSS-Klassen aus
`lib/designHell.ts` funktionieren (unlayered, kein `@layer`-Wrapper nötig).
- Kein `from-primary/60` → immer `from-[rgba(5,40,86,0.6)]`
- `<img>` mit `{/* eslint-disable-next-line @next/next/no-img-element */}`
- Keine `next/image` verwenden

### StatsBar – Interface

```tsx
type StatsBarItem = { value: string; label: string; accent: 'primary' | 'secondary' }

// Beispiel-Nutzung:
const FITNESS_STATS: StatsBarItem[] = [
  { value: '15+', label: 'Kurse Pro Woche',      accent: 'primary' },
  { value: '300+', label: 'Aktive Mitglieder',   accent: 'secondary' },
  { value: '80 J.', label: 'Vereinstradition',   accent: 'primary' },
  { value: '6', label: 'Lizenzierte Trainer',     accent: 'secondary' },
]
```

### TeamRow – Benutzung in TeamsInAbteilung

```tsx
// components/fitness/TeamsInAbteilung.tsx (nach Refactoring)
import TeamRow from '@/components/shared/sections/TeamRow'

const TEAMS = [
  { imageUrl: '...', imageAlt: 'LadyFit', tag: 'Bleib in Bewegung', title: 'LadyFit', ... },
  { imageUrl: '...', imageAlt: 'ManFit',  tag: 'Man(n) bewegt sich', title: 'ManFit',  ... },
  // ...
]

export default function TeamsInAbteilung() {
  return (
    <section className="bg-surface-container-low py-12">
      <div className="max-w-7xl mx-auto px-6">
        <h2 ...>Unsere Übungsgruppen</h2>
        <div className="space-y-10">
          {TEAMS.map((team, i) => (
            <TeamRow key={team.title} {...team} imageLeft={i % 2 === 0} />
          ))}
        </div>
      </div>
    </section>
  )
}
```

### Reihenfolge der Umsetzung

1. `StatsBar` bauen + fitness/gesundheitssport umstellen (einfachster Start)
2. `KursInfoBox` bauen + umstellen
3. `AbteilungCta` bauen + umstellen
4. `TeamRow` bauen + TeamsInAbteilung-Komponenten umstellen
5. `AbteilungHero` bauen + umstellen (aufwändigster Schritt, deshalb zum Schluss)
6. Screenshots + Build

### Wo der aktuelle Code steht (Zeilen-Referenz)

| Komponente | fitness/page.tsx | gesundheitssport/page.tsx |
|------------|-----------------|--------------------------|
| Hero | Z. 38–56 | Z. 35–53 |
| Stats | Z. 58–80 | Z. 55–77 |
| KursInfoBox | Z. 259–270 | Z. 188–200 |
| CTA-Banner | Z. 312–326 | Z. 241–255 |
| TeamsInAbteilung | via Import | via Import |

---

## Out of Scope

- Badminton, Leichtathletik, Tischtennis, Fußball → separates Ticket (S-003)
- Kursplan-Tabelle (zu viele Unterschiede)
- Unterseiten (pilates, achtsamkeit, etc.) – erhalten eigene Stories wenn nötig
