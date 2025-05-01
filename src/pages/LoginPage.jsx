import React from 'react';
import UserIcon from '../assets/icons/UserIcon';
import EmailIcon from '../assets/icons/EmailIcon';
import PasswordIcon from '../assets/icons/PasswordIcon';

export default function LoginPage() {
  return (
    <div className="tabs tabs-box tabs-xl w-full md:w-3/4 lg:w-2/3 p-2 mt-12 mx-auto justify-center shadow-lg">
      <input
        type="radio"
        name="my_tabs_1"
        className="tab w-1/2 text-base"
        aria-label="LOGIN"
        defaultChecked
      />
      <div className="tab-content bg-base-100 border-base-300 p-6 text-center">
        <form>
          <label className="input input-md input-primary w-full lg:w-2/3 mb-3 ">
            <EmailIcon />
            <input type="text" className="grow" placeholder="Email" disabled />
          </label>
          <label className="input input-md input-primary w-full lg:w-2/3 mb-3">
            <PasswordIcon />
            <input type="text" className="grow" placeholder="Password" disabled />
          </label>
          <button type="submit" className="btn btn-primary w-full lg:w-2/3" disabled>
            <span className="loading loading-spinner"></span>
            {/* <span className="text-sm">LOGIN</span> */}
          </button>
        </form>
      </div>

      <input type="radio" name="my_tabs_1" className="tab w-1/2 text-base" aria-label="REGISTER" />
      <div className="tab-content bg-base-100 border-base-300 p-6 text-center">
        <label className="input input-md input-primary w-full lg:w-2/3 mb-3">
          <UserIcon />
          <input type="text" className="grow" placeholder="Nama" />
        </label>
        <label className="input input-md input-primary w-full lg:w-2/3 mb-3">
          <EmailIcon />
          <input type="text" className="grow" placeholder="Email" />
        </label>
        <label className="input input-md input-primary w-full lg:w-2/3 mb-3">
          <PasswordIcon />
          <input type="text" className="grow" placeholder="Password" />
        </label>
        <button className="btn btn-primary w-full lg:w-2/3">
          <span className="text-sm">REGISTER</span>
        </button>
      </div>
    </div>
  );
}
