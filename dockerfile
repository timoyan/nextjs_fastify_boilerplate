FROM node:14.4.0-alpine
WORKDIR /app

RUN apk add --no-cache curl

COPY ./app-dist ./app-dist
COPY ./server-dist ./server-dist
COPY ./node_modules ./node_modules
COPY ./src/packages/app/public ./public

ENV TZ=America/Los_Angeles
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

EXPOSE 80
ENTRYPOINT node --max-http-header-size 80000 ./server-dist/index.js