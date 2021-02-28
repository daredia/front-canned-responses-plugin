import React, { useState } from 'react';
import classNames from "classnames";

const TemplateSummary = ({ name, body, onClick }) => {
  const [isHovered, setHoverState] = useState(false);

  const toggleHover = () => setHoverState(!isHovered);
  const handleClick = e => {
    // Don't open a link that may have been clicked inside the template - the user can
    // subsequently click on links within the detail view instead
    e.preventDefault();
    onClick();
  }

  const titleCls = classNames({
    'ts-title': true,
    hovered: isHovered,
  });

  if (!name || !body)
    return <></>;

  return (
    <div className="template-summary" onClick={handleClick} onMouseEnter={toggleHover} onMouseLeave={toggleHover}>
      <div className={titleCls}>{name}</div>
      {/* Template body contains raw, unescaped html that has been sanitized on the server */}
      <div className="ts-body" dangerouslySetInnerHTML={{ __html: body }} />
    </div>
  );
};

export default TemplateSummary;
