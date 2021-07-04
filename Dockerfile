FROM node:alpine

ENV PORT 80

# Create app directory
RUN mkdir -p /usr/app
WORKDIR /usr/app

# Installing dependencies
COPY package.json yarn.lock ./
RUN ["yarn", "install"]

RUN ["yarn", "next", "telemetry", "disable"]

# Copying source files
COPY . ./
RUN ["yarn", "build"]

# Running the app
CMD ["yarn", "start"]
