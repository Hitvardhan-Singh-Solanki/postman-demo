import React, { useEffect, useState } from 'react';
import { Button } from 'semantic-ui-react';
import styled from 'styled-components';
import socketIOClient from 'socket.io-client';
import Error from '../Components/Error';
import AvatarList from '../Components/AvatarList';
import Visited from '../Components/Visited';

const MaindocContaienr = styled.div`
  height: 100%;
  width: 100%;
  margin-top: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column;
`;

export default ({ isAuthenticated, currentLoggerInUser }) => {
  let socket = {};

  const [newUser, setNewUser] = useState({});
  const [users, setUsers] = useState([]);

  const [showVisited, setShowVisited] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      socket = socketIOClient('/');
      socket.emit('join', { ...currentLoggerInUser });
      socket.on('joined', (data) => {
        alert(data.text);
      });
    }

    return () => {
      if (socket.emit) socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket.on) {
      socket.on('USER_JOINED', (user) => {
        setNewUser(user);
      });
      socket.on('ROOM_DATA', ({ users }) => {
        setUsers(users);
      });
      socket.on('USER_LEFT', (data) => {
        // TODO: show user left popup
      });
    }
  }, [socket]);

  const showVisitedUsers = (e) => {
    e.preventDefault();
    setShowVisited(true);
  };

  const closeVisitedUser = (e) => {
    setShowVisited(false);
  };

  return isAuthenticated ? (
    <>
      <MaindocContaienr>
        <AvatarList users={users} />
        <Button onClick={showVisitedUsers}>Show Visitors</Button>
      </MaindocContaienr>
      {showVisited && <Visited closeVisitedUser={closeVisitedUser} />}
    </>
  ) : (
    <Error message={'Oops... are you lost?'} />
  );
};
