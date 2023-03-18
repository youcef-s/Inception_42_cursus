FROM debian:10

RUN apt-get -y update && apt-get -y install nginx

COPY ./tools/certificate.crt /etc/nginx/ssl/

COPY ./tools/privatekey.key /etc/nginx/ssl/

COPY ./conf/default /etc/nginx/sites-available/default

CMD ["nginx", "-g", "daemon off;"]
