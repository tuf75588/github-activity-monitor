import React from 'react';


function useLoading() {
  const [isLoading, setState] = React.useState(false);
  const mount = React.useRef(false);
  React.useEffect(() => {
    mount.current = true;
    return () => {
      mount.current = false;
    };
  }, []);
  function load(aPromise) {
    setState(true);
    aPromise.finally(() => mount.current && setState(false));
  }
  return [isLoading, load];
}
export default useLoading;
