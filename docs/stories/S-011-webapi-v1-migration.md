# S-011 – Website-API-Migration auf `public-*` v1-Contract

**Status:** review
**Bereich:** `lib/api.ts`, `app/layout.tsx`, ~30× `app/**/page.tsx`, `app/(dept)/fundgrube/`, `package.json`
**Referenz:** `website-publishing-api-guide.md` (Ziel-Contract v1, Stand 2026-06-21)

---

## Ziel / Problem

KlubHaus stellt die Inhalte jetzt über einen sauberen, einheitlichen `public-*`-Contract v1 bereit
(Envelope `{ data, meta, error }`, camelCase, `?club=<slug>`/`?id=`, Pagination, Modul-Gating, Markdown).
Die Website konsumiert die Endpunkte aber noch im **Legacy-Modell**:

- **Kein Envelope:** `get()` liest rohes JSON statt `{ data, meta, error }`.
- **Falsche Identifier:** `operator_id`, `club_id`, `department_id`, `team_id` statt `?club=<slug>` bzw. `?id=`.
- **snake_case-Typen:** `primary_color`, `logo_web_pfad`, `foto_url`, `training_slots`, `club_id`, … statt camelCase.
- **News-Alt-Shape:** `{ news:[{ titel, inhalt, ebene, … }] }` statt `data:[{ title, body, scope, … }]` + `meta`.
  `body` ist jetzt **Markdown** (S-407) und muss gerendert + sanitisiert werden.
- **Direkter Tabellenzugriff (schwerster Verstoß):** Die Fundgrube liest `/rest/v1/fundsachen`,
  `/rest/v1/fundsachen_kategorien`, `/rest/v1/facilities` direkt — mit **hardcodiertem Anon-Key** in `lib/api.ts`.
  Ziel: `public-lostfound?club=<slug>`.

**Wer profitiert:** Betreiber/Verein (ein stabiler, versionierter Contract statt fragiler Direktzugriffe),
Redaktion (Markdown-Formatierung wird endlich korrekt gerendert), Wartung (keine Casing-/ID-Sonderfälle mehr,
kein Secret im Frontend-Code).

**Scope-Entscheidung (YAGNI):** **Strict Swap** — nur Legacy → v1. Keine neuen Endpunkte/Features
(`public-home`-Aggregat, OG, Sitemap, Image-Transform, Events, track-view) in dieser Story.
Markdown-Rendering ist **kein** neues Feature, sondern verpflichtende Consumer-Obliegenheit des v1-Contracts (§1.8/S-407).

---

## Betroffene Zugriffe (Ist → Ziel)

| Funktion | Legacy-Aufruf | v1-Zielaufruf |
|---|---|---|
| `fetchClubConfig()` | `public-config?slug=` | `public-config?club=<slug>` (Envelope, camelCase) |
| `fetchSponsors(operatorId)` | `public-sponsors?operator_id=` | `public-sponsors?club=<slug>` |
| `fetchAbteilung(deptId)` | `public-abteilung?department_id=` | `public-abteilung?id=<deptId>` |
| `fetchTeam(teamId)` | `public-team?team_id=` | `public-team?id=<teamId>` |
| `fetchTrainers(operatorId)` | `public-trainers?operator_id=` | `public-trainers?club=<slug>[&department=]` |
| `fetchVorstand(clubId)` | `public-vorstand?club_id=` | `public-vorstand?club=<slug>` |
| `fetchGeschichte(clubId)` | `public-geschichte?club_id=` | `public-geschichte?club=<slug>` |
| `fetchPublicNews({operatorId,…,ebene})` | `public-news?operator_id=&ebene=` | `public-news?club=<slug>[&scope=][&department=][&team=][&limit&offset]` |
| `fetchFundsachen()` u. a. | `/rest/v1/fundsachen…` (Anon-Key hardcoded) | `public-lostfound?club=<slug>` |

