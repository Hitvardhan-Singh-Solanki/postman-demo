import socketio from 'socket.io';
import http from 'http';

const MAIN_ROOM = 'MAIN_ROOM';

export default (expressApp, sessionMiddleware) => {
  const server = http.createServer(expressApp);
  const io = socketio(server, { serveClient: false });
  io.use((socket, next) => {
    sessionMiddleware(socket.request, {}, next);
  }).on('connection', socket => {
    socket.on('join', () => {
      const user = socket.request.session.passport.user;
      socket.join(MAIN_ROOM);
      socket.emit('joined', {
        text: `Welcome to the ${MAIN_ROOM}`
      });
      socket.broadcast.to(MAIN_ROOM).emit('USER_JOINED', { user });
    });
    socket.on('disconnect', () => {});
  });
  return server;
};
