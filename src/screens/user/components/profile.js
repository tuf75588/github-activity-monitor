/* @jsx jsx */

import React, {useContext} from 'react';
import {Image, Section} from '../../../shared/pattern';
import {jsx} from '@emotion/core';
import {Text} from '../../../shared/pattern';
import UserContext from '../user-context';

function Profile() {
  let data = useContext(UserContext);
  return (
    <div>
      <Section>
        <Image src={data.avatarUrl} alt="User avatar" responsive rounded />
        <Text size="heading">{data.name}</Text>
        <Text css={{fontSize: 20, fontWeight: 300}} tint="faded" size="heading">
          {data.login}
        </Text>
      </Section>

      <ProfileStatsSection
        followers={data.followersCount}
        following={data.followingCount}
        reposCount={data.reposCount}
      />
      {data.organizations.length ? <OrganizationsSection orgs={data.organizations} /> : null}
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

function OrganizationsSection({orgs}) {
  return (
    <Section>
      <Text size="superstandard">Organizations</Text>
      {orgs.map((org) => {
        return (
          <a key={org.id} href={org.url} data-tooltip={org.login}>
            <Image src={org.avatarUrl} responsive rounded css={{margin: 5, height: 42, width: 42, borderRadius: 3}} />
          </a>
        );
      })}
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
