# Marriage Website

Personal wedding website built with Next.js 15. Features a public landing page for guests and an admin section for managing invites and song requests.

## Pages

| Route | Description |
|---|---|
| `/` | Home — hero, countdown, gift store CTA, location/date, photo gallery |
| `/confirmacoes` | RSVP — guests confirm attendance |
| `/lista-de-presentes` | Gift list via Shopify |
| `/pedidos-de-musica` | Song requests for the DJ |
| `/como-chegar` | Directions with Google Maps / Waze links |
| `/em-construcao` | Under construction placeholder |

## Stack

- **Framework:** Next.js 15 (App Router, Turbopack)
- **Database:** PostgreSQL via [Kysely](https://github.com/kysely-org/kysely)
- **Server Actions:** [next-safe-action](https://github.com/TheEdoRan/next-safe-action) + Zod
- **Styling:** SCSS Modules + custom `Moneta` font
- **Analytics:** Vercel Analytics
- **Gift store:** Shopify Storefront API
- **Validation:** Zod
- **Linting:** ESLint + Prettier + Husky + lint-staged

## Getting Started

```bash
yarn install
```

Create a `.env` file based on the required variables in `src/env.ts`, then:

```bash
yarn dev
```

App runs at `http://localhost:3000`.

## Database

Schema is generated from PostgreSQL via kysely-codegen:

```bash
yarn schema:generate
```

Tables: `invites`, `sessions`, `song_requests`.
