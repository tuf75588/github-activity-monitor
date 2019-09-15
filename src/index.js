import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { useIdentityContext } from 'react-netlify-identity';
import * as GithubContext from './github-client';


function Login() {
  const {
    settings, loginProvider, signup, login,
  } = useIdentityContext();
  return (
    <div>
      <button type="button">login with github</button>
    </div>
  );
}


function App() {
  return (
    <GithubContext.Provider>
      <Login />
      <Dashboard />
    </GithubContext.Provider>
  );
}


function Dashboard() {
  const props = useIdentityContext();
  return <div>Dashboard</div>;
}

const ui = <App />;
const rootElement = document.getElementById('root');

ReactDOM.render(ui, rootElement);
