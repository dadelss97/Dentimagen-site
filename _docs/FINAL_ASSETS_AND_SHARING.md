# Inventario Final de Fotos y Social Sharing - Dentimagen

> Rama activa sugerida: `feature/final-assets-and-sharing`
> Ultima actualizacion: 16 de abril de 2026

Este documento ya esta alineado con el codigo real del repo y con el registro central de fotos en `website/assets/site-photo-registry.js`.

## 1. Estado real actual

- Slots configurados con archivo ya cargado: `13`
- Slots pendientes definidos en el registro: `63`
- `og:image` general: listo y enlazado en home, sedes, servicios y blog
- Iconos PNG opcionales de servicios: pendientes
- Favicon: presente y enlazado en el sitio

## 2. Workflow recomendado desde ahora

1. Si necesitas regenerar el social preview base, corre `python3 scripts/generate_og_image.py`.
2. La primera tanda sugerida ya esta separada en `website/assets/photo-batch-01-priority.csv`.
3. Sube la foto optimizada a `website/assets/photos/` usando el nombre exacto definido en este documento.
4. Si el slot ya tiene `src` en `site-photo-registry.js`, la imagen aparece sola.
5. Si el slot esta marcado como pendiente, cambia `fileName` por `src: 'assets/photos/<archivo>'` en `website/assets/site-photo-registry.js` sin tocar el HTML.
6. Si el encuadre no convence, ajusta solo `crop` o `position` en `site-photo-registry.js`.

### Tanda 01 prioritaria

Esta primera tanda ataca lo que mas se nota en conversion y percepcion de calidad:

- la tarjeta `why-tecnologia` de home
- los carruseles principales de las dos sedes
- el `hero` y el bloque `result` de cada pagina de servicio

Archivos incluidos en `website/assets/photo-batch-01-priority.csv`:

- `home-why-tecnologia-02.webp`
- `sede-norte-equipo-02.webp`
- `sede-cumbaya-tecnologia-03.webp`
- `implantes-quito-hero-01.webp`
- `implantes-quito-resultado-01.webp`
- `implantes-cumbaya-hero-01.webp`
- `implantes-cumbaya-resultado-01.webp`
- `ortodoncia-quito-hero-01.webp`
- `ortodoncia-quito-resultado-01.webp`
- `blanqueamiento-quito-hero-01.webp`
- `blanqueamiento-quito-resultado-01.webp`
- `diseno-sonrisa-quito-hero-01.webp`
- `diseno-sonrisa-quito-resultado-01.webp`

## 3. Crop y posicion sin pelear con inline styles

Todas las fotos se muestran recortadas para llenar su contenedor (object-fit: cover). Por defecto el recorte es desde el centro. Si la foto no se ve bien — por ejemplo le corta la cara a alguien o muestra demasiado techo — cambias el `crop` en `website/assets/site-photo-registry.js` sin tocar ningún HTML.

### Presets disponibles

| Preset | Cuando usarlo |
|---|---|
| `crop-center` | Default. Centra la foto horizontal y verticalmente |
| `crop-face` | Sube el punto focal al 22% desde arriba — ideal para retratos donde la cara queda en el tercio superior |
| `crop-top` | Muestra la parte de arriba de la foto — útil si lo importante está en la parte superior |
| `crop-bottom` | Muestra la parte de abajo — útil para detalles en el suelo o mesa |
| `crop-left` | Ancla la foto al borde izquierdo |
| `crop-right` | Ancla la foto al borde derecho |

### Como se aplica en el registro

Abre `website/assets/site-photo-registry.js` y busca el slot. Solo cambia el valor de `crop`:

```js
// Antes: la cara queda cortada
'carousel-equipo': {
  src: 'assets/photos/sede-cumbaya-equipo-02.webp',
  alt: 'Equipo clínico de Dentimagen en Cumbayá',
  crop: 'crop-center'   // ← cambiar esto
},

// Despues: muestra el tercio superior donde está la cara
'carousel-equipo': {
  src: 'assets/photos/sede-cumbaya-equipo-02.webp',
  alt: 'Equipo clínico de Dentimagen en Cumbayá',
  crop: 'crop-face'     // ← listo, sin tocar HTML
},
```

