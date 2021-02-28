import React from 'react';
import { FrontCompose } from './FrontActions';
import { useStoreState } from './Store';

const TemplateDetails = ({ name, subject, body, onBackClick }) => {
  const { frontContext } = useStoreState();
  const { conversation } = frontContext;
  const draftOptions = {
    subject,
    content: {
      body,
      type: 'html',
    },
    // replyOptions: {
    //   type: 'replyAll',
    //   originalMessageId: conversation?.id,
    // }
  }

  console.log({frontContext});

  if (!name || !body)
    return <></>;

  return (
    <>
      <div onClick={onBackClick}>&lt; Back</div>
      <div className="template">
        <div>{name}</div>
        <div>{subject}</div>
        {/* Template body contains raw, unescaped html that has been sanitized on the server */}
        <div dangerouslySetInnerHTML={{ __html: body }} />
      </div>
      <FrontCompose label="Insert draft" draftOptions={draftOptions} />
    </>
  );

  // return <pre>{JSON.stringify(template, undefined, 2)}</pre>;
};

export default TemplateDetails;
