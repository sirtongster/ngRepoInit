/*
** 	Este archivo contiene las tareas necesarias para compilar los archivos
** 	sin comprimirlos ni aplicarles uglify, con el fin de poder debuggearlos
**	correctamente. 
**	-----------------------------------------------------------------------
**	Adicionar '-dev' al nombre de la tarea productiva,
**	Ej: 'sass'		(productiva)
**		'sass-dev'	(desarrollo)
*/

/*
 ** 	Mueve el archivo de configuración dependiendo de la manera que se llame la
 **     tarea env-config
 **	-----------------------------------------------------------------------
 **	Usos:  env-config[-ambiente]
 **	Ej: 'env-config-dev' (desarrollo)
 **		'env-config-test' (testing)
 **		'env-config-homo' (homologación)
 **		'env-config-prod' (producción)
 */

'use strict';

var gulp = require('gulp'),
	sass = require('gulp-sass'),
	concat = require('gulp-concat'),
	plumber = require('gulp-plumber'),
	rename = require('gulp-rename'),
	sourcemaps = require('gulp-sourcemaps'),
	babel = require('gulp-babel');

var config = require('../config');

gulp.task( config.sass.name + '-dev', function () {
 	return gulp.src( config.sass.src )
	.pipe( plumber() )
	.pipe( sourcemaps.init())
	.pipe( sass( { outputStyle: 'expanded'} ).on('error', sass.logError))
	.pipe( sourcemaps.write('maps'))
	.pipe( gulp.dest( config.sass.dest ));
});

gulp.task( config.appjs.name + '-dev', function(){
  
  	return gulp.src( config.appjs.src )
	.pipe( plumber() )
	.pipe( sourcemaps.init())
	.pipe( babel() )
	.pipe( concat( config.appjs.outputName ))
	.pipe( sourcemaps.write("."))
	.pipe( gulp.dest( config.appjs.dest ));
	
});

gulp.task( config.vendors.name + '-dev', function(){
  
  	return gulp.src( config.vendors.src )
		.pipe( plumber() )
		.pipe( concat( config.vendors.outputName ))
		.pipe( gulp.dest( config.vendors.dest ));
	
});

gulp.task('dev', [
	config.sass.name + '-dev',
	config.vendors.name + '-dev',
	config.appjs.name + '-dev',
	config.fonts.name,
	config.assets.name,
	config.inject.name
]);