/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {ThemeProvider} from 'emotion-theming';

const theme = {
  common: {
    borderBottom: {borderBottom: '1px solid #eee'},
  },
  colors: {
    faded: '#666',
    fadedExtra: '#888',
    backgroundFallback: 'grey',
  },
};

export default (props) => <ThemeProvider {...props} theme={theme} />;
