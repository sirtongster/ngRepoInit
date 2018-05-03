(function(){

	angular
		.module('app')
		.factory('validatorFactory', validatorFactory);

	validatorFactory.$inject = [];

	function validatorFactory(){       
		let data = {
			pago : pago,
			openDataValidator : openDataValidator,
			formatDateValidator : formatDateValidator
		};
	
		return data;
		/*************************/

		function pago(data){
			let status = data.status;
			switch(status){
				case 200: 
					return true;
					break;
				default: return false;
			}
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