(function(){
	angular
		.module('app')
		.controller('GlobalController', GlobalController);
	
	GlobalController.$inject = ['cfpLoadingBar'];
	
	function GlobalController(cfpLoadingBar){
		let vm = this;

		vm.init = init;
		
		function init(){
			cfpLoadingBar.start();
		}
	}
})();