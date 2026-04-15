# Sistema de Diseño Actual — Dentimagen

> Documento oficial del diseño vigente
> Última actualización: 15 de abril de 2026

## 1. Propósito

Este archivo define el sistema visual y estructural actual del sitio de Dentimagen. Es la fuente de verdad para nuevas páginas HTML y para la futura migración a WordPress.

El diseño activo es un **light refined mode**: limpio, cálido, clínico-premium y enfocado en confianza, cercanía y claridad SEO local.
La calibración aprobada hoy es una versión **warm-neutral premium**: marfil suave, menos blanco clínico y sin caer en un beige demasiado amarillo.

El documento histórico del diseño inicial quedó archivado en [DESIGN_legacy.md](./DESIGN_legacy.md).

## 2. Dirección visual

### Idea principal
- Clínica dental premium, pero accesible
- Sensación de limpieza, orden y calma
- Más editorial que corporativo rígido
- Fondo claro para que el logo transparente funcione bien
- Acento morado para CTAs, hover states y señales visuales clave

### Lo que queremos transmitir
- Confianza médica
- Estética cuidada
- Tecnología moderna
- Atención humana y cercana
- Posicionamiento local claro: Quito, Norte y Cumbayá

### Lo que evitamos
- Dark mode como identidad principal
- Saturación de colores
- Interfaces recargadas
- Aspecto genérico de clínica “stock”
- Landing pages agresivas o demasiado comerciales

## 3. Paleta activa

Estas variables son la referencia visual base para las páginas actuales y futuras:

```css
:root {
  --bg-primary:    #f9f4ef;
  --bg-white:      #fefbf7;
  --bg-section:    #f4eee7;
  --bg-navy:       #0a1628;
  --bg-navy-deep:  #060e1a;

  --text-primary:   #0a1628;
  --text-secondary: #4a5568;
  --text-muted:     #8a97a8;

  --accent:         #6d28d9;
  --accent-deep:    #4c1d95;
  --accent-light:   #7c3aed;
  --accent-pale:    rgba(109, 40, 217, 0.10);

  --blue:           #1e3a8a;
  --blue-mid:       #2563eb;

  --border:         #e5dbd0;
  --border-light:   #eee6dd;

  --shadow-xs:      0 1px 3px rgba(10,22,40,.06);
  --shadow-sm:      0 2px 8px rgba(10,22,40,.08);
  --shadow-md:      0 6px 20px rgba(10,22,40,.10);
  --shadow-lg:      0 16px 48px rgba(10,22,40,.13);
  --shadow-accent:  0 6px 28px rgba(109,40,217,.25);
}
```

### Superficies aprobadas
- Header sticky: `rgba(254,251,247,.96)`
- Mobile drawer: `rgba(254,251,247,.98)`
- Hero principal cálido: `linear-gradient(150deg, #fdfaf6 0%, #f8f2eb 55%, #f1e8de 100%)`
- Transición cálida secundaria para bloques editoriales o teaser del blog: `linear-gradient(180deg, #fcf7f1 0%, #f7efe7 100%)`

### Notas de nomenclatura
- Para páginas nuevas, la semántica preferida es `accent`, no `gold`.
- La homepage todavía conserva algunos nombres legacy como `.btn-gold` y `.gold-rule`, pero visualmente ya usan el acento morado actual.
- No volver a introducir el dorado viejo ni hardcodes como `rgba(201,168,76,...)`.
- Evitar superficies grandes en blanco puro en heroes o contenedores principales; preferir blanco roto o marfil translúcido.

## 4. Tipografía

### Familias
- Display: `Cormorant Garamond`
- UI y cuerpo: `DM Sans`

### Uso recomendado
- `Cormorant Garamond`: H1, H2, cifras o titulares de alto impacto
- `DM Sans`: navegación, párrafos, botones, labels, formularios y microcopy

### Principios tipográficos
- Headings con contraste elegante y aire editorial
- Labels y botones en uppercase con `letter-spacing`
- Párrafos ligeros, cómodos de leer y con bastante aire
- Evitar bloques de texto muy densos

## 5. Estructura compartida de referencia

Todas las páginas nuevas deben copiar la base estructural corregida, no una página vieja al azar.

### Bloques conceptuales
1. `header`
2. `hero`
3. `services`
4. `locations`
5. `faq`
6. `cta`
7. `footer`

### Componentes reutilizables
- `header.nav`
- `.mobile-drawer`
- `.breadcrumb`
- `.eyebrow`
- `.accent-rule`
- `.btn-accent` o equivalente visual del botón primario
- `.btn-whatsapp`
- `.btn-outline`
- `.reveal` / `.in`
- `.faq-item`, `.faq-question`, `.faq-answer`
- `.testi-card`
- `.link-card`
- `.footer`

