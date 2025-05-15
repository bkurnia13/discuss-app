/**
 * RegisterForm component
 *  - should handle name typing correctly
 *  - should handle email typing correctly
 *  - should handle password typing correctly
 *  - should call register function when register button is clicked
 */

import React from 'react';
import { setupStore } from '../states/index';
import { Provider } from 'react-redux';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as matchers from '@testing-library/jest-dom/matchers';
import { setupServer } from 'msw/node';
import RegisterForm from './RegisterForm';
import renderWithRouter from '../utils/test';
import handlers from '../utils/fakeApi';
import * as userAction from '../states/user/action';

expect.extend(matchers);

const initialState = {
  authUser: null,
  isLoading: {
    button: false,
    skleton: false,
  },
};

const store = setupStore(initialState);

describe('RegisterForm component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle name typing correctly', async () => {
    // arrange
    renderWithRouter(
      <Provider store={store}>
        <RegisterForm />
      </Provider>,
      { route: '/login' }
    );

    const nameInput = await screen.getByPlaceholderText('Nama');

    // action
    await userEvent.type(nameInput, 'John Doe');

    // assert
    expect(nameInput).toHaveValue('John Doe');
  });

  it('should handle email typing correctly', async () => {
    // arrange
    renderWithRouter(
      <Provider store={store}>
        <RegisterForm />
      </Provider>,
      { route: '/login' }
    );

    const emailInput = await screen.getByPlaceholderText('Email');

    // action
    await userEvent.type(emailInput, 'john@example.com');

    // assert
    expect(emailInput).toHaveValue('john@example.com');
  });

  it('should handle password typing correctly', async () => {
    // arrange
    renderWithRouter(
      <Provider store={store}>
        <RegisterForm />
      </Provider>,
      { route: '/login' }
    );

    const passwordInput = await screen.getByPlaceholderText('Password');

    // action
    await userEvent.type(passwordInput, 'P@ssw0rd');

    // assert
    expect(passwordInput).toHaveValue('P@ssw0rd');
  });

  it('should call register function when register button is clicked', async () => {
    // setup mock server
    const server = setupServer(...handlers);
    server.listen();

    // arrange
    const asyncRegisterUserSpy = vi.spyOn(userAction, 'asyncRegisterUser');

    renderWithRouter(
      <Provider store={store}>
        <RegisterForm />
      </Provider>,
      { route: '/login' }
    );

    const nameInput = await screen.getByPlaceholderText('Nama');
    await userEvent.type(nameInput, 'John Doe');
    const emailInput = await screen.getByPlaceholderText('Email');
    await userEvent.type(emailInput, 'john@example.com');
    const passwordInput = await screen.getByPlaceholderText('Password');
    await userEvent.type(passwordInput, 'P@ssw0rd');
    const registerButton = await screen.getByRole('button', { name: 'REGISTER' });

    // action
    await userEvent.click(registerButton);

    // assert
    expect(asyncRegisterUserSpy).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'P@ssw0rd',
    });

    // end server
    server.resetHandlers();
    server.close();
    asyncRegisterUserSpy.mockRestore();
  });
});
