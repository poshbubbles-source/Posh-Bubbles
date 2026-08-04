# Posh Bubbles

Premium bath and beauty ecommerce storefront — built with React, Vite, TypeScript, and Tailwind CSS.

---

## Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Routing | Wouter |
| State / Data | TanStack Query |
| Forms | React Hook Form + Zod |

---

## Getting Started

```bash
# Install dependencies (from workspace root)
pnpm install

# Start the dev server
pnpm --filter @workspace/posh-bubbles run dev
```

---

## Project Structure

```
src/
├── assets/           Static assets imported by components
├── components/
│   ├── common/       Shared, domain-agnostic components
│   ├── layout/       Header, footer, navigation, sidebar
│   ├── home/         Homepage-specific components
│   ├── product/      Product card, detail, gallery, options
│   ├── collection/   Collection grid, filters, pagination
│   ├── cart/         Cart drawer, line items, totals
│   ├── ui/           shadcn/ui primitives (auto-generated)
│   └── forms/        Form field compositions
├── layouts/          Page layout wrappers
├── pages/            Route-level page components
├── hooks/            Custom React hooks
├── services/         Data-fetching and third-party integrations
├── utils/            Pure helper functions
├── types/            Shared TypeScript types and interfaces
├── data/             Static / seed data
├── styles/           Global CSS overrides
├── constants/        App-wide constants and route paths
├── context/          React Context providers
└── lib/              Low-level utilities (cn, etc.)

public/
├── images/           Static product and brand images
├── icons/            SVG icons not bundled via components
├── fonts/            Custom web fonts
└── placeholders/     Placeholder images for development

catalogue/            Product catalogue data and CMS exports
docs/                 Technical and product documentation
scripts/              Utility scripts (sitemap, image optimisation, etc.)
```

---

## Key Conventions

- All route paths are defined in `src/constants/index.ts` → `ROUTES`
- Shared TypeScript types live in `src/types/index.ts`
- Use `cn()` from `src/utils/index.ts` (re-exported from `src/lib/utils.ts`)
- Components are named with PascalCase; files match the component name
- Hooks are prefixed with `use` and live in `src/hooks/`

---

## Licence

Private — all rights reserved.
