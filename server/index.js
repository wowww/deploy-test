const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const PORT = process.env.PORT || 4000;

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// app.use(cors());
app.use(router);

// io.on('connect', (socket) => {
//   console.log('We have a new connetion!');

//   socket.on('join', ({ name, room }) => {
//     console.log(name, room);
//   })
  
//   socket.on('disconnect', () => {
//     console.log('User had left!');
//   })
// })
io.on('connection', function(socket) {
  // Listen for test and disconnect events
  socket.on('test', (data) => {
    console.log('received: "' + data + '" from client' + socket.id);
    socket.emit('test', "Ok, i got it, " + socket.id);
  });

  socket.on('disconnect', () => {
    console.log('disconnected from ', socket.id);
  });
});;

// app.use(router);

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
