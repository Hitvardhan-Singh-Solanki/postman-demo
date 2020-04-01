const users = [];

export const addUser = ({ socketid, email, ...rest }) => {
  email = email.trim().toLowerCase();

  const existingUser = users.find(user => user.email === email);

  if (!email) return { error: 'Email is required.' };
  if (existingUser) return { error: 'email is taken.' };

  const user = { socketid, email, ...rest };

  users.push(user);

  return { user };
};

export const removeUser = socketid => {
  const index = users.findIndex(user => user.socketid === socketid);

  if (index !== -1) return users.splice(index, 1)[0];
};

export const getUser = socketid =>
  users.find(user => user.socketid === socketid);

export const getAllActiveUsers = () => users;
