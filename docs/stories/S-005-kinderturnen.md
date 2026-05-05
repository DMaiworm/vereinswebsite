# S-005 – Kinderturnen: Abteilungsseite & 4 Kurs-Unterseiten

**Status:** review  
**Erstellt:** 2026-05-05  
**Bereich:** app/kinderturnen/, app/fruehuebtsich-1/, app/fruehuebtsich-2/, app/kids-in-bewegung/, app/grundschulturnen/, components/kinderturnen/, components/shared/sections/KursInfoGrid.tsx

---

## Problem

Die Abteilung Kinderturnen hat keine eigene Webpräsenz. Besucher finden keine Informationen zu Kurszeiten, Altersgruppen, Trainern und Anmeldewegen. Die Abteilung umfasst 4 Kurse für Kinder von 6 Monaten bis 10 Jahren.

---

## Design-Status

| Bereich | Status |
|---------|--------|
| Abteilungsseite analog Gesundheitssport | ❌ noch nicht |
| 4 Kurs-Unterseiten analog S-004-Pattern | ❌ noch nicht |
| Shared Section-Komponenten (S-002, S-004) | ✅ vorhanden |

---

## Ist-Analyse: Referenz-Implementierungen

Die Abteilungsseite folgt exakt dem Muster von `app/gesundheitssport/`.  
Die 4 Unterseiten folgen dem 7-Sektionen-Pattern aus S-004 (KursHero → KursInfoGrid → ContentSplit → BentoSchwerpunkte → KonzeptSection → TrainerCard → KursCtaSection).

**Sonderfall kids-in-bewegung:** 2 Gruppen → 2× KursInfoGrid (mit `groupLabel` prop) + 2× TrainerCard.

---

## Ziel

### Abteilungsseite `app/kinderturnen/`

```
app/kinderturnen/
  layout.tsx    ← CDN_CSS + cdnScript + IMAGE_FALLBACK_SCRIPT (wie gesundheitssport)
  page.tsx      ← AbteilungHero, StatsBar, Was-wir-anbieten, TeamsInAbteilung,
                   Kursplan-Tabelle, KursInfoBox, AbteilungCta

components/kinderturnen/
  TeamsInAbteilung.tsx  ← 4 Kurse als TeamRow-Einträge
```

### 4 Unterseiten

```
app/fruehuebtsich-1/    ← Früh übt sich (I),  6M–1,5J
app/fruehuebtsich-2/    ← Früh übt sich (II), 1,5–3J
app/kids-in-bewegung/   ← Kids in Bewegung,   3–6J (2 Gruppen)
app/grundschulturnen/   ← Kinder stärken,     6–10J
```

Jede Unterseite: `layout.tsx` + `page.tsx` nach S-004-Pattern.

### Komponenten-Erweiterung

```
components/shared/sections/KursInfoGrid.tsx
  + groupLabel?: string   ← optionaler Gruppen-Titel (nur kids-in-bewegung)
```

---

## Kurs-Inhalte

### Früh übt sich (I) – Kleinkinder 6 Monate bis 1,5 Jahre

**Untertitel:** Erste Schritte in Bewegung mit Mama & Papa  
**Badge:** Kleinkinder 6M – 1,5J  
**Kurszeit:** Mittwochs, 15:15 – 16:00 Uhr  
**Ort:** Turnhalle, Hünstetten  
**Mitzubringen:** Bequeme Kleidung, Krabbeldecke, Lieblingsschmusetier  
**Trainerin:** Carina Faust, Tel. 0178 7820848 (WhatsApp)

**ContentSplit-Text:**
- Schon in der Übergangszeit vom Baby zum Kleinkind fördert altersangemessene Bewegungsförderung die psychosoziale, geistige und motorische Entwicklung des Kindes.
- Das gemeinsam mit dem Erwachsenen verbrachte Bewegungsangebot – Lieder singen, Finger- und Schaukelspiele, kindgerechte Materialien – orientiert sich am individuellen Entwicklungsstand und stärkt die Bindung zwischen Kind und Bezugsperson.

