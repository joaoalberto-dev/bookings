[![CI](https://github.com/joaoalberto-dev/bookings/actions/workflows/ci.yml/badge.svg)](https://github.com/joaoalberto-dev/bookings/actions/workflows/ci.yml)

# Bookings

This project is the implementation of the `React Technical Test` for the Bookings application.

## Stack

### Package manager

- pnpm

### Languages, frameworks and tools

- Typescript
- Vite
- React (with compiler)
- Vitest

### Linting and formatting

- ESLint
- Prettier

## Scripts

- `dev`: `pnpm dev` Start the development server
- `build`: `pnpm build` Build the project for production
- `test`: `pnpm test` Run tests
- `test:watch`: `pnpm test:watch` Run tests in watch mode
- `coverage`: `pnpm coverage` Generate test coverage report
- `lint`: `pnpm lint` Lint the project
- `lint:fix`: `pnpm lint:fix` Lint and fix the project
- `format`: `pnpm format` Format the project
- `format:check`: `pnpm format:check` Check if the project is formatted

## Plan

My reasoning to solve this challange is split the solution in small blocks of deliverables.

- [x] Environment with the tooling required to speedup the development with confidence.
- [x] Define the architecure required to achieve scalabilty and reliability.
- [ ] Specify and refine the domains necessaries to achieve the requirements.
- [ ] Build the data management layer (state, validations, error handling) without focusing in the UI
- [ ] Build the UI around the defined data layer focusing in the UX
- [ ] Polish the UI and iterate over the UX
- [ ] Reflect over what was done and what could be different
- [ ] Plan next moves

## Architecure

### Description

A **feature-based** architecture, with well defined boundaries between the domains each feature handle.

Each feature contains its own:

- `data`: handling (state, selectors, mapping, validation, error handling)
- `ui`: feature specific components focused on rendering and user interaction
- `tests`: unit and integration

Besides features, we will have:

- `/pages`: top-level components composition
- `/ui`: reusable components
- `/hooks`: reusable hooks

This architecture aims to create a scalable and testable environment.

### Domains/Features

#### Property

This domain is very simple and will be responsible to handle the properties listing.

```js
// Schema
{
    id: string,           // UUID
    name: string,         // A short description of the property
    description: string,  // A long description of the property and its amenities
    cover: string,        // A single image to be used as cover
    day_price: number,    // Daily price in cents
    currency: 'USD'       // ISO 4217 ref.: https://www.iban.com/currency-codes
}

// Example fake request
// GET /properties
[
    {
        id: '3aa5fc6b-c472-42e4-8cc2-652e44ba800d'
        name: 'Stuning house by the sea'
        description: 'This stunning house by the sea offers a calm and welcoming retreat where comfort and nature are seamlessly connected. Large windows fill the interior with natural light and frame uninterrupted ocean views, while soft, neutral tones and natural materials create a warm, relaxing atmosphere throughout the home. The open-plan living area invites quiet mornings and cozy evenings, with spaces designed for both rest and togetherness.\n\nThe kitchen and dining area flow naturally toward an outdoor terrace, making it easy to enjoy meals with the sound of the waves in the background. Bedrooms are peaceful and intimate, designed as private sanctuaries with gentle lighting and views of the water. Outdoors, a spacious deck extends the living space, perfect for relaxing during the day or enjoying the sunset in the evening.\n\nAmenities:\n\nOcean-facing terrace and wooden deck\n\nLarge panoramic windows\n\nCozy fireplace in the living area\n\nFully equipped open-plan kitchen\n\nOutdoor dining and seating area\n\nFire pit for evening gatherings\n\nOutdoor shower for post-beach comfort\n\nSmart lighting and climate control\n\nReading nook and relaxation spaces'
        cover: 'https://cdn.url.com/properties/3aa5fc6b-c472-42e4-8cc2-652e44ba800d.png'
        day_price: 30_000
    }
]
```

#### Booking

This is the most complex domain, responsible for handle all the operations required for booking

```js
// Schema
{
    id: string,          // UUID
    user_id: string,     // UUID
    property_id: string, // UUID
    start_date: string,  // ISO (YYYY-MM-DD) (Inclusive)
    end_date: string,    // ISO (YYYY-MM-DD) (Exclusive)
    day_price: number,   // Cents
    total_price: number, // Cents * nights
    currency: 'USD'      // ISO 4217 ref.: https://www.iban.com/currency-codes
}

// PS: I'm keeping the record of `day_price`, `total_price` and `currency` to have a complete snapshot of the booking without a need of a thirdy domain. In the real-world, pricing would be calculated server-side, not by the client.

// Example fake requests

// POST /bookings
// Payload:
{
    property_id: 'e704a692-5277-4703-9a8c-b08020fba931',
    start_date: '2026-04-01',
    end_date: '2026-04-10',
    day_price: 1_000,
    total_price: 9_000,
    currency: 'USD'
}

// GET /bookings
// Response:
[
    {
        id: '106116a7-1dd3-4c72-87c6-8656907cea9f',
        user_id: '465ec11a-72e5-4e11-9d02-e3ea3a935ba9',
        property_id: 'e704a692-5277-4703-9a8c-b08020fba931',
        start_date: '2026-04-01',
        end_date: '2026-04-10',
        day_price: 1_000,
        total_price: 9_000,
        currency: 'USD'
    }
]

// GET /bookings/:id
// Response:
{
    id: '106116a7-1dd3-4c72-87c6-8656907cea9f',
    user_id: '465ec11a-72e5-4e11-9d02-e3ea3a935ba9',
    property_id: 'e704a692-5277-4703-9a8c-b08020fba931',
    start_date: '2026-04-01',
    end_date: '2026-04-10',
    day_price: 1_000,
    total_price: 9_000,
    currency: 'USD'
}

// PUT /bookings/:id
// Payload:
{
    user_id: '465ec11a-72e5-4e11-9d02-e3ea3a935ba9',
    property_id: 'e704a692-5277-4703-9a8c-b08020fba931',
    start_date: '2026-04-01',
    end_date: '2026-04-10',
    day_price: 1_000,
    total_price: 9_000,
    currency: 'USD'
}

// DELETE /bookings/:id
// Response: N/A
```
