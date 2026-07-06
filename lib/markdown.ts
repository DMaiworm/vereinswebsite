/**
 * Markdown-Rendering für redaktionelle Textfelder (S-407 / WebAPI-Guide §1.8).
 *
 * Der v1-Contract liefert längere Redaktionsfelder (News-`body`,
 * Abteilung-`langbeschreibung`/`description`, Team-`description`,
 * Homepage-`aboutText`/`aboutText2`) als **Markdown**. Consumer-Pflicht:
 * Markdown → HTML rendern und **sanitisieren**.
 *
 * Allowlist (Guide §1.8): p, br, strong, em, h2-h4, ul, ol, li, a, img,
 * blockquote, code, pre, hr — nur http/https/mailto-URIs.
 *
 * Plain-Text ohne Markup ist gültiges Markdown (abwärtskompatibel).
 */
import { marked } from 'marked'
import DOMPurify from 'isomorphic-dompurify'

marked.setOptions({ gfm: true, breaks: false })

const SANITIZE_CONFIG = {
  ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'h2', 'h3', 'h4', 'ul', 'ol', 'li', 'a', 'img', 'blockquote', 'code', 'pre', 'hr'],
  ALLOWED_ATTR: ['href', 'title', 'src', 'alt'],
  ALLOWED_URI_REGEXP: /^(?:https?:|mailto:)/i,
}

/**
 * Block-Level-Rendering (Absätze, Listen, Überschriften …) → sanitisiertes HTML.
 * Für mehrzeilige Felder wie News-`body`.
 */
export function renderMarkdown(md: string | null | undefined): string {
  if (!md) return ''
  const html = marked.parse(md, { async: false }) as string
  return DOMPurify.sanitize(html, SANITIZE_CONFIG)
}

/**
 * Inline-Level-Rendering (fett, kursiv, Links, Code) **ohne** umschließenden
 * `<p>`-Block → sanitisiertes HTML. Für einzeilige/kurze Felder, die im Layout
 * bereits in einem eigenen Element stecken (Subtitle, About-Text) — so bleibt
 * das bestehende Layout bei Plain-Text unverändert (kein doppeltes Escaping,
 * keine zusätzlichen Block-Margins).
 */
export function renderMarkdownInline(md: string | null | undefined): string {
  if (!md) return ''
  const html = marked.parseInline(md, { async: false }) as string
  return DOMPurify.sanitize(html, SANITIZE_CONFIG)
}
