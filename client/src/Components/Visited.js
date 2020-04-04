import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';
import Axios from 'axios';

const VisitedContainer = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
  z-index: 999;
  background-color: rgba(255, 255, 255, 0.9);
  color: #000;
`;

const VisitedList = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;

const CloseBtn = styled.div`
  float: right;
  padding: 20px;
  clip-path: circle(40%);
  background-color: #fff;
  &:hover {
    transform: translateY(-5px);
  }
`;

const StyledUl = styled.ul`
  list-style: none;
  margin: 0;
  font-size: 20px;
  line-height: 1.5;
`;

export default ({ closeVisitedUser }) => {
  const [visitors, setVisitors] = useState([]);

  useEffect(() => {
    Axios.get(`/api/auth/history`)
      .then(({ data, status }) => {
        if (status === 200) {
          setVisitors(data);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <VisitedContainer>
      <CloseBtn onClick={closeVisitedUser}>
        <Icon name="close" size="huge" />
      </CloseBtn>
      <VisitedList>
        <h3>Visited Users</h3>
        <StyledUl>
          {visitors.map(({ email, _id, time }) => {
            return (
              <li key={_id}>
                [{time}]: {email}
              </li>
            );
          })}
        </StyledUl>
      </VisitedList>
    </VisitedContainer>
  );
};
