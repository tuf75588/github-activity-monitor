/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import { theme } from '@chakra-ui/core';


export default (props) => <ThemeProvider {...props} theme={theme} />;
