# Plan de implementación — Rediseño "Finpay style" Dentimagen

> Documento de implementación. Estado: propuesta para aprobación.
> Base aprobada: `_mockups/home-finpay.html` (estética, tamaños y componentes validados).
> Decisiones del cliente: (1) **mockups por tipo de página primero**, luego rollout; (2) **núcleo comercial primero** (home + 2 sedes + 5 servicios = 8 páginas); (3) **placeholders + shot-list** de fotos.

---

## 1. Objetivo y principios

Llevar el lenguaje visual de `home-finpay.html` a todo el núcleo comercial, con una regla clave:

> **Mismo "kit" de diseño, distinta personalidad por tipo de página.** No clonar layouts. Las páginas comparten tokens y componentes, pero cada tipo resalta lo suyo. Las **sedes sí comparten plantilla** (dicen casi lo mismo; solo cambian datos locales).

Principios:
- **Preservar todo el SEO existente**: `<title>`, meta, canonical, schema (Dentist/FAQPage/BreadcrumbList), H1 único por página, FAQs, enlaces internos, NAP (dirección/teléfono), CTAs de WhatsApp. El rediseño es **visual/estructural, no destructivo de contenido**.
- **Identidad clara + morada** (no dark mode salvo secciones de acento). Fuentes Cormorant Garamond + DM Sans.
- **Accesibilidad y performance**: contraste AA, `prefers-reduced-motion`, imágenes `webp` con `srcset`, lazy-load.
- **Progressive enhancement en animaciones (estándar obligatorio del kit):** los `.reveal` son **visibles por defecto**; el estado oculto (`opacity:0`) solo aplica bajo `html.js` (clase añadida por un script inline en `<head>`), y `@media (prefers-reduced-motion:reduce)` los fuerza visibles sin transición. Esto evita que el contenido quede invisible si el JS falla/se desactiva o si el usuario reduce el movimiento. Ya implementado y verificado en `home-finpay.html` (con JS, sin JS y reduced-motion). **Nota:** las páginas en vivo actuales comparten el mismo riesgo latente (mismo patrón `.reveal`), así que esta corrección debe incluirse en `dimagen.css` y aplicarse en TODO el rollout.

---

## 2. Arquitectura del CSS (decisión recomendada)

Hoy cada página **embebe ~1.500 líneas de CSS idénticas** (confirmado: las 8 páginas usan el mismo `:root`). Replicar el sistema nuevo en 8 archivos = deriva garantizada.

**Recomendado:** extraer el sistema a un único **`assets/css/dimagen.css`** (design tokens + componentes compartidos) que cargan las 8 páginas; cada página conserva solo un `<style>` mínimo para lo específico. Una sola fuente de verdad, cacheable, sin tooling (es CSS plano — compatible con `DESIGN.md`).
- *Trade-off:* 1 request extra (cacheado tras la 1ª carga). 
- *Alternativa* si se prefiere el statu quo: mantener embebido y propagar el bloque canónico a mano (más frágil).
- Los **mockups siguen siendo self-contained** para revisión; la extracción a `dimagen.css` se hace al hacer rollout.

---

## 3. El "kit" de componentes compartido (todos los componentes)

Sistema único del que beben todas las páginas (ya construido en `home-finpay.html`):

| Componente | Spec | Dónde se usa |
|---|---|---|
| **Tokens** | `--grad-accent` morado, `--glow-accent`, sombras, radios, pill | Todas |
| **Nav float→dock** | flotante glass redondeada → full-width al scroll | Todas |
| **Footer** | navy + hairline gradiente, 4 columnas | Todas |
| **Botones** | pill: `btn-gold` (gradiente+sheen), `btn-outline`, `btn-whatsapp`, `btn-light` | Todas |
| **Eyebrow + dot** | label con punto gradiente | Todas |
| **Section header / gold-rule** | centrado, regla gradiente | Todas |
| **Glows** | blobs morados a la deriva (`drift`/`driftAlt`) | Heros y secciones |
| **Reveal on scroll** | IntersectionObserver `.reveal/.in` | Todas |
| **Bento grid** | card destacada (fill gradiente) + menores | Home, servicios |
| **Service card** | borde-gradiente en hover (máscara CSS) | Home, internal links |
| **Process timeline** | nodos icono+número + **línea draw-on-scroll** | Home, servicios |
| **Trust bar** | barra de confianza 4 señales (ya corregida) | Home, sedes |
| **Stats clip-text** | cifras grandes con gradiente | Home, sedes, resultados |
| **Galería** | featured + thumbs + strip, hover-zoom | Servicios, sedes |
| **Antes/Después** | frames con tags "Antes/Después" | Servicios, sección Resultados |
| **Sección Resultados (oscura)** | navy + glow + stats + antes/después | Home, servicios selectos |
| **Pricing cards** | 3 cards, 1 destacada (fill gradiente) | Servicios |
| **FAQ accordion** | `<details>`/aria-expanded, 1 abierta | Servicios, sedes |
| **Testimonial card** | borde-gradiente hover, avatar gradiente | Todas |
| **Bloque ubicación** | dirección/horario (mini-tabla) + mapa + "Abierto ahora" | Sedes |
| **Breadcrumb** | con schema BreadcrumbList | Internas |
| **Internal-links cards** | 3 cards con flecha | Servicios, sedes |
| **CTA oscuro + form** | navy + glow + form→WhatsApp | Todas |

