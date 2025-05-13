/**
 * isLoadingReducer function
 *  - should return initial state when given by unknown action
 *  - should return initial state with button: true/false when given by isLoadingButton/set action
 *  - should return initial state with skeleton: true/false when given by isLoadingSkeleton/set action
 */

import { describe, it, expect } from 'vitest';
import isLoadingReducer from './reducer';

const initialState = {
  button: false,
  skeleton: false,
};

describe('isLoadingReducer function', () => {
  it('should return initial state when given by unknown action', () => {
    // arrange
    const action = { type: 'unknown' };

    // action
    const nextState = isLoadingReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return initial state with button: true/false when given by isLoadingButton/set action', () => {
    // arrange
    const action1 = {
      type: 'isLoadingButton/set',
      payload: {
        isLoading: true,
      },
    };

    const action2 = {
      type: 'isLoadingButton/set',
      payload: {
        isLoading: false,
      },
    };

    // action
    const nextState1 = isLoadingReducer(initialState, action1);
    const nextState2 = isLoadingReducer(nextState1, action2);

    // assert
    expect(nextState1).toEqual({
      ...initialState,
      button: true,
    });

    expect(nextState2).toEqual(initialState);
  });

  it('should return initial state with skeleton: true/false when given by isLoadingSkeleton/set action', () => {
    // arrange
    const action1 = {
      type: 'isLoadingSkeleton/set',
      payload: {
        isLoading: true,
      },
    };

    const action2 = {
      type: 'isLoadingSkeleton/set',
      payload: {
        isLoading: false,
      },
    };

    // action
    const nextState1 = isLoadingReducer(initialState, action1);
    const nextState2 = isLoadingReducer(nextState1, action2);

    // assert
    expect(nextState1).toEqual({
      ...initialState,
      skeleton: true,
    });

    expect(nextState2).toEqual(initialState);
  });
});
