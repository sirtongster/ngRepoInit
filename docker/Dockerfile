FROM node:8.9.3

RUN mkdir -p /data/app
WORKDIR /data/app
COPY dist/ /data/app/dist
COPY node_modules/ /data/app/node_modules

EXPOSE 7777

CMD node dist/server.js