---

## 4. Plan por página (personalidad de cada una)

### 4.1 Homepage — `index.html`
✅ Ya definida en `_mockups/home-finpay.html`. Rollout directo. Vitrina completa del kit.

### 4.2 Páginas de servicio (5) — kit compartido, ángulo propio
Estructura base reutilizada (preservando sus secciones actuales): Hero → ¿Qué es/Qué ofrecemos? → Proceso (timeline draw-on-scroll) → Galería → Por qué nosotros → Pricing → FAQ → Testimonios → CTA → Internal links → Footer.

**Personalidad por servicio:**

| Página | Ángulo / personalidad | Componente "estrella" propio |
|---|---|---|
| `implantes-dentales-quito` | Permanencia, titanio, tecnología 3D | **Sección oscura "Resultados" con antes/después** + bloque "anatomía del implante" (3 partes) |
| `implantes-cumbaya` | = implantes pero **local Cumbayá** (geo schema, areaServed) | Variante-plantilla de implantes (como sedes); cambia local + fotos |
| `ortodoncia-quito` | Adultos + adolescentes, 3 opciones | **Comparador de opciones** (Brackets metálicos vs estéticos vs Invisalign) tipo tabla/cards + timeline de tratamiento |
| `blanqueamiento-dental-quito` | Resultado de tono, sesión rápida, esmalte seguro | **Card de tono antes/después** (registro de color) + reassurance de seguridad |
| `diseno-de-sonrisa-quito` | Estética holística, simulación, fases | **Galería protagonista** (smile gallery más grande/bento) + bloque "simulación visual" |

> Implantes Quito ↔ Cumbayá se tratan como **par-plantilla** (igual que las sedes): mismo molde, cambia lo local.

### 4.3 Páginas de sede (2) — **plantilla compartida**
Norte y Cumbayá son estructuralmente idénticas (confirmado). Una sola plantilla con ~20 campos variables:

- **Compartido (molde):** nav, hero de sede, grid de 6 servicios, por qué nosotros + carrusel, galería, bloque "cómo llegar" (dirección/horario/mapa), FAQ, testimonios, CTA, internal links, footer.
- **Variable (datos locales):** title/meta/H1/canonical, eyebrow de sede, lead, chips, schema (nombre, dirección, postal, geo lat/lon, rating count, areaServed, FAQPage), copy de servicios ("norte"/"del valle"), features de ubicación, fotos (paths+srcset), mapa (iframe), testimonios locales, FAQ local, textos de CTA, enlaces internos (Norte↔Cumbayá, `/implantes-dentales-quito` vs `/implantes-cumbaya`).
- **Personalidad local (no clon):** mapa real, barrio/zona, fotos propias de cada sede, "Abierto ahora", areaServed. Cumbayá mantiene su `FAQPage` schema; Norte se le puede añadir para paridad.

---

## 5. Estrategia de fotos (público de clínica dental)

**Por qué importa:** el paciente dental decide por **confianza y limpieza percibida**. Las fotos deben ser **reales** (no stock genérico): equipo/doctores, instalaciones limpias y modernas, tecnología, y **resultados reales antes/después** (con consentimiento informado). Evitar imágenes clínicas agresivas o de stock obvio.

### 5.1 Banco reutilizable (se usa en varias páginas)
| Categoría | Cantidad | Notas |
|---|---|---|
| Recepción/fachada (1 por sede) | 2 | Hero de sede |
| Sala de espera (1 por sede) | 2 | Ambiente cálido |
| Consultorio/sillón | 3 | Limpio, ordenado, luz natural |
| Tecnología (escáner 3D, RX, equipo) | 3 | Refuerza "tecnología digital" |
| Retratos de equipo/doctores | 3–5 | **E-E-A-T**, según nº de profesionales |
| Detalles/ambiente | 3 | Texturas, instrumental limpio, recepción |

