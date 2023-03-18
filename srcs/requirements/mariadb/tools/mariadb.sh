service mysql start

if mysql -u${ROOT_USERNAME} -p${ROOT_PASS} --skip-column-names -e "SHOW DATABASES" | grep -q ${DATABASE_NAME}; then
    echo "----------Database ${DATABASE_NAME} already exists!----------"
else
    mysql -e "SET PASSWORD FOR '${ROOT_USERNAME}'@'localhost' = PASSWORD('${ROOT_PASS}');"
    mysql -u${ROOT_USERNAME} -p${ROOT_PASS} -e "CREATE DATABASE ${DATABASE_NAME};\
    CREATE USER IF NOT EXISTS '${USER_NAME}'@'%' IDENTIFIED BY '${USER_PASS}';\
    GRANT ALL PRIVILEGES ON ${DATABASE_NAME}.* TO '${USER_NAME}'@'%'; FLUSH PRIVILEGES;"
    echo "----------Database ${DATABASE_NAME} created successfully!----------"
	mysqladmin -u${ROOT_USERNAME} -p${ROOT_PASS} shutdown
fi

mysqld_safe