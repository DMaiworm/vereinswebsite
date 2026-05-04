# S-003 – Ballsport Komponenten-Audit: Tischtennis & Fußball

**Status:** draft  
**Erstellt:** 2026-05-04  
**Bereich:** app/tischtennis/, app/fussball/, components/shared/

---

## Problem

Tischtennis und Fußball haben bereits viele geteilte Komponenten (ShopGrid, NewsGrid, SponsorBand
etc.), aber beide Seiten enthalten noch inline-Sektionen die als Komponenten sinnvoll wären.
Badminton ist strukturell der "Gold-Standard" und dient als Vorlage.

---

## Ist-Analyse

### Tischtennis (page.tsx)
| Sektion | Status |
|---------|--------|
| Hero | inline |
| NewsGrid | ✅ shared |
| Trainer-Card (Marcus Weber) | inline |
| "Senioren I" Team-Section | inline |
| GalerieSnapshots | ✅ shared |
| TrainerCta | ✅ shared |
| ShopGrid | ✅ shared |

### Fußball (page.tsx)
| Sektion | Status |
|---------|--------|
| Hero | inline |
| 1. Mannschaft + Team-Foto | inline |
| SpieltagsZentraleHorizontal | ✅ eigene Komponente |
| NewsGrid | ✅ shared |
| Staff-Section (1+4 Personen) | inline |
| SponsorBand | ✅ shared |
| ZweiteSection | ✅ eigene Komponente |
| AlteHerrenBanner | ✅ eigene Komponente |
| ShopGrid | ✅ shared |

### Gemeinsamkeiten Tischtennis ↔ Fußball
- Beide haben eine "großes Team-Foto mit Overlay" Section
- Beide haben eine Trainer/Staff-Card im gleichen Stil (Foto + Badge + Bio + Checklist)
- Beide nutzen denselben Hero-Struktur (Gradient overlay, Badge, H1)

---

## Kandidaten für Extraktion

1. **`TrainerCard`** (groß) – Foto + Lizenz-Badge + Bio + Checklist-Items
   → In Tischtennis: "Marcus Weber"-Section (Z. 92–132)
   → In Fußball: "Timo Jung"-Head-Coach-Card (Z. 121–143)
   → Könnte `TrainerCta` erweitern oder als separates Primitiv leben

2. **`StaffGrid`** – 2×2 Karten mit Foto, Rolle, Name, Beschreibung
   → In Fußball: Co-Trainer/GK-Coach/Manager/Sportl.Leiter (Z. 144–187)
   → Noch kein Tischtennis-Pendant

3. **`TeamFotoSection`** – dunkler Hintergrund, großes Foto, Overlay-Text + optional Mitglieder-Avatare
   → In Tischtennis: "Senioren I" (Z. 134–187)
   → In Fußball: "1. Mannschaft" (Z. 93–103)

---

## Nächste Schritte

Diese Story ist **draft** – erst S-002 fertigstellen, dann:
1. Tischtennis und Fußball per Playwright screenshotten
2. Kandidaten gegen Screenshots validieren
3. Story auf `ready` setzen

---

## Out of Scope

- Badminton: bereits gut strukturiert (gold standard)
- Leichtathletik: zu wenig Daten für sinnvolle Extraktion
