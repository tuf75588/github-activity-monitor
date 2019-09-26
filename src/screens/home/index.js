/* @jsx jsx */

import React from 'react';
import {IsolatedContainer, PrimaryButton} from '../../shared/pattern';
import {useQuery} from '../user/components/query';
import styled from '@emotion/styled/macro';
import {jsx} from '@emotion/core';

//! keys are src, className, theme
//! styles is an object {responsive: display, height, maxWidth }
//!
function Home({username}) {
  return (
    <IsolatedContainer>
      <p>home component!</p>
    </IsolatedContainer>
  );
}

export default Home;
