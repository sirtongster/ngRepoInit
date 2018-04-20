const http = require( 'http' );
import validate from './validate.service.js';

export class OSBService{
	callback: Function;

	constructor(OSB: {}, payload: {}, callback: Function){
		this.callback = callback
		
		let req = http.request(OSB);

		req.on('response', this.response);
		req.on('error', this.error);
		req.write( JSON.stringify(payload) );
		req.end();
	}

	private response( _res:any ){
		_res.on('data', (chunk) => {
			let response = chunk.toString();
			console.log(response);
			this.callback(response);
		});
		_res.on('end', () => {
			console.log('**** RESPONSE END ****');
		});
	}
	private error( e: any ){
		console.error(`problem with request: ${ e.message }`);
	}
}

export default OSBService;