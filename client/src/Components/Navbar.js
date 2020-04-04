import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';
import Avatar from './Avatar';

const NavbarContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
  position: fixed;
  width: 100%;
  color: white;
  font-size: 16px;
  font-weight: 700;
  display: flex;
  align-items: center;
  margin-right: 20px !important;
  & div {
    margin: 0 20px;
  }
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  padding: 10px;
  flex: 1;
`;

const NavListElement = styled.li`
  margin-left: 20px;
  cursor: pointer;
  :hover {
    color: orangered;
  }
`;

const Navbar = ({
  isAuthenticated,
  setIsAuthenticated,
  history,
  setCurrentLoggerInUser,
  currentLoggerInUser,
}) => {
  const handleLogout = () => {
    Axios.get(`/api/auth/logout`, {
      withCredentials: true,
    }).then(() => {
      setIsAuthenticated(false);
      setCurrentLoggerInUser({});
      history.push('/login');
    });
  };

  return (
    <NavbarContainer>
      <NavList>
        {!isAuthenticated ? (
          <>
            <NavListElement>
              <Link to="/login">Login</Link>
            </NavListElement>
            <NavListElement>
              <Link to="/sign-up">Sign up</Link>
            </NavListElement>
          </>
        ) : (
          <>
            <NavListElement onClick={handleLogout}>Logout</NavListElement>
            <NavListElement>
              <Link to="/doc">Doc</Link>
            </NavListElement>
          </>
        )}
      </NavList>
      {isAuthenticated && (
        <Avatar
          dontHover
          userName={currentLoggerInUser.email}
          image={currentLoggerInUser.image}
          imgSize={'40px'}
          shoudlTransform={false}
        />
      )}
    </NavbarContainer>
  );
};

export default withRouter(Navbar);
