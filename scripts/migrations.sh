#!/bin/sh
# Prépare la base de données à chaque démarrage du conteneur (lancé par docker-entrypoint.sh) :
#   1. applique les migrations déjà créées ;
#   2. compare la base au schéma Prisma et, s'il y a une différence, crée une migration et l'applique ;
#   3. ajoute les données de départ si la base est vide.
# Les migrations sont gardées dans /outils/prisma/migrations, un volume persistant de Coolify.
# Une migration qui pourrait effacer des données est refusée, sauf si ALLOW_DATA_LOSS=1.
set -eu

cd /outils
prisma() { node node_modules/prisma/build/index.js "$@"; }
dossier=prisma/migrations

if [ -z "${DATABASE_URL:-}" ]; then
  echo "[base] DATABASE_URL absente : la base n'est pas préparée."
  exit 0
fi

mkdir -p "$dossier"
if [ ! -f "$dossier/migration_lock.toml" ]; then
  printf '# Fichier géré par Prisma.\nprovider = "postgresql"\n' > "$dossier/migration_lock.toml"
fi

echo "[base] Application des migrations existantes…"
prisma migrate deploy

echo "[base] Comparaison de la base et du schéma…"
set +e
prisma migrate diff --from-config-datasource --to-schema prisma/schema.prisma --script --exit-code > /tmp/migration.sql
code=$?
set -e

case "$code" in
  0)
    echo "[base] La base est déjà à jour."
    ;;
  2)
    if grep -Eiq 'DROP TABLE|DROP COLUMN|DROP TYPE|ALTER COLUMN [^;]* TYPE|TRUNCATE|DELETE FROM' /tmp/migration.sql \
      && [ "${ALLOW_DATA_LOSS:-0}" != "1" ]; then
      echo "[base] Migration refusée : elle pourrait effacer des données. La voici :"
      cat /tmp/migration.sql
      echo "[base] Si elle est voulue, ajoute ALLOW_DATA_LOSS=1 dans Coolify, redéploie, puis retire la variable."
      exit 1
    fi
    nom="$(date -u +%Y%m%d%H%M%S)_auto"
    mkdir -p "$dossier/$nom"
    mv /tmp/migration.sql "$dossier/$nom/migration.sql"
    echo "[base] Nouvelle migration $nom :"
    cat "$dossier/$nom/migration.sql"
    prisma migrate deploy
    ;;
  *)
    echo "[base] Erreur pendant la comparaison de la base et du schéma."
    exit 1
    ;;
esac

echo "[base] Données de départ…"
node node_modules/tsx/dist/cli.mjs prisma/seed.ts
