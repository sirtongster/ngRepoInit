import path from 'path';
import fs 	from 'fs';

import payment from '../services/payment.service.js';
import validate from '../services/validate.service.js';
import osb from '../services/osb.service.js';
import _health from '../services/health.service.js';

let OPENINFO = {};

/** TESTING */
const OPENINFO_TEST = {
	"IDTRANSACCION" : '403493097',
	"TIMESPAN" 			: '20180508025750878373000',
	"TIPOOPERACION" : 'A',
	"IMPORTE" 			: '000000135899',
	"CUOTAS" 				: '01',
	"LINEAPRODUCTO" : '005',
	"EQUIPO" 				: '000',
	"CUPONORIGINAL" : '',
	"FECHAORIGINAL" : '',
	"TIPOT" 				: '',
	"ID_CLIENTE" 		: '00000005286955863468205043 TESTING                       000430448365                          OPEN '
};

// OPENINFO = OPENINFO_TEST;
/** END TESTING */


// POST request
function solicitudDePago(req, res){
	OPENINFO = req.body;
	console.log( req.body );
	res.sendFile(path.join(__dirname, '../../public', 'index.html'));
}

function makeAPayment(req, res){

	if( !validate.isEmptyObject( OPENINFO )){
		console.log( OPENINFO );
		if ( validate.isAnulment( OPENINFO ) ){ 
			payment.anulacionDePagoWS( OPENINFO, req.body, (data) => {
				res.status(data.status);
				res.send(data.message);
			})
		} else {
			payment.registroDePagoWS( OPENINFO, req.body, (data) => {
				res.status(data.status);
				res.send(data.message);
			});
		}
	} else {
		console.log('Error de datos de OPEN');
		res.status(500);
		res.send('No existe información del cliente');
	}

}

function status(req, res){
	let OSB = {};
	OSB.path = '/paymentManagement/requestStatus';
	OSB.method = 'POST';

	let _payload_st = {
		request : OPENINFO.IDTRANSACCION,
		status : ( req.body.status === 'success' ) ? 14 : 0
	};

	osb(OSB, _payload_st, (response) => {
		res.send('Servicio cambioDeEstado ejecutado');
	}, ( err ) => {
		res.send(err);
	});
}

function health(){
	OSB.path = '/paymentManagement/paymentCC';
	OSB.method = POST

	osb(OSB, _payload_ws, ( response ) => {
		// (response) ? 
	});


	OSB.path = '/paymentManagement/payments/open';
	OSB.method = 'POST';

	OSB.path = '/paymentManagement/paymentCC';
	OSB.method = req.method
}

const data = {
	solicitudDePago 		: solicitudDePago,
	makeAPayment 				: makeAPayment,
	status 							: status,
	health							: health
};

module.exports = data;