### Base compartida que ya debe respetarse
- Header sticky con scroll shadow
- Drawer mobile con cierre por botón, por click externo y por click en enlace
- FAQ con `aria-expanded`
- Canonical y `og:url` coherentes
- Schema JSON-LD por tipo de página
- Footer consistente con redes reales o texto no clicable si todavía no hay destino

## 6. Reglas de componentes

### Navegación
- El homepage debe enlazar directamente a las sedes
- Estructura preferida: `Servicios | Nosotros | Sede Norte | Sede Cumbayá | Reseñas | Contacto`
- El logo siempre vuelve a `index.html`

### Hero
- Un solo `H1` por página
- El `H1` debe priorizar keyword y claridad
- El branding poético puede vivir como subheadline o tagline secundaria
- En el homepage, el acento del `H1` debe usar la misma display font, sin itálica; el énfasis se resuelve con color, no con una segunda tipografía

### Botones
- Primario: acento morado
- Secundario: outline claro
- WhatsApp: verde, reservado para la acción conversacional
- En cards de sede: botón principal de navegación + CTA secundario de WhatsApp

### Cards
- Bordes suaves
- Fondos claros
- Hover sutil con elevación
- Evitar exceso de sombras o glassmorphism innecesario fuera del header

### FAQ
- Acordeón simple
- Un item abierto a la vez
- Actualizar siempre `aria-expanded`

### Footer
- No usar `href="#"` para elementos que todavía no tienen destino
- Si una red o dato aún no existe, dejarlo como texto no clicable o retirarlo temporalmente

## 7. SEO y convenciones frontend

### Dominio canónico
- Dominio oficial actual: `https://www.dentimagen.net`
- Todas las páginas deben usar `.net` en canonical, schema, breadcrumbs y `og:url`

### Convenciones mínimas por página
- `<title>` orientado a keyword
- Meta description útil y local
- Canonical
- Open Graph básico
- `og:url`
- `og:locale` = `es_EC`
- Schema adecuado según el tipo de página

### Tipos de schema
- Homepage: `Dentist`
- Páginas de sede: `Dentist` + `BreadcrumbList`
- Páginas de servicio: `Dentist` + `BreadcrumbList` + `FAQPage` cuando aplique

### Placeholders
- Son válidos en esta etapa de prototipo
- Deben ser obvios y fáciles de reemplazar
- No cuentan como bug por sí solos mientras no se esté preparando publicación

## 8. Responsive y comportamiento

### Breakpoints prácticos
- Desktop: navegación completa
- Tablet: compresión de espacios y grids
- Mobile: drawer, stacks verticales, CTAs full width cuando haga falta

### Comportamientos esperados
- Scroll suave para anchors internos
- Reveal animations con `IntersectionObserver`
- Drawer mobile accesible
- Layout limpio en desktop y mobile sin dependencias externas

## 9. Relación con WordPress

El flujo aprobado sigue siendo:

1. Diseñar y validar en HTML puro
2. Estabilizar estructura y contenido
3. Migrar a WordPress en Hostinger

### Objetivo de esta etapa HTML
- Diseñar rápido
- Probar layout y copy
- Ajustar SEO on-page
- Definir una base reusable

### Mapeo futuro a WordPress
- `header` -> template part
- `hero` -> bloque reusable
- `services` -> sección reusable
- `locations` -> sección reusable
- `faq` -> bloque reutilizable o acordeón
- `cta` -> bloque reusable
- `footer` -> template part

No añadir frameworks ni tooling extra en esta fase. La prioridad es consistencia y migración sencilla.

## 10. Guía para seguir construyendo

Cuando se cree una nueva página:

1. Partir de una página ya corregida de la base actual
2. Mantener tokens, spacing y jerarquía visual
3. Ajustar metadata y schema desde el inicio
4. No introducir enlaces falsos interactivos
5. Mantener placeholders explícitos cuando falten assets

## 11. Estado legacy

El diseño original inspirado en Sentry ya no es la referencia activa. Se conserva únicamente como contexto histórico en [DESIGN_legacy.md](./DESIGN_legacy.md).

## 12. Orden actual de construcción

Para evitar dispersión y mantener una arquitectura limpia, el orden vigente del sitio es:

1. Páginas troncales de sede
2. Páginas transaccionales prioritarias
3. Páginas estéticas con intención comercial clara
4. Blog y páginas secundarias

### Decisiones activas
- `diseno-de-sonrisa-quito.html` sí forma parte del bloque actual
- `Invisalign` se trabaja dentro de `ortodoncia-quito.html`, no como página separada por ahora
- `carillas-dentales-quito.html` queda como opción futura para el final del roadmap, no como prioridad inmediata
