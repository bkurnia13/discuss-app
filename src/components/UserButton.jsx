import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { asyncUnsetAuthUser } from '../states/authUser/action';

export default function UserButton() {
  const dispatch = useDispatch();
  const authUser = useSelector((states) => states.authUser);

  return (
    <div className="dropdown dropdown-end" data-cy="user-button">
      <div tabIndex={0} role="button" className="ml-4 cursor-pointer">
        <div className="avatar">
          <div className="ring-primary ring-offset-base-100 w-12 h-12 rounded-full ring ring-offset-2">
            <img src={authUser.avatar} />
          </div>
        </div>
      </div>

      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-300 rounded-box z-1 w-52 p-2 shadow-sm mt-2"
      >
        <li className="menu-disabled">
          <span className="text-primary px-3">{authUser.name}</span>
        </li>
        <div className="divider m-0"></div>
        <li>
          <button
            type="buton"
            className="text-primary"
            onClick={() => {
              document.activeElement.blur();
              dispatch(asyncUnsetAuthUser());
              toast.success('user logged out');
            }}
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}
