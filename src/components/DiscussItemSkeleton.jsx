import React from 'react';

export default function DiscussItemSkeleton() {
  return (
    <div className="card w-full bg-base-200 card-md shadow-md mb-6">
      <div className="card-body p-0 gap-0">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-base-300">
          <div className="flex gap-3 items-center">
            <div className="skeleton h-12 w-12 shrink-0 rounded-full"></div>
            <div>
              <div className="skeleton h-6 w-24"></div>
              <div className="skeleton h-5 w-24 mt-2"></div>
            </div>
          </div>
          <div>
            <div className="skeleton h-5 w-24"></div>
            <div className="skeleton h-5 w-24 mt-2"></div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 border-b border-base-300">
          <div className="skeleton h-6 w-full"></div>
          <div className="skeleton h-24 w-full mt-3"></div>
        </div>

        {/* Footer */}
        <div className="flex flex-wrap justify-between items-center px-6 py-4">
          <div className="skeleton h-8 w-48"></div>
          <div className="skeleton h-8 w-40"></div>
        </div>
      </div>
    </div>
  );
}
