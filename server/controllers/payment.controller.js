let path = require('path');
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
	console.log(req.body);
	const http = require('http');
	
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
	};
	const response = (_res) => {
		_res.on('data', (chunk) => {
			let response = '';
			response = chunk.toString();
			// response = 	(_res.statusCode === 200) ? chunk.toString() : 
			// 			(_res.statusCode === 300) ? '302' :
			// 			(_res.statusCode === 404) ? '404' : '500';

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
	_req.write(JSON.stringify(req.body));
	_req.end();
}

function registroDePagoOPEN(){
	
}

const data = {
	solicitudDePago : solicitudDePago,
	registroDePagoWS : registroDePagoWS,
	infoDePagoWS : infoDePagoWS,
	registroDePagoOPEN : registroDePagoOPEN
};

module.exports = data;