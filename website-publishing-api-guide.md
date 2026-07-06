# WebAPI-Guide: Öffentliche `public-*` API (Ziel-Contract v1)

> **Spec-/Integrations-Dokument** · Stand: 2026-06-21 · Gehört zu `docs/spec/website-publishing.md`.
> **Zweck:** Verbindliche, saubere Beschreibung, **wie eine Vereinswebsite Inhalte aus KlubHaus abruft** — ein
> einziger, konsistenter Vertrag für alle `public-*` Edge Functions.
>
> ✅ **Status (S-396–S-402 umgesetzt, 2026-06-21):** Alle Content-Functions sind **live auf dem v1-Contract**
> (Envelope, camelCase, `?club=<slug>`/`?id=`, Pagination, Fehlercodes, ETag/304). Zusätzlich live: `public-home`
> (S-397), `public-trainer` + News-Archiv/`?id=`-Detail (S-398), `public-sitemap` + `og`-Felder + `imageTransformUrl`
> (S-399), **iCal-Feed** `public-spiele?format=ical` (S-400), **Redaktions-Vorschau** via signiertem Preview-Token
> (S-401), **`_shared`-Smoke-Tests** (S-402), **Events/Veranstaltungen** (`public-events` + RSVP `public-event-rsvp`,
> S-403). Das Publishing-Paket ist damit vollständig umgesetzt.

---

## 1. Grundprinzipien

1. **Read-only & öffentlich:** Nur `GET`, `verify_jwt: false`, CORS `*`. Keine Mutationen über `public-*`.
2. **Slug-zentriert:** Eine Website kennt **einen** Verein über seinen `slug`. Alle vereinsweiten Endpunkte nehmen
   `?club=<slug>`. Sub-Ressourcen über ihre **`id`** (aus vorherigen Antworten). **Kein** `operator_id`/`club_id`/
   `team_id`-Mischmasch mehr im Contract.
3. **Ein Envelope für alles:** Jede Antwort ist `{ data, meta, error }` (s. 4).
4. **Ein Casing:** **camelCase** in allen JSON-Feldern (idiomatisch für den TS/Next-Consumer). Storage-URLs sind
   absolute, fertige URLs (Feldnamen enden auf `Url`).
5. **Cachebar:** Jede Antwort trägt `Cache-Control` + `ETag` (s. 6).
6. **Modul-bewusst:** Inaktive Module liefern keinen Content (s. 7) — „Modul aus ⇒ kein Output".
7. **Datensparsam:** PII (E-Mail/Telefon) nur mit explizitem Consent-Flag (s. 8).
8. **Redaktions-Textfelder = Markdown (S-407):** Längere redaktionelle Felder werden als **Markdown**-String
   ausgegeben (nicht HTML). Betroffen: News-`inhalt`, Abteilung-`langbeschreibung`, Team-`beschreibung`,
   Homepage-`aboutText`/`aboutText2`. Plain-Text ohne Markup ist gültiges Markdown (abwärtskompatibel).
   **Consumer-Pflicht:** Markdown → HTML serverseitig/clientseitig rendern und **sanitisieren** (Allowlist:
   p/br/strong/em/h2-h4/ul/ol/li/a/img/blockquote/code/pre/hr; nur http/https/mailto-URIs). Referenz-Implementierung
   im Repo: `src/utils/markdown.ts` (`renderMarkdown` = marked + DOMPurify). Kurze Felder (Tagline, Motto, USP-Texte,
   Stats) bleiben Plain-Text.

---

## 2. Basis & Auth

```
BASE = https://zqjheewhgrmcwzjurjlg.supabase.co/functions/v1
GET {BASE}/public-<resource>?<params>
Header: apikey: <SUPABASE_ANON_KEY>     (Supabase-Gateway-Pflicht; KEINE User-Auth)
```

Die Website setzt nur `NEXT_PUBLIC_CLUB_SLUG` (→ `?club=`) und `NEXT_PUBLIC_API_BASE` (→ `BASE`). Kein
Service-Role-Key im Frontend; die Functions nutzen ihn **intern**.

