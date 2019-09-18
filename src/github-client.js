/* @jsx jsx */
import React from 'react';
import {GraphQLClient} from 'graphql-request';
import {navigate, createHistory} from '@reach/router';
import netlify from 'netlify-auth-providers';
import {jsx} from '@emotion/core';
import {LoginButton} from './shared/pattern';
const GithubClientContext = React.createContext();
const {Consumer, Provider} = GithubClientContext;
async function authenticateWithGithub() {
  return new Promise((resolve, reject) => {
    const authenticator = new netlify({
      site_id: 'd349bdd3-6eee-49ae-a1b3-7e686955eec6',
    });
    authenticator.authenticate(
      {
        provider: 'github',
        scope: 'public_repo,read:org,read:user',
      },
      function(err, data) {
        if (err) {
          reject(err);
        }
        resolve(data);
      },
    );
  });
}

const history = createHistory(window);

function GithubClientProvider(props) {
  const [client, setClient] = React.useState(() => {
    if (props.client) {
      return props.client;
    }
    const token = localStorage.getItem('github-token');
    if (token) {
      return getClient(token);
    }
  });
  const [error, setError] = React.useState(false);
  React.useEffect(() => {
    if (!client) {
      navigate('/');
    }
    function unsubscribeHistory() {
      history.listen(() => {
        if (!client) {
          navigate('/');
        }
      });
    }
    return function cleanup() {
      unsubscribeHistory();
    };
  });
  async function login() {
    console.log('logging in!');
    const data = await authenticateWithGithub().catch((e) => {
      setError(error);
      console.error('oh no there was an error!');
    });
    window.localStorage.setItem('github-token', data.token);
    setClient(getClient(data.token));
  }

  function logout() {
    setClient(null);
    setError(null);
    navigate('/');
  }

  //! get our oauth token from github first.
  function getClient(token) {
    const headers = {Authorization: `bearer ${token}`};
    const client = new GraphQLClient('https://api.github.com/graphql', {
      headers,
    });
    return Object.assign(client, {
      login,
      logout,
    });
  }

  return client ? (
    <Provider value={client}>{props.children}</Provider>
  ) : (
    <div
      css={{
        marginTop: 250,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      {error ? (
        <div>
          <p>Oh no! there was an error!:</p>
          <pre>{JSON.stringify(error, null, 2)}</pre>
        </div>
      ) : (
        <LoginButton onClick={login}>Login with GitHub</LoginButton>
      )}
    </div>
  );
}

export {
  GithubClientProvider as Provider,
  Consumer,
  GithubClientContext as Context,
};
