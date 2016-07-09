'use strict';

const http = require('http');
const io = require('socket.io');
// const {ipcMain} = require('electron');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer();

let socket = io(server);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

socket.on('connection', (socket) => {
  let _clientInfo = {};

  console.log("Client " + socket.id + " is connected");

  _clientInfo[socket.id] = true;

  let node = document.createElement("li");
  let textnode = document.createTextNode(Object.keys(_clientInfo) + " is connected.");
  node.appendChild(textnode);

  let DOMClientList = document.getElementById("client-list");
  DOMClientList.appendChild(node);
  DOMClientList.className = 'bg-success status-connected';

});
