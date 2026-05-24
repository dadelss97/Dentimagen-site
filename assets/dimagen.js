/* ==========================================================================
   DIMAGEN.JS — Comportamientos compartidos (rediseño 2026)
   Defensivo: cada bloque solo actúa si los elementos existen en la página.
   ========================================================================== */
(() => {
  'use strict';

  /* Nav: flotante → dock al hacer scroll */
  const nav = document.getElementById('nav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* Menú móvil (drawer) */
  const hamburger = document.getElementById('hamburger');
  const drawer = document.getElementById('mobileDrawer');
  if (hamburger && drawer) {
    let open = false;
    const toggle = (o) => {
      open = o;
      hamburger.classList.toggle('open', o);
      drawer.classList.toggle('open', o);
      hamburger.setAttribute('aria-expanded', String(o));
      document.body.style.overflow = o ? 'hidden' : '';
    };
    hamburger.addEventListener('click', () => toggle(!open));
    drawer.querySelectorAll('a').forEach((l) => l.addEventListener('click', () => toggle(false)));
    document.addEventListener('click', (e) => {
      if (open && !drawer.contains(e.target) && !hamburger.contains(e.target)) toggle(false);
    });
  }

  /* Reveal on scroll (el contenido es visible por defecto sin JS; ver dimagen.css) */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length && 'IntersectionObserver' in window) {
    const ro = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add('in'); ro.unobserve(en.target); }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach((el) => ro.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('in'));
  }

  /* Roadmap: dibujar la línea al entrar en vista */
  document.querySelectorAll('[data-draw]').forEach((track) => {
    if (!('IntersectionObserver' in window)) { track.classList.add('drawn'); return; }
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('drawn'); obs.unobserve(en.target); } });
    }, { threshold: 0.35 });
    obs.observe(track);
  });

  /* Smooth scroll para anclas internas */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', function (e) {
      const id = this.getAttribute('href');
      if (id === '#') return;
      const t = document.querySelector(id);
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });

  /* Dropdown de sedes */
  const dropdown = document.getElementById('sedesDropdown');
  const toggleBtn = document.getElementById('sedesToggle');
  if (dropdown && toggleBtn) {
    const set = (o) => { dropdown.classList.toggle('open', o); toggleBtn.setAttribute('aria-expanded', String(o)); };
    toggleBtn.addEventListener('click', (e) => { e.stopPropagation(); set(!dropdown.classList.contains('open')); });
    document.addEventListener('click', (e) => { if (!dropdown.contains(e.target)) set(false); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') set(false); });
  }

  /* FAQ: una abierta a la vez */
  const faqs = document.querySelectorAll('.faq-item');
  faqs.forEach((d) => d.addEventListener('toggle', () => {
    if (d.open) faqs.forEach((o) => { if (o !== d) o.open = false; });
  }));

  /* Carrusel de medios reutilizable */
  document.querySelectorAll('[data-carousel]').forEach((carousel) => {
    const slides = Array.from(carousel.querySelectorAll('.media-slide'));
    const dots = Array.from(carousel.querySelectorAll('[data-carousel-dot]'));
    const prev = carousel.querySelector('[data-carousel-prev]');
    const next = carousel.querySelector('[data-carousel-next]');
    if (!slides.length) return;
    let current = Math.max(0, slides.findIndex((s) => s.classList.contains('is-active')));
    let timer = null;
    const autoplay = carousel.dataset.carouselAutoplay !== 'false';
    const render = () => {
      slides.forEach((s, i) => { const a = i === current; s.classList.toggle('is-active', a); s.setAttribute('aria-hidden', String(!a)); });
      dots.forEach((d, i) => { const a = i === current; d.classList.toggle('is-active', a); d.setAttribute('aria-pressed', String(a)); });
    };
    const go = (i) => { current = (i + slides.length) % slides.length; render(); };
    const start = () => { if (autoplay && slides.length > 1) timer = window.setInterval(() => go(current + 1), 5000); };
    const restart = () => { if (autoplay) { window.clearInterval(timer); start(); } };
    prev?.addEventListener('click', () => { go(current - 1); restart(); });
    next?.addEventListener('click', () => { go(current + 1); restart(); });
    dots.forEach((d, i) => d.addEventListener('click', () => { go(i); restart(); }));
    if (autoplay) {
      carousel.addEventListener('mouseenter', () => window.clearInterval(timer));
      carousel.addEventListener('mouseleave', restart);
    }
    render(); start();
  });

  /* Formulario CTA → WhatsApp */
  const ctaSubmit = document.getElementById('ctaSubmit');
  if (ctaSubmit) {
    const phone = ctaSubmit.dataset.whatsapp || '593994236117';
    ctaSubmit.addEventListener('click', () => {
      const name = (document.getElementById('ctaName')?.value || '').trim();
      const tel = (document.getElementById('ctaPhone')?.value || '').trim();
      if (name && tel) {
        const msg = encodeURIComponent(`Hola, soy ${name}. Mi número es ${tel}. Me gustaría agendar una cita.`);
        window.open(`https://wa.me/${phone}?text=${msg}`, '_blank', 'noopener,noreferrer');
      } else {
        ['ctaName', 'ctaPhone'].forEach((id) => {
          const el = document.getElementById(id);
          if (el && !el.value.trim()) { el.style.borderColor = 'rgba(168,85,247,.7)'; el.focus(); setTimeout(() => { el.style.borderColor = ''; }, 2200); }
        });
      }
    });
  }
})();
