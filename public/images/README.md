# Project Images

Store project thumbnail/preview images in this directory. Images will be displayed at the top of project cards in the portfolio.

## How to Add Project Images

1. **Naming Convention**: Use kebab-case naming that matches the project title
   - `celestial-palate.jpg` → for "Celestial Palate" project
   - `secureauth-api.jpg` → for "SecureAuth API" project
   - `e-commerce-backend.jpg` → for "E-Commerce Backend" project

2. **Optimal Image Dimensions**:
   - Width: 800px (displayed at 100% width)
   - Height: 400-500px (displayed at 200px height on cards)
   - Format: JPG (recommended for photos) or PNG (for screenshots)

3. **Adding Images to Projects**:
   - Add the image file to this directory: `/public/images/`
   - Update the project in `src/App.jsx` to include an `image` property:
   ```javascript
   {
     title: "Project Name",
     description: "...",
     tech: ["..."],
     github: "#",
     featured: true,
     image: "/images/project-name.jpg"  // Add this line
   }
   ```

## Current Projects with Images

- `celestial-palate.jpg` - Celestial Palate restaurant booking platform

## Tips

- Keep file sizes optimized (< 100KB each) for fast loading
- Use high-contrast images that look good at reduced sizes
- Screenshots should be cropped to highlight the key UI
- Consider adding a subtle overlay or border in your screenshots for polish
