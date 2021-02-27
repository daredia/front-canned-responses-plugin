import React, { useState, useEffect } from 'react';
import TemplateSummary from './TemplateSummary';
import { useStoreState } from './Store';

const Templates = () => {
  const { secret } = useStoreState();

  const [isLoading, setLoadingState] = useState(true);
  const [templates, setTemplates] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);

  // Fetch full list of templates from the server
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

  // Filter templates based on search query
  useEffect(() => {
    const filteredTemplates = templates.filter(template => {
      // TODO(shez): search the rendered body, not its raw html
      const templateText = `${template.subject} ${template.body}`;
      // TODO(shez): support non-exact matches by splitting the query
      // by whitespace and checking that templateText includes each word
      return templateText.toLowerCase().includes(searchQuery.toLowerCase());
    });
    setSearchResults(filteredTemplates);
  }, [templates, searchQuery]);

  if (isLoading)
    return <div className="notice">Loading...</div>;

  if (error)
    return <div className="notice error">{error}</div>;

  if (!templates.length) {
    return <div className="notice">No templates found.</div>;
  }

  const handleChange = e => {
    setSearchQuery(e.target.value);
  };

  // TODO(shez): factor out into separate function components
  return (
    <>
      <input
        id="template-search-input"
        type="text"
        placeholder="Search templates..."
        value={searchQuery}
        onChange={handleChange}
      />

      {searchResults.map(t => <TemplateSummary key={t.id} name={t.name} body={t.body} />)}
    </>
  );

  // return <pre>{JSON.stringify(templates, undefined, 2)}</pre>;
};

export default Templates;
