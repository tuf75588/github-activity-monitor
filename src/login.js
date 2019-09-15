import React from 'react';
import { useIdentityContext } from 'react-netlify-identity';


function Login() {
  const { login, loginProvider } = useIdentityContext();
  console.log(loginProvider);
  return (
    <div>
      <button onClick={() => loginProvider('github')} type="button">login with github</button>
    </div>
  );
}

export default Login;
