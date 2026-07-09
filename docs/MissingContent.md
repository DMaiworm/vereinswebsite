# Fehlende / kaputte Inhalte

Sammelstelle für Platzhalter-Content, der später durch echte Inhalte (Fotos, Texte, Daten) ersetzt
werden muss. Kein Code-Bug — die Seiten funktionieren, zeigen aber Platzhalter oder haben tote
externe Asset-Links.

## Kaputte Bild-URLs (`lh3.googleusercontent.com/aida-public/...`)

Entdeckt am 2026-07-09 beim Debugging eines Next.js Dev-Overlay "1 Issue"-Hinweises auf der
Startseite. Ursache: mehrere `<img>`-Quellen sind KI-generierte Mockup-Bilder aus der
ursprünglichen Design-Erstellung (`lh3.googleusercontent.com/aida-public/...`), die inzwischen
abgelaufen sind und HTTP 400 liefern. Das globale Fehler-Fallback-Script (`app/layout.tsx:49`,
`.broken`-Klasse) fängt das visuell ab, erzeugt aber einen React-Hydration-Mismatch in der Konsole,
wenn das kaputte Bild im initialen Viewport liegt.

Von 77 sitextweit verwendeten `aida-public`-Bild-URLs sind 6 tot (Stand 2026-07-09, per `curl -sI`
geprüft):

| URL-Fragment | Betroffene Datei(en) | Kontext |
|---|---|---|
| `AB6AXuBYjUo` | `app/(dept)/fitdurchsjahr/page.tsx`, `app/(dept)/manfit/page.tsx`, `app/(dept)/ladyfit/page.tsx`, `app/(dept)/step-aerobic/page.tsx`, `app/(dept)/tanzfitness/page.tsx`, `app/(dept)/skigym/page.tsx`, `app/(dept)/qi-gong/page.tsx`, `app/(dept)/workout/page.tsx`, `components/home/KursDerWocheSection.tsx`, `components/fitness/TeamsInAbteilung.tsx` | Auffällig kurze URL (~11 Zeichen Token statt ~150) — sieht nach einem abgeschnittenen Copy-Paste-Fehler aus, nicht nur nach Ablauf. In 10 Dateien identisch verwendet, vermutlich ein gemeinsamer Kurs-Platzhalter. |
| `AB6AXuAhew3JHMhDdgHYu_tiHKNPxK3hyCX91YHEvo0Bmd7YHUl1V1X48Loo4kJA9wUjHnYW0fElIgySm6LQPQRcc5DfUTIQED5V8bItcRFgmHn7wISNkPOrdrkkGMV-TtilEnhn2bjoUqlFW62QOBAeTVc0WAOEEajW9iC4wzCfv5VJQl7IjFGZ04H1UBYaMnCNLlj-29NrIP7VU4xOBzEqXYKQ-cwPewAolDkKyzc9LnXhBiEoz3Zb1AQlwZJ5jq9ysz1hnh87NRzNgV8` | `components/fussball/StaffSection.tsx` | Foto Hans Jung (Sportl. Leiter) |
| `AB6AXuCgNKSFNoWCARbYt6ThP0e4r9n8IieNXTyZxbFVsho_zyX67lFEIHgt5Ml0wdQRfxIeFtX-W9n58zQe3fef3aBRb3jN0RX2dx9HJxwtD-aDjvnUNyHL7HnNL7HnML-aDjvnUNyHL7Hn` | `components/fussball/StaffSection.tsx` | Foto Arno Grosmann (Torwart-Trainer) |
| `AB6AXuB_qcexn1QakqKyUiv8NnEoXBxrrrv1hwlj6hLy4s_vZRMVG85imVveu9LIO3pA9J-3--xC9TQh5Dwu8Bs4tIW-veoBLWATFFU-_h5FF3U1Z3ppoE9Fgl5K3khNTTOpEQrx7aNpcWd6rT95mZ8MkPqsejrODHpPsPPMgUYvfodbsONlxMlbH9KNxKXZxWqO32xsyPJCnd6JKAvCF9cKh2IhgoGRMEU03loYW3PDjXGmiO1y7_Xe7gdB9MBN9J5DQW9dXxZ3cdiLKr6I` | `app/page.tsx`, `app/(dept)/fussball/page.tsx`, `app/(dept)/tischtennis/page.tsx`, `app/(dept)/badminton/page.tsx` | Produktbild "Wintermütze Classic" (Shop) |
| `AB6AXuDroGgypJqh_NjO26ER5fmmp56PlgowMJOWIjKMLS20CbTtiIvvdTTjCQPD5xtD_MUoRSf8h_9ZIVaVI4wVror7hxPPuNUX1KyTCgYEI6VChhP0klIMolspXmr74ZahILL0CrTKN2bkdDa3bdcpplic8sH8H6rwfww_DPytZQYFpXx8rqu61lgYgIYuF60sZBkCOYaGZ8It84tCZIESow35BN00zmMJoVridedgX9DiyPF3sSA2NA2HzayUsxJql5EvP360LmCog` | `components/home/AktuellesSection.tsx`, `app/(dept)/fussball/page.tsx` | News-Bild "Sommerfest 2025 – Wir feiern 80 Jahre SG!" |
| `AB6AXuDTj99VrofU-niv9ncVZ5WtsSc8Ud-lByqrOOgSlp-Wzbh0h76AkncNLW6HfVbeoS3m6vojiTWAnrpBHfx2pxCJrVfe05GhGFSjZdJ4hxWitCgf6bzX3LfrORjecFgFdakJOGOzn9c7LJOYJadW8l1aMYU4A7hS1Cj9fCMor_j4arPxlzSS6CpJvslns3zU6JPqvHm4O_r4kOLPP7wFwLzxPL0DeZ9qFQ1v4tzzT4SV7n1crweyIEnYby_do_R2AgxYCS8rVXgKBY` | `app/(dept)/vorstand/page.tsx` | Bild "Werde Teil des Teams"-CTA |

**Nächste Schritte (sobald echte Inhalte vorliegen):**
- Echte Fotos für Hans Jung, Arno Grosmann (Fußball-Staff) besorgen.
- Echtes Produktfoto für "Wintermütze Classic" (Shop) besorgen.
- Echtes Event-Foto für "Sommerfest 2025" besorgen.
- Echtes Foto für Vorstand-CTA-Sektion besorgen.
- Klären, was der `AB6AXuBYjUo`-Platzhalter ursprünglich zeigen sollte (10 Kurs-Seiten + 2 Komponenten) — vermutlich ein generischer "Kurs"-Fallback, der nie durch echte Bilder ersetzt wurde.
- Nach dem Ersetzen: prüfen, ob das Next.js Dev-Overlay auf `/` wieder "0 Issues" zeigt.
