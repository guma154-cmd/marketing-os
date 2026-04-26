FROM node:18-slim AS base

# Instalar dependências para o better-sqlite3
RUN apt-get update && apt-get install -y python3 make g++ sqlite3 && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Variáveis de build (Next.js precisa de algumas no build time)
ENV NEXT_TELEMETRY_DISABLED=1
ENV DATABASE_URL=/app/data/marketing-os.db

RUN npm run build

# Produção
FROM node:18-slim AS runner
WORKDIR /app

RUN apt-get update && apt-get install -y sqlite3 && rm -rf /var/lib/apt/lists/*

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV DATABASE_URL=/app/data/marketing-os.db

# Criar pasta para o banco de dados persistente
RUN mkdir -p /app/data

COPY --from=base /app/next.config.mjs ./
COPY --from=base /app/public ./public
COPY --from=base /app/.next ./.next
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package.json ./package.json
COPY --from=base /app/scripts ./scripts

EXPOSE 3000

# Script para rodar seed se o banco estiver vazio e iniciar o app
CMD ["sh", "-c", "npm run db:seed && npm start"]
