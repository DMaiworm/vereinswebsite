# S-004 – Kurs-Unterseiten Komponenten-Baukasten

**Status:** done  
**Erstellt:** 2026-05-04  
**Bereich:** components/shared/sections/, app/ladyfit/, app/manfit/, app/step-aerobic/, app/tanzfitness/, app/workout/, app/fitdurchsjahr/, app/skigym/, app/achtsamkeit/, app/pilates/, app/rueckenfit/, app/qi-gong/

---

## Problem

Alle 11 Kurs-Unterseiten (7× Fitness, 4× Gesundheitssport) haben exakt dieselbe
7-Sektionen-Struktur als **copy-paste inline HTML** (~250 Zeilen pro Datei = ~2.750 Zeilen Duplikat).
Jede Textänderung an Trainer- oder CTA-Layout muss in 11 Dateien gepflegt werden.
Zudem enthält jede `page.tsx` einen **identischen 10-Zeilen Image-Fallback-Script**, der besser in
die Layouts gehört.

---

## Design-Status

| Bereich | Status |
|---------|--------|
| Alle 11 `layout.tsx` auf `designHell.ts` | ✅ bereits erledigt (S-001) |
| Inline-Sektionen als Komponenten | ❌ noch nicht |
| Image Fallback Script in layouts | ❌ noch nicht |

---

## Ist-Analyse: Sektion-Inventar aller 11 Seiten

Alle 11 Seiten haben exakt diese 7 Sektionen in dieser Reihenfolge (verifiziert):

| Nr. | Kommentar im Code | Identisch? | Props-Aufwand |
|-----|-------------------|-----------|---------------|
| 1 | `Hero Section` | Struktur 100% gleich | mittel |
| 2 | `Info Grid (Floating)` | 100% gleich | gering |
| 3 | `Content Split Section` | 100% gleich | mittel |
| 4 | `Bento Grid: Focus Areas` | 100% gleich | hoch |
| 5 | `Das Konzept Section` | 100% gleich | mittel |
| 6 | `Trainer Section` | 100% gleich | gering |
| 7 | `CTA Section` | fast gleich (leicht diff. Text) | gering |

Außerdem: identischer `Image error fallback`-Script in allen 11 `page.tsx` (10 Zeilen).

---

## Ziel

Sieben neue Komponenten in `components/shared/sections/` + Image-Fallback-Bereinigung:

```
components/shared/sections/
  KursHero.tsx           ← Hero (dunkles Gradient, gelber CTA-Button-Variante)
  KursInfoGrid.tsx       ← Floating 3-Card Info-Leiste (Kurszeit, Ort, Mitzubringen)
  ContentSplit.tsx       ← 2-spaltig Text+Bild+Checkmarks
  BentoSchwerpunkte.tsx  ← 6-col Bento-Grid mit 2 Featured + 3 Small Cards
  KonzeptSection.tsx     ← 2-spaltig Bild+Quote-Overlay + Text + Blockquote
  TrainerCard.tsx        ← Horizontale Trainer-Karte (Foto-Kreis + Bio + Skills)
  KursCtaSection.tsx     ← CTA-Banner (bg-primary-container, Texturmuster, 2 Buttons)
```

Danach werden alle 11 `page.tsx` auf diese Komponenten umgestellt.
Jede Seite schrumpft von ~250 auf ~50 Zeilen.

---

## Akzeptanzkriterien

1. **`KursHero`** – Props: `imageSrc`, `imageAlt`, `badge`, `title`, `subtitle`,
   `primaryCta: { label: string }`, `secondaryCta: { label: string }`.
   Gradient: `from-black/90 via-black/50 to-transparent` (abweichend von AbteilungHero).
   Primär-Button: `bg-secondary-container text-on-secondary-fixed` (nicht gelb).

2. **`KursInfoGrid`** – Props: `kurszeit: string`, `ort: string`, `mitzubringen: string`.
   3 floating Cards mit -mt-12, Icons: `schedule`, `location_on`, `shopping_bag`.

3. **`ContentSplit`** – Props: `title: string`, `paragraphs: string[]`,
   `checkItems: string[]`, `imageSrc: string`, `imageAlt: string`.
   Layout: Text links, Bild rechts mit gelbem Glow-Blob.

4. **`BentoSchwerpunkte`** – Props:
   `title: string`,
   `featured: [{ icon: string; title: string; description: string }, { icon: string; title: string; description: string }]`
   (erstes Card: weiß/hell, zweites Card: `bg-primary-container`/dunkel),
   `small: { icon: string; title: string; description: string }[]` (2–3 Items, je `md:col-span-2`).

5. **`KonzeptSection`** – Props: `imageSrc: string`, `imageAlt: string`,
   `overlayQuote: string`, `paragraphs: string[]`, `blockquote: string`.
   Bild links mit gelbem Glow + weißem Quote-Overlay-Card.

6. **`TrainerCard`** – Props: `role: string`, `name: string`, `bio: string`,
   `skills: string[]`, `imageSrc: string`, `imageAlt: string`.
   Kreisfoto (`w-48 h-48 rounded-full border-4 border-secondary-container`).

7. **`KursCtaSection`** – Props: `title: string`, `description: string`,
   `primaryLabel: string`, `secondaryLabel: string`, `footnote?: string`.
   Hintergrund: `bg-primary-container`, Texturmuster-Overlay, zentrierter Text.

