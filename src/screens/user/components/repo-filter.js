import React from 'react';
import {Input, Section} from '../../../shared/pattern';
import PropTypes from 'prop-types';

function RepoFilter({onUpdate, filter}) {
  return (
    //! this is where our input element will go to filter repositories
    <Section>
      <Input
        type="text"
        placeholder="filter repositories"
        onChange={({target: {value}}) => onUpdate(value)}
        value={filter}
      />
    </Section>
  );
}

export default RepoFilter;

RepoFilter.propTypes = {
  onUpdate: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};
