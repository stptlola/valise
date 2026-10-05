# Image de production du site Valise, construite par Coolify.

FROM node:22-bookworm-slim AS base
ENV NEXT_TELEMETRY_DISABLED=1
# OpenSSL est nécessaire au moteur de migration de Prisma.
RUN apt-get update -qq && apt-get install -y -qq --no-install-recommends openssl ca-certificates \
  && rm -rf /var/lib/apt/lists/*
WORKDIR /app

# 1. Dépendances
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

# 2. Construction du site (génère aussi le client Prisma)
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# 3. Outils de base de données (Prisma et tsx), installés à part pour garder l'image du site légère
FROM base AS outils
WORKDIR /outils
COPY package.json /tmp/package.json
RUN version() { node -p "const p = require('/tmp/package.json'); (p.dependencies || {})['$1'] || (p.devDependencies || {})['$1']"; } \
  && npm install --no-save --no-audit --no-fund \
    "prisma@$(version prisma)" \
    "@prisma/client@$(version @prisma/client)" \
    "@prisma/adapter-pg@$(version @prisma/adapter-pg)" \
    "pg@$(version pg)" \
    "tsx@$(version tsx)" \
  && node node_modules/prisma/build/index.js --version

# 4. Image finale, avec uniquement la sortie autonome de Next.js
FROM base AS runner
ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME=0.0.0.0
COPY --from=outils /outils /outils
COPY --from=builder /app/prisma /outils/prisma
COPY --from=builder /app/prisma7.config.ts /outils/prisma7.config.ts
COPY --from=builder /app/src/generated /outils/src/generated
COPY --from=builder /app/src/content /outils/src/content
COPY scripts/migrations.sh /outils/migrations.sh
# Le dossier des migrations accueille le volume persistant de Coolify.
RUN mkdir -p /outils/prisma/migrations && chown -R node:node /outils/prisma
COPY --from=builder --chown=node:node /app/public ./public
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static
COPY --chown=node:node docker-entrypoint.sh ./docker-entrypoint.sh
USER node
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=60s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/api/health').then((r) => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"
CMD ["./docker-entrypoint.sh"]
