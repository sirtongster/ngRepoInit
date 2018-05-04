import http from 'http';
import validate from '../services/validate.service.js';

let _OSB = {
	protocol: 'http:',
	host: process.env.host,
	port: process.env.port, 
	path: '',
	method: '',
	headers: {
		'Content-Type': 'application/json; charset=utf-8',
		'Accept': 'application/json'
	}
}

let _osb = (OSB, payload, callback, callbackErr) => {
	_OSB.path = OSB.path;
	_OSB.method = OSB.method;

	const req = http.request(_OSB);

	const response = (_res) => {
		_res.on('data', (chunk) => {
			let response = chunk.toString();
			console.log(response);
			response = JSON.parse(response);
			( validate.payment( response ) ) ?
				callback( response ) :
				callbackErr( response );
		});
		_res.on('end', () => {
			console.log('**** RESPONSE END ****');
		});
	};
	const error = (e) => {
		console.error(`problem with request: ${e.message}`);
	};

	req.on('response', response);
	req.on('error', error);
	req.write(JSON.stringify(payload));
	req.end();
}

export default _osb;