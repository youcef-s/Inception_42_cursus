setup:
	-mkdir -p /home/ylabtaim/data/mariadb
	-mkdir -p /home/ylabtaim/data/wordpress

up: setup
	-docker-compose -f ./srcs/docker-compose.yml up -d

build: setup
	-docker-compose -f ./srcs/docker-compose.yml up --build -d

down:
	-docker-compose -f ./srcs/docker-compose.yml down

clean: down
	-docker volume rm $$(docker volume ls -q)
	-rm -rf /home/ylabtaim/data
	-docker system prune --force

fclean: clean
	-docker rmi -f $$(docker images -q)

re: fclean build