**BentoSchwerpunkte:**
- Featured[0]: icon `child_care`, „Motorische Entwicklung" – Spielerische Förderung der Grob- und Feinmotorik durch altersgerechte Bewegungsangebote.
- Featured[1]: icon `favorite`, „Bindungsstärkung" – Gemeinsame Bewegungszeit intensiviert die Beziehung zwischen Kind und Bezugsperson.
- Small[0]: icon `music_note`, „Lieder & Reime" – Finger- und Schaukelspiele mit musikalischer Begleitung.
- Small[1]: icon `toys`, „Kindgerechte Materialien" – Abwechslungsreiche Spielgeräte nach Entwicklungsstand.
- Small[2]: icon `groups`, „Elternaustausch" – Raum für vertrauensvollen Austausch unter den Begleitpersonen.

**KonzeptSection:**
- overlayQuote: „Bewegung ist das erste Fenster, durch das Kinder die Welt entdecken."
- Blockquote: „Wir laden euch ein, die ersten Bewegungsabenteuer eures Kindes gemeinsam mit uns zu erleben."

**TrainerCard:**
- role: „Deine Trainerin"
- name: „Carina Faust"
- bio: „Carina begleitet die Kleinsten mit viel Geduld und Einfühlungsvermögen. Mit langjähriger Erfahrung in der frühkindlichen Bewegungsförderung schafft sie eine liebevolle Atmosphäre, in der jedes Kind und jede Bezugsperson willkommen ist. Kontakt: 0178 7820848 (WhatsApp)"
- skills: [„Frühkindliche Bewegungsförderung", „Eltern-Kind-Turnen"]

---

### Früh übt sich (II) – Kleinkinder 1,5 bis 3 Jahre

**Untertitel:** Gemeinsam turnen mit Mama, Papa oder Omi  
**Badge:** Kleinkinder 1,5 – 3J  
**Kurszeit:** Montags, 15:15 – 16:15 Uhr  
**Ort:** Turnhalle, Hünstetten  
**Mitzubringen:** Bequeme Kleidung, Hallenschuhe (auch für Begleitperson), Getränk  
**Trainerin:** Carina Faust, Tel. 0178 7820848 (WhatsApp)

**ContentSplit-Text:**
- Das Kleinkinderturnen ist ein Angebot für Kinder ab ca. 1,5 bis 3 Jahren, die gemeinsam mit Mama, Papa oder auch Oma und Opa erste Turnversuche starten möchten.
- Im Vordergrund stehen freie Bewegung und Spiel an verschiedenen Turnstationen, ganz nach dem individuellen Entwicklungsstand und den persönlichen Fähigkeiten der Kinder. Die Stunde beginnt und endet stets mit einem Singkreis. Geschwisterkinder sind willkommen!

**BentoSchwerpunkte:**
- Featured[0]: icon `emoji_people`, „Freie Bewegung" – Spiel und Exploration an verschiedenen Turnstationen, angepasst an den Entwicklungsstand des Kindes.
- Featured[1]: icon `music_note`, „Gemeinschaft & Spaß" – Sing- und Bewegungskreise stärken das Gemeinschaftsgefühl und machen Turnstunden unvergesslich.
- Small[0]: icon `balance`, „Koordination" – Erste Kletterversuche, Balancieren und Springen.
- Small[1]: icon `groups`, „Soziales Lernen" – Kinder lernen voneinander und miteinander.
- Small[2]: icon `child_care`, „Individuelle Förderung" – Jedes Kind bestimmt sein eigenes Tempo.

**KonzeptSection:**
- overlayQuote: „Beim Turnen mit Mama und Papa wächst nicht nur das Kind – auch die gemeinsame Freude."
- Blockquote: „Wir starten und beenden jede Stunde mit einem Singkreis. Beim Auf- und Abbau der Stationen dürfen alle mit anpacken."

