import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { asyncSetAuthUser } from '../states/authUser/action';
import useInput from '../hooks/useInput';
import InputField from './InputField';
import EmailIcon from '../assets/icons/EmailIcon';
import PasswordIcon from '../assets/icons/PasswordIcon';

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector((states) => states.isLoading);
  const authUser = useSelector((states) => states.authUser);

  const [email, onEmailChange, setEmail] = useInput('');
  const [password, onPasswordChange, setPassword] = useInput('');

  const resetForm = () => {
    setEmail('');
    setPassword('');
  };

  const onLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }));
    resetForm();
  };

  useEffect(() => {
    if (authUser) {
      navigate('/');
    }
  }, [authUser]);

  return (
    <form>
      <InputField
        type="email"
        placeholder="Email"
        value={email}
        onChange={onEmailChange}
        disabled={isLoading.button}
        data-cy="login-input-email"
      >
        <EmailIcon />
      </InputField>
      <InputField
        type="password"
        placeholder="Password"
        value={password}
        onChange={onPasswordChange}
        disabled={isLoading.button}
        data-cy="login-input-password"
      >
        <PasswordIcon />
      </InputField>
      <button
        type="button"
        onClick={() => onLogin({ email, password })}
        className="btn btn-primary w-full lg:w-2/3"
        disabled={isLoading.button}
      >
        {isLoading.button ? (
          <span className="loading loading-spinner"></span>
        ) : (
          <span className="text-sm">LOGIN</span>
        )}
      </button>
    </form>
  );
}
