FROM node:8.9.3

RUN mkdir -p /data/app
WORKDIR /data/app
COPY dist/ /data/app/dist
COPY node_modules/ /data/app/node_modules

EXPOSE 7777

ENTRYPOINT ["/bin/bash", "-c", "host=$host port=$port node /data/app/dist/server.js"]
