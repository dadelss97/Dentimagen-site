# Dentimagen Website

Sitio web de Dentimagen Centro Odontológico, construido en HTML/CSS/JS puro con foco en SEO local para Quito, Norte de Quito y Cumbayá.

Este repositorio es la base activa del proyecto. Aquí se diseñan, validan y mantienen las páginas, el sistema visual y la estructura SEO antes de conectar integraciones, analítica, cumplimiento legal y automatizaciones.

## Estado actual

- Stack actual: HTML + CSS + JavaScript vanilla
- Dominio canónico oficial: `https://www.dentimagen.net`
- Hosting objetivo: Hostinger
- Control de versiones: Git + GitHub
- Dirección técnica vigente: continuar sobre esta base estática, sin migración a WordPress
- Estado real: prototipo estructural avanzado, no listo todavía para publicación final

## Objetivo del proyecto

Construir una presencia digital sólida para Dentimagen que:

- posicione en búsquedas locales de alto valor
- conecte sedes, servicios y blog en una arquitectura SEO clara
- convierta tráfico en citas
- sirva luego como base para un producto más completo con analítica, seguridad, formularios, cookies e integraciones

## Stack y forma de trabajo

### Desarrollo

- Edición de archivos: IDE local
- Commits y push: GitHub Desktop o Git por terminal
- Publicación: Hostinger
- Base de datos: no necesaria en esta etapa estática

### Flujo diario recomendado

1. Editar en el IDE
2. Revisar cambios visuales y estructurales
3. Hacer commit con mensaje claro
4. Hacer push a GitHub
5. Publicar en Hostinger cuando el cambio esté validado

### Qué no hacer

- No editar el sitio principal directamente desde GitHub web salvo hotfix mínimo
- No subir secretos ni credenciales al repo
- No introducir frameworks ni tooling extra sin necesidad real
- No crear páginas nuevas copiando una base vieja o inconsistente

## Estructura actual

```text
Dentimagen SEO/
├── README.md
├── .gitignore
├── CLAUDE.md
├── DESIGN.md
├── DESIGN_legacy.md
├── WEBSITE_STATUS.md
├── SEMANA-01_Auditoria-y-Setup.md
├── SEMANA-02_Google-Business-Profile.md
├── SEMANA-03_Estructura-Web.md
├── SEMANA-04_SEO-Tecnico.md
├── SEMANA-05_Contenido-y-Keywords.md
├── SEMANA-06_Directorios-y-Link-Building.md
├── SEMANA-07_Estrategia-Resenias.md
├── SEMANA-08_Analisis-y-Primer-Reporte.md
├── PUBLICATION_CHECKLIST.md
└── website/
    ├── index.html
    ├── robots.txt
    ├── sitemap.xml
    ├── dentista-norte-quito.html
    ├── dentista-cumbaya.html
    ├── implantes-cumbaya.html
    ├── implantes-dentales-quito.html
    ├── ortodoncia-quito.html
    ├── blanqueamiento-dental-quito.html
    ├── diseno-de-sonrisa-quito.html
    └── blog/
        ├── index.html
        ├── implantes-quito-precio.html
        ├── ortodoncia-adultos-quito.html
        ├── blanqueamiento-cumbaya.html
        └── clinica-norte-quito.html
```

## Fuente de verdad

### Documentos principales

- [WEBSITE_STATUS.md](./WEBSITE_STATUS.md): estado real del proyecto, páginas construidas y próximos pasos
- [DESIGN.md](./DESIGN.md): sistema visual vigente, tokens, comportamiento, navegación y reglas de componentes
- [CLAUDE.md](./CLAUDE.md): contexto estratégico SEO, oportunidad de mercado y objetivos de negocio
- [PUBLICATION_CHECKLIST.md](./PUBLICATION_CHECKLIST.md): checklist operativa para pasar de prototipo a publicación real
- [FINAL_ASSETS_AND_SHARING.md](./FINAL_ASSETS_AND_SHARING.md): inventario real de fotos, nombres de archivo y workflow de crop/media
- `scripts/generate_og_image.py`: genera el `og:image` base de `website/assets/og/dentimagen-og-1200x630.jpg`

### Documentos de apoyo

- `SEMANA-01` a `SEMANA-08`: roadmap SEO y checklist operativo
- [DESIGN_legacy.md](./DESIGN_legacy.md): contexto histórico, no vigente

### Prioridad entre documentos

Si hay contradicción entre documentos viejos y la ejecución actual:

1. `README.md`
2. `DESIGN.md`
3. `WEBSITE_STATUS.md`
4. resto de documentos históricos o de planificación

## Sistema visual vigente

La dirección visual actual es `light refined mode` con calibración `warm-neutral premium`.

### Tokens principales

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

  --border:         #e5dbd0;
  --border-light:   #eee6dd;
}
```

### Tipografía

- Display: `Cormorant Garamond`
- UI / body: `DM Sans`

### Regla importante del homepage

- El H1 debe priorizar keyword y claridad
- El acento visual del H1 usa la misma fuente display, sin itálica; el énfasis se resuelve por color

## Convenciones técnicas del sitio

### SEO mínimo por página

Cada página debe tener:

- un solo `H1`
- `<title>` orientado a keyword
- `meta description`
- `canonical`
- `og:url`
- `og:locale="es_EC"`
- `og:image`
- schema JSON-LD según el tipo de página

### Reglas canónicas

Todo debe apuntar a:

- `https://www.dentimagen.net`

Esto aplica a:

- `canonical`
- `og:url`
- schema `url`
- breadcrumbs estructurados
- soporte de URLs limpias vía `website/.htaccess`

### Navegación y componentes

Toda página nueva debe respetar la base compartida:

