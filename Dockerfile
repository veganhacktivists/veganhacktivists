ARG NODE_VERSION=16.15-alpine

ARG PORT=80

ARG CF_SPACE_ID
ARG CF_DELIVERY_ACCESS_TOKEN
ARG CF_PREVIEW_ACCESS_TOKEN
ARG CF_ENVIRONMENT
ARG PATREON_ACCESS_TOKEN
ARG PATREON_CAMPAIGN_ID
ARG MAILCHIMP_AUDIENCE_ID
ARG GOOGLE_TAG_MANAGER_CONTAINER_ID
ARG NEXTAUTH_SECRET
ARG EMAIL_SERVER_URL
ARG DATABASE_URL

# Install dependencies only when needed
FROM node:${NODE_VERSION} AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
# RUN apk add --no-cache libc6-compat

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --ignore-optional --ignore-scripts

# Rebuild the source code only when needed
FROM node:${NODE_VERSION} AS builder

ENV NEXT_TELEMETRY_DISABLED 1
ENV NEXT_PUBLIC_GOOGLE_TAG_MANAGER_CONTAINER_ID=$GOOGLE_TAG_MANAGER_CONTAINER_ID

ARG CF_SPACE_ID
ARG CF_DELIVERY_ACCESS_TOKEN
ARG CF_PREVIEW_ACCESS_TOKEN
ARG CF_ENVIRONMENT
ARG PATREON_ACCESS_TOKEN
ARG PATREON_CAMPAIGN_ID
ARG GOOGLE_TAG_MANAGER_CONTAINER_ID
ARG DATABASE_URL

WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN yarn prisma generate
RUN yarn prisma migrate deploy
RUN yarn build

# Production image, copy all the files and run next
FROM node:${NODE_VERSION} AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN apk add --no-cache tini

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

ARG CF_SPACE_ID
ARG CF_DELIVERY_ACCESS_TOKEN
ARG CF_PREVIEW_ACCESS_TOKEN
ARG CF_ENVIRONMENT
ARG PATREON_ACCESS_TOKEN
ARG PATREON_CAMPAIGN_ID
ARG MAILCHIMP_AUDIENCE_ID
ARG GOOGLE_TAG_MANAGER_CONTAINER_ID
ARG NEXTAUTH_SECRET
ARG EMAIL_SERVER_URL
ARG DATABASE_URL

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

ENV PORT=${PORT}
EXPOSE ${PORT}

ENTRYPOINT ["tini", "--"]
CMD ["node", "server.js"]
