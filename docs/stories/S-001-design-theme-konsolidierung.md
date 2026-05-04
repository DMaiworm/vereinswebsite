# S-001 – Design-Theme-Konsolidierung: designBlau.ts & designHell.ts

**Status:** done  
**Erstellt:** 2026-05-04  
**Bereich:** lib/, alle Abteilungs-Layouts  

---

## Problem

18 Abteilungsseiten haben je eine eigene `layout.tsx`. In 11 davon (alle "Hell"-Seiten) ist
ein identischer ~150-Zeilen-Block copy-paste: `PILATES_OVERRIDES` + `twConfig`. Ein
Tippfehler oder Design-Update muss 11× manuell nachgezogen werden.

---

## Ist-Analyse: 4 Layout-Muster

| Muster | Abteilungen | Kern-Problem |
|--------|-------------|--------------|
| **A – CDN Blau** (brandCss.cdnScript) | fussball, tischtennis | ✅ gut – nutzt brandCss |
| **B – CDN Blau + Primärfarb-Override** | gesundheitssport, fitness | teilweise zentralisiert, primary=#001433 |
| **C – CDN Hell** (Pilates-Pattern, copy-paste) | pilates, achtsamkeit, manfit, ladyfit, workout, skigym, fitdurchsjahr, tanzfitness, rueckenfit, qi-gong, step-aerobic | **11 identische Blöcke**, primary=#001433, surface warm-white |
| **D – next/font ohne CDN** | badminton, leichtathletik | anderes System, **Sonderfall – OUT OF SCOPE** |

