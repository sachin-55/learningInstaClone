import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'theme-ui';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import theme from './theme';
import '../reset.css';
import './scss/all.scss';
import './scss/fonts.scss';
import Landingpage from './pages/Landingpage';
import SignupPage from './pages/SignupPage';
import Homepage from './pages/homepage/Homepage';
import MessagePage from './pages/message/MessagePage';

const App = () => {
  const [login, setLogin] = useState(false);
  useEffect(() => {
    if (localStorage.getItem('login')) {
      setLogin(true);
    }
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Router>
        {login === false ? (
          <Switch>
            <Route exact path="/">
              <Landingpage
                clickLogin={() => {
                  setLogin(true);
                  localStorage.setItem('login', true);
                }}
              />
            </Route>
            <Route path="/signup">
              <SignupPage />
            </Route>
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/">
              <Homepage />
            </Route>
            <Route path="/direct/inbox">
              <MessagePage />
            </Route>
          </Switch>
        )}
      </Router>
    </ThemeProvider>
  );
};

export default App;
