(function(){

	angular
		.module('app')
		.factory('OSBService', OSBService);

	OSBService.$inject = ['$http', 'validatorFactory', '$location'];

	function OSBService($http, validatorFactory, $location){
		let logger = "";
		
		let host = `${ window.location.protocol }//${ window.location.host }`;
		
		let data = {
			registroDePagoWS : registroDePagoWS,
			registroDePagoOPEN : registroDePagoOPEN,
			anulacionDePagoWS : anulacionDePagoWS,
			anulacionDePagoOPEN : anulacionDePagoOPEN,
			cambioDeEstado : cambioDeEstado
		};

		return data;
		/*************************/

		function registroDePagoWS(cardInfo, callback){
			let url = `${ host }/pago/pagoWS`;
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
				if( validatorFactory.ajaxResponseValidator(res) ){
					registroDePagoOPEN();
				} else {
					throw 'Datos invalidos desde OPEN';
				}
			})
			.catch((e)=>{
				logger = e;
				$location.path('/error');
			})
			.finally(()=>{
				console.log(logger);
			});
		}

		function registroDePagoOPEN(){
			let url = `${ host }/pago/pagoOPEN`;

			return $http.get(url)
			.then((res)=>{
				logger = res;
				if( res.status === 200 ){
					$location.path('/success');
				} else {
					throw 'Error al registrar pago OPEN';
				}
			})
			.catch((e)=>{
				logger = e;
				$location.path('/error');
			})
			.finally(()=>{
				console.log(logger);
			});			
		}
		
		function anulacionDePagoWS(){
			let url = `${ host }/pago/pagoWS`;

			return $http.delete(url)
			.then((res)=>{
				logger = res;
				if( jQuery.isEmptyObject( res ) ){
					anulacionDePagoOPEN
				} else {
					throw 'No se puedo anular en pago en WS';
				}
			})
			.catch((e)=>{
				logger = e;
				$location.path('/error');
			})
			.finally(()=>{
				console.log(logger);
			});			
		}

		function anulacionDePagoOPEN(){
			let url = `${ host }/pago/pagoOPEN`;

			return $http.delete(url)
			.then((res)=>{
				logger = res;
				if( jQuery.isEmptyObject( res ) ){
					throw 'Se anulo el pago En OPEN correctamente';
				} else {
					throw 'No se puedo anular en pago en OPEN';
				}
			})
			.catch((e)=>{
				logger = e;
				$location.path('/error');
			})
			.finally(()=>{
				console.log(logger);
			});			
		}

		function cambioDeEstado(status){
			let url = `${ host }/pago/cambioDeEstado`;

			return $http.post(url, { status: status })
			.then((res)=>{
				logger = res;
				console.log('ok');
			})
			.catch((e)=>{
				logger = e;
				$location.path('/error');
			})
			.finally(()=>{
				console.log(logger);
			});			
		}
  }
})();