### Was Muster C konkret dupliziert (pro Datei ~150 Zeilen):
- `PILATES_OVERRIDES`: 40+ Zeilen unlayered CSS-Overrides (primary=#001433, typography-tokens, bg-glass, material-symbols)
- `twConfig` JSON: ~90 Zeilen (alle MD3-Farben, Spacing-Map, fontFamily, fontSize, borderRadius)
- Sogar der Kommentar `// Pilates uses primary: #001433` steht wörtlich in allen Dateien

### Unterschied zwischen Muster B und C:
- **Muster B** (gesundheitssport, fitness): nutzt `cdnScript({ colors: GS_COLORS })` — kein eigenes twConfig-JSON
- **Muster C** (Pilates-Gruppe): hat volles inline-twConfig mit identischen Farben, primary=#001433

→ Muster B und C sind **dasselbe Design** (primary=#001433), nur unterschiedlich implementiert.
Muster B kann in Schritt 3 auf designHell.ts migriert werden.

---

## Ziel-Architektur

```
lib/
  brandCss.ts       ← bleibt unverändert (Quelle für designBlau)
  designBlau.ts     ← NEU: kapselt brandCss für Blau-Seiten (primary=#052856)
  designHell.ts     ← NEU: Pilates-Pattern konsolidiert (primary=#001433)
```

Jede schlank gemachte layout.tsx sieht danach so aus (7 Zeilen statt 150):

```tsx
import { CDN_CSS, cdnScript } from '@/lib/designHell'

export const metadata = { title: 'Xyz | SG Hünstetten' }

export default function XyzLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CDN_CSS }} />
      <script dangerouslySetInnerHTML={{ __html: cdnScript() }} />
      {children}
    </>
  )
}
```

---

## Akzeptanzkriterien

1. **`lib/designHell.ts` existiert** und exportiert:
   - `CDN_CSS`: kombinierter String aus `brandCss.CDN_CSS` + Hell-Overrides (primary=#001433, typography, bg-glass, material-symbols)
   - `cdnScript()`: gibt fertige document.write-Zeile mit vollem twConfig zurück
   - `DESIGN_HELL_TW_CONFIG`: das twConfig-Objekt (für optionale direkte Nutzung)

2. **`lib/designBlau.ts` existiert** und re-exportiert aus brandCss.ts:
   ```ts
   export { CDN_CSS, cdnScript, MD3_COLORS } from './brandCss'
   ```
   (kein neuer Code, nur ein sprechender Alias)

3. **Alle 11 "Hell"-Layouts** (Muster C) importieren aus `designHell.ts`, Layout-Body ≤ 10 Zeilen.

4. **fussball + tischtennis** importieren aus `designBlau.ts` statt direkt aus `brandCss.ts`.

5. **gesundheitssport + fitness** (Muster B) werden ebenfalls auf `designHell.ts` migriert
   (prüfen: sind die Overrides in B ein Subset von C?).

6. **Kein duplizierter PILATES_OVERRIDES-Block** mehr in irgendeiner `layout.tsx`.

7. **Kein visueller Unterschied**: Playwright-Screenshot vor/nach für mindestens
   pilates, achtsamkeit, fussball, tischtennis zeigt pixel-identisches Ergebnis.

8. **Badminton + Leichtathletik** bleiben unverändert (Sonderfall next/font, OUT OF SCOPE).

---

## Technische Notizen

### designHell.ts – Aufbau

```ts
import { CDN_CSS as BASE_CSS, MD3_COLORS } from './brandCss'

const HELL_COLORS = {
  ...MD3_COLORS,
  primary:            '#001433',
  'primary-container':'#052856',
  'on-primary-container': '#7690c4',
}

const HELL_OVERRIDES = `
  .bg-primary                 { background-color: #001433 }
  .bg-primary-container       { background-color: #052856 }
  .text-primary               { color: #001433 }
  /* ... alle Overrides aus PILATES_OVERRIDES ... */
`

export const CDN_CSS = BASE_CSS + HELL_OVERRIDES

export const DESIGN_HELL_TW_CONFIG = {
  darkMode: 'class',
  corePlugins: { preflight: false },
  theme: {
    extend: {
      colors: HELL_COLORS,
      spacing: { xl:'80px', lg:'48px', md:'24px', sm:'12px', xs:'4px', base:'8px', gutter:'24px' },
      fontFamily: { /* Lexend für alle Tokens */ },
      fontSize:   { /* display-lg bis label-sm */ },
      borderRadius: { DEFAULT:'0.25rem', lg:'0.5rem', xl:'0.75rem', full:'9999px' },
    },
  },
}

export function cdnScript(): string {
  return `tailwind={config:${JSON.stringify(DESIGN_HELL_TW_CONFIG)}};document.write('<scr'+'ipt src="https://cdn.tailwindcss.com?plugins=forms,container-queries"><\\/scr'+'ipt>');`
}
```

### designBlau.ts – Aufbau (minimal)

```ts
// Sprechender Alias – brandCss.ts bleibt die eigentliche Quelle
export { CDN_CSS, cdnScript, MD3_COLORS, CDN_TW_CONFIG } from './brandCss'
```

### Reihenfolge der Umsetzung (wichtig!)

1. `designHell.ts` erstellen und Pilates-Seite damit testen (Screenshot)
2. `designBlau.ts` erstellen, Fußball testen (Screenshot)
3. Alle 11 Hell-Layouts migrieren (mechanisch, kein Design-Eingriff)
4. Muster-B-Seiten (gesundheitssport, fitness) migrieren – prüfen ob die extraCss-Blöcke
   in designHell.ts aufgehen oder eine separate Funktion brauchen
5. Blau-Layouts (fussball, tischtennis) auf designBlau.ts umlenken

### Offene Frage vor Start

Muster B (gesundheitssport, fitness) hat zwei Extra-Overrides die Muster C nicht hat:
```css
.bg-primary\/10  { background-color: rgba(0,20,51,0.1) }
.from-primary-container\/60 { ... }
.border-outline-variant\/10 { ... }
```
→ Diese können entweder **in designHell.ts aufgenommen** werden (kein Schaden für Pilates-Seiten)
  oder als optionaler Parameter `cdnScript({ extraCss: '...' })` übergeben werden.
  **Empfehlung: in designHell.ts aufnehmen** – alle Seiten profitieren.

### Keine visuellen Änderungen erlaubt

Dies ist **reines Refactoring**. Die page.tsx-Dateien werden nicht angefasst.
Jede layout.tsx produziert nach der Migration identisches HTML/CSS.

---

## Out of Scope

- Badminton, Leichtathletik (next/font-System, separates Ticket wenn gewünscht)
- sponsoren/layout.tsx (nicht CDN-Tailwind)
- Inhaltliche Design-Änderungen jeglicher Art
- Neue Abteilungsseiten
