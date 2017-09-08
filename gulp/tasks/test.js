/*
 **
 */

'use strict';

var gulp = require('gulp'),
    rename = require('gulp-rename');

var config = require('../config');

gulp.task('test', [
    config.sass.name,
    config.vendors.name,
    config.appjs.name,
    config.fonts.name,
    config.assets.name,
    config.inject.name
]);