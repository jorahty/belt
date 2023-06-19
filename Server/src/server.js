const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = 3000;

app.use(express.static('public'));

http.listen(port, () => console.log(`Listening on *:${port}`));

const logSocket = (socketId, count) => {
  const colorIndex = socketId.charCodeAt(0) % 7;
  const formatString = `\x1b[3${colorIndex}m%s\x1b[0m`;
  console.log(formatString, `total: ${count}, connect: ${socketId}`);
};

let count = 0;

io.on('connect', (socket) => {
  logSocket(socket.id, ++count);

  socket.on('disconnect', () => {
    logSocket(socket.id, --count);
  });
});

setInterval(() => {
  io.volatile.emit('update', Math.random());
}, 1000 / 60);
