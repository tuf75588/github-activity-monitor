/* @jsx jsx */

import React, {useContext} from 'react';
import {Image, Section} from '../../../shared/pattern';
import {jsx} from '@emotion/core';
import {Text} from '../../../shared/pattern';
import UserContext from '../user-context';
function Profile({user}) {
  console.log(user);
  return (
    <Section>
      <Text>{user.name}</Text>
      <Text>{user.login}</Text>
    </Section>
  );
}

function ProfileStatsSection({followers, following, reposCount}) {
  return (
    <Section css={{textAlign: 'center'}}>
      <ProfileStat stat={followers} label="followers" />
      <ProfileStat stat={following} label="following" />
      <ProfileStat stat={reposCount} label="repositories" />
    </Section>
  );
}

function OrganizationsSection({src}) {
  return <Image src={src} css={{height: 40, width: 40}} />;
}

function ProfileStat({stat, label}) {
  return (
    <div
      css={{
        display: 'inline-block',
        width: 80,
      }}
    >
      <Text size="heading" css={{margin: 0}}>
        {stat}
      </Text>
      <Text tint="fadedExtra">
        <small>{label}</small>
      </Text>
    </div>
  );
}

function ProfileUserConsumer() {
  return <UserContext.Consumer>{(user) => <Profile user={user} />}</UserContext.Consumer>;
}

export default ProfileUserConsumer;
