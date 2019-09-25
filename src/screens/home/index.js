import React from 'react';
import {IsolatedContainer, PrimaryButton} from '../../shared/pattern';
import {useQuery} from '../user/components/query';
import styled from '@emotion/styled/macro';

export const Text = styled.span(
  variantStyles({
    tint: {
      faded: ({theme}) => ({color: theme.colors.faded}),
      fadedExtra: ({theme}) => ({color: theme.colors.fadedExtra}),
      background: ({theme}) => ({backgroundColor: theme.colors.backgroundFallback}),
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
  console.log(styles);
  return typeof styles === 'function' ? styles(props) : '';
}

function Home({username}) {
  return (
    <IsolatedContainer>
      <Text tint="background">Hello</Text>
    </IsolatedContainer>
  );
}

export default Home;
