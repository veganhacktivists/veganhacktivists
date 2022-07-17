ARG NODE_VERSION=16.15-alpine

FROM node:${NODE_VERSION} AS base
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
ARG PNPM_VERSION=7.5.1

RUN npm install --location=global pnpm@${PNPM_VERSION}
RUN pnpm config set store-dir ./.pnpm-store

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
# RUN apk add --no-cache libc6-compat

COPY pnpm-lock.yaml ./
RUN pnpm fetch

# Rebuild the source code only when needed
FROM base AS builder
ENV CI=1

COPY package.json pnpm-lock.yaml ./
COPY --from=deps /app/.pnpm-store ./.pnpm-store
RUN pnpm install --offline --no-optional

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

ARG PORT=80
ENV NODE_ENV=production

ENV PORT=${PORT}
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
