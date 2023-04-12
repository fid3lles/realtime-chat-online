import express from 'express';
import http from 'http';
import socketio from 'socket.io';
import path from 'path';

const app = express();
const server = http.createServer(app);
const sockets = socketio(server);
const __dirname = path.resolve();

var messages = [];

app.use(express.static(__dirname + '/public'));

sockets.emit();

sockets.on('connection', (socket) => {
    const userId = socket.id;
    console.log(`> User connected: ${userId}`);
    socket.broadcast.emit('new-user', userId);

    socket.on('disconnect', () => {
        console.log(`> User disconnected: ${userId}`);
    });

    socket.on('send-message', data => {
        messages.push(data);
        console.log("Mensagem recebida:", data);
        socket.broadcast.emit('receveid-message', data);
    });
});

server.listen(3000, () => {
    console.log(`> Server listening on port: 3000`);
});