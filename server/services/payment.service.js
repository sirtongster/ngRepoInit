import _payload_ws from '../mocks/registro-de-pago-WS.json';
import _payload_op from '../mocks/registro-de-pago-OPEN.json';

import osb from '../services/osb.service.js';
import validate from '../services/validate.service.js';

function registroDePagoWS( OPENINFO, CARDINFO, callback_reg ){
	let OSB = {};
	OSB.path = '/paymentManagement/paymentCC';
	OSB.method = 'POST';

	const load_payload = (()=>{
		for(let item in CARDINFO){
			if(_payload_ws.hasOwnProperty(item)){
				_payload_ws[item] = CARDINFO[item];
			}
		}
		_payload_ws.LineaProducto 				= OPENINFO.LINEAPRODUCTO;
		_payload_ws.Equipo 								= OPENINFO.EQUIPO;
		_payload_ws.Importe 							= OPENINFO.IMPORTE;
		_payload_ws.TipoOperacion 				= '1';
		_payload_ws.NCuponOriginal 				= OPENINFO.CUPONORIGINAL;
		_payload_ws.FechaOriginal 				= OPENINFO.FECHAORIGINAL;
		_payload_ws.IdentificacionCliente = OPENINFO.ID_CLIENTE;
	})();

	osb(OSB, _payload_ws, ( response ) => {
		registroDePagoOPEN( response.Payment, OPENINFO, CARDINFO , callback_reg);
	}, ( err ) => {
		callback_reg({
			status: 500,
			message: ( err.Payment.Response ) ?
									err.Payment.Response :
									'Error al registrar en WS'
		});
	});
}

function registroDePagoOPEN( WSRESPONSE, OPENINFO, CARDINFO, callback_reg ){
	let OSB = {};
	OSB.path = '/paymentManagement/payments/open';
	OSB.method = 'POST';

	_payload_op.fechaPago 				= validate._date( WSRESPONSE.PurchaseDate, WSRESPONSE.PurchaseTime )	|| "2018-03-21T10:53:59",
	_payload_op.lineaProducto 		= WSRESPONSE.ProductLine 								|| "",
	_payload_op.comercio 					= WSRESPONSE.Commerce 									|| "",
	_payload_op.terminal 					= WSRESPONSE.Terminal 									|| "",
	_payload_op.equipos 					= WSRESPONSE.Machine 										|| "",
	_payload_op.moneda 						= WSRESPONSE.CurrencyType 							|| "",
	_payload_op.cuotas 						= WSRESPONSE.NumberOfInstalments 				|| "",
	_payload_op.ingreso 					= WSRESPONSE.EntryType 									|| "",
	_payload_op.tipoOperacion 		= WSRESPONSE.OperationType 							|| "",
	_payload_op.anulacion 				= WSRESPONSE.Cancellation 							|| "",
	_payload_op.numeroTarjeta 		= WSRESPONSE.CreditCardNumber 					|| "",
	_payload_op.fechaVencimiento 	= WSRESPONSE.CreditCardExpirationDate 	|| "",
	_payload_op.fechaco 					= validate._date(  WSRESPONSE.PurchaseDate, WSRESPONSE.PurchaseTime )	|| "2018-03-21T10:53:59",
	_payload_op.cuta 							= WSRESPONSE.VoucherNumber 							|| "",
	_payload_op.auto 							= WSRESPONSE.AuthorizationNumber 				|| "",
	_payload_op.tipoauto 					= WSRESPONSE.AuthorizationType 					|| "",
	_payload_op.operador 					= WSRESPONSE.Operator 									|| "",
	_payload_op.cuenta 						= WSRESPONSE.AccountNumber 							|| "",
	_payload_op.codtarjeta				= WSRESPONSE.CreditCardCode 						|| "",
	_payload_op.cliente 					= WSRESPONSE.ClientID 									|| "",
	_payload_op.meer 							= WSRESPONSE.ResponseCode 							|| "",
	_payload_op.dere 							= WSRESPONSE.Response 									|| "",
	_payload_op.lote 							= "",
	_payload_op.suscriptionsPayment = {
		"pagos" : {
			"cupon" : [{
				"suscripcion" : ( WSRESPONSE.ClientID ) ? WSRESPONSE.ClientID.slice(15, 23) : "",
				"valorpago" 	: WSRESPONSE.Amount 										 				|| ""
			}]
		}
	}

	osb(OSB, _payload_op, (response) => {

		callback_reg({
			status: 200,
			message: 'Registro de pago exitoso'
		});

	}, ( err ) => {	

		anulacionDePagoWS( OPENINFO, CARDINFO, (response) => {
			callback_reg({
				status: response.status,
				message: `${ err.message } - ${ response.message}`
			});
		});
		
	});

}

function anulacionDePagoWS( OPENINFO, CARDINFO, callback ){
	let OSB = {};
	OSB.path = '/paymentManagement/paymentCC';
	OSB.method = 'DELETE';

	const load_payload = (() => {
		for( let item in CARDINFO ){
			if( _payload_ws.hasOwnProperty(item) ){
				_payload_ws[item] = CARDINFO[ item ];
			}
		}
		_payload_ws.LineaProducto 				= OPENINFO.LINEAPRODUCTO;
		_payload_ws.Equipo 								= OPENINFO.EQUIPO;
		_payload_ws.Importe 							= OPENINFO.IMPORTE;
		_payload_ws.TipoOperacion 				= ( OPENINFO.TIPOOPERACION === 'D' ) ? '3' : '1';
		_payload_ws.Anulacion 						= ( OPENINFO.TIPOOPERACION === 'D' ) ? 'N' : 'S';
		_payload_ws.NCuponOriginal 				= OPENINFO.CUPONORIGINAL;
		_payload_ws.FechaOriginal 				= OPENINFO.FECHAORIGINAL;
		_payload_ws.IdentificacionCliente = OPENINFO.ID_CLIENTE;
	})();

	osb(OSB, _payload_ws, (response) => {
		anulacionDePagoOPEN( OPENINFO, callback )
	}, ( err ) => {
		callback({
			status: 500,
			message: err.message
		});
	});
}

function anulacionDePagoOPEN( OPENINFO, callback ){
	let OSB = {};
	OSB.path = '/paymentManagement/payments/open';
	OSB.method = 'DELETE';

	_payload_anul_op.contract 		= OPENINFO.IDTRANSACCION;
	_payload_anul_op.amount 			= OPENINFO.IMPORTE;
	_payload_anul_op.paymentDate	= validate._date(  OPENINFO.FECHAORIGINAL, '000000' )	|| "2018-03-21T10:53:59";

	osb(OSB, _payload_anul_op, (response) => {
		callback({
			status: 200,
			message: 'Pago anulado correctamente'
		});
	}, ( err ) => {
		callback({
			status: 200,
			message: 'Pago anulado en Wondersoft, pero no en OPEN'
		});
	});
}

const data = {
	registroDePagoWS 		: registroDePagoWS,
	registroDePagoOPEN 	: registroDePagoOPEN,
	anulacionDePagoWS 	: anulacionDePagoWS,
	anulacionDePagoOPEN : anulacionDePagoOPEN
};

module.exports = data;