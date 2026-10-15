# MSP Solar Consultancy website

A copy of https://solar-bhaskar-jaipur.lovable.app/ built with React, Vite and Tailwind, plus a small Node (Express) server for the calculator and the contact form.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:5173. The API runs on port 3011 and Vite forwards `/api` requests to it.

For production:

```bash
npm run build
PORT=8080 npm start
```

This serves the built site and the API from one port.

## Features

- **AI Solar Calculator** (`POST /api/calculate`): the system size, panels, roof area, generation, savings, cost, PM Surya Ghar subsidy and payback are calculated in `server/solar.ts`. The Hindi summary under the results is written by Claude (`server/ai.ts`) when credentials are available. Without them, it uses a built-in Hindi template, so the calculator always works.
- **Contact form** (`POST /api/consultation`): validates the details, saves each lead to `data/leads.json` with a timestamp, then opens WhatsApp with the details pre-filled. This works the same as the original site, which saves to a Supabase table.
- **WhatsApp and phone links**: all point to +91-7357562385.

## Turn on AI summaries

Set a Claude API key before starting the server:

```bash
export ANTHROPIC_API_KEY=sk-ant-...
npm run dev
```

## Change the numbers

All calculator assumptions are in `ASSUMPTIONS` at the top of `server/solar.ts`: units generated per kW, panel wattage, roof area per kW, electricity tariff, cost per kW, the hybrid battery premium and the subsidy slabs. Update them to match current market rates.
