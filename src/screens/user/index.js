/* @jsx jsx */
import React, {useState, useContext} from 'react';
import {useQuery} from './components/query';
import {Context as GithubContext} from '../../github-client';
import UserContext from './user-context';
import {IsolatedContainer, Text, LoadingMessagePage, PrimaryButton, Button} from '../../shared/pattern';
import {Column, Row, Container} from '../../shared/layout';
import Profile from './components/profile';
import {jsx} from '@emotion/core';
import RepoFilter from './components/repo-filter';
import RepoList from './components/repo-list';
import {navigate} from '@reach/router';
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
      repositories(
        first: 100
        privacy: PUBLIC
        isFork: false
        ownerAffiliations: [COLLABORATOR, OWNER]
        orderBy: {field: PUSHED_AT, direction: DESC}
      ) {
        totalCount
        edges {
          node {
            id
            name
            description
            url
            pushedAt
            stargazers {
              totalCount
            }
            forkCount
            languages(first: 1) {
              edges {
                node {
                  name
                }
              }
            }
          }
        }
      }
      organizations(first: 100) {
        edges {
          node {
            id
            name
            avatarUrl
            login
          }
        }
      }
    }
  }
`;

function makeDataMoreNormal(data) {
  // console.log(data);
  const {
    user: {
      login,
      name,
      avatarUrl,
      followers: {totalCount: followersCount},
      following: {totalCount: followingCount},
      organizations: {edges: orgs},
      repositories: {edges: reposData, totalCount: reposCount},
    },
  } = data;
  const repositories = reposData.map((r) => {
    return {
      ...r.node,
      languages: undefined,
      language: r.node.languages.edges[0] ? r.node.languages.edges[0].node.name : 'Unknown',
      stargazersCount: r.node.stargazers.totalCount,
    };
  });
  return {
    login,
    name,
    avatarUrl,
    organizations: orgs.map(({node}) => node),
    followersCount,
    followingCount,
    repositories,
    reposCount,
  };
}

//! user will receive a username prop for our graphql query
function User({username}) {
  const [filter, setFilter] = useState('');
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
      <Container>
        <Row>
          <Column width="3">
            <Profile />
            <PrimaryButton onClick={logout} css={{width: '100%', marginTop: 20}}>
              Logout
            </PrimaryButton>
            <Button css={{marginTop: 5, width: '100%'}} onClick={() => navigate('/')}>
              Try another
            </Button>
          </Column>
          <Column width="9">
            <Text size="subheading">Repositories</Text>
            <RepoFilter onUpdate={setFilter} filter={filter} />
            <RepoList filter={filter} />
          </Column>
        </Row>
      </Container>
    </UserContext.Provider>
  ) : (
    <IsolatedContainer>
      <p>No idea what's up if you've made it this far</p>
    </IsolatedContainer>
  );
}

export default User;
