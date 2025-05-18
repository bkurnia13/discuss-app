import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router';
import { setAuthUserActionCreator } from '../states/authUser/action';
import { unsetAuthUserActionCreator } from '../states/authUser/action';
import api from '../utils/api';
import ThemeSwitcher from './ThemeSwitcher';
import UserButton from './UserButton';

export default function Navbar() {
  const dispatch = useDispatch();
  const authUser = useSelector((states) => states.authUser);
  const token = api.getAccessToken();

  const setAuthUser = async () => {
    if (token) {
      const authUser = await api.getOwnProfile();
      dispatch(setAuthUserActionCreator(authUser));
    } else {
      dispatch(unsetAuthUserActionCreator());
    }
  };

  useEffect(() => {
    setAuthUser();
  }, []);

  return (
    <div className="navbar flex justify-center w-full sticky top-0 z-30 bg-base-100/50 [transform:translate3d(0,0,0)] backdrop-blur shadow-md px-3 py-6 sm:px-6 md:px-12 lg:px-24">
      <div className="navbar-start">
        <Link to="/" className="text-2xl sm:text-4xl font-bold text-primary hover:text-success">
          Discuss App
        </Link>
      </div>
      <div className="navbar-end">
        <ThemeSwitcher />

        {authUser ? (
          <UserButton />
        ) : (
          <Link to="/login" className="btn btn-primary ml-4">
            LOGIN
          </Link>
        )}
      </div>
    </div>
  );
}
