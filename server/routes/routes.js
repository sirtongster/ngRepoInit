const express = require('express');
const path = require('path');
const api = require('../controllers/payment.controller.js');

let router = express.Router();

router.get('/', function(req, res) {
	res.send("Hola Mundo"); // backup en caso de que no cargue angularjs
});

router.route('/solicitudDePago')
	// .get(api.solicitudDePago)
	.post(function(req, res){
		res.sendFile(path.join(__dirname, '../../public', 'index.html'));
	});

router.route('/registroDePago')
	.post(api.registroDePago);

module.exports = router;