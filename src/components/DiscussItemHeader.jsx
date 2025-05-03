import React from 'react';
import PropTypes from 'prop-types';
import { userShape } from '../utils/propShape';
import { postedAt } from '../utils/time';

function DiscussItemHeader({ name, email, avatar, createdAt }) {
  return (
    <div className="flex justify-between items-center px-6 py-4 border-b border-base-300">
      <div className="flex gap-3 items-center">
        <div className="avatar">
          <div className="ring-primary ring-offset-base-100 w-12 h-12 rounded-full ring ring-offset-2">
            <img src={avatar} />
          </div>
        </div>
        <div>
          <span className="block font-bold text-base">{name}</span>
          <span className="block text-sm text-neutral-content">{email}</span>
        </div>
      </div>
      <div>
        <span className="block text-sm text-neutral-content">Diposting</span>
        <span className="block text-sm text-neutral-content">{postedAt(createdAt)}</span>
      </div>
    </div>
  );
}

DiscussItemHeader.propTypes = { ...userShape, createdAt: PropTypes.string.isRequired };

export default DiscussItemHeader;
