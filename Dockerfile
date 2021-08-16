FROM node:alpine

ENV PORT 80
EXPOSE 80

# Create app directory
RUN mkdir -p /usr/app
WORKDIR /usr/app

# Installing dependencies
COPY package.json yarn.lock ./
RUN ["yarn", "install", "--production", "--frozen-lockfile"]

# Copying source files
COPY . ./

ARG CF_SPACE_ID
ARG CF_DELIVERY_ACCESS_TOKEN
ARG CF_PREVIEW_ACCESS_TOKEN
ARG CF_ENVIRONMENT

RUN ["yarn", "build"]
# Running the app
CMD ["yarn", "start"]
