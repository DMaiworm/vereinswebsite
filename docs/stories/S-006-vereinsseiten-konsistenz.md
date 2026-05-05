# S-006 – Vereinsseiten Design-Konsistenz

## Meta
- **Status:** done
- **Bereich:** app/impressum, app/vorstand, app/mitgliedschaft, app/geschichte, app/sponsoren, lib/designBlau.ts
- **Typ:** Technische Konsolidierung (kein visueller Umbau)

## Ziel

Die fünf Vereinsseiten (Impressum, Vorstand, Mitgliedschaft, Geschichte, Sponsoren) haben
identischen Aufbau (CDN Tailwind + BaseNav + SiteFooter), aber durch Copy-Paste entstanden
Mini-Abweichungen in CSS-Definitionen, Imports und Nav-Konfigurationen. Diese Story bringt
alle fünf auf einen einheitlichen Stand – ohne sichtbare Designänderungen.

## Ist-Zustand (konkrete Bugs)

| # | Befund | Betroffene Seiten |
|---|--------|-------------------|
| B1 | `.kinetic-slant` macht auf jeder Seite etwas anderes (rotate vs. skewX, verschiedene Winkel) | alle 5 |
| B2 | Impressum definiert `.vanguard-slant` statt `.kinetic-slant` – der Klassenname ist falsch | impressum |
| B3 | `.vanguard-gradient` hat zwei Endfarben: `#0a408a` vs. `#223E6D` | geschichte vs. rest |
| B4 | Sponsoren importiert von `@/lib/brandCss` statt `@/lib/designBlau` | sponsoren |
| B5 | Sponsoren hat kein `IMAGE_FALLBACK_SCRIPT` im Layout; es sitzt inline in page.tsx | sponsoren |
| B6 | `homeHref` ist auf Impressum/Vorstand/Sponsoren absolut (`/`), auf Mitgliedschaft/Geschichte relativ (`../`) | alle 5 |
| B7 | Vorstand-Nav verlinkt auf `/vorstand` (absolut) statt `../vorstand` (relativ) | vorstand |
| B8 | Impressum-Nav hat `#vorstand`-Anker, obwohl Vorstand eine eigene Seite ist | impressum |

## Akzeptanzkriterien

### AC-1: Gemeinsame CSS-Konstante in designBlau.ts
`lib/designBlau.ts` exportiert `VEREINS_EXTRA_CSS` mit exakt diesen einheitlichen Definitionen:
```css
.kinetic-slant   { transform: skewX(-6deg); }
.kinetic-rotate  { transform: rotate(-2deg); }
.vanguard-gradient { background: linear-gradient(135deg, #052856 0%, #0a408a 100%); }
```

### AC-2: Alle 5 Layouts nutzen VEREINS_EXTRA_CSS
Jedes Layout kombiniert `CDN_CSS + VEREINS_EXTRA_CSS + eigene_extras`.
Seitenspezifische Extras (z.B. `.timeline-line::before` in Geschichte) bleiben erhalten.

### AC-3: Sponsoren-Layout auf Stand der anderen
- Import von `@/lib/designBlau` statt `@/lib/brandCss`
- `IMAGE_FALLBACK_SCRIPT` aus `@/lib/designHell` im Layout
- Inline-Script aus `app/sponsoren/page.tsx` entfernt

### AC-4: homeHref einheitlich `../` auf allen 5 Seiten
Impressum, Vorstand und Sponsoren: `homeHref="/"` → `homeHref="../"`

### AC-5: Nav-Links relativ und korrekt
- Impressum-Nav: `href: '#vorstand'` → `href: '../vorstand'` (eigene Seite)
- Vorstand-Nav: `href: '/impressum'` → `href: '../impressum'`
- Alle absoluten `/xxx`-Links in den 5 Nav-Arrays → `../xxx`

### AC-6: Einheitliches ctaLabel
Alle 5 Seiten: `ctaLabel="Mitglied werden"` (außer Sponsoren: `"Partner werden"` bleibt)

### AC-7: Build fehlerfrei, visuell unverändert
`npm run build` grün. Keine sichtbaren Designänderungen — nur Code-Qualität.

## Technische Notizen

### Reihenfolge
1. `lib/designBlau.ts` um `VEREINS_EXTRA_CSS` erweitern
2. Layouts in dieser Reihenfolge anpassen (einfach → komplex): mitgliedschaft, geschichte, vorstand, impressum, sponsoren
3. `app/sponsoren/page.tsx` Inline-Script entfernen
4. `npm run build`

### Was NICHT geändert wird
- Keine Komponenten-Refaktorierung
- Keine visuellen Änderungen an den Seiten
- `kinetic-slant` auf Sponsoren und Vorstand zeigt aktuell `rotate(-2deg)` — nach Fix zeigt es `skewX(-6deg)`. Das ist eine Korrektur zum Ursprungs-Design und gilt als intentional.
- Geschichte: `.vanguard-gradient` bisher `#223E6D` als Endfarbe — wird auf `#0a408a` vereinheitlicht (minimal dunklerer Ton, kaum sichtbar)

### Seitenspezifische EXTRA_CSS die bleiben
- Geschichte: `.timeline-line::before` (Pseudo-Element für Zeitstrahl-Linie)
- Impressum: `.text-shadow-kinetic`, `.glass-nav` (werden geprüft, ob sie noch in Verwendung sind; falls nicht → löschen)
- Sponsoren: `.skew-x-negative`, `.no-scrollbar` (seitenspezifisch, bleiben erhalten)

## Betroffene Dateien

**Geändert:**
- `lib/designBlau.ts` (neuer Export `VEREINS_EXTRA_CSS`)
- `app/impressum/layout.tsx`
- `app/vorstand/layout.tsx`
- `app/mitgliedschaft/layout.tsx`
- `app/geschichte/layout.tsx`
- `app/sponsoren/layout.tsx`
- `app/impressum/page.tsx` (Nav-Link-Fix)
- `app/vorstand/page.tsx` (homeHref + Nav-Link-Fix + ctaLabel)
- `app/sponsoren/page.tsx` (Inline-Script entfernen + homeHref + ctaLabel)
- `app/mitgliedschaft/page.tsx` (homeHref)
- `app/geschichte/page.tsx` (homeHref)

**Nicht ändern:**
- Alle Komponenten unter `components/`
- `lib/designHell.ts`, `lib/brandCss.ts`
