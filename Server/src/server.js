const Matter = require('matter-js');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = 3000;

app.use(express.static('public'));

http.listen(port, () => console.log(`Listening on *:${port}`));

// module aliases
const Engine = Matter.Engine,
  Events = Matter.Events,
  Runner = Matter.Runner,
  Body = Matter.Body,
  Bodies = Matter.Bodies,
  Composite = Matter.Composite;

// setup engine and world
const engine = Engine.create();
const runner = Runner.create();
Runner.run(runner, engine);

// create bodies
const leftPlayer = Bodies.rectangle(-200, 0, 40, 80, { restitution: 0.4 });
const rightPlayer = Bodies.rectangle(200, 0, 40, 80, { restitution: 0.4 });
const ball = Bodies.circle(-180, -100, 40, { restitution: 0.8, mass: 0.2 });
const ground = Bodies.rectangle(0, 200, 1200, 60, { isStatic: true });

// add bodies to world
Composite.add(engine.world, [leftPlayer, rightPlayer, ball, ground]);

// broadcast movement
setInterval(() => {
  io.volatile.emit(
    'move',
    [
      leftPlayer.position.x,
      leftPlayer.position.y,
      leftPlayer.angle,
      rightPlayer.position.x,
      rightPlayer.position.y,
      rightPlayer.angle,
      ball.position.x,
      ball.position.y,
      ball.angle,
    ].map((n) => Math.round(n * 100) / 100)
  );
}, 1000 / 60);

let count = 0;

const logSocket = (id, side, isLeaving = false) => {
  const colorIndex = id.charCodeAt(0) % 7;
  const formatString = `\x1b[3${colorIndex}m%s\x1b[0m`;
  count = isLeaving ? count - 1 : count + 1;
  console.log(
    formatString,
    `${isLeaving ? '🚪' : '🙋'} total: ${
      io.engine.clientsCount
    }-${count}, id: ${id}, side: ${side}`
  );
};

let playerLeftIsTaken = false;
const boostStrength = 0.005;

io.on('connect', (socket) => {
  let player;

  if (playerLeftIsTaken == false) {
    player = leftPlayer;
    playerLeftIsTaken = true;
  } else {
    player = rightPlayer;
  }

  const side = player === leftPlayer ? 'left' : 'right';
  logSocket(socket.id, side);
  socket.emit('side', side);

  socket.on('b', () => (player.isBoosting = true));
  socket.on('B', () => (player.isBoosting = false));

  const movePlayer = () => {
    if (player.isBoosting)
      player.force = {
        x: boostStrength * Math.sin(player.angle),
        y: -boostStrength * Math.cos(player.angle),
      };
  };

  socket.on('i', () => (player.initialAngle = player.angle));
  socket.on('d', (delta) => {
    Body.setAngularVelocity(player, 0);
    Body.setAngle(player, player.initialAngle + delta * 0.01);
  });
  socket.on('r', (angle) => {
    Body.setAngularVelocity(player, 0);
    Body.setAngle(player, player.angle - angle);
  });

  Events.on(engine, 'beforeUpdate', movePlayer);

  socket.on('disconnect', () => {
    if (player === leftPlayer) playerLeftIsTaken = false;
    Events.off(engine, 'beforeUpdate', movePlayer);
    logSocket(socket.id, side, true);
  });
});
