FROM debian:10

RUN apt-get -y update && apt-get -y install php7.3 php-mysql

ADD http://www.adminer.org/latest.php /

CMD [ "php7.3", "-S", "0.0.0.0:8080", "latest.php" ]