8. **Image Fallback** – Der identische 10-Zeilen-Script wird aus allen 11 `page.tsx`
   entfernt. Stattdessen wird er als Konstante `IMAGE_FALLBACK_SCRIPT` aus
   `lib/designHell.ts` exportiert und in alle 11 `layout.tsx` eingefügt.

9. **Alle 11 `page.tsx`** nutzen die 7 neuen Komponenten. Kein inline-HTML mehr
   für die genannten Sektionen.

10. **Kein visueller Unterschied** – Playwright-Screenshots vor/nach sind gleich.

11. **Build fehlerfrei** (`npm run build`).

---

## Technische Notizen

### Wichtig: Gradient in KursHero ≠ AbteilungHero

| Komponente | Gradient | Verwendung |
|------------|----------|------------|
| `AbteilungHero` (S-002) | `from-[rgba(5,40,86,0.6)] to-transparent` | fitness, gesundheitssport Hauptseiten |
| `KursHero` (diese Story) | `from-black/90 via-black/50 to-transparent` | alle 11 Unterseiten |

CDN Tailwind v3 verarbeitet `from-black/90` korrekt (schwarz hat kein Hex-Problem).
→ Kein RGBA-Workaround nötig.

### Image Fallback Script – Aufbau in designHell.ts

```ts
export const IMAGE_FALLBACK_SCRIPT = `
  document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('img').forEach(function(img) {
      img.addEventListener('error', function() {
        this.style.background = 'repeating-linear-gradient(45deg,#1a3260 0,#1a3260 2px,#223e6d 2px,#223e6d 14px)';
        this.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
      });
    });
  });
`
```

Dann in den 11 layout.tsx:
```tsx
import { CDN_CSS, cdnScript, IMAGE_FALLBACK_SCRIPT } from '@/lib/designHell'

export default function XyzLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CDN_CSS }} />
      <script dangerouslySetInnerHTML={{ __html: cdnScript() }} />
      <script dangerouslySetInnerHTML={{ __html: IMAGE_FALLBACK_SCRIPT }} />
      {children}
    </>
  )
}
```

### BentoSchwerpunkte – Bento-Grid Muster

```tsx
// Immer: 2 Featured Cards (3-span) + 2–3 Small Cards (2-span)
// Featured[0]: weißer Hintergrund, bg-primary-fixed Icon-Background
// Featured[1]: bg-primary-container dunkel, weißer Text
// Small[n]: weiß, Icon ohne Hintergrundbox

<div className="grid grid-cols-1 md:grid-cols-6 gap-6">
  <div className="md:col-span-3 bg-white ...">...</div>         {/* featured[0] */}
  <div className="md:col-span-3 bg-primary-container ...">...</div>  {/* featured[1] */}
  {small.map(item => <div className="md:col-span-2 bg-white ...">...</div>)}
</div>
```

### KonzeptSection – Quote-Overlay-Karte

Das Bild hat im Original immer:
- `order-2 lg:order-1` (auf Desktop links)
- Gelb-Glow: `absolute -top-4 -left-4 w-24 h-24 bg-[rgba(253,224,0,0.20)] rounded-3xl -z-10 rotate-6 blur-xl`
- Quote-Karte: `absolute bottom-6 right-6 bg-white/80 backdrop-blur-md p-6 rounded-xl`

### Reihenfolge der Umsetzung

1. `IMAGE_FALLBACK_SCRIPT` → `designHell.ts` + 11 layouts (kein visueller Eingriff)
2. `KursInfoGrid` + `TrainerCard` + `KursCtaSection` (einfachste Props, höchster Impact)
3. `KursHero` (wie AbteilungHero aber andere Gradient/Button-Variante)
4. `ContentSplit` (paragraphs[], checkItems[])
5. `KonzeptSection` (overlayQuote + Blockquote)
6. `BentoSchwerpunkte` (komplexeste Props)
7. Alle 11 page.tsx umstellen
8. Screenshots + Build

### Betroffene Dateien (Consumer)

Alle 11 page.tsx erhalten dieselben 7 Imports und werden auf Komponenten umgestellt:
- `app/ladyfit/page.tsx`
- `app/manfit/page.tsx`
- `app/step-aerobic/page.tsx`
- `app/tanzfitness/page.tsx`
- `app/workout/page.tsx`
- `app/fitdurchsjahr/page.tsx`
- `app/skigym/page.tsx`
- `app/achtsamkeit/page.tsx`
- `app/pilates/page.tsx`
- `app/rueckenfit/page.tsx`
- `app/qi-gong/page.tsx`

---

## Out of Scope

- Navigation-Inhalte (jede Seite hat eigene Nav-Links)
- Inhaltliche Texte / Bilder (bleiben hardcoded in den page.tsx-Dateien)
- Tischtennis, Fußball, Badminton → S-003
- Neue Seiten oder neue Kurse

---

## Impact

| Vorher | Nachher |
|--------|---------|
| 11 Seiten × ~250 Zeilen = ~2.750 Zeilen HTML | 11 Seiten × ~50 Zeilen = ~550 Zeilen |
| 1 Änderung am Trainer-Layout → 11 Dateien anfassen | 1 Änderung → 1 Datei |
| Image Fallback Script: 11× inline | 1× in designHell.ts |
