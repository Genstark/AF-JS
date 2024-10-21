// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);


app.use(express.static('public'));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

let connections = [];

io.on('connection', (socket) => {
    console.log('A user connected', socket.id);

    socket.on('message', (msg) => {
        console.log('Message received: ' + msg);
        io.emit('message', msg);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected',socket.id);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
