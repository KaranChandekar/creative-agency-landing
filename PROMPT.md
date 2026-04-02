Build me an Awwwards-quality creative agency landing page from scratch using Next.js 15 with App Router, GSAP + ScrollTrigger, Lenis smooth scroll, Tailwind CSS v4, and modern CSS animation techniques.

**Project Requirements:**

**Tech Stack & Setup**
- Next.js 15 with App Router and TypeScript
- GSAP 3.12+ with ScrollTrigger and SplitText plugins
- Lenis for smooth scrolling with velocity tracking
- Tailwind CSS v4 with custom theme configuration
- Plain CSS for clip-path and blend-mode effects
- Responsive design with mobile-first approach

**Color Scheme**
- Background: `#0a0a0a` (pure black)
- Text: `#f5f0e8` (cream off-white)
- Accent: `#ff4d00` (orange-red)
- Secondary: `#8b5cf6` (purple for CTAs)
- Borders: `rgba(255, 255, 255, 0.1)`

**Typography & Fonts**
- Headings: Syne (Google Fonts) — bold, geometric, loaded with `next/font`
- Display: Clash Display (Fontshare) — large dramatic text
- Body: Inter (Google Fonts) — clean, readable
- Code/Details: JetBrains Mono (Google Fonts)

**Hero Section**
- Full-width viewport height section
- Animated kinetic typography headline using GSAP SplitText:
  - Main headline animates character-by-character on page load
  - Start state: opacity 0, scale 0, rotate -15deg
  - End state: opacity 1, scale 1, rotate 0
  - Stagger: 0.05s delay between characters
  - Duration: 0.8s per character, easing `power2.out`
- Subheading fades in 0.3s after headline completes
- Static background: solid color `#0a0a0a` or subtle noise texture
- CTA button "Explore Our Work" with hover effects:
  - Hover: background fills with accent color, text inverts
  - Hover: small arrow icon slides in from left
  - Active/click: subtle scale-down then return feedback
- One-time preloader on initial page load:
  - Animated counter 0 → 100% over 2-3 seconds
  - Animated loading bar underneath
  - Fade out and reveal page content on completion

**Fixed Navigation Bar**
- Sticky at top, full width
- Logo/brand name (left), nav links (center), CTA (right)
- Navigation links: Home, Work, About, Services, Contact
- Link hover: underline animates in from left (scaleX 0 → 1) in accent color
- Active link: permanent underline
- On scroll >50px: apply `backdrop-blur-md` background to navbar
- Hamburger menu (mobile only): three lines (≡) morph to X (✕) on click
  - Morph animation: 0.3s ease-in-out using SVG paths or CSS
  - Menu slides in from right when active with semi-transparent backdrop
  - Menu items fade and slide in with 0.1s stagger

**Custom Cursor System**
- Hide default cursor globally (`cursor: none`)
- Create custom circular cursor element (24px diameter):
  - Follows mouse smoothly with GSAP: 0.4s duration, `power2.out` easing
  - Semi-transparent border, no fill by default
- Cursor state changes on hover:
  - **Default**: small circle, cream border
  - **Link hover** (a, button): scales to 40px, border accent color, arrow icon appears
  - **Project card hover**: scales to 50px, semi-transparent accent fill, label "View"
  - **Text hover**: scales to 60px, full accent fill, label "Read"
- Detect proximity within 50px radius of interactive elements
- Store cursor state globally (Zustand recommended)
- Smooth transitions between states with GSAP morphing
- Disable on mobile/tablet (no cursor tracking on touch devices)

**Hero Preloader**
- Show only on initial page load
- Centered counter animation: 0 → 100% over 2-3 seconds
- Loading bar below counter: animates width 0 → 100% in sync
- On completion: fade out (0.5s) + scale down, reveal main page
- Never show again during session (no reload on navigation)

**Project Showcase Section (Horizontal Scroll)**
- Section container with horizontal scroll on desktop
- Use GSAP ScrollTrigger to control scroll: `pin: true` + `x` translate animation
- Desktop: 4-5 project cards visible, scroll horizontally
- Tablet/Mobile: convert to vertical grid layout (3-4 cards)
- Each card:
  - Fixed width 400px (desktop), responsive width (mobile)
  - Image (80% height, top)
  - Content overlay (bottom 20%, slides up on scroll)
  - Title, 1-2 line description, 3-4 tech tags, "View Project" button
  - Border: 1px `rgba(255, 255, 255, 0.1)`
  - Spacing between cards: 40px gap
- Card hover effects (desktop):
  - Scale: 1 → 1.08
  - Shadow: subtle to pronounced
  - Image overlay: darken to 0.4 opacity
  - Content overlay: fade in fully
  - Button: scale and color shift
- Image reveal animation on scroll into viewport:
  - Use clip-path polygon to reveal image from bottom to top
  - Start: `clip-path: polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)`
  - End: `clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)`
  - Duration: 0.8s, trigger on `start: "top 80%"`
  - Easing: `power3.inOut`

