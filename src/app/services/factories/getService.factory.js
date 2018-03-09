(function(){

    angular
        .module('app')
        .factory('getService', getService);

    getService.$inject = ['ajaxService'];

    function getService(ajaxService){
        let openInfo = {};
        let host = '//' + location.host;
        
        let data = {
			registroDePagoWS : registroDePagoWS,
			getPaymentData : getPaymentData
        };
    
        return data;
        /*************************/
		function getPaymentData(){
			let obj = {
                url : host + '/pago/registroDePago',
                method : 'GET',
                happyResponse : (res) => {
                    openInfo = res;
                },
                unhappyResponse : (err) => {
					console.log('****** ANULACION ******');
                }
            };

            return ajaxService.getData(obj);
		}
		
        function registroDePagoWS(cardInfo, callback){
			console.log(cardInfo);
            let obj = {
                url : host + '/pago/registroDePago',
                method : 'POST',
                data : {
					"Track1y2" 				: "",
					"CodSeguridad" 			: (cardInfo.cvc) ? cardInfo.cvc : 648,
					"CodServicio" 			: "",
					"Version" 				: "",
					"Servicio" 				: "",
					"LineaProducto" 		: (openInfo.lineaproducto) ? openInfo.lineaproducto : "",
					"Comercio" 				: "",
					"Terminal" 				: "",
					"Equipo" 				: (openInfo.equipo) ? openInfo.equipo : "",
					"Moneda" 				: "",
					"Importe" 				: (openInfo.importe) ? openInfo.importe : "",
					"PlanPago" 				: "",
					"Cuotas" 				: (cardInfo.cuotas) ? cardInfo.cuotas : "",
					"Ingreso" 				: "",
					"TipoOperacion" 		: "",
					"Anulacion" 			: "",
					"NCuponOriginal" 		: (openInfo.cuponoriginal) ? openInfo.cuponoriginal : "",
					"FechaOriginal" 		: (openInfo.fechaoriginal) ? openInfo.fechaoriginal : "",
					"NroFactura" 			: "",
					"NroTarjeta" 			: (cardInfo.nroTarjeta) ? cardInfo.nroTarjeta : "",
					"FechaVencimiento" 		: (cardInfo.vencimiento) ? cardInfo.vencimiento : "",
					"FechaCompra" 			: "",
					"HoraCompra" 			: "",
					"NroCupon" 				: "",
					"CodRespuesta" 			: "",
					"Respuesta" 			: "",
					"NroAutorizacion"		: "",
					"NroTrace" 				: "",
					"TipoAutorizacion" 		: (cardInfo.tipoautorizacion) ? cardInfo.tipoautorizacion : "",
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
					"IdentificacionCliente" : (openInfo.idcliente) ? openInfo.idcliente : "",
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
                    callback({
						respuesta 	: res.Response,
						respCode	: res.ResponseCode
					});
                },
                unhappyResponse : (err) => {
					console.log('****** ANULACION ******');
					// anulacionDePagoWS();
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
