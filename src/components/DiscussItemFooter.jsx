import React from 'react';
import { useLocation, Link } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { asyncVoteThread } from '../states/threads/action';
import { asyncVoteThreadDetail } from '../states/threadDetail/action';
import { threadShape } from '../utils/propShape';
import { VoteAction } from '../states/threads/action';
import LikeIcon from '../assets/icons/LikeIcon';
import DislikeIcon from '../assets/icons/DislikeIcon';
import CommentIcon from '../assets/icons/CommentIcon';

function DiscussItemFooter({ id, upVotesBy, downVotesBy, totalComments, category }) {
  const dispatch = useDispatch();
  const authUser = useSelector((states) => states.authUser);

  const { pathname } = useLocation();
  const isDetailPage = pathname.includes('/threads/');
  const checkUpVote = authUser ? upVotesBy.includes(authUser.id) : false;
  const checkDownVote = authUser ? downVotesBy.includes(authUser.id) : false;
  const actionUpVote = checkUpVote ? VoteAction.NEUTRAL_VOTE : VoteAction.UP_VOTE;
  const actionDownVote = checkDownVote ? VoteAction.NEUTRAL_VOTE : VoteAction.DOWN_VOTE;

  const onUpVoteThread = () => {
    const threadId = id;

    if (isDetailPage) {
      dispatch(asyncVoteThreadDetail(actionUpVote));
    } else {
      dispatch(asyncVoteThread({ threadId, action: actionUpVote }));
    }
  };

  const onDownVoteThread = () => {
    const threadId = id;

    if (isDetailPage) {
      dispatch(asyncVoteThreadDetail(actionDownVote));
    } else {
      dispatch(asyncVoteThread({ threadId, action: actionDownVote }));
    }
  };

  return (
    <div className="flex flex-wrap justify-between items-center px-6 py-4">
      <div>
        <button
          data-testid="rtl-like-button"
          className={checkUpVote ? 'btn btn-sm btn-primary' : 'btn btn-sm text-primary'}
          onClick={() => onUpVoteThread()}
        >
          <LikeIcon />
          <span>{upVotesBy.length}</span>
        </button>
        <button
          data-testid="rtl-dislike-button"
          className={checkDownVote ? 'btn btn-sm btn-error' : 'btn btn-sm text-error'}
          onClick={() => onDownVoteThread()}
        >
          <DislikeIcon />
          <span>{downVotesBy.length}</span>
        </button>
        {!isDetailPage && (
          <Link to={`/threads/${id}`} className="btn btn-sm">
            <CommentIcon />
            <span>{totalComments}</span>
          </Link>
        )}
      </div>
      <div>
        <span className=" inline-block rounded-md border border-primary text-primary text-xs p-1 ml-2">
          #{category}
        </span>
      </div>
    </div>
  );
}

DiscussItemFooter.propTypes = { ...threadShape };

export default DiscussItemFooter;
