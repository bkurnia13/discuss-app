import React from 'react';
import ThemeSwitcher from './ThemeSwitcher';

export default function Navbar() {
  return (
    <div className="navbar flex justify-center w-full sticky top-0 z-30 bg-base-100/50 [transform:translate3d(0,0,0)] backdrop-blur shadow-md px-3 py-6 sm:px-6 md:px-12 lg:px-24">
      <div className="navbar-start">
        <p className="text-4xl font-bold text-primary">DiscussApp</p>
      </div>
      <div className="navbar-end">
        <ThemeSwitcher />
        <a className="btn btn-primary ml-4">LOGIN</a>
      </div>
    </div>
  );
}
