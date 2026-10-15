# MSP Solar Consultancy website

A copy of https://solar-bhaskar-jaipur.lovable.app/ built with React, Vite and Tailwind. It is a static site hosted on GitHub Pages:

**https://madhuratan.github.io/mspsolar/**

Every push to `main` rebuilds and redeploys the site automatically (`.github/workflows/deploy.yml`).

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:5173/mspsolar/.

## Features

- **Solar Calculator**: runs in the browser. It works out system size, panels, roof area, monthly generation, savings, cost, PM Surya Ghar subsidy and payback, plus a short Hindi summary.
- **Contact form**: checks the details, then opens WhatsApp (+91-7357562385) with the name, mobile, city and bill pre-filled. Leads arrive on WhatsApp; nothing is stored on a server.
- **WhatsApp and phone links**: all point to +91-7357562385.

## Change the numbers

All calculator assumptions are in `ASSUMPTIONS` at the top of `shared/solar.ts`: units generated per kW, panel wattage, roof area per kW, electricity tariff, cost per kW, the hybrid battery premium and the subsidy slabs. Update them to match current market rates, then push.
