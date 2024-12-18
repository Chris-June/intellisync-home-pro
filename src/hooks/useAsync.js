import { useState, useEffect } from 'react';

export const useAsync = (asyncFn, deps = []) => {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      setState(prev => ({ ...prev, loading: true, error: null }));
      try {
        const result = await asyncFn();
        if (mounted) {
          setState({ data: result, loading: false, error: null });
        }
      } catch (error) {
        if (mounted) {
          setState({ data: null, loading: false, error: error.message });
        }
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, deps);

  return state;
};

export default useAsync;
