import React, {useReducer, useEffect, useContext, useRef} from 'react';
import PropTypes from 'prop-types';
import * as Github from '../../../github-client';

function useSafeSetState(initialState) {
  return useReducer(
    (state, newState) => ({
      ...state,
      ...newState,
    }),
    initialState,
  );
}

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function useDeepCompare() {
  const mountedRef = useRef(false);
}

function Query({normalize = (data) => data, children, query, variables}) {
  const [state, setState] = useSafeSetState({
    data: null,
    loading: null,
    normalize: null,
    error: null,
  });
  const client = useContext(Github.Context);
  useEffect(() => {}, [query, variables]);
  return children(state);
}

Query.propTypes = {
  normalize: PropTypes.func,
  children: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
  variables: PropTypes.object,
};
