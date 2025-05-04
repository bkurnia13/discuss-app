import React from 'react';
import DOMPurify from 'dompurify';
import { commentShape } from '../utils/propShape';
import CommentItemHeader from './CommentItemHeader';
import CommentItemFooter from './CommentItemFooter';

function CommentItem({ id, content, createdAt, owner, upVotesBy, downVotesBy }) {
  return (
    <div className="border-b border-base-300 pb-3 mt-3">
      <CommentItemHeader owner={owner} createdAt={createdAt} />
      <div
        className="text-sm mt-2"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
      ></div>
      <CommentItemFooter commentId={id} upVotesBy={upVotesBy} downVotesBy={downVotesBy} />
    </div>
  );
}

CommentItem.propTypes = { ...commentShape };

export default CommentItem;
