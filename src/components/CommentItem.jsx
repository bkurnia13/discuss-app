import React from 'react';
import CommentItemHeader from './CommentItemHeader';
import CommentItemFooter from './CommentItemFooter';

export default function CommentItem() {
  return (
    <div className="border-b border-base-300 pb-3 mt-3">
      <CommentItemHeader />
      <p className="text-sm mt-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit ipsa cumque quae laudantium
        quia dolor officia, voluptas tempore praesentium iste.
      </p>
      <CommentItemFooter />
    </div>
  );
}
