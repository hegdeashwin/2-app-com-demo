'use strict';

const http = require('http');
const io = require('socket.io');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer();

let socket = io(server);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

socket.on('connection', function(socket) {
  console.log("Client " + socket.id + " is connected");

  socket.emit('acknowledge', {
    "status": true,
    "msg": "Hello " + socket.id
  });
  
});