**TrainerCard:**
- role: „Deine Trainerin"
- name: „Carina Faust"
- bio: „Mit ihrer Erfahrung in der frühkindlichen Bewegungsförderung schafft Carina eine offene und herzliche Atmosphäre für Kinder und Eltern. Für Anmeldung und Schnupperstunden meldet euch bitte per WhatsApp: 0178 7820848"
- skills: [„Frühkindliche Bewegungsförderung", „Eltern-Kind-Turnen"]

---

### Kids in Bewegung – Kinder 3 bis 6 Jahre (2 Gruppen)

**Untertitel:** Toben, klettern, spielen – mit Gleichaltrigen  
**Badge:** Kinder 3 – 6 Jahre  
**Ort:** Mehrzweckhalle, Görsroth  
**Mitzubringen:** Wasserflasche (kein Glas), Hallenturnschuhe, Sportkleidung  

**Gruppe 1** (ab 3,5 Jahren bis Vorschulalter):  
Kurszeit: Dienstags, 15:30 – 16:15 Uhr  
Kontakt: Friederike Frömel (friederikefroemel@hotmail.com) · Anne Bicanic  

**Gruppe 2** (Vorschule bis Ende 1. Klasse, 5–7 Jahre):  
Kurszeit: Mittwochs, 16:45 – 17:30 Uhr  
Kontakt: Stefanie Specht (WhatsApp: 0173-4689586) · Kerstin Hildebrand  

**Anmeldung:** Gruppe 1 per E-Mail an Friederike Frömel, Gruppe 2 per WhatsApp bei Stefanie Specht. Teilnehmerzahl begrenzt.

**ContentSplit-Text:**
- Kinder ab 3,5 Jahren bis ins frühe Grundschulalter können hier ihre motorischen und sensorischen Fähigkeiten trainieren. Wir bieten ein abwechslungsreiches Repertoire aus Bewegungsbaustellen, Bewegungslandschaften und Bewegungsgeschichten.
- Es wird geturnt, geklettert, gespielt und gelacht. Das Team freut sich über Hilfe beim Auf- und Abbau.

**BentoSchwerpunkte:**
- Featured[0]: icon `sports_gymnastics`, „Motorik & Koordination" – Klettern, Balancieren und erste koordinative Übungen werden spielerisch vermittelt.
- Featured[1]: icon `group`, „Gemeinschaft" – Kinder lernen in der Gruppe miteinander und voneinander – Fairness und Teamgeist inklusive.
- Small[0]: icon `landscape`, „Bewegungslandschaften" – Wechselnde Turnstationen für immer neue Herausforderungen.
- Small[1]: icon `auto_stories`, „Bewegungsgeschichten" – Fantasievolle Traumreisen, die Kreativität und Bewegung verbinden.
- Small[2]: icon `emoji_events`, „Ohne Leistungsdruck" – Freude an Bewegung steht im Mittelpunkt – kein Vergleich, kein Druck.

**KonzeptSection:**
- overlayQuote: „Wer als Kind Freude an Bewegung findet, trägt sie ein Leben lang in sich."
- Blockquote: „Unser Team freut sich über jeden neuen Besuch – und über Hilfe beim Auf- und Abbau der Stationen!"

**TrainerCards:** 2× (eine pro Gruppe)
- TrainerCard 1: role „Gruppe 1 – Trainerin", name „Friederike Frömel & Anne Bicanic", bio „Friederike und Anne begleiten eure Kinder (ab 3,5 Jahren bis Vorschulalter) dienstags von 15:30 bis 16:15 Uhr in der Mehrzweckhalle Görsroth. Anmeldung per E-Mail: friederikefroemel@hotmail.com", skills [„Kindersport", „Bewegungsförderung"]
- TrainerCard 2: role „Gruppe 2 – Trainerin", name „Stefanie Specht & Kerstin Hildebrand", bio „Stefanie und Kerstin betreuen Kinder im Vorschul- und frühen Grundschulalter (5–7 Jahre) mittwochs von 16:45 bis 17:30 Uhr. Anmeldung per WhatsApp: 0173-4689586", skills [„Kindersport", „Bewegungsförderung"]

