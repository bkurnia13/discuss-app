import React from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

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
        <LoginForm />
      </div>
      <input type="radio" name="my_tabs_1" className="tab w-1/2 text-base" aria-label="REGISTER" />
      <div className="tab-content bg-base-100 border-base-300 p-6 text-center">
        <RegisterForm />
      </div>
    </div>
  );
}
