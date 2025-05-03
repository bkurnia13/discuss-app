import React from 'react';
import { useSelector } from 'react-redux';

export default function PopularCategory() {
  const { isLoading } = useSelector((states) => states);

  return (
    <div className="card w-full bg-base-200 card-md shadow-md my-6">
      <div className="card-body">
        <h2 className="card-title">Kategori Popular</h2>
        {isLoading ? (
          <div className="skeleton h-8 w-full"></div>
        ) : (
          <div>
            <input
              type="checkbox"
              aria-label="#react"
              className="btn btn-sm mr-2 border border-primary text-primary checked:text-base-200"
            />
            <input
              type="checkbox"
              aria-label="#redux"
              className="btn btn-sm mr-2 border border-primary text-primary checked:text-base-200"
            />
            <input
              type="checkbox"
              aria-label="#perkenalan"
              className="btn btn-sm mr-2 border border-primary text-primary checked:text-base-200"
            />
          </div>
        )}
      </div>
    </div>
  );
}
