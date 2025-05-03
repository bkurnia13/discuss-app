import React from 'react';
import { threadShape } from '../utils/propShape';
import DOMPurify from 'dompurify';

function DiscussItemBody({ id, title, body }) {
  return (
    <div className="px-6 py-4 border-b border-base-300">
      <h2 className="card-title">
        <a href={id}>{title}</a>
      </h2>
      <div
        className="pt-2 min-h-24 max-h-24 overflow-ellipsis line-clamp-4"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(body) }}
      ></div>
    </div>
  );
}

DiscussItemBody.propTypes = { ...threadShape };

export default DiscussItemBody;