### 5.2 Resultados antes/después (con consentimiento) — por servicio
| Servicio | Casos | Fotos | Uso |
|---|---|---|---|
| Implantes (Quito+Cumbayá) | 2 | 4 | Sección oscura "Resultados" |
| Ortodoncia | 2 | 4 | Antes/después + progreso |
| Blanqueamiento | 2 | 4 | Registro de tono antes/después |
| Diseño de sonrisa | 2–3 | 4–6 | Galería protagonista |

### 5.3 Conteo por página (objetivo)
| Página | Fotos propias necesarias | Reutiliza del banco |
|---|---|---|
| Home | 6–8 (hero carrusel, por qué, 2 sedes, 1–2 antes/después) | sí |
| Cada servicio (×5) | 6–8 (1 hero, 1 "qué es", 3–4 galería, 2–4 antes/después) | sí (clínica/tech) |
| Cada sede (×2) | 7–9 (recepción, sala, consultorio, tech, equipo, 3 galería) | parcial |

**Mínimo viable para lanzar el núcleo con calidad: ~25–30 fotos nuevas** (sobre las 12 actuales). **Ideal: ~40–50.** Prioridad 1: equipo/doctores + recepción de cada sede + 1 caso antes/después por servicio. Mientras llegan, **placeholders explícitos** marcan cada slot (ya soportado por el sistema).

---

## 6. Workflow de ejecución (mockups primero)

**Fase 0 — Referencias (mockups por tipo).** Construir en `_mockups/`:
- `servicio-implantes.html` — mockup de referencia de **página de servicio** (el más rico: incluye sección Resultados/antes-después). Valida el "kit de servicio".
- `sede.html` — mockup de referencia de **plantilla de sede** (Norte como ejemplo).
- (Home ya aprobada.)
- → **Aprobación del cliente** de ambos antes de tocar páginas en vivo.

**Fase 1 — Extracción del sistema.** Congelar tokens+componentes en `assets/css/dimagen.css` (sección 2).

**Fase 2 — Rollout núcleo (8 páginas)** preservando SEO/schema:
1. `index.html` (desde home-finpay)
2. Sedes: `dentista-norte-quito`, `dentista-cumbaya` (desde plantilla de sede + datos locales)
3. Servicios: `implantes-dentales-quito`, `implantes-cumbaya` (par-plantilla), `ortodoncia-quito`, `blanqueamiento-dental-quito`, `diseno-de-sonrisa-quito` (cada uno con su componente-estrella).

**Fase 3 — QA y cierre.** (Ver sección 7.)

**Fase posterior (fuera de este plan):** blog (índice + artículos) y legales.

---

## 7. Verificación (por página)

1. **Visual:** screenshots Playwright a 1440px y 390px (forzando reveals) — comparar antes/después.
2. **Animaciones:** auditar reveals (todos disparan), glows (`running`), roadmap draw-on-scroll (`scaleX 0→1`), hover (sheen/lift/borde-gradiente).
3. **Robustez de animaciones (3 escenarios):** con JS (revela al scroll), **sin JS** (contenido visible, no en blanco), y **`prefers-reduced-motion`** (visible sin animar). Ya validado en `home-finpay.html`; repetir por página.
3. **SEO intacto:** `<title>`/meta/canonical sin cambios no deseados; **schema válido** (Rich Results Test) por tipo; 1 solo H1; FAQs presentes; enlaces internos correctos; NAP exacto.
4. **Responsive:** 375/390/414px sin desbordes; bento/timeline/sedes apilan bien.
5. **Performance:** imágenes webp + `srcset` + lazy; sin layout shift en heroes.

---

## 8. Riesgos y salvaguardas
- **No romper SEO:** el rediseño reusa el contenido textual y el schema existentes; cualquier cambio de copy se marca para aprobación.
- **Placeholders explícitos** mientras faltan fotos (no cuentan como bug).
- **Deriva de CSS:** mitigada con `dimagen.css` único.
- **Sedes:** mantener diferencias reales (mapa, dirección, areaServed, fotos) para no canibalizar SEO local.

---

## 9. Entregables de este plan
1. 2 mockups de referencia (`servicio-implantes.html`, `sede.html`) + home ya lista.
2. `assets/css/dimagen.css` (sistema extraído) al hacer rollout.
3. 8 páginas del núcleo rediseñadas con SEO preservado.
4. **Shot-list de fotos** (sección 5) para que el cliente las consiga.
5. Reporte de QA por página.
