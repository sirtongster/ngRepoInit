import path from 'path';
import fs 	from 'fs';

import payment from '../services/payment.service.js';
import validate from '../services/validate.service.js';
import osb from '../services/osb.service.js';
import _health from '../services/health.service.js';

let OPENINFO = {};

/** TESTING */
let OPENINFO_TEST = {
	"LINEAPRODUCTO" : "005",
	"EQUIPO" 				: "",
	"IMPORTE" 			: "000000001000",
	"TIPOOPERACION" : "1",
	"CUPONORIGINAL" : "",
	"FECHAORIGINAL" : "",
	"ID_CLIENTE" 		: "00000000072767012368912043 APX_AOGAS                     00145627219                           OPEN ",
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
		console.log( OPENINFO );
		if ( validate.isAnulment(OPENINFO) ){ 
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