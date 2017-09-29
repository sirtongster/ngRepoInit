#!/bin/bash
## Script para levantar una imagen e instanciar un container de una version determinada en el Docker local

if [ $# = 1 ] ; then

# Elimino si los hay la imagen y los containers que quiero reemplazar

	docker stop cv-catalogo
	docker rm cv-catalogo

	if [ ! -z $(docker images -q sr-docker-xp01.corp.cablevision.com.ar:5000/cv-catalogo:$1) ]; then

		docker rmi sr-docker-xp01.corp.cablevision.com.ar:5000/cv-catalogo:$1

	fi

	if [ ! -z $(docker images -q sr-docker-xp01.corp.cablevision.com.ar:5000/cv-catalogo:latest) ]; then

		docker rmi sr-docker-xp01.corp.cablevision.com.ar:5000/cv-catalogo:latest

	fi

	cp -R ../dist . 
	cp -R ../node_modules .

# Creo la nueva imagen

	docker build -t sr-docker-xp01.corp.cablevision.com.ar:5000/cv-catalogo:$1 -t sr-docker-xp01.corp.cablevision.com.ar:5000/cv-catalogo:latest .

#	docker build -t sr-docker-xp01.corp.cablevision.com.ar:5000/cv-catalogo:$1 -t sr-docker-xp01.corp.cablevision.com.ar:5000/cv-catalogo:latest --build-arg HTTP_PROXY=http://mciarla:camacho1@192.168.184.151:80 --build-arg HTTPS_PROXY=http://mciarla:camacho6@192.168.184.151:80 .

# Instancio el container
	docker run -d -p 9119:8888 --name cv-catalogo -v /usr/src/app -w /usr/src/app sr-docker-xp01.corp.cablevision.com.ar:5000/cv-catalogo:$1

	rm -R dist
	
	rm -R node_modules

else
	echo "Se debe ingresar el tag de la imagen que desea deployar."
fi


