import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { useIdentityContext } from 'react-netlify-identity';
import * as GithubContext from './github-client';
import Login from './login';


function App() {
  return <GithubContext.Provider><Login /></GithubContext.Provider>;
}

const ui = <App />;
const rootElement = document.getElementById('root');

ReactDOM.render(ui, rootElement);
