# Posh Bubbles

Premium bath and beauty ecommerce storefront — React/Vite frontend, Express API, PostgreSQL + Drizzle ORM, all in a pnpm monorepo.

## Run & Operate

- `pnpm --filter @workspace/posh-bubbles run dev` — start the React storefront (Replit manages the port via `$PORT`)
- `pnpm --filter @workspace/api-server run dev` — start the Express API server
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes to the dev database (Drizzle Kit)

> **DATABASE_URL** is automatically injected by Replit — no manual setup required.

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React 18 + Vite, Tailwind CSS v4, shadcn/ui, Wouter, TanStack Query
- API: Express 5
- DB: PostgreSQL + Drizzle ORM (schema lives in `lib/db/src/schema/`)
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API contract: OpenAPI spec in `lib/api-spec/openapi.yaml`, code-gen via Orval → `lib/api-client-react/`
- Build: esbuild

## Where things live

| Concern | Path |
|---|---|
| Storefront (React/Vite) | `artifacts/posh-bubbles/src/` |
| API server (Express) | `artifacts/api-server/src/` |
| DB schema (Drizzle) | `lib/db/src/schema/` |
| API spec (OpenAPI) | `lib/api-spec/openapi.yaml` |
| Generated API hooks | `lib/api-client-react/src/` |
| Shared Zod schemas | `lib/api-zod/src/` |

## Architecture decisions

- Schema-first: the OpenAPI spec is the source of truth for the API contract; hooks and Zod validators are generated from it.
- `lib/db` exports both the Drizzle client and schema — import from `@workspace/db` or `@workspace/db/schema`.
- Drizzle `push` (not `migrate`) is used for dev schema changes; production schema changes go through the Replit Publish flow.

## Product

Posh Bubbles sells premium bath and beauty products. The storefront has pages for home, shop/collection, product detail, bundles, cart, about, FAQ, and contact.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- Always run `pnpm install` from the workspace root after pulling new changes that add packages.
- `DATABASE_URL` is runtime-managed by Replit — do not set it manually.
- The DB schema (`lib/db/src/schema/index.ts`) is currently empty — tables need to be defined before the API can persist data.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
