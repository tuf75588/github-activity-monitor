import styled from '@emotion/styled/macro';

const sizes = {
  phone: 768,
  tablet: 962,
  desktop: 1200,
};
const queries = {
  tiny: `@media(max-width: ${sizes.phone}px)`,
  phone: `@media(max-width: ${sizes.phone}px)`,
  tablet: `@media(max-width: ${sizes.tablet}px)`,
  desktop: `@media(max-width: ${sizes.desktop}px)`,
};

const Container = styled.div({
  label: 'container',
  marginRight: 'auto',
  marginLeft: 'auto',
  paddingRight: '15px',
  paddingLeft: '15px',
  [queries.phone]: {
    maxWidth: '750px',
  },
  [queries.tablet]: {
    maxWidth: '970px',
  },
  [queries.desktop]: {
    maxWidth: '1170px',
  },
});

const Row = styled.div({
  label: 'row',
  marginRight: '15px',
  marginLeft: '-15px',
  [queries.phone]: {
    display: 'flex',
    justifyContent: 'center',
  },
});

const Column = styled.div(
  {
    label: 'column',
    position: 'relative',
    minHeight: '1px',
    paddingRight: '15px',
    paddingLeft: '15px',
  },
  ({width}) => ({
    flex: 'width',
  }),
);

export {Container, queries, Row, Column};
