// ─── Posh Bubbles — Shared Types ───────────────────────────────────────────
// Placeholder file. Populate as the project grows.

export type ID = string | number;

export interface Image {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface Price {
  amount: number;
  currencyCode: string;
}

export interface SEOMeta {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
}
