FROM node:14.2.0-alpine3.10

WORKDIR /usr/src/express-server-typescript

COPY package*.json ./

RUN npm install

COPY /build ./build/

COPY /.env ./

EXPOSE 8080

ENTRYPOINT ["npm", "start"]