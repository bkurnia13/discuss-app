/**
 * asyncSetAuthUser thunk
 *  - should dispatch action correctly, get token, and return state with user data when provide by correct email and password
 *  - should return initial state when provided by incorrect email or password
 *  - should call toast.error and return initial state when data fetching failed
 *
 * asyncUnsetAuthUser
 *  - should call api.putAccessToken and return state with null
 */

import { describe, it, expect, vi } from 'vitest';
import { setupStore } from '../index';
import { toast } from 'sonner';
import * as isLoadingAction from '../loading/action';
import { asyncSetAuthUser, asyncUnsetAuthUser } from './action';
import api from '../../utils/api';

describe('asyncSetAuthUser thunk', () => {
  const fakeGetUserProfileResponse = {
    id: 'john_doe',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://generated-image-url.jpg',
  };

  const initialState = {
    authUser: null,
  };

  const email = 'john@example.com';
  const password = 'P@ssw0rd';
  const fakeErrorResponse = new Error('Failed to fetch user data.');

  it('should dispatch action correctly, get token, and return state with user data when provide by correct email and password', async () => {
    // arrange
    const store = setupStore(initialState);

    // mock api
    const loginSpy = vi.spyOn(api, 'login').mockImplementation(() => Promise.resolve('test-token'));
    const getOwnProfileSpy = vi
      .spyOn(api, 'getOwnProfile')
      .mockImplementation(() => Promise.resolve(fakeGetUserProfileResponse));

    // spy
    const putAccessTokenSpy = vi.spyOn(api, 'putAccessToken');
    const isLoadingButtonActionCreatorSpy = vi.spyOn(
      isLoadingAction,
      'isLoadingButtonActionCreator'
    );

    // action
    await store.dispatch(asyncSetAuthUser({ email, password }));

    // assert
    expect(isLoadingButtonActionCreatorSpy).toHaveBeenCalledWith(true);
    expect(isLoadingButtonActionCreatorSpy).toHaveBeenCalledWith(false);
    expect(loginSpy).toHaveBeenCalledWith({ email, password });
    expect(getOwnProfileSpy).toHaveBeenCalled();
    expect(store.getState().authUser).toEqual(fakeGetUserProfileResponse);

    // mock restore
    loginSpy.mockRestore();
    getOwnProfileSpy.mockRestore();
    putAccessTokenSpy.mockRestore();
    isLoadingButtonActionCreatorSpy.mockRestore();
  });

  it('should return initial state when provided by incorrect email or password', async () => {
    // arrange
    const store = setupStore(initialState);

    // mock api
    const loginSpy = vi.spyOn(api, 'login').mockImplementation(() => Promise.resolve(null));
    const getOwnProfileSpy = vi
      .spyOn(api, 'getOwnProfile')
      .mockImplementation(() => Promise.reject(fakeErrorResponse));

    // spy
    const isLoadingButtonActionCreatorSpy = vi.spyOn(
      isLoadingAction,
      'isLoadingButtonActionCreator'
    );

    // action
    await store.dispatch(asyncSetAuthUser({ email, password }));

    // assert
    expect(isLoadingButtonActionCreatorSpy).toHaveBeenCalledWith(true);
    expect(isLoadingButtonActionCreatorSpy).toHaveBeenCalledWith(false);
    expect(loginSpy).toHaveBeenCalledWith({ email, password });
    expect(store.getState().authUser).toEqual(initialState.authUser);

    // mock restore
    loginSpy.mockRestore();
    getOwnProfileSpy.mockRestore();
    isLoadingButtonActionCreatorSpy.mockRestore();
  });

  it('should return initial state when provided by incorrect email or password', async () => {
    // arrange
    const store = setupStore(initialState);

    // mock api
    const loginSpy = vi
      .spyOn(api, 'login')
      .mockImplementation(() => Promise.reject(fakeErrorResponse));

    // spy
    const toastSpy = vi.spyOn(toast, 'error');
    const isLoadingButtonActionCreatorSpy = vi.spyOn(
      isLoadingAction,
      'isLoadingButtonActionCreator'
    );

    // action
    await store.dispatch(asyncSetAuthUser({ email, password }));

    // assert
    expect(isLoadingButtonActionCreatorSpy).toHaveBeenCalledWith(true);
    expect(isLoadingButtonActionCreatorSpy).toHaveBeenCalledWith(false);
    expect(loginSpy).toHaveBeenCalledWith({ email, password });
    expect(toastSpy).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(toastSpy).toHaveReturned();
    expect(store.getState().authUser).toEqual(initialState.authUser);

    // mock restore
    loginSpy.mockRestore();
    isLoadingButtonActionCreatorSpy.mockRestore();
    toastSpy.mockRestore();
  });
});

describe('asyncUnsetAuthUser', () => {
  it('should call api.putAccessToken and return state with null', async () => {
    // arrange
    const initialState = {
      authUser: {
        id: 'john_doe',
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://generated-image-url.jpg',
      },
    };

    const store = setupStore(initialState);

    // spy
    const putAccessTokenSpy = vi.spyOn(api, 'putAccessToken');

    // action
    await store.dispatch(asyncUnsetAuthUser());

    // assert
    expect(putAccessTokenSpy).toHaveBeenCalledWith('');
    expect(store.getState().authUser).toEqual(null);

    // mock restore
    putAccessTokenSpy.mockRestore();
  });
});
