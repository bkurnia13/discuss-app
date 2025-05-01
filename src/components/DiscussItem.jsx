import React from 'react';
import DiscussItemHeader from './DiscussItemHeader';
import DiscussItemBody from './DiscussItemBody';
import DiscussItemFooter from './DiscussItemFooter';

export default function DiscussItem() {
  return (
    <div className="card w-full bg-base-200 card-md shadow-md mb-6">
      <div className="card-body p-0 gap-0">
        <DiscussItemHeader />
        <DiscussItemBody />
        <DiscussItemFooter />
      </div>
    </div>
  );
}
