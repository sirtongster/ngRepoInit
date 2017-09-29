#!/bin/bash
## Script para subir una imagen al Docker Hub interno

if [ $# = 3 ] ; then

	docker login sr-docker-xp01.corp.cablevision.com.ar:5000 -u $2 -p $3

	if [ ! -z $(docker images -q sr-docker-xp01.corp.cablevision.com.ar:5000/cv-catalogo:$1) ]; then

		docker push sr-docker-xp01.corp.cablevision.com.ar:5000/cv-catalogo:$1
		docker push sr-docker-xp01.corp.cablevision.com.ar:5000/cv-catalogo:latest

	else 
		
		echo "No existe una imagen local con el tag asignado"
	
	fi

else
	echo "Se debe ingresar el tag de la imagen que desea subir, el usuario y el password"
fi


