# FaithfulMatch Featured Project Card

## Overview
A modern, professionally-designed featured project card component showcasing the FaithfulMatch backend matching platform. The card emphasizes backend engineering expertise, geolocation features, and technical contributions.

## Design Philosophy
- **Minimalist Professional**: Clean layout without flashy animations or excessive visual effects
- **Backend-Focused**: Subtle geolocation grid accent reinforces technical nature without visual noise
- **Recruiter-Friendly**: Scannable hierarchy with clear contribution highlights
- **Responsive**: Adapts seamlessly to mobile and desktop viewports
- **Authentic**: Uses real technical details and genuine engineering accomplishments

## Component Structure

### Card Hierarchy
```
┌─ Featured Badge (★ Featured)
├─ Title (FaithfulMatch)
├─ Action Buttons (GitHub, Visit Site)
├─ Description (concise project overview)
├─ Key Contributions (5 bullet points)
└─ Tech Stack (6 technologies)
```

### Visual Elements

#### 1. Featured Badge
- **Style**: Monospace, uppercase, indigo color
- **Purpose**: Immediately signals importance
- **Placement**: Above title for visual hierarchy

#### 2. Title
- **Font**: Syne Bold (1rem)
- **Color**: Primary text (#f1f5f9)
- **Weight**: 700 (Bold)
- **Purpose**: Clear project identification

#### 3. Description
- **Font**: DM Sans (0.87rem)
- **Color**: Secondary text (#94a3b8)
- **Length**: ~25 words (single paragraph)
- **Purpose**: Quick project overview for scanners

#### 4. Key Contributions
- **Label**: Uppercase, indigo, monospace
- **Format**: Bulleted list (5 items)
- **Font**: DM Sans (0.82rem)
- **Purpose**: Highlight specific technical contributions
- **Why Bullets**: Improves scanability for recruiters/hiring managers

#### 5. Tech Stack
- **Badges**: 6 technologies
- **Style**: Monospace, uppercase, faint text
- **Background**: Subtle transparent background
- **Purpose**: Quick tech stack reference

#### 6. Geolocation Accent (Hover Effect)
- **Trigger**: Hover on featured card
- **Effect**: Subtle cyan grid pattern fades in
- **Purpose**: Backend/geolocation visual reinforcement
- **Subtlety**: Non-intrusive, complements existing card hover

### Styling Details

#### Colors
- **Background**: Card (#0f1724)
- **Border**: Indigo (#6366f1)
- **Text Primary**: #f1f5f9
- **Text Secondary**: #94a3b8
- **Text Muted**: #64748b
- **Accent**: Cyan (#00d4ff) and Indigo (#6366f1)

#### Spacing
- **Card Padding**: 24px
- **Gap Between Sections**: 14px
- **Tech Badge Gap**: 6px
- **List Item Gap**: 6px

#### Border & Radius
- **Border**: 1px solid indigo border
- **Radius**: 14px (--radius-lg)
- **Shadow**: Enhanced on hover with indigo glow

#### Typography
- **Heading Font**: Syne (bold)
- **Body Font**: DM Sans (regular)
- **Monospace**: JetBrains Mono (labels, badges)

### Hover Effects

#### Card Hover
- **Transform**: translateY(-4px) (lift effect)
- **Border**: Brightens to full indigo
- **Shadow**: 0 14px 42px rgba(99,102,241,0.16)
- **Duration**: 0.3s cubic-bezier(0.16, 1, 0.3, 1)

#### Geo Accent Hover
- **Opacity**: 0 → 1
- **Effect**: Cyan grid pattern fades in smoothly
- **Duration**: 0.3s ease

## Project Data

### Title
**FaithfulMatch**

### Description
"Backend-driven matching platform featuring intelligent user matching with geo-location based recommendations. Implemented advanced filtering logic and real-time matching algorithms in a three-person team."

### Key Contributions
1. Built matching & filtering controllers with complex query logic
2. Implemented geo-near location matching using MongoDB geospatial indexing
3. Developed customizable user preference filters with cascading rules
4. Created RESTful backend endpoints handling concurrent user requests
5. Integrated MongoDB aggregation pipeline for efficient data processing

### Tech Stack
- NestJS
- TypeScript
- MongoDB
- Mongoose
- REST APIs
- Geolocation

### Links
- **GitHub**: (primary link when available)
- **Website**: (optional, for live demos)

## Responsive Behavior

### Desktop (1100px+)
- Full card width in 3-column grid
- All sections fully visible
- Hover effects fully active

### Tablet (768px - 1099px)
- Full card width in 1-2 column grid
- Contributions list fully visible
- Hover effects functional

### Mobile (<768px)
- Full viewport width (1 column)
- Contributions list optimized for small screens
- Buttons stack as needed
- Hover effects converted to active state on touch

## CSS Classes

### New Classes Added
- `.proj-badge-featured`: Featured project badge styling
- `.card-geo-accent`: Geolocation grid background pattern
- `.card-content`: Card content wrapper for z-index management

### Existing Classes Used
- `.card`: Base card styling
- `.card--featured`: Featured card variant
- `.f-syne`: Syne font
- `.f-mono`: JetBrains Mono font
- `.btn-gh`: GitHub button style
- `.tech-badge`: Technology badge

## Browser Compatibility

### Supported
- Chrome/Chromium 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Features Used
- CSS Grid
- CSS Custom Properties
- CSS Transitions
- CSS Transforms
- Flexbox
- Background Gradients

## Performance Considerations

### Optimization
- Minimal CSS (uses existing design tokens)
- No external libraries required
- Hardware-accelerated transforms (translateY)
- Efficient gradient backgrounds
- Passive event listeners for scroll

### Animation Performance
- Uses `transform` and `opacity` (GPU-accelerated)
- Avoids layout-triggering properties
- Smooth 60fps animations

## Accessibility

### Features
- Semantic HTML (`<article>`, `<h3>`)
- Descriptive aria-labels on buttons
- Readable text contrast ratios
- Keyboard-navigable links
- Clear visual hierarchy

### Considerations
- Color not sole indicator (uses icons + text)
- Monospace text sized appropriately
- List structure properly marked up
- Button intents clear from context

## Customization Guide

### Change Colors
All colors use CSS custom properties. Update in `:root`:
```css
--indigo: #6366f1;      /* Featured border */
--cyan: #00d4ff;        /* Geo accent pattern */
--text-primary: #f1f5f9;
--text-secondary: #94a3b8;
```

### Modify Contributions List
Edit the `contributions` array in PROJECTS data:
```javascript
contributions: [
  "Your contribution here",
  "Another contribution",
  // ...
]
```

### Update Tech Stack
Edit the `tech` array in PROJECTS data:
```javascript
tech: ["Tech1", "Tech2", "Tech3", ...]
```

### Change Spacing
Adjust padding in ProjectCard component or update `--section-pad` in CSS custom properties.

### Modify Hover Effects
Update transition values in `.card--featured:hover`:
```css
.card--featured:hover {
  box-shadow: 0 14px 42px rgba(99,102,241,0.16);
  transform: translateY(-4px);
}
```

## Integration Notes

### Location in Code
- **Component**: `ProjectCard()` function in `src/App.jsx`
- **Data**: First entry in `PROJECTS` array
- **Styles**: Embedded in GlobalStyles component

### Dependencies
- React (useState, useEffect)
- CSS custom properties via GlobalStyles
- No external libraries

### Future Enhancements
1. Add image placeholder for project screenshots
2. Implement case study modal/expand functionality
3. Add GitHub stats integration (stars, forks)
4. Include deployment/live preview links
5. Add testimonial or team member callout

## Screenshots & Examples

### Visual Hierarchy
- Featured badge draws eye first (indigo, small)
- Title is clear focal point (large, bold)
- Description provides context (medium weight)
- Contributions are scannable (bulleted list)
- Tech stack is reference (small, monospace)

### Hover State
- Card lifts smoothly (-4px)
- Border brightens to full indigo
- Subtle cyan grid fades in (geolocation theme)
- Shadow enhances depth

### Mobile State
- Single column layout
- Touch targets remain 44px+ minimum
- Buttons remain accessible
- All content scannable without horizontal scroll
