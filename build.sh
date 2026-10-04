#!/bin/sh
set -eu
cd "$(dirname "$0")"
npm ci --omit=optional --legacy-peer-deps
npm run build-client
