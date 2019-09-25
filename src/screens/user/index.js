import React, {useState, useContext} from 'react';
import {useQuery} from './components/query';
import {Context as GithubContext} from '../../github-client';
const gql = String.raw;

const userQuery = gql`
  query getUserData($username: String!) {
    user(login: $username) {
      name
      login
      avatarUrl
    }
  }
`;

function makeDataMoreNormal(data) {
  console.log(data);
  const {
    user: {login, name, avatarUrl},
  } = data;
  return {
    login,
    name,
    avatarUrl,
  };
}

//! user will receive a username prop for our graphql query
function User({username}) {
  const [filter, setfilter] = useState('');
  const {logout} = useContext(GithubContext);
  const {fetching, data, error} = useQuery({
    query: userQuery,
    variables: {username},
    normalize: makeDataMoreNormal,
  });
  console.log(data);

  return <div>user page!</div>;
}

export default User;
