
// Static Express server
const express = require('express');
const socketio = require('socket.io');
const http = require('http');

// Create HTTP server
const app = express();
const server = http.Server(app);

// Create web socket server
const io = socketio(server);

// Init server messages
const globalMessages = [];

// Listen for new socket client
io.on('connection', (socket) => {
  socket.on('new_message', (message) => {
    globalMessages.unshift(message);
    // Broadcast new message to all connected clients
    socket.broadcast.emit('new_message', message);
  });
})

// Server "app" directory
app.use(express.static(`${__dirname}/../app`));

// Server "node_modules" directory
app.use('/modules', express.static(`${__dirname}/../node_modules`));

// Start Server
server.listen( 8000, () => console.log('Photo Message running on localhost:8000'));
