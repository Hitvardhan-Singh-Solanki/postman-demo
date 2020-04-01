import socketio from 'socket.io';
import http from 'http';
import { addUser, removeUser, getAllActiveUsers } from '../sockets/users';
import { startTime } from '../utils';

const MAIN_ROOM = 'MAIN_ROOM';

export default (expressApp, sessionMiddleware) => {
  const server = http.createServer(expressApp);
  const io = socketio(server, { serveClient: false });
  io.use((socket, next) => {
    sessionMiddleware(socket.request, {}, next);
  }).on('connection', socket => {
    console.log(`${startTime()} new client connected`, socket.id);
    socket.on('join', currentUser => {
      socket.join(MAIN_ROOM);
      socket.emit('joined', {
        text: `Welcome to the club!`,
        ...currentUser
      });
      addUser({ ...currentUser, socketid: socket.id });
      socket.broadcast.to(MAIN_ROOM).emit('USER_JOINED', { currentUser });
      io.in(MAIN_ROOM).emit('ROOM_DATA', { users: getAllActiveUsers() });
    });
    socket.on('disconnect', () => {
      console.log(`client disconnected`, socket.id);
      const users = removeUser(socket.id);
      io.to(MAIN_ROOM).emit('USER_LEFT', { users });
      io.in(MAIN_ROOM).emit('ROOM_DATA', { users: getAllActiveUsers() });
    });
  });
  return server;
};
