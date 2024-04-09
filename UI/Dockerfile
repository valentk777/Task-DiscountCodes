FROM node:16.14.2
ARG GENERATE_SOURCEMAP
ENV GENERATE_SOURCEMAP=${GENERATE_SOURCEMAP:-false}
ARG env
ENV ENVIRONMENT_NAME=$env
ENV DEPLOYMENT_PLATFORM=web
WORKDIR /app

COPY . .

RUN apt-get update && \
  apt-get install --no-install-recommends -y \
  make \
  g++ \
  python

RUN npm install && \
  npm run build && \
  rm -rf /var/lib/apt/lists/*

ENTRYPOINT npm run serve
