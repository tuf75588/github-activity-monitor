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

function Home() {
  const userRef = React.useRef();
  return (
    <IsolatedContainer>
      <form
        css={{display: 'flex', alignItems: 'center'}}
        onSubmit={(e) => {
          e.preventDefault();
          const user = userRef.current.value;
          navigate(`/${user}`);
        }}
      >
        <Input placeholder="enter a github username" size="lg" type="text" name="username" ref={userRef} />
        <Button display="inline" size="lg" type="submit">
          Go
        </Button>
      </form>
    </IsolatedContainer>
  );
}

export default Home;
