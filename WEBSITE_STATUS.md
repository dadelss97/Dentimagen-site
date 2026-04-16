# Estado del Proyecto Web — Dentimagen Centro Odontológico

> Documento de referencia para retomar el trabajo
> Última actualización: 16 de abril de 2026

---

## 1. Resumen ejecutivo

Estamos construyendo el sitio web de Dentimagen en **HTML/CSS/JS puro**, con un archivo por página y sin frameworks. Esta fase existe para diseñar, validar estructura, ordenar el SEO on-page y dejar una base sólida para publicar y seguir escalando el proyecto como sitio estático en Hostinger.

### Estado actual real
- El proyecto está en **prototipo estructural activo**
- El diseño actual oficial ya está definido
- Las páginas construidas sirven como base visual y SEO
- La QA técnica base ya está hecha en rutas, scripts, sitemap, favicon y URLs limpias
- **No es todavía un sitio listo para despliegue final**

### Decisiones vigentes
- Dominio canónico oficial: `https://www.dentimagen.net`
- Flujo técnico: **sitio estático en HTML/CSS/JS + GitHub + Hostinger**
- Los placeholders visuales siguen permitidos, pero ahora están centralizados por slot en `website/assets/site-photo-registry.js`

---

## 2. Fuente de verdad actual

Estos archivos son la referencia oficial:

- `WEBSITE_STATUS.md` -> estado del proyecto y próximos pasos
- `DESIGN.md` -> sistema visual vigente
- `CLAUDE.md` -> estrategia SEO general

Archivo histórico:

- `DESIGN_legacy.md` -> diseño original archivado, no vigente

---

## 3. Diseño oficial activo

El sistema activo es un **light refined mode**:

- Fondo claro y editorial
- Tipografía elegante pero legible
- Acento morado para CTAs, hover y señalización
- Secciones oscuras solo en CTA/footer para contraste
- Enfoque en confianza médica, limpieza visual y SEO local

### Paleta vigente

```css
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
--border:         #e5dbd0;
--border-light:   #eee6dd;
--shadow-accent:  0 6px 28px rgba(109,40,217,.25);
```

### Tipografía vigente
- Display / titulares: `Cormorant Garamond`
- UI / body / botones: `DM Sans`

---

## 4. Base compartida para nuevas páginas

Aunque los HTML sigan siendo autocontenidos, todas las páginas nuevas deben copiar la base corregida y actual, no una página vieja al azar.

### Bloques base
1. `header`
2. `hero`
3. `services`
4. `locations`
5. `faq`
6. `cta`
7. `footer`

### Convenciones mínimas
- Header sticky con drawer mobile
- Drawer mobile con cierre por click externo
- `canonical` y `og:url`
- `og:locale="es_EC"`
- Schema JSON-LD según el tipo de página
- FAQ con `aria-expanded`
- Footer sin `href="#"` para elementos sin destino real
- Soporte de URLs limpias en Apache/Hostinger vía `website/.htaccess`

---

## 5. Páginas construidas

### Estructura actual

| Archivo | Tipo | Keyword objetivo | Estado real |
|---|---|---|---|
| `website/index.html` | Homepage | clínica dental Quito / marca | Base estructural lista |
| `website/dentista-norte-quito.html` | Sede | dentista norte Quito | Base estructural lista |
| `website/dentista-cumbaya.html` | Sede | dentista Cumbayá | Base estructural lista |
| `website/implantes-cumbaya.html` | Servicio + sede | implantes Cumbayá | Base estructural lista |
| `website/implantes-dentales-quito.html` | Servicio ciudad | implantes dentales Quito | Base estructural lista |
| `website/ortodoncia-quito.html` | Servicio ciudad | ortodoncia Quito | Base estructural lista |
| `website/blanqueamiento-dental-quito.html` | Servicio ciudad | blanqueamiento dental Quito | Base estructural lista |
| `website/diseno-de-sonrisa-quito.html` | Servicio ciudad | diseño de sonrisa Quito | Base estructural lista |

### Qué significa “base estructural lista”
- Layout definido
- Sistema visual consistente
- Navegación y componentes principales en su lugar
- SEO base implementado
- Placeholders aún permitidos

No significa:

- Assets finales cargados
- Integraciones finales conectadas
- Validación final para publicación

---

## 6. Qué está pendiente a propósito

Los siguientes elementos siguen pendientes de forma deliberada:

### Assets
- Fotografías pendientes de sedes, servicios y resultados reales
- Posibles iconos PNG opcionales para servicios
- Mapa embebido real si se decide publicar
- Dirección exacta final de Cumbayá

### Integraciones
- Número final de WhatsApp por sede
- Enlaces finales donde todavía no existan
- Formularios finales si se conectan más adelante

### Contenido
- Reemplazo de placeholders visuales
- Ajustes finales de copy
- Resto de páginas de servicios
- Nuevas piezas futuras del blog

---

## 7. Prototipo vs publicación

