import _payload_ws from '../mocks/registro-de-pago-WS.json';
import _payload_op from '../mocks/registro-de-pago-OPEN.json';

import logger from '../services/log.service.js';
import osb from '../services/osb.service.js';
import validate from '../services/validate.service.js';

function registroDePagoWS( OPENINFO, CARDINFO ){
	return new Promise(( resolve, reject ) => {
		let OSB = {};
		OSB.path = '/paymentManagement/paymentCC';
		OSB.method = 'POST';
	
		let _payload_ws_reg = _payload_ws;
	
		const load_payload = (()=>{
			for(let item in CARDINFO){
				if(_payload_ws_reg.hasOwnProperty(item)){
					_payload_ws_reg[item] = CARDINFO[item];
				}
			}
			_payload_ws_reg.LineaProducto 				= OPENINFO.LINEAPRODUCTO;
			_payload_ws_reg.Equipo 								= "";
			_payload_ws_reg.Importe 							= OPENINFO.IMPORTE;
			_payload_ws_reg.TipoOperacion 				= '1';
			_payload_ws_reg.Anulacion 						= 'N';
			_payload_ws_reg.NCuponOriginal 				= OPENINFO.CUPONORIGINAL;
			_payload_ws_reg.FechaOriginal 				= OPENINFO.FECHAORIGINAL;
			_payload_ws_reg.IdentificacionCliente = OPENINFO.ID_CLIENTE;
		})();
	
		return osb(OSB, _payload_ws_reg)
			.then( data => {
				return registroDePagoOPEN( data.Payment, OPENINFO, CARDINFO)
					.then( ( resolution ) => {
						resolve( resolution );
					});
			})
			.catch( err => {
				reject({
					status: 500,
					message: err.Payment.Response
				});
			});
	});
}

function registroDePagoOPEN( WSRESPONSE, OPENINFO, CARDINFO ){
	return new Promise(( resolve, reject ) => {
		let OSB = {};
		OSB.path = '/paymentManagement/payments/open';
		OSB.method = 'POST';
	
		_payload_op.fechaPago 				= validate._date( WSRESPONSE.PurchaseDate, WSRESPONSE.PurchaseTime ),
		_payload_op.lineaProducto 		= WSRESPONSE.ProductLine,
		_payload_op.comercio 					= WSRESPONSE.Commerce,
		_payload_op.terminal 					= WSRESPONSE.Terminal,
		_payload_op.equipos 					= WSRESPONSE.Machine,
		_payload_op.moneda 						= WSRESPONSE.CurrencyType,
		_payload_op.cuotas 						= WSRESPONSE.NumberOfInstalments,
		_payload_op.ingreso 					= WSRESPONSE.EntryType,
		_payload_op.tipoOperacion 		= WSRESPONSE.OperationType,
		_payload_op.anulacion 				= WSRESPONSE.Cancellation,
		_payload_op.numeroTarjeta 		= WSRESPONSE.CreditCardNumber,
		_payload_op.fechaVencimiento 	= WSRESPONSE.CreditCardExpirationDate,
		_payload_op.fechaco 					= validate._date(  WSRESPONSE.PurchaseDate, WSRESPONSE.PurchaseTime ),
		_payload_op.cuta 							= WSRESPONSE.VoucherNumber,
		_payload_op.auto 							= WSRESPONSE.AuthorizationNumber,
		_payload_op.tipoauto 					= WSRESPONSE.AuthorizationType,
		_payload_op.operador 					= WSRESPONSE.Operator,
		_payload_op.cuenta 						= WSRESPONSE.AccountNumber,
		_payload_op.codtarjeta				= WSRESPONSE.CreditCardCode,
		_payload_op.cliente 					= WSRESPONSE.ClientID,
		_payload_op.meer 							= WSRESPONSE.ResponseCode,
		_payload_op.dere 							= WSRESPONSE.Response,
		_payload_op.lote 							= "",
		_payload_op.suscriptionsPayment = {
			"pagos" : {
				"cupon" : [{
					"suscripcion" : ( WSRESPONSE.ClientID ) ? WSRESPONSE.ClientID.slice(15, 23) : "",
					"valorpago" 	: WSRESPONSE.Amount
				}]
			}
		}
	
		return osb(OSB, _payload_op)
			.then( data => {
				resolve({
					status: 200,
					message: 'Registro de pago exitoso'
				});
			})
			.catch( err => {
				return anulacionDePagoWS( OPENINFO, CARDINFO )
					.then( response => {
						reject({
							status: response.status,
							message: `${ err.message } - ${ response.message}`
						});
					})
			});

	});

}

function anulacionDePagoWS( OPENINFO, CARDINFO ){
	return new Promise(( resolve, reject ) => {
		let OSB = {};
		OSB.path = '/paymentManagement/paymentCC';
		OSB.method = 'DELETE';
	
		let _payload_ws_anul = _payload_ws;
	
		const load_payload = (() => {
			for( let item in CARDINFO ){
				if( _payload_ws_anul.hasOwnProperty(item) ){
					_payload_ws_anul[item] = CARDINFO[ item ];
				}
			}
			_payload_ws_anul.LineaProducto 				= OPENINFO.LINEAPRODUCTO;
			_payload_ws_anul.Equipo 								= "";
			_payload_ws_anul.Importe 							= OPENINFO.IMPORTE;
			_payload_ws_anul.TipoOperacion 				= ( OPENINFO.TIPOOPERACION === 'D' ) ? '3' : '1';
			_payload_ws_anul.Anulacion 						= ( OPENINFO.TIPOOPERACION === 'D' ) ? 'N' : 'S';
			_payload_ws_anul.NCuponOriginal 				= OPENINFO.CUPONORIGINAL; // TODO: Chequear si viene de OPEN.
			_payload_ws_anul.FechaOriginal 				= OPENINFO.FECHAORIGINAL; // TODO: Chequear si viene de OPEN.
			_payload_ws_anul.IdentificacionCliente = OPENINFO.ID_CLIENTE;
			_payload_ws_anul.Comercio							= OPENINFO.COMERCIO;
			_payload_ws_anul.Terminal							= ""; // OPENINFO.TERMINAL;
		})();
	
		return osb(OSB, _payload_ws_anul)
			.then( data => {
				return anulacionDePagoOPEN( OPENINFO )
					.then( resolution => {
						resolve( resolution );
					})
			})
			.catch( err => {
				reject({
					status: 500,
					message: err.message
				});
			});
	});
}

function anulacionDePagoOPEN( OPENINFO ){
	return new Promise(( resolve, reject ) => {
		let OSB = {};
		OSB.path = '/paymentManagement/payments/open';
		OSB.method = 'DELETE';
	
		let _payload_anul_op = {
			contract 		: OPENINFO.IDTRANSACCION,
			amount 			: validate.toFloat( OPENINFO.IMPORTE ),
			paymentDate	: anulws_resp.Payment.PurchaseDate
		};
	
	
		osb(OSB, _payload_anul_op)
			.then( data => {
				resolve({
					status: 200,
					message: 'Pago anulado correctamente'
				});
			})
			.catch( err => {
				reject({
					status: 200,
					message: 'Pago anulado en Wondersoft, pero no en OPEN'
				});
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