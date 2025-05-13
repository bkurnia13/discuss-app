/**
 * asyncReceiveLeaderboard thunk
 *  - should dispatch action correctly, call api.getLeaderboard, and return state with leaderboard data
 *  - should call toast.error and return initial state when data fetching failed
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { setupStore } from '../index';
import { toast } from 'sonner';
import * as isLoadingAction from '../loading/action';
import { asyncReceiveLeaderboard } from './action';
import api from '../../utils/api';

describe('asyncReceiveLeaderboard thunk', () => {
  const fakeLeaderboardResponse = [
    {
      user: {
        id: 'users-1',
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://generated-image-url.jpg',
      },
      score: 10,
    },
    {
      user: {
        id: 'users-2',
        name: 'Jane Doe',
        email: 'jane@example.com',
        avatar: 'https://generated-image-url.jpg',
      },
      score: 5,
    },
  ];

  const fakeErrorResponse = new Error('Failed to fetch leaderboard data.');

  const initialState = {
    leaderboard: null,
  };

  let isLoadingSkeletonActionCreatorSpy;

  beforeEach(() => {
    isLoadingSkeletonActionCreatorSpy = vi.spyOn(isLoadingAction, 'isLoadingSkeletonActionCreator');
  });

  afterEach(() => {
    isLoadingSkeletonActionCreatorSpy.mockRestore();
  });

  it('should dispatch action correctly, call api.getLeaderboard, and return state with leaderboard data', async () => {
    // arrange
    const store = setupStore(initialState);

    // mock api.getLeaderboard
    const getLeaderboardSpy = vi
      .spyOn(api, 'getLeaderboard')
      .mockImplementation(() => Promise.resolve(fakeLeaderboardResponse));

    // action
    await store.dispatch(asyncReceiveLeaderboard());

    // assert
    expect(isLoadingSkeletonActionCreatorSpy).toHaveBeenCalledWith(true);
    expect(isLoadingSkeletonActionCreatorSpy).toHaveBeenCalledWith(false);
    expect(getLeaderboardSpy).toHaveBeenCalled();
    expect(store.getState().leaderboard).toEqual(fakeLeaderboardResponse);

    // mock restore
    getLeaderboardSpy.mockRestore();
  });

  it('should call toast.error and return initial state when data fetching failed', async () => {
    // arrange
    const store = setupStore(initialState);

    // mock api.getLeaderboard
    const getLeaderboardSpy = vi
      .spyOn(api, 'getLeaderboard')
      .mockImplementation(() => Promise.reject(fakeErrorResponse));

    // spy toast
    const toastSpy = vi.spyOn(toast, 'error');

    // action
    await store.dispatch(asyncReceiveLeaderboard());

    // assert
    expect(isLoadingSkeletonActionCreatorSpy).toHaveBeenCalledWith(true);
    expect(isLoadingSkeletonActionCreatorSpy).toHaveBeenCalledWith(false);
    expect(getLeaderboardSpy).toHaveBeenCalled();
    expect(store.getState().leaderboard).toEqual(initialState.leaderboard);

    // mock restore
    getLeaderboardSpy.mockRestore();
    toastSpy.mockRestore();
  });
});
