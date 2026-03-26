# VORTEX — Creative Digital Agency Landing Page

An Awwwards-quality creative agency landing page built with Next.js 15, GSAP animations, Lenis smooth scroll, and Tailwind CSS v4. Features kinetic typography, horizontal scroll showcase, custom cursor system, and scroll-driven effects.

## Tech Stack

- **Next.js 15** — App Router, TypeScript, React 19
- **GSAP 3.12+** — ScrollTrigger, SplitText-style character animations
- **Lenis** — Smooth scrolling with velocity tracking
- **Tailwind CSS v4** — Custom theme with design tokens
- **Zustand** — Global cursor state management
- **Lucide React** — SVG icon library

## Features

- **Kinetic Typography** — Character-by-character hero animation with GSAP
- **Custom Cursor System** — Context-aware cursor with morphing states (link, project, text)
- **Horizontal Scroll Showcase** — GSAP ScrollTrigger-pinned project gallery on desktop
- **Infinite Marquee** — Dual-row scrolling text with scroll velocity modulation
- **Video Background Section** — Full-width video with gradient overlay and blend modes
- **Scroll Velocity Skew** — CSS skewY transforms driven by Lenis scroll velocity
- **Team Section** — Hover-reveal cards with staggered scroll animations
- **Magnetic Social Icons** — Cursor-attracted footer icons with GSAP
- **Preloader** — Animated counter (0-100%) with loading bar
- **Responsive Design** — Desktop, tablet, mobile breakpoints with touch optimization
- **Reduced Motion** — Respects `prefers-reduced-motion` system preference

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with fonts
│   ├── page.tsx            # Main page with lazy-loaded sections
│   └── globals.css         # Tailwind v4 + custom styles
├── components/
│   ├── Preloader.tsx       # Loading animation
│   ├── CustomCursor.tsx    # Custom cursor with state morphing
│   ├── Navigation.tsx      # Fixed nav with hamburger menu
│   ├── Hero.tsx            # Kinetic typography hero
│   ├── ProjectShowcase.tsx # Horizontal scroll projects
│   ├── MarqueeSection.tsx  # Infinite marquee text
│   ├── VideoSection.tsx    # Video background section
│   ├── TeamSection.tsx     # Team grid with hover reveals
│   ├── Footer.tsx          # Footer with magnetic icons
│   └── SmoothScroll.tsx    # Lenis + GSAP scroll provider
├── lib/
│   ├── cursor-store.ts     # Zustand cursor state
│   ├── animations.ts       # Reusable GSAP animations
│   └── utils.ts            # Utility functions
└── fonts/
    └── ClashDisplay-Variable.woff2
```

## Color Palette

| Role       | Color     | Hex       |
|------------|-----------|-----------|
| Background | Black     | `#0a0a0a` |
| Text       | Cream     | `#f5f0e8` |
| Accent     | Orange    | `#ff4d00` |
| Secondary  | Purple    | `#8b5cf6` |

## Fonts

- **Syne** — Headings (Google Fonts)
- **Clash Display** — Display text (Fontshare)
- **Inter** — Body text (Google Fonts)
- **JetBrains Mono** — Code/details (Google Fonts)

## Deployment

Deploy to Vercel:

```bash
npx vercel
```

## Performance

- First Load JS: ~156 kB
- Lazy-loaded sections below the fold
- GPU-accelerated animations with `will-change`
- `React.memo` on card components
- Responsive images via `next/image`
