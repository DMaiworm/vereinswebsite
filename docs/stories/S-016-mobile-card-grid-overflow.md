# S-016 – Mobile: 2-spaltige Karten-Grids erzwingen horizontalen Overflow (Fußball, Tischtennis, Kinderturnen-Kursplan)

## Meta
- **Status:** review
- **Bereich:** `components/fussball/StaffSection.tsx`, `components/tischtennis/TrainerSection.tsx`
  (oder gemeinsame Komponente), Kursplan-Karten auf `app/(dept)/kinderturnen/page.tsx`
- **Typ:** Bugfix (Responsive/Mobile)

## Vorgeschichte

Teil des Mobile-Audits aus S-014 (siehe auch S-015, S-017, S-018). Root Cause vermutlich
verschieden zu S-015 (dort: Text-Wrapping-Problem in Hero-Headlines), hier: feste/zu breite
Grid-Spalten bzw. Flex-Zeilen, die auf 390px nicht kollabieren.

## Ist-Zustand (reproduziert)

### Fußball – Trainerstab-Grid (`/fussball/`)
Die Trainerstab-Karten (Nikolaij Melcher, Arno Grosmann, Marcel Faust, Hans Jung) werden bei
390px Viewport weiterhin zweispaltig nebeneinander gerendert. Die Gesamtseite wird dadurch 572px
statt 390px breit — über die komplette restliche Seite (Hero bis Footer) bleibt rechts eine große
weiße Leerspalte (~180px) stehen, weil die Seite auf die Breite des breitesten Elements
(Trainer-Grid) gestreckt wird. Screenshots:
`docs/Screenshots/screen-mobile-card-grid-overflow-fussball-1.png` (Leerspalte sichtbar von Hero
bis Footer) und `screen-mobile-card-grid-overflow-fussball-2-staffgrid.png` (2-spaltiges Grid,
Ursache).

### Tischtennis – Trainer-Grid (`/tischtennis/`)
Gleiches Symptom: Seite ist 501px statt 390px breit, vermutlich verursacht durch dieselbe
2-spaltige Trainer-Karten-Komponente wie bei Fußball.

### Kinderturnen – Kursplan-Karten (`/kinderturnen/`)
Jede Kurs-Karte im Abschnitt „Aktueller Kursplan" zeigt drei Informationen nebeneinander (Tag/Zeit,
Kursname, Altersgruppen-Badge/Pill). Bei 390px wird die dritte Spalte (Altersgruppen-Pill, z.B.
„3,5–6 Jahre") über den rechten Bildschirmrand hinausgeschoben und ist nur noch als schmaler
Streifen sichtbar („JA…" statt „3,5–6 JAHRE"). Betrifft alle Kurskarten im Abschnitt. Screenshot:
`docs/Screenshots/screen-mobile-kursplan-badge-overflow-kinderturnen.png`

Reproduzierbar mit: `npx playwright screenshot --browser chromium "http://localhost:3000/<seite>/"
/tmp/screen.png --viewport-size "390,844" --full-page`

## Ziel

Alle drei Karten-/Grid-Layouts stapeln bzw. brechen bei schmalen Viewports sauber um, ohne
horizontalen Overflow der Gesamtseite und ohne abgeschnittene Inhalte.

## Akzeptanzkriterien

### AC-1: Fußball-Trainerstab stapelt einspaltig auf Mobile
- Bei 375–390px Viewportbreite werden die Trainerstab-Karten einspaltig (1 Karte pro Zeile)
  untereinander dargestellt statt zweispaltig.
- Die Gesamtseite `/fussball/` hat bei 390px Viewport eine gerenderte Breite von 390px (± wenige
  px), keine Leerspalte rechts mehr.

### AC-2: Tischtennis-Trainer-Grid stapelt einspaltig auf Mobile
- Analog AC-1 für `/tischtennis/`: einspaltige Darstellung bei 375–390px, Gesamtseitenbreite
  390px (± wenige px).

### AC-3: Kinderturnen-Kursplan-Karten zeigen Altersgruppe vollständig
- Auf `/kinderturnen/` ist die Altersgruppen-Angabe in jeder Kursplan-Karte bei 375–390px
  vollständig lesbar (z.B. „3,5–6 Jahre" komplett sichtbar), egal ob durch Umbruch/Stapeln der
  drei Spalten untereinander oder durch verkleinerte Darstellung — Hauptsache kein abgeschnittener
  Text.

### AC-4: Keine Regression auf Desktop/Tablet
- Bei 768px und 1440px sehen alle drei Bereiche unverändert aus wie vor dem Fix (mehrspaltig, wo
  sinnvoll) — Playwright-Screenshot-Vergleich.

### AC-5: Build fehlerfrei
- `npm run build` ohne Fehler.

## Technische Notizen

- Fußball und Tischtennis nutzen vermutlich dieselbe oder sehr ähnliche Trainer-Karten-Komponente
  (`StaffSection`/`TrainerSection`) — prüfen, ob ein gemeinsamer Fix (z.B. `grid-cols-1 sm:grid-cols-2`
  statt eines festen `grid-cols-2`) beide Seiten gleichzeitig löst.
- Kinderturnen-Kursplan: vermutlich eine `flex-row`-Karte mit drei Kindern ohne `flex-wrap`, oder
  ein `grid-cols-3` ohne Mobile-Override. Sinnvolle Lösung z.B.: Badge/Pill unter den Kursnamen
  stapeln (`flex-col sm:flex-row`) statt in einer dritten Spalte.
- Bei allen drei Fixes prüfen, ob dieselbe Komponente noch auf anderen, im Audit als „clean"
  markierten Seiten verwendet wird (Regressionsgefahr).

## Betroffene Dateien

**Vermutlich geändert (vor Implementierung verifizieren):**
- `components/fussball/StaffSection.tsx`
- `components/tischtennis/TrainerSection.tsx`
- `app/(dept)/kinderturnen/page.tsx` (oder eine ausgelagerte Kursplan-Komponente, falls vorhanden)
