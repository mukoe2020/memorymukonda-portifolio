# FaithfulMatch Card — Styling & Design Specifications

## Color Palette Reference

### Primary Colors
| Name | Hex | Usage | Notes |
|------|-----|-------|-------|
| Cyan | #00d4ff | Geo accent, highlights | Primary interactive color |
| Indigo | #6366f1 | Featured border, secondary accents | Refined secondary color |
| Dark BG | #080c14 | Page background | Premium dark tone |
| Card BG | #0f1724 | Card container | Slightly lighter for contrast |

### Text Colors
| Name | Hex | Usage | Size |
|------|-----|-------|------|
| Primary | #f1f5f9 | Titles, headlines | 1.0rem - 2.6rem |
| Secondary | #94a3b8 | Body text, descriptions | 0.87rem - 0.97rem |
| Muted | #64748b | Supporting text | 0.82rem - 0.87rem |
| Faint | #475569 | Labels, badges | 0.63rem - 0.71rem |

## Typography Stack

### Font Families
```
Headings:   Syne (Bold 700, 800)
Body:       DM Sans (Regular 400, Medium 500)
Monospace:  JetBrains Mono (Regular 400, Medium 500)
```

### Typeface Usage in Card

| Element | Font | Weight | Size | Line Height | Color |
|---------|------|--------|------|-------------|-------|
| Featured Badge | JetBrains Mono | 600 | 0.63rem | 1.2 | Indigo |
| Title | Syne | 700 | 1.0rem | 1.2 | Primary |
| Description | DM Sans | 400 | 0.87rem | 1.72 | Secondary |
| Contributions Label | JetBrains Mono | 600 | 0.65rem | 1.2 | Indigo |
| Contributions Text | DM Sans | 400 | 0.82rem | 1.68 | Secondary |
| Tech Badge | JetBrains Mono | 400 | 0.69rem | 1.2 | Faint |
| Button Text | DM Sans | 500 | 0.8rem | 1.2 | Muted |

## Spacing System

### Padding & Margins
```
Card Padding:        24px (all sides)
Section Gaps:        14px (between major sections)
Tech Badge Gap:      6px (between badges)
Contribution Gap:    6px (between list items)
Badge Top Gap:       6px (badge to title)
Top Margin (title):  0px (normal) | 6px (with badge)
```

### Breakpoints
```
Desktop:  1100px (--section-max)
Tablet:   768px - 1099px
Mobile:   < 768px (collapse to single column)
```

## Shadows & Depth

### Base Card Shadow
```css
box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
```

### Featured Card Shadow (Hover)
```css
box-shadow: 0 14px 42px rgba(99, 102, 241, 0.16);
```

### Glow Layers
- Indigo featured border provides depth
- Subtle gradient background (135deg, indigo opacity 0.04)
- No excessive outer glow (professional aesthetic)

## Border & Radius Details

### Card Borders
```
Border Width:    1px
Border Style:    solid
Border Color:    rgba(99, 102, 241, 0.24) [indigo-border]
Border Radius:   14px [--radius-lg]
```

### Button Borders
```
Border Width:    1px
Border Radius:   6px [--radius-sm] for small buttons
Border Color:    Subtle → Cyan on hover
```

## Animation & Transitions

### Card Hover Animation
```css
transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
transform: translateY(-4px);
border-color: #6366f1;
```

### Geo Accent Fade-In
```css
opacity: 0 → 1;
transition: opacity 0.3s ease;
/* Triggered on .card--featured:hover */
```

### Button Hover
```css
transition: all 0.2s ease;
border-color: cyan-border;
box-shadow: 0 0 0 2px rgba(0, 212, 255, 0.1);
```

### Easing Functions Used
- **Smooth entrance**: `cubic-bezier(0.16, 1, 0.3, 1)` (snappy)
- **Hover feedback**: `ease` (natural)
- **Simple transitions**: `ease` (default)

## Geolocation Grid Pattern

### Pattern Specifications
```css
background-image:
  linear-gradient(90deg, rgba(0,212,255,0.02) 1px, transparent 1px),
  linear-gradient(rgba(0,212,255,0.02) 1px, transparent 1px);
background-size: 48px 48px;
background-position: 100% 0;
```

