(function(){

	angular
		.module('app')
		.controller('SuccessController', SuccessController);

	SuccessController.$inject = ['OSBService'];

	function SuccessController(OSBService){
		const vm = this;
		
		// Public Variables
		vm.data = {};
		// Public Functions
		vm.init = init;

		function init(){
			OSBService.status('success');
		}
	}
})();
