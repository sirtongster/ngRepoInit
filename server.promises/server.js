const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const methodOverride = require('method-override');
const port = process.env.PORT || 7777;

/** SERVER **/
let app = express();
let server = require('http').Server(app);

/** CONFIG **/
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(cookieParser());
app.use(cors());
app.use(function(req, res, next){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

/** STATICS **/
app.use('/', express.static(path.join(__dirname, 'public')));

/** ROUTES **/
app.use('/pago', require('./server/routes/routes'));

/** SERVER START **/
server.listen(port, () => {
	console.log( "Listening on, server_port " + port )
});
