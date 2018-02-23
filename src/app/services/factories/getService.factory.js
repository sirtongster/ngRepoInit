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
        
        function registroDePagoWS(callback){
            let obj = {
                url : 'http://sr-osb12-ad02:10001/paymentManagement/paymentCC',
                method : 'POST',
                data : {
					"Track1y2" 				: "",
					"CodSeguridad" 			: 648, 		// WEB
					"CodServicio" 			: "",
					"Version" 				: "",
					"Servicio" 				: "",
					"LineaProducto" 		: "002", 	// OPEN
					"Comercio" 				: "",
					"Terminal" 				: "",
					"Equipo" 				: "", 		// OPEN
					"Moneda" 				: "",
					"Importe" 				: "", 		// OPEN
					"PlanPago" 				: "",
					"Cuotas" 				: "", 		// WEB
					"Ingreso" 				: "",
					"TipoOperacion" 		: "", 		// WEB --TODO: LOGICA DE ANULACION O DEVOLUCION
					"Anulacion" 			: "",		// WEB --TODO: LOGICA DE ANULACION O DEVOLUCION
					"NCuponOriginal" 		: "", 		// OPEN
					"FechaOriginal" 		: "",		// OPEN
					"NroFactura" 			: "",
					"NroTarjeta" 			: "", 		// WEB
					"FechaVencimiento" 		: "", 		// WEB
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
