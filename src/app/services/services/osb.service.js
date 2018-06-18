(function(){

	angular
		.module('app')
		.factory('OSBService', OSBService);

	OSBService.$inject = ['$http', 'validatorFactory', '$location'];

	function OSBService($http, validatorFactory, $location){
		let logger = "";
		
		let host = `${ window.location.protocol }//${ window.location.host }`;
		
		let data = {
			payment : payment,
			status : status
		};

		return data;
		/*************************/
		function payment(cardInfo, callback){
			let url = `${ host }/pago/payment`;
			let body = {
				"CodSeguridad" 					: (cardInfo.cvc) 							? cardInfo.cvc 							: "648",
				"Cuotas" 								: (cardInfo.cuotas) 					? cardInfo.cuotas 					: "01",
				"NroTarjeta" 						: (cardInfo.nroTarjeta) 			? cardInfo.nroTarjeta 			: "4507990000977787",
				"FechaVencimiento" 			: (cardInfo.vencimiento) 			? cardInfo.vencimiento 			: "1905",
				"TipoAutorizacion" 			: (cardInfo.tipoautorizacion) ? cardInfo.tipoautorizacion : "",
			}

			return $http.post(url, body)
			.then((res)=>{
				logger = res;
				if ( validatorFactory.pago(res) ){
					$location.path('/success');
				}	else {
					throw 'No se pudo procesar el pago';
				}
			})
			.catch((e)=>{
				logger = e;
				$location.path('/error').search({ data: logger.data });
			})
			.finally(()=>{
				console.log(logger);
			});

		}

		function status(status){
			let url = `${ host }/pago/status`;

			return $http.post(url, { status: status })
			.then((res)=>{
				logger = res;
			})
			.catch((e)=>{
				logger = e;
				$location.path('/error').search({ data: logger.data });
			})
			.finally(()=>{
				console.log(logger);
			});			
		}
  }
})();
