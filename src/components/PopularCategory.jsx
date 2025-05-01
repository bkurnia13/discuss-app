import React from 'react';

export default function PopularCategory() {
  return (
    <div className="card w-full bg-base-200 card-md shadow-md my-6">
      <div className="card-body">
        <h2 className="card-title">Kategori Popular</h2>
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
      </div>
    </div>
  );
}
