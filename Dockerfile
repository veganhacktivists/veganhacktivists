FROM node:alpine

ENV PORT 3000

# Create app directory
RUN mkdir /app
WORKDIR /app

# Installing dependencies
COPY package.json yarn.lock ./
RUN yarn install

RUN npx next telemetry disable

# Copying source files
COPY . ./

# Running the app
CMD ["yarn", "dev"]
