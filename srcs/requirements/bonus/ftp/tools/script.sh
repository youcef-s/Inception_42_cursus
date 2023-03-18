mkdir -p /var/run/vsftpd/empty

adduser ${FTP_USERNAME} --gecos "" --disabled-password

echo "${FTP_USERNAME}:${FTP_PASS}" | chpasswd

/usr/sbin/vsftpd