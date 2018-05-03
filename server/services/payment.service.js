import _payload_ws from '../mocks/registro-de-pago-WS.json';
import _payload_op from '../mocks/registro-de-pago-OPEN.json';

const OSB = {
	protocol: 'http:',
	host: process.env.host,
	port: process.env.port, 
	path: '',
	method: '',
	headers: {
		'Content-Type': 'application/json; charset=utf-8',
		'Accept': 'application/json'
	}
}

function registroDePagoWS(OPENINFO, CARDINFO){
	OSB.path = '/paymentManagement/paymentCC';
	OSB.method = 'POST';

	const load_payload = (()=>{
		for(let item in CARDINFO){
			if(_payload_ws.hasOwnProperty(item)){
				_payload_ws[item] = CARDINFO[item];
			}
		}
		_payload_ws.LineaProducto 				= OPENINFO.LINEAPRODUCTO 	|| "009";
		_payload_ws.Equipo 								= OPENINFO.EQUIPO 				|| "";
		_payload_ws.Importe 							= OPENINFO.IMPORTE 				|| "000000001000";
		_payload_ws.TipoOperacion 				= OPENINFO.TIPOOPERACION 	|| "1";
		_payload_ws.NCuponOriginal 				= OPENINFO.CUPONORIGINAL 	|| "";
		_payload_ws.FechaOriginal 				= OPENINFO.FECHAORIGINAL 	|| "";
		_payload_ws.IdentificacionCliente = OPENINFO.ID_CLIENTE 		|| "00000000072767012368912043 APX_AOGAS                     00145627219                           OPEN ";
	})();

	osb(OSB, _payload_ws, ( response ) => {
		WSRESPONSE = response;
		WSRESPONSE = WSRESPONSE.Payment;
		return registroDePagoOPEN( WSRESPONSE, OPENINFO, CARDINFO );
	}, ( msj ) => {
		return false;
	});
}

function registroDePagoOPEN( WSRESPONSE, OPENINFO, CARDINFO ){
	OSB.path = '/paymentManagement/payments/open';
	OSB.method = 'POST';

	_payload_op.fechaPago 				= ( WSRESPONSE.PurchaseDate, WSRESPONSE.PurchaseTime ) ? validate._date(  WSRESPONSE.PurchaseDate, WSRESPONSE.PurchaseTime )	: "2018-03-21T10:53:59",
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
	_payload_op.fechaco 					= ( WSRESPONSE.PurchaseDate, WSRESPONSE.PurchaseTime ) ? validate._date(  WSRESPONSE.PurchaseDate, WSRESPONSE.PurchaseTime )	: "2018-03-21T10:53:59",
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
		return true;
	}, ( msj ) => {
		anulacionDePagoWS( OPENINFO, CARDINFO );
	});

}

function anulacionDePagoWS( OPENINFO, CARDINFO ){
	OSB.path = '/paymentManagement/paymentCC';
	OSB.method = req.method;

	const load_payload = (()=>{
		for(let item in CARDINFO){
			if(_payload_ws.hasOwnProperty(item)){
				_payload_ws[item] = CARDINFO[item];
			}
		}
		_payload_ws.LineaProducto 				= OPENINFO.LINEAPRODUCTO 	|| "009";
		_payload_ws.Equipo 								= OPENINFO.EQUIPO 				|| "";
		_payload_ws.Importe 							= OPENINFO.IMPORTE 				|| "000000001000";
		_payload_ws.TipoOperacion 				= OPENINFO.TIPOOPERACION 	|| "1";
		_payload_ws.Anulacion 						= 'S';
		_payload_ws.NCuponOriginal 				= OPENINFO.CUPONORIGINAL 	|| "";
		_payload_ws.FechaOriginal 				= OPENINFO.FECHAORIGINAL 	|| "";
		_payload_ws.IdentificacionCliente = OPENINFO.ID_CLIENTE 		|| "00000000072767012368912043 APX_AOGAS                     00145627219                           OPEN ";
	})();


	osb(OSB, _payload_ws, (response) => {
		return true;
	}, ( msj ) => {
		return false;
	});
}

function anulacionDePagoOPEN(req, res){
	OSB.path = '/paymentManagement/payments/open';
	OSB.method = req.method;

	_payload_anul_op.contract 		= _payload_op.fechaPago;
	_payload_anul_op.amount 			= WSRESPONSE.Amount;
	_payload_anul_op.paymentDate	= _payload_op.fechaPago;

	osb(OSB, _payload_anul_op, (response) => {
		// TODO
	}, ( msj ) => {
		// TODO
	});
}

const data = {
	registroDePagoWS 		: registroDePagoWS,
	registroDePagoOPEN 	: registroDePagoOPEN,
	anulacionDePagoWS 	: anulacionDePagoWS,
	anulacionDePagoOPEN : anulacionDePagoOPEN
};

module.exports = data;