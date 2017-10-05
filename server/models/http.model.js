// const http = require('http');
// const fs = require('fs');
//
// const protocol = 'https:';
// const host = '172.21.159.2';
// const port = '8457';
// const method = 'POST';
// const path = 'WondersoftAutorizacionPagos.aspx';
// const headers = {
// 	'Content-Type': 'text/xml',
// 	'Accept': 'text/xml'
// };
//
//
// const options = {
// 	protocol: protocol,
// 	host: host,
// 	port: port,
// 	method: method,
// 	path: path,
// 	headers: headers
// };
//
// let args = JSON.parse(fs.readFileSync('../mocks/autorizacionWS.json', 'utf-8', (err, data) => {
// 	if (err) throw err;
// 	return data;
// }));
//
// function sendData(postData, callback){
// 	const req = http.request(options, (res) => { log(res, callback) });
//
// 	req.on('error', (e) => {
// 		console.error(`problem with request: ${e.message}`);
// 	});
//
// // write data to request body => replace 'postData.body' with JSONargs for mocks
// 	req.write(args);
// 	req.end();
// }}
//
// function log(res, callback){
// 	console.log(`STATUS: ${res.statusCode}`);
// 	console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
// 	res.on('data', (chunk) => {
// 		callback();
// 		console.log(`BODY: ${chunk}`);
// 	});
// 	res.on('end', () => {
// 		console.log('No more data in response.');
// 	});
// }
//
// const Data = {
// 	sendData : sendData
// };
//
// module.exports = Data;