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

function useDeepCompare(inputs, callback) {
  const cleanupRef = useRef();

  useEffect(() => {
    if (!isEqual(inputs, previousInputs)) {
      cleanupRef.current = callback();
    }
    return cleanupRef.current;
  });

  const previousInputs = usePrevious(inputs);
}

//! these arguments represent the state that User depends on.
function useQuery({normalize = (data) => data, children, query, variables}) {
  const [state, safeSetState] = useSafeSetState({
    loaded: false,
    fetching: false,
    data: null,
    error: null,
  });
  const client = useContext(Github.Context);
  useEffect(() => {
    safeSetState({fetching: true});
  });
  return state;
}

const Query = ({children, ...props}) => children(useQuery(props));

Query.propTypes = {
  normalize: PropTypes.func,
  children: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
  variables: PropTypes.object,
};

export default useQuery;
export {useQuery};
