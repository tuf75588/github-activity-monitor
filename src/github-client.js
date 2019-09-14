import React from 'react';
import { createHistory, navigate } from '@reach/router';
import { IdentityContextProvider } from 'react-netlify-identity';

const GithubClientContext = React.createContext();
const { Provier, Consumer } = GithubClientContext;
