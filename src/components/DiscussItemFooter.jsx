import React from 'react';
import { useLocation, Link } from 'react-router';
import { threadShape } from '../utils/propShape';
import LikeIcon from '../assets/icons/LikeIcon';
import DislikeIcon from '../assets/icons/DislikeIcon';
import CommentIcon from '../assets/icons/CommentIcon';

function DiscussItemFooter({ authUser, id, upVotesBy, downVotesBy, totalComments, category }) {
  const { pathname } = useLocation();
  const isDetailPage = pathname.includes('/threads/');

  return (
    <div className="flex flex-wrap justify-between items-center px-6 py-4">
      <div>
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
