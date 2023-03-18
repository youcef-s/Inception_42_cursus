FROM debian:10

WORKDIR /app/

RUN apt-get -y update && apt-get -y install curl

RUN curl https://deb.nodesource.com/setup_16.x | /bin/bash

RUN apt-get -y install nodejs

RUN npm install express

COPY ./tools/* /app/

CMD [ "node", "server.js"]