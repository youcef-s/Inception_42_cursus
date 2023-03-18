FROM debian:10

RUN apt-get -y update && apt-get -y install nginx

COPY ./conf/nginx.conf /etc/nginx/sites-available/default

COPY ./tools/* /var/www/

CMD [ "nginx", "-g", "daemon off;" ]