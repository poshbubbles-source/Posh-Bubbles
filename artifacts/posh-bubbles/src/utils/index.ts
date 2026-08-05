// ─── Posh Bubbles — Utilities ───────────────────────────────────────────────

export { sortProducts, sortLabel, SORT_OPTIONS, DEFAULT_SORT } from './sort';
export type { SortValue } from './sort';

export { cn } from '@/lib/utils';

/**
 * Format a price amount for display.
 * @example formatPrice(1999, 'USD') → "$19.99"
 */
export function formatPrice(amountInCents: number, currencyCode = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(amountInCents / 100);
}

/**
 * Truncate a string to a maximum length, appending an ellipsis when trimmed.
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return `${str.slice(0, maxLength).trimEnd()}…`;
}

/**
 * Convert a string to a URL-safe slug.
 * @example slugify('Bath & Body') → "bath-body"
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
