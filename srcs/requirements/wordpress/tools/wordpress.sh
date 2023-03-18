wp --allow-root core download --path=/var/www/html/wordpress
sleep 5; 
chown -R www-data:www-data /var/www/html/wordpress/
wp config create --dbname=${DATABASE_NAME} \
				 --dbuser=${USER_NAME} \
				 --dbpass=${USER_PASS} \
				 --dbhost=mariadb \
				 --path=/var/www/html/wordpress \
				 --allow-root

wp core install --path=/var/www/html/wordpress \
				--url=${URL} --title=${TITLE} \
				--admin_user=${ADMIN_USER} \
				--admin_password=${ADMIN_PASSWORD} \
				--admin_email=${ADMIN_EMAIL} \
				--skip-email --allow-root
sleep 3;
wp user create ${WP_USER} ${WP_EMAIL} \
				--user_pass=${WP_PASS} \
				--path=/var/www/html/wordpress \
				--allow-root
wp plugin install redis-cache --activate --allow-root
wp plugin update --all --allow-root
wp redis enable --allow-root

wp config set WP_REDIS_HOST redis --allow-root --path='/var/www/html/wordpress'
wp config set WP_REDIS_PORT 6379 --allow-root --path='/var/www/html/wordpress'
wp config set WP_CACHE true --allow-root --path='/var/www/html/wordpress'

mkdir -p /run/php
/usr/sbin/php-fpm7.3 -F