// client.js
const io = require('socket.io-client');

// Connect to the Express Socket.IO server
const socket = io('http://localhost:3000');

socket.on('connect', () => {
    console.log('Connected to server', socket.id);
});

// Event handler for incoming messages
socket.on('message', (data) => {
    console.log('Message from server:', data);
});

socket.on('replyback', (data) => {
    console.log('data:', data);
});

// Event handler for disconnection
socket.on('disconnect', () => {
    console.log('Disconnected from server');
});
