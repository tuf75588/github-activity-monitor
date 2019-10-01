/* @jsx jsx */
import React from 'react';
import {jsx} from '@emotion/core';
import {Link} from '@reach/router';
import styled from '@emotion/styled';
import {style} from 'styled-system';
import Loading from './loading';
//! util functions
//#region
//! gets passed a styles object
function variantStyles(styles) {
  return function dynamicStyles(props) {
    return Object.entries(props).map(([key, value]) => {
      if (styles[key]) {
        return applyStyles(styles[key][value], props);
      }
      return null;
    });
  };
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

//! will accept two arguments, check typeof styles and if function call styles with props
function applyStyles(styles, props) {
  return typeof styles === 'function'
    ? styles(props)
    : Array.isArray(styles)
    ? styles.map((s) => applyStyles(s, props))
    : styles;
}
//#endregion

export const Section = styled.div(
  {padding: '20px 0'},
  ({theme}) => theme.common.borderBottom,
);

const heading = {
  display: 'block',
  fontFamily: 'inherit',
  fontWeight: 500,
  lineHeight: 1.1,
};

const largerHeading = {
  marginTop: '20px',
  marginBottom: '10px',
};

const smallerHeading = {
  marginTop: '10px',
  marginBottom: '10px;',
};

export const Input = styled.input({
  label: 'input',
  display: 'block',
  height: '34px',
  padding: '6px 12px',
  lineHeight: '1.42857143',
  borderRadius: '4px',
  border: '1px solid #ccc',
  color: '#555',
  backgroundColor: '#fff',
  backgroundImage: 'none',
  width: '100%',
});

export const Button = styled.button({
  display: 'inline-block',
  padding: '6px 12px',
  marginBottom: 0,
  fontSize: '14px',
  fontWeight: 'normal',
  lineHeight: '1.42857143',
  textAlign: 'center',
  whiteSpace: 'nowrap',
  verticalAlign: 'middle',
  touchAction: 'manipulation',
  cursor: 'pointer',
  userSelect: 'none',
  backgroundImage: 'none',
  border: '1px solid transparent',
  borderRadius: '4px',
  textDecoration: 'none',
  color: '#333',
});

export const PrimaryButton = styled(Button)({
  color: '#fff',
  backgroundColor: '#337ab7',
  borderColor: '#2e6da4',
  '&:hover,&:focus,&:active': {
    color: '#fff',
    backgroundColor: '#286090',
    borderColor: '#204d74',
  },
  '&:focus': {
    borderColor: '#122b40',
  },
});

export const Image = styled.img(
  {border: 0, verticalAlign: 'middle'},
  propStyles({
    responsive: {
      display: 'block',
      borderRadius: '10px',
      maxWidth: '100%',
      height: 'auto',
    },
  }),
);

export const Text = styled.span(
  variantStyles({
    tint: {
      faded: ({theme}) => ({color: theme.colors.faded}),
      fadedExtra: ({theme}) => ({color: theme.colors.fadedExtra}),
    },
    size: {
      superheading: [heading, largerHeading, {fontSize: 36}],
      heading: [heading, largerHeading, {fontSize: 30}],
      subheading: [heading, largerHeading, {fontSize: 20}],
      superstandard: [heading, smallerHeading, {fontSize: 18}],
      standard: [heading, smallerHeading, {fontSize: 14}],
      substandard: [heading, largerHeading, {fontSize: 12}],
    },
  }),
);

export function IsolatedContainer({children, ...props}) {
  return (
    <div
      css={{
        display: 'flex',
        marginTop: 300,
        justifyContent: 'center',
      }}
      {...props}
      className="isolated-container"
    >
      {children}
    </div>
  );
}

/**
 * Makes it easier to create an emotion component which
 * accepts props to enable/disable certain styles.
 *
 * accepts an object where the key is a prop and the value
 * is the styles that should be applied if that prop is
 * passed. Returns a function which you pass to a
 * emotionComponentFactory.
 *
 * @param {Object} styles The prop to styles object
 * @return {Function} the dynamic styles function
 */

export function LoadingMessagePage({children}) {
  return (
    <IsolatedContainer>
      <div css={{textAlign: 'center'}}>
        <p>
          <Text size="subheading">{children}</Text>
        </p>
        <Loading />
      </div>
    </IsolatedContainer>
  );
}
