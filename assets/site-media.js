(() => {
  'use strict';

  const pageKey = document.body?.dataset.pageKey || '';
  const pageRegistry = (window.dentimagenPhotoRegistry && pageKey && window.dentimagenPhotoRegistry[pageKey]) || {};

  if (!document.getElementById('dentimagen-media-style')) {
    const style = document.createElement('style');
    style.id = 'dentimagen-media-style';
    style.textContent = `
      .dentimagen-managed-media{
        display:block;
        width:100%;
        height:100%;
        object-fit:cover;
        object-position:center center;
      }
      .crop-top{ object-position:center top; }
      .crop-bottom{ object-position:center bottom; }
      .crop-left{ object-position:left center; }
      .crop-right{ object-position:right center; }
      .crop-center{ object-position:center center; }
      .crop-face{ object-position:center 22%; }
    `;
    document.head.appendChild(style);
  }

  const slides = Array.from(document.querySelectorAll('.media-slide[data-media-src], .media-slide[data-media-slot]'));
  const standaloneMedia = Array.from(document.querySelectorAll('.hero-img[data-media-slot], .what-img[data-media-slot], .why-img[data-media-slot]'));
  const galleryItems = Array.from(document.querySelectorAll('.gallery-featured[data-photo-src], .gallery-thumb[data-photo-src], .gallery-featured[data-photo-slot], .gallery-thumb[data-photo-slot]'));

  function resolveConfig(element, slotAttr, srcAttr, altAttr) {
    const slot = element.dataset[slotAttr];
    const configured = slot ? pageRegistry[slot] : null;

    return {
      src: configured?.src || element.dataset[srcAttr] || '',
      alt: configured?.alt || element.dataset[altAttr] || '',
      crop: configured?.crop || '',
      fit: configured?.fit || '',
      position: configured?.position || ''
    };
  }

  function mountImage(container, img) {
    const placeholder = container.querySelector('.photo-ph, .media-ph');
    if (placeholder) {
      placeholder.replaceWith(img);
      return;
    }

    const directImage = Array.from(container.children).find((child) => child.tagName === 'IMG');
    if (directImage) {
      directImage.replaceWith(img);
      return;
    }

    container.replaceChildren(img);
  }

  function loadImage(container, config) {
    if (!config.src) {
      return;
    }

    const img = new Image();
    img.className = ['dentimagen-managed-media', config.crop].filter(Boolean).join(' ');
    img.alt = config.alt || '';
    img.decoding = 'async';
    img.loading = 'lazy';

    if (config.fit) {
      img.style.objectFit = config.fit;
    }

    if (config.position) {
      img.style.objectPosition = config.position;
    }

    img.addEventListener('load', () => {
      mountImage(container, img);
    });

    img.src = config.src;
  }

  slides.forEach((slide) => {
    const config = resolveConfig(slide, 'mediaSlot', 'mediaSrc', 'mediaAlt');
    loadImage(slide, config);
  });

  standaloneMedia.forEach((block) => {
    const config = resolveConfig(block, 'mediaSlot', 'mediaSrc', 'mediaAlt');
    loadImage(block, config);
  });

  galleryItems.forEach((item) => {
    const config = resolveConfig(item, 'photoSlot', 'photoSrc', 'photoAlt');
    loadImage(item, config);
  });
})();