### Ajuste fino con position

Si ningún preset encaja exactamente, puedes definir una posicion en porcentajes. El primer numero es horizontal (0% = izquierda, 100% = derecha) y el segundo es vertical (0% = arriba, 100% = abajo):

```js
'hero': {
  src: 'assets/photos/implantes-quito-hero-01.webp',
  alt: 'Implantes dentales en Quito',
  crop: 'crop-center',
  position: '30% 20%'  // ← mueve el foco al 30% horizontal y 20% vertical
},
```

Usa `position` solo si los presets no funcionan — en la mayoría de fotos `crop-face` o `crop-center` son suficientes.

## 4. Inventario completo por pagina

### Home

| Slot | Archivo esperado | Estado | Ratio | Medida recomendada | Peso recomendado | Prioridad |
|---|---|---|---|---|---|---|
| `hero-clinica` | `home-hero-clinica-01.webp` | Cargado | 2:3 | 1600 x 2400 px | 120-250 KB | Alta |
| `hero-equipo` | `home-hero-equipo-02.webp` | Cargado | 2:3 | 1600 x 2400 px | 120-250 KB | Alta |
| `hero-recepcion` | `home-hero-recepcion-03.webp` | Cargado | 2:3 | 1600 x 2400 px | 120-250 KB | Alta |
| `why-equipo` | `home-why-equipo-01.webp` | Cargado | 1:1 | 1600 x 1600 px | 120-220 KB | Alta |
| `why-tecnologia` | `home-why-tecnologia-02.webp` | Pendiente | 1:1 | 1600 x 1600 px | 120-220 KB | Alta |
| `why-ambiente` | `home-why-ambiente-03.webp` | Cargado | 1:1 | 1600 x 1600 px | 120-220 KB | Alta |

### Sede Norte

| Slot | Archivo esperado | Estado | Ratio | Medida recomendada | Peso recomendado | Prioridad |
|---|---|---|---|---|---|---|
| `carousel-recepcion` | `sede-norte-recepcion-01.webp` | Cargado | 1:1 | 1600 x 1600 px | 120-220 KB | Alta |
| `carousel-equipo` | `sede-norte-equipo-02.webp` | Pendiente | 1:1 | 1600 x 1600 px | 120-220 KB | Alta |
| `carousel-tecnologia` | `sede-norte-tecnologia-03.webp` | Cargado | 1:1 | 1600 x 1600 px | 120-220 KB | Alta |
| `gallery-01` | `sede-norte-galeria-01.webp` | Cargado | 4:5 | 1400 x 1750 px | 120-220 KB | Media |
| `gallery-02` | `sede-norte-galeria-02.webp` | Cargado | 4:3 | 1400 x 1050 px | 90-180 KB | Media |
| `gallery-03` | `sede-norte-galeria-03.webp` | Pendiente | 4:3 | 1400 x 1050 px | 90-180 KB | Media |
| `gallery-04` | `sede-norte-galeria-04.webp` | Pendiente | 4:3 | 1400 x 1050 px | 90-180 KB | Media |
| `gallery-05` | `sede-norte-galeria-05.webp` | Pendiente | 4:3 | 1400 x 1050 px | 90-180 KB | Media |
| `gallery-06` | `sede-norte-galeria-06.webp` | Pendiente | 4:3 | 1400 x 1050 px | 90-180 KB | Media |
| `gallery-07` | `sede-norte-galeria-07.webp` | Pendiente | 4:3 | 1400 x 1050 px | 90-180 KB | Media |

### Sede Cumbaya

