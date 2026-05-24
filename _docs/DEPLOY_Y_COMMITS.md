# Deploy y reglas de commit — Dentimagen

> Documento autoritativo de qué entra y qué NO entra en los commits, por el
> riesgo de peso del repo y por cómo publica Hostinger. Leer antes de cada deploy.

## Cómo se publica el sitio

- **Push a `main`** → GitHub Action [`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml)
  → sube por **FTPS** **solo los archivos web** a `public_html` de Hostinger (~1 min).
- El deploy hace `actions/checkout`: **solo se publican archivos COMMITEADOS**.
  Un archivo sin commitear (untracked) **no existe en producción**.
- ⛔ **NUNCA** usar el "Deploy from GitHub" nativo de Hostinger: clona el repo
  completo (`.git` ≈ **1.9 GB**) y **falla**. El único método válido es la Action FTPS.

## ✅ QUÉ SÍ entra en los commits (= el sitio en vivo)

- Páginas: `*.html` (raíz) y `blog/*.html`
- Estilos / JS: `assets/css/*.css`, `assets/js/*.js`, `assets/site-*.js`
- Imágenes finales: `assets/photos/*.webp` (solo las referenciadas), `assets/icons/`,
  `assets/favicon/`, `assets/og/`, `assets/logo*`
- Esenciales web: `robots.txt`, `sitemap.xml`, `.htaccess`

**🔑 REGLA DE ORO:** si un HTML referencia un CSS/JS/imagen, ese archivo **debe ir
en el MISMO commit**. Si no, el sitio sale **roto o sin estilos** en producción
(porque lo untracked no se sube). Esto pasó con `dimagen.css`/`dimagen.js`.

**⚠️ LIMITACIÓN FTPS — NO crear carpetas nuevas anidadas (2026-05-24):** el FTP
action (SamKirkland/basic-ftp) vía FTPS en Hostinger registra `creating folder`
pero **NO crea de forma fiable directorios NUEVOS** — los archivos destinados a
ellos "se suben" sin error pero caen al vacío y dan **404**. Los uploads solo
aterminan bien en **carpetas que YA existen en el servidor** (`assets/`,
`assets/photos/`, `assets/icons/`, `blog/`, etc.). Por eso `dimagen.css`/`dimagen.js`
viven **directamente en `assets/`** (no en `assets/css/` ni `assets/js/`). **Regla:
no introducir subcarpetas nuevas en el árbol que se publica; reutilizar las
existentes.** Si algún día hace falta una carpeta nueva, crearla primero a mano en
el File Manager de Hostinger (o por `lftp mkdir -p`) ANTES del deploy.

## ❌ QUÉ NO entra (riesgo de peso / no es web)

| Ruta | Qué es | Estado |
|---|---|---|
| `_docs/` | Docs **+ 2.0 GB de fotos fuente** (`Fotos-media/` 1.6 GB, `Fotos Export/` 351 MB, ya en la historia) | Excluido del deploy. **NO añadir más binarios pesados aquí** |
| `screenshots/` | Capturas de QA | Excluido del deploy. Dejar untracked |
| `_mockups/` | Referencias de diseño (noindex) | Excluido del deploy |
| `scripts/`, `_tools/` | Herramientas Python locales | Ignorados por `.gitignore` |
| `_fotos-subir/*/` | Originales JPEG/PNG para convertir | Ignorados; **solo el `.webp` final se versiona** |

El `exclude` del workflow ya cubre: `_docs/**`, `_scripts/**`, `_mockups/**`,
`.github/**`, `screenshots/**`, `**/*.md`, `.git*`, `.gitignore`, `.htaccess-root`.

## Por qué importa el peso

- `.git` ya pesa **~1.9 GB** por fotos commiteadas en el pasado dentro de `_docs/`.
  La Action FTPS **no** sube `_docs/`, así que ese peso **no llega a Hostinger** —
  pero sí hace lento el `clone` y es la razón por la que el deploy nativo de Hostinger falla.
- Antes de commitear, **no añadir binarios grandes** (vídeos, fotos sin optimizar,
  exports). En `assets/photos/` solo `.webp` optimizados.

## Checklist antes de push / deploy

1. ¿Todo lo referenciado por los HTML está commiteado? (CSS, JS, imágenes)
2. ¿Se coló algún archivo pesado?
   `git diff --cached --name-only | xargs du -h 2>/dev/null | sort -rh | head`
3. Stagear con `git add -u` (modificados/borrados de tracked) + `git add` explícito
   de los assets nuevos. **NO** `git add -A` a ciegas (arrastra QA/docs/binarios).
4. `git push origin main` → `gh run watch` para confirmar que subió bien.
5. Verificar en vivo: `_scripts/verify-live.sh` (si existe) o abrir https://www.dentimagen.net
