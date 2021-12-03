FROM library/postgres
COPY ./init.sql /docker-entrypoint-initdb.d/

FROM node:latest

WORKDIR /home/node/

COPY package*.json ./

RUN yarn

COPY . .

EXPOSE 3333

CMD ["yarn", "dev"]
