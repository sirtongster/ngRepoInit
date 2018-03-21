import _payload_ws from '../mocks/registro-de-pago-WS.json';
// import _payload_op from '../mocks/registro-de-pago-OPEN.json';

import http from 'http';
import path from 'path';
import fs 	from 'fs';

let info = {};

// POST request
function solicitudDePago(req, res){
	info = req.body;
	res.sendFile(path.join(__dirname, '../../public', 'index.html'));
}

function infoDePagoWS(req, res){
	res.send(info);
}

function registroDePagoWS(req, res){
	
	const load_payload = (()=>{
		for(let item in req.body){
			if(_payload_ws.hasOwnProperty(item)){
				_payload_ws[item] = req.body[item];
			}
		}
	})();

	const options = {
		protocol: 'http:',
		host: 'sr-osb12-ad02',
		port: '10001',
		path: '/paymentManagement/paymentCC',
		method: 'POST',
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
			'Accept': 'application/json'
		}
	};{}
	const response = (_res) => {
		_res.on('data', (chunk) => {
			let response = chunk.toString();
			console.log(response);
			res.send(response);
		});
		_res.on('end', () => {
			console.log('**** RESPONSE END ****');
		});
	};
	const error = (e) => {
		console.error(`problem with request: ${e.message}`);
	};
	const _req = http.request(options);

	_req.on('response', response);
	_req.on('error', error);
	_req.write(JSON.stringify(_payload_ws));
	_req.end();

}

function registroDePagoOPEN(req, res){
	let _payload_op = req.body;

	const options = {
		protocol: 'http:',
		host: 'sr-osb12-ad02',
		port: '10001',
		path: '/paymentManagement/payments/open',
		method: 'POST',
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
			'Accept': 'application/json'
		}
	};{}
	const response = (_res) => {
		_res.on('data', (chunk) => {
			let response = chunk.toString();
			console.log(response);
			res.send(response);
		});
		_res.on('end', () => {
			console.log('**** RESPONSE END ****');
		});
	};
	const error = (e) => {
		console.error(`problem with request: ${e.message}`);
	};
	const _req = http.request(options);
	console.log(_payload_op);
	_req.on('response', response);
	_req.on('error', error);
	_req.write(JSON.stringify(_payload_op));
	_req.end();

}

const data = {
	solicitudDePago : solicitudDePago,
	registroDePagoWS : registroDePagoWS,
	infoDePagoWS : infoDePagoWS,
	registroDePagoOPEN : registroDePagoOPEN
};

module.exports = data;