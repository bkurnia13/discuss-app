/**
 * threadDetailReducer function
 *  - should return initial state when given by unknown action
 *  - should return threadDetail when given by threadDetail/receive action
 *  - should return null when given by threadDetail/clear action
 *  - should return threadDetail with userId filled to upVotesBy and remove from downVotesBy when given by threadDetail/upVote action
 *  - should return threadDetail with userId filled to downVotesBy and remove from upVotesBy when given by threadDetail/downVote action
 *  - should return threadDetail with userId removed from downVotesBy or upVotesBy when given by threadDetail/neutralVote action
 *  - should return threadDetail with comments when given by threadDetail/addComment action
 *  - should return threadDetail with comments and userId filled to comment.upVotesBy and remove from comment.downVotesBy when given by comment/upVote action
 *  - should return threadDetail with comments and userId filled to comment.downVotesBy and remove from comment.upVotesBy when given by comment/downVote action
 *  - should return threadDetail with comments and userId removed from comment.downVotesBy or comment.upVotesBy when given by comment/neutralVote action
 */

import { describe, it, expect } from 'vitest';
import threadDetailReducer from './reducer';

const threadDetail = {
  id: 'thread-1',
  title: 'Thread Pertama',
  body: 'Ini adalah thread pertama',
  category: 'General',
  createdAt: '2021-06-21T07:00:00.000Z',
  owner: {
    id: 'users-1',
    name: 'John Doe',
    avatar: 'https://generated-image-url.jpg',
  },
  upVotesBy: [],
  downVotesBy: [],
  comments: [
    {
      id: 'comment-1',
      content: 'Ini adalah komentar pertama',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
    },
  ],
};

describe('threadDetailReducer function', () => {
  it('should return initial state when given by unknown action', () => {
    // arrange
    const initialState = null;
    const action = { type: 'unknown' };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return threadDetail when given by threadDetail/receive action', () => {
    // arrange
    const initialState = null;
    const action = {
      type: 'threadDetail/receive',
      payload: {
        threadDetail: threadDetail,
      },
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.threadDetail);
  });

  it('should return null when given by threadDetail/clear action', () => {
    // arrange
    const initialState = threadDetail;
    const action = {
      type: 'threadDetail/clear',
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual(null);
  });

  it('should return threadDetail with userId filled to upVotesBy and remove from downVotesBy when given by threadDetail/upVote action', () => {
    // arrange
    const initialState = {
      ...threadDetail,
      upVotesBy: [],
      downVotesBy: ['user-1'],
    };

    const action = {
      type: 'threadDetail/upVote',
      payload: {
        threadId: 'thread-1',
        userId: 'user-1',
      },
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...threadDetail,
      upVotesBy: ['user-1'],
      downVotesBy: [],
    });
  });

  it('should return threadDetail with userId filled to downVotesBy and remove from upVotesBy when given by threadDetail/downVote action', () => {
    // arrange
    const initialState = {
      ...threadDetail,
      upVotesBy: ['user-1'],
      downVotesBy: [],
    };

    const action = {
      type: 'threadDetail/downVote',
      payload: {
        threadId: 'thread-1',
        userId: 'user-1',
      },
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...threadDetail,
      upVotesBy: [],
      downVotesBy: ['user-1'],
    });
  });

  it('should return threadDetail with userId removed from downVotesBy or upVotesBy when given by threadDetail/neutralVote action', () => {
    // arrange
    const initialState1 = {
      ...threadDetail,
      upVotesBy: ['user-1'],
      downVotesBy: [],
    };

    const initialState2 = {
      ...threadDetail,
      upVotesBy: [],
      downVotesBy: ['user-1'],
    };

    const action = {
      type: 'threadDetail/neutralVote',
      payload: {
        threadId: 'thread-1',
        userId: 'user-1',
      },
    };

    // action
    const nextState1 = threadDetailReducer(initialState1, action);
    const nextState2 = threadDetailReducer(initialState2, action);

    // assert
    expect(nextState1).toEqual({
      ...threadDetail,
      upVotesBy: [],
      downVotesBy: [],
    });

    expect(nextState2).toEqual({
      ...threadDetail,
      upVotesBy: [],
      downVotesBy: [],
    });
  });

  it('should return threadDetail with comments when given by threadDetail/addComment action', () => {
    // arrange
    const initialState = threadDetail;
    const comment = {
      id: 'comment-2',
      content: 'Ini adalah komentar kedua',
      createdAt: '2021-06-21T07:00:00.000Z',
      upVotesBy: [],
      downVotesBy: [],
      owner: {
        id: 'users-2',
        name: 'John Doe',
        email: 'john@example.com',
      },
    };

    const action = {
      type: 'threadDetail/addComment',
      payload: { comment: comment },
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...threadDetail,
      comments: [action.payload.comment, ...threadDetail.comments],
    });
  });

  it('should return threadDetail with comments and userId filled to comment.upVotesBy and remove from comment.downVotesBy when given by comment/upVote action', () => {
    // arrange
    const initialState = threadDetail;

    const action = {
      type: 'comment/upVote',
      payload: {
        userId: 'user-1',
        commentId: 'comment-1',
      },
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...threadDetail,
      comments: [
        {
          ...threadDetail.comments[0],
          upVotesBy: ['user-1'],
          downVotesBy: [],
        },
      ],
    });
  });

  it('should return threadDetail with comments and userId filled to comment.downVotesBy and remove from comment.upVotesBy when given by comment/downVote action', () => {
    // arrange
    const initialState = threadDetail;

    const action = {
      type: 'comment/downVote',
      payload: {
        userId: 'user-1',
        commentId: 'comment-1',
      },
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...threadDetail,
      comments: [
        {
          ...threadDetail.comments[0],
          upVotesBy: [],
          downVotesBy: ['user-1'],
        },
      ],
    });
  });

  it('should return threadDetail with comments and userId removed from comment.downVotesBy or comment.upVotesBy when given by comment/neutralVote action', () => {
    // arrange
    const initialState1 = {
      ...threadDetail,
      comments: [
        {
          ...threadDetail.comments[0],
          upVotesBy: ['user-1'],
          downVotesBy: [],
        },
      ],
    };

    const initialState2 = {
      ...threadDetail,
      comments: [
        {
          ...threadDetail.comments[0],
          upVotesBy: [],
          downVotesBy: ['user-1'],
        },
      ],
    };

    const action = {
      type: 'comment/neutralVote',
      payload: {
        userId: 'user-1',
        commentId: 'comment-1',
      },
    };

    // action
    const nextState1 = threadDetailReducer(initialState1, action);
    const nextState2 = threadDetailReducer(initialState2, action);

    // assert
    expect(nextState1).toEqual(threadDetail);
    expect(nextState2).toEqual(threadDetail);
  });
});
