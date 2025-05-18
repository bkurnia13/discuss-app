import React from 'react';
import PropTypes from 'prop-types';
import DiscussItemHeader from './DiscussItemHeader';
import DiscussItemBody from './DiscussItemBody';
import DiscussItemFooter from './DiscussItemFooter';
import { threadShape } from '../utils/propShape';

function DiscussItem({ thread, size = 'card-md', bg = 'bg-base-200', shadow = 'shadow-md' }) {
  return (
    <div className={`card w-full mb-6 ${size} ${bg} ${shadow}`}>
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
  size: PropTypes.string,
  bg: PropTypes.string,
  shadow: PropTypes.string,
};

export default DiscussItem;
