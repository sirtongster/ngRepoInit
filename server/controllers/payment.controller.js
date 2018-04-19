import _payload_ws from '../mocks/registro-de-pago-WS.json';
// import _payload_op from '../mocks/registro-de-pago-OPEN.json';

import http from 'http';
import path from 'path';
import fs 	from 'fs';

import _http from '../services/osb.service.js';

let OPENINFO = {};

const OSB = {
	protocol: 'http:',
	host: 'sr-osb12-ad02',
	port: '10001',
	path: '',
	method: '',
	headers: {
		'Content-Type': 'application/json; charset=utf-8',
		'Accept': 'application/json'
	}
}


// POST request
function solicitudDePago(req, res){
	OPENINFO = req.body;
	res.sendFile(path.join(__dirname, '../../public', 'index.html'));
}

function registroDePagoWS(req, res){
	OSB.path = '/paymentManagement/paymentCC';
	OSB.method = 'POST';

	const load_payload = (()=>{
		for(let item in req.body){
			if(_payload_ws.hasOwnProperty(item)){
				_payload_ws[item] = req.body[item];
			}
		}
	})();

	_http(OSB, _payload_ws, (response) => {
		res.send('Servicio solicitudDePago ejecutado');
	});
}

function registroDePagoOPEN(req, res){
	OSB.path = '/paymentManagement/payments/open';
	OSB.method = 'POST';






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
	}

	_http(OSB, (response) => {
		res.send('Servicio solicitudDePago ejecutado');
	});

}

const data = {
	solicitudDePago : solicitudDePago,
	registroDePagoWS : registroDePagoWS,
	registroDePagoOPEN : registroDePagoOPEN
};

module.exports = data;