import React from 'react';
import { commentShape } from '../utils/propShape';
import CommentItemHeader from './CommentItemHeader';
import CommentItemFooter from './CommentItemFooter';

function CommentItem({ authUser, content, createdAt, owner, upVotesBy, downVotesBy }) {
  return (
    <div className="border-b border-base-300 pb-3 mt-3">
      <CommentItemHeader owner={owner} createdAt={createdAt} />
      <p className="text-sm mt-2">{content}</p>
      <CommentItemFooter authUser={authUser} upVotesBy={upVotesBy} downVotesBy={downVotesBy} />
    </div>
  );
}

CommentItem.propTypes = { ...commentShape };

export default CommentItem;