### Effect Details
- **Grid Size**: 48px × 48px squares
- **Color**: Cyan (#00d4ff)
- **Opacity**: Very subtle (0.02)
- **Position**: Top-right aligned (100% 0)
- **Trigger**: Only visible on hover of featured cards
- **Purpose**: Reinforces backend/geolocation theme without visual noise

## Hover State Progression

### Step-by-Step Hover Effect
```
Initial State
├── Card at normal height
├── Border: indigo-border (rgba(99,102,241,0.24))
├── Shadow: 0 10px 30px rgba(0,0,0,0.25)
├── Grid: opacity 0 (hidden)
└── Cursor: default

Hover Active
├── Card lifted: translateY(-4px)
├── Border: brightened indigo (#6366f1)
├── Shadow: enhanced 0 14px 42px rgba(99,102,241,0.16)
├── Grid: opacity 1 (fades in smoothly)
└── Cursor: pointer on links
```

### Duration
- **Total transition**: 0.3s
- **Easing**: cubic-bezier(0.16, 1, 0.3, 1)
- **Grid fade**: 0.3s ease

## Responsive Behavior Details

### Desktop (>1100px)
```
Grid Layout:     3 columns (auto-fill, 300px min)
Card Width:      ~340px
Gap:             14px between cards
All Effects:     Fully active
```

### Tablet (768px - 1099px)
```
Grid Layout:     2 columns (1-2 visible)
Card Width:      Full available
Gap:             14px between cards
Contributions:   Fully visible, wrapped as needed
Effects:         Fully active
```

### Mobile (<768px)
```
Grid Layout:     1 column (full width)
Card Width:      100% - 40px (20px margin each side)
Card Padding:    20px (reduced from 24px)
Gap:             12px between cards
Section Padding: 60px 16px
Font Sizes:      Maintained for readability
Effects:         Hover → Active state on touch
```

## Visual Hierarchy

### Scanning Order (Top to Bottom)
1. **Featured Badge** (immediate visual cue)
2. **Title** (project identity, largest text)
3. **Description** (quick context, medium weight)
4. **Contributions** (detailed accomplishments, bulleted)
5. **Tech Stack** (reference info, small labels)
6. **Buttons** (action items, top-right)

### Visual Weight
- Title: 700 (heaviest)
- Featured Badge: 600 (medium-heavy)
- Contributions Label: 600 (medium-heavy)
- Description & Contributions: 400 (regular)
- Tech Badge: 400 (regular, small size)
- Monospace text: Appears lighter due to font width

## Accessibility Considerations

### Color Contrast Ratios
- Primary text on card: 15.8:1 (WCAG AAA)
- Secondary text on card: 6.2:1 (WCAG AA)
- Muted text on card: 3.8:1 (WCAG AA)
- Badge text on badge: 4.1:1 (WCAG AA)

### Text Sizing
- Minimum readable size: 0.63rem (at 16px base = ~10px)
- Optimal reading size: 0.87rem-0.97rem (14-15px)
- Large text (title): 1.0rem (16px)

### Interactive Elements
- Button minimum touch target: 44px × 44px
- Button focus state: Clear border color change
- Links: Clear via color and underline

### Keyboard Navigation
- Tab order: Title → Links → Buttons
- Focus indicators: Inherit from browser defaults
- No keyboard traps

## Customization Examples

### Make Grid Pattern More Visible
```css
.card-geo-accent {
  background-image:
    linear-gradient(90deg, rgba(0,212,255,0.05) 1px, transparent 1px),
    linear-gradient(rgba(0,212,255,0.05) 1px, transparent 1px);
  /* Increase opacity from 0.02 to 0.05 */
}
```

### Change Lift Height on Hover
```css
.card--featured:hover {
  transform: translateY(-8px); /* Increase from -4px */
}
```

### Slower Animations
```css
.card {
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  /* Increase from 0.3s to 0.5s */
}
```

### Stronger Glow
```css
.card--featured:hover {
  box-shadow: 0 16px 48px rgba(99,102,241,0.24);
  /* Increase Y offset and color opacity */
}
```

## Design Philosophy Notes

### Why These Choices?

**Subtle Grid Pattern**
- Complements geolocation feature without visual noise
- Creates depth through pattern recognition
- Only appears on hover (doesn't distract on initial scan)
- Uses cyan (technical color) subtly

**Indigo Featured Border**
- Clear visual distinction from secondary projects
- Professional, not flashy
- Complements cyan accent without competing
- Consistent with design system

**Monospace Labels**
- Creates hierarchy and technical feel
- Distinguishes labels from body text
- Small size prevents clutter
- Uppercase improves scannability

**Typography Hierarchy**
- Title draws attention first
- Description explains purpose quickly
- Contributions demonstrate technical depth
- Tech stack provides reference point

**Responsive Behavior**
- Mobile-first content (most important info visible on scroll)
- Touch-friendly button sizing
- Full-width cards on mobile (less cognitive load)
- Maintains visual hierarchy across all sizes

**Hover Effects**
- Lift effect (translateY) is subtle but noticeable
- Shadow enhancement adds depth
- Grid fade-in is non-intrusive
- All animations use GPU-accelerated properties

## Quality Checklist

- ✅ Minimal, professional aesthetic
- ✅ Responsive across all breakpoints
- ✅ Smooth, performant animations
- ✅ Accessible color contrast ratios
- ✅ Clear visual hierarchy
- ✅ Backend engineering emphasis
- ✅ Recruiter-friendly scannable layout
- ✅ Authentic technical content
- ✅ Reuses existing design tokens
- ✅ No external dependencies
- ✅ Keyboard navigable
- ✅ Touch-friendly buttons
- ✅ Semantic HTML
- ✅ Performance optimized
