import React from 'react';
import LikeIcon from '../assets/icons/LikeIcon';
import DislikeIcon from '../assets/icons/DislikeIcon';

export default function CommentItemFooter() {
  return (
    <div className="mt-2">
      <button className="btn btn-sm btn-primary">
        <LikeIcon />
        <span>999</span>
      </button>
      <button className="btn btn-sm text-error">
        <DislikeIcon />
        <span>1.2K</span>
      </button>
    </div>
  );
}
