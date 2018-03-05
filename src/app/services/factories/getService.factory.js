(function(){

    angular
        .module('app')
        .factory('getService', getService);

    getService.$inject = ['ajaxService'];

    function getService(ajaxService){
        let global;
        let host = 'http://' + location.host;
        
        let data = {
			registroDePagoWS : registroDePagoWS
        };
    
        return data;
        /*************************/
        
        function registroDePagoWS(cardInfo){
            let obj = {
                url : 'http://sr-osb12-ad02:10001/paymentManagement/paymentCC',
                method : 'POST',
                data : {
					"Track1y2" 				: "",
					"CodSeguridad" 			: (cardInfo.cvc) ? cardInfo.cvc : "648",
					"CodServicio" 			: "",
					"Version" 				: "",
					"Servicio" 				: "",
					"LineaProducto" 		: "004",// OPEN
					"Comercio" 				: "",
					"Terminal" 				: "",
					"Equipo" 				: "", 	// OPEN
					"Moneda" 				: "",
					"Importe" 				: "000000001000", 	// OPEN
					"PlanPago" 				: "",
					"Cuotas" 				: (cardInfo.coutas) ? cardInfo.coutas : "01",
					"Ingreso" 				: "",
					"TipoOperacion" 		: "", 	// WEB --TODO: LOGICA DE ANULACION O DEVOLUCION
					"Anulacion" 			: "",	// WEB --TODO: LOGICA DE ANULACION O DEVOLUCION
					"NCuponOriginal" 		: "", 	// OPEN
					"FechaOriginal" 		: "",	// OPEN
					"NroFactura" 			: "",
					"NroTarjeta" 			: (cardInfo.nroTarjeta) ? cardInfo.nroTarjeta : "4507990000977787",
					"FechaVencimiento" 		: (cardInfo.vencimiento) ? cardInfo.vencimiento : "1905",
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
                    
                },
                unhappyResponse : (err) => {
					console.log('****** ANULACION ******');
					anulacionDePagoWS();
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
