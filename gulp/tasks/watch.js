'use strict';

var gulp = require('gulp');
var config = require('../config');

gulp.task('watch', function(){
	gulp.watch('src/assets/css/**/*.scss', [config.sass.name]);
	gulp.watch('src/app/**/*.js', [config.appjs.name]);
	gulp.watch('server/**/*.js', [config.server.name]);
	gulp.watch('src/assets/fonts/**/*', [config.fonts.name]);
	gulp.watch([
		'src/assets/img/**/*',
		'src/assets/json/**/*',
		'src/assets/video/**/*',
		'src/.robots.txt'
	],
	[config.assets.name]);
	gulp.watch('src/**/*.html', [config.inject.name] );
});