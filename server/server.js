const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const methodOverride = require('method-override');
const port = process.env.PORT || 7777;

// Server
let app = express();
let server = require('http').Server(app);
let io = require('socket.io')(server);

// Config
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method-Override'));

// Statics
app.use('/', express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api', require('./server/routes/routes'));

// Server start
server.listen(port, () => {
	console.log( "Listening on, server_port " + port )
});
