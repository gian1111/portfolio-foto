# Photography Portfolio — Minimal Template

Quick start
1. Open `index.html` in your browser, or serve with a lightweight server:
   - macOS / Linux / Windows (Python 3):
     ```bash
     python3 -m http.server 8000
     ```
     Then open `http://localhost:8000` in your browser.

What you get
- `index.html`: single-page portfolio (Hero, Masonry Gallery, About, Contact).
- `styles.css`: responsive styles, CSS columns masonry, minimal animations.
- `script.js`: accessible lightbox with keyboard navigation, contact form client-side validation.
- Placeholder images use `picsum.photos`. Replace with your own images.

Replacing images
- Replace each `<img>` `src`, `srcset` and `data-full` attributes with your image files.
- Keep multiple resolutions in `srcset` for better responsiveness and performance.
- Example:
  ```html
  <img src="images/photo-600.jpg"
       srcset="images/photo-400.jpg 400w, images/photo-800.jpg 800w, images/photo-1200.jpg 1200w"
       data-full="images/photo-2400.jpg"
       alt="Project title" />
  ```

Accessibility & SEO tips
- Provide descriptive `alt` text for each image.
- Replace `[YOUR NAME]`, bio, and contact email.
- Consider adding structured data (JSON-LD) for galleries and business info.

Next steps (optional)
- Add lazy-loading server optimizations or use an image CDN.
- Add filters/tags for the gallery.
- Add a CMS or form backend for contact submissions.

If you want, I can:
- Convert this into a multi-page site or React starter.
- Create a Git repo and commit files.
- Add image optimization scripts (npm + sharp).