| Slot | Archivo esperado | Estado | Ratio | Medida recomendada | Peso recomendado | Prioridad |
|---|---|---|---|---|---|---|
| `carousel-ambiente` | `sede-cumbaya-ambiente-01.webp` | Cargado | 1:1 | 1600 x 1600 px | 120-220 KB | Alta |
| `carousel-equipo` | `sede-cumbaya-equipo-02.webp` | Cargado | 1:1 | 1600 x 1600 px | 120-220 KB | Alta |
| `carousel-tecnologia` | `sede-cumbaya-tecnologia-03.webp` | Pendiente | 1:1 | 1600 x 1600 px | 120-220 KB | Alta |
| `gallery-01` | `sede-cumbaya-galeria-01.webp` | Cargado | 4:5 | 1400 x 1750 px | 120-220 KB | Media |
| `gallery-02` | `sede-cumbaya-galeria-02.webp` | Pendiente | 4:3 | 1400 x 1050 px | 90-180 KB | Media |
| `gallery-03` | `sede-cumbaya-galeria-03.webp` | Pendiente | 4:3 | 1400 x 1050 px | 90-180 KB | Media |
| `gallery-04` | `sede-cumbaya-galeria-04.webp` | Cargado | 4:3 | 1400 x 1050 px | 90-180 KB | Media |
| `gallery-05` | `sede-cumbaya-galeria-05.webp` | Pendiente | 4:3 | 1400 x 1050 px | 90-180 KB | Media |
| `gallery-06` | `sede-cumbaya-galeria-06.webp` | Pendiente | 4:3 | 1400 x 1050 px | 90-180 KB | Media |
| `gallery-07` | `sede-cumbaya-galeria-07.webp` | Pendiente | 4:3 | 1400 x 1050 px | 90-180 KB | Media |

### Implantes Dentales Quito

| Slot | Archivo esperado | Estado | Ratio | Medida recomendada | Peso recomendado | Prioridad |
|---|---|---|---|---|---|---|
| `hero` | `implantes-quito-hero-01.webp` | Pendiente | 4:5 | 1600 x 2000 px | 140-260 KB | Alta |
| `explain` | `implantes-diagrama-01.webp` | Pendiente | 1:1 contain | 1600 x 1600 px | 80-180 KB | Media |
| `gallery-01` | `implantes-quito-gallery-01.webp` | Pendiente | 4:5 | 1400 x 1750 px | 120-220 KB | Media |
| `gallery-02` | `implantes-quito-gallery-02.webp` | Pendiente | 4:3 | 1400 x 1050 px | 90-180 KB | Media |
| `gallery-03` | `implantes-quito-gallery-03.webp` | Pendiente | 4:3 | 1400 x 1050 px | 90-180 KB | Media |
| `gallery-04` | `implantes-quito-gallery-04.webp` | Pendiente | 4:3 | 1400 x 1050 px | 90-180 KB | Media |
| `gallery-05` | `implantes-quito-gallery-05.webp` | Pendiente | 4:3 | 1400 x 1050 px | 90-180 KB | Media |
| `gallery-06` | `implantes-quito-gallery-06.webp` | Pendiente | 4:3 | 1400 x 1050 px | 90-180 KB | Media |
| `gallery-07` | `implantes-quito-gallery-07.webp` | Pendiente | 4:3 | 1400 x 1050 px | 90-180 KB | Media |
| `result` | `implantes-quito-resultado-01.webp` | Pendiente | 4:5 | 1600 x 2000 px | 140-260 KB | Alta |

### Implantes Cumbaya

