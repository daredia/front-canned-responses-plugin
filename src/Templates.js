import React, { useState, useEffect } from 'react';
import SearchBox from './SearchBox';
import TemplateDetails from './TemplateDetails';
import TemplateSummary from './TemplateSummary';
import { useStoreState } from './Store';

const Templates = () => {
  const { secret } = useStoreState();

  const [isLoading, setLoadingState] = useState(true);
  const [templates, setTemplates] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
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
    const filteredTemplates = templates.filter(t => {
      const queryTerms = searchQuery.toLowerCase().split(' ');
      // Support non-exact matches
      return queryTerms.every(qt => t.name.toLowerCase().includes(qt));
    });
    setSearchResults(filteredTemplates);
  }, [templates, searchQuery]);

  const handleChange = e => setSearchQuery(e.target.value);
  const handleClick = (template) => () => setSelectedTemplate(template);
  const showAllTemplates = () => setSelectedTemplate(null);

  if (isLoading)
    return <div className="notice">Loading...</div>;

  if (error)
    return <div className="notice error">{error}</div>;

  if (!templates.length)
    return <div className="notice">No templates found.</div>;

  if (selectedTemplate)
    return (
      <TemplateDetails
        name={selectedTemplate.name}
        subject={selectedTemplate.subject}
        body={selectedTemplate.body}
        onBackClick={showAllTemplates} />
    );

  return (
    <>
      <div className="template-searchbox-container">
        <SearchBox searchQuery={searchQuery} onChange={handleChange} />
       </div>
      <div className="template-list-container">
        {searchResults.map(t => <TemplateSummary key={t.id} name={t.name} body={t.body} onClick={handleClick(t)} />)}
      </div>
    </>
  );

  // return <pre>{JSON.stringify(templates, undefined, 2)}</pre>;
};

export default Templates;
