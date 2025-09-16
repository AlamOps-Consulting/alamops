# ---------- base ----------
ARG NODE_VERSION=20-alpine

# ---------- deps ----------
FROM node:${NODE_VERSION} AS deps
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
RUN apk add --no-cache libc6-compat
COPY package*.json ./
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

# ---------- build ----------
FROM node:${NODE_VERSION} AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
RUN apk add --no-cache libc6-compat
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build
RUN npm prune --omit=dev

# ---------- run ----------
FROM node:${NODE_VERSION} AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
RUN apk add --no-cache libc6-compat

# Copiamos SOLO lo necesario para ejecutar
COPY --from=builder /app/package*.json ./
# ¡No copies next.config.ts aquí!
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000
CMD ["npm", "start"]
