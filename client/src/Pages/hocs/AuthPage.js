import React from 'react';
import styled from 'styled-components';

const AuthContainer = styled.div`
  height: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  background-size: cover;
  background-color: #212121;
  color: white;
  background-repeat: no-repeat;
  background-position: center;
`;



const AuthPage = props => {
  return <AuthContainer>{props.children}</AuthContainer>;
};

export default AuthPage;
