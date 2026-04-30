# Claude Code – Projektregeln & Lessons Learned

## Claude Design Entwurf übernehmen (1:1 Port)

### Grundregel
**Nie** Tokens remappen, Shared Components einbauen oder Design-Entscheidungen ändern. Erst 1:1 portieren, danach refactoren. Wenn der User sagt "übernimm das Design", bedeutet das: pixel-perfect, keine kreativen Abweichungen.

---

### Pflicht-Setup für jede neue Abteilungsseite mit CDN Tailwind

Jede Seite, die einen Claude Design Entwurf mit Material Design 3 / Tailwind CDN verwendet, braucht **drei Dinge** im Layout (`app/<abteilung>/layout.tsx`), sonst sind Farben, Buttons und Typographie kaputt:

#### 1. CSS-Variablen für alle MD3-Farben definieren
Tailwind v4 (Projekt-Build) scannt alle `.tsx`-Dateien und generiert für unbekannte Farbnamen `background-color: var(--color-xyz)`. Wenn `--color-xyz` nicht definiert ist → transparent. **Fix:**

```tsx
const cssVars = `
  :root {
    --color-primary: #052856;
    --color-secondary-container: #fde000;
    /* ... alle MD3-Farben aus dem Design ... */
  }
  /* Unlayered overrides: Klassen-Spezifität (0,1,0) schlägt CDN-Preflight button-Reset (0,0,1) */
  .bg-primary             { background-color: #052856 }
  .bg-secondary-container { background-color: #fde000 }
  .text-secondary-container { color: #fde000 }
  /* ... alle bg-* und text-* Farben die auf der Seite verwendet werden ... */
`
```

Warum unlayered Overrides nötig sind: CDN Tailwind v3 injiziert seinen Preflight (`button { background-color: transparent }`) als **unlayered CSS**. Tailwind v4's Utilities liegen in `@layer utilities`. In der CSS-Cascade gewinnt **unlayered immer über layered**, unabhängig von Spezifität. Also gewinnt das CDN-Preflight über das v4-Utility. Die Fix-Regeln hier sind ebenfalls unlayered und haben Klassen-Spezifität (0,1,0) > Element-Spezifität (0,0,1) des CDN-Preflights.

#### 2. CDN-Preflight deaktivieren
```tsx
const twConfig = JSON.stringify({
  corePlugins: { preflight: false },   // ← Pflicht
  darkMode: 'class',
  theme: { extend: { colors: { ... } } }
})
```

#### 3. CDN synchron laden (document.write Pattern)
`Script strategy="beforeInteractive"` funktioniert nur im Root-Layout. In Child-Layouts **muss** document.write verwendet werden:

```tsx
<script dangerouslySetInnerHTML={{
  __html: `tailwind={config:${twConfig}};document.write('<scr'+'ipt src="https://cdn.tailwindcss.com?plugins=forms,container-queries"><\\/scr'+'ipt>');`
}} />
```

---

### Weitere Fallstricke

#### Gradient mit Opacity auf custom colors
`from-primary/90` funktioniert in Tailwind CDN v3 **nicht** mit hex-definierten Farben (kein RGB-Channel-Format). **Immer** rgba verwenden:
```
✗ from-primary/90
✓ from-[rgba(5,40,86,0.92)]
```

#### Material Symbols Icons
Werden im Root-Layout (`app/layout.tsx`) geladen – einmalig, gilt für alle Seiten:
```tsx
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block" />
```
Fehlt dieser Link → Icons zeigen als Klartext ("arrow_forward", "shopping_cart").

#### Google Fonts (Lexend, Plus Jakarta Sans)
Müssen via `next/font/google` im Root-Layout geladen und als CSS-Variable exportiert werden (`--font-lexend`, `--font-jakarta`). Fehlt das → Typographie fällt auf System-Fonts zurück.

#### `<img>` statt `<Image>`
Claude Design verwendet `<img>`. Für 1:1-Ports `<img>` behalten, ESLint-Warning mit `{/* eslint-disable-next-line @next/next/no-img-element */}` suppressen.

#### Logo immer aus DB
Nie hardcoded `lh3.googleusercontent.com`-URLs für das Vereinslogo verwenden. Stattdessen:
```tsx
const config = await fetchClubConfig()
const logoSrc = config.logo_web_pfad ?? config.logo_url ?? '/fallback-logo.png'
```

---

---

## Visuelle Prüfung mit Playwright

`playwright` ist **nicht** als npm-Package installiert. Nur der CLI via `npx` funktioniert.

```bash
# Ganze Seite (Dev-Server auf Port 3002 wenn 3000 belegt)
npx playwright screenshot --browser chromium "http://localhost:3000/pfad/" /tmp/screen.png --full-page --viewport-size "1440,900"

# Ausschnitt (z.B. Footer: x=0, y=5720, w=1552, h=700)
# → erst full-page machen, Bildgröße notieren, dann clip berechnen
npx playwright screenshot --browser chromium "http://localhost:3000/pfad/" /tmp/crop.png --clip 0,5720,1552,700
```

**Nie** `playwright` oder `@playwright/test` per `require`/`import` in Node-Scripts nutzen → `MODULE_NOT_FOUND`.

**Dev-Server Cache-Fehler**: Bei Turbopack-Fehlern (`Unable to open static sorted file`) → `rm -rf .next` und neu starten.

---

### Checkliste vor dem ersten Browser-Check

- [ ] `layout.tsx` mit `cssVars` (`:root` Variablen + unlayered `bg-*`/`text-*` Overrides)
- [ ] `corePlugins: { preflight: false }` im twConfig
- [ ] `document.write` Pattern für CDN-Script
- [ ] Keine `from-primary/90` Syntax → `from-[rgba(...)]`
- [ ] Logo via `fetchClubConfig()`, nicht hardcoded
- [ ] Seite ist `async`, falls API-Calls nötig
