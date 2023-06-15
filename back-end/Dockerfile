FROM node:18-alpine AS builder
WORKDIR /app
COPY --chown=node:node package*.json ./
RUN npm ci
COPY --chown=node:node . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV="production"
COPY --chown=node:node package*.json ./
RUN npm install --production
COPY --chown=node:node --from=builder /app/dist .
COPY --chown=node:node .env .env
USER node
CMD ["node", "main"]