import socketio from 'socket.io';
import http from 'http';
import { blue, red } from 'chalk';
import { addUser, removeUser, getAllActiveUsers } from '../sockets/users';
import { startTime } from '../utils';
import { addVisitor } from '../sockets/visited';

const MAIN_ROOM = 'MAIN_ROOM';

export default (expressApp, sessionMiddleware) => {
  const server = http.createServer(expressApp);
  const io = socketio(server);
  io.use((socket, next) => {
    sessionMiddleware(socket.request, {}, next);
  }).on('connection', (socket) => {
    console.log(
      blue(`${startTime()} New client connected`),
      blue.underline.bold(socket.id)
    );
    socket.on('join', (currentUser) => {
      socket.join(MAIN_ROOM);
      socket.emit('joined', {
        text: `Welcome to the club!`,
        ...currentUser,
      });
      addUser({ ...currentUser, socketid: socket.id });
      socket.broadcast.to(MAIN_ROOM).emit('USER_JOINED', { currentUser });
      io.in(MAIN_ROOM).emit('ROOM_DATA', { users: getAllActiveUsers() });
    });
    socket.on('disconnect', () => {
      console.log(
        red.bgWhite(`client disconnected`),
        red.underline.bold(socket.id)
      );
      const user = removeUser(socket.id);
      if (user) addVisitor(user);
      io.to(MAIN_ROOM).emit('USER_LEFT', { user });
      io.in(MAIN_ROOM).emit('ROOM_DATA', { users: getAllActiveUsers() });
    });
  });
  return server;
};
