import React from 'react';

export default function DiscussItemHeader() {
  return (
    <div className="flex justify-between items-center p-6 border-b border-base-300">
      <div className="flex gap-3 items-center">
        <div className="avatar">
          <div className="ring-primary ring-offset-base-100 w-12 h-12 rounded-full ring ring-offset-2">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
        <div>
          <span className="block font-bold text-base">Nama User</span>
          <span className="block text-sm text-neutral-content">user.name</span>
        </div>
      </div>
      <div>
        <span className="block text-sm text-neutral-content">Diposting</span>
        <span className="block text-sm text-neutral-content">123 hari lalu</span>
      </div>
    </div>
  );
}
