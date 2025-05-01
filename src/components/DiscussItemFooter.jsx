import React from 'react';
import LikeIcon from '../assets/icons/LikeIcon';
import DislikeIcon from '../assets/icons/DislikeIcon';
import CommentIcon from '../assets/icons/CommentIcon';

export default function DiscussItemFooter() {
  return (
    <div className="flex flex-wrap justify-between items-center px-6 py-4">
      <div>
        <button className="btn btn-sm btn-primary">
          <LikeIcon />
          <span>999</span>
        </button>
        <button className="btn btn-sm text-error">
          <DislikeIcon />
          <span>1.2K</span>
        </button>
        <button className="btn btn-sm">
          <CommentIcon />
          <span>10</span>
        </button>
      </div>
      <div>
        <span className=" inline-block rounded-md border border-primary text-primary text-xs p-1 mx-1">
          #perkenalan
        </span>
        <span className="inline-block rounded-md border border-primary text-primary text-xs p-1 mx-1">
          #react
        </span>
      </div>
    </div>
  );
}
