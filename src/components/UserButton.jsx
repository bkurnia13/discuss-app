import React from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import { asyncUnsetAuthUser } from '../states/authUser/action';

export default function UserButton() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="ml-4 cursor-pointer">
        <div className="avatar">
          <div className="ring-primary ring-offset-base-100 w-12 h-12 rounded-full ring ring-offset-2">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
      </div>

      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
      >
        <li>
          <button
            type="buton"
            onClick={() => {
              document.activeElement.blur();
              dispatch(asyncUnsetAuthUser());
              toast.success('user logged out');
              navigate('/');
            }}
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}
