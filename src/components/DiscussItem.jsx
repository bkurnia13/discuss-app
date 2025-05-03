import React from 'react';
import PropTypes from 'prop-types';
import DiscussItemHeader from './DiscussItemHeader';
import DiscussItemBody from './DiscussItemBody';
import DiscussItemFooter from './DiscussItemFooter';
import { threadShape } from '../utils/propShape';

function DiscussItem({ thread }) {
  return (
    <div className="card w-full bg-base-200 card-md shadow-md mb-6">
      <div className="card-body p-0 gap-0">
        <DiscussItemHeader {...thread.user} createdAt={thread.createdAt} />
        <DiscussItemBody {...thread} />
        <DiscussItemFooter {...thread} />
      </div>
    </div>
  );
}

DiscussItem.propTypes = {
  thread: PropTypes.shape(threadShape),
};

export default DiscussItem;
