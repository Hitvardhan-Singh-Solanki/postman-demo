import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import AuthPage from './Pages/hocs/AuthPage';
import Maindoc from './Pages/Maindoc';
import LoginForm from './Components/LoginForm';
import SignupForm from './Components/SignupForm';
import Navbar from './Components/Navbar';
import axios from 'axios';
import FormContainer from './Pages/hocs/FormContainer';
import Loader from './Components/Loader';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentLoggerInUser, setCurrentLoggerInUser] = useState({});

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/auth/check-token`)
      .then((res) => {
        if (res.status === 200) {
          setIsAuthenticated(true);
          setCurrentLoggerInUser(res.data);
        } else setIsAuthenticated(false);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Router>
      <Navbar
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
        setCurrentLoggerInUser={setCurrentLoggerInUser}
        currentLoggerInUser={currentLoggerInUser}
      />
      <AuthPage>
        {loading ? (
          <Loader />
        ) : (
          <Switch>
            <Route path="/" exact>
              <Redirect to="/login" />
            </Route>
            <Route path="/login">
              <FormContainer>
                <LoginForm
                  setCurrentLoggerInUser={setCurrentLoggerInUser}
                  setIsAuthenticated={setIsAuthenticated}
                  isAuthenticated={isAuthenticated}
                />
              </FormContainer>
            </Route>
            <Route path="/sign-up">
              <FormContainer>
                <SignupForm />
              </FormContainer>
            </Route>
            <Route path="/doc">
              <Maindoc
                isAuthenticated={isAuthenticated}
                currentLoggerInUser={currentLoggerInUser}
              />
            </Route>
          </Switch>
        )}
      </AuthPage>
    </Router>
  );
}

export default App;
