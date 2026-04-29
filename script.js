// Minimal JS: lightbox, keyboard nav, contact form validation
document.addEventListener('DOMContentLoaded', () => {
  // set year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Lightbox elements
  const lightbox = document.getElementById('lightbox');
  const lbImg = lightbox.querySelector('.lightbox-img');
  const lbCaption = lightbox.querySelector('.lightbox-caption');
  const lbClose = lightbox.querySelector('.lightbox-close');
  const lbPrev = lightbox.querySelector('.lightbox-prev');
  const lbNext = lightbox.querySelector('.lightbox-next');

  const items = Array.from(document.querySelectorAll('.masonry-item img'));
  let current = -1;

  function openLightbox(index) {
    const img = items[index];
    if (!img) return;
    current = index;
    lbImg.src = img.dataset.full || img.src;
    lbImg.alt = img.alt || '';
    lbCaption.textContent = img.closest('figure')?.querySelector('figcaption')?.textContent || '';
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    // focus for keyboard nav
    lightbox.querySelector('.lightbox-content').focus();
    preloadAdjacent();
  }

  function closeLightbox() {
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    current = -1;
    lbImg.src = '';
  }

  function showNext() {
    if (current < 0) return;
    const next = (current + 1) % items.length;
    openLightbox(next);
  }
  function showPrev() {
    if (current < 0) return;
    const prev = (current - 1 + items.length) % items.length;
    openLightbox(prev);
  }

  items.forEach((img, i) => {
    img.setAttribute('tabindex', '0');
    img.addEventListener('click', () => openLightbox(i));
    img.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(i);
      }
    });
  });

  lbClose.addEventListener('click', closeLightbox);
  lbNext.addEventListener('click', showNext);
  lbPrev.addEventListener('click', showPrev);

  // close on backdrop click
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (lightbox.getAttribute('aria-hidden') === 'false') {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    }
  });

  // Preload adjacent images for smoother nav
  function preload(url) {
    const p = new Image();
    p.src = url;
  }
  function preloadAdjacent() {
    const next = (current + 1) % items.length;
    const prev = (current - 1 + items.length) % items.length;
    const nextUrl = items[next].dataset.full || items[next].src;
    const prevUrl = items[prev].dataset.full || items[prev].src;
    preload(nextUrl);
    preload(prevUrl);
  }

  // Contact form
  const form = document.getElementById('contactForm');
  const formMsg = document.getElementById('formMsg');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      formMsg.textContent = '';
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();

      if (!name || !email || !message) {
        formMsg.style.color = 'crimson';
        formMsg.textContent = 'Please fill all required fields.';
        return;
      }
      if (!validateEmail(email)) {
        formMsg.style.color = 'crimson';
        formMsg.textContent = 'Please provide a valid email.';
        return;
      }

      // Build mailto fallback (client-side)
      const subject = encodeURIComponent(`Website inquiry from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
      const mailto = `mailto:your@email.com?subject=${subject}&body=${body}`;

      // Try opening mail client
      window.location.href = mailto;
      formMsg.style.color = 'green';
      formMsg.textContent = 'Opening your email client...';
      form.reset();
    });
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
});