Casing-Shifts (Auswahl, s. Guide §10): `club_id→clubId`, `short_name→shortName`,
`primary_color/secondary_color→colors:{primary,secondary}`, `logo_url→logoUrl` (+ Homepage-`logoUrl`),
`instagram_username/facebook_url→social:{instagram,facebook}`, `homepage_*→homepage:{tagline,heroImageUrl,heroImageAlt,ctaLabel,aboutText,aboutText2}`,
`stats_*→stats:{…}`, Department `beschreibung/hero_foto_pfad→description/heroImageUrl/heroImageAlt`,
Team `foto_url→photoUrl`, `training_slots→trainingSlots`; News `titel/inhalt/bildUrl/erstelltAm/ebene/kontext/autorName → title/body/imageUrl/imageAlt/publishedAt/scope/context/authorName`.

---

## Akzeptanzkriterien

### A. Fetch-Layer (`lib/api.ts`)
1. `get<T>()` verarbeitet den Envelope: liest `data`, wirft bei `error !== null` einen Fehler mit `error.code`/`error.message`.
   Bei Listen wird `meta` (Pagination) mit zurückgegeben (z. B. Rückgabe-Shape `{ data, meta }` für paginierte Endpunkte).
2. Alle vereinsweiten Endpunkte nutzen **`?club=<slug>`** (aus `NEXT_PUBLIC_CLUB_SLUG`); Sub-Ressourcen **`?id=`**.
   Kein `operator_id` / `club_id` / `department_id` / `team_id` mehr im gesamten Repo.
3. Alle exportierten Interfaces sind **camelCase** und entsprechen der `data`-Form aus dem Guide §10.
4. `fetchSponsors`, `fetchTrainers`, `fetchVorstand`, `fetchGeschichte` verlieren ihre `operatorId`/`clubId`-Parameter
   (Slug kommt aus der Env). `fetchAbteilung(id)`/`fetchTeam(id)` nehmen weiter die `id`.
5. `fetchPublicNews` nutzt `scope` (`verein|abteilung|team`) statt `ebene`, unterstützt `department`/`team`/`limit`/`offset`
   und gibt `{ data: NewsEintrag[], meta }` zurück.
6. **Modul-Gating:** `error.code === 'module_disabled'` (HTTP 404) wird **nicht** als harter Crash behandelt, sondern
   führt zu leerem Ergebnis (leere Liste bzw. `null`), damit deaktivierte Module die Seite nicht brechen.
7. `restGet`, der hardcodierte `SUPABASE_ANON`-Fallback-Key und `SUPABASE_URL`-Ableitung werden **entfernt**.

### B. Fundgrube auf `public-lostfound`
8. `fetchFundsachen` läuft über `public-lostfound?club=<slug>` (Envelope). `fetchFundsachenKategorien`/`fetchFacilities`
   werden entweder aus dem `public-lostfound`-Response befüllt oder entfallen, je nachdem was der Endpunkt liefert
   (siehe Technische Notizen — Endpunkt-Shape vor Umsetzung verifizieren).
9. `app/(dept)/fundgrube/` (Server-Page + `FundgrubeClient.tsx`) rendert unverändert dieselben Inhalte wie zuvor
   (Beschreibung, Status, Foto, Kategorie, Fundort) — nur über den neuen Endpunkt.
10. Kein Supabase-Anon-Key mehr im Client-/Repo-Code.

### C. Markdown-Rendering (§1.8 / S-407)
11. `body` (News), `description`/`langbeschreibung` (Abteilung/Team) und `aboutText`/`aboutText2` (Config) werden als
    **Markdown → HTML** gerendert und **sanitisiert** (Allowlist: `p,br,strong,em,h2-h4,ul,ol,li,a,img,blockquote,code,pre,hr`;
    nur `http/https/mailto`). Ein Helfer `renderMarkdown()` (marked + DOMPurify) liegt unter `lib/markdown.ts`.
12. Plain-Text-Felder ohne Markup bleiben korrekt (abwärtskompatibel — kein doppeltes Escaping).