### Estado de prototipo
En prototipo sí se permite:

- Usar placeholders visibles
- Dejar assets marcados como pendientes
- Diseñar antes de tener logo o fotos definitivas
- Probar estructura antes de tener todas las páginas

### Estado de publicación
Antes de publicar, sí habrá que revisar:

- Logo final
- Imágenes reales optimizadas
- WhatsApp real
- Dirección exacta
- Mapa real
- Metadatos finales
- Enlaces internos definitivos
- Validación visual mobile y desktop

---

## 8. SEO técnico y dominio

### Regla oficial
Todo debe apuntar a:

- `https://www.dentimagen.net`

### Aplicación
- `canonical`
- `og:url`
- `url` de schema
- `item` de `BreadcrumbList`
- Documentación operativa

### Homepage
La home debe cumplir estas reglas:

- Tener exactamente 1 `H1`
- El `H1` debe incluir la keyword principal
- El branding emocional va como subheadline, no como H1
- La navegación superior debe enlazar a las dos sedes

### Estado técnico actual

- `website/robots.txt` ya existe
- `website/sitemap.xml` ya existe
- `website/.htaccess` ya existe para servir URLs limpias
- El favicon ya está enlazado en páginas principales, blog y legales
- `website/assets/site-photo-registry.js` centraliza los slots de imagen y el crop sin tocar cada HTML
- `website/assets/og/dentimagen-og-1200x630.jpg` ya existe y se puede regenerar con `scripts/generate_og_image.py`
- El sitemap actual está alineado con las URLs canónicas del sitio
- El siguiente bloque crítico ya no es arquitectura SEO, sino datos reales, assets pendientes y validación externa

### Referencia operativa

Para ejecutar la salida a producción sin perder el hilo:

- leer `PUBLICATION_CHECKLIST.md`

---

## 9. Estado de construcción de páginas

### Fase 2
- `implantes-dentales-quito.html` -> completada
- `ortodoncia-quito.html` -> completada
- `blanqueamiento-dental-quito.html` -> completada

### Fase 3
- `diseno-de-sonrisa-quito.html` -> completada
- `Invisalign` -> integrado dentro de `ortodoncia-quito.html`

### Opcional al final
- `emergencia-dental-quito.html` -> opcional para una fase posterior
- `carillas-dentales-quito.html` -> opcional para una fase posterior

### Fase 4
- `blog/index.html` -> completada
- `blog/implantes-quito-precio.html` -> completada
- `blog/ortodoncia-adultos-quito.html` -> completada
- `blog/blanqueamiento-cumbaya.html` -> completada
- `blog/clinica-norte-quito.html` -> completada

---

## 10. Estructura actual del proyecto

```text
/Users/daniel/Desktop/Dentimagen Projects/Dentimagen SEO/
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
└── website/
    ├── index.html
    ├── dentista-norte-quito.html
    ├── dentista-cumbaya.html
    ├── implantes-cumbaya.html
    ├── implantes-dentales-quito.html
    ├── ortodoncia-quito.html
    ├── blanqueamiento-dental-quito.html
    ├── diseno-de-sonrisa-quito.html
    ├── blog/
    │   ├── index.html
    │   ├── implantes-quito-precio.html
    │   ├── ortodoncia-adultos-quito.html
    │   ├── blanqueamiento-cumbaya.html
    │   └── clinica-norte-quito.html
    └── assets/              <- pendiente
```

---

## 11. Dirección técnica y publicación

La dirección técnica vigente ya no contempla migración a WordPress. Este repositorio se considera la base principal del sitio.

### Orden aprobado
1. Diseñar y validar en HTML/CSS/JS
2. Completar páginas prioritarias de servicio, sede y blog
3. Reemplazar placeholders cuando existan assets y datos reales
4. Publicar el sitio estático en Hostinger
5. Añadir medición, legal, cookies, formularios e integraciones por capas

### Objetivo de esta fase HTML
- Velocidad de iteración
- Control total del diseño
- Ajuste fino del SEO on-page
- Versionado con GitHub
- Base clara para crecer sin depender de CMS

### Próxima dirección técnica
- Repositorio GitHub privado como fuente de verdad
- Edición siempre desde IDE local
- Commits y push frecuentes
- Deploy manual o Git deployment en Hostinger cuando el bloque esté estable
- Formularios, cookies, analítica y APIs como capas posteriores

---

## 12. Cómo retomar el trabajo en un nuevo chat

Cuando se retome este proyecto:

1. Leer `WEBSITE_STATUS.md`
2. Leer `DESIGN.md`
3. Leer `CLAUDE.md`
4. Tomar como referencia una página ya corregida de la base actual

### Prompt sugerido

> Continuamos el proyecto Dentimagen. Lee WEBSITE_STATUS.md, DESIGN.md y CLAUDE.md. Trabaja sobre la base compartida actual del sitio y mantén el dominio canónico en https://www.dentimagen.net.
