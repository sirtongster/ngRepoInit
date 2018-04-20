var src = "src";
var srv = "dist";

module.exports = {
	clean: {
		name: 'clean',
		src: [
			srv
		]
	},
	sass: {
		name: 'sass',
		src: [
			src + '/assets/css/main.scss',
			'bower_components/animate.css/animate.min.css',
			'bower_components/angular-loading-bar/build/loading-bar.min.css',
			src + '/assets/css/ie/ie.css',
			src + '/assets/css/ie/ie8.css',
			src + '/assets/css/ie/ie9.css'
		],
		outputName: 'main.css',
		dest: srv + '/public/assets/stylesheets'
	},
	fonts: {
		name: 'move-fonts',
		src:[
			src + '/assets/fonts/**/*',
			'bower_components/bootstrap-sass/assets/fonts/**/*'
		],
		dest: srv + '/public/assets/fonts'
	},
	fontawesome: {
		name: 'fontsawesome',
		src:[
			'bower_components/font-awesome/fonts/**/*',
		],
		dest: srv + '/public/assets/fonts/'
	},
	assets: {
		name: 'move-assets',
		src: [
			src + '/assets/**/*',
			'!' + src + '/assets/{css,css/**}',
			'!' + src + '/assets/{fonts,fonts/**}',
			'!' + src + '/assets/{js,js/**}'
		],
		dest: srv + '/public/assets'
	},
	vendors: {
		name: 'vendors-js',
		src: [
			src + '/assets/js/html5shiv.js',
			'bower_components/jquery/dist/jquery.min.js',
			'bower_components/angular/angular.min.js',
			'bower_components/angular-route/angular-route.min.js',
			'bower_components/angular-sanitize/angular-sanitize.min.js',
			'bower_components/angular-loading-bar/build/loading-bar.min.js',
			'bower_components/bootstrap/dist/js/bootstrap.min.js'
		],
		outputName: 'vendors.min.js',
		dest: srv + '/public/assets/javascripts'
	},
	appjs: {
		name: 'app-js',
		src: [
			src + '/app/**/*.js'
		],
		outputName: 'app.min.js',
		dest: srv + '/public/assets/javascripts'
	},
	nodejs: {
		name: 'node-js',
		src: [
			'server/**/*.js',
			'!server/server.js'
		],
		outputName: '',
		dest: srv + '/server'
	},
	server: {
		name: 'server',
		src: [
			'server/server.js'
		],
		dest: srv
	},
	inject:  {
		name: 'inject',
		target: src + '/index.html',
		src: [
			srv + '/public/assets/stylesheets/main.css',
			srv + '/public/assets/stylesheets/animate.min.css',
			srv + '/public/assets/stylesheets/loading-bar.min.css',
			srv + '/public/assets/javascripts/vendors.min.js',
			srv + '/public/assets/javascripts/app.min.js'
		],
		read: {read: false},
		dest: srv + '/public'
	},
	html: {
		name: 'minify-html',
		src: [
			src + '/**/*.html'
		],
		dest: srv + '/public'
	}
};