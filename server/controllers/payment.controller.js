import path from 'path';
import fs 	from 'fs';

import payment from '../services/payment.service.js';
import validate from '../services/validate.service.js';
import osb from '../services/osb.service.js';
import _health from '../services/health.service.js';

let OPENINFO = {};

/** TESTING */
const OPENINFO_TEST = { 
	"IDTRANSACCION"	: '403713280',
  "TIMESPAN"			: '20180703035133406448000',
  "TIPOOPERACION"	: 'A',
  "IMPORTE"				: '000000010000',
  "CUOTAS"				: '01',
  "LINEAPRODUCTO"	: '009',
  "EQUIPO"				: '4',
  "CUPONORIGINAL"	: '00000618',
  "FECHAORIGINAL"	: '03/07/18',
  "TIPOT"					: '',
	"ID_CLIENTE"		: '00000005070436113016367043 TESTING                       000418089334                          OPEN '
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