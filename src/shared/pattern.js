import {Button} from '@chakra-ui/core';
import React from 'react';
export const LoginButton = (props) => (
  <Button
    height="48px"
    width="200px"
    size="md"
    border="2px"
    borderColor="green.500"
    {...props}
  >
    {props.children}
  </Button>
);
