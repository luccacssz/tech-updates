# Etapa 1: build
FROM node:20-alpine AS builder

# Instalar pacotes para dependências nativas (caso tenha)
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Copiar apenas os arquivos essenciais para instalar dependências
COPY package.json yarn.lock ./

# Instalar dependências (inclui devDependencies)
RUN yarn install --frozen-lockfile

# Copiar o restante da aplicação
COPY . .

# Gerar os arquivos de build
RUN yarn build

# Remover cache do Next.js (mais útil que remover /usr/share aqui)
RUN rm -rf .next/cache

# Etapa 2: produção
FROM node:20-alpine AS prod

WORKDIR /app

ENV NODE_ENV=production

# Copiar build e assets
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Copiar apenas o necessário para rodar
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/yarn.lock ./yarn.lock
COPY --from=builder /app/node_modules ./node_modules

# Limpar cache do yarn
RUN yarn cache clean

# (Opcional) Limpeza extra — mesmo Alpine sendo enxuto
RUN rm -rf /usr/share/man /usr/share/doc /var/cache/apk/*

EXPOSE 3000

CMD ["yarn", "start"]
