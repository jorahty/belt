import io from 'socket.io-client';

// Typically use https://belt.jorahty.repl.co
export const socketEndpoint = 'https://belt.jorahty.repl.co';

export const socket = io(socketEndpoint, {
  transports: ['websocket'],
});
