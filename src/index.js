import React from 'react';
import ReactDOM from 'react-dom';
import ThemeProvider from './shared/theme-provider';
import {Router} from '@reach/router';
import './global-styles.css';
import * as GithubContext from './github-client';
import Home from './screens/home';
import User from './screens/user';

function App() {
  return (
    <div>
      <ThemeProvider>
        <GithubContext.Provider>
          <Router>
            <Home exact path="/" />
            <User path="/:username" />
          </Router>
        </GithubContext.Provider>
      </ThemeProvider>
    </div>
  );
}

const ui = <App />;
const rootElement = document.getElementById('root');

ReactDOM.render(ui, rootElement);
