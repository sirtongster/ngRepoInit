import http from 'http';
import validate from '../services/validate.service.js';

let _OSB = {
	protocol: 'http:',
	host: process.env.host,
	port: process.env.port, 
	path: '',
	method: '',
	headers: {
		'Content-Type': 'application/json'
	}
}

delete _OSB.headers["Content-Length"];

let _osb = (OSB, payload, callback, callbackErr) => {
	_OSB.path = OSB.path;
	_OSB.method = OSB.method;

	if(_OSB.method === 'DELETE'){
		_OSB.headers["Content-Length"] = Buffer.byteLength(JSON.stringify(payload, undefined, 2));
	}

	console.log('**** PAYLOAD ****');
	console.log(_OSB);
	console.log('**** PAYLOAD END ****');

	const req = http.request(_OSB);

	const response = (_res) => {
		_res.on('data', (chunk) => {
			console.log('**** RESPONSE START ****');
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
	console.log('***** REQUEST START *****');
	console.log(JSON.stringify(payload, undefined, 2));
	console.log('***** REQUEST END *****');
	req.write(JSON.stringify(payload, undefined, 2));
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