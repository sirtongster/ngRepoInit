import http from 'http';
import validate from '../services/validate.service.js';
import logger from '../services/log.service.js';


const _osb = (OSB, payload) => {
	
	return new Promise( (resolve, reject) => {	
		let _OSB = {
			protocol: 'http:',
			host: process.env.host,
			port: process.env.port, 
			path: OSB.path,
			method: OSB.method,
			headers: {
				'Content-Type': 'application/json'
			}
		}
		
		// delete _OSB.headers["Content-Length"];
	
		/** LOGGER */
		logger.debug(_OSB.headers, {title: 'Headers'});
		logger.debug(payload, {
			title: `${ _OSB.protocol }//${ _OSB.host }:${ _OSB.port }${ _OSB.path }`
		});
		/** /LOGGER */
		
		/** VERIFICAR COMO MODIFICAR ESO */
		if(_OSB.method === 'DELETE'){
			_OSB.headers["Content-Length"] = Buffer.byteLength(JSON.stringify(payload, undefined, 2));
		}

		const req = http.request(_OSB);
		const response = (_res) => {			
			const body = [];
			if (_res.statusCode < 200 || _res.statusCode > 299) {
				reject(new Error('Failed to load page, status code: ' + _res.statusCode));
			}

			_res.on('data', (chunk) => {
				body.push(chunk);				
				( validate.payment( JSON.parse(body.join('')) )) ?
					resolve( body.join('') ) :
					reject( body.join('') );

			});
			_res.on('end', () => {
				resolve( body.join('') );
			});
		};
		const error = ( err ) => {
			reject( err );
		};

		req.on('response', response);
		req.on('error', error);
		req.write(JSON.stringify(payload, undefined, 2));
		req.end();
	})
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