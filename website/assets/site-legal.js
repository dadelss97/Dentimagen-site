(() => {
  'use strict';

  const consentKey = 'dentimagen_cookie_notice_v1';
  const isBlogPage = window.location.pathname.includes('/blog/');
  const basePath = isBlogPage ? '../' : '';
  const privacyUrl = `${basePath}politica-de-privacidad.html`;
  const cookiesUrl = `${basePath}politica-de-cookies.html`;

  if (!document.getElementById('dentimagen-legal-style')) {
    const style = document.createElement('style');
    style.id = 'dentimagen-legal-style';
    style.textContent = `
      .footer-legal-links a{
        color: rgba(109,40,217,.78);
        text-decoration: none;
        transition: color .25s ease;
      }
      .footer-legal-links a:hover{
        color: #8b5cf6;
      }
      .dentimagen-cookie-banner{
        position: fixed;
        right: 1rem;
        bottom: 1rem;
        z-index: 1200;
        width: min(420px, calc(100vw - 2rem));
        padding: 1rem 1rem 1.05rem;
        background: rgba(255,255,255,.96);
        border: 1px solid rgba(220,208,191,.95);
        border-radius: 18px;
        box-shadow: 0 18px 48px rgba(15,23,42,.14);
        backdrop-filter: blur(18px);
        color: #1f2937;
        opacity: 0;
        transform: translateY(18px);
        transition: opacity .28s ease, transform .28s ease;
      }
      .dentimagen-cookie-banner.is-visible{
        opacity: 1;
        transform: translateY(0);
      }
      .dentimagen-cookie-banner h3{
        margin: 0 0 .45rem;
        font-size: .9rem;
        font-weight: 700;
        color: #111827;
      }
      .dentimagen-cookie-banner p{
        margin: 0;
        font-size: .84rem;
        line-height: 1.6;
        color: #4b5563;
      }
      .dentimagen-cookie-actions{
        display: flex;
        flex-wrap: wrap;
        gap: .65rem;
        margin-top: .9rem;
      }
      .dentimagen-cookie-link,
      .dentimagen-cookie-accept{
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 40px;
        padding: .72rem 1rem;
        border-radius: 999px;
        font-size: .78rem;
        font-weight: 700;
        letter-spacing: .04em;
        text-transform: uppercase;
        text-decoration: none;
      }
      .dentimagen-cookie-link{
        border: 1px solid rgba(220,208,191,.95);
        color: #374151;
        background: #fffaf5;
      }
      .dentimagen-cookie-link:hover{
        border-color: rgba(109,40,217,.38);
        color: #4c1d95;
      }
      .dentimagen-cookie-accept{
        border: none;
        cursor: pointer;
        color: #fff;
        background: #6d28d9;
        box-shadow: 0 10px 30px rgba(109,40,217,.24);
      }
      .dentimagen-cookie-accept:hover{
        background: #5b21b6;
      }
      @media (max-width: 640px){
        .dentimagen-cookie-banner{
          left: 1rem;
          right: 1rem;
          width: auto;
        }
        .dentimagen-cookie-actions{
          flex-direction: column;
        }
        .dentimagen-cookie-link,
        .dentimagen-cookie-accept{
          width: 100%;
        }
      }
    `;
    document.head.appendChild(style);
  }

  const footerBottom = document.querySelector('.footer-bottom');
  if (footerBottom && !footerBottom.querySelector('.footer-legal-links')) {
    const legalLinks = document.createElement('p');
    legalLinks.className = 'footer-legal-links';
    legalLinks.innerHTML = `<a href="${privacyUrl}">Privacidad</a> · <a href="${cookiesUrl}">Cookies</a>`;
    footerBottom.appendChild(legalLinks);
  }

  let storedConsent = null;
  try {
    storedConsent = window.localStorage.getItem(consentKey);
  } catch (error) {
    storedConsent = null;
  }

  if (storedConsent === 'acknowledged') {
    return;
  }

  const banner = document.createElement('aside');
  banner.className = 'dentimagen-cookie-banner';
  banner.setAttribute('role', 'dialog');
  banner.setAttribute('aria-label', 'Aviso de cookies');
  banner.innerHTML = `
    <h3>Uso básico de cookies</h3>
    <p>Este sitio usa cookies técnicas y almacenamiento local para funciones esenciales, como recordar este aviso. Si activamos analítica o medición adicional, actualizaremos esta política.</p>
    <div class="dentimagen-cookie-actions">
      <a class="dentimagen-cookie-link" href="${cookiesUrl}">Ver política</a>
      <button class="dentimagen-cookie-accept" type="button">Entendido</button>
    </div>
  `;

  const acceptButton = banner.querySelector('.dentimagen-cookie-accept');
  acceptButton?.addEventListener('click', () => {
    try {
      window.localStorage.setItem(consentKey, 'acknowledged');
    } catch (error) {
      // Ignore storage errors and just dismiss the banner visually.
    }
    banner.classList.remove('is-visible');
    window.setTimeout(() => banner.remove(), 260);
  });

  document.body.appendChild(banner);
  window.requestAnimationFrame(() => banner.classList.add('is-visible'));
})();
