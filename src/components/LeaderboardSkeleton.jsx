import React from 'react';

export default function LeaderboardSkeleton() {
  return (
    <div className="flex justify-between items-center mt-4">
      <div className="flex gap-3 items-center">
        <div className="skeleton h-12 w-12 shrink-0 rounded-full"></div>
        <div>
          <div className="skeleton h-6 w-48"></div>
          <div className="skeleton h-5 w-40 mt-2"></div>
        </div>
      </div>
      <div className="skeleton h-6 w-12"></div>
    </div>
  );
}
