(function(){
	angular
		.module('app')
		.controller('GlobalController', GlobalController);
	
	GlobalController.$inject = ['getService', 'form'];
	
	function GlobalController(getService, form){
		let vm = this;
		
		vm.cardInfo = {};

		vm.init = init;
		vm.enviar = enviar;
		
		function init(){
			
		}
		
		function enviar() {
			if((vm.cardInfo.nroTarjeta && vm.cardInfo.vencimiento) && vm.cardInfo.cvc){
				form.cardValidator(vm.cardInfo, (cardInfo) => {
					console.log(cardInfo);
					getService.registroDePagoWS(cardInfo);
				});
			}
		}
	}
})();