---

## 3. Identifier-Strategie

| Ebene | Parameter | Beispiel |
|---|---|---|
| Verein | `club` (slug) | `?club=sg-huenstetten` |
| Abteilung | `id` bzw. Filter `department` | `?id=<deptId>` / `?club=…&department=<deptId>` |
| Mannschaft | `id` bzw. Filter `team` | `?id=<teamId>` / `?club=…&team=<teamId>` |
| Person (Trainer) | `id` | `?id=<trainerId>` |

Die `id`s liefert immer ein übergeordneter Aufruf (`public-config` → `departments[].id`; `public-abteilung` →
`mannschaften[].id`; `public-team`/`public-trainers` → `trainer[].id`). Der Consumer muss **nie** selbst
`club_id`/`operator_id` kennen — der Server löst `slug → club_id → operator_id` auf.

---

## 4. Envelope

**Erfolg (Objekt):**
```json
{ "data": { /* Ressource */ }, "meta": null, "error": null }
```
**Erfolg (Liste, paginiert):**
```json
{ "data": [ /* … */ ], "meta": { "total": 42, "limit": 20, "offset": 0, "next": 20 }, "error": null }
```
**Fehler:**
```json
{ "data": null, "meta": null, "error": { "code": "not_found", "message": "Resource not found" } }
```

`meta.next` ist der `offset` der nächsten Seite oder `null` am Ende. Bei Objekt-Ressourcen ist `meta: null`.

---

## 5. Pagination

