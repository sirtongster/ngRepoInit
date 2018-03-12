(function(){
	angular
		.module('app')
		.controller('GlobalController', GlobalController);
	
	GlobalController.$inject = ['getService'];
	
	function GlobalController(getService){
		let vm = this;
		
		vm.cardInfo = {};

		vm.init = init;
		vm.enviar = enviar;
		
		function init(){
			getService.getPaymentData();
		}
		
		function enviar(e) {
			e.stopPropagation();
			getService.registroDePagoWS({
				cvc 		: (parseInt(vm.cardInfo.cvc)) 			? vm.cardInfo.cvc : "",
				cuotas 		: (parseInt(vm.cardInfo.cuotas) < 10) 	? "0" + vm.cardInfo.cuotas : vm.cardInfo.cuotas,
				nroTarjeta 	: (parseInt(vm.cardInfo.nroTarjeta)) 	? vm.cardInfo.nroTarjeta : "",
				vencimiento : (parseInt(vm.cardInfo.vencimiento)) 	? vm.cardInfo.vencimiento : ""
			}, (data) => {
				console.log(data.respuesta);
				console.log(data.respCode);
			});
		}
	}
})();