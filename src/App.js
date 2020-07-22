import React from 'react';
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

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Landingpage />
          </Route>
          <Route path="/signup">
            <SignupPage />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
