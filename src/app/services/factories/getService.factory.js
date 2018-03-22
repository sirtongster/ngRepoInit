(function(){

    angular
        .module('app')
        .factory('getService', getService);

    getService.$inject = ['ajaxService', 'validatorFactory', '$location'];

    function getService(ajaxService, validatorFactory, $location){
        let OPENINFO = {};
        let host = '//' + location.host;
        
        let data = {
					infoDePagoWS : infoDePagoWS,
					registroDePagoWS : registroDePagoWS,
					registroDePagoOPEN : registroDePagoOPEN
        };
    
        return data;
        /*************************/
		function infoDePagoWS(){
			let obj = {
				url : host + '/pago/registroDePagoWS',
				method : 'GET',
				happyResponse : (res) => {
						OPENINFO = res;
				},
				unhappyResponse : (err) => {
					
				}
			};

      return ajaxService.getData(obj);
		}
		
    function registroDePagoWS(cardInfo, callback){
			OPENINFO.TIPOOPERACION = validatorFactory.openDataValidator(OPENINFO);
			let obj = {
				url : host + '/pago/registroDePagoWS',
				method : 'POST',
				data : {
					"CodSeguridad" 					: (cardInfo.cvc) 							? cardInfo.cvc 							: "",
					"LineaProducto" 				: (OPENINFO.LINEAPRODUCTO) 		? OPENINFO.LINEAPRODUCTO 		: "",
					"Equipo" 								: (OPENINFO.EQUIPO)						? OPENINFO.EQUIPO 					: "",
					"Importe" 							: (OPENINFO.IMPORTE) 					? OPENINFO.IMPORTE 					: "",
					"Cuotas" 								: (cardInfo.cuotas) 					? cardInfo.cuotas 					: "",
					"TipoOperacion" 				: (OPENINFO.TIPOOPERACION) 		? OPENINFO.TIPOOPERACION 		: "",
					"NCuponOriginal" 				: (OPENINFO.CUPONORIGINAL) 		? OPENINFO.CUPONORIGINAL 		: "",
					"FechaOriginal" 				: (OPENINFO.FECHAORIGINAL) 		? OPENINFO.FECHAORIGINAL 		: "",
					"NroTarjeta" 						: (cardInfo.nroTarjeta) 			? cardInfo.nroTarjeta 			: "",
					"FechaVencimiento" 			: (cardInfo.vencimiento) 			? cardInfo.vencimiento 			: "",
					"TipoAutorizacion" 			: (cardInfo.tipoautorizacion) ? cardInfo.tipoautorizacion : "",
					"IdentificacionCliente" : (OPENINFO.ID_CLIENTE) 			? OPENINFO.ID_CLIENTE 			: ""
				},
        happyResponse : (res) => {

					(validatorFactory.ajaxResponseValidator(res)) ? 
						registroDePagoOPEN(res.DataArea.Payment) : 
						$location.path('/error') ;

        },
        unhappyResponse : (err) => {
					$location.path('/error');
        }
      };

    	return ajaxService.getData(obj);
		}

		function registroDePagoOPEN(WSRESPONSE){
			console.log(WSRESPONSE);
			let obj = {
				url : host + '/pago/registroDePagoOPEN',
				method : 'POST',
				data : {
					"fechaPago" 				: ( WSRESPONSE.PurchaseTime && WSRESPONSE.PurchaseDate)	?
																	validatorFactory.formatDateValidator(  WSRESPONSE.PurchaseDate, WSRESPONSE.PurchaseTime )	: "",
					"lineaProducto" 		: ( WSRESPONSE.ProductLine ) 							? WSRESPONSE.ProductLine 								: "",
					"comercio" 					: ( WSRESPONSE.Commerce ) 								? WSRESPONSE.Commerce 									: "",
					"terminal" 					: ( WSRESPONSE.Terminal ) 								? WSRESPONSE.Terminal 									: "",
					"equipos" 					: ( WSRESPONSE.Machine ) 									? WSRESPONSE.Machine 										: "",
					"moneda" 						: ( WSRESPONSE.CurrencyType ) 						? WSRESPONSE.CurrencyType 							: "",
					"cuotas" 						: ( WSRESPONSE.NumberOfInstalments ) 			? WSRESPONSE.NumberOfInstalments 				: "",
					"ingreso" 					: ( WSRESPONSE.EntryType ) 								? WSRESPONSE.EntryType 									: "",
					"tipoOperacion" 		: ( WSRESPONSE.OperationType ) 						? WSRESPONSE.OperationType 							: "",
					"anulacion" 				: ( WSRESPONSE.Cancellation ) 						? WSRESPONSE.Cancellation 							: "",
					"numeroTarjeta" 		: ( WSRESPONSE.CreditCardNumber ) 				? WSRESPONSE.CreditCardNumber 					: "",
					"fechaVencimiento" 	: ( WSRESPONSE.CreditCardExpirationDate ) ? WSRESPONSE.CreditCardExpirationDate 	: "",
					"fechaco" 					: ( WSRESPONSE.PurchaseTime && WSRESPONSE.PurchaseDate)	? 
																	validatorFactory.formatDateValidator(  WSRESPONSE.PurchaseDate, WSRESPONSE.PurchaseTime )	: "",
					"cuta" 							: ( WSRESPONSE.VoucherNumber ) 						? WSRESPONSE.VoucherNumber 							: "",
					"auto" 							: ( WSRESPONSE.AuthorizationNumber ) 			? WSRESPONSE.AuthorizationNumber 				: "",
					"tipoauto" 					: ( WSRESPONSE.AuthorizationType ) 				? WSRESPONSE.AuthorizationType 					: "",
					"operador" 					: ( WSRESPONSE.Operator ) 								? WSRESPONSE.Operator 									: "",
					"cuenta" 						: ( WSRESPONSE.AccountNumber ) 						? WSRESPONSE.AccountNumber 							: "",
					"codtarjeta"				: ( WSRESPONSE.CreditCardCode ) 					? WSRESPONSE.CreditCardCode 						: "",
					"cliente" 					: ( WSRESPONSE.ClientID ) 								? WSRESPONSE.ClientID 									: "",
					"meer" 							: ( WSRESPONSE.ResponseCode ) 						? WSRESPONSE.ResponseCode 							: "",
					"dere" 							: ( WSRESPONSE.Response ) 								? WSRESPONSE.Response 									: "",
					"lote" 							: "",
					"suscriptionsPayment" : {
						"pagos" : {
							"cupon" : [ {
								"suscripcion" : "10012959",
								"valorpago" 	: ( WSRESPONSE.Amount ) 									? WSRESPONSE.Amount 										: ""
							}]
						}
					}
				},
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
