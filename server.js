import express from 'express';
import http from 'http';
import socketio from 'socket.io';

const app = express();
const server = http.createServer(app);
const sockets = socketio(server);

var messages = [];

app.use(express.static('public'));

sockets.emit();

sockets.on('connection', (socket) => {
    const userId = socket.id;
    console.log(`> User connected: ${userId}`);

    socket.on('disconnect', () => {
        console.log(`> User disconnected: ${userId}`);
    });

    socket.on('send-message', data => {
        messages.push(data);
        socket.broadcast.emit('receveid-message', data);
    });
});

server.listen(3000, () => {
    console.log(`> Server listening on port: 3000`);
});