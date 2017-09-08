const express = require('express');
const path = require('path');

let router = express.Router();

router.get('/', function(req, res) {
	res.send("Hola Mundo"); // backup en caso de que no cargue angularjs
});

module.exports = router;