| Slot | Archivo esperado | Estado | Ratio | Medida recomendada | Peso recomendado | Prioridad |
|---|---|---|---|---|---|---|
| `hero` | `implantes-cumbaya-hero-01.webp` | Pendiente | 4:5 | 1600 x 2000 px | 140-260 KB | Alta |
| `explain` | `implantes-diagrama-01.webp` | Pendiente | 1:1 contain | 1600 x 1600 px | 80-180 KB | Media |
| `gallery-01` | `implantes-cumbaya-gallery-01.webp` | Pendiente | 4:5 | 1400 x 1750 px | 120-220 KB | Media |
| `gallery-02` | `implantes-cumbaya-gallery-02.webp` | Pendiente | 4:3 | 1400 x 1050 px | 90-180 KB | Media |
| `gallery-03` | `implantes-cumbaya-gallery-03.webp` | Pendiente | 4:3 | 1400 x 1050 px | 90-180 KB | Media |
| `gallery-04` | `implantes-cumbaya-gallery-04.webp` | Pendiente | 4:3 | 1400 x 1050 px | 90-180 KB | Media |
| `gallery-05` | `implantes-cumbaya-gallery-05.webp` | Pendiente | 4:3 | 1400 x 1050 px | 90-180 KB | Media |
| `gallery-06` | `implantes-cumbaya-gallery-06.webp` | Pendiente | 4:3 | 1400 x 1050 px | 90-180 KB | Media |
| `gallery-07` | `implantes-cumbaya-gallery-07.webp` | Pendiente | 4:3 | 1400 x 1050 px | 90-180 KB | Media |
| `result` | `implantes-cumbaya-resultado-01.webp` | Pendiente | 4:5 | 1600 x 2000 px | 140-260 KB | Alta |

### Ortodoncia Quito

| Slot | Archivo esperado | Estado | Ratio | Medida recomendada | Peso recomendado | Prioridad |
|---|---|---|---|---|---|---|
| `hero` | `ortodoncia-quito-hero-01.webp` | Pendiente | 4:5 | 1600 x 2000 px | 140-260 KB | Alta |
| `explain` | `ortodoncia-diagrama-01.webp` | Pendiente | 1:1 contain | 1600 x 1600 px | 80-180 KB | Media |
| `gallery-01` | `ortodoncia-quito-gallery-01.webp` | Pendiente | 4:5 | 1400 x 1750 px | 120-220 KB | Media |
| `gallery-02` | `ortodoncia-quito-gallery-02.webp` | Pendiente | 4:3 | 1400 x 1050 px | 90-180 KB | Media |
| `gallery-03` | `ortodoncia-quito-gallery-03.webp` | Pendiente | 4:3 | 1400 x 1050 px | 90-180 KB | Media |
| `gallery-04` | `ortodoncia-quito-gallery-04.webp` | Pendiente | 4:3 | 1400 x 1050 px | 90-180 KB | Media |
| `gallery-05` | `ortodoncia-quito-gallery-05.webp` | Pendiente | 4:3 | 1400 x 1050 px | 90-180 KB | Media |
| `gallery-06` | `ortodoncia-quito-gallery-06.webp` | Pendiente | 4:3 | 1400 x 1050 px | 90-180 KB | Media |
| `gallery-07` | `ortodoncia-quito-gallery-07.webp` | Pendiente | 4:3 | 1400 x 1050 px | 90-180 KB | Media |
| `result` | `ortodoncia-quito-resultado-01.webp` | Pendiente | 4:5 | 1600 x 2000 px | 140-260 KB | Alta |

### Blanqueamiento Dental Quito

| Slot | Archivo esperado | Estado | Ratio | Medida recomendada | Peso recomendado | Prioridad |
|---|---|---|---|---|---|---|
| `hero` | `blanqueamiento-quito-hero-01.webp` | Pendiente | 4:5 | 1600 x 2000 px | 140-260 KB | Alta |
| `explain` | `blanqueamiento-diagrama-01.webp` | Pendiente | 1:1 contain | 1600 x 1600 px | 80-180 KB | Media |
| `gallery-01` | `blanqueamiento-quito-gallery-01.webp` | Pendiente | 4:5 | 1400 x 1750 px | 120-220 KB | Media |
| `gallery-02` | `blanqueamiento-quito-gallery-02.webp` | Pendiente | 4:3 | 1400 x 1050 px | 90-180 KB | Media |
| `gallery-03` | `blanqueamiento-quito-gallery-03.webp` | Pendiente | 4:3 | 1400 x 1050 px | 90-180 KB | Media |
| `gallery-04` | `blanqueamiento-quito-gallery-04.webp` | Pendiente | 4:3 | 1400 x 1050 px | 90-180 KB | Media |
| `gallery-05` | `blanqueamiento-quito-gallery-05.webp` | Pendiente | 4:3 | 1400 x 1050 px | 90-180 KB | Media |
| `gallery-06` | `blanqueamiento-quito-gallery-06.webp` | Pendiente | 4:3 | 1400 x 1050 px | 90-180 KB | Media |
| `gallery-07` | `blanqueamiento-quito-gallery-07.webp` | Pendiente | 4:3 | 1400 x 1050 px | 90-180 KB | Media |
| `result` | `blanqueamiento-quito-resultado-01.webp` | Pendiente | 4:5 | 1600 x 2000 px | 140-260 KB | Alta |

