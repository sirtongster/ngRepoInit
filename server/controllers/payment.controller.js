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
	const response = (res, callback) => { 
		let response = '';
		res.on('data', (chunk) => {
			response = (res.statusCode === 200) ? console.log(chunk.toString()) : console.log('404');
			callback(response);
		});
		res.on('end', () => {
			console.log('**** RESPONSE END ****');
		});
	};

	const req = http.request(options);
	req.on('response', response);
	req.on('error', (e) => { console.error(`problem with request: ${e.message}`) });
	req.write(JSON.stringify(data.body));
	req.end();
}

const data = {
	solicitudDePago : solicitudDePago,
	registroDePago : registroDePago,
	sendDataToFront : sendDataToFront,
	getInfo : getInfo
};

module.exports = data;