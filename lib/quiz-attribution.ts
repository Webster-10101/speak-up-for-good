// Only campaign fields are retained; never copy arbitrary URL parameters.
export const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const;
export type Attribution = Partial<Record<typeof UTM_KEYS[number], string>>;
const STORAGE_KEY = 'speaker-quiz-attribution';
export function sanitizeAttribution(input: unknown): Attribution {
  const result: Attribution = {};
  if (!input || typeof input !== 'object') return result;
  for (const key of UTM_KEYS) {
    const value = (input as Record<string, unknown>)[key];
    if (typeof value === 'string' && value.trim()) result[key] = value.trim().slice(0, 200);
  }
  return result;
}
export function getQuizAttribution(): Attribution {
  if (typeof window === 'undefined') return {};
  const params = new URLSearchParams(window.location.search);
  const incoming = sanitizeAttribution(Object.fromEntries(params.entries()));
  try {
    // A new tagged visit replaces the campaign as a whole; don't mix campaigns.
    if (Object.keys(incoming).length) {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(incoming));
      return incoming;
    }
    return sanitizeAttribution(JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) || '{}'));
  } catch { return incoming; }
}
export function addAttribution(url: string, attribution: Attribution): string {
  const result = new URL(url, 'https://www.speakupforgood.com');
  for (const [key, value] of Object.entries(sanitizeAttribution(attribution))) result.searchParams.set(key, value);
  return url.startsWith('/') ? result.pathname + result.search + result.hash : result.toString();
}
export function quizBookingUrl(): string {
  return addAttribution('https://calendly.com/alistair-webster/intro-call', getQuizAttribution());
}
// Store with the existing JSONB submission data, without a database migration.
export function storedAttribution(answers?: Record<string, string | string[]>): Attribution {
  try { return sanitizeAttribution(JSON.parse(String(answers?._attribution || '{}'))); }
  catch { return {}; }
}
