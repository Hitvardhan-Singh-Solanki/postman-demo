import socketio from 'socket.io';
import http from 'http';
import { addUser, removeUser, getAllActiveUsers } from '../sockets/users';

const MAIN_ROOM = 'MAIN_ROOM';

export default (expressApp, sessionMiddleware) => {
  const server = http.createServer(expressApp);
  const io = socketio(server, { serveClient: false });
  io.use((socket, next) => {
    sessionMiddleware(socket.request, {}, next);
  }).on('connection', socket => {
    socket.on('join', currentUser => {
      socket.join(MAIN_ROOM);
      socket.emit('joined', {
        text: `Welcome to the ${MAIN_ROOM}`,
        ...currentUser
      });
      addUser({ ...currentUser, socketid: socket.id });
      socket.broadcast.to(MAIN_ROOM).emit('USER_JOINED', { currentUser });
      io.in(MAIN_ROOM).emit('ROOM_DATA', { users: getAllActiveUsers() });
    });
    socket.on('disconnect', data => {
      // console.log('-----+++++++', socket.id);
      // const user = removeUser(socket.id);
      // io.to(MAIN_ROOM).emit('USER_LEFT', { id: socket.id });
    });
  });
  return server;
};
