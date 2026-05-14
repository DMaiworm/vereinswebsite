const BASE = process.env.NODE_ENV === 'production' ? '/vereinswebsite' : ''

export function asset(path: string) {
  return `${BASE}${path}`
}
