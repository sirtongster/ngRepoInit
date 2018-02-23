(function(){
	angular
		.module('app')
		.controller('GlobalController', GlobalController);
	
	GlobalController.$inject = ['getService'];
	
	function GlobalController(getService){
		let vm = this;
		
		vm.init = init;
		vm.enviar = enviar;
		
		function init(){
		
		}
		
		function enviar() {
			getService.registroDePagoWS();
		}
	}
})();