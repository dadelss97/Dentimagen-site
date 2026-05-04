#!/usr/bin/env bash
# Verifica que los cambios SEO están live en producción.
# Usage: ./_scripts/verify-live.sh

set -uo pipefail
SITE="https://www.dentimagen.net"

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

pass() { echo -e "${GREEN}✓${NC} $1"; }
fail() { echo -e "${RED}✗${NC} $1"; }
warn() { echo -e "${YELLOW}!${NC} $1"; }

echo "=== Verificación SEO live: $SITE ==="
echo ""

# 1. Clean URL responde 200
echo "1. Clean URLs"
for url in "/" "/dentista-cumbaya" "/dentista-norte-quito" "/implantes-dentales-quito" "/blog/"; do
  status=$(curl -sI "${SITE}${url}" | head -1 | awk '{print $2}')
  if [ "$status" = "200" ]; then
    pass "${url} → 200"
  else
    fail "${url} → ${status} (esperado 200)"
  fi
done
echo ""

# 2. .html debe redirigir
echo "2. URLs con .html deben redirigir (301)"
for url in "/index.html" "/dentista-cumbaya.html" "/implantes-cumbaya.html"; do
  status=$(curl -sI "${SITE}${url}" | head -1 | awk '{print $2}')
  if [ "$status" = "301" ]; then
    pass "${url} → 301"
  else
    fail "${url} → ${status} (esperado 301)"
  fi
done
echo ""

# 3. Sitemap actualizado
echo "3. Sitemap"
sitemap_status=$(curl -sI "${SITE}/sitemap.xml" | head -1 | awk '{print $2}')
if [ "$sitemap_status" = "200" ]; then
  pass "sitemap.xml → 200"
  url_count=$(curl -s "${SITE}/sitemap.xml" | grep -c "<url>")
  echo "   URLs en sitemap: $url_count"
  if [ "$url_count" -eq "15" ]; then
    pass "15 URLs (incluye legales)"
  else
    warn "Esperado 15 URLs, encontrado $url_count"
  fi
  echo "   Fechas más recientes:"
  curl -s "${SITE}/sitemap.xml" | grep "lastmod" | sort -u | head -3
else
  fail "sitemap.xml → ${sitemap_status}"
fi
echo ""

# 4. llms.txt existe
echo "4. llms.txt"
llms_status=$(curl -sI "${SITE}/llms.txt" | head -1 | awk '{print $2}')
if [ "$llms_status" = "200" ]; then
  pass "llms.txt → 200"
else
  fail "llms.txt → ${llms_status}"
fi
echo ""

# 5. robots.txt
echo "5. robots.txt"
robots=$(curl -s "${SITE}/robots.txt")
if echo "$robots" | grep -q "Sitemap:"; then
  pass "robots.txt incluye Sitemap"
else
  fail "robots.txt sin referencia a Sitemap"
fi
echo ""

# 6. Verificar que dentista-cumbaya tiene FAQPage schema
echo "6. Schema FAQPage en /dentista-cumbaya"
if curl -s "${SITE}/dentista-cumbaya" | grep -q '"FAQPage"'; then
  pass "FAQPage schema presente"
else
  fail "FAQPage schema NO encontrado"
fi
echo ""

# 7. Verificar hrefs internos NO usan .html
echo "7. Hrefs internos clean (sin .html)"
html_hrefs=$(curl -s "${SITE}/dentista-cumbaya" | grep -oE 'href="[a-z][^"#]*\.html"' | wc -l | tr -d ' ')
if [ "$html_hrefs" = "0" ]; then
  pass "0 hrefs internos con .html"
else
  fail "${html_hrefs} hrefs internos aún tienen .html"
fi
echo ""

echo "=== Verificación completada ==="
