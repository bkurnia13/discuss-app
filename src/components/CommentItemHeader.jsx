import React from 'react';
import PropTypes from 'prop-types';
import { commentShape } from '../utils/propShape';
import { postedAt } from '../utils/time';

function CommentItemheader({ owner, createdAt }) {
  console.log(owner);

  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-3 items-center">
        <div className="avatar">
          <div className="ring-primary ring-offset-base-100 w-8 h-8 rounded-full ring ring-offset-2">
            <img src={owner.avatar} />
          </div>
        </div>
        <div>
          <span className="block font-bold text-sm">{owner.name}</span>
          <span className="block text-xs text-neutral-content">{owner.id}</span>
        </div>
      </div>
      <span className="text-sm text-neutral-content">{postedAt(createdAt)}</span>
    </div>
  );
}

CommentItemheader.propTypes = {
  ...commentShape.owner,
  cretedAt: PropTypes.string.isRequired,
};

export default CommentItemheader;
