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

// Llamada y solicitud al registro de pago de WONDERSOFT(2, 3)
router.route('/pagoWS')
	.post(api.registroDePagoWS);

// Registro de pago final en OPEN(4)
router.route('/pagoOPEN')
	.post(api.registroDePagoOPEN);

module.exports = router;