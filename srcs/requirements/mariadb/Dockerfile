FROM debian:10

RUN apt-get -y update && apt-get -y install mariadb-server

COPY ./conf/mariadb.cnf /etc/mysql/mariadb.conf.d/50-server.cnf

COPY ./tools/mariadb.sh /tmp/mariadb.sh

RUN chmod +x /tmp/mariadb.sh

CMD [ "bash", "/tmp/mariadb.sh" ]