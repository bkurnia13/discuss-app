import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncVoteComment } from '../states/threadDetail/action';
import { VoteAction } from '../states/threads/action';
import PropTypes from 'prop-types';
import LikeIcon from '../assets/icons/LikeIcon';
import DislikeIcon from '../assets/icons/DislikeIcon';

function CommentItemFooter({ commentId, upVotesBy, downVotesBy }) {
  const dispatch = useDispatch();
  const authUser = useSelector((states) => states.authUser);

  const checkUpVote = upVotesBy.includes(authUser.id);
  const checkDownVote = downVotesBy.includes(authUser.id);
  const actionUpVote = checkUpVote ? VoteAction.NEUTRAL_VOTE : VoteAction.UP_VOTE;
  const actionDownVote = checkDownVote ? VoteAction.NEUTRAL_VOTE : VoteAction.DOWN_VOTE;

  console.log(downVotesBy);

  const onUpVoteComment = () => {
    dispatch(asyncVoteComment({ commentId, action: actionUpVote }));
  };

  const onDownVoteComment = () => {
    dispatch(asyncVoteComment({ commentId, action: actionDownVote }));
  };

  return (
    <div className="mt-2">
      <button
        className={checkUpVote ? 'btn btn-sm btn-primary' : 'btn btn-sm text-primary'}
        onClick={() => onUpVoteComment()}
      >
        <LikeIcon />
        <span>{upVotesBy.length}</span>
      </button>
      <button
        className={checkDownVote ? 'btn btn-sm btn-error' : 'btn btn-sm text-error'}
        onClick={() => onDownVoteComment()}
      >
        <DislikeIcon />
        <span>{downVotesBy.length}</span>
      </button>
    </div>
  );
}

CommentItemFooter.propTypes = {
  commentId: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string),
  downVotesBy: PropTypes.arrayOf(PropTypes.string),
};

export default CommentItemFooter;
