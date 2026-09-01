const express = require('express');
const http = require('http');
const { createBareServer } = require('@tomphttp/bare-server-node');

const app = express();
const server = http.createServer();
const bareServer = createBareServer('/bare/');

app.get('/', (req, res) => {
  res.send('Bare server is running');
});

server.on('upgrade', (req, socket, head) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeUpgrade(req, socket, head);
  } else {
    socket.destroy();
  }
});

server.on('request', (req, res) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeRequest(req, res);
  } else {
    app(req, res);
  }
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log('Bare server listening on port', PORT);
});