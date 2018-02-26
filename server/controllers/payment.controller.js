function solicitudDePago(req, res){
	// res.cookie('AppCookieP', req.body);
	// res.send(req.body);
	console.log(req.body);
}

function registroDePago(requ, res){
		
	let http = require('http');
	
	let options = {
		host: 'host.com',
		port: '80',
		path: 'http://osb.cablevision.com.ar.RegisterCCPayment',
		method: 'POST',
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
			'Content-Length': data.length
		}
	};
	
	let req = http.request(options, function(res) {
		let msg = '';
		
		res.setEncoding('utf8');
		res.on('data', function(chunk) {
			msg += chunk;
		});
		res.on('end', function() {
			console.log(JSON.parse(msg));
		});
	});
	
	req.write(data);
	req.end();
}

const data = {
	solicitudDePago : solicitudDePago,
	registroDePago : registroDePago
};

module.exports = data;