import React from 'react';
import { createHistory, navigate } from '@reach/router';
import { IdentityContextProvider } from 'react-netlify-identity';

const GithubClientContext = React.createContext();
const { Provier, Consumer } = GithubClientContext;


const url = 'https://infallible-clarke-998d83.netlify.com/';


function GithubClientProvider(props) {
  return (
    <IdentityContextProvider url={url}>
      {props.children}
    </IdentityContextProvider>
  );
}


export {
  GithubClientContext as Context,
  GithubClientProvider as Provider,
};
