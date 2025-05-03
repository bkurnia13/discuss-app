import React from 'react';
import PropTypes from 'prop-types';
import LikeIcon from '../assets/icons/LikeIcon';
import DislikeIcon from '../assets/icons/DislikeIcon';

function CommentItemFooter({ authUser, upVotesBy, downVotesBy }) {
  return (
    <div className="mt-2">
      <button
        className={
          upVotesBy.includes(authUser) ? 'btn btn-sm btn-primary' : 'btn btn-sm text-primary'
        }
      >
        <LikeIcon />
        <span>{upVotesBy.length}</span>
      </button>
      <button
        className={
          downVotesBy.includes(authUser) ? 'btn btn-sm btn-error' : 'btn btn-sm text-error'
        }
      >
        <DislikeIcon />
        <span>{downVotesBy.length}</span>
      </button>
    </div>
  );
}

CommentItemFooter.propTypes = {
  authUser: PropTypes.string,
  upVotesBy: PropTypes.arrayOf(PropTypes.string),
  downVotesBy: PropTypes.arrayOf(PropTypes.string),
};

export default CommentItemFooter;
