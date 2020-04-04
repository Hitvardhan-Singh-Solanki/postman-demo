import React from 'react';
import styled from 'styled-components';
import Avatar from '../Components/Avatar';

const AvatarListContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

export default ({ users = [] }) => {
  return (
    <AvatarListContainer>
      {users.map(({ email, image, _id }) => (
        <Avatar userName={email} image={image} key={_id} />
      ))}
    </AvatarListContainer>
  );
};
