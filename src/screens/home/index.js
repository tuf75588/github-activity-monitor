/* @jsx jsx */

import React from 'react';
import {IsolatedContainer, PrimaryButton} from '../../shared/pattern';
import {useQuery} from '../user/components/query';
import styled from '@emotion/styled/macro';
import {jsx} from '@emotion/core';

const smallerHeading = {
  marginTop: '10px',
  marginBottom: '10px',
};

const heading = {
  display: 'block',
  fontFamily: 'inherit',
  fontWeight: 500,
  lineHeight: 1.1,
};

export const Text = styled.span(
  variantStyles({
    tint: {
      faded: ({theme}) => ({color: theme.colors.faded}),
      fadedExtra: ({theme}) => ({color: theme.colors.fadedExtra}),
      background: ({theme}) => ({backgroundColor: theme.colors.backgroundFallback}),
    },
    size: {
      subheading: [heading, smallerHeading, {fontSize: '25'}],
    },
  }),
);

export const Image = styled.img(
  {border: 0, verticalAlign: 'middle'},
  propStyles({
    responsive: {
      display: 'block',
      maxWidth: '100%',
      height: 'auto',
    },
    rounded: {
      borderRadius: '6px',
    },
  }),
);

//! this works because when we render our component we are invoking our closure
function variantStyles(styles) {
  //! accepts a styles object
  //! returns a new function
  return function dynamicStyles(props) {
    return Object.entries(props).map(([key, value]) => {
      if (styles[key]) {
        return applyStyles(styles[key][value], props);
      }
      return null;
    });
  };
}

function applyStyles(styles, props) {
  return typeof styles === 'function'
    ? styles(props)
    : Array.isArray(styles)
    ? styles.map((style) => applyStyles(style, props))
    : styles;
}

function propStyles(styles) {
  return function dynamicStyles(props) {
    return Object.keys(props).map((key) => {
      if (styles[key]) {
        return applyStyles(styles[key], props);
      }
      return null;
    });
  };
}

//! keys are src, className, theme
//! styles is an object {responsive: display, height, maxWidth }
//!
function Home({username}) {
  return (
    <IsolatedContainer>
      <Text tint="background" size="subheading">
        Hello
        <Image src="https://github.com/tylermcginnis.png" responsive rounded />
      </Text>
    </IsolatedContainer>
  );
}

export default Home;
