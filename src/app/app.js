(function() {
	angular
		.module('app', [
			'ngRoute',
			'ngSanitize'
		])
		.config(RouteProvider);

	RouteProvider.$inject = ['$routeProvider', '$locationProvider'];

	function RouteProvider($routeProvider, $locationProvider){
		$routeProvider
			.when('/', {
				controller: 'HomeController',
				controllerAs: 'home',
				templateUrl: 'templates/home.html'
			})
			// Other
			.when('/other', {
				controller: 'OtherController',
				controllerAs: 'other',
				templateUrl: 'templates/other.html'
			})
			.otherwise({
				redirectTo: '/'
			});

        $locationProvider.html5Mode(true);
	}
})();
