import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import axios from 'axios';
import { Button, Checkbox, Form } from 'semantic-ui-react';

const StyledButton = styled(Button)`
  width: 100%;
`;

const FormExampleForm = () => {
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const setValues = () => {
    axios
      .post('/api/auth', {
        emailAddress,
        password
      })
      .then(console.log);
  };

  const handleEmailInputChange = e => {
    setEmailAddress(e.target.value);
  };
  const handlePasswordInputChange = e => {
    setPassword(e.target.value);
  };
  return (
    <Form onSubmit={setValues}>
      <Form.Field>
        <label htmlFor="email">Email Address</label>
        <input
          placeholder=""
          value={emailAddress}
          id="email"
          onChange={handleEmailInputChange}
        />
      </Form.Field>
      <Form.Field>
        <label htmlFor="password">Password</label>
        <input
          placeholder=""
          id="password"
          type="password"
          value={password}
          onChange={handlePasswordInputChange}
        />
      </Form.Field>
      <StyledButton type="submit">Submit</StyledButton>
    </Form>
  );
};

const AuthContainer = styled.div`
  height: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
`;

const FormContainer = styled.div`
  width: 40vw;
  @media (max-width: 768px) {
    width: 80vw;
  }
`;

const AuthPage = props => {
  const [page, setPage] = useState('Page');

  return (
    <AuthContainer>
      <FormContainer>
        <FormExampleForm />
      </FormContainer>
    </AuthContainer>
  );
};

function mapStateToProps(state) {
  return { users: state.users };
}

export default connect(mapStateToProps)(AuthPage);
