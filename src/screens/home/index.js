/* @jsx jsx */

import React from 'react';
import {IsolatedContainer, PrimaryButton, Image, Text} from '../../shared/pattern';
import {useQuery} from '../user/components/query';
import styled from '@emotion/styled/macro';
import {jsx} from '@emotion/core';
import {Input, Button} from '@chakra-ui/core';
import {navigate} from '@reach/router';
//! keys are src, className, theme
//! styles is an object {responsive: display, height, maxWidth }
//!

function handleSubmit(e) {
  e.preventDefault();
  const username = e.target.elements.username.value.trim();
  navigate(`/${username}`);
}
function Home() {
  return (
    <IsolatedContainer>
      <form css={{display: 'flex', alignItems: 'center'}} onSubmit={handleSubmit}>
        <Input placeholder="enter a github username" size="lg" type="text" name="username" />
        <Button size="lg" type="submit" variantColor="blue" border="none" textAlign="center">
          Go
        </Button>
      </form>
    </IsolatedContainer>
  );
}

export default Home;
