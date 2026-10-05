#!/bin/sh
# Démarrage du conteneur : applique les migrations de la base, puis lance le site.
set -e

if [ -n "$DATABASE_URL" ] && [ -d prisma/migrations ]; then
  echo "Application des migrations de la base de données…"
  node /prisma-cli/node_modules/prisma/build/index.js migrate deploy
else
  echo "Aucune migration appliquée (DATABASE_URL absente ou aucune migration)."
fi

exec node server.js
