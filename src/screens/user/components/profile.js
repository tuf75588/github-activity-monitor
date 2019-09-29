/* @jsx jsx */

import React from 'react';
import {Image, Section} from '../../../shared/pattern';
import {jsx} from '@emotion/core';
import {Box, Text} from '@chakra-ui/core';
function Profile({data}) {
  const {organizations} = data;
  console.log(data);
  return (
    <Section>
      <Image src={data.avatarUrl} responsive rounded css={{width: 'auto'}} />
      <Text fontSize="2xl" fontWeight="em" textAlign="center">
        Organizations
      </Text>
      <Box d="flex" mt="5" justifyContent="space-around">
        {organizations &&
          organizations.map((orgs) => <OrganizationSection src={orgs.avatarUrl} key={orgs.id} name={orgs.name} />)}
      </Box>
    </Section>
  );
}

function OrganizationSection({src, key, name}) {
  return (
    <div key={key}>
      <Image src={src} responsive alt={`profile login for ${name}`} css={{width: 60, height: 60}} />
    </div>
  );
}

export default Profile;