### Diseno de Sonrisa Quito

| Slot | Archivo esperado | Estado | Ratio | Medida recomendada | Peso recomendado | Prioridad |
|---|---|---|---|---|---|---|
| `hero` | `diseno-sonrisa-quito-hero-01.webp` | Pendiente | 4:5 | 1600 x 2000 px | 140-260 KB | Alta |
| `explain` | `diseno-sonrisa-diagrama-01.webp` | Pendiente | 1:1 contain | 1600 x 1600 px | 80-180 KB | Media |
| `gallery-01` | `diseno-sonrisa-quito-gallery-01.webp` | Pendiente | 4:5 | 1400 x 1750 px | 120-220 KB | Media |
| `gallery-02` | `diseno-sonrisa-quito-gallery-02.webp` | Pendiente | 4:3 | 1400 x 1050 px | 90-180 KB | Media |
| `gallery-03` | `diseno-sonrisa-quito-gallery-03.webp` | Pendiente | 4:3 | 1400 x 1050 px | 90-180 KB | Media |
| `gallery-04` | `diseno-sonrisa-quito-gallery-04.webp` | Pendiente | 4:3 | 1400 x 1050 px | 90-180 KB | Media |
| `gallery-05` | `diseno-sonrisa-quito-gallery-05.webp` | Pendiente | 4:3 | 1400 x 1050 px | 90-180 KB | Media |
| `gallery-06` | `diseno-sonrisa-quito-gallery-06.webp` | Pendiente | 4:3 | 1400 x 1050 px | 90-180 KB | Media |
| `gallery-07` | `diseno-sonrisa-quito-gallery-07.webp` | Pendiente | 4:3 | 1400 x 1050 px | 90-180 KB | Media |
| `result` | `diseno-sonrisa-quito-resultado-01.webp` | Pendiente | 4:5 | 1600 x 2000 px | 140-260 KB | Alta |

## 5. Assets adicionales y soporte

| Archivo | Uso | Medida recomendada | Peso recomendado | Prioridad | Estado |
|---|---|---|---|---|---|
| `assets/og/dentimagen-og-1200x630.jpg` | Preview social general | 1200 x 630 px | 150-300 KB | Alta | Listo |
| `assets/icons/implantes.png` | Icono opcional de servicios | 128 x 128 px | 10-25 KB | Baja | Pendiente |
| `assets/icons/ortodoncia.png` | Icono opcional de servicios | 128 x 128 px | 10-25 KB | Baja | Pendiente |
| `assets/icons/blanqueamiento.png` | Icono opcional de servicios | 128 x 128 px | 10-25 KB | Baja | Pendiente |

## 6. Recomendaciones practicas de exportacion

- Usa `WebP` para todas las fotos del sitio.
- Mantente en calidad visual alta pero con peso controlado; no hace falta pasar de `260 KB` por foto en esta etapa.
- Para diagramas o explicativos, usa fondo limpio y `object-fit: contain`.
- Guarda originales aparte; al repo solo deben entrar versiones optimizadas para web.
- Si cambia el branding o quieres otro mensaje de portada, regenera el JPG base con `python3 scripts/generate_og_image.py`.
