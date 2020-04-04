import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Button, Form } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import Error from './Error';
import Loader from './Loader';

axios.defaults.withCredentials = 'include';

const StyledButton = styled(Button)`
  width: 100%;
  margin-top: 20px !important;
  max-width: 250px;
`;

const StyledLabel = styled.label`
  font-size: 20px !important;
  color: #fff !important;
  margin-bottom: 20px !important;
  text-align: left;
`;

const LoginForm = ({
  history,
  setIsAuthenticated,
  isAuthenticated,
  setCurrentLoggerInUser,
}) => {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const setValues = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`/api/auth/login`, {
        email,
        password,
      });
      if (response.status === 200) {
        setIsAuthenticated(true);
        setCurrentLoggerInUser(response.data);
        setLoading(false);
        history.push('/doc');
      } else {
        throw new Error(response.status);
      }
    } catch ({ message, response }) {
      const errorMsg = response ? response.data.error : message;
      setShowError(true);
      setLoading(false);
      setErrorMsg(`${errorMsg}: please try again.`);
      setTimeout(() => {
        setShowError(false);
        setErrorMsg('');
      }, 2500);
    }
  };

  const handleEmailInputChange = (e) => {
    setemail(e.target.value);
  };
  const handlePasswordInputChange = (e) => {
    setPassword(e.target.value);
  };
  return (
    <>
      {showError ? (
        <Error message={errorMsg} />
      ) : loading ? (
        <Loader />
      ) : (
        <Form onSubmit={setValues}>
          <Form.Field>
            <StyledLabel htmlFor="email">Email Address</StyledLabel>
            <input
              placeholder=""
              value={email}
              id="email"
              onChange={handleEmailInputChange}
            />
          </Form.Field>
          <Form.Field>
            <StyledLabel htmlFor="password">Password</StyledLabel>
            <input
              placeholder=""
              id="password"
              type="password"
              value={password}
              onChange={handlePasswordInputChange}
            />
          </Form.Field>
          <StyledButton
            type="submit"
            primary
            disabled={password.length < 3 || email.length < 3}
          >
            Submit
          </StyledButton>
        </Form>
      )}
    </>
  );
};

export default withRouter(LoginForm);
