#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd -- "$SCRIPT_DIR/.." && pwd)"
cd "$REPO_ROOT"

chmod +x "$REPO_ROOT/scripts/repo_maintenance.sh"
chmod +x "$REPO_ROOT/scripts/install_hooks.sh"
chmod +x "$REPO_ROOT/.githooks/pre-commit"

git config --local core.hooksPath .githooks

echo "Installed Git hooks for VIRTURA-Collective."
echo "core.hooksPath is now set to .githooks"
echo
echo "Pre-commit will run:"
echo "  ./scripts/repo_maintenance.sh --strict"
