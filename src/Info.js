import React, { useState, useEffect } from 'react';
import { useStoreState } from './Store';

const Info = () => {
  const { secret } = useStoreState();

  const [isLoading, setLoadingState] = useState(true);
  const [message, setMessage] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const uri = `/api/search?auth_secret=${secret}`;
    const initialMessage = {msg: 'Hello world from client.'};

    setLoadingState(true);
    setError(null);

    fetch(`${uri}`, {
      method: 'GET',
      mode: 'cors'
    })
    .then(r => {
      if (!r.ok && r.status !== 404)
        throw Error(r.statusText);

      if(r.status === 404)
        return ({});

      return r.json();
    })
    .then(response => setMessage(Object.assign(initialMessage, response.data)))
    .catch((err) => {
      setMessage(initialMessage);
      setError(err.message);
    })
    .finally(() => setLoadingState(false));
  }, [secret]);

  if (isLoading)
    return <div className="notice">Loading...</div>;

  if (error)
    return <div className="notice error">{error}</div>;

  return <div className="notice">{JSON.stringify(message, undefined, 2)}</div>;
};

export default Info;
