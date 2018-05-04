(function(){
	angular
		.module('app')
		.controller('GlobalController', GlobalController);
	
	GlobalController.$inject = ['cfpLoadingBar', 'OSBService'];
	
	function GlobalController(cfpLoadingBar, OSBService){
		let vm = this;
		
		vm.cardInfo = {};

		vm.ie = ie;
		vm.init = init;
		vm.enviar = enviar;
		
		function init(){
			cfpLoadingBar.start();
		}
		
		function enviar(e) {
			e.stopPropagation();
			OSBService.payment({
				cvc 				: (parseInt(vm.cardInfo.cvc)) 				? vm.cardInfo.cvc 				: "",
				cuotas 			: (parseInt(vm.cardInfo.cuotas))	 		? vm.cardInfo.cuotas 			: "",
				nroTarjeta 	: (parseInt(vm.cardInfo.nroTarjeta)) 	? vm.cardInfo.nroTarjeta 	: "",
				vencimiento : (parseInt(vm.cardInfo.vencimiento)) ? vm.cardInfo.vencimiento : ""
			}, (data) => {
				cfpLoadingBar.complete();
			});
		}

		function ie(){
			// Internet Explorer 6-11
			let isIE = /*@cc_on!@*/false || !!document.documentMode;

			return ( isIE ) ? true: false;
		}
	}
})();