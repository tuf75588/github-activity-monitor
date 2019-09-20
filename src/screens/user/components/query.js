import React, {useReducer, useEffect, useContext, useRef} from 'react';
import PropTypes from 'prop-types';
import * as Github from '../../../github-client';
import isEqual from 'lodash/isEqual';

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function useSetState(initialState) {
  return useReducer(
    (state, newState) => ({
      ...state,
      ...newState,
    }),
    initialState,
  );
}

function useSafeSetState(initialState) {
  const [state, setState] = useSetState(initialState);
  const mountedRef = useRef(false);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);
  const safeSetState = (...args) => mountedRef.current && setState(...args);
  return [state, safeSetState];
}

export function useQuery({
  normalize = (data) => data,
  children,
  query,
  variables,
}) {
  const [state, safeSetState] = useSafeSetState({
    loaded: false,
    fetching: false,
    data: null,
    error: null,
  });

  useEffect(() => {
    if (isEqual(previousInputs, [query, variables])) {
      return;
    }
    safeSetState({fetching: true});
  });

  const previousInputs = usePrevious([query, variables]);
}

const Query = ({children, props}) => children(useQuery(props));

Query.propTypes = {
  normalize: PropTypes.func,
  children: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
  variables: PropTypes.object,
};
