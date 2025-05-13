/**
 * activeCategoryReducer function
 *  - should return initial state when given by unknown action
 *  - should adding new category if it doesn't exist in initial state when given by activeCategory/set action
 *  - should remove category if it exists in initial state when given by activeCategory/set action
 */

import { describe, it, expect } from 'vitest';
import activeCategoryReducer from './reducer';

describe('activeCategoryReducer function', () => {
  it('should return initial state when given by unknown action', () => {
    // arrange
    const initialState = [];
    const action = { type: 'unknown' };

    // action
    const nextState = activeCategoryReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it("should adding new category if it doesn't exist in initial state when given by activeCategory/set action", () => {
    // arrange
    const initialState = ['category-1'];

    const action = {
      type: 'activeCategory/set',
      payload: {
        category: 'category-2',
      },
    };

    // action
    const nextState = activeCategoryReducer(initialState, action);

    // assert
    expect(nextState).toEqual([...initialState, action.payload.category]);
  });

  it('should remove category if it exists in initial state when given by activeCategory/set action', () => {
    // arrange
    const initialState = ['category-1', 'category-2'];

    const action1 = {
      type: 'activeCategory/set',
      payload: {
        category: 'category-1',
      },
    };

    const action2 = {
      type: 'activeCategory/set',
      payload: {
        category: 'category-2',
      },
    };

    // action
    const nextState1 = activeCategoryReducer(initialState, action1);
    const nextState2 = activeCategoryReducer(nextState1, action2);

    // assert
    expect(nextState1).toEqual(['category-2']);
    expect(nextState2).toEqual([]);
  });
});
