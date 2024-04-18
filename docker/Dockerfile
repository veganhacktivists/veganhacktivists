FROM node:node:20.9.0-alpine3.18 AS base
ENV NEXT_TELEMETRY_DISABLED=1
ARG PNPM_VERSION=8.6.0
ARG CI=1


FROM base AS deps
WORKDIR /app

COPY package.json pnpm-lock.yaml* ./
RUN corepack enable pnpm && pnpm i --frozen-lockfile


FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

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

RUN corepack enable pnpm && pnpm run build

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

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

ENTRYPOINT ["tini", "--"]
CMD ["node", "server.js"]
