#!/bin/bash
## Script para levantar una imagen e instanciar un container de una version determinada en el Docker local

if [ $# = 1 ] ; then

# Elimino si los hay la imagen y los containers que quiero reemplazar

	docker stop wondersoft
	docker rm wondersoft

	if [ ! -z $(docker images -q sr-docker-xp01.corp.cablevision.com.ar:5000/wondersoft:$1) ]; then

		docker rmi sr-docker-xp01.corp.cablevision.com.ar:5000/wondersoft:$1

	fi

	if [ ! -z $(docker images -q sr-docker-xp01.corp.cablevision.com.ar:5000/wondersoft:latest) ]; then

		docker rmi sr-docker-xp01.corp.cablevision.com.ar:5000/wondersoft:latest

	fi

	cp -R ../dist . 
	cp -R ../node_modules .

# Creo la nueva imagen

	docker build -t sr-docker-xp01.corp.cablevision.com.ar:5000/wondersoft:$1 -t sr-docker-xp01.corp.cablevision.com.ar:5000/wondersoft:latest .

#	docker build -t sr-docker-xp01.corp.cablevision.com.ar:5000/wondersoft:$1 -t sr-docker-xp01.corp.cablevision.com.ar:5000/wondersoft:latest --build-arg HTTP_PROXY=http://mciarla:camacho1@192.168.184.151:80 --build-arg HTTPS_PROXY=http://mciarla:camacho6@192.168.184.151:80 .

# Instancio el container
	docker run -d -p 9229:6666 --name wondersoft -v /usr/src/app -w /usr/src/app sr-docker-xp01.corp.cablevision.com.ar:5000/wondersoft:$1

	rm -R dist
	
	rm -R node_modules

else
	echo "Se debe ingresar el tag de la imagen que desea deployar."
fi


