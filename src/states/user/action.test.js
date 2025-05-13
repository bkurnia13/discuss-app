/**
 * asyncRegisterUser thunk
 *  - should dispatch action correctly and call api.register method
 *  - should dispatch action correctly and call toast correctly when data fetching failed
 */

import { describe, it, expect, vi } from 'vitest';
import { toast } from 'sonner';
import { asyncRegisterUser } from './action';
import { isLoadingButtonActionCreator } from '../loading/action';
import api from '../../utils/api';

const fakeUser = {
  name: 'John Doe',
  email: 'john@example.com',
  password: 'john123',
};

const fakeRegisterResponse = {
  id: 'user-123',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://generated-image-url.jpg',
};

const fakeErrorResponse = new Error('Failed to fetch.');

describe('asyncRegisterUser thunk', () => {
  it('should dispatch action correctly and call api.register method', async () => {
    // arrange
    // mock api.register
    const registerSpy = vi
      .spyOn(api, 'register')
      .mockImplementation(() => Promise.resolve(fakeRegisterResponse));

    // mock dispatch
    const dispatch = vi.fn();

    // action
    await asyncRegisterUser(fakeUser)(dispatch);
    const user = await registerSpy();

    // assert
    expect(dispatch).toHaveBeenCalledWith(isLoadingButtonActionCreator(true));
    expect(dispatch).toHaveBeenCalledWith(isLoadingButtonActionCreator(false));
    expect(registerSpy).toHaveBeenCalledWith(fakeUser);
    expect(user).toEqual(fakeRegisterResponse);

    // restore mock
    registerSpy.mockRestore();
  });

  it('should dispatch action correctly and call toast correctly when data fetching failed', async () => {
    // arrange
    // mock api.register
    const registerSpy = vi
      .spyOn(api, 'register')
      .mockImplementation(() => Promise.reject(fakeErrorResponse));

    // mock toast.error
    const toastSpy = vi.spyOn(toast, 'error');

    // mock dispatch
    const dispatch = vi.fn();

    // action
    await asyncRegisterUser(fakeUser)(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(isLoadingButtonActionCreator(true));
    expect(dispatch).toHaveBeenCalledWith(isLoadingButtonActionCreator(false));
    expect(registerSpy).toHaveBeenCalledWith(fakeUser);
    expect(toastSpy).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(toastSpy).toHaveReturned();

    // restore mock
    registerSpy.mockRestore();
    toastSpy.mockRestore();
  });
});
