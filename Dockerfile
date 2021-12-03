FROM library/postgres
COPY ./init.sql /docker-entrypoint-initdb.d/

FROM node:latest

WORKDIR /home/node/

COPY . .

RUN yarn

EXPOSE 3333

CMD ["/home/node/entrypoint.sh"]

