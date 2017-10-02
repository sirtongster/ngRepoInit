const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const methodOverride = require('method-override');
const port = process.env.PORT || 7777;

/** SERVER **/
let app = express();
let server = require('http').Server(app);
let io = require('socket.io')(server);

/** CONFIG **/
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(cookieParser());


/** SOCKET CONNECTION **/
// io.on('connection', (socket) => {
// 	console.log('A user connected');
// 	socket.emit('message', {
//
// 	})
// });

/** STATICS **/
app.use('/', express.static(path.join(__dirname, 'public')));

/** ROUTES **/
app.use('/api', require('./server/routes/routes'));

/** SERVER START **/
server.listen(port, () => {
	console.log( "Listening on, server_port " + port )
});
