#!/bin/bash

set -e
cd $(dirname $0)

docker build -t veganhacktivists \
    --build-arg CACHE_BUSTER=$(date +%s) \
    --build-arg CF_DELIVERY_ACCESS_TOKEN=$CF_DELIVERY_ACCESS_TOKEN \
    --build-arg CF_ENVIRONMENT=$CF_ENVIRONMENT \
    --build-arg CF_PREVIEW_ACCESS_TOKEN=$CF_PREVIEW_ACCESS_TOKEN \
    --build-arg CF_SPACE_ID=$CF_SPACE_ID \
    --build-arg DATABASE_URL=$DATABASE_URL \
    --build-arg EMAIL_SERVER_URL=$EMAIL_SERVER_URL \
    --build-arg GOOGLE_TAG_MANAGER_CONTAINER_ID=$GOOGLE_TAG_MANAGER_CONTAINER_ID \
    --build-arg MAILCHIMP_AUDIENCE_ID=$MAILCHIMP_AUDIENCE_ID \
    --build-arg NEXTAUTH_SECRET=$NEXTAUTH_SECRET \
    --build-arg NODE_VERSION=$(cat ../.nvmrc | tr -cd "[:digit:].") \
    --build-arg PATREON_ACCESS_TOKEN=$PATREON_ACCESS_TOKEN \
    --build-arg PATREON_CAMPAIGN_ID=$PATREON_CAMPAIGN_ID \
    --build-arg PORT=3000 \
    --network="host" \
    -f ./Dockerfile \
    "$@" \
.. \
&& \
docker run --rm -p 3000:3000 --network host --env-file ../.env --name=veganhacktivists veganhacktivists
