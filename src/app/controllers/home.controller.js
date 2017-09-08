(function(){

	angular
		.module('app')
		.controller('HomeController', HomeController);

	HomeController.$inject = ['getService'];

	function HomeController(getService){
		const vm = this;
		
		// Public Variables
		vm.data = {};
		// Public Functions
		vm.init = init;

		function init(){
			
		}
	}
})();
