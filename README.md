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

## Configuration

Copie `.env.example` en `.env.local` pour le développement. Aucune vraie clé ne doit être versionnée.
