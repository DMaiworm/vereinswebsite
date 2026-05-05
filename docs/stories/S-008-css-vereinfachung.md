# S-008 – CSS-Vereinfachung: CDN-Cleanup, Font-Aliases & Route Group für Hell-Thema

**Status:** done  
**Bereich:** `app/globals.css`, `app/(dept)/`, 24× `app/*/layout.tsx`, `app/badminton/layout.tsx`, `app/leichtathletik/layout.tsx`

---

## Ziel

Drei strukturelle Vereinfachungen nach der Tailwind-v4-Migration (S-007):

0. **CDN-Cleanup Badminton + Leichtathletik**: Zwei Layouts haben noch veraltetes CDN-Pattern (doppelte Font-Deklarationen, doppelter Material-Symbols-Link, `<div>`-Wrapper statt Body-Hintergrund). Auf das neue v4-Minimal-Pattern reduzieren.
1. **Font-Family-Aliases kollabieren**: 7 identische CSS-Klassen (alle → Lexend) auf einen kombinierten Selektor reduzieren. Keine Seiteneffekte, kein Umbenennen in `.tsx`-Dateien.
2. **Route Group `(dept)`**: `body{background:#fbf9f8}` aus 26 einzelnen `layout.tsx`-Dateien in ein zentrales Group-Layout heben. Änderung am Hintergrundwert dann an einer Stelle statt 26.

---

## Akzeptanzkriterien

### AC-0 – CDN-Cleanup: Badminton + Leichtathletik

Beide Layouts (`app/badminton/layout.tsx`, `app/leichtathletik/layout.tsx`) werden von diesem Muster:
```tsx
import { Lexend, Plus_Jakarta_Sans } from 'next/font/google'

const lexend = Lexend({ ... })
const jakarta = Plus_Jakarta_Sans({ ... })

export default function Layout({ children }) {
  return (
    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined..." />
      <div className={`${lexend.variable} ${jakarta.variable} font-body bg-mist text-ink-soft antialiased`}>
        {children}
      </div>
    </>
  )
}
```

auf das v4-Minimal-Pattern reduziert (Metadata bleibt, alles andere fliegt raus):
```tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '...',
  description: '...',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
```

Begründung: `app/layout.tsx` lädt Lexend, Plus Jakarta Sans und Material Symbols bereits global. Doppelte Deklarationen verlangsamen den Build und können zu Font-Flash führen.

### AC-1 – Font-Alias Collapse (globals.css)

Die folgenden 7 einzelnen CSS-Regeln in `globals.css` (aktuell Zeilen 266–272):
```css
.font-body-md     { font-family: var(--font-lexend, ...); }
.font-body-lg     { font-family: var(--font-lexend, ...); }
.font-label-lg    { font-family: var(--font-lexend, ...); }
.font-label-sm    { font-family: var(--font-lexend, ...); }
.font-headline-lg { font-family: var(--font-lexend, ...); }
.font-headline-md { font-family: var(--font-lexend, ...); }
.font-display-lg  { font-family: var(--font-lexend, ...); }
```
werden ersetzt durch **einen** kombinierten Selektor:
```css
.font-body-md, .font-body-lg,
.font-label-lg, .font-label-sm,
.font-headline-lg, .font-headline-md,
.font-display-lg { font-family: var(--font-lexend, 'Lexend', sans-serif); }
```
`.font-lexend` und `.font-label` bleiben unverändert als separate Regeln.  
Keine `.tsx`-Dateien werden angefasst — die Klassennamen bleiben erhalten.

### AC-2 – Route Group `(dept)` anlegen

