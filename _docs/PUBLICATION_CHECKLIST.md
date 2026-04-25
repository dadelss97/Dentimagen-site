# Checklist de Publicacion - Dentimagen

> Estado tecnico y operativo para llevar el sitio de prototipo a publicacion real.
> Rama de trabajo sugerida: `feature/seo-publication-setup`
> Ultima actualizacion: 16 de abril de 2026

## 1. Objetivo

Este documento aterriza lo que falta antes de publicar `www.dentimagen.net` como sitio estatico en Hostinger.

No reemplaza `README.md`, `WEBSITE_STATUS.md` ni `SEMANA-04_SEO-Tecnico.md`; funciona como checklist practica de salida a produccion.

## 2. Ya resuelto en el repo

- [x] Dominio canonico unificado a `https://www.dentimagen.net`
- [x] `canonical` presente en home, sedes, servicios y blog
- [x] `og:url` y `og:locale="es_EC"` presentes en las paginas principales
- [x] Un solo `H1` por pagina en la base actual del sitio
- [x] Schema JSON-LD instalado segun tipo de pagina
- [x] `website/robots.txt` creado
- [x] `website/sitemap.xml` creado
- [x] `sitemap.xml` alineado con las URLs canonicas actuales del sitio
- [x] Navegacion principal ya conecta home, sedes, servicios y blog
- [x] Favicon enlazado en home, sedes, servicios, blog y legales
- [x] `.htaccess` agregado para soportar URLs limpias en Apache/Hostinger
- [x] Sistema centralizado para fotos y crop creado en `website/assets/site-photo-registry.js` + `website/assets/site-media.js`
- [x] `og:image` general creado y cargado en home, sedes, servicios y blog
- [x] Politica de privacidad, politica de cookies y aviso base ya estan implementados

## 3. Bloqueantes antes de publicar

### Datos reales del negocio

- [x] WhatsApp general cargado como `+593994236117`
- [x] Direccion base de sede Norte cargada
- [ ] Definir direccion exacta final de sede Cumbaya
- [ ] Confirmar si se publicaran latitud y longitud definitivas
- [ ] Confirmar nombre comercial exacto para schema, titulos y redes

### Assets y social preview

- [ ] Completar las fotos pendientes definidas en `FINAL_ASSETS_AND_SHARING.md`
- [ ] Confirmar si el logo actual de `website/assets/logo-dentimagen.png` ya es el final
- [ ] Revisar `alt` final de las fotos que se suban

### Validacion SEO tecnica externa

- [ ] Probar schema en Rich Results Test
- [ ] Enviar `sitemap.xml` a Google Search Console
- [ ] Confirmar que `robots.txt` responde bien en produccion
- [ ] Revisar indexabilidad final de paginas importantes
- [ ] Hacer una pasada final de PageSpeed Insights en produccion

### Medicion y cumplimiento

- [ ] Definir si se usara Google Analytics o GTM
- [ ] Instalar tracking solo cuando exista politica de cookies/privacidad acorde a ese uso
- [ ] Ajustar consentimiento si se activa analitica o medicion adicional

## 4. Hallazgos reales del repo

### Lo que ya esta bien

- El favicon si esta presente y enlazado
- La arquitectura de URLs es consistente
- El sitemap refleja las URLs canonicas reales
- Los scripts inline y compartidos parsean bien
- Las referencias activas de `href` y `src` resuelven correctamente

### Lo que sigue pendiente

- El `og:image` general ya existe; si mas adelante se quiere, el siguiente upgrade seria crear variantes por linea de servicio o por articulo
- El sistema visual ya esta listo para fotos reales, pero el inventario todavia tiene `63` slots pendientes
- Los iconos PNG opcionales de servicios (`assets/icons/*.png`) no estan cargados, aunque el sitio usa fallback SVG
- La direccion exacta de Cumbaya sigue siendo el dato operativo mas importante que falta cerrar

## 5. Orden recomendado desde este punto

1. Completar datos reales del negocio en `REAL_BUSINESS_DATA.md`
2. Completar primero los assets de prioridad alta del inventario
3. Validar schema y Search Console
4. Hacer QA final visual y tecnica en produccion
5. Regenerar el `og:image` solo si cambia branding, logo o mensaje principal

## 6. Que no bloquea esta fase tecnica

Estos puntos pueden seguir pendientes mientras el sitio siga en prototipo:

- imagenes editoriales definitivas en todos los slots de galeria
- iconos PNG opcionales de servicios
- automatizaciones o APIs
- formularios avanzados
- CRM o backend
- mejoras avanzadas de performance no criticas

## 7. Archivos tecnicos clave de publicacion

- `website/.htaccess`
- `website/robots.txt`
- `website/sitemap.xml`
- `website/assets/site-photo-registry.js`
- `website/assets/site-media.js`
- `website/index.html`
- `website/dentista-norte-quito.html`
- `website/dentista-cumbaya.html`
- `FINAL_ASSETS_AND_SHARING.md`
- `WEBSITE_STATUS.md`

## 8. Proxima branch sugerida

Cuando este bloque quede cerrado, la siguiente rama recomendada sigue siendo:

- `feature/real-business-data`

Ahí deberian entrar:

- direccion exacta de Cumbaya
- datos geo si se van a publicar
- revision final del nombre comercial
- cierre de placeholders visuales prioritarios