- `header`
- `hero`
- `services`
- `locations`
- `faq`
- `cta`
- `footer`

Y además:

- header sticky
- drawer mobile funcional
- FAQ con `aria-expanded`
- footer sin `href="#"` para enlaces inexistentes

## Páginas actuales

### Páginas troncales

- `website/index.html`
- `website/dentista-norte-quito.html`
- `website/dentista-cumbaya.html`

### Páginas de servicio

- `website/implantes-cumbaya.html`
- `website/implantes-dentales-quito.html`
- `website/ortodoncia-quito.html`
- `website/blanqueamiento-dental-quito.html`
- `website/diseno-de-sonrisa-quito.html`

### Blog

- `website/blog/index.html`
- `website/blog/implantes-quito-precio.html`
- `website/blog/ortodoncia-adultos-quito.html`
- `website/blog/blanqueamiento-cumbaya.html`
- `website/blog/clinica-norte-quito.html`

## Placeholders y estado de prototipo

Los placeholders son válidos en esta etapa si:

- son obvios
- no simulan datos reales cerrados
- son fáciles de reemplazar

### Placeholders esperados por ahora

- imágenes reales
- direcciones finales
- mapa embebido
- algunos enlaces e integraciones finales

## Workflow ideal con GitHub

### Cómo trabajar

- Editar siempre en tu IDE
- Usar GitHub Desktop para commits y push si prefieres interfaz visual
- Mantener `main` como rama estable
- Usar ramas solo cuando el cambio sea grande o riesgoso

### Regla simple para este proyecto

- Si el cambio es pequeño, visual o de contenido, trabajar directo en `main`
- Si el cambio puede romper varias páginas, tocar infraestructura o abrir una nueva fase técnica, crear `branch`
- Si hay duda, tratar el cambio como `branch`

### Cuándo trabajar directo en `main`

Usar `main` para cambios como:

- ajustes de copy
- cambios de color o spacing
- correcciones pequeñas de layout
- mejoras SEO on-page puntuales
- cambios pequeños de documentación
- arreglos rápidos de links o metadata

### Cuándo crear una `branch`

Crear una rama nueva para cambios como:

- rediseños grandes del home o de varias páginas
- formularios reales
- cookies o cumplimiento legal
- analytics, Search Console, GTM o tracking
- integraciones con APIs
- seguridad, headers, hardening o monitoreo
- automatizaciones
- reestructuras de carpetas o arquitectura
- cualquier cambio que toque muchas páginas a la vez

### Nombres recomendados para branches

Usar nombres simples y descriptivos:

- `feature/home-seo-refine`
- `feature/contact-form`
- `feature/cookie-banner`
- `feature/analytics-setup`
- `feature/api-integration`
- `fix/header-mobile`
- `docs/project-readme`

### Regla operativa para trabajo con asistente

Cuando estemos trabajando en este repositorio:

- asumir `main` por defecto para cambios pequeños y seguros
- recomendar `branch` cuando el cambio sea grande, sensible o experimental
- si el trabajo entra en legal, tracking, seguridad, integraciones o refactor amplio, recordar explícitamente abrir `branch` antes de empezar

### Flujo recomendado con branch

1. Crear la branch en GitHub Desktop
2. Editar en el IDE como siempre
3. Hacer commits dentro de esa branch
4. Hacer push de la branch a GitHub
5. Cuando el bloque esté validado, integrar a `main`

### Convención simple de commits

Ejemplos:

- `Refine homepage hero copy`
- `Update warm-neutral palette across blog`
- `Add smile design service page`
- `Fix header consistency across internal pages`

## Publicación en Hostinger

### Etapa actual

La forma más simple y correcta hoy es:

- seguir desarrollando localmente
- versionar en GitHub
- publicar manualmente o vía Git deployment cuando el bloque esté estable

### No hace falta todavía

- base de datos
- CMS
- WordPress

### Sí hará falta antes de publicar en serio

- logo final
- imágenes optimizadas
- WhatsApp real
- direcciones exactas
- datos finales en schema
- legal pages
- política de cookies
- Search Console
- Analytics / GTM si aplica
- `robots.txt`
- sitemap

## Roadmap recomendado desde este punto

### Fase 1 — Cierre visual y estructural

- QA visual desktop y mobile
- cerrar copy principal
- reemplazar placeholders críticos
- validar interlinking

### Fase 2 — Publicación SEO técnica

- Search Console
- sitemap
- robots.txt
- rich results validation
- velocidad y compresión de imágenes
- medición básica

### Fase 3 — Producto más completo

- formularios reales
- integración con APIs
- analítica de eventos
- banner y gestión de cookies
- cumplimiento legal
- seguridad y monitoreo

## Checklist antes de publicar

- [ ] Logo real implementado
- [ ] WhatsApp real implementado
- [ ] Direcciones y horarios finales cargados
- [ ] Imágenes optimizadas
- [ ] Canonicals y schema validados
- [ ] Sitemap generado
- [ ] Robots.txt revisado
- [ ] Search Console configurado
- [ ] Analytics configurado
- [ ] QA en desktop y mobile
- [ ] Páginas legales listas

## Checklist para nuevas páginas

- [ ] Partir de una página base corregida
- [ ] Ajustar `title`, meta description y schema desde el inicio
- [ ] Verificar un solo `H1`
- [ ] Respetar navegación y footer
- [ ] Conectar enlaces internos relevantes
- [ ] Revisar mobile
- [ ] Validar consistencia con `DESIGN.md`

## Nota importante de dirección técnica

Parte de la documentación histórica todavía menciona WordPress como paso futuro. La dirección técnica vigente del proyecto ya no es esa: este repositorio se considera la base principal del sitio y se continuará desarrollando como solución estática bien estructurada con GitHub + Hostinger.
