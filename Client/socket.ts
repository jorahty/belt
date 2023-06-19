import io from 'socket.io-client';

const socketEndpoint = 'http://192.168.5.117:3000';

export const socket = io(socketEndpoint, {
  transports: ['websocket'],
});
