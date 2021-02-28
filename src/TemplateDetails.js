import React from 'react';
import { Link } from "react-router-dom";

const TemplateDetails = ({ name, body }) => {
  if (!name || !body)
    return <></>;

  return (
    <div className="template">
      <div>{name}</div>
      {/* Template body contains raw, unescaped html that has been sanitized on the server */}
      <div dangerouslySetInnerHTML={{ __html: body }} />
    </div>
  );

  // return <pre>{JSON.stringify(template, undefined, 2)}</pre>;
};

export default TemplateDetails;
