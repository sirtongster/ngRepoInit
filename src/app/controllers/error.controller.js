(function(){

	angular
		.module('app')
		.controller('ErrorController', ErrorController);

	ErrorController.$inject = [];

	function ErrorController(){
		const vm = this;
		
		// Public Variables
		vm.data = {};
		// Public Functions
		vm.init = init;

		function init(){
			// cambio de estado
		}
	}
})();
