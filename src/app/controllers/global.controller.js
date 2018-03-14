(function(){
	angular
		.module('app')
		.controller('GlobalController', GlobalController);
	
	GlobalController.$inject = ['cfpLoadingBar', 'getService'];
	
	function GlobalController(cfpLoadingBar, getService){
		let vm = this;
		
		vm.cardInfo = {};

		vm.init = init;
		vm.enviar = enviar;
		
		function init(){
			cfpLoadingBar.start();
			getService.infoDePagoWS();
		}
		
		function enviar(e) {
			e.stopPropagation();
			getService.registroDePagoWS({
				cvc 		: (parseInt(vm.cardInfo.cvc)) 			? vm.cardInfo.cvc 			: "",
				cuotas 		: (parseInt(vm.cardInfo.cuotas))	 	? vm.cardInfo.cuotas 		: "",
				nroTarjeta 	: (parseInt(vm.cardInfo.nroTarjeta)) 	? vm.cardInfo.nroTarjeta 	: "",
				vencimiento : (parseInt(vm.cardInfo.vencimiento)) 	? vm.cardInfo.vencimiento 	: ""
			}, (data) => {
				cfpLoadingBar.complete();
			});
		}
	}
})();