(function(){

	angular
		.module('app')
		.controller('ErrorController', ErrorController);

	ErrorController.$inject = ['OSBService'];

	function ErrorController(OSBService){
		const vm = this;
		
		// Public Variables
		vm.data = {};
		// Public Functions
		vm.init = init;

		function init(){
			OSBService.cambioDeEstado('error');
		}
	}
})();
