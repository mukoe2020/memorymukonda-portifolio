# FaithfulMatch Card — Developer Quick Reference

## Quick Links in Code

### CSS Classes (in GlobalStyles)
```javascript
// Line 262-265: Featured badge style
.proj-badge-featured { ... }

// Line 268-283: Geolocation grid pattern
.card-geo-accent { ... }

// Line 286-288: Content z-index management
.card-content { ... }
```

### Project Data (in PROJECTS array)
```javascript
// Line 399-414: FaithfulMatch project object
{
  title: "FaithfulMatch",
  description: "...",
  contributions: [...],
  tech: [...],
  github: "#",
  featured: true,
}
```

### Component Rendering (ProjectCard function)
```javascript
// Line 736-824: ProjectCard component
function ProjectCard({ project }) { ... }

// Line 744: Geo accent rendered here
{project.featured && <div className="card-geo-accent" />}
```

## Most Common Modifications

### 1. Update Project Description
```javascript
// In PROJECTS array, find FaithfulMatch object
description: "YOUR NEW DESCRIPTION HERE"
```

### 2. Add/Edit Contributions
```javascript
contributions: [
  "First contribution",
  "Second contribution",
  "Third contribution",
  // Add more items (keep to 3-5 for scanability)
]
```

### 3. Update Tech Stack
```javascript
tech: ["NestJS", "TypeScript", "MongoDB", "Mongoose", "REST APIs", "Geolocation"]
// Edit this array to match actual technologies used
```

### 4. Change GitHub Link
```javascript
github: "https://github.com/username/faithfulmatch-repo"
// Update the URL to your actual repository
```

### 5. Add Project Image
```javascript
// Add this line to the project object
image: "/images/faithfulmatch-screenshot.png"
// Image should be 1200x400px or similar aspect ratio
```

### 6. Make Grid More/Less Visible
```javascript
// In .card-geo-accent CSS, find this line:
background-image:
  linear-gradient(90deg, rgba(0,212,255,0.02) 1px, transparent 1px),
              // Change 0.02 to 0.05 for stronger grid
```

### 7. Change Hover Lift Height
```javascript
// In .card--featured:hover CSS, find:
transform: translateY(-4px);
// Change -4px to -8px for more dramatic lift
```

### 8. Adjust Grid Size
```javascript
// In .card-geo-accent CSS, find:
background-size: 48px 48px;
// Change to 32px 32px for tighter grid, 64px 64px for looser
```

## CSS Custom Properties Reference

```css
/* Colors */
--cyan: #00d4ff              /* Geo grid color */
--indigo: #6366f1           /* Featured border */
--bg-card: #0f1724          /* Card background */

/* Text */
--text-primary: #f1f5f9     /* Titles */
--text-secondary: #94a3b8   /* Body text */
--text-muted: #64748b       /* Supporting text */
--text-faint: #475569       /* Labels */

/* Spacing */
--radius-lg: 14px           /* Card border radius */
--section-pad: 108px 24px   /* Section padding */
--section-max: 1100px       /* Max container width */
```

## Component Props

```javascript
ProjectCard expects a project object with:
{
  title: string,                    // Required: "FaithfulMatch"
  description: string,              // Required: 1-2 sentences
  tech: string[],                   // Required: ["NestJS", ...]
  github: string,                   // Required: URL or "#"
  featured: boolean,                // Required: true for featured styling
  contributions?: string[],         // Optional: Array of bullet points
  website?: string,                 // Optional: Live site URL
  image?: string,                   // Optional: Image path
}
```

## Common CSS Modifications

### Darker Grid
```css
.card-geo-accent {
  opacity: 0.15;  /* Default is 0, increase for always visible */
}

/* Or change the color opacity */
linear-gradient(90deg, rgba(0,212,255,0.05) 1px, transparent 1px)
                              /* Change 0.02 to 0.05 */
```

### Faster Hover Animation
```css
.card {
  transition: all 0.15s cubic-bezier(0.16, 1, 0.3, 1);
  /* Change 0.3s to 0.15s */
}
```

