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

# 3. Outil de migration, installé à part pour garder l'image finale légère
FROM base AS prisma-cli
WORKDIR /prisma-cli
COPY package.json /tmp/package.json
RUN npm install --no-save --no-audit --no-fund \
  "prisma@$(node -p "require('/tmp/package.json').devDependencies.prisma")"

# 4. Image finale, avec uniquement la sortie autonome de Next.js
FROM base AS runner
ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME=0.0.0.0
COPY --from=prisma-cli --chown=node:node /prisma-cli /prisma-cli
COPY --from=builder --chown=node:node /app/public ./public
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static
COPY --from=builder --chown=node:node /app/prisma ./prisma
COPY --from=builder --chown=node:node /app/prisma7.config.ts ./prisma7.config.ts
COPY --chown=node:node docker-entrypoint.sh ./docker-entrypoint.sh
USER node
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=40s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/api/health').then((r) => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"
CMD ["./docker-entrypoint.sh"]
