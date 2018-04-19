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
			registroDePagoOPEN : registroDePagoOPEN
		};

		return data;
		/*************************/

		function registroDePagoWS(cardInfo, callback){
			// OPENINFO.TIPOOPERACION = validatorFactory.openDataValidator(OPENINFO);

			let url = `${ host }/pago/pagoWS`;
			let body = {
				"CodSeguridad" 					: (cardInfo.cvc) 							? cardInfo.cvc 							: "",
				"Cuotas" 								: (cardInfo.cuotas) 					? cardInfo.cuotas 					: "",
				"NroTarjeta" 						: (cardInfo.nroTarjeta) 			? cardInfo.nroTarjeta 			: "",
				"FechaVencimiento" 			: (cardInfo.vencimiento) 			? cardInfo.vencimiento 			: "",
				"TipoAutorizacion" 			: (cardInfo.tipoautorizacion) ? cardInfo.tipoautorizacion : "",
			}

			return $http.post(url, body)
			.then((res)=>{
				logger = res;
				if( validatorFactory.ajaxResponseValidator(res) ){
					registroDePagoOPEN(res.DataArea.Payment);
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

		function registroDePagoOPEN(WSRESPONSE){
			let url = `${ host }/pago/pagoWS`;
			let body = {
				"CodSeguridad" 					: (cardInfo.cvc) 							? cardInfo.cvc 							: "",
				"Cuotas" 								: (cardInfo.cuotas) 					? cardInfo.cuotas 					: "",
				"NroTarjeta" 						: (cardInfo.nroTarjeta) 			? cardInfo.nroTarjeta 			: "",
				"FechaVencimiento" 			: (cardInfo.vencimiento) 			? cardInfo.vencimiento 			: "",
				"TipoAutorizacion" 			: (cardInfo.tipoautorizacion) ? cardInfo.tipoautorizacion : "",
			}

			return $http.post(url, body)
			.then((res)=>{
				logger = res;
				if( validatorFactory.ajaxResponseValidator(res) ){
					registroDePagoOPEN(res.DataArea.Payment);
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




			let obj = {
				url : host + '/pago/registroDePagoOPEN',
				method : 'POST',
				,
				happyResponse : (res) => {
					(res.errorCode === "0") ? 
						$location.path('/success') :
						$location.path('/error') ;
					// TODO: Render successful transaction and  eventually trigger the changeStatusOpen function.
					// TODO: anulacionDePagoOpen()
				},
				unhappyResponse : (err) => {
				}
			};

			return ajaxService.getData(obj);
			
		}
		
		function anulacionDePagoWS(){
			let obj = {
				url : 'http://sr-osb12-ad02:10001/paymentManagement/paymentCC',
				method : 'DELETE',
				data : {
					"Track1y2" 				: "",
					"CodSeguridad" 			: 648, 	// WEB
					"CodServicio" 			: "",
					"Version" 				: "",
					"Servicio" 				: "",
					"LineaProducto" 		: "002",// OPEN
					"Comercio" 				: "",
					"Terminal" 				: "",
					"Equipo" 				: "", 	// OPEN
					"Moneda" 				: "",
					"Importe" 				: "", 	// OPEN
					"PlanPago" 				: "",
					"Cuotas" 				: "01", // WEB
					"Ingreso" 				: "",
					"TipoOperacion" 		: "", 	// WEB --TODO: LOGICA DE ANULACION O DEVOLUCION
					"Anulacion" 			: "",	// WEB --TODO: LOGICA DE ANULACION O DEVOLUCION
					"NCuponOriginal" 		: "", 	// OPEN
					"FechaOriginal" 		: "",	// OPEN
					"NroFactura" 			: "",
					"NroTarjeta" 			: "", 	// WEB
					"FechaVencimiento" 		: "", 	// WEB
					"FechaCompra" 			: "",
					"HoraCompra" 			: "",
					"NroCupon" 				: "",
					"CodRespuesta" 			: "",
					"Respuesta" 			: "",
					"NroAutorizacion"		: "",
					"NroTrace" 				: "",
					"TipoAutorizacion" 		: "",
					"NombreTarjeta" 		: "",
					"Operador" 				: "",
					"Titular" 				: "",
					"Retrieval" 			: "",
					"NroCuenta" 			: "",
					"TipoDocumento" 		: "",
					"Documento" 			: "",
					"FechaPosdatada" 		: "",
					"TipoCuenta" 			: "",
					"Reservado" 			: "",
					"Codigotarjeta" 		: "",
					"LongAuxiliar" 			: "",
					"Auxiliar" 				: "",
					"IdentificacionCliente" : "", 	// OPEN
					"PinWorkingKey" 		: "",
					"ImporteAdicional" 		: "",
					"RespValDatosTit" 		: "",
					"NombrePlanPago" 		: "",
					"Lote" 					: "",
					"TelDireccion" 			: "",
					"DatoAdicional59" 		: "",
					"token" 				: "",
					"WKeyEncriptacion" 		: "",
					"Bloque" 				: "",
					"IDCLIENTE2" 			: "",
					"DatosAdicionales" 		: "",
					"Empresa" 				: "",
					"PosMkEncriptacion" 	: "",
					"EMVFallback" 			: "",
					"BitMapAdicional" 		: "",
					"MACREAL" 				: "",
					"IDTerminal" 			: "",
					"Filler" 				: ""
				},
				happyResponse : (res) => {
					callback(res);
				},
				unhappyResponse : (err) => {
					console.log(err);
				}
			};

			return ajaxService.getData(obj);
		}
  }
})();
