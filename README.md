# Valise

Des escales clés en main : le site de guides de voyage Valise.

Le périmètre complet est décrit dans le cahier des charges, et le travail est découpé en tickets :

- [Cahier des charges complet](https://claude.ai/code/artifact/c508c5de-ac9a-4bc0-9203-1dd3f1b07509)
- [Découpage en tickets](https://claude.ai/code/artifact/1880d793-397d-42a0-97f0-7f359b20c431)
- [Guide de rédaction](https://claude.ai/code/artifact/fc75ed81-ac94-4551-9e4a-51c83fd5f972)

## Démarrer en local

Il faut Node.js 22 ou plus récent.

```bash
npm install
npm run dev
```

Le site s'ouvre sur http://localhost:3000.

## Commandes

| Commande            | Rôle                                                  |
| ------------------- | ----------------------------------------------------- |
| `npm run dev`       | Lance le site en local, avec rechargement automatique |
| `npm run build`     | Construit la version de production                    |
| `npm run start`     | Sert la version construite                            |
| `npm run lint`      | Vérifie le code avec ESLint                           |
| `npm run typecheck` | Vérifie les types TypeScript                          |
| `npm run format`    | Met le code en forme avec Prettier                    |
| `npm run check`     | Lance les trois vérifications d'un coup               |

## Technologies

- Next.js et React, en TypeScript
- Tailwind CSS pour les styles
- PostgreSQL avec Prisma (ticket T-008)
- Motion pour les animations (ticket T-021)
- Vitest et Playwright pour les tests (ticket T-013)

## Base de données

Le modèle de données est dans `prisma/schema.prisma` (Prisma 7, PostgreSQL). Prisma ne charge pas `.env.local` tout seul : exporte d'abord les variables, par exemple avec `set -a; source .env.local; set +a`.

| Commande             | Rôle                                                                          |
| -------------------- | ----------------------------------------------------------------------------- |
| `npm run db:migrate` | Crée une migration à partir du schéma et l'applique en local                  |
| `npm run db:deploy`  | Applique les migrations existantes                                            |
| `npm run db:seed`    | Ajoute les vingt destinations et la structure des escales de Rome et de Paris |

En production, le conteneur applique les migrations à chaque démarrage, avant de lancer le site.

## Système de design

La page `/design-system` montre les couleurs, les polices, les composants et les autocollants. Elle n'est pas référencée par les moteurs de recherche.

## Configuration

Copie `.env.example` en `.env.local` pour le développement. Aucune vraie clé ne doit être versionnée.

## Déploiement

Le site est déployé par [Coolify](https://coolify.io), derrière son proxy Traefik, sur le serveur de Lola.

1. Chaque push sur `main` lance la CI GitHub Actions : lint, types, mise en forme et construction.
2. Si tout passe, la CI appelle le webhook de déploiement de Coolify.
3. Coolify construit l'image à partir du `Dockerfile` et remplace l'ancienne version, une fois le contrôle de santé `/api/health` au vert.

### Configuration de Coolify, une seule fois

1. Crée une application à partir du dépôt `stptlola/valise`, branche `main`.
2. Choisis le build pack « Dockerfile » et le port 3000.
3. Garde l'adresse sslip.io proposée par Coolify, en HTTPS, tant que le nom de domaine n'est pas acheté.
4. Règle le contrôle de santé sur le chemin `/api/health`.
5. Désactive le déploiement automatique de Coolify, pour que la CI soit seule à le déclencher.
6. Dans « Keys & Tokens », puis « API Tokens », crée un jeton avec la permission de déploiement.
7. Dans la configuration de l'application, section « Webhooks », copie le « Deploy Webhook (auth required) ».
8. Sur GitHub, dans Settings, puis « Secrets and variables » et « Actions », ajoute deux secrets : `COOLIFY_WEBHOOK` (le webhook) et `COOLIFY_TOKEN` (le jeton).

Si l'API de Coolify est désactivée, active-la dans « Settings », puis « Advanced ».
