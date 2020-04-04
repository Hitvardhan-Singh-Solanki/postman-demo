import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Button, Form } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import Error from './Error';
import Loader from './Loader';

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

const SignupForm = ({ history }) => {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [cnfPassword, setCnfPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const setValues = async () => {
    if (password !== cnfPassword) {
      setErrorMsg(`Password do not match`);
      setTimeout(() => {
        setShowError(false);
        setErrorMsg('');
      }, 2500);

      return setShowError(true);
    }

    try {
      setLoading(true);
      const { status } = await axios.post(`/api/auth/signup`, {
        email,
        password,
      });
      if (status === 200) {
        history.push('/login');
      }
      setLoading(false);
    } catch (e) {
      setShowError(true);
      setLoading(false);
      setErrorMsg(`${e.message}: please try again.`);
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
  const handleCnfPasswordInputChange = (e) => {
    setCnfPassword(e.target.value);
  };
  return showError ? (
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
      <Form.Field>
        <StyledLabel htmlFor="confirm-password">Confirm Password</StyledLabel>
        <input
          placeholder=""
          id="confirm-password"
          type="password"
          value={cnfPassword}
          onChange={handleCnfPasswordInputChange}
        />
      </Form.Field>
      <StyledButton
        type="submit"
        primary
        disabled={
          password.length < 3 ||
          email.length < 3 ||
          cnfPassword.length !== password.length
        }
      >
        Submit
      </StyledButton>
    </Form>
  );
};

export default withRouter(SignupForm);
