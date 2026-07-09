# S-017 – Mobile: Abschnitts-Überschriften überlappen Hero/Info-Karten auf Kids-in-Bewegung

## Meta
- **Status:** review
- **Bereich:** `app/(dept)/kids-in-bewegung/page.tsx` (bzw. gemeinsame Kurs-Unterseiten-Komponente,
  falls das Muster geteilt genutzt wird)
- **Typ:** Bugfix (Responsive/Mobile)

## Vorgeschichte

Teil des Mobile-Audits aus S-014 (siehe auch S-015, S-016, S-018). Dieser Bug ist eine echte
visuelle Überlappung (Text liegt über anderen Elementen), kein Umbruch-/Breiten-Problem wie bei
S-015/S-016 — daher als eigene, kleinere Story gehalten.

## Ist-Zustand (reproduziert)

Auf `/kids-in-bewegung/` bei 390px Viewport:

- Die Zwischenüberschrift „Gruppe 1 (ab 3,5 Jahren bis Vorschulalter)" rendert **über** dem
  Hero-Bild bzw. dessen „Mehr Details"-Button statt darunter — der Text liegt sichtbar
  überlappend auf dem Foto/Button-Bereich der vorherigen Sektion.
- Die Zwischenüberschrift „Gruppe 2 (Vorschule bis Ende 1. Klasse)" rendert ebenso überlappend auf
  der unteren Kante der „Mitzubringen"-Infokarte der Gruppe-1-Sektion, statt mit ausreichend
  Abstand darunter zu beginnen.

Screenshot: `docs/Screenshots/screen-mobile-section-overlap-kids-in-bewegung.png` (zeigt beide
Überlappungen in einem Bild).

Reproduzierbar mit: `npx playwright screenshot --browser chromium
"http://localhost:3000/kids-in-bewegung/" /tmp/screen.png --viewport-size "390,844" --full-page`

## Ziel

Beide Gruppen-Überschriften erscheinen bei schmalen Viewports mit ausreichend Abstand **unterhalb**
der jeweils vorangehenden Sektion, ohne optische Überlappung.

## Akzeptanzkriterien

### AC-1: Keine Überlappung zwischen Hero und „Gruppe 1"-Überschrift
- Bei 375–390px Viewportbreite beginnt die Überschrift „Gruppe 1 (ab 3,5 Jahren bis
  Vorschulalter)" sichtbar unterhalb des Hero-Bereichs (inkl. dessen Buttons), mit demselben
  vertikalen Abstand wie auf Desktop (proportional).

### AC-2: Keine Überlappung zwischen „Mitzubringen"-Karte und „Gruppe 2"-Überschrift
- Bei 375–390px beginnt die Überschrift „Gruppe 2 (Vorschule bis Ende 1. Klasse)" sichtbar
  unterhalb der letzten Infokarte der Gruppe-1-Sektion, ohne Überlappung.

### AC-3: Keine Regression auf Desktop/Tablet
- Bei 768px und 1440px sieht der Abschnitt unverändert aus wie vor dem Fix.

### AC-4: Stichprobe auf Geschwisterseiten
- Kurz prüfen, ob dasselbe Zwei-Gruppen-Layout auch auf anderen Kinderturnen-Kurs-Unterseiten
  verwendet wird (z.B. Früh übt sich I/II, Grundschulturnen) und dort ebenfalls betroffen ist —
  falls ja, gleich mitfixen; falls nein, kurz in der Story dokumentieren warum nicht.
  **Ergebnis:** `KursInfoGrid` wird auf 15 Seiten verwendet; `kids-in-bewegung` ist die einzige
  Seite, die die Komponente zweimal stapelt und `groupLabel` überhaupt nutzt (grep bestätigt: kein
  anderer Callsite übergibt `groupLabel`). Die anderen 14 Seiten (u.a. Früh übt sich I/II,
  Grundschulturnen) sind vom Bug nicht betroffen — sie behalten unverändert den `-mt-12`
  Card-Lift-Effekt über dem Hero.

### AC-5: Build fehlerfrei
- `npm run build` ohne Fehler.

## Technische Notizen

- Vermutliche Root Cause: negativer Margin (`-mt-...`) oder absolute Positionierung, die auf
  Desktop durch mehr verfügbaren Platz "zufällig" nicht auffällt, bei schmaleren Spalten auf
  Mobile aber zu einer echten Überlappung führt. Alternativ: eine feste Höhe (`h-[...]`) auf dem
  Hero- oder Kartenblock, die den tatsächlichen (höheren) Mobile-Inhalt nicht berücksichtigt.
- Vor dem Fix den genauen Elementbaum inspizieren (DevTools/Playwright), um zu bestätigen, ob es
  sich um denselben CSS-Mechanismus für beide Überlappungen handelt oder zwei unabhängige Ursachen
  sind.

## Betroffene Dateien

**Vermutlich geändert (vor Implementierung verifizieren):**
- `app/(dept)/kids-in-bewegung/page.tsx`
- Ggf. eine gemeinsame Sektions-/Info-Karten-Komponente unter `components/shared/sections/`, falls
  das Zwei-Gruppen-Muster dort ausgelagert ist
