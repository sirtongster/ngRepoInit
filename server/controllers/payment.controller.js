
function getPaymentData(req, res){
	res.sendFile('index.html', { root: 'dist/public' });
}

function postPaymentData(req, res){
	res.cookie('AppCookieP', req.body);
	res.send(req.cookies.AppCookieP);
	res.sendFile('index.html', { root: 'dist/public' }, (err)=>{ if (err) throw err; });
	
	// console.log({
	// 	connection 	: "successful",
	// 	status		: "200",
	// 	data		: req.body
	// });
}

const data = {
	postPaymentData : postPaymentData,
	getPaymentData : getPaymentData
};

module.exports = data;