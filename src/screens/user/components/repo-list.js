/* @jsx jsx */

import React, {useContext} from 'react';
import UserContext from '../user-context';
import {jsx} from '@emotion/core';
import {Text} from '../../../shared/pattern';
import styled from '@emotion/styled';

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

const ListItem = styled.li({padding: '20px 0'}, ({theme}) => theme.common.borderBottom);

function RepoListItem({repo}) {
  return (
    <ListItem>
      <a href={`repo.url`} css={{textDecoration: 'none'}}>
        <Text size="superstandard" tint="faded" css={{color: 'rgb(51,122,183)'}}>
          {repo.name}
        </Text>
        <div css={{marginTop: 15}}>
          <Text tint="fadedExtra">{repo.description && repo.description}</Text>
        </div>
      </a>
    </ListItem>
  );
}

const Stat = styled(Text)({marginLeft: 10}).withComponent('strong');
Stat.defaultProps = {tint: 'fadedExtra'};

export default RepoList;
