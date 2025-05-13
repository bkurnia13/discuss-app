/**
 * filterThreadsReducer function
 *  - should return initial state when given by unkown action
 *  - should return filtered threads when given by filterThreads/set action
 */

import { describe, it, expect } from 'vitest';
import filterThreadsReducer from './reducer';

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
  {
    id: 'thread-3',
    title: 'Thread Ketiga',
    body: 'Ini adalah thread ketiga',
    category: 'test',
    createdAt: '2021-06-21T07:00:00.000Z',
    ownerId: 'users-3',
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
  },
];

describe('filterThreadsReducer function', () => {
  it('should return initial state when given by unkown action', () => {
    // arrange
    const initialState = threads;
    const action = { type: 'unknown' };

    // action
    const nextState = filterThreadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(threads);
  });

  it('should return filtered threads when given by filterThreads/set action', () => {
    // arrange
    const initialState = threads;

    const action1 = {
      type: 'filterThreads/set',
      payload: {
        threads: threads,
        activeCategory: ['test'],
      },
    };

    const action2 = {
      type: 'filterThreads/set',
      payload: {
        threads: threads,
        activeCategory: ['general'],
      },
    };

    const action3 = {
      type: 'filterThreads/set',
      payload: {
        threads: threads,
        activeCategory: ['general', 'test'],
      },
    };

    const action4 = {
      type: 'filterThreads/set',
      payload: {
        threads: threads,
        activeCategory: [],
      },
    };

    // action
    const nextState1 = filterThreadsReducer(initialState, action1);
    const nextState2 = filterThreadsReducer(initialState, action2);
    const nextState3 = filterThreadsReducer(initialState, action3);
    const nextState4 = filterThreadsReducer(initialState, action4);

    // assert
    expect(nextState1).toEqual([threads[2]]);
    expect(nextState2).toEqual([threads[0], threads[1]]);
    expect(nextState3).toEqual(threads);
    expect(nextState4).toEqual(threads);
  });
});
