import React from 'react';
import styled from 'styled-components';

const Error = styled.div`
  color: #b93131eb;
  font-size: 60px;
  line-height: 1.1;
`;

export default ({ message }) => <Error>{message}</Error>;
