import http from 'http';
import validate from '../services/validate.service.js';

export class OSB{

	payload = {};
	osb = {
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

	constructor(osb, payload){
		this.osb.path = osb.path;
		this.osb.method = osb.method;
		this.payload = payload;
	}

	send( callback, callbackErr ){
		const req = http.request( this.osb );
	
		req.on('response', this.response);
		req.on('error', this.error);
		req.write(JSON.stringify( this.payload ));
		req.end();
	}

	response( _res ){
		_res.on('data', ( chunk ) => {
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
	}

	error( e ){
		console.error(`problem with request: ${ e.message }`);
	}
}

export default OSB;