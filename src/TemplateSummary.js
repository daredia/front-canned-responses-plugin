import React from 'react';

const TemplateSummary = ({ name, body }) => {
  if (!name || !body)
    return <></>;

  return (
    <div className="template">
      <div>{name}</div>
      {/* Template body contains raw, unescaped html that has been sanitized on the server */}
      <div dangerouslySetInnerHTML={{ __html: body }} />
    </div>
  );
};

export default TemplateSummary;
