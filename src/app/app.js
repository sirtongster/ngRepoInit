(function() {
	angular
		.module('app', [
			'ngRoute',
			'ngSanitize',
			'angular-loading-bar'
		])
		.config(RouteProvider)
		.config(LoadingProvider);

	LoadingProvider.$inject = ['cfpLoadingBarProvider'];
	RouteProvider.$inject = ['$routeProvider', '$locationProvider'];

	function LoadingProvider(cfpLoadingBarProvider){
		cfpLoadingBarProvider.includeSpinner 	= true;
		cfpLoadingBarProvider.includeBar 		= true;
		// cfpLoadingBarProvider.spinnerTemplate = '<div><span class="fa fa-spinner">Loading...</div>';
	}
	function RouteProvider($routeProvider, $locationProvider){
		$routeProvider
			.when('/', {
				controller: 'HomeController',
				controllerAs: 'home',
				templateUrl: 'templates/home.html'
			})
			// Other
			.otherwise({
				redirectTo: '/'
			});

        $locationProvider.html5Mode(true);
	}
})();
