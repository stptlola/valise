#!/bin/sh
# Démarrage du conteneur : prépare la base de données, puis lance le site.
set -e
/outils/migrations.sh
exec node server.js
