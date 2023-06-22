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
  Runner = Matter.Runner,
  Bodies = Matter.Bodies,
  Composite = Matter.Composite;

// setup engine and world
const engine = Engine.create();
const runner = Runner.create();
Runner.run(runner, engine);

// create bodies
const leftPlayer = Bodies.rectangle(-200, 0, 40, 80, { restitution: 0.4 });
const rightPlayer = Bodies.rectangle(200, 0, 40, 80, { restitution: 0.4 });
const ball = Bodies.circle(-180, -100, 40, { restitution: 0.8, mass: 0.1 });
const ground = Bodies.rectangle(0, 200, 1200, 60, { isStatic: true });

// add bodies to world
Composite.add(engine.world, [leftPlayer, rightPlayer, ball, ground]);

// make them jump!
setInterval(() => {
  [leftPlayer, rightPlayer, ball].forEach((body) => {
    body.force = { x: 0, y: -0.05 - 0.1 * Math.random() };
    body.torque = -0.1 + 0.2 * Math.random();
  });
  ball.force = { x: 0, y: -0.003 };
}, 2000);

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

const logSocket = (id, side, isLeaving = false) => {
  const colorIndex = id.charCodeAt(0) % 7;
  const formatString = `\x1b[3${colorIndex}m%s\x1b[0m`;
  console.log(
    formatString,
    `${isLeaving ? '🚪' : '🙋'} total: ${
      io.engine.clientsCount
    }, id: ${id}, side: ${side}`
  );
};

let playerLeftIsTaken = false;

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

  socket.on('disconnect', () => {
    if (player === leftPlayer) playerLeftIsTaken = false;
    logSocket(socket.id, side, true);
  });
});
