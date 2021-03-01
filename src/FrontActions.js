import React from 'react';
import { useStoreState } from './Store';

export const FrontLink = ({ label, href }) => {
  const { frontContext } = useStoreState();
  const { openUrl } = frontContext;

  return (
    <a onClick={(e) => {e.preventDefault(); openUrl(href);}} href={href}>
      {label}
    </a>
  );
};

export const FrontCompose = ({ label, draftOptions }) => {
  const { frontContext } = useStoreState();
  const { createDraft } = frontContext;

  const handleClick = (draftOptions) => () => createDraft(draftOptions);

  return (
    <div className="front-compose" onClick={handleClick(draftOptions)}>{label}</div>
  );
};
