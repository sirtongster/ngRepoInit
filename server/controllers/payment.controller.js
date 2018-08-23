import path from 'path';
import fs 	from 'fs';

import payment from '../services/payment.service.js';
import validate from '../services/validate.service.js';
import osb from '../services/osb.service.js';
import logger from '../services/log.service.js';
import _health from '../services/health.service.js';

let OPENINFO = {};

/** TESTING */
// const OPENINFO_TEST = { 
// 	"IDTRANSACCION"	: '403767638',
//   "TIMESPAN"			: '20180816025924276788000',
//   "TIPOOPERACION"	: 'C',
//   "IMPORTE"				: '000000010000',
//   "CUOTAS"				: '01',
//   "LINEAPRODUCTO"	: '003',
//   "EQUIPO"				: '000',
//   "CUPONORIGINAL"	: '00000618',
//   "FECHAORIGINAL"	: '03/07/18',
//   "TIPOT"					: '',
// 	"ID_CLIENTE"		: '00000005070436113016367043 TESTING                       000418089334                          OPEN '
// };

const OPENINFO_TEST = { 
	"IDTRANSACCION"	: '403767638',
  "TIMESPAN"			: '20180816025924276788000',
  "TIPOOPERACION"	: 'C',
  "IMPORTE"				: '000000164500',
  "CUOTAS"				: '01',
  "LINEAPRODUCTO"	: '003',
  "EQUIPO"				: '000',
  "CUPONORIGINAL"	: '',
  "FECHAORIGINAL"	: '',
  "TIPOT"					: '',
	"ID_CLIENTE"		: '00000005070436113016367043 TESTING                       000418089334                          OPEN ',
	"TERMINAL"			: '',
	"COMERCIO"			: ''
};

// OPENINFO = OPENINFO_TEST;

/** END TESTING */


// POST request
function solicitudDePago(req, res){
	OPENINFO = req.body;
	res.sendFile(path.join(__dirname, '../../public', 'index.html'));
}

function makeAPayment(req, res){

	if( !validate.isEmptyObject( OPENINFO )){
		logger.debug( OPENINFO, {title: 'Info de OPEN'} );
		if ( validate.isAnulment( OPENINFO ) ){ 

			payment.anulacionDePagoWS( OPENINFO, req.body )
				.then( data => {
					res.status(data.status);
					res.send(data.message);
				})
				.catch( err => {
					res.status(err.status);
					res.send(err.message);
				});

		} else {
			payment.registroDePagoWS( OPENINFO, req.body )
				.then( data => {
					res.status(data.status);
					res.send(data.message);
				})
				.catch( err => {
					res.status(err.status);
					res.send(err.message);
				});
		}
	} else {
		logger.error('', {title: 'Error de datos de OPEN'});
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

	osb(OSB, _payload_st)
		.then( data => {
			res.send('Servicio cambioDeEstado ejecutado');
		})
		.catch( err => {
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