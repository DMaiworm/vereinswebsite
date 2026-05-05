# S-007 – Tailwind-v4-Migration: CDN-Boilerplate aus allen Layouts entfernen

## Status
`done`

## Ziel
25 Layouts laden aktuell CDN Tailwind v3 per `document.write` — obwohl das Root-Layout und `globals.css` bereits alles bereitstellen, was sie brauchen. Das erzeugt zwei parallele CSS-Systeme, schwergewichtige Layout-Dateien, und fühlt sich wie ein Workaround an. Ziel: alle Seiten laufen auf Project-Tailwind v4. Die drei `lib/design*.ts`-Dateien werden danach gelöscht.

## Betroffene Personen
Entwickler (kein User-sichtbarer Unterschied; kein Feature-Change).

## Ist-Zustand

| Gruppe | Layouts | Extra-CSS |
|--------|---------|-----------|
| A: reine CDN_CSS + IMAGE_FALLBACK_SCRIPT | 15× (achtsamkeit, fitdurchsjahr, fruehuebtsich-1/-2, grundschulturnen, kids-in-bewegung, ladyfit, manfit, pilates, qi-gong, rueckenfit, skigym, step-aerobic, tanzfitness, tischtennis, workout) | keins |
| B: CDN_CSS + kinetic-gradient + .py-xl/.p-lg | 3× (gesundheitssport, fitness, kinderturnen) | `.kinetic-gradient` ← bereits in globals.css! `.py-xl`, `.p-lg` |
| C: CDN_CSS + VEREINS_EXTRA_CSS | 3× (impressum, vorstand, mitgliedschaft) | `.vanguard-gradient` |
| D: CDN_CSS + VEREINS_EXTRA_CSS + page-CSS | 2× (sponsoren + .no-scrollbar, geschichte + .timeline-line) | `.no-scrollbar`, `.timeline-line::before` |
| E: CDN_CSS + @keyframes marquee | 1× (fussball) | `@keyframes marquee` |

## Warum CDN überhaupt nötig war (und warum nicht mehr)

CDN Tailwind v3 wurde gebraucht, weil sein Preflight als **unlayered** CSS kommt und Tailwind v4-Utilities (in `@layer utilities`) in der Cascade schlägt. Workaround: CDN_CSS mit unlayered Overrides injizieren.

Heute ist das obsolet:
- Root `app/layout.tsx` lädt **Lexend, Plus Jakarta Sans, Material Symbols** global — Kind-Layouts brauchen keine Fonts mehr
- `globals.css` definiert alle MD3-Farben via `@theme inline` — v4 generiert `bg-primary`, `text-on-surface`, `border-outline` etc. automatisch
- `globals.css` hat bereits unlayered Overrides für BaseNav/SiteFooter (`bg-navy`, `text-gold` etc.)
- CDN fehlt gar nicht: kein CDN-Preflight = kein Konflikt

## Akzeptanzkriterien

### globals.css-Ergänzungen
- [x] **AC-1** `.vanguard-gradient` hinzugefügt (von VEREINS_EXTRA_CSS aus designBlau)
- [x] **AC-2** `.no-scrollbar` hinzugefügt (bisher nur in sponsoren/layout.tsx)
- [x] **AC-3** `.py-xl` und `.p-lg` hinzugefügt (bisher in gesundheitssport/fitness/kinderturnen)
- [x] **AC-4** Typography-Utilities ergänzt: `.text-display-lg`, `.text-headline-lg`, `.text-headline-md`, `.text-body-lg`, `.text-body-md`, `.text-label-lg`, `.text-label-sm`, `.font-lexend` (bisher nur in CDN_CSS/designHell vorhanden)

### Root Layout
- [x] **AC-5** `app/layout.tsx` enthält IMAGE_FALLBACK_SCRIPT als globales `<script dangerouslySetInnerHTML>` (einmalig, global statt in 15× Layouts wiederholt)

### Layout-Migration (22 Layouts werden zu reinen Pass-through)
- [x] **AC-6** Die folgenden 22 Layouts haben kein CDN-Boilerplate mehr; Inhalt: nur `export const metadata` + `export default function Layout({ children }) { return <>{children}</> }`:
  - achtsamkeit, fitdurchsjahr, fruehuebtsich-1, fruehuebtsich-2, grundschulturnen, kids-in-bewegung, ladyfit, manfit, pilates, qi-gong, rueckenfit, skigym, step-aerobic, tanzfitness, tischtennis, workout *(Gruppe A)*
  - gesundheitssport, fitness, kinderturnen *(Gruppe B — .kinetic-gradient/.py-xl/.p-lg jetzt in globals.css)*
  - impressum, vorstand, mitgliedschaft *(Gruppe C — .vanguard-gradient jetzt in globals.css)*
  - sponsoren *(Gruppe D — .no-scrollbar jetzt in globals.css)*

### Layout-Migration (3 Layouts behalten minimale `<style>`-Blöcke)
- [x] **AC-7** `app/fussball/layout.tsx`: nur `@keyframes marquee` bleibt als `<style>` (genuinely seiten-spezifisch)
- [x] **AC-8** `app/geschichte/layout.tsx`: nur `.timeline-line::before` + Media-Query bleibt als `<style>`

### Cleanup
- [x] **AC-9** `lib/brandCss.ts` gelöscht
- [x] **AC-10** `lib/designBlau.ts` gelöscht
- [x] **AC-11** `lib/designHell.ts` gelöscht

