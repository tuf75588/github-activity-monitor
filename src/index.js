import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import ThemeProvider from './shared/theme-provider';
import {Router} from '@reach/router';
import ErrorBoundary from 'react-error-boundary';
import './global-styles.css';
import * as GithubContext from './github-client';
import {IsolatedContainer, LoadingMessagePage} from './shared/pattern';

const Home = React.lazy(() => import('./screens/home'));
const User = React.lazy(() => import('./screens/user'));

function ErrorFallback({error}) {
  return (
    <IsolatedContainer>
      <p>there was an error</p>
      <pre style={{maxWidth: 700}}>{JSON.stringify(error, null, 2)}</pre>
    </IsolatedContainer>
  );
}

function App() {
  return (
    <ThemeProvider>
      <GithubContext.Provider>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<LoadingMessagePage>Loading Application</LoadingMessagePage>}>
            <Router>
              <Home path="/" />
              <User path="/:username" />
            </Router>
          </Suspense>
        </ErrorBoundary>
      </GithubContext.Provider>
    </ThemeProvider>
  );
}

const ui = <App />;
const rootElement = document.getElementById('root');

ReactDOM.render(ui, rootElement);
