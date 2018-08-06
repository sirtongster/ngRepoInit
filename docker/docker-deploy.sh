#!/bin/bash

if [ $# = 2 ]; then
	sh docker-deploy-local.sh $1
	sh docker-push.sh $1
	git tag $1-BETA.$2 && git push origin $1-BETA.$2

else
	echo "Se debe ingresar el tag de la imagen que desea subir y la version del beta"