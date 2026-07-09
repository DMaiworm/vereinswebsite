# S-018 – Mobile: SponsorBand schneidet zweites Partner-Logo am rechten Rand ab (sitewide)

## Meta
- **Status:** review
- **Bereich:** `components/shared/layout/SponsorBand.tsx`
- **Typ:** Bugfix (Responsive/Mobile) — sitewide, aber Fix an einer einzigen Komponente

## Vorgeschichte

Teil des Mobile-Audits aus S-014 (siehe auch S-015, S-016, S-017). `SponsorBand` wird auf praktisch
jeder Abteilungs-/Kursseite eingebunden (~30 Seiten) — dieser Bug betrifft daher potenziell die
gesamte Seite, lässt sich aber an einer einzigen Stelle beheben.

## Ist-Zustand (reproduziert)

Im Sponsoren-Logo-Streifen „Starke Partner für den Erfolg" (kurz vor dem Footer) wird bei 390px
Viewportbreite das zweite Logo („BIOGRUND") am rechten Bildschirmrand abgeschnitten — sichtbar ist
nur „BIOGRUN", der Rest des Schriftzugs liegt außerhalb des sichtbaren Bereichs. Das erste Logo
(„AREHA") wird korrekt vollständig dargestellt.

Screenshot: `docs/Screenshots/screen-mobile-sponsorband-logo-clip.png` (aufgenommen auf
`/achtsamkeit/`, Bug ist aber sitewide reproduzierbar, z.B. auch auf Homepage, Fitness,
Gesundheitssport, Fußball, Kinderturnen, JFV, LadyFit, Fundgrube, Geschichte etc.)

Reproduzierbar mit: `npx playwright screenshot --browser chromium
"http://localhost:3000/achtsamkeit/" /tmp/screen.png --viewport-size "390,844" --full-page`
(Sponsoren-Streifen erscheint kurz vor dem Footer).

## Ziel

Die Sponsoren-Logo-Reihe passt sich bei schmalen Viewports so an, dass kein Logo abgeschnitten
wird — entweder durch kleinere Logo-Darstellung, horizontales Scrollen/Swipen innerhalb des
Streifens, oder Umbruch auf mehrere Zeilen.

## Akzeptanzkriterien

### AC-1: Kein abgeschnittenes Logo bei 375–390px
- Auf mindestens drei Stichprobenseiten (z.B. Achtsamkeit, Homepage, Fußball) ist bei 375px und
  390px Viewportbreite jedes einzelne Sponsoren-Logo vollständig sichtbar — kein Logo endet am
  oder jenseits des rechten Bildschirmrands.

### AC-2: Funktioniert unabhängig von der Anzahl der Sponsoren
- Die Lösung funktioniert unabhängig davon, ob 2, 4 oder mehr Sponsoren-Logos übergeben werden
  (`SponsorBand` erhält die Sponsorenliste dynamisch aus der API) — kein hartkodierter Fix nur für
  den aktuellen Zwei-Logo-Fall.

### AC-3: Keine Regression auf Desktop/Tablet
- Bei 768px und 1440px sieht der Sponsoren-Streifen unverändert aus wie vor dem Fix.

### AC-4: Build fehlerfrei
- `npm run build` ohne Fehler.

## Technische Notizen

- `SponsorBand` wird laut Grep in ~30 `page.tsx`-Dateien eingebunden — ein Fix an der Komponente
  behebt den Bug sitewide, muss aber auf mind. 2–3 Seiten stichprobenartig auf Mobile nachgeprüft
  werden (nicht nur auf der Seite, auf der der Bug erstmals auffiel).
- Prüfen, ob `SponsorBand` bereits eine horizontale Scroll-/Marquee-Logik hat (ähnlich der
  ausdrücklich separaten `SponsorenStrip.tsx`, die eine automatisch scrollende Marquee-Animation
  per GSAP nutzt) — falls ja, ist der Bug vermutlich eine fehlende Breitenbegrenzung
  (`overflow-x-hidden`/`max-w-full`) auf dem Container statt eines fehlenden Scroll-Mechanismus.
- Einfachste robuste Lösung ist vermutlich ein `flex-wrap` mit kleinerer Logo-Größe auf Mobile,
  statt eines horizontalen Scroll-Containers (Konsistenz mit dem Rest der Seite, kein zusätzliches
  Swipe-Verhalten nötig).

## Betroffene Dateien

**Vermutlich geändert (vor Implementierung verifizieren):**
- `components/shared/layout/SponsorBand.tsx`
