import React from 'react';
import DiscussItemHeader from './DiscussItemHeader';
import DiscussItemBody from './DiscussItemBody';
import DiscussItemFooter from './DiscussItemFooter';
import AddComment from './AddComment';
import CommentItem from './CommentItem';

export default function DiscussDetail() {
  return (
    <div className="card w-full lg:w-2/3 bg-base-200 card-md shadow-md my-6 mx-auto">
      <div className="card-body p-0 gap-0">
        <DiscussItemHeader />
        <DiscussItemBody />
        <DiscussItemFooter />
        <AddComment />
        <div className="px-6 py-4">
          <span className="font-semibold text-sm">Komentar (10)</span>
          <CommentItem />
          <CommentItem />
          <CommentItem />
          <CommentItem />
          <CommentItem />
        </div>
      </div>
    </div>
  );
}
