/* @jsx jsx */
import React from 'react';
import {jsx} from '@emotion/core';
import {Link} from '@reach/router';
import styled from '@emotion/styled';

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

export function IsolatedContainer({children, ...props}) {
  return (
    <div
      css={{
        display: 'flex',
        marginTop: 300,
        justifyContent: 'center',
      }}
      {...props}
    >
      {children}
    </div>
  );
}

const heading = {
  display: 'block',
  fontFamily: 'inherit',
  fontWeight: 500,
  lineHeight: 1.1,
};

const largeHeading = {
  marginTop: '20px',
  marginBottom: '10px',
};

const smallerHeading = {
  marginTop: '10px',
  marginBottom: '10px;',
};

//! gets passed a styles object
function variantStyles(styles) {
  return function applyStyles(props) {
    return Object.entries(props).map(([key, value]) => {
      if (styles[key]) {
        console.log(styles[key][value]);
      }
      return null;
    });
  };
}

variantStyles({tint: {faded: ({theme}) => ({color: 'red'})}});
