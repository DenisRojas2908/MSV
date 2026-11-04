#!/usr/bin/env bash
# SessionStart: en la nube, instala dependencias si faltan o si cambió package-lock.json.
set -euo pipefail
[ "${CLAUDE_CODE_REMOTE:-}" = "true" ] || exit 0
cd "${CLAUDE_PROJECT_DIR:-$(pwd)}"
[ -f package.json ] || exit 0
marca="node_modules/.lock-hash"
actual=""
[ -f package-lock.json ] && actual="$(sha256sum package-lock.json | cut -d' ' -f1)"
if [ ! -d node_modules ] || [ ! -f "$marca" ] || [ "$(cat "$marca")" != "$actual" ]; then
  echo "Instalando dependencias (npm install)..."
  PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 npm install --no-audit --no-fund >/dev/null 2>&1 || { echo "npm install falló"; exit 0; }
  echo "$actual" > "$marca"
fi
exit 0
