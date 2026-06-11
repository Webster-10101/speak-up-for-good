// Escape user-supplied values before interpolating them into HTML
// (email templates). Without this, a crafted first name or quiz answer
// becomes attacker-controlled HTML in email sent from our domain.
export function escapeHtml(value: string): string {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
