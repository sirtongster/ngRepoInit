const _payload_ws = require( '../mocks/registro-de-pago-WS.json' );
const _payload_op = require( '../mocks/registro-de-pago-OPEN.json' );

const http = require( 'http' );
const path = require( 'path' );
const fs 	= require( 'fs' );

import { ValidateService } from '../services/validate.service';
import { OSBService } from '../services/osb.service';
import { OpenInfo, WSRequest, WSResponse } from '../interfaces/payment.interfaces';


class PaymentComponent{
	private OPENINFO: OpenInfo;
	private WSRESPONSE: WSResponse;
	private OSB = {
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

	osb: any;

	constructor(){
		console.log('Componente PaymentComponent inicializado');
	}

	solicitudDePago(req, res){
		this.OPENINFO = req.body;
		res.sendFile(path.join(__dirname, '../../public', 'index.html'));
	}

	registroDePagoWS(req, res){
		this.OSB.path = '/paymentManagement/paymentCC';
		this.OSB.method = req.method;

		/** Carga el payload con la info enviada por parametro */
		const load_payload = (()=>{
			for(let item in req.body){
				if(_payload_ws.hasOwnProperty(item)){
					_payload_ws[item] = req.body[item];
				}
			}
		})();
		/** Carga el payload con la info del request de OPEN */
		_payload_ws.LineaProducto 				= this.OPENINFO.LINEAPRODUCTO 	|| "009";
		_payload_ws.Equipo 								= this.OPENINFO.EQUIPO 					|| "";
		_payload_ws.Importe 							= this.OPENINFO.IMPORTE 				|| "000000001000";
		_payload_ws.TipoOperacion 				= this.OPENINFO.TIPOOPERACION 	|| "1";
		_payload_ws.NCuponOriginal 				= this.OPENINFO.CUPONORIGINAL 	|| "";
		_payload_ws.FechaOriginal 				= this.OPENINFO.FECHAORIGINAL 	|| "";
		_payload_ws.IdentificacionCliente = this.OPENINFO.ID_CLIENTE 			|| "00000000072767012368912043 APX_AOGAS                     00145627219                           OPEN ";


		this.osb = new OSBService(this.OSB, _payload_ws, ( response ) => {
			let keeper: any;
			keeper = JSON.parse(response);
			this.WSRESPONSE = keeper.Payment;
			res.send('Servicio registroDePagoWS ejecutado');
		});
	}

	registroDePagoOPEN(req, res){
		this.OSB.path = '/paymentManagement/payments/open';
		this.OSB.method = 'POST';
		
		let validate = new ValidateService();


		_payload_op.fechaPago 				= ( this.WSRESPONSE.PurchaseDate, this.WSRESPONSE.PurchaseTime ) ? validate.date(  this.WSRESPONSE.PurchaseDate, this.WSRESPONSE.PurchaseTime )	: "2018-03-21T10:53:59",
		_payload_op.lineaProducto 		= this.WSRESPONSE.ProductLine 								|| "",
		_payload_op.comercio 					= this.WSRESPONSE.Commerce 									|| "",
		_payload_op.terminal 					= this.WSRESPONSE.Terminal 									|| "",
		_payload_op.equipos 					= this.WSRESPONSE.Machine 										|| "",
		_payload_op.moneda 						= this.WSRESPONSE.CurrencyType 							|| "",
		_payload_op.cuotas 						= this.WSRESPONSE.NumberOfInstalments 				|| "",
		_payload_op.ingreso 					= this.WSRESPONSE.EntryType 									|| "",
		_payload_op.tipoOperacion 		= this.WSRESPONSE.OperationType 							|| "",
		_payload_op.anulacion 				= this.WSRESPONSE.Cancellation 							|| "",
		_payload_op.numeroTarjeta 		= this.WSRESPONSE.CreditCardNumber 					|| "",
		_payload_op.fechaVencimiento 	= this.WSRESPONSE.CreditCardExpirationDate 	|| "",
		_payload_op.fechaco 					= ( this.WSRESPONSE.PurchaseDate, this.WSRESPONSE.PurchaseTime ) ? validate.date(  this.WSRESPONSE.PurchaseDate, this.WSRESPONSE.PurchaseTime )	: "2018-03-21T10:53:59",
		_payload_op.cuta 							= this.WSRESPONSE.VoucherNumber 							|| "",
		_payload_op.auto 							= this.WSRESPONSE.AuthorizationNumber 				|| "",
		_payload_op.tipoauto 					= this.WSRESPONSE.AuthorizationType 					|| "",
		_payload_op.operador 					= this.WSRESPONSE.Operator 									|| "",
		_payload_op.cuenta 						= this.WSRESPONSE.AccountNumber 							|| "",
		_payload_op.codtarjeta				= this.WSRESPONSE.CreditCardCode 						|| "",
		_payload_op.cliente 					= this.WSRESPONSE.ClientID 									|| "",
		_payload_op.meer 							= this.WSRESPONSE.ResponseCode 							|| "",
		_payload_op.dere 							= this.WSRESPONSE.Response 									|| "",
		_payload_op.lote 							= "",
		_payload_op.suscriptionsPayment = {
			"pagos" : {
				"cupon" : [{
					"suscripcion" : ( this.WSRESPONSE.ClientID ) ? this.WSRESPONSE.ClientID.slice(15, 23) : "",
					"valorpago" 	: this.WSRESPONSE.Amount 										 				|| ""
				}]
			}
		}

		this.osb = new OSBService(this.OSB, _payload_op, (response) => {
			res.send('Servicio registroDePagoOPEN ejecutado');
		});

	}
	anulacionDePagoWS(req, res){
		this.OSB.path = '/paymentManagement/paymentCC';
		this.OSB.method = req.method;

		_payload_ws.TipoOperacion = '1'
		_payload_ws.Anulacion 		= 'S'

		this.osb = new OSBService(this.OSB, _payload_ws, (response) => {
			this.WSRESPONSE = response;
			res.send('Servicio anulacionDePagoWS ejecutado');
		});
	}

	anulacionDePagoOPEN(req, res){
		let _payload_anul_op: any;
		this.OSB.path = '/paymentManagement/payments/open';
		this.OSB.method = req.method;

		_payload_anul_op.contract 		= _payload_op.fechaPago;
		_payload_anul_op.amount 			= this.WSRESPONSE.Amount;
		_payload_anul_op.paymentDate	= _payload_op.fechaPago;

		this.osb = new OSBService(this.OSB, _payload_anul_op, (response) => {
			res.send('Servicio anulacionDePagoOPEN ejecutado');
		});
	}

	cambioDeEstado(req, res){
		this.OSB.path = '/paymentManagement/requestStatus';
		this.OSB.method = req.method;

		let _payload_st = {
			request : this.OPENINFO.IDTRANSACCION,
			status : ( req.body.status === 'success' ) ? 14 : 0
		};

		

		this.osb = new OSBService(this.OSB, _payload_st, (response) => {
			res.send('Servicio cambioDeEstado ejecutado');
		});
	}
}

const paymentComponent = new PaymentComponent();
export default paymentComponent;