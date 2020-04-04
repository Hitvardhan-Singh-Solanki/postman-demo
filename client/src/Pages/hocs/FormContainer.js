import React from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  min-width: 40vw;
  text-align: center;
  @media (max-width: 768px) {
    width: 80vw;
  }
`;

export default ({ children }) => <FormContainer>{children}</FormContainer>;
