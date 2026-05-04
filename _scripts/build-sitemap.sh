#!/usr/bin/env bash
# Generate sitemap.xml with real lastmod dates from git log.
# Usage: ./_scripts/build-sitemap.sh
# Run this BEFORE pushing to Hostinger when files have changed.

set -euo pipefail

# Move to repo root regardless of where the script is called from
cd "$(dirname "$0")/.."

SITE="https://www.dentimagen.net"
OUT="sitemap.xml"
TMP="$(mktemp)"

# Format: file_path|loc_path|priority|changefreq
PAGES=(
  "index.html|/|1.0|monthly"
  "dentista-norte-quito.html|/dentista-norte-quito|0.9|monthly"
  "dentista-cumbaya.html|/dentista-cumbaya|0.9|monthly"
  "implantes-dentales-quito.html|/implantes-dentales-quito|0.8|monthly"
  "implantes-cumbaya.html|/implantes-cumbaya|0.8|monthly"
  "ortodoncia-quito.html|/ortodoncia-quito|0.8|monthly"
  "blanqueamiento-dental-quito.html|/blanqueamiento-dental-quito|0.8|monthly"
  "diseno-de-sonrisa-quito.html|/diseno-de-sonrisa-quito|0.8|monthly"
  "blog/index.html|/blog/|0.7|weekly"
  "blog/implantes-quito-precio.html|/blog/implantes-quito-precio|0.7|monthly"
  "blog/ortodoncia-adultos-quito.html|/blog/ortodoncia-adultos-quito|0.7|monthly"
  "blog/blanqueamiento-cumbaya.html|/blog/blanqueamiento-cumbaya|0.7|monthly"
  "blog/clinica-norte-quito.html|/blog/clinica-norte-quito|0.7|monthly"
  "politica-de-privacidad.html|/politica-de-privacidad|0.3|yearly"
  "politica-de-cookies.html|/politica-de-cookies|0.3|yearly"
)

# Header
{
  echo '<?xml version="1.0" encoding="UTF-8"?>'
  echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
} > "$TMP"

# One <url> entry per page, with lastmod from git log
for entry in "${PAGES[@]}"; do
  IFS='|' read -r file loc priority changefreq <<< "$entry"

  # Get last commit date for this file (ISO format, just the date part)
  if git log -1 --format=%cI -- "$file" >/dev/null 2>&1 && [ -n "$(git log -1 --format=%cI -- "$file")" ]; then
    lastmod=$(git log -1 --format=%cI -- "$file" | cut -dT -f1)
  else
    # Fallback: file not tracked yet, use today
    lastmod=$(date -u +%Y-%m-%d)
  fi

  {
    echo "  <url>"
    echo "    <loc>${SITE}${loc}</loc>"
    echo "    <lastmod>${lastmod}</lastmod>"
    echo "    <changefreq>${changefreq}</changefreq>"
    echo "    <priority>${priority}</priority>"
    echo "  </url>"
  } >> "$TMP"
done

echo '</urlset>' >> "$TMP"

# Move temp to final
mv "$TMP" "$OUT"

# Report
url_count=$(grep -c '<url>' "$OUT")
echo "✓ sitemap.xml regenerado con $url_count URLs"
echo ""
echo "Próximos pasos:"
echo "  1. git diff sitemap.xml  # revisar cambios"
echo "  2. git add sitemap.xml && git commit"
echo "  3. push a Hostinger"
echo "  4. Search Console → Sitemaps → reenviar https://www.dentimagen.net/sitemap.xml"
