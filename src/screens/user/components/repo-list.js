/* @jsx jsx */

import React, {useContext} from 'react';
import UserContext from '../user-context';
import {jsx} from '@emotion/core';
import {Text, Anchor} from '../../../shared/pattern';
import styled from '@emotion/styled';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';

function RepoList({filter}) {
  const {repositories} = useContext(UserContext);
  return (
    <ul
      css={{
        listStyle: 'none',
        paddingLeft: 0,
        marginBottom: '10',
        marginTop: 0,
      }}
    >
      {repositories
        .filter((repo) => repo.name.includes(filter))
        .map((repo) => (
          <RepoListItem repo={repo} key={repo.id} />
        ))}
    </ul>
  );
}

const ListItem = styled.li(
  {padding: '20px 0'},
  ({theme}) => theme.common.borderBottom,
);

function RepoListItem({repo}) {
  const timeUpdated = distanceInWordsToNow(repo.pushedAt);
  return (
    <ListItem>
      <div css={{float: 'right'}}>
        <Stat>{repo.language}</Stat>
        <Stat>&#9734; {repo.stargazersCount}</Stat>
        <Stat>&#4292; {repo.forksCount}</Stat>
      </div>
      <div>
        <Anchor href={repo.url}>
          <Text size="superstandard">{repo.name}</Text>
        </Anchor>
      </div>
      <p>
        <Text tint="fadedExtra" css={{margin: '0 0 10px'}}>
          {repo.description}
        </Text>
      </p>
      <time>
        <Text tint="fadedExtra">Updated {timeUpdated} ago</Text>
      </time>
    </ListItem>
  );
}

const Stat = styled(Text)({marginLeft: 10}).withComponent('strong');
Stat.defaultProps = {tint: 'fadedExtra'};

export default RepoList;
