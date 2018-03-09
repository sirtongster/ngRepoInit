let path = require('path');
let info = {};

// GET request
function sendDataToFront(req, res){
	console.log(info);
	res.sendFile(path.join(__dirname, '../../public', 'index.html'));
}
// POST request
function solicitudDePago(req, res){
	info = req.body;
}

function getInfo(req, res){
	res.send(info);
}

function registroDePago(data, callback){
	let http = require('http');
	
	let options = {
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

	
	let req = http.request(options, (res) => {	
		response(res, callback);
	});

	req.on('error', (e) => { console.error(`problem with request: ${e.message}`) });
	req.write(JSON.stringify(data.body));
	req.end();
}

function response(res, callback){
	let response = '';

	res.on('data', (chunk) => {
		response = response + chunk.toString();
	});
	res.on('end', () => {
	    try {
			callback.send(response);
	    	console.log(response);
	    } catch (e) {
	    	console.error(e.message);
	    }
	});
}

const data = {
	solicitudDePago : solicitudDePago,
	registroDePago : registroDePago,
	sendDataToFront : sendDataToFront,
	getInfo : getInfo
};

module.exports = data;