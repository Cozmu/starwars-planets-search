import { useState, useEffect } from 'react';

function useFetch(url) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setErrror] = useState(null);

  useEffect(() => {
    const toSeek = async () => {
      try {
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
      } catch (e) {
        setErrror(e);
      } finally {
        setIsLoading(false);
      }
    };
    toSeek();
  }, [url]);

  return { data, isLoading, error };
}

export default useFetch;
