# Memoe Portfolio — Copilot Instructions

## Project Overview
This is a React portfolio website built with Vite, featuring a modern dark theme with cyan and indigo accent colors. The portfolio showcases backend development work, skills, certifications, and contact information.

## Architecture
- **Framework**: React 18 with Vite
- **Styling**: CSS-in-JS via GlobalStyles component with CSS custom properties
- **Fonts**: Syne (headings), JetBrains Mono (code/UI), DM Sans (body)
- **Design Tokens**: All colors, spacing, and radius values defined in `:root` within GlobalStyles

## Key Components
- **GlobalStyles**: Embedded style tag with all design tokens and component styles
- **Navbar**: Fixed header with scroll detection, navigation links, and mobile menu
- **Hero**: Full-viewport landing section with animated introductory text
- **About**: Background information with quick facts card
- **Projects**: Featured and secondary project showcases with tech stacks
- **Skills**: Technical skills organized by category
- **Certifications**: Credential cards with alternating accent bars
- **Contact**: Contact form with submission feedback
- **Footer**: Simple footer with attribution

## Design System
- **Primary Accent**: Cyan (#00d4ff) — CTAs, labels, highlights
- **Secondary Accent**: Indigo (#818cf8) — Featured items, depth, secondary interactions
- **Background**: Dark (#080c14, #0c1119, #0f1520)
- **Text**: Light shades (#f1f5f9, #94a3b8, #475569, #2a3a52)
- **Spacing**: CSS custom properties (--section-pad, --section-max)
- **Radius**: --radius-sm (6px), --radius-md (10px), --radius-lg (14px)

## Development Guidelines

### Styling Changes
All styles live in the `GlobalStyles` component within `src/App.jsx`. When modifying colors or spacing:
1. Update CSS custom properties in the `:root` block
2. Changes propagate automatically via variable references
3. No need to hunt for scattered hex values

### Component Structure
Each section (Hero, About, Projects, etc.) follows a consistent pattern:
- Section wrapper with appropriate className (`section` or `section-alt`)
- `section-inner` container for max-width and centering
- `SectionHeader` for consistent titling

### Navigation
- Smooth scroll navigation via `scrollTo()` function
- Mobile menu controlled by `useState(open, setOpen)`
- Fixed navbar detects scroll position with `useEffect`

### Form Handling
Contact form uses local state (`sent` state) to show confirmation message on submit. To integrate with backend, replace the `onSubmit` handler.

## File Structure
```
src/
├── App.jsx          (Main component with all styles and sections)
├── App.css          (Empty - styles embedded in App.jsx)
├── index.css        (Minimal reset)
├── main.jsx         (Entry point)
└── index.html       (HTML template)
```

## Build & Development

### Start Dev Server
```bash
npm run dev
```
Runs on `http://localhost:5173/`

### Build for Production
```bash
npm run build
```
Output: `dist/` folder

### Preview Production Build
```bash
npm run preview
```

## Important Notes
- All fonts are imported from Google Fonts CDN in GlobalStyles
- Mobile responsiveness handled via media queries in GlobalStyles (768px, 860px, 540px breakpoints)
- Animations use CSS keyframes (fadeUp animation with staggered delays via d1-d4 classes)
- Hero and About sections use ambient gradient glows (cyan left, indigo right) for subtle depth
- Project cards distinguish featured vs non-featured with indigo borders and labels

## Customization Points
- Update project data in `PROJECTS` array to add/remove portfolio items
- Modify skills in `SKILLS` object for different categories and items
- Update certifications in `CERTIFICATIONS` array
- Change contact email in Contact section (currently `mailto:your@email.com`)
- Update GitHub/LinkedIn links in footer section
- Adjust nav links by modifying `NAV_LINKS` array

## Performance
- Minimal dependencies (React + Vite)
- All styles embedded (no external CSS files)
- Smooth scroll behavior with passive event listeners
- Optimized animations with hardware acceleration via transforms