### D. Consumer-Anpassung (Blast-Radius)
13. `app/layout.tsx` nutzt `config.colors.primary/secondary` statt `config.primary_color/secondary_color`.
14. Alle ~30 `page.tsx` (Homepage + `(dept)/*`) nutzen die neuen camelCase-Felder und den slug-basierten Aufruf:
    - `config.operator_id ? fetchSponsors(config.operator_id)` → `fetchSponsors()` (kein Guard mehr nötig; Modul-Gating in api.ts).
    - `config.logo_web_pfad ?? config.logo_url` → `config.logoUrl`.
    - `config.primary_color/secondary_color` → `config.colors.primary/secondary`.
    - `fetchVorstand(config.club_id)` / `fetchGeschichte(config.club_id)` → `fetchVorstand()` / `fetchGeschichte()`.
    - News: `result.news` → `result.data`; `titel/inhalt/ebene` → `title/body/scope`.
    - Geschichte: `aera.titel/zeitraum`, `ms.titel` bleiben (bereits camelCase im Legacy-Wrapper) — nur Aufrufsignatur.
15. **Build & Typen:** `npm run build` (bzw. `tsc`/`next build`) läuft ohne Typ-Fehler durch; kein Consumer referenziert
    mehr ein entferntes snake_case-Feld.

### E. Env / Doku
16. `.env.example` bleibt gültig (`NEXT_PUBLIC_CLUB_SLUG`, `NEXT_PUBLIC_API_BASE`); `NEXT_PUBLIC_SUPABASE_ANON_KEY`
    wird nur noch benötigt, falls `public-lostfound` (wie alle `public-*`) den Gateway-`apikey`-Header verlangt —
    dann **ohne** hardcodierten Fallback, streng aus der Env.
17. CLAUDE.md-Hinweis „Logo immer aus DB" bleibt gültig, Feldname auf `config.logoUrl` aktualisiert.

---

## Technische Notizen

- **Atomarer Umbau:** Typen und Consumer in **einem** Zug ändern — Zwischenzustände brechen die Typprüfung (deshalb eine Story).
  Reihenfolge: (1) `lib/markdown.ts`, (2) `lib/api.ts` Envelope+Typen+Endpunkte, (3) `app/layout.tsx`, (4) Consumer-Seiten,
  (5) Fundgrube, (6) `npm run build` grün.
- **Envelope-Helfer:** `get()` sollte generisch `{ data, meta, error }` auspacken; eine schmale Variante für Objekt-Ressourcen
  (`meta: null`) und eine für Listen (`meta`-Pagination durchreichen).
- **`public-home` bewusst NICHT** genutzt (Strict Swap). Homepage macht weiter `public-config` + `public-sponsors` + `public-news`.
- **`public-lostfound` verifizieren:** Guide §10 nennt den Endpunkt, aber nicht die exakte `data`-Form. **Vor** Umsetzung
  per `curl`/Browser gegen `…/functions/v1/public-lostfound?club=sg-huenstetten` die Felder prüfen (liefert er Kategorie-
  und Fundort-Namen mit, oder nur IDs?). Danach AC 8/9 final schneiden. Falls Joins fehlen: als Blocker melden, nicht raten.
- **Markdown-Deps:** `marked` + `dompurify` (+ ggf. `isomorphic-dompurify` für SSR/statischen Export) neu in `package.json`.
  Rendering läuft bei `output: 'export'` zur Build-Zeit serverseitig — DOMPurify braucht dort eine DOM-Umgebung
  (isomorphic-dompurify oder jsdom). Referenz im KlubHaus-Repo: `src/utils/markdown.ts`.
- **Statischer Export beachten:** `output: 'export'` — alle Fetches laufen zur Build-Zeit. IDs der Abteilungen sind in den
  `(dept)/*`-Seiten teils hartcodiert (z. B. `GESUNDHEITSSPORT_ID`) und bleiben unverändert (weiterhin `?id=`).
- **Caching:** `get()` kann `force-cache` (prod) beibehalten; die v1-`Cache-Control`/`ETag`-Header sind additiv und erfordern
  keine Consumer-Änderung für diese Story.
- **Kein `operator_id` mehr aus Config:** Der Server löst `slug → club_id → operator_id` intern auf. `ClubConfig.operator_id`
  und `.club_id` entfallen als öffentliche Felder; Consumer, die sie nur als Guard nutzten, brauchen sie nicht mehr.

## Nicht-Ziele (Out of Scope)

- Neue Endpunkte/Features: `public-home`, OG-Meta, `public-sitemap`, Image-Transform-`srcset`, `public-events`/RSVP,
  `public-track-view`, Redaktions-Vorschau (`?preview=`).
