// server.js
const express = require('express');
const SocketServer = require('ws').Server;
const uuidV4 = require('uuid/v4');
const WebSocket = require('ws');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// wss.broadcast = function broadcast(data){
//   wss.clients.forEach(function each(client) {
//     if (client.readyState === WebSocket.OPEN) {
//       client.send(data);
//     }
//   });
// }

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.on('message', (message) => {
    const parsedMessage = JSON.parse(message);
    parsedMessage.id = uuidV4();
    const id = parsedMessage.id;
    const username = parsedMessage.username;
    const content = parsedMessage.content;
    console.log(`User ${username} sent a message with the id ${id}. It said "${content}."`);
    const stringifiedMessage = JSON.stringify(parsedMessage);

    wss.clients.forEach(function each (client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(stringifiedMessage);
      }
    });
  });
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});

