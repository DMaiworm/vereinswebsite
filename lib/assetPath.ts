const BASE = process.env.NODE_ENV === 'production' ? '/vereinswebsite' : ''

/** Für statische Assets aus /public in rohen <img src>/<video src>-Tags. */
export function asset(path: string) {
  return `${BASE}${path}`
}

/**
 * Für interne Seiten-Links in rohen <a href>-Tags (next/link braucht das nicht,
 * next/link hängt basePath automatisch selbst an). `path` immer absolut ab
 * Site-Root übergeben, z.B. internalHref('/fussball') oder internalHref('/').
 *
 * NIEMALS stattdessen relative Pfade ('../fussball', './fussball') in rohen
 * <a>-Tags verwenden — die brechen, sobald der Browser die aktuelle Seiten-URL
 * ohne trailing slash aufgelöst hat (z.B. „/vereinswebsite/fussball" statt
 * „/vereinswebsite/fussball/"): dann landet „../fitness" bei „/fitness" statt
 * „/vereinswebsite/fitness" — ein Bug, der auf JEDER Seite auftrat, die diesen
 * Pattern nutzte (siehe CLAUDE.md).
 */
export function internalHref(path: string) {
  return `${BASE}${path}`
}
