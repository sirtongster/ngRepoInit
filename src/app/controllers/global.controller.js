(function(){
	angular
		.module('app')
		.controller('GlobalController', GlobalController);
	
	// GlobalController.$inject = [];
	
	function GlobalController(){
		let vm = this;
		
		vm.init = init;
		
		function init(){
			
		}
	}
})();