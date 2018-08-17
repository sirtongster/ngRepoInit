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
	console.log('*****TEST*****TEST*****TEST*****TEST*****');
	console.log(JSON.stringify(payload));
	console.log('*****TEST*****TEST*****TEST*****TEST*****');
	req.write(JSON.stringify(payload));
	req.end();
}

export default _osb;


// import http from 'http';
// import validate from '../services/validate.service.js';

// class OSB{

// 	constructor(){
// 		this.payload = {};
// 		this.osb = {
// 			protocol: 'http:',
// 			host: process.env.host,
// 			port: process.env.port, 
// 			path: '',
// 			method: '',
// 			headers: {
// 				'Content-Type': 'application/json; charset=utf-8',
// 				'Accept': 'application/json'
// 			}
// 		};
// 		this.callback;
// 		this.callbackErr;
// 	}

// 	send( osb, payload, callback, callbackErr ){
// 		this.osb.path 		= osb.path;
// 		this.osb.method 	= osb.method;
// 		this.payload			= payload;
// 		this.callback 		= callback;
// 		this.callbackErr 	= callbackErr;
		
// 		this.req = http.request( this.osb );
	
// 		console.log('CALLBACK');
// 		console.log(this.callback);

// 		this.req.on('response', this.response);
// 		this.req.on('error', this.error);
// 		this.req.write(JSON.stringify( this.payload ));
// 		this.req.end();
// 	}

// 	response( _res ){
// 		_res.on('data', ( chunk ) => {
// 			let response = chunk.toString();
// 			console.log(response);
// 			response = JSON.parse(response);
// 			( validate.payment( response ) ) ?
// 				this.callback( response ) :
// 				this.callbackErr( response );
// 		});
// 		_res.on('end', () => {
// 			console.log('**** RESPONSE END ****');
// 		});
// 	}

// 	error( e ){
// 		console.error(`problem with request: ${ e.message }`);
// 	}
// }

// const _osb = new OSB();
// export default _osb;