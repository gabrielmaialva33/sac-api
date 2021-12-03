FROM library/postgres
COPY ./init.sql /docker-entrypoint-initdb.d/

FROM node:latest

WORKDIR /home/node/

COPY package*.json ./

RUN yarn add typeorm --global

RUN yarn

COPY . .

EXPOSE 3333

CMD ["/home/node/entrypoint.sh"]

