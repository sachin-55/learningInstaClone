/** @jsx jsx */
import '@babel/polyfill';
import { hot } from 'react-hot-loader/root';
import { jsx } from 'theme-ui';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './src/App';

const Index = hot(() => {
  return <App />;
});

ReactDOM.render(<Index />, document.getElementById('root'));
