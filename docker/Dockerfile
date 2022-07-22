ARG NODE_VERSION=16.16.0

FROM node:${NODE_VERSION}-alpine AS base
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
ARG PNPM_VERSION=7.5.1

RUN npm install --location=global pnpm@${PNPM_VERSION}
RUN pnpm config set store-dir ./.pnpm-store

# Install dependencies only when needed
FROM base AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
# RUN apk add --no-cache libc6-compat
ENV CI=1

COPY pnpm-lock.yaml ./
RUN pnpm fetch

COPY package.json ./
RUN pnpm install --offline --no-optional --no-verify-store-integrity

COPY . .

ARG DATABASE_URL
RUN pnpm prisma generate
RUN pnpm prisma migrate deploy

ARG CF_SPACE_ID
ARG CF_DELIVERY_ACCESS_TOKEN
ARG CF_PREVIEW_ACCESS_TOKEN
ARG CF_ENVIRONMENT
ARG PATREON_ACCESS_TOKEN
ARG PATREON_CAMPAIGN_ID
ARG GOOGLE_TAG_MANAGER_CONTAINER_ID
ENV NEXT_PUBLIC_GOOGLE_TAG_MANAGER_CONTAINER_ID=${GOOGLE_TAG_MANAGER_CONTAINER_ID}
RUN pnpm build

# Production image, copy all the files and run next
FROM base AS runner
RUN apk add --no-cache tini

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
ENV NODE_ENV=production

EXPOSE ${PORT}

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

ENTRYPOINT ["tini", "--"]
CMD ["node", "server.js"]
