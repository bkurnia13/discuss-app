import React from 'react';
import { Link } from 'react-router';
import { useLocation } from 'react-router';
import { threadShape } from '../utils/propShape';
import DOMPurify from 'dompurify';

function DiscussItemBody({ id, title, body }) {
  const { pathname } = useLocation();
  const isDetailPage = pathname.includes('/threads/');

  return (
    <div className="px-6 py-4 border-b border-base-300">
      <h2 className="card-title">
        {isDetailPage ? (
          <span className="text-primary">{title}</span>
        ) : (
          <Link to={`/threads/${id}`} className="link link-primary no-underline hover:underline">
            {title}
          </Link>
        )}
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
