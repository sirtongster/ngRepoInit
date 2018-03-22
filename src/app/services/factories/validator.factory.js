(function(){

	angular
		.module('app')
		.factory('validatorFactory', validatorFactory);

	validatorFactory.$inject = [];

	function validatorFactory(){       
		let data = {
			ajaxResponseValidator : ajaxResponseValidator,
			paymentDataValidator : paymentDataValidator,
			openDataValidator : openDataValidator,
			formatDateValidator : formatDateValidator
		};
	
		return data;
		/*************************/
			
		function ajaxResponseValidator(data){
			if (data.hasOwnProperty('DataArea')){
				if (data.DataArea.hasOwnProperty('Payment')){
					if (data.DataArea.Payment.ResponseCode === '00'){
						return true;
					}
					return false;
				}
				return false;
			}
			return false;
		}

		function paymentDataValidator(data){

		}

		function openDataValidator(data){
			return  (data.TIPOOPERACION === 'C') ? '1' :
							(data.TIPOOPERACION === 'A') ? '1' : 
							(data.TIPOOPERACION === 'D') ? '3' : "";
		}

		function formatDateValidator(date, time){
			// TODO: Validación de parametros de entrada (date : DD/MM/AA && time : HHMMSS)
			date = date.split("/").reverse();
			date[0] = '20'+date[0];
			date = date.join('-');
			time = time.match( /.{1,2}/g ).join(':');
			return date+'T'+time;
		}
	}
})();