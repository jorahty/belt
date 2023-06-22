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

let position = 0;
let direction = 1;

setInterval(() => {
  if (position > 10) direction = -1;
  if (position < -10) direction = 1;
  position = position + 0.08 * direction;
  position = Math.round(position * 100) / 100;
}, 1000 / 120);

setInterval(() => {
  io.volatile.emit('move', position);
}, 1000 / 60);
