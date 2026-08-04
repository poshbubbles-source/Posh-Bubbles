// ─── Posh Bubbles — App Constants ──────────────────────────────────────────
// Placeholder file. Populate as the project grows.

export const SITE_NAME = 'Posh Bubbles';
export const SITE_DESCRIPTION = 'Premium bath and beauty for the everyday ritual.';
export const SITE_URL = 'https://poshbubbles.com';

/** Client-side route paths */
export const ROUTES = {
  HOME: '/',
  COLLECTIONS: '/collections',
  COLLECTION: '/collections/:handle',
  PRODUCT: '/products/:handle',
  CART: '/cart',
  SEARCH: '/search',
  ACCOUNT: '/account',
  ABOUT: '/about',
  CONTACT: '/contact',
} as const;

/** Pagination defaults */
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 24,
  MAX_PAGE_SIZE: 96,
} as const;

/** Currency */
export const DEFAULT_CURRENCY = 'USD';
