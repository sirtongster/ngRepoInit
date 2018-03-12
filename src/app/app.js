(function() {
	angular
		.module('app', [
			'ngRoute',
			'ngSanitize',
			'angular-loading-bar'
		])
		.config(RouteProvider)
		.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
			cfpLoadingBarProvider.includeSpinner 	= true;
			cfpLoadingBarProvider.includeBar 		= true;
			// cfpLoadingBarProvider.spinnerTemplate = '<div><span class="fa fa-spinner">Loading...</div>';
		}]);

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
