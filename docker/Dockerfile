FROM node:4.6.2

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY dist/ /usr/src/app/dist
COPY node_modules/ /usr/src/app/node_modules

EXPOSE 7777

CMD node dist/server.js
