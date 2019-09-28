import React, {useState, useContext} from 'react';
import {useQuery} from './components/query';
import {Context as GithubContext} from '../../github-client';
import UserContext from './user-context';
import {IsolatedContainer, Text, LoadingMessagePage} from '../../shared/pattern';

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

  return error ? (
    <IsolatedContainer>
      <Text size="subheading">Oh no! there was an error!</Text>
      <p>{JSON.stringify(error, null, 2)}</p>
    </IsolatedContainer>
  ) : fetching ? (
    <LoadingMessagePage>Loading data for {username}</LoadingMessagePage>
  ) : data ? (
    <UserContext.Provider value={data}>
      <div>some data</div>
    </UserContext.Provider>
  ) : (
    <IsolatedContainer>
      <p>No idea what's up if you've made it this far</p>
    </IsolatedContainer>
  );
}

export default User;
