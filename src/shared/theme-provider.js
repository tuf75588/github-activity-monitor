/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {ThemeProvider} from 'emotion-theming';
import {theme} from '@chakra-ui/core';
const appTheme = {
  common: {
    borderBottom: {borderBottom: '1px solid #eee'},
  },
  fontColor: {
    faded: '#666',
    fadedExtra: '#888',
    backgroundFallback: 'grey',
  },
  ...theme,
};

export default (props) => <ThemeProvider {...props} theme={appTheme} />;
