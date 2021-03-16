import React, { useState, useEffect } from 'react';

import { FrontCompose } from './FrontActions';
import { useStoreState } from './Store';

const TemplateDetails = ({ name, subject, body, onBackClick }) => {
  const initialDraftOptions = {
    subject: subject || '',
    content: {
      body,
      type: 'html',
    }
  };
  const [draftOptions, setDraftOptions] = useState(initialDraftOptions);
  const { frontContext } = useStoreState();

  // Fetch messages for the currently selected conversation and use them
  // to populate draft options for the 'Insert Draft' compose button
  useEffect(() => {
    if (!frontContext?.listMessages || !frontContext?.conversation) {
      setDraftOptions(initialDraftOptions);
      return undefined;
    }

    async function listAllMessagesAndUpdateDraftOptions() {
      const response = await frontContext.listMessages();

      let nextPageToken = response.token;
      const messages = response.results;

      while (nextPageToken) {
        const {results, token} = await frontContext.listMessages(nextPageToken);

        nextPageToken = token;
        messages.push(...results);
      }

      const lastMessage = messages[messages.length - 1];
      const replyOptions = {
        type: 'replyAll',
        originalMessageId: lastMessage?.id,
      }
      setDraftOptions(Object.assign(initialDraftOptions, {replyOptions}));
    }
    listAllMessagesAndUpdateDraftOptions();
  }, [frontContext, initialDraftOptions]);

  if (!name || !body)
    return <></>;

  return (
    <>
      <div className="btn-back" onClick={onBackClick}>Back</div>
      <div className="template-details">
        <h4>Title</h4>
        <p>{name}</p>
        <h4>Subject</h4>
        <p>{subject || 'None'}</p>
        <h4>Body</h4>
        {/* Template body contains raw, unescaped html that has been sanitized on the server */}
        <p dangerouslySetInnerHTML={{ __html: body }} />
      </div>
      <div className="insert-draft-btn-container" >
        <FrontCompose label="Insert draft" draftOptions={draftOptions} />
      </div>
    </>
  );
};

export default TemplateDetails;
