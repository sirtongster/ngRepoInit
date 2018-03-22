(function(){

	angular
		.module('app')
		.controller('SuccessController', SuccessController);

	SuccessController.$inject = [''];

	function SuccessController(){
		const vm = this;
		
		// Public Variables
		vm.data = {};
		// Public Functions
		vm.init = init;

		function init(){
			
		}
	}
})();