### Qualität
- [x] **AC-12** `npm run build` fehlerfrei (TypeScript-Fehler nach Löschen der lib/-Dateien behandelt)
- [x] **AC-13** Playwright-Screenshots für ≥3 repräsentative Seiten: gesundheitssport, sponsoren, fussball (kein Layout-Bruch, keine fehlenden Farben, Icons korrekt)
- [x] **AC-14** `CLAUDE.md` aktualisiert: CDN-Pattern als veraltet markiert, neuer Hinweis "Neue Seiten brauchen kein CDN — globals.css + root layout reichen"

## Technische Notizen

### Migration pro Layout (Schritt-für-Schritt-Muster)
```tsx
// VORHER
import { CDN_CSS, cdnScript, IMAGE_FALLBACK_SCRIPT } from '@/lib/designHell'
export default function XyzLayout({ children }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CDN_CSS }} />
      <script dangerouslySetInnerHTML={{ __html: cdnScript() }} />
      <script dangerouslySetInnerHTML={{ __html: IMAGE_FALLBACK_SCRIPT }} />
      {children}
    </>
  )
}

// NACHHER
export default function XyzLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
```

### Opacity-Modifier: kein Problem in v4
CDN_CSS enthielt explizite Opacity-Overrides weil CDN v3 `from-primary/60` mit hex-Farben nicht kann.
Tailwind v4 unterstützt das nativ via CSS-Variablen — kein Handlungsbedarf.

### globals.css Ergänzungsblock (am Ende vor oder nach letztem Block einfügen)
```css
/* ─── Vanguard / Vereinsseiten ────────────────────────────────────────────── */
.vanguard-gradient { background: linear-gradient(135deg, #052856 0%, #0a408a 100%); }

/* ─── Scrollbar helper ───────────────────────────────────────────────────── */
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

/* ─── Legacy spacing helpers (Gesundheitssport / Fitness / Kinderturnen) ─── */
.py-xl { padding-top: 5rem; padding-bottom: 5rem }
.p-lg  { padding: 3rem }

/* ─── Typography utilities (bisher nur in CDN_CSS definiert) ─────────────── */
.text-display-lg  { font-size: 3rem; line-height: 1.2; font-weight: 700; letter-spacing: -0.02em; }
.text-headline-lg { font-size: 2rem; line-height: 1.3; font-weight: 600; letter-spacing: -0.01em; }
.text-headline-md { font-size: 1.5rem; line-height: 1.4; font-weight: 600; }
.text-body-lg     { font-size: 1.125rem; line-height: 1.6; font-weight: 400; }
.text-body-md     { font-size: 1rem; line-height: 1.5; font-weight: 400; }
.text-label-lg    { font-size: 0.875rem; line-height: 1.5; font-weight: 600; letter-spacing: 0.05em; }
.text-label-sm    { font-size: 0.75rem; line-height: 1.5; font-weight: 500; }
.font-lexend      { font-family: var(--font-lexend, 'Lexend', sans-serif); }
```

### IMAGE_FALLBACK_SCRIPT für Root Layout
```tsx
// In app/layout.tsx, innerhalb von <body>:
<script dangerouslySetInnerHTML={{ __html: `
  document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('img').forEach(function(img) {
      img.addEventListener('error', function() {
        this.classList.add('broken');
        this.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
      });
    });
  });
`}} />
```
Hinweis: `.broken` ist bereits in globals.css definiert (Zeile 101-105).

### Reihenfolge der Umsetzung
1. `globals.css` erweitern (AC-1–4)
2. `app/layout.tsx` — IMAGE_FALLBACK_SCRIPT (AC-5)
3. 22 Pass-through Layouts (AC-6) — einfachste Änderungen, batch-weise
4. 2 Layouts mit mini `<style>` Block (AC-7–8)
5. `lib/brandCss.ts`, `lib/designBlau.ts`, `lib/designHell.ts` löschen (AC-9–11)
6. `npm run build` — TypeScript-Fehler beheben (AC-12)
7. Playwright-Check + CLAUDE.md (AC-13–14)

### Mögliche Stolperfallen
- **Verbleibende Imports**: Grep vor dem Löschen der lib/-Dateien: `grep -r "designHell\|designBlau\|brandCss" app/ components/` — muss leer sein
- **`.bg-primary` in v4 dunkler als erwartet**: Gut, `--color-primary` in globals.css ist `var(--club-primary)` was auf `#003399` default gesetzt ist — aber für Gesundheitssport-Seiten sollte es `#052856` sein. **Prüfen**: Sind diese Seiten durch `data-theme="md3-light"` oder ähnliches von Root-Theme entkoppelt? Falls ja: unlayered `.bg-primary { background-color: #052856 }` in globals.css ergänzen (ist für blau-Pages korrekt; root Page nutzt sowieso `--club-primary` dynamisch)
- **Leere Layouts ohne Fragment**: TypeScript erwartet bei `return <>{children}</>` kein Fragment — direkt `return children as React.ReactElement` ist nicht erlaubt; `<>{children}</>` ist korrekt

## Referenz-Dateien (nicht ändern)
- `app/layout.tsx` — Root (erweitern um IMAGE_FALLBACK_SCRIPT)
- `app/globals.css` — erweitern
- `app/badminton/layout.tsx` — Vorlage wie ein "leeres v4 Layout" aussieht
- `app/leichtathletik/layout.tsx` — zweite Vorlage (hat noch redundante Font-Deklaration)
