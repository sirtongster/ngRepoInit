import http from 'http';

let _osb = (OSB, payload, callback, callbackErr) => {
	const req = http.request(OSB);

	const response = (_res) => {
		_res.on('data', (chunk) => {
			let response = chunk.toString();
			response = JSON.parse(response);
			console.log(response);
			if( validate.payment( response ) ){
				callback( response );
			} else {
				callbackErr( "error" );
			};
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