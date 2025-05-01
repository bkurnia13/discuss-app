import React from 'react';

export default function CommentItemheader() {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-3 items-center">
        <div className="avatar">
          <div className="ring-primary ring-offset-base-100 w-8 h-8 rounded-full ring ring-offset-2">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
        <div>
          <span className="block font-bold text-sm">Nama User</span>
          <span className="block text-xs text-neutral-content">user.name</span>
        </div>
      </div>
      <span className="text-sm text-neutral-content">123 detik lalu</span>
    </div>
  );
}
