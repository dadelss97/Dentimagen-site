(() => {
  'use strict';

  const slides = Array.from(document.querySelectorAll('.media-slide[data-media-src]'));
  const galleryItems = Array.from(document.querySelectorAll('.gallery-featured[data-photo-src], .gallery-thumb[data-photo-src]'));

  slides.forEach((slide) => {
    const src = slide.dataset.mediaSrc;
    const alt = slide.dataset.mediaAlt || '';

    if (!src) {
      return;
    }

    const img = new Image();
    img.className = 'media-asset';
    img.alt = alt;
    img.decoding = 'async';

    img.addEventListener('load', () => {
      slide.replaceChildren(img);
    });

    img.src = src;
  });

  galleryItems.forEach((item) => {
    const src = item.dataset.photoSrc;
    const alt = item.dataset.photoAlt || '';

    if (!src) {
      return;
    }

    const img = new Image();
    img.alt = alt;
    img.decoding = 'async';

    img.addEventListener('load', () => {
      const placeholder = item.querySelector('.photo-ph');
      if (placeholder) {
        placeholder.replaceWith(img);
        return;
      }

      item.prepend(img);
    });

    img.src = src;
  });
})();
