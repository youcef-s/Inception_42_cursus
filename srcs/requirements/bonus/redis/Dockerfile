FROM debian:10

RUN apt-get -y update && apt-get -y install redis

COPY ./conf/redis.conf /etc/redis/redis.conf

CMD [ "redis-server", "--protected-mode", "no" ]