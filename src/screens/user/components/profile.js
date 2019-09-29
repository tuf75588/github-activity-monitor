/* @jsx jsx */

import React from 'react';
import {Image, Section} from '../../../shared/pattern';
import {jsx} from '@emotion/core';
import {Box, Text} from '@chakra-ui/core';
function Profile({data}) {
  const {organizations} = data;
  console.log(data);
  return (
    <div>
      <Section>
        <Image src={data.avatarUrl} responsive rounded css={{width: 'auto'}} />
      </Section>
      <Text fontSize="2xl" fontWeight="bold" textAlign="center" css={{marginBottom: 10}}>
        Organizations
      </Text>
      <Box d="flex" justifyContent="space-around" flexWrap="wrap">
        {organizations &&
          organizations.map((orgs) => <OrganizationSection src={orgs.avatarUrl} key={orgs.id} name={orgs.name} />)}
      </Box>
    </div>
  );
}

function OrganizationSection({src, key, name}) {
  return (
    <div key={key}>
      <Image src={src} responsive alt={`profile login for ${name}`} css={{width: 40, height: 40}} />
    </div>
  );
}

function ProfileState() {
  return <div>this is where followers and stuff will go.</div>;
}
export default Profile;
