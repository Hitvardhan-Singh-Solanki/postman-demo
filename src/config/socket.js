import io from 'socket.io';
import http from 'http';

export default expressApp => {
  const server = http.createServer(expressApp);
  const socket = io(server, { serveClient: false });
  socket.on('connection', newSocket => {
    console.log('New client connected');
    newSocket.on('message', msg => {
      console.log(msg);
    });
    newSocket.on('disconnect', () => console.log('Client disconnected'));
  });
  return server;
};
