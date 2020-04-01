import { startTime } from '../utils/index';
const visitedUsers = [];

export const addVisitor = ({ socketid, email, ...rest }) => {
  email = email.trim().toLowerCase();
  if (!email) return { error: 'Email is required.' };
  const userFoundIndex = visitedUsers.findIndex(
    ({ email: _email }) => _email === email
  );
  if (userFoundIndex !== -1) {
    visitedUsers[userFoundIndex] = {
      socketid,
      email,
      ...rest,
      time: `${startTime()}`
    };
    return visitedUsers[userFoundIndex];
  } else {
    const user = { socketid, email, ...rest, time: `${startTime()}` };
    if (user) {
      visitedUsers.push(user);
      return { user };
    }
  }
};

export const visitorsList = () => visitedUsers;