**KursCtaSection:** footnote „Teilnehmerzahl begrenzt – frühzeitig anmelden!"

---

### Grundschulturnen – Kinder 6 bis 10 Jahre

**Untertitel:** Auspowern und Spaß haben mit Gleichaltrigen  
**Badge:** Grundschulkinder 6 – 10J  
**Kurszeit:** Freitags, 17:30 – 18:30 Uhr  
**Ort:** Turnhalle, Hünstetten  
**Mitzubringen:** Sportschuhe, Wasserflasche  
**Trainerinnen:** Hanna Stein (0176 66611304) + Inken Bandow (0176 24903592)

**ContentSplit-Text:**
- Kinder im Grundschulalter sind bewegungsfreudig und lieben den Ausgleich zum Sitzen in der Schule. In diesem Kurs haben sie die Möglichkeit, sich auszutoben und erste Erfahrungen mit gezieltem Körper- und Schnelligkeitstraining zu machen.
- Alles spielerisch und ohne Zwang. Kleine Spieleinheiten runden das Bewegungsprogramm ab. Die Möglichkeit, mit Gleichaltrigen Neues zu erlernen und Spaß an Spiel und Bewegung zu haben, wird hier großgeschrieben.

**BentoSchwerpunkte:**
- Featured[0]: icon `sprint`, „Schnelligkeit & Kraft" – Spielerisches Körper- und Schnelligkeitstraining, das Grundlagen für ein aktives Leben legt.
- Featured[1]: icon `sports`, „Spiel & Spaß" – Spieleinheiten fördern Teamgeist, Fairness und die Freude an gemeinsamer Bewegung.
- Small[0]: icon `directions_run`, „Ausdauer" – Spielerische Ausdauerübungen für mehr Fitness im Alltag.
- Small[1]: icon `emoji_events`, „Ohne Leistungsdruck" – Jedes Kind kann sein eigenes Tempo gehen.
- Small[2]: icon `group`, „Neue Freundschaften" – Gemeinsam Neues entdecken und dabei Gleichaltrige kennenlernen.

**KonzeptSection:**
- overlayQuote: „Sport im Grundschulalter legt das Fundament für ein Leben voller Bewegungsfreude."
- Blockquote: „Wir, Hanna und Inken, freuen uns über jeden neuen Besuch und würden auch dein Kind gerne in unserer nächsten Stunde begrüßen."

**TrainerCards:** 2× (eine pro Trainerin)
- TrainerCard 1: role „Deine Trainerin", name „Hanna Stein", bio „Hanna begleitet die Kinder mit viel Energie und Begeisterung. Ihr Ziel ist es, jedem Kind den Spaß an Bewegung zu vermitteln und ein Umfeld zu schaffen, in dem sich alle wohlfühlen. Kontakt: 0176 66611304", skills [„Kindersport", „Spielpädagogik"]
- TrainerCard 2: role „Deine Trainerin", name „Inken Bandow", bio „Inken bringt Kreativität und Schwung in jede Stunde. Gemeinsam mit Hanna sorgt sie dafür, dass die Kinder neue Bewegungsformen entdecken und dabei Freundschaften schließen. Kontakt: 0176 24903592", skills [„Kindersport", „Bewegungspädagogik"]

---

## Abteilungsseite – Inhalte

### Navigation
```
{ label: 'Früh übt sich I',  href: '../fruehuebtsich-1' },
{ label: 'Früh übt sich II', href: '../fruehuebtsich-2' },
{ label: 'Kids in Bewegung', href: '../kids-in-bewegung' },
{ label: 'Grundschulturnen', href: '../grundschulturnen' },
```