- Listen-Endpunkte akzeptieren `?limit=` (Default 20, Max 100) und `?offset=` (Default 0).
- `meta.total` = Gesamtzahl (für „Seite x von y"); `meta.next` = nächster Offset oder `null`.
- Default-Limits je Endpunkt im Endpoint-Referenz-Teil (10).

---

## 6. Caching

Jede Antwort:
```
Cache-Control: public, max-age=<m>, s-maxage=<s>, stale-while-revalidate=<swr>
ETag: "<hash>"
```
Bei passendem `If-None-Match` → `304 Not Modified` (leerer Body). Richtwerte:

| Datenklasse | max-age | s-maxage | swr |
|---|---|---|---|
| Branding/Config, Geschichte, Vorstand | 300 | 600 | 86400 |
| Trainer, Team, Abteilung, Sponsoren | 120 | 300 | 86400 |
| News, Spiele/Ergebnisse | 60 | 120 | 3600 |

Konsumiert ergänzend die Website-ISR (`revalidate`), aber CDN/Edge cachen jetzt eigenständig.

**Bild-Transform (S-399):** Storage-Bilder sind als absolute URLs ausgegeben. Für responsive `srcset` baut der
Consumer **Transform-URLs** über Supabase Storage Image-Rendering:
`…/storage/v1/render/image/public/<bucket>/<path>?width=<px>&quality=<q>` (Helfer `imageTransformUrl(bucket, path,
{width, quality})` in `_shared/storage.ts`). Setzt aktivierte Image-Transformation im Supabase-Projekt voraus;
ohne sie die `…/object/public/…`-Originale verwenden. Default-Antworten liefern bewusst die unveränderten
`object/public`-URLs (kein Zwang zum Render-Endpoint).

---

## 7. Modul-Gating (aus S-390)

- Ist das Modul **`website`** des Vereins inaktiv → **jeder** Content-Endpunkt antwortet `error.code:
  "module_disabled"` (HTTP 404) bzw. leere Liste.
- **Quellmodul-Gating:** Felder, die fachlich an ein anderes Modul gebunden sind, fehlen, wenn dessen Modul inaktiv
  ist: `trainingSlots` (Modul `booking`), Trainer-Felder (Modul `trainer`), `public-sponsors` (Modul `sponsoren`).
- Operator-aggregierende Endpunkte gelten als aktiv, wenn das Modul für **mind. einen** Verein des Operators aktiv
  ist (dokumentierte Vereinfachung).

---

## 8. Datenschutz / Field-Level-Consent

- **Trainer:** `email`/`phone` nur bei `kontaktVeroeffentlichen=true`; Profil nur bei `profilVeroeffentlichen=true`.
- **Vorstand/Ansprechpartner:** `email` nur bei `emailOeffentlich=true` (S-391).
- **Trainingsort/-zeit:** nur wenn das Team es freigibt (S-395, `trainingszeitenOeffentlich`).
- Interne Felder (IBAN, Dokumente, Notizen, Pipeline, Beträge) werden **nie** ausgegeben.
- **Redaktions-Vorschau (S-401):** Ein berechtigter Pfleger erzeugt in KlubHaus (`preview-token`, auth) ein
  signiertes, 15-Min-Token. `public-team?id=…&preview=<token>` bzw. `public-news?id=…&preview=<token>` geben dann
  die **eine** im Token kodierte, noch unveröffentlichte Ressource aus — `Cache-Control: no-store`,
  `X-Robots-Tag: noindex`. Ungültig/abgelaufen/falscher Scope ⇒ normales Verhalten (`not_found`).
- **Editor-Render-Kopplung (S-411):** In KlubHaus ist je Verein eine **Website-Basis-URL** (`clubs.website_base_url`)
  hinterlegt. Der „Website-Vorschau"-Button öffnet die **gerenderte** Seite `<website_base_url>/<pfad>?preview=<token>`
  (z.B. `/news/<slug>`, `/mannschaft/<slug>`). **Vertrag an die Website:** den `?preview=`-Query an die zugehörige
  `public-*`-Detail-API durchreichen (`?id=<slug|uuid>&preview=<token>`); das Token ist an die **echte UUID** der
  Ressource gebunden (Slug-URLs werden serverseitig aufgelöst, dann gegen die UUID geprüft). Vorschau-Seiten **nicht**
  cachen/indexieren (`noindex`), da `public-*` für Preview `no-store` liefert.

---

## 9. Fehler-Codes

| HTTP | `error.code` | Wann |
|---|---|---|
| 400 | `bad_request` | Pflicht-Parameter fehlt/ungültig |
| 404 | `not_found` | Ressource existiert nicht / nicht öffentlich |
| 404 | `module_disabled` | Quell-/Website-Modul inaktiv |
| 429 | `rate_limited` | Per-IP-Burst-Limit überschritten (S-417/R5) — kurz warten, dann erneut |
| 500 | `server_error` | interner Fehler — **generisch**, kein DB-Text; serverseitig mit Korrelations-ID geloggt |

> **Abuse-Schutz (S-417/R5):** `public-*` haben einen leichten Per-IP-Burst-Schutz (in-memory, best-effort je Edge-
> Instanz, Referenz in `public-news`). **Primärschutz = Gateway/CDN** (die ISR-Website läuft über Vercel). Legitime
> ISR-Revalidierung (niedrige Frequenz, Cache-Klassen §6) liegt weit unter der Schwelle.

---

## 10. Endpoint-Referenz (Ziel v1)

> Alle Antworten im Envelope (4). Hier nur die `data`-Form (camelCase, gekürzt).
> **OG (S-399):** Detail-Endpunkte (`public-team`, `public-trainer`, `public-news?id=`) liefern zusätzlich
> `og: { title, description, imageUrl }` für `<meta og:*>` ohne Consumer-Zusatzlogik.

### `GET public-config?club=<slug>` — Bootstrap
`{ clubId, slug, name, shortName, colors:{primary,secondary}, logoUrl, social:{instagram,facebook},
homepage:{tagline, heroImageUrl, heroImageAlt, ctaLabel, aboutText, aboutText2}, stats:{...}, departments:[{id,name,icon,
description, heroImageUrl, heroImageAlt}], sections:[{typ, sortOrder, config}] }` · Cache: Config-Klasse.
S-414: `sections` = geordnete, **sichtbare** Block-Komposition der Startseite (`typ` ∈ hero|about|abteilungen|news|
sponsoren|events|vorstand|geschichte|spiele|cta|banner); die Website rendert je `typ` eine Block-Komponente. Die festen
`homepage.*`-Felder bleiben befüllt (abwärtskompatibel). · S-415: `heroImageAlt` = Alt-Text (A11y/SEO).

### `GET public-home?club=<slug>` — Aggregat für die Startseite (S-397)
`{ config, sections:[…], news:[…max5], sponsors:[…], vorstandTeaser:[…] }` — 1 Call statt n. · Cache: News-Klasse.

### `POST public-track-view` — aggregierter View-Zähler (S-415)
Body `{ entityType: 'news'|'team'|'abteilung', entityId }` → `+1` in `content_views` (**nur aggregierte Summen, keine
PII** — keine IP/User-Agent/Cookies). Die Website ruft dies beim Aufruf einer Detailseite auf. Antwort `{ ok: true }`.

### `GET public-news?club=<slug>[&scope=verein|abteilung|team][&department=][&team=][&limit&offset]` · Detail: `?id=<newsId|slug>`
`data: [{ id, slug, title, body, imageUrl, imageAlt, publishedAt, scope, context, authorName }]` + `meta`-Pagination.
Zeitfenster `sichtbarAb/bis` serverseitig angewandt. · Cache: News-Klasse.
`imageAlt` (S-408): Alt-Text des Titelbilds aus der Medienbibliothek — für `<img alt>` (A11y/SEO); `null`, wenn keiner gepflegt.
S-412: Detail-`?id=` akzeptiert **UUID oder Slug**; Antwort enthält `slug` + `og:{title,description,imageUrl}` mit SEO-Override > abgeleitet.

### `GET public-team?id=<teamId|slug>`
`{ id, slug, name, shortName, color, liga, photoUrl, photoAlt, motto, description, warumWir, zielgruppe, alterVon, alterBis,
trainer:[…], trainingSlots:[…], ergebnisse:[…max5], spielplan:[…max5], galerie:[{…, fotoAlt}], links:[…], og:{…} }` · Cache: Entity.
S-412: `?id=` akzeptiert **UUID oder sprechenden Slug**; `og` spiegelt den editierbaren SEO-Override (`seo_*`) > abgeleiteten Wert.
S-415: `photoAlt` + `galerie[].fotoAlt` = Alt-Texte (A11y/SEO).

### `GET public-trainer?id=<trainerId>` — Einzelprofil (S-398)
`{ id, vorname, nachname, email?, telefon?, bio, fotoUrl, lizenzen:[…], erfolge:[…], mannschaften:[…] }`.

### `GET public-trainers?club=<slug>[&department=][&limit&offset]`
`data: [{ id, vorname, nachname, email?, telefon?, bio, fotoUrl, lizenzen, erfolge, mannschaften }]` + `meta`.

### `GET public-abteilung?id=<deptId|slug>`
`{ id, slug, name, icon, description, heroImageUrl, heroImageAlt, leitung?, trainer:[…],
mannschaften:[{id,name,…,photoAlt,trainer,trainingSlots}], og:{…} }`.
S-412: `?id=` akzeptiert **UUID oder Slug**; `og` = SEO-Override > abgeleitet. · S-415: `heroImageAlt`/`photoAlt` = Alt-Texte.

### `GET public-sponsors?club=<slug>`
`data: [{ id, firmenname, logoWebUrl, logoDruckUrl, logoAlt, websiteUrl }]` (Modul `sponsoren`). S-415: `logoAlt` = Alt-Text.

### `GET public-vorstand?club=<slug>`
`{ vorstand:[{id,name,bezeichnung,fotoUrl,email?,abteilung}], abteilungsleiter:[…] }` (`email` consent-gated).

### `GET public-geschichte?club=<slug>`
`{ aeren:[{id,titel,zeitraum,meilensteine:[{id,jahr,titel,beschreibung,fotoUrl}]}], sonstige:[…] }`.

### `GET public-spiele?club=<slug>[&department=][&team=][&limit&offset][&format=ical]` (S-394/S-400)
`data: { ergebnisse:[…], spielplan:[…] }` + `meta`. `format=ical` → `text/calendar`-Feed.

### `GET public-sitemap?club=<slug>` (S-399)
`{ urls:[{ loc, lastmod, changefreq }] }` für SEO/Sitemap-Generierung.

### `GET public-events?club=<slug>[&scope=verein|abteilung|team][&department=][&team=][&limit&offset]` (S-403)
`data: [{ id, scope, departmentId, teamId, title, description, datum, uhrzeit, ort, anmeldungAktiv, maxTeilnehmer,
angemeldet, freiePlaetze }]` + `meta`. Kommende öffentliche Vereins-Veranstaltungen. · Cache: News-Klasse.
S-410: liefert nur Events mit `publish_status='veröffentlicht'` (⇔ `ist_oeffentlich`) **und** innerhalb des
Publish-Fensters `publish_at`/`unpublish_at` (auto-publish/-unpublish, serverseitig — kein Cron).

### `POST public-event-rsvp` (S-403, gehärtet S-405) — Anmeldung (Schreiben)
Body `{ eventId, name, email, anzahl?, consent: true, captchaToken? }` → `{ data:{ ok:true } }` (no-store).
**`consent: true` ist Pflicht** (DSGVO; `consent_at` wird gespeichert). `captchaToken` (Cloudflare Turnstile) ist
**erforderlich, sobald serverseitig `TURNSTILE_SECRET` gesetzt** ist. Nur bei `ist_oeffentlich` + `anmeldung_aktiv`;
Schutz: E-Mail-Format, **atomare** Kapazität (`max_teilnehmer`) + Eindeutigkeit (`UNIQUE(event_id, lower(email))`),
Event-Flood-Limit. **Enumeration entschärft:** Doppelanmeldung liefert dieselbe generische Bestätigung wie eine neue
(kein Leak). Sendet Bestätigungs-Mail (Text aus `email_templates` `module_key='events'/'rsvp_confirm'`).

### `GET public-lostfound?club=<slug>` — Fundgrube (Spec `fundsachen.md`)

---

## 11. Beispiel-Flow (Homepage + Mannschaftsseite)

```
1) GET public-config?club=sg-huenstetten      → clubId, Branding, departments[]
2) GET public-home?club=sg-huenstetten         → news/sponsors/vorstandTeaser (Startseite)
3) /mannschaft/[id]:  GET public-team?id=<id>  → Vollprofil
4) /abteilung/[id]:   GET public-abteilung?id=<id>
5) Bilder: <img>-srcset über Storage-Transform-URLs (S-399)
```

---

## 12. Versionierung & Änderungen

- v1 ist die saubere Baseline (kein Legacy). Spätere Erweiterungen **additiv** (neue Felder/Endpunkte), keine
  stillen Bruch-Änderungen. Breaking → neuer Endpunkt-Suffix.
- Quelle der Wahrheit für Feld-Semantik bleibt `docs/spec/website-publishing.md`; dieser Guide ist der **Contract**.

---

## 13. Umsetzungs-Bezug (Stories)

| Thema | Story |
|---|---|
| Envelope + camelCase + Identifier `slug`/`id` + Pagination | **S-396** |
| `_shared`, Caching/ETag, Fehlerhygiene | S-393 |
| Modul-Gating | S-390 (done) |
| Aggregat `public-home` | S-397 |
| Einzel-Trainer + News-Archiv/Detail | S-398 |
| SEO/Sitemap/OG + Bild-Transform | S-399 |
| iCal-Spiele | S-400 |
| Redaktions-Vorschau | S-401 |
| `_shared`-Tests + Doku | S-402 |
| Events/Veranstaltungen | S-403 (draft) |
