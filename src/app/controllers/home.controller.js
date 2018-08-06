(function(){

	angular
		.module('app')
		.controller('HomeController', HomeController);

	HomeController.$inject = ['OSBService'];

	function HomeController(OSBService){
		const vm = this;
		
		// Public Variables
		vm.data = {};
		// Public Functions
		vm.init = init;

		function init(){
			


		}
	}
})();
