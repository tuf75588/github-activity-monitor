import React from 'react';
import ReactDOM from 'react-dom';
import { useIdentityContext, IdentityContextProvider } from 'react-netlify-identity';
import { Router, navigate } from '@reach/router';
import isLoading from './useLoading';
import './index.css';
import useLoading from './useLoading';

function PrivateRoute(props) {
  const { as: Comp } = props;
  const identity = useIdentityContext();
  console.log(identity);
  return <Comp />;
}

function Login() {
  const {
    settings, loginProvider,
  } = useIdentityContext();
  const formRef = React.useRef();
  return (
    <form
      ref={formRef}
      onSubmit={(e) => {
        e.preventDefault();
        navigate('/dashboard');
      }}
    >
      <div>
        {settings.external.github && <button onClick={() => loginProvider('github')} type="button">Login with github</button>}
        {settings.external.google && <button onClick={() => loginProvider('google')} type="button">Login with google</button>}
      </div>
    </form>
  );
}


function App() {
  const domainToUse = new URL(window.location.origin).hostname === 'localhost'
    ? 'https://infallible-clarke-998d83.netlify.com/'
    : window.location.origin;
  const [url, setUrl] = React.useState(domainToUse);
  return (
    <IdentityContextProvider url={url}>
      <Router>
        <Login path="/login" />
        <PrivateRoute path="/dashboard" as={Dashboard} />
      </Router>
    </IdentityContextProvider>
  );
}

function Dashboard() {
  const props = useIdentityContext();
  const { authedFetch, isConfirmedUser } = props;
  console.log(isConfirmedUser);
  return (
    <div>DASHBOARD COMPONENT</div>
  );
}

const ui = <App />;
const rootElement = document.getElementById('root');

ReactDOM.render(ui, rootElement);
