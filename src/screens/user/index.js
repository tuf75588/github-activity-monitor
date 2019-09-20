import React, {useState, useContext} from 'react';
import {Context as GithubContext} from '../../github-client';

const gql = String.raw;

//! user will receive a username prop for our graphql query
function User({username}) {
  const [filter, setfilter] = useState('');
  const {logout} = useContext(GithubContext);

  return <div>USER!</div>;
}

export default User;
