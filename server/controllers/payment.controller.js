import _payload_ws from '../mocks/registro-de-pago-WS.json';
import _payload_op from '../mocks/registro-de-pago-OPEN.json';

import path from 'path';
import fs 	from 'fs';

import payment from '../services/payment.service.js';
import validate from '../services/validate.service.js';
import osb from '../services/osb.service.js';
import health from '../services/health.service.js';

let OPENINFO = {};
let WSRESPONSE = {};


// POST request
function solicitudDePago(req, res){
	OPENINFO = req.body;
	res.sendFile(path.join(__dirname, '../../public', 'index.html'));
}

function makeAPayment(req, res){
	// Llamar a registro
	// Registro?
	// llamar a reg open
	// sino llamar anul ws

}

function cambioDeEstado(req, res){
	OSB.path = '/paymentManagement/requestStatus';
	OSB.method = req.method;

	let _payload_st = {
		request : OPENINFO.IDTRANSACCION,
		status : ( req.body.status === 'success' ) ? 14 : 0
	};

	

	osb(OSB, _payload_st, (response) => {
		res.send('Servicio cambioDeEstado ejecutado');
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
	cambioDeEstado 			: cambioDeEstado,
	health							: health
};

module.exports = data;