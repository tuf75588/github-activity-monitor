import React from 'react';
import { useIdentityContext } from 'react-netlify-identity';


function getToken() {
  const data = 'https://api.github.com/graphql';
}


function Dashboard() {
  const props = useIdentityContext();
  //! KEEP TOKEN A SECRET
  const { isConfirmedUser, isLoggedIn, user: { token: { access_token } } } = props;
  return (
    <div>
      {isConfirmedUser && <div><h1>Welcome to your dashboard!</h1></div>}
    </div>
  );
}

export default Dashboard;
