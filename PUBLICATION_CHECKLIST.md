# Checklist de Publicación — Dentimagen

> Estado técnico y operativo para llevar el sitio de prototipo a publicación real.
> Rama de trabajo: `feature/seo-publication-setup`
> Última actualización: 15 de abril de 2026

## 1. Objetivo

Este documento aterriza lo que falta antes de publicar `www.dentimagen.net` como sitio estático en Hostinger.

No reemplaza `README.md`, `WEBSITE_STATUS.md` ni `SEMANA-04_SEO-Tecnico.md`; funciona como checklist práctica de salida a producción.

## 2. Ya resuelto en el repo

- [x] Dominio canónico unificado a `https://www.dentimagen.net`
- [x] `canonical` presente en home, sedes, servicios y blog
- [x] `og:url` y `og:locale="es_EC"` presentes en las páginas principales
- [x] Un solo `H1` por página en la base actual del sitio
- [x] Schema JSON-LD instalado según tipo de página
- [x] `website/robots.txt` creado
- [x] `website/sitemap.xml` creado
- [x] `sitemap.xml` alineado con las URLs canónicas actuales del sitio
- [x] Navegación principal ya conecta home, sedes, servicios y blog

## 3. Bloqueantes antes de publicar

### Datos reales del negocio

- [ ] Reemplazar el WhatsApp placeholder `593XXXXXXXXX` en todo el sitio
- [ ] Definir dirección exacta de sede Norte
- [ ] Definir dirección exacta de sede Cumbayá
- [ ] Reemplazar códigos postales placeholder (`170XXX`)
- [ ] Reemplazar coordenadas y datos geo definitivos donde aún sean provisionales
- [ ] Confirmar el nombre comercial exacto que se usará de forma consistente en schema, títulos y redes

### Assets y social preview

- [ ] Crear carpeta `website/assets/` con assets reales
- [ ] Añadir logo final
- [ ] Añadir favicon real
- [ ] Añadir imágenes reales optimizadas
- [ ] Añadir `og:image` a las páginas principales
- [ ] Revisar que las imágenes finales tengan `alt` útil para SEO

### Validación SEO técnica externa

- [ ] Probar el schema en Rich Results Test
- [ ] Enviar `sitemap.xml` a Google Search Console
- [ ] Confirmar que `robots.txt` público responde bien en producción
- [ ] Revisar indexabilidad final de páginas importantes
- [ ] Hacer una pasada final de PageSpeed Insights en producción

### Medición y cumplimiento

- [ ] Definir si se usará Google Analytics o GTM
- [ ] Instalar tracking solo cuando exista política de cookies/privacidad
- [x] Crear política de privacidad
- [x] Crear política de cookies
- [x] Implementar aviso base de cookies para la web estática
- [ ] Ajustar consentimiento si se activa analítica o medición adicional

## 4. Hallazgos actuales del repo

### Placeholders detectados

- La dirección exacta de Cumbayá sigue pendiente en la home y en páginas relacionadas a esa sede.
- `og:image` todavía no está definido para la capa de publicación real.
- En schema siguen existiendo valores provisionales como `170XXX` y coordenadas de ejemplo.
- Todavía no se detecta `og:image` en los HTML actuales.
- Todavía no se detecta favicon enlazado en las páginas.

### Qué sí está bien encaminado

- La arquitectura de URLs ya es consistente.
- El sitemap ya refleja las URLs canónicas reales.
- El sitio ya tiene una base clara para Search Console.
- La paleta, navegación y sistema visual ya están suficientemente estables para seguir con publicación técnica.

## 5. Orden recomendado desde este punto

1. Completar datos reales del negocio
2. Añadir assets reales mínimos: logo, favicon, primeras imágenes
3. Validar schema y rich results
4. Conectar Search Console y enviar sitemap
5. Definir tracking y cumplimiento legal
6. Hacer QA final visual y técnica en producción

## 6. Qué NO bloquea esta fase técnica

Estos puntos pueden seguir pendientes mientras el sitio siga en prototipo:

- imágenes editoriales definitivas en todas las secciones
- automatizaciones o APIs
- formularios avanzados
- CRM o backend
- mejoras avanzadas de performance no críticas

## 7. Archivos técnicos clave de publicación

- `website/robots.txt`
- `website/sitemap.xml`
- `website/index.html`
- `website/dentista-norte-quito.html`
- `website/dentista-cumbaya.html`
- `WEBSITE_STATUS.md`
- `SEMANA-04_SEO-Tecnico.md`

## 8. Próxima branch sugerida después de esta

Cuando este bloque quede cerrado, la siguiente rama recomendada es:

- `feature/real-business-data`

Ahí deberían entrar:

- WhatsApp real
- direcciones exactas
- horarios finales
- logo
- favicon
- enlaces sociales definitivos
- limpieza de placeholders estructurales
