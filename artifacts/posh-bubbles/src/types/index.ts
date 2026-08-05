/** Posh Bubbles — shared data interfaces. */

export interface Ingredient {
  name: string;
  description: string;
  benefit: string;
}

export interface Review {
  id: string;
  customerName: string;
  location: string;
  rating: number; // 1–5
  comment: string;
  date: string;   // ISO 8601 date string
  verified: boolean;
  product: string; // product slug
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  price: number;          // in smallest currency unit (e.g. cents)
  currency: string;       // ISO 4217, e.g. "USD"
  images: string[];       // paths relative to /public
  categorySlug: string;
  subcategorySlug: string;
  ingredients: Ingredient[];
  reviews: Review[];
  tags: string[];
  isFeatured: boolean;
  isAvailable: boolean;
  createdAt: string;      // ISO 8601
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;          // path relative to /public
  subcategories: Subcategory[];
  displayOrder: number;
}

export interface Subcategory {
  id: string;
  slug: string;
  name: string;
  description: string;
  categorySlug: string;
  displayOrder: number;
}
