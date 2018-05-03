import http from 'http';

let _osb = (OSB, payload, callback) => {
	const req = http.request(OSB);

	const response = (_res) => {
		_res.on('data', (chunk) => {
			let response = chunk.toString();
			console.log(response);
			callback(response);
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