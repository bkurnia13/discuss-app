/**
 * LoginForm component
 *  - should handle email typing correctly
 *  - should handle password typing correctly
 *  - should call login function when login button is clicked
 */

import React from 'react';
import { setupStore } from '../states/index';
import { Provider } from 'react-redux';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as matchers from '@testing-library/jest-dom/matchers';
import { setupServer } from 'msw/node';
import LoginForm from './LoginForm';
import renderWithRouter from '../utils/test';
import handlers from '../utils/fakeApi';
import { fakeUserProfileResponse } from '../utils/fakeApi';
import api from '../utils/api';
import * as authUserAction from '../states/authUser/action';

expect.extend(matchers);

const initialState = {
  authUser: null,
  isLoading: {
    button: false,
    skleton: false,
  },
};

const store = setupStore(initialState);

describe('LoginForm component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle email typing correctly', async () => {
    // arrange
    renderWithRouter(
      <Provider store={store}>
        <LoginForm />
      </Provider>,
      { route: '/login' }
    );

    const emailInput = await screen.getByPlaceholderText('Email');

    // action
    await userEvent.type(emailInput, 'email@test.com');

    // assert
    expect(emailInput).toHaveValue('email@test.com');
  });

  it('should handle password typing correctly', async () => {
    // arrange
    renderWithRouter(
      <Provider store={store}>
        <LoginForm />
      </Provider>,
      { route: '/login' }
    );

    const passwordInput = await screen.getByPlaceholderText('Password');

    // action
    await userEvent.type(passwordInput, 'P@ssw0rd');

    // assert
    expect(passwordInput).toHaveValue('P@ssw0rd');
  });

  it('should call login function when login button is clicked', async () => {
    // setup mock server
    const server = setupServer(...handlers);
    server.listen();

    // arrange
    api._putAccessToken = api.putAccessToken; // backup
    api.putAccessToken = vi.fn(); // stub
    const asyncSetAuthUserSpy = vi.spyOn(authUserAction, 'asyncSetAuthUser'); // spy

    renderWithRouter(
      <Provider store={store}>
        <LoginForm />
      </Provider>,
      { route: '/login' }
    );

    const emailInput = await screen.getByPlaceholderText('Email');
    await userEvent.type(emailInput, 'john@example.com');
    const passwordInput = await screen.getByPlaceholderText('Password');
    await userEvent.type(passwordInput, 'P@ssw0rd');
    const loginButton = await screen.getByRole('button', { name: 'LOGIN' });

    // action
    await userEvent.click(loginButton);

    // assert
    expect(asyncSetAuthUserSpy).toHaveBeenCalledWith({
      email: 'john@example.com',
      password: 'P@ssw0rd',
    });
    expect(store.getState().authUser).toEqual(fakeUserProfileResponse.data.user);

    // end server
    server.resetHandlers();
    server.close();

    api.putAccessToken = api._putAccessToken; // restore
    delete api._putAccessToken; // delete
    asyncSetAuthUserSpy.mockRestore(); // mocck restore
  });
});
