/**
 * DiscussItemFooter component
 *  - should call asyncVoteThread funtion, return correct state, and call toast.success when like button is clicked
 *  - should call asyncVoteThread funtion, return correct state, and call toast.success when dislike button is clicked
 *  - should call asyncVoteThread funtion, return correct state, and call toast.success when like or dislike button is clicked to neutralize vote
 */

import React from 'react';
import { setupStore } from '../states/index';
import { Provider } from 'react-redux';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as matchers from '@testing-library/jest-dom/matchers';
import { setupServer } from 'msw/node';
import handlers from '../utils/fakeApi';
import { toast } from 'sonner';
import renderWithRouter from '../utils/test';
import {
  fakeUpVoteThreadResponse,
  fakeDownVoteThreadResponse,
  fakeNeutralVoteThreadResponse,
} from '../utils/fakeApi';
import * as threadsAction from '../states/threads/action';
import DiscussItemFooter from './DiscussItemFooter';

expect.extend(matchers);

describe('DiscussItemFooter component', () => {
  let server;
  let asyncVoteThreadSpy;
  let toastSpy;

  beforeEach(() => {
    // setup server
    server = setupServer(...handlers);
    server.listen();

    // spy
    asyncVoteThreadSpy = vi.spyOn(threadsAction, 'asyncVoteThread');
    toastSpy = vi.spyOn(toast, 'success');
  });

  afterEach(() => {
    // end server
    server.resetHandlers();
    server.close();

    // mock restore
    asyncVoteThreadSpy.mockRestore();
    toastSpy.mockRestore();

    cleanup();
  });

  const { userId, threadId } = fakeUpVoteThreadResponse.data.vote;

  const authUser = {
    id: userId,
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://generated-image-url.jpg',
  };

  const threads = [
    {
      id: threadId,
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      ownerId: userId,
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
  ];

  const initialState = {
    authUser,
    threads,
  };

  it('should call asyncVoteThread funtion, return correct state, and call toast.success when like button is clicked', async () => {
    // arrange
    const store = setupStore(initialState);

    renderWithRouter(
      <Provider store={store}>
        <DiscussItemFooter {...threads[0]} />
      </Provider>,
      { route: '/' }
    );

    const likeButton = await screen.getByTestId('rtl-like-button');

    // action
    await userEvent.click(likeButton);

    const nextState = {
      ...threads[0],
      upVotesBy: [userId],
    };

    // assert
    expect(asyncVoteThreadSpy).toHaveBeenCalledWith({ threadId, action: 'up-vote' });
    expect(toastSpy).toHaveBeenCalledWith(fakeUpVoteThreadResponse.message);
    expect(store.getState().threads[0]).toEqual(nextState);
  });

  it('should call asyncVoteThread funtion, return correct state, and call toast.success when dislike button is clicked', async () => {
    // arrange
    const store = setupStore(initialState);

    renderWithRouter(
      <Provider store={store}>
        <DiscussItemFooter {...threads[0]} />
      </Provider>,
      { route: '/' }
    );

    const dislikeButton = await screen.getByTestId('rtl-dislike-button');

    // action
    await userEvent.click(dislikeButton);

    const nextState = {
      ...threads[0],
      downVotesBy: [userId],
    };

    // assert
    expect(asyncVoteThreadSpy).toHaveBeenCalledWith({ threadId, action: 'down-vote' });
    expect(toastSpy).toHaveBeenCalledWith(fakeDownVoteThreadResponse.message);
    expect(store.getState().threads[0]).toEqual(nextState);
  });

  it('should call asyncVoteThread funtion, return correct state, and call toast.success when like or dislike button is clicked to neutralize vote', async () => {
    // arrange
    const newThreads = [
      {
        ...threads[0],
        downVotesBy: [userId],
      },
      { ...threads[1] },
    ];

    const store = setupStore({
      ...initialState,
      threads: newThreads,
    });

    renderWithRouter(
      <Provider store={store}>
        <DiscussItemFooter {...newThreads[0]} />
      </Provider>,
      { route: '/' }
    );

    const dislikeButton = await screen.getByTestId('rtl-dislike-button');

    // action
    await userEvent.click(dislikeButton);

    // assert
    expect(asyncVoteThreadSpy).toHaveBeenCalledWith({ threadId, action: 'neutral-vote' });
    expect(toastSpy).toHaveBeenCalledWith(fakeNeutralVoteThreadResponse.message);
    expect(store.getState().threads[0]).toEqual(threads[0]);
  });
});
