const express = require('express');
const path = require('path');
const api = require('../controllers/payment.controller.js');

let router = express.Router();

router.get('/', function(req, res) {
	res.send("Hola Mundo"); // backup en caso de que no cargue angularjs
});

// Solicitud realizada por OPEN(1)
router.route('/solicitudDePago')
	.post(api.solicitudDePago);

router.route('/payment')
	.post(makeAPayment);

router.route('/health')
	.get(api.health)
	
module.exports = router;