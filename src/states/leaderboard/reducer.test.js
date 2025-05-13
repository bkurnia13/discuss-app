/**
 * leaderboardReducer function
 *  - should return initial state when given by unknown action
 *  - should return leaderboard when given by leaderboard/receive action
 */

import { describe, it, expect } from 'vitest';
import leaderboardReducer from './reducer';

describe('leaderboardReducer function', () => {
  it('should return initial state when given by unknown action', () => {
    // arrange
    const initialState = null;
    const action = { type: 'unknown' };

    // action
    const nextState = leaderboardReducer(initialState, action);

    // assert
    expect(nextState).toEqual(null);
  });

  it('should return leaderboard when given by leaderboard/receive action', () => {
    // arrange
    const initialState = null;
    const leaderboard = [
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

    const action = {
      type: 'leaderboard/receive',
      payload: {
        leaderboard,
      },
    };

    // action
    const nextState = leaderboardReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.leaderboard);
  });
});
