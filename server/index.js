const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use(router);

io.on('connection', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    console.log(name, room)

    const error = true;

    // if(error) {
    //   callback({ error: 'error' });
    // }

  });
  socket.on('disconnect', () => {
    console.log('disconnected from ', socket.id);
  });
});

server.listen(process.env.PORT || 4000, () => console.log(`Server has started.`));