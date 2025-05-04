import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncRegisterUser } from '../states/user/action';
import useInput from '../hooks/useInput';
import InputField from './InputField';
import UserIcon from '../assets/icons/UserIcon';
import EmailIcon from '../assets/icons/EmailIcon';
import PasswordIcon from '../assets/icons/PasswordIcon';

export default function RegisterForm() {
  const dispatch = useDispatch();
  const isLoading = useSelector((states) => states.isLoading);

  const [name, onNameChange, setName] = useInput('');
  const [email, onEmailChange, setEmail] = useInput('');
  const [password, onPasswordChange, setPassword] = useInput('');

  const resetForm = () => {
    setName('');
    setEmail('');
    setPassword('');
  };

  const onRegister = ({ name, email, password }) => {
    dispatch(asyncRegisterUser({ name, email, password }));
    resetForm();
  };

  return (
    <form>
      <InputField
        type="text"
        placeholder="Nama"
        value={name}
        disabled={isLoading.button}
        onChange={onNameChange}
      >
        <UserIcon />
      </InputField>
      <InputField
        type="email"
        placeholder="Email"
        value={email}
        disabled={isLoading.button}
        onChange={onEmailChange}
      >
        <EmailIcon />
      </InputField>
      <InputField
        type="password"
        placeholder="Password"
        value={password}
        disabled={isLoading.button}
        onChange={onPasswordChange}
      >
        <PasswordIcon />
      </InputField>
      <button
        type="button"
        onClick={() => onRegister({ name, email, password })}
        className="btn btn-primary w-full lg:w-2/3"
        disabled={isLoading.button}
      >
        {isLoading.button ? (
          <span className="loading loading-spinner"></span>
        ) : (
          <span className="text-sm">REGISTER</span>
        )}
      </button>
    </form>
  );
}
