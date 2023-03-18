FROM debian:10

RUN apt-get -y update && apt-get -y install vsftpd

COPY ./tools/script.sh /

COPY ./conf/vsftpd.conf /etc/vsftpd.conf

CMD [ "bash", "/script.sh"]
