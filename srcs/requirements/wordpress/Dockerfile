FROM debian:10

RUN apt-get -y update && apt-get -y install curl php7.3-fpm php-mysql mariadb-client

WORKDIR /var/www/html/wordpress

COPY ./conf/wordpress.conf /etc/php/7.3/fpm/pool.d/www.conf

ADD https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar /usr/local/bin/wp

RUN chmod +x /usr/local/bin/wp

COPY ./tools/wordpress.sh .

RUN chmod +x wordpress.sh

CMD ["bash", "wordpress.sh"]