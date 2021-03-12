import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'theme-ui';
import { ThemeProvider as MUIThemeProvider } from '@material-ui/core/styles';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
} from '@apollo/client';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import theme from './theme/theme';
import muiTheme from './theme/muiTheme';

import '../reset.css';
import './scss/all.scss';
import './scss/fonts.scss';

import userContext from './context/userContext';

import Landingpage from './pages/Landingpage';
import SignupPage from './pages/SignupPage';

import Header from './components/Header';

import Homepage from './pages/homepage/Homepage';
import MessagePage from './pages/message/MessagePage';
import Explore from './pages/Explore';
import Profile from './pages/Profile';
import Notification from './pages/Notification';

const client = new ApolloClient({
  uri: `${process.env.HOST_API}graphiql`,
  cache: new InMemoryCache(),
});
console.log(process.env.HOST_API, 'API');
console.log(process.env.HOST_API, 'API');
console.log(process.env.HOST_API, 'API');

const App = () => {
  const [user, setUser] = useState({});
  const [login, setLogin] = useState(false);
  useEffect(() => {
    if (localStorage.getItem('login')) {
      setLogin(true);
    }
    if (localStorage.getItem('user')) {
      setUser(JSON.parse(localStorage.getItem('user')));
    }
  }, []);
  return (
    <userContext.Provider value={user}>
      <ThemeProvider theme={theme}>
        <MUIThemeProvider theme={muiTheme}>
          <ApolloProvider client={client}>
            <Router>
              {login === false ? (
                <Switch>
                  <Route exact path="/">
                    <Landingpage setUser={setUser} />
                  </Route>
                  <Route path="/signup">
                    <SignupPage setUser={setUser} />
                  </Route>
                </Switch>
              ) : (
                <>
                  <Header />
                  <Switch>
                    <Route exact path="/">
                      <Homepage />
                    </Route>
                    <Route path="/inbox">
                      <MessagePage />
                    </Route>
                    <Route path="/explore">
                      <Explore />
                    </Route>
                    <Route path="/notification">
                      <Notification />
                    </Route>
                    <Route path="/profile">
                      <Profile />
                    </Route>
                  </Switch>
                </>
              )}
            </Router>
          </ApolloProvider>
        </MUIThemeProvider>
      </ThemeProvider>
    </userContext.Provider>
  );
};

export default App;
