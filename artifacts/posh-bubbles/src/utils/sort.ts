/**
 * sort.ts — Product sorting utilities
 *
 * Pure functions: no side-effects, no API/DB calls.
 * All logic operates on the in-memory Product array.
 */

import type { Product } from '@/types';

// ─── Sort key enum ────────────────────────────────────────────────────────────

export const SORT_OPTIONS = [
  { value: 'featured',       label: 'Featured'           },
  { value: 'new-arrivals',   label: 'New Arrivals'       },
  { value: 'best-sellers',   label: 'Best Sellers'       },
  { value: 'price-asc',      label: 'Price: Low to High' },
  { value: 'price-desc',     label: 'Price: High to Low' },
] as const;

export type SortValue = (typeof SORT_OPTIONS)[number]['value'];

export const DEFAULT_SORT: SortValue = 'featured';

// ─── Comparators ─────────────────────────────────────────────────────────────

/**
 * Sort products by the given sort key.
 * Returns a new array — the original is never mutated.
 *
 * Sort strategies:
 *   featured     – featured products first; ties keep original index order
 *   new-arrivals – newest createdAt first
 *   best-sellers – most reviews first (proxy for sales volume)
 *   price-asc    – lowest price first
 *   price-desc   – highest price first
 */
export function sortProducts(products: Product[], sort: SortValue): Product[] {
  const items = products.map((p, originalIndex) => ({ p, originalIndex }));

  switch (sort) {
    case 'featured':
      items.sort((a, b) => {
        if (a.p.isFeatured === b.p.isFeatured) {
          return a.originalIndex - b.originalIndex;
        }
        return a.p.isFeatured ? -1 : 1;
      });
      break;

    case 'new-arrivals':
      items.sort((a, b) =>
        new Date(b.p.createdAt).getTime() - new Date(a.p.createdAt).getTime(),
      );
      break;

    case 'best-sellers':
      items.sort((a, b) => {
        const diff = b.p.reviews.length - a.p.reviews.length;
        // Stable tie-break: keep original order
        return diff !== 0 ? diff : a.originalIndex - b.originalIndex;
      });
      break;

    case 'price-asc':
      items.sort((a, b) => a.p.price - b.p.price);
      break;

    case 'price-desc':
      items.sort((a, b) => b.p.price - a.p.price);
      break;

    default: {
      // Exhaustive check — TypeScript will error if a new SortValue is added
      // without a matching case.
      const _: never = sort;
      void _;
    }
  }

  return items.map(({ p }) => p);
}

// ─── Hook-friendly convenience ────────────────────────────────────────────────

/**
 * Returns the human-readable label for a sort value.
 * Useful for aria-labels and display strings outside the selector.
 */
export function sortLabel(sort: SortValue): string {
  return SORT_OPTIONS.find((o) => o.value === sort)?.label ?? sort;
}
