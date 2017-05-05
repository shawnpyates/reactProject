// server.js
const express = require('express');
const SocketServer = require('ws').Server;
const uuidV4 = require('uuid/v4');
const WebSocket = require('ws');

// Set the port to 3001
const PORT = 3001;

// assign each user a color out of this array randomly
const colors = ['blue', 'red', 'green', 'purple'];

function getRandomColor(arr) {
  return arr[Math.floor(Math.random() * 3 + 1)];
}
// Create a new express server
const server = express()

// Make the express server serve static assets (html, javascript, css) from the /public folder
.use(express.static('public'))
.listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// broadcast data to all clients
wss.broadcast = function broadcast(data){
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}


// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

wss.on('connection', (ws) => {
  ws.send(JSON.stringify({type: 'setColor', color: getRandomColor(colors)}));
  wss.broadcast({
    type: 'connectionCountChange',
    content: wss.clients.size
  });
  ws.on('message', (message) => {
    const parsedMessage = JSON.parse(message);
    // logic here
    if (parsedMessage.type === 'postMessage') {
      parsedMessage.id = uuidV4();
      parsedMessage.type = 'incomingMessage';
    } else if (parsedMessage.type === 'postNotification') {
      parsedMessage.id = uuidV4();
      parsedMessage.type = 'incomingNotification';
    }
    wss.broadcast(parsedMessage);
  });
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    wss.broadcast({
      type: 'connectionCountChange',
      content: wss.clients.size
    });
  });
});

