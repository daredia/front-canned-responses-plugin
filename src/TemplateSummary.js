import React from 'react';

const TemplateSummary = ({ name, body, onClick }) => {
  if (!name || !body)
    return <></>;

  const handleClick = e => {
    // Don't open a link that may have been clicked inside the template - the user can
    // subsequently click on links within the detail view instead
    e.preventDefault();
    onClick();
  }

  return (
    <div className="template-summary" onClick={handleClick}>
      <div className="ts-title">{name}</div>
      {/* Template body contains raw, unescaped html that has been sanitized on the server */}
      <div className="ts-body" dangerouslySetInnerHTML={{ __html: body }} />
    </div>
  );
};

export default TemplateSummary;
