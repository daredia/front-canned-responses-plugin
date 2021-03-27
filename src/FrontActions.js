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
  const { conversation, createDraft, updateDraft } = frontContext;

  const handleClick = (draftOptions) => () => conversation?.draftId ?
    updateDraft(conversation.draftId, Object.assign(draftOptions, { updateMode: 'insert' })) :
    createDraft(draftOptions);

  return (
    <div className="front-compose" onClick={handleClick(draftOptions)}>{label}</div>
  );
};
