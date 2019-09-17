import React from 'react';
import ReactDOM from 'react-dom';
import { useIdentityContext, IdentityContextProvider } from 'react-netlify-identity';
import { Router, navigate } from '@reach/router';
import isLoading from './useLoading';
import Dashboard from './screens/dashboard';
import useLoading from './useLoading';
import Login from './screens/login';
import ThemeProvider from './shared/theme-provider';
import './global-styles.css';

function PrivateRoute(props) {
  const { as: Comp } = props;
  const identity = useIdentityContext();

  return <Comp />;
}


function App() {
  const url = 'https://infallible-clarke-998d83.netlify.com/';

  return (
    <IdentityContextProvider url={url}>
      <ThemeProvider>
        <Router>
          <Login path="/" />
          <PrivateRoute path="/dashboard" as={Dashboard} />
        </Router>
      </ThemeProvider>
    </IdentityContextProvider>
  );
}


const ui = <App />;
const rootElement = document.getElementById('root');

ReactDOM.render(ui, rootElement);