**Infinite Marquee Text Sections**
- Two horizontal scrolling text rows with words/phrases
- Row 1: scrolls left (negative direction)
- Row 2: scrolls right (positive direction)
- Create infinite loop by duplicating content
- Font: Syne Bold, 48px+, cream color
- Alternate words in accent color for visual interest
- Sample text:
  - Row 1: "Award Winning • Digital Experience • Creative Solutions • Brand Storytelling •"
  - Row 2: "Motion Design • Web Innovation • UI/UX Excellence • Interactive Media •"
- Animation: continuous loop, 20s duration, `ease: "none"`
- Scroll velocity modulation: Use Lenis velocity to speed up/slow down marquee
  - When scrolling fast, marquee speeds up
  - When scrolling stops, marquee returns to normal speed
  - Smooth playback rate change with GSAP `timeScale`

**Video Background Section**
- Full-width section with background video (16:9 aspect ratio)
- Video source: Free from Pexels or Pixabay (motion/abstract)
- Video properties: loop, muted, autoplay, no controls
- Fallback image displayed while loading
- Overlay gradient: `linear-gradient(to bottom, rgba(10,10,10,0.7), transparent 50%, rgba(10,10,10,0.9))`
- Mix-blend-mode: `screen` or `lighten` for creative effect
- Centered content overlay: headline "Our Creative Process", subheading, CTA button

**Scroll Velocity-Based Skew Effect**
- Track scroll velocity from Lenis `on('scroll')` callback
- Apply CSS `skewY` transform to content sections based on velocity magnitude
- Stronger skew during fast scrolling, smooth return to 0 when stopped
- Max skew: ±5 degrees for subtlety
- Affects multiple sections: cards, text blocks, images
- Creates "momentum" visual feedback as user scrolls

**Team Section**
- Grid layout: 2 columns (desktop), 1 column (mobile)
- 4 team members with headshots
- Each card:
  - Image (square crop, takes 70% of card)
  - Overlay: name, role, bio paragraph
  - Default: image visible, role hidden
  - Hover: image darkens (0.6 opacity), overlay slides up with role and bio visible
  - Social icons (GitHub, LinkedIn, Twitter) appear at bottom on hover
  - Duration: 0.4s ease-out
- Cards animate in on scroll into viewport:
  - Animation: fade + slide up (translateY 60px → 0)
  - Stagger: 0.15s between each card
  - Trigger: ScrollTrigger `start: "top 80%"`

**Footer Section**
- Full-width dark section
- Grid layout: 4 columns (Company, Products, Resources, Legal) + newsletter form
- Column headers: bold, cream color
- Links: hover animations
  - Underline animates in from left (scaleX 0 → 1)
  - Color changes to accent
  - Duration: 0.3s
- Magnetic social icons (GitHub, LinkedIn, Twitter, Instagram):
  - Default: semi-transparent, no background
  - Hover: scale up (1 → 1.3), background circle animates in, color fills to accent
  - Cursor attracted to icon (subtle magnetic effect)
  - Duration: 0.3s ease-out
- Newsletter form: email input + subscribe button
  - Input focus: placeholder floats, border accent color, background lightens
  - Button hover: background shifts, arrow icon slides in
- Copyright text centered at bottom

**Smooth Scroll Integration**
- Lenis smooth scrolling enabled globally
- Momentum and easing for natural scroll feel
- Sync with GSAP ScrollTrigger:
  - `gsap.registerPlugin(ScrollTrigger)`
  - `lenis.on('scroll', ScrollTrigger.update)`
  - Add animation frame loop for Lenis
- Capture scroll velocity for marquee and skew effects
- Optional: scroll-snap behavior for horizontal projects section

**Responsive Design**
- Desktop (1024px+): Full experience with custom cursor, hover effects, horizontal scroll
- Tablet (768px-1023px): Reduced complexity, custom cursor disabled, hamburger menu active, vertical project grid
- Mobile (<768px): Hamburger menu required, all stacked vertically, no custom cursor, simplified animations
  - Respect `prefers-reduced-motion` system preference
  - Minimum 44×44px touch targets
  - Reduced animation durations and stagger

**Performance Optimization**
- Images optimized with `next/image` (priority for hero, lazy for others)
- Lazy load sections below fold with React.lazy + Suspense
- GSAP animations use GPU acceleration (will-change, translateZ)
- Memoize cards with React.memo to prevent re-renders
- Debounce scroll events (built into ScrollTrigger)
- Code-split components if multi-page
- Target bundle size: <150KB JS gzipped
- Target Lighthouse score: >85 desktop, >75 mobile
- Test with Chrome DevTools Performance tab

**Free Resources to Use**
- **Fonts**: Google Fonts (Syne, Inter, JetBrains Mono), Fontshare (Clash Display)
- **Videos**: Pexels or Pixabay for motion/abstract video background
- **Images**: Unsplash or Pexels for team photos, project thumbnails
- **Icons**: Lucide Icons (React library) for SVG icons

**Deployment**
- Deploy to Vercel for optimal Next.js support
- Monitor Core Web Vitals with Vercel Analytics
- Configure `vercel.json` for build settings if needed
- Test on production to verify animations smooth at 60fps

**Deliverables**
- Fully functional single-page Next.js site
- All animations smooth and responsive (60fps minimum)
- Mobile-friendly and accessible (keyboard nav, WCAG contrast)
- Clean, commented, TypeScript code
- README with setup and deployment instructions
- Ready to customize with real agency projects and team photos
