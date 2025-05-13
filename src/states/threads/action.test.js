/**
 * asyncAddThread thunk
 *  - should dispatch action correctly and call api.addThread method
 *  - should dispatch action correctly and call toast.error when data fetching failed
 *
 * asyncVoteThread thunk
 *  - should call api.voteThread method and return state correctly when given by up-vote action
 *  - should call api.voteThread method and return state correctly when given by down-vote action
 *  - should call api.voteThread method and return state correctly when given by neutral-vote action
 *  - should call toast.error and return initial state when data fetching failed
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { setupStore } from '../index';
import { toast } from 'sonner';
import { addThreadActionCreator, asyncAddThread, asyncVoteThread } from './action';
import { isLoadingButtonActionCreator } from '../loading/action';
import api from '../../utils/api';

const fakeErrorResponse = new Error('Failed to fetch.');

describe('asyncAddThread thunk', () => {
  const fakeNewThread = {
    title: 'Thread Pertama',
    body: 'Ini adalah thread pertama',
    category: 'General',
  };

  const fakeCreatedThreadResponse = {
    id: 'thread-1',
    title: 'Thread Pertama',
    body: 'Ini adalah thread pertama',
    category: 'General',
    createdAt: '2021-06-21T07:00:00.000Z',
    ownerId: 'users-1',
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
  };

  it('should dispatch action correctly and call api.addThread method', async () => {
    // arrange
    // mock api.addThread
    const createThreadSpy = vi
      .spyOn(api, 'createThread')
      .mockImplementation(() => Promise.resolve(fakeCreatedThreadResponse));

    // mock dispatch
    const dispatch = vi.fn();

    // action
    await asyncAddThread(fakeNewThread)(dispatch);
    const thread = await createThreadSpy();

    // assert
    expect(dispatch).toHaveBeenCalledWith(isLoadingButtonActionCreator(true));
    expect(dispatch).toHaveBeenCalledWith(isLoadingButtonActionCreator(false));
    expect(dispatch).toHaveBeenCalledWith(addThreadActionCreator(fakeCreatedThreadResponse));
    expect(createThreadSpy).toHaveBeenCalledWith(fakeNewThread);
    expect(thread).toEqual(fakeCreatedThreadResponse);

    // restore mock
    createThreadSpy.mockRestore();
  });

  it('should dispatch action correctly and call toast.error when data fetching failed', async () => {
    // arrange
    // mock api.addThread
    const createThreadSpy = vi
      .spyOn(api, 'createThread')
      .mockImplementation(() => Promise.reject(fakeErrorResponse));

    // mock toast.error
    const toastSpy = vi.spyOn(toast, 'error');

    // mock dispatch
    const dispatch = vi.fn();

    // action
    await asyncAddThread(fakeNewThread)(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(isLoadingButtonActionCreator(true));
    expect(dispatch).toHaveBeenCalledWith(isLoadingButtonActionCreator(false));
    expect(createThreadSpy).toHaveBeenCalledWith(fakeNewThread);
    expect(toastSpy).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(toastSpy).toHaveReturned();

    // restore mock
    createThreadSpy.mockRestore();
    toastSpy.mockRestore();
  });
});

describe('asyncVoteThread thunk', () => {
  const initialState = {
    authUser: {
      id: 'users-1',
      name: 'User 1',
      email: 'user@example.com',
      avatar: 'https://generated-image-url.jpg',
    },
    threads: [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
      {
        id: 'thread-2',
        title: 'Thread Kedua',
        body: 'Ini adalah thread kedua',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-2',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ],
  };

  let voteThreadSpy;

  beforeEach(() => {
    // mock api.voteThread
    voteThreadSpy = vi.spyOn(api, 'voteThread').mockImplementation(({ threadId, action }) =>
      Promise.resolve({
        id: 'vote-1',
        userId: 'users-1',
        threadId: threadId,
        voteType: action === 'up-vote' ? 1 : action === 'down-vote' ? -1 : 0,
      })
    );
  });

  afterEach(() => {
    // mock restore
    voteThreadSpy.mockRestore();
  });

  it('should call api.voteThread method and return state correctly when given by up-vote action', async () => {
    // arrange
    // initial state
    const preloadedState = {
      ...initialState,
      threads: [
        {
          ...initialState.threads[0],
          downVotesBy: ['users-1'],
        },
        { ...initialState.threads[1] },
      ],
    };

    // create store
    const store = setupStore(preloadedState);

    // action
    await store.dispatch(asyncVoteThread({ threadId: 'thread-1', action: 'up-vote' }));
    const nextState = [
      { ...initialState.threads[0], upVotesBy: ['users-1'] },
      { ...initialState.threads[1] },
    ];

    // assert
    expect(voteThreadSpy).toHaveBeenCalledWith({ threadId: 'thread-1', action: 'up-vote' });
    expect(store.getState().threads).toEqual(nextState);
  });

  it('should call api.voteThread method and return state correctly when given by down-vote action', async () => {
    // arrange
    // initial state
    const preloadedState = {
      ...initialState,
      threads: [
        {
          ...initialState.threads[0],
          upVotesBy: ['users-1'],
        },
        { ...initialState.threads[1] },
      ],
    };

    // create store
    const store = setupStore(preloadedState);

    // action
    await store.dispatch(asyncVoteThread({ threadId: 'thread-1', action: 'down-vote' }));
    const nextState = [
      { ...initialState.threads[0], downVotesBy: ['users-1'] },
      { ...initialState.threads[1] },
    ];

    // assert
    expect(voteThreadSpy).toHaveBeenCalledWith({ threadId: 'thread-1', action: 'down-vote' });
    expect(store.getState().threads).toEqual(nextState);
  });

  it('should call api.voteThread method and return state correctly when given by neutral-vote action', async () => {
    // arrange
    // initial state
    const preloadedState = {
      ...initialState,
      threads: [
        {
          ...initialState.threads[0],
          upVotesBy: ['users-1'],
        },
        { ...initialState.threads[1] },
      ],
    };

    // create store
    const store = setupStore(preloadedState);

    // action
    await store.dispatch(asyncVoteThread({ threadId: 'thread-1', action: 'neutral-vote' }));

    // assert
    expect(voteThreadSpy).toHaveBeenCalledWith({ threadId: 'thread-1', action: 'neutral-vote' });
    expect(store.getState().threads).toEqual(initialState.threads);
  });

  it('should call toast.error and return initial state when data fetching failed', async () => {
    // arrange
    // initial state
    const preloadedState = initialState;

    // create store
    const store = setupStore(preloadedState);

    // mock api.voteThread
    voteThreadSpy = vi
      .spyOn(api, 'voteThread')
      .mockImplementation(() => Promise.reject(fakeErrorResponse));

    // mock toast
    const toastSpy = vi.spyOn(toast, 'error');

    // action
    await store.dispatch(asyncVoteThread({ threadId: 'thread-1', action: 'up-vote' }));

    // assert
    expect(voteThreadSpy).toHaveBeenCalledWith({ threadId: 'thread-1', action: 'up-vote' });
    expect(toastSpy).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(toastSpy).toHaveReturned();
    expect(store.getState().threads).toEqual(initialState.threads);

    // mock restore
    voteThreadSpy.mockRestore();
    toastSpy.mockRestore();
  });
});