- Design-/Layout-Änderungen an den Seiten (nur Datenherkunft/Feldnamen, kein Markup-Redesign).

## Umsetzungs-Notizen (Dev, Stand review)

**Verifiziert gegen die Live-API** (Build zieht bei `output:'export'` alle Fetches zur Build-Zeit — 34 Seiten grün; Inhalte im HTML geprüft: News, Vorstand, Sponsoren, Abteilungs-Description).

- **Envelope + Modul-Gating** (`lib/api.ts`): `request()` packt `{data,meta,error}` aus; `getObject`/`getList` behandeln `module_disabled`/`not_found` als leeres Ergebnis (`null`/`[]`). Listen geben `{ data, meta }` zurück.
- **Kein apikey nötig:** Das Gateway antwortet auf `public-*` **ohne** `apikey`-Header mit 200. Daher wurde der Anon-Key **komplett entfernt** (kein Header, kein Fallback) — erfüllt AC 10/16 sauber. `.env.example`: Anon-Key auskommentiert/optional.
- **`config.logoUrl` ist live `null`,** der echte Logo-URL steckt in **`config.logoWebUrl`**. Consumer nutzen `config.logoWebUrl ?? config.logoUrl` (statt strikt `logoUrl`), um Logo-Regression zu vermeiden. `ClubConfig` behält beide Felder.
- **Markdown** (`lib/markdown.ts`): `renderMarkdown` (Block) + `renderMarkdownInline` (inline, kein `<p>`-Wrapper → kein Layout-Shift bei Plain-Text). Inline eingebunden für `aboutText`/`aboutText2` (ZahlenTradition) und Abteilungs-/Team-`description` (AbteilungHero/KursHero-Subtitle). Sanitizer-Allowlist per §1.8.
- **Fundgrube:** `FundgrubeClient` lädt jetzt über `fetchFundsachen()` → `public-lostfound` (Client-`useEffect`); hardcodierter Anon-Key entfernt. Kategorie-/Sportstätten-Filter werden aus den gelieferten Items abgeleitet (Namen kommen laut Contract eingebettet mit).

### ⚠️ Offene Punkte für QA/PM

1. **`public-lostfound`-Item-Shape unverifizierbar:** Endpunkt **und** die alten REST-Tabellen (`fundsachen`, `fundsachen_kategorien`) liefern aktuell **0 Datensätze** — die exakte `data`-Feldform (inkl. Kategorie-/Fundort-Joins) ließ sich nicht beobachten. Umsetzung ist **defensiv** gegen den **verifizierten Envelope** codiert (`Fundsache` mit `kategorieId/kategorieName/fundortId/fundortName/fotoUrl/erfasstAm`), **nicht** geraten über die Rich-Shape. Da beide Quellen leer sind, ist die sichtbare Ausgabe identisch (Leerzustand). **Sobald Testdaten existieren: Feldnamen gegen `public-lostfound` gegenprüfen.**
2. **Sponsor-Tiering verloren:** Der v1-`public-sponsors`-Contract liefert **keine** `kategorie`/Tier-Info (Guide §10). `Sponsor.kategorie` ist nur noch optionales Consumer-Feld (immer `undefined` von der API) → Live-Sponsoren landen im Bronze/neutralen Tier auf der Sponsoren-Seite. Der Gold/Silber/Bronze-Fallback (ohne Live-Daten) bleibt unverändert. **Kandidat für additive Contract-Erweiterung** (Tiering in `public-sponsors`), falls die Tier-Darstellung erhalten bleiben soll.
3. **News-`body` (Markdown) hat keinen Anzeigeort:** `AktuellesSection` rendert nur Titel/Bild/Datum, es gibt keine News-Detailseite. `renderMarkdown` steht für einen künftigen News-Detail bereit; für diese Story kein Render-Site für `body`.

## Definition of Done

- Kein `operator_id`/`club_id`/`department_id`/`team_id`/`restGet`/hardcodierter Anon-Key mehr im Repo (grep-clean).
- Alle Consumer nutzen camelCase + slug/id; `next build` grün.
- News/lange Textfelder als sanitisiertes Markdown gerendert.
- Fundgrube läuft über `public-lostfound` und zeigt unverändert dieselben Inhalte.
