/* @jsx jsx */

import React, {useContext} from 'react';
import {Image, Section} from '../../../shared/pattern';
import {jsx} from '@emotion/core';
import {Text} from '../../../shared/pattern';
import UserContext from '../user-context';
function Profile() {
  const data = useContext(UserContext);
  const {organizations} = data;
  const {followersCount, followingCount, reposCount} = data;

  console.log(data);
  return (
    <div>
      <Section>
        <Image src={data.avatarUrl} responsive rounded css={{width: 'auto'}} />
        <Text size="heading">{data.name}</Text>
        <Text size="standard" tint="faded" css={{fontSize: 20, fontWeight: 300}}>
          {data.login}
        </Text>
      </Section>
      <Section>
        <ProfileStatsSection followers={followersCount} following={followingCount} reposCount={reposCount} />
      </Section>
    </div>
  );
}

function OrganizationSection({src, key, name}) {
  return (
    <div>
      <Image src={src} responsive alt={`profile login for ${name}`} css={{width: 40, height: 40}} />
    </div>
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

export default Profile;