- Neue Datei `app/(dept)/layout.tsx`:
  ```tsx
  export default function DeptLayout({ children }: { children: React.ReactNode }) {
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: `body{background:#fbf9f8}` }} />
        {children}
      </>
    )
  }
  ```
- Die folgenden **26** Route-Ordner werden nach `app/(dept)/` verschoben (Next.js Route Group, kein URL-Effekt):
  - achtsamkeit, **badminton**, fitdurchsjahr, fitness, fruehuebtsich-1, fruehuebtsich-2, fussball, geschichte, gesundheitssport, grundschulturnen, impressum, kids-in-bewegung, kinderturnen, ladyfit, **leichtathletik**, manfit, mitgliedschaft, pilates, qi-gong, rueckenfit, skigym, sponsoren, step-aerobic, tanzfitness, tischtennis, vorstand, workout

- In jedem verschobenen Layout: `body{background:#fbf9f8}` aus dem inline `<style>` entfernen.
  - Layouts, die **nur** diese eine Regel hatten, werden zu Pass-through-Layouts (`return <>{children}</>`).
  - `fussball/layout.tsx`: behält `@keyframes marquee`, entfernt nur die `body{}`-Zeile.
  - `geschichte/layout.tsx`: behält `.timeline-line::before`, entfernt nur die `body{}`-Zeile.
  - `badminton/layout.tsx` + `leichtathletik/layout.tsx`: nach AC-0 bereits minimal → keine weitere Änderung nötig.

### AC-3 – Build fehlerfrei

`npm run build` läuft durch ohne TypeScript-Fehler oder fehlende Module.

### AC-4 – Visuelle Regression: keine

Playwright-Screenshot von `/gesundheitssport`, `/fussball`, `/badminton`, `/leichtathletik` zeigt hellen Hintergrund wie vor S-008.

---

## Technische Notizen

### Route Group in Next.js App Router

- Ordnername `(dept)` in Klammern → kein URL-Segment, kein Routing-Effekt
- `app/(dept)/layout.tsx` ist ein **verschachteltes** Layout nach `app/layout.tsx`
- URLs bleiben identisch: `app/(dept)/gesundheitssport/page.tsx` → `/gesundheitssport`

### Reihenfolge der Umsetzung

1. `app/badminton/layout.tsx` + `app/leichtathletik/layout.tsx` auf Minimal-Pattern reduzieren (AC-0)
2. `app/(dept)/layout.tsx` anlegen (AC-2)
3. Alle 26 Ordner per `git mv` verschieben (behält Git-History)
4. Aus jedem Layout die `body{}`-Zeile entfernen
5. `globals.css` Font-Alias-Collapse (AC-1)
6. `npm run build`
7. Playwright-Screenshots

### Nicht in Scope

- `text-*` Size-Aliases via `@theme inline` (Vorschlag 3 aus PM-Session — riskant, zurückgestellt)
- Umbenennen der Font-Klassen in `.tsx`-Dateien
- Inhaltliche Änderungen an Seiten

---

## Betroffene Dateien

**Neu:**
- `app/(dept)/layout.tsx`

**Geändert (AC-0):**
- `app/badminton/layout.tsx`
- `app/leichtathletik/layout.tsx`

**Verschoben (26 Ordner, je `layout.tsx` + `page.tsx`):**
- `app/(dept)/achtsamkeit/`, `app/(dept)/badminton/`, `app/(dept)/fitdurchsjahr/`, `app/(dept)/fitness/`, `app/(dept)/fruehuebtsich-1/`, `app/(dept)/fruehuebtsich-2/`, `app/(dept)/fussball/`, `app/(dept)/geschichte/`, `app/(dept)/gesundheitssport/`, `app/(dept)/grundschulturnen/`, `app/(dept)/impressum/`, `app/(dept)/kids-in-bewegung/`, `app/(dept)/kinderturnen/`, `app/(dept)/ladyfit/`, `app/(dept)/leichtathletik/`, `app/(dept)/manfit/`, `app/(dept)/mitgliedschaft/`, `app/(dept)/pilates/`, `app/(dept)/qi-gong/`, `app/(dept)/rueckenfit/`, `app/(dept)/skigym/`, `app/(dept)/sponsoren/`, `app/(dept)/step-aerobic/`, `app/(dept)/tanzfitness/`, `app/(dept)/tischtennis/`, `app/(dept)/vorstand/`, `app/(dept)/workout/`

**Geändert (body{} entfernen, AC-2):**
- Alle 26 verschobenen `layout.tsx`-Dateien
- `app/globals.css` (Font-Alias-Collapse, AC-1)

**Nicht angefasst:**
- Alle `page.tsx`-Dateien
- `app/layout.tsx` (Root)
- `components/`
