/* @jsx jsx */

import React from 'react';
import {IsolatedContainer, PrimaryButton, Image, Text, Input} from '../../shared/pattern';
import {useQuery} from '../user/components/query';
import styled from '@emotion/styled/macro';
import {jsx} from '@emotion/core';

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
        <Input placeholder="enter a github username" name="username" type="input" />
        <PrimaryButton>Go</PrimaryButton>
      </form>
    </IsolatedContainer>
  );
}

export default Home;