### Stats (StatsBar)
```ts
{ value: '4',    label: 'Altersgruppen',     accent: 'primary' },
{ value: '6M+',  label: 'Ab Säuglingsalter', accent: 'secondary' },
{ value: '80 J.',label: 'Vereinstradition',  accent: 'primary' },
{ value: '6',    label: 'Trainerinnen',      accent: 'secondary' },
```

### AbteilungHero
- badge: „SG Hünstetten"
- title: „Kinderturnen: Bewegungsfreude von Anfang an"
- subtitle: „Von den ersten Bewegungsabenteuern im Säuglingsalter bis zum sportlichen Grundschulkind – bei uns findet jedes Kind den richtigen Kurs."
- primaryCta: „Jetzt Kurs finden"
- secondaryCta: „Mehr erfahren"

### TeamsInAbteilung (4 Einträge)
| tag | title | href |
|-----|-------|------|
| Kleinkinder 6M–1,5J | Früh übt sich (I) | ../fruehuebtsich-1 |
| Kleinkinder 1,5–3J | Früh übt sich (II) | ../fruehuebtsich-2 |
| Kinder 3–6 Jahre | Kids in Bewegung | ../kids-in-bewegung |
| Grundschulkinder 6–10J | Kinder stärken durch Sport, Spiel & Spaß | ../grundschulturnen |

### Was wir anbieten (inline, analog "Was ist Gesundheitssport?")
- h2: „Bewegungsförderung für alle Altersgruppen"
- Text (links): Rohtext aus User-Input, gekürzt und strukturiert
- Feature-Cards: „Alle Altersgruppen" (icon `child_care`) + „Spielerisches Lernen" (icon `sports_gymnastics`)
- Bild (rechts): freigewähltes Kinderturn-Bild

### Warum Bewegung so wichtig ist (inline, analog Präventions-Sektion)
- Enthält: Stichpunkte aus dem Rohtext (motorische Fähigkeiten, soziale Kompetenzen, Stressabbau)
- Checkmarks-Liste (3 Punkte), Bild links

### KursInfoBox
- title: „Du weißt nicht, welcher Kurs zu deinem Kind passt?"
- description: „Komm einfach zu einem Probetraining vorbei oder kontaktiere direkt die jeweilige Trainerin."
- ctaLabel: „Trainerin kontaktieren"

### AbteilungCta
- title: „Bereit für das erste Abenteuer?"
- subtitle: „Melde dein Kind jetzt für einen Kurs an und entdecke, was Kinderturnen bei der SG Hünstetten bedeutet."
- primaryLabel: „Kurs finden"
- secondaryLabel: „Kontakt aufnehmen"

---

## Akzeptanzkriterien

**Abteilungsseite:**

1. **`app/kinderturnen/layout.tsx`** – CDN_CSS + cdnScript + IMAGE_FALLBACK_SCRIPT (wie gesundheitssport/layout.tsx).

2. **`app/kinderturnen/page.tsx`** – Enthält: BaseNav, AbteilungHero, StatsBar, „Was wir anbieten"-Sektion (inline), TeamsInAbteilung, Kursplan-Tabelle mit 4 Einträgen (Mo/Mi/Di/Fr), KursInfoBox, „Warum Bewegung"-Sektion (inline), AbteilungCta, SponsorBand, SiteFooter.

3. **`components/kinderturnen/TeamsInAbteilung.tsx`** – 4 Kurse als TeamRow mit alternating imageLeft (i % 2 === 0). Props-Struktur identisch zu gesundheitssport/TeamsInAbteilung.tsx.

4. **Navigation** verlinkt korrekt auf ../fruehuebtsich-1, ../fruehuebtsich-2, ../kids-in-bewegung, ../grundschulturnen.

5. **Build fehlerfrei** nach Abteilungsseite allein.

**Unterseiten:**

