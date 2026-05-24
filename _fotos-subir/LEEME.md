# 📸 Cómo subir las fotos — Dentimagen

Sistema para que subas tus fotos **JPEG/PNG** y yo las convierta a WebP, las renombre y
las coloque automáticamente donde van.

---

## Cómo funciona (3 pasos)

1. **Tú** metes tus fotos en la carpeta de la sección que corresponde (abajo está la lista).
   - Nómbralas **exactamente** como indica la columna "Archivo a subir" (sin acentos, en minúscula).
   - Pueden ser `.jpg`, `.jpeg` o `.png`. No importa el tamaño/peso: cuanto más grande mejor.
2. **Tú me avisas** "ya subí las fotos".
3. **Yo** corro el conversor (`python3 _tools/fotos_a_webp.py`). Por cada foto subida:
   - genera `nombre.webp` (1600px) + `-tablet.webp` (1024px) + `-mobile.webp` (480px),
   - y **reemplaza solo, automáticamente, el placeholder por la `<img>`** correcta
     (con texto alt para SEO, srcset y dimensiones). Los slots sin foto se quedan como placeholder.
   Es incremental: puedes subir 2 hoy y 5 mañana; cada corrida solo procesa lo nuevo.

> No necesitas convertir nada ni saber de tamaños. Solo subir el JPEG con el nombre correcto.

---

## Reglas para que se vean premium

- **Buena luz** (preferible natural), nítidas, horizontales u verticales según la columna "Orientación".
- Resolución mínima sugerida: **1600px en el lado largo**.
- **Antes/después y tono:** la pareja debe tener **el mismo encuadre, ángulo y luz**.
  ⚠️ Requiere **consentimiento firmado del paciente**.
- No te preocupes por recortar a una proporción exacta: la web recorta con `object-fit`.

---

## 🔴 OBLIGATORIAS — 20 fotos (rellenan los placeholders actuales)

### 📁 `home/` — Resultados (1 caso antes/después)
| Archivo a subir | Qué debe mostrar | Orientación |
|---|---|---|
| `resultado-antes.jpg` | Boca/sonrisa ANTES de un tratamiento estrella | Vertical 3:4 |
| `resultado-despues.jpg` | La MISMA boca/sonrisa DESPUÉS | Vertical 3:4 |

### 📁 `sede-norte/` — Galería de la sede (5)
| Archivo a subir | Qué debe mostrar | Orientación |
|---|---|---|
| `sala-espera.jpg` | Sala de espera / recepción (foto grande destacada) | Vertical 4:5 |
| `consultorio.jpg` | Consultorio / sillón dental limpio | Vertical 4:5 |
| `tecnologia.jpg` | Escáner 3D, RX o equipo tecnológico | Vertical 4:5 |
| `equipo.jpg` | Equipo clínico / staff de la sede | Vertical 4:5 |
| `ambiente.jpg` | Detalle de ambiente, recepción o pasillo | Vertical 4:5 |

### 📁 `sede-cumbaya/` — Galería de la sede (5)
| Archivo a subir | Qué debe mostrar | Orientación |
|---|---|---|
| `sala-espera.jpg` | Sala de espera / recepción (foto grande destacada) | Vertical 4:5 |
| `equipo.jpg` | Equipo clínico / staff de Cumbayá | Vertical 4:5 |
| `consultorio.jpg` | Consultorio / sillón de Cumbayá | Vertical 4:5 |
| `tecnologia.jpg` | Tecnología / equipo 3D | Vertical 4:5 |
| `ambiente.jpg` | Detalle de ambiente / recepción | Vertical 4:5 |

### 📁 `implantes-quito/` — Antes/después (2)
| Archivo a subir | Qué debe mostrar | Orientación |
|---|---|---|
| `antes.jpg` | Caso de implante ANTES | Vertical 3:4 |
| `despues.jpg` | El mismo caso DESPUÉS | Vertical 3:4 |

### 📁 `implantes-cumbaya/` — Antes/después (2)
| Archivo a subir | Qué debe mostrar | Orientación |
|---|---|---|
| `antes.jpg` | Caso de implante ANTES (puede ser el mismo de Quito) | Vertical 3:4 |
| `despues.jpg` | El mismo caso DESPUÉS | Vertical 3:4 |

### 📁 `blanqueamiento/` — Registro de tono (2)
| Archivo a subir | Qué debe mostrar | Orientación |
|---|---|---|
| `tono-inicial.jpg` | Tono dental ANTES (con guía de color si se puede) | Vertical 3:4 |
| `tono-final.jpg` | Tono dental DESPUÉS | Vertical 3:4 |

### 📁 `diseno-sonrisa/` — Galería de casos (5)
| Archivo a subir | Qué debe mostrar | Orientación |
|---|---|---|
| `caso-destacado.jpg` | Sonrisa estrella / caso antes-después protagonista | Vertical 4:5 |
| `resinas.jpg` | Resultado de resinas estéticas | Libre |
| `blanqueamiento-forma.jpg` | Blanqueamiento + forma | Libre |
| `armonia.jpg` | Armonía de sonrisa | Libre |
| `recontorneado.jpg` | Recontorneado dental | Libre |

---

## 🟡 RECOMENDADAS — suben el nivel (reemplazan fotos reutilizadas)

> Hoy estas páginas usan **una misma foto genérica repetida** (la del equipo y la de clínica).
> Funcionan, pero lo premium es que cada página tenga su foto temática.

### 📁 `equipo/` — Retratos de equipo / doctores (la MÁS importante para una clínica)
| Archivo a subir | Qué debe mostrar | Orientación |
|---|---|---|
| `equipo-01.jpg` … `equipo-05.jpg` | Doctores/staff reales (genera confianza + SEO E-E-A-T) | Vertical 4:5 |

### 📁 `implantes-quito/`, `diseno-sonrisa/`, `blanqueamiento/`, `ortodoncia/` — Heroes/anatomía temáticos (opcionales)
| Archivo a subir | Qué debe mostrar |
|---|---|
| `hero.jpg` | Foto principal temática de esa página (ej. implante, sonrisa, brackets) |
| `anatomia.jpg` | Foto de contexto del tratamiento |

### 📁 `sede-norte/`, `sede-cumbaya/` — Hero y sección «por qué» (opcionales, para mejorar)
> Hoy el hero y el «por qué elegirnos» de las sedes usan una foto real pero repetida. Si quieres mejorarlas:
| Archivo a subir | Qué debe mostrar |
|---|---|
| `hero.jpg` | Foto principal de la sede (fachada / recepción protagonista) |
| `why.jpg` | Foto de la sección «por qué elegirnos» (equipo o ambiente cálido) |

---

## Resumen

- **23 fotos obligatorias** → quitan todos los placeholders (las galerías de sede ahora piden 5 fotos únicas c/u).
- **~15 recomendadas** (5 equipo + 6 heroes temáticos de servicio + 4 hero/«por qué» de sede) → eliminan toda foto reutilizada.
- **Prioridad mínima: 23 obligatorias + 3-5 de equipo.** Con las 23 ya no queda ningún hueco ni foto repetida.

> El blog **no necesita fotos** (usa banners de marca por decisión de diseño).
