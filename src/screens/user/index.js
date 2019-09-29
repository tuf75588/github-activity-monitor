/* @jsx jsx */
import React, {useState, useContext} from 'react';
import {useQuery} from './components/query';
import {Context as GithubContext} from '../../github-client';
import UserContext from './user-context';
import {IsolatedContainer, Text, LoadingMessagePage, PrimaryButton} from '../../shared/pattern';
import {Column, Row, Container} from '../../shared/layout';
import Profile from './components/profile';
import {jsx} from '@emotion/core';
import {Box} from '@chakra-ui/core';
const gql = String.raw;

const userQuery = gql`
  query getUserData($username: String!) {
    user(login: $username) {
      name
      avatarUrl
      login
      bio
      websiteUrl
      followers {
        totalCount
      }
      following {
        totalCount
      }
      issues(first: 100) {
        totalCount
        edges {
          node {
            id
            bodyText
            title
          }
        }
      }
      organizations(first: 100) {
        edges {
          node {
            id
            name
            avatarUrl
          }
        }
      }
    }
  }
`;

function makeDataMoreNormal(data) {
  console.log(data);
  const {
    user: {
      login,
      name,
      avatarUrl,
      followers: {totalCount: followersCount},
      following: {totalCount: followingCount},
      issues: {edges},
      organizations: {edges: orgs},
    },
  } = data;
  return {
    login,
    name,
    avatarUrl,
    issues: edges.map((issue) => issue.node),
    organizations: orgs.map(({node}) => node),
    followersCount,
    followingCount,
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
      <Box>
        <Box maxW="sm" pl="20px">
          <Profile data={data} />
          <PrimaryButton css={{marginTop: 20, width: '100%'}} to="/">
            Logout
          </PrimaryButton>
        </Box>
      </Box>
    </UserContext.Provider>
  ) : (
    <IsolatedContainer>
      <p>No idea what's up if you've made it this far</p>
    </IsolatedContainer>
  );
}

export default User;
