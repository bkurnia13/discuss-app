/**
 * threadsReducer function
 *  - should return initial state when given by unknown action
 *  - should return the threads when given by threads/receive action
 *  - should return the threads with the new thread when given by threads/add action
 *  - should return the threads with userId filled to upVotesBy and remove from downVotesBy when given by threads/upVote action
 *  - should return the threads with userId filled to downVotesBy and remove from upVotesBy when given by threads/downVote action
 *  - should return the threads with userId removed from upVotesBy or downVotesBy when given by threads/neutralVote action
 */

import { describe, it, expect } from 'vitest';
import threadsReducer from './reducer';

describe('threadsReducer function', () => {
  it('should return initial state when given by unknown action', () => {
    // arrange
    const initialState = [];
    const action = { type: 'unknown' };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the threads when given by threads/receive action', () => {
    // arrange
    const initialState = [];
    const threads = [
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
    ];

    const action = {
      type: 'threads/receive',
      payload: {
        threads: threads,
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.threads);
  });

  it('should return the threads with the new thread when given by threads/add action', () => {
    // arrange
    const initialState = [
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
    ];

    const thread = {
      id: 'thread-2',
      title: 'Thread Kedua',
      body: 'Ini adalah thread kedua',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      ownerId: 'users-2',
      upVotesBy: [],
      downVotesBy: [],
      totalComments: 0,
    };

    const action = {
      type: 'threads/add',
      payload: {
        thread: thread,
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual([action.payload.thread, ...initialState]);
  });

  it('should return the threads with userId filled to upVotesBy and remove from downVotesBy when given by threads/upVote action', () => {
    // arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: ['user-1'],
        totalComments: 0,
      },
    ];

    const action = {
      type: 'threads/upVote',
      payload: {
        threadId: 'thread-1',
        userId: 'user-1',
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual([
      {
        ...initialState[0],
        upVotesBy: [action.payload.userId],
        downVotesBy: [],
      },
    ]);
  });

  it('should return the threads with userId filled to downVotesBy and remove from upVotesBy when given by threads/downVote action', () => {
    // arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: ['user-1'],
        downVotesBy: [],
        totalComments: 0,
      },
    ];

    const action = {
      type: 'threads/downVote',
      payload: {
        threadId: 'thread-1',
        userId: 'user-1',
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual([
      {
        ...initialState[0],
        upVotesBy: [],
        downVotesBy: [action.payload.userId],
      },
    ]);
  });

  it('should return the threads with userId removed from upVotesBy or downVotesBy when given by threads/neutralVote action', () => {
    // arrange
    const initialState1 = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: ['user-1'],
        downVotesBy: [],
        totalComments: 0,
      },
    ];

    const initialState2 = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: ['user-1'],
        totalComments: 0,
      },
    ];

    const action = {
      type: 'threads/neutralVote',
      payload: {
        threadId: 'thread-1',
        userId: 'user-1',
      },
    };

    // action
    const nextState1 = threadsReducer(initialState1, action);
    const nextState2 = threadsReducer(initialState2, action);

    // assert
    expect(nextState1).toEqual([
      {
        ...initialState1[0],
        upVotesBy: [],
        downVotesBy: [],
      },
    ]);

    // assert
    expect(nextState2).toEqual([
      {
        ...initialState2[0],
        upVotesBy: [],
        downVotesBy: [],
      },
    ]);
  });
});
