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
    // connections.push(socket.id);
    console.table(connections);

    socket.on('user_info', (data) => {
        const userObject = {
            email: data.email,
            socketId: socket.id,
        };
        connections.push(userObject);
        console.table(connections);
    });

    socket.on('message', (msg) => {
        console.log('Message received: ', msg);
        io.emit('message', JSON.stringify({ message: Math.floor(Math.random() * 10000000) }));
    });

    socket.on('reply', (data) => {
        console.log('data:', data);
        io.emit('reply', JSON.stringify({ message: Math.floor(Math.random() * 10000000) }));
    });

    socket.on('replyback', (data) => {
        console.log('data:', data);
        io.to(connections[0]).emit('replyback', JSON.stringify({ message: Math.floor(Math.random() * 10000000) }));
    });

    socket.on('disconnect', () => {
        console.log('User disconnected', socket.id);
        const findindex = connections.findIndex((conn) => conn.id === socket.id);
        connections.splice(findindex, 1);
        console.table(connections);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});