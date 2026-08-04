// ─── Posh Bubbles — App Constants ──────────────────────────────────────────
// Placeholder file. Populate as the project grows.

export const SITE_NAME = 'Posh Bubbles';
export const SITE_DESCRIPTION = 'Premium bath and beauty for the everyday ritual.';
export const SITE_URL = 'https://poshbubbles.com';

/** Client-side route paths */
export const ROUTES = {
  HOME: '/',

  // ── Top-level shop
  SHOP: '/shop',

  // ── Category pages
  SKIN_CARE: '/shop/skin-care',
  LIP_CARE: '/shop/lip-care',
  HAIR_CARE: '/shop/hair-care',
  BODY_CARE: '/shop/body-care',
  SUNSCREEN: '/shop/sunscreen',
  SOAPS_BARS: '/shop/soaps-bars',
  FOOT_CARE: '/shop/foot-care',
  EYE_CARE: '/shop/eye-care',
  PET_CARE: '/shop/pet-care',

  // ── Skin Care subcategories
  FACE_WASHES: '/shop/skin-care/face-washes',
  MISTS: '/shop/skin-care/mists',
  SERUMS: '/shop/skin-care/serums',
  MOISTURIZERS: '/shop/skin-care/moisturizers',
  MASKS: '/shop/skin-care/masks',

  // ── Lip Care subcategories
  LIP_BALMS: '/shop/lip-care/lip-balms',

  // ── Hair Care subcategories
  HAIR_CARE_SHAMPOOS: '/shop/hair-care/shampoos',
  CONDITIONERS: '/shop/hair-care/conditioners',
  HAIR_SERUMS: '/shop/hair-care/hair-serums',

  // ── Body Care subcategories
  BODY_WASH: '/shop/body-care/body-wash',
  BODY_LOTION: '/shop/body-care/body-lotion',
  BODY_BUTTER: '/shop/body-care/body-butter',
  BODY_SCRUB: '/shop/body-care/body-scrub',

  // ── Sunscreen subcategories
  FACE_BODY_SUNSCREEN: '/shop/sunscreen/face-body-sunscreen',

  // ── Soaps & Bars subcategories
  BATH_BAR_SOAP: '/shop/soaps-bars/bath-bar-soap',
  WHIPPED_SOAP: '/shop/soaps-bars/whipped-soap',
  LIQUID_SOAP: '/shop/soaps-bars/liquid-soap',

  // ── Foot Care subcategories
  FOOT_CREAM: '/shop/foot-care/foot-cream',

  // ── Eye Care subcategories
  UNDER_EYE_GEL: '/shop/eye-care/under-eye-gel',

  // ── Pet Care subcategories
  PET_CARE_SHAMPOOS: '/shop/pet-care/shampoos',

  // ── Other pages
  FEATURED: '/featured',
  BUNDLES: '/bundles',
  ABOUT: '/about',
  FAQ: '/faq',
  CONTACT: '/contact',

  // ── Future pages (not yet implemented)
  PRODUCT: '/products/:handle',
  CART: '/cart',
  SEARCH: '/search',
  ACCOUNT: '/account',
} as const;

/** Pagination defaults */
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 24,
  MAX_PAGE_SIZE: 96,
} as const;

/** Currency */
export const DEFAULT_CURRENCY = 'USD';
