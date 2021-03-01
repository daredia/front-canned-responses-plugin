import React, { useState, useEffect } from 'react';
import { FrontCompose } from './FrontActions';
import { useStoreState } from './Store';

const TemplateDetails = ({ name, subject, body, onBackClick }) => {
  const initialDraftOptions = {
    subject,
    content: {
      body,
      type: 'html',
    }
  };
  const [draftOptions, setDraftOptions] = useState(initialDraftOptions);
  const { frontContext } = useStoreState();

  useEffect(() => {
    if (!frontContext.listMessages) {
      setDraftOptions(initialDraftOptions);
      return undefined;
    }

    frontContext.listMessages().then(r => {
      // TODO(shez): handle pagination of messages
      const lastMessage = r.results[r.results.length - 1];
      const replyOptions = {
        type: 'replyAll',
        originalMessageId: lastMessage.id,
      }
      setDraftOptions(Object.assign(initialDraftOptions, {replyOptions}));
    });
  }, [frontContext, initialDraftOptions]);

  if (!name || !body)
    return <></>;

  return (
    <>
      <div className="btn-back" onClick={onBackClick}>Back</div>
      <div className="template-details">
        <div>{name}</div>
        <div>{subject}</div>
        {/* Template body contains raw, unescaped html that has been sanitized on the server */}
        <div dangerouslySetInnerHTML={{ __html: body }} />
      </div>
      <div className="insert-draft-btn-container" >
        <FrontCompose label="Insert draft" draftOptions={draftOptions} />
      </div>
    </>
  );
};

export default TemplateDetails;
