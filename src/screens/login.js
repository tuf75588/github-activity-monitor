/* eslint-disable no-console */
/* @jsx jsx */
import React from 'react';
import { useIdentityContext } from 'react-netlify-identity';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  FormHelperText,
  Button,
} from '@chakra-ui/core';
import { navigate } from '@reach/router';
import { jsx } from '@emotion/core';
import useLoading from '../useLoading';

function Login() {
  const {
    settings, loginUser, signupUser, loginProvider,
  } = useIdentityContext();
  const data = JSON.parse(localStorage.getItem('gotrue.user'));
  console.log(data);
  const [isLoading, load] = useLoading();
  const formRef = React.useRef();
  function signup() {
    const email = formRef.current.email.value;
    const password = formRef.current.password.value;
    load(
      signupUser(email, password, {
        data: 'signed up through react-netlify identity!',
      }).then((user) => {
        console.log('successfully signed up!', user);
        navigate('/dashboard');
      }),
    );
  }
  if (data) {
    console.log('we have some data!');
  }

  return (
    <div css={{
      padding: '20px',
      width: '500px',
      margin: '40px auto',
      border: '1px solid rgba(0,0,0,0.2)',
      borderRadius: '4px',
    }}
    >
      <form
        css={{ display: 'flex', flexDirection: 'column' }}
        onSubmit={(e) => {
          e.preventDefault();
          const email = formRef.current.email.value;
          const password = formRef.current.password.value;
          load(loginUser(email, password)
            .then((user) => {
              console.log('successfully logged in!', user);
              navigate('/dashboard');
            }));
        }}
        ref={formRef}
      >
        <FormControl css={{ marginBottom: '20px' }}>
          <FormLabel htmlFor="email">Email address</FormLabel>
          <Input type="email" name="email" aria-describedby="email-helper-text" />
          <FormHelperText id="email-helper-text">
    We'll never share your email.
          </FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input type="password" name="password" aria-describedby="email-helper-text" />

        </FormControl>
        <div className="btn-container" css={{ display: 'flex', justifyContent: 'center', paddingTop: '10px' }}>
          <Button onClick={signup} css={{ marginRight: '10px' }}>Sign up</Button>
          <Button css={{ marginLeft: '10px' }} type="submit">Sign in</Button>
        </div>
      </form>
      <pre>Prefer another provider?</pre>
      <Button onClick={() => loginProvider('github')}>Login with github</Button>
      <Button onClick={() => loginProvider('google')}>Login with google</Button>
    </div>
  );
}

export default Login;
