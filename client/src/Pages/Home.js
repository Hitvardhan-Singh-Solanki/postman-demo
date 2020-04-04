import React from 'react';
import styled from 'styled-components';
import AvatarList from '../Components/AvatarList';
import avt from '../assets/images/avt1.svg';
import Loader from '../Components/Loader';

const HomeContainer = styled.div`
  height: 100%;
  margin: 60px 40px;
`;

export default props => {
  const users = [
    {
      userName: 'Someone',
      avatar: avt
    },
    {
      userName: 'Someone',
      avatar: avt
    }
  ];

  return (
    <HomeContainer>
      <h2>Playground</h2>
      <h3>Avatars</h3>
      <AvatarList users={users} />
      <h3>Loader</h3>
      <Loader />
    </HomeContainer>
  );
};
