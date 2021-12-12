FROM library/postgres
COPY ./init.sql /docker-entrypoint-initdb.d/

FROM node:latest
WORKDIR /home/app/

COPY package*.json ./

RUN yarn install

COPY . .

COPY ormconfig.docker.json ./ormconfig.json

EXPOSE 3333

CMD ["/home/app/entrypoint.sh"]

