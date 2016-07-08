'use strict';

const io = require('socket.io-client');

let socket = io.connect('http://localhost:3000', {
	'reconnectionAttempts': 3
});

socket.on('connect', () => {

  console.log("Client " + socket.id + " is connected");

  socket.on('acknowledge', function(res) {
    console.log(res);
  });

});

socket.on('disconnect', function() {
	console.info(' Info: Server got disconnected');
	// process.exit(0);
});

socket.on('connect_error', function() {
	console.error(' Info: Connection error, server got disconnected');
  // process.exit(0);
});