6. **`KursInfoGrid`** – optionaler `groupLabel?: string` prop. Wenn gesetzt: erscheint als Abschnitts-Überschrift über der Karten-Gruppe (z.B. `<h3>Gruppe 1 (ab 3,5 Jahren)</h3>`). Nicht breaking für bestehende 11 Seiten.

7. **`fruehuebtsich-1/page.tsx`** – 7 Sektionen, Kurszeit Mi 15:15–16:00, Trainerin Carina Faust.

8. **`fruehuebtsich-2/page.tsx`** – 7 Sektionen, Kurszeit Mo 15:15–16:15, Trainerin Carina Faust. Keine COVID-Hinweise.

9. **`kids-in-bewegung/page.tsx`** – 2× KursInfoGrid (mit groupLabel „Gruppe 1 (ab 3,5 Jahren)" / „Gruppe 2 (Vorschule bis 1. Klasse)"), ContentSplit, BentoSchwerpunkte, KonzeptSection, 2× TrainerCard, KursCtaSection (mit footnote „Teilnehmerzahl begrenzt").

10. **`grundschulturnen/page.tsx`** – 7 Sektionen, 2× TrainerCard (Hanna Stein + Inken Bandow), Kurszeit Fr 17:30–18:30.

11. **Alle 4 layouts** nutzen CDN_CSS + cdnScript + IMAGE_FALLBACK_SCRIPT.

12. **Kein visueller Bruch** – Unterseiten sehen aus wie bestehende S-004-Seiten. Build fehlerfrei (`npm run build`).

---

## Technische Notizen

### KursInfoGrid – groupLabel-Erweiterung

```tsx
type KursInfoGridProps = {
  kurszeit: string
  ort: string
  mitzubringen: string
  mitzubringenIcon?: string
  groupLabel?: string   // neu: Gruppen-Titel für kids-in-bewegung
}

// Rendering: wenn groupLabel gesetzt:
// <h3 className="text-2xl font-black text-primary text-center mb-4">{groupLabel}</h3>
// vor dem 3-Card-Grid einfügen (außerhalb des -mt-12 Containers)
```

### Reihenfolge der Umsetzung

1. `KursInfoGrid` um `groupLabel` erweitern (nicht breaking)
2. `app/kinderturnen/layout.tsx` + `app/kinderturnen/page.tsx` + `components/kinderturnen/TeamsInAbteilung.tsx`
3. `fruehuebtsich-1` + `fruehuebtsich-2` (je 1 Trainerin, einfachste Struktur)
4. `grundschulturnen` (2 TrainerCards)
5. `kids-in-bewegung` (2× groupLabel + 2× TrainerCard)
6. `npm run build`

### Layout-Pattern (alle Unterseiten)

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

### Bilder

Alle Seiten können Placeholder-Bilder von lh3.googleusercontent.com verwenden (wie bestehende Kurs-Unterseiten). Der Dev sucht passende Bilder aus dem bereits verwendeten Pool oder nimmt thematisch nahe Bilder.

### Kontaktdaten

Telefonnummern und E-Mail-Adressen werden als plain Text in `TrainerCard.bio` eingebettet. Kein separates Kontakt-Prop nötig – die Seite ist statisch und hat keine Formular-Integration.

---

## Out of Scope

- Anmeldeformular / Online-Buchung
- Dynamische Kursplan-Filterung
- Bilder-Upload oder Fotogalerie
- Eltern-Login oder geschützter Bereich
- Neue gemeinsame Komponenten außer `groupLabel` in KursInfoGrid

---

## Impact

| Vorher | Nachher |
|--------|---------|
| Kinderturnen hat keine eigene Seite | 1 Abteilungsseite + 4 Unterseiten |
| Kursinfos nur über Dritte zugänglich | Direkt auf der Website auffindbar |
| Kein einheitliches Design | Identisches Design wie Gesundheitssport / S-004 |
