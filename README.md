# JUTILABS — Marketing Site

Production marketing site for **JUTILABS**, an AI automation studio for food & commerce SMBs in LATAM.
Live at **https://jutilabs.com**

## What it is
A fast, single-page site that sells a done-for-you AI service: an assistant installed on a business's WhatsApp that takes orders, charges, and logs everything. It's built to convert local restaurant owners — clear hero, problem framing, real use cases, transparent pricing, and an **embedded interactive demo** the visitor can actually use.

## Highlights
- **Embedded interactive demo** — a real, filterable analytics panel (`/demos/panel.html`) framed like a browser window, so prospects touch the product instead of just reading about it.
- **Conversion-focused copy** anchored on one idea ("your first AI employee"), with use cases, a 60-day timeline, pricing and FAQ.
- **SEO & analytics** — semantic metadata, Open Graph / Twitter cards, FAQ structured data (JSON-LD), GA4 and Meta Pixel.
- **Performance** — fast, accessibility-conscious, SEO-optimized (high Lighthouse scores).

## Stack
- React + TypeScript, built with **Vite**
- **Tailwind CSS** with custom design tokens
- Deployed on **Vercel** (custom domain + automatic preview deployments per branch)
- Forms via Formspree

## Architecture notes
- UI is composed from a small set of reusable primitives (Section, Reveal, pricing cards, phone & dashboard mockups), which makes copy and layout fast to iterate.
- Static demo assets live in `public/` and are embedded through a **lazy-loaded iframe**, keeping the initial page load light without sacrificing the interactive proof.

## Run locally
```bash
npm install
npm run dev      # local dev server
npm run build    # production build
```

— Designed, built and shipped end to end by Tomás Muñoz (JUTILABS).