### Stronger Shadow on Hover
```css
.card--featured:hover {
  box-shadow: 0 20px 60px rgba(99,102,241,0.24);
  /* Increase Y offset and opacity */
}
```

### Brighter Hover Border
```css
.card--featured:hover {
  border-color: #7c3aed;  /* Lighter purple */
  /* Or: border-color: #818cf8; (lighter indigo) */
}
```

## File Locations Cheatsheet

```
Configuration Files
├─ src/App.jsx              (Main component - ALL changes go here)
├─ package.json             (Dependencies)
└─ vite.config.js           (Build config)

Documentation (Newly Created)
├─ FAITHFULMATCH_COMPONENT.md     (Component guide)
├─ STYLING_SPECIFICATIONS.md      (Design system)
├─ VISUAL_GUIDE.md                (Visual hierarchy)
└─ IMPLEMENTATION_SUMMARY.md      (This summary)

Project Files
├─ src/main.jsx             (Entry point)
├─ src/index.html           (HTML template)
└─ public/                  (Static assets)
```

## Testing Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## Keyboard Navigation

When viewing the card:
- `Tab` — Navigate to links/buttons
- `Enter` — Activate link/button
- `Shift+Tab` — Navigate backwards
- `Esc` — (No special behavior, but standard pattern)

## Browser DevTools Tips

### Inspect Geo Grid
1. Open DevTools (F12)
2. Select element (Inspect)
3. Find `.card-geo-accent` element
4. Check computed styles for `opacity` and `background-image`

### Check Animation Performance
1. Open DevTools Performance tab
2. Hover over card
3. Record animation
4. Look for 60fps line (green frames are good)

### Verify Colors
1. Open DevTools
2. Inspect card border
3. Check `border-color` computed value
4. Should match indigo hex (#6366f1) or CSS variable

### Test Responsive
1. Open DevTools
2. Toggle device toolbar (Ctrl+Shift+M)
3. Test at: 320px, 768px, 1024px widths
4. Check that layout adapts

## Troubleshooting Checklist

If something isn't working:

- [ ] Did you edit App.jsx in the correct location?
- [ ] Did you save the file after editing?
- [ ] Is the dev server running? (`npm run dev`)
- [ ] Did you refresh the browser? (Ctrl+Shift+R for hard refresh)
- [ ] Check browser console for JavaScript errors
- [ ] Check DevTools Network tab for CSS loading
- [ ] Verify CSS custom properties are defined in `:root`
- [ ] Make sure featured: true is set for featured styling
- [ ] Check that contributions array has 3-5 items
- [ ] Verify all closing tags and braces match

## Performance Tips

1. **Keep animations smooth**: Use only transform/opacity
2. **Minimize repaints**: Don't animate colors or borders
3. **Cache images**: Ensure project images are optimized
4. **Lazy load**: Images load on-screen
5. **Minify CSS**: Done automatically by Vite on build

## Accessibility Checks

- [ ] Text contrast ratio: 4.5:1 minimum (7:1 preferred)
- [ ] Images have alt text
- [ ] Links have descriptive text
- [ ] Color not sole indicator
- [ ] Focus states visible
- [ ] Keyboard navigable
- [ ] No flashing > 3x per second

## Version History

```
v1.0 (Current) - May 2026
├─ Featured project card
├─ Geolocation grid accent
├─ Contributions list
├─ Responsive design
├─ Professional styling
└─ Production ready
```

## Contact & Questions

If you need to make changes and aren't sure:

1. Check [FAITHFULMATCH_COMPONENT.md](FAITHFULMATCH_COMPONENT.md) for component details
2. Check [STYLING_SPECIFICATIONS.md](STYLING_SPECIFICATIONS.md) for design system
3. Check [VISUAL_GUIDE.md](VISUAL_GUIDE.md) for visual hierarchy
4. This quick reference for common modifications

All documentation is in your project root directory.

---

**Last Updated**: May 2026  
**Maintainer**: Your Dev Team  
**Status**: Production Ready ✅
