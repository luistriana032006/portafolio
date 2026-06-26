#!/usr/bin/env bash
set -e

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$PROJECT_DIR"

echo "==> Instalando dependencias..."
pnpm install

echo "==> Iniciando servidor de desarrollo..."
pnpm dev
