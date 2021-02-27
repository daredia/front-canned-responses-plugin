import React, { useState, useEffect } from 'react';
import { useStoreState } from './Store';

const Templates = () => {
  const { secret } = useStoreState();

  const [isLoading, setLoadingState] = useState(true);
  const [templates, setTemplates] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const uri = `/api/list-templates?auth_secret=${secret}`;

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
    .then(response => setTemplates(response.data))
    .catch((err) => {
      setTemplates([]);
      setError(err.message);
    })
    .finally(() => setLoadingState(false));
  }, [secret]);

  if (isLoading)
    return <div className="notice">Loading...</div>;

  if (error)
    return <div className="notice error">{error}</div>;

  if (!templates.length) {
    return <div className="notice">No templates found.</div>;
  }

  return templates.map(t => (
    <div key={t.id} className="template">
      <div>{t.subject}</div>
      <div>{t.body}</div>
    </div>
  ));

  // return <pre>{JSON.stringify(templates, undefined, 2)}</pre>;
};

export default Templates;
