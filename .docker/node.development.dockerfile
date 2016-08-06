FROM node:latest

MAINTAINER Marcus Carlsson

ENV CONTAINER_PATH /var/www/tineit

WORKDIR   $CONTAINER_PATH

RUN npm install supervisor -g 

EXPOSE 3000


ENTRYPOINT ["supervisor", "./bin/www"]