/**
 * asyncReceiveThreadDetail thunk
 *  - should dispatch action correctly, call api.getThreadDetail, and return state with thread detail when threadId is found
 *  - should dispatch action correctly, call api.getThreadDetail, and return state with null when threadId is not found
 *  - should call toast.error when data fetching failed and return initial state
 *
 * asyncAddComment thunk
 *  - should dispatch action correctly, call api.createComment, and return state correctly
 *  - should call toast.error when data fetching failed an return initial state
 *
 * asyncVoteThreadDetail thunk
 *  - should call api.voteThread and return state correctly when given by up-vote action
 *  - should call api.voteThread and return state correctly when given by down-vote action
 *  - should call api.voteThread method and return state correctly when given by neutral-vote action
 *  - should call toast.error and return initial state when data fetching failed
 *
 * asyncVoteComment thunk
 *  - should call api.voteComment and return state correctly when given by up-vote action
 *  - should call api.voteComment and return state correctly when given by down-vote action
 *  - should call api.voteComment and return state correctly when given by neutral-vote action
 *  - should call toast.error and return initial state when data fetching failed
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { setupStore } from '../index';
import { toast } from 'sonner';
import * as isLoadingAction from '../loading/action';
import {
  asyncReceiveThreadDetail,
  asyncAddComment,
  asyncVoteThreadDetail,
  asyncVoteComment,
} from './action';
import api from '../../utils/api';

const userId = 'users-1';
const threadId = 'thread-1';
const commentId = 'comment-1';

const fakeThreadDetailResponse = {
  id: 'thread-1',
  title: 'Thread Pertama',
  body: 'Ini adalah thread pertama',
  category: 'General',
  createdAt: '2021-06-21T07:00:00.000Z',
  owner: {
    id: userId,
    name: 'John Doe',
    avatar: 'https://generated-image-url.jpg',
  },
  upVotesBy: [],
  downVotesBy: [],
  comments: [
    {
      id: commentId,
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

const fakeNewComment = {
  content: 'Ini adalah komentar pertama',
};

const fakeCreatedCommentResponse = {
  id: 'comment-2',
  content: 'Ini adalah komentar kedua',
  createdAt: '2021-06-21T07:00:00.000Z',
  upVotesBy: [],
  downVotesBy: [],
  owner: {
    id: 'users-2',
    name: 'Jane Doe',
    email: 'jane@example.com',
  },
};

const fakeErrorResponse = new Error('Failed to fetch thread detail.');

describe('asyncReceiveThreadDetail thunk', () => {
  const initialState = {
    threadDetail: null,
  };

  let isLoadingSkeletonActionCreatorSpy;

  beforeEach(() => {
    // spy isLoadingSkeletonActionCreator
    isLoadingSkeletonActionCreatorSpy = vi.spyOn(isLoadingAction, 'isLoadingSkeletonActionCreator');
  });

  afterEach(() => {
    // mock restore
    isLoadingSkeletonActionCreatorSpy.mockRestore();
  });

  it('should dispatch action correctly, call api.getThreadDetail, and return state with thread detail when threadId is found', async () => {
    // arrange
    const store = setupStore(initialState);

    // mock api.getThreadDetail
    const getThreadDetailSpy = vi
      .spyOn(api, 'getThreadDetail')
      .mockImplementation(({ threadId }) =>
        Promise.resolve({ ...fakeThreadDetailResponse, id: threadId })
      );

    // action
    await store.dispatch(asyncReceiveThreadDetail({ threadId }));

    // assert
    expect(isLoadingSkeletonActionCreatorSpy).toHaveBeenCalledWith(true);
    expect(isLoadingSkeletonActionCreatorSpy).toHaveBeenCalledWith(false);
    expect(getThreadDetailSpy).toHaveBeenCalledWith({ threadId });
    expect(store.getState().threadDetail).toEqual(fakeThreadDetailResponse);

    // mock restore
    getThreadDetailSpy.mockRestore();
    isLoadingSkeletonActionCreatorSpy.mockRestore();
  });

  it('should dispatch action correctly, call api.getThreadDetail, and return state with null when threadId is not found', async () => {
    // arrange
    const store = setupStore(initialState);

    // mock api.getThreadDetail
    const getThreadDetailSpy = vi
      .spyOn(api, 'getThreadDetail')
      .mockImplementation(() => Promise.resolve(null));

    // action
    await store.dispatch(asyncReceiveThreadDetail({ threadId }));

    // assert
    expect(isLoadingSkeletonActionCreatorSpy).toHaveBeenCalledWith(true);
    expect(isLoadingSkeletonActionCreatorSpy).toHaveBeenCalledWith(false);
    expect(getThreadDetailSpy).toHaveBeenCalledWith({ threadId });
    expect(store.getState().threadDetail).toEqual(initialState.threadDetail);

    // mock restore
    getThreadDetailSpy.mockRestore();
    isLoadingSkeletonActionCreatorSpy.mockRestore();
  });

  it('should call toast.error when data fetching failed and return initial state', async () => {
    // arrange
    const store = setupStore(initialState);

    // mock api.getThreadDetail
    const getThreadDetailSpy = vi
      .spyOn(api, 'getThreadDetail')
      .mockImplementation(() => Promise.reject(fakeErrorResponse));

    // spy toast
    const toastSpy = vi.spyOn(toast, 'error');

    // action
    await store.dispatch(asyncReceiveThreadDetail({ threadId }));

    // assert
    expect(isLoadingSkeletonActionCreatorSpy).toHaveBeenCalledWith(true);
    expect(isLoadingSkeletonActionCreatorSpy).toHaveBeenCalledWith(false);
    expect(getThreadDetailSpy).toHaveBeenCalledWith({ threadId });
    expect(store.getState().threadDetail).toEqual(initialState.threadDetail);
    expect(toastSpy).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(toastSpy).toHaveReturned();

    // mock restore
    getThreadDetailSpy.mockRestore();
    toastSpy.mockRestore();
  });
});

describe('asyncAddComment thunk', () => {
  let isLoadingButtonActionCreatorSpy;

  beforeEach(() => {
    // spy isLoadingButtonActionCreator
    isLoadingButtonActionCreatorSpy = vi.spyOn(isLoadingAction, 'isLoadingButtonActionCreator');
  });

  afterEach(() => {
    // mock restore
    isLoadingButtonActionCreatorSpy.mockRestore();
  });

  it('should dispatch action correctly, call api.createComment, and return state correctly', async () => {
    // arrange
    const initialState = {
      threadDetail: { ...fakeThreadDetailResponse },
    };

    const store = setupStore(initialState);

    // mock api.createComment
    const createCommentSpy = vi
      .spyOn(api, 'createComment')
      .mockImplementation(() => Promise.resolve(fakeCreatedCommentResponse));

    // action
    await store.dispatch(asyncAddComment({ threadId, content: fakeNewComment.content }));
    const nextState = {
      ...fakeThreadDetailResponse,
      comments: [fakeCreatedCommentResponse, ...fakeThreadDetailResponse.comments],
    };

    // assert
    expect(isLoadingButtonActionCreatorSpy).toHaveBeenCalledWith(true);
    expect(isLoadingButtonActionCreatorSpy).toHaveBeenCalledWith(false);
    expect(createCommentSpy).toHaveBeenCalledWith({ threadId, content: fakeNewComment.content });
    expect(store.getState().threadDetail).toEqual(nextState);

    // mock restore
    createCommentSpy.mockRestore();
  });

  it('should call toast.error when data fetching failed an return initial state', async () => {
    // arrange
    const initialState = {
      threadDetail: { ...fakeThreadDetailResponse },
    };

    const store = setupStore(initialState);

    // mock api.createComment
    const createCommentSpy = vi
      .spyOn(api, 'createComment')
      .mockImplementation(() => Promise.reject(fakeErrorResponse));

    // spy toast
    const toastSpy = vi.spyOn(toast, 'error');

    // action
    await store.dispatch(asyncAddComment({ threadId, content: fakeNewComment.content }));

    // assert
    expect(isLoadingButtonActionCreatorSpy).toHaveBeenCalledWith(true);
    expect(isLoadingButtonActionCreatorSpy).toHaveBeenCalledWith(false);
    expect(createCommentSpy).toHaveBeenCalledWith({ threadId, content: fakeNewComment.content });
    expect(toastSpy).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(toastSpy).toHaveReturned();
    expect(store.getState().threadDetail).toEqual(initialState.threadDetail);

    // mock restore
    createCommentSpy.mockRestore();
    toastSpy.mockRestore();
  });
});

describe('asyncVoteThreadDetail thunk', () => {
  let voteThreadSpy;

  beforeEach(() => {
    // mock api.voteThread
    voteThreadSpy = vi.spyOn(api, 'voteThread').mockImplementation(({ threadId, action }) =>
      Promise.resolve({
        id: 'vote-1',
        userId: userId,
        threadId: threadId,
        voteType: action === 'up-vote' ? 1 : action === 'down-vote' ? -1 : 0,
      })
    );
  });

  afterEach(() => {
    // mock restore
    voteThreadSpy.mockRestore();
  });

  it('should call api.voteThread and return state correctly when given by up-vote action', async () => {
    // arrange
    const initialState = {
      authUser: {
        id: userId,
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://generated-image-url.jpg',
      },
      threadDetail: {
        ...fakeThreadDetailResponse,
        downVotesBy: [userId],
      },
    };

    const store = setupStore(initialState);

    // action
    await store.dispatch(asyncVoteThreadDetail('up-vote'));
    const nextState = {
      ...initialState,
      threadDetail: {
        ...initialState.threadDetail,
        upVotesBy: [userId],
        downVotesBy: [],
      },
    };

    // assert
    expect(voteThreadSpy).toHaveBeenCalledWith({ threadId, action: 'up-vote' });
    expect(store.getState().threadDetail).toEqual(nextState.threadDetail);
  });

  it('should call api.voteThread and return state correctly when given by down-vote action', async () => {
    // arrange
    const initialState = {
      authUser: {
        id: userId,
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://generated-image-url.jpg',
      },
      threadDetail: {
        ...fakeThreadDetailResponse,
        upVotesBy: [userId],
      },
    };

    const store = setupStore(initialState);

    // action
    await store.dispatch(asyncVoteThreadDetail('down-vote'));
    const nextState = {
      ...initialState,
      threadDetail: {
        ...initialState.threadDetail,
        upVotesBy: [],
        downVotesBy: [userId],
      },
    };

    // assert
    expect(voteThreadSpy).toHaveBeenCalledWith({ threadId, action: 'down-vote' });
    expect(store.getState().threadDetail).toEqual(nextState.threadDetail);
  });

  it('should call api.voteThread method and return state correctly when given by neutral-vote action', async () => {
    // arrange
    const initialState = {
      authUser: {
        id: userId,
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://generated-image-url.jpg',
      },
      threadDetail: {
        ...fakeThreadDetailResponse,
        upVotesBy: [userId],
      },
    };

    const store = setupStore(initialState);

    // action
    await store.dispatch(asyncVoteThreadDetail('neutral-vote'));
    const nextState = {
      ...initialState,
      threadDetail: {
        ...initialState.threadDetail,
        upVotesBy: [],
        downVotesBy: [],
      },
    };

    // assert
    expect(voteThreadSpy).toHaveBeenCalledWith({ threadId, action: 'neutral-vote' });
    expect(store.getState().threadDetail).toEqual(nextState.threadDetail);
  });

  it('should call toast.error and return initial state when data fetching failed', async () => {
    // arrange
    const initialState = {
      authUser: {
        id: userId,
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://generated-image-url.jpg',
      },
      threadDetail: { ...fakeThreadDetailResponse },
    };

    const store = setupStore(initialState);

    // mock api.voteThread
    voteThreadSpy = vi
      .spyOn(api, 'voteThread')
      .mockImplementation(() => Promise.reject(fakeErrorResponse));

    // spy toast
    const toastSpy = vi.spyOn(toast, 'error');

    // action
    await store.dispatch(asyncVoteThreadDetail('up-vote'));

    // assert
    expect(voteThreadSpy).toHaveBeenCalledWith({ threadId, action: 'up-vote' });
    expect(toastSpy).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(toastSpy).toHaveReturned();
    expect(store.getState().threadDetail).toEqual(initialState.threadDetail);

    // mock restore
    voteThreadSpy.mockRestore();
    toastSpy.mockRestore();
  });
});

describe('asyncVoteComment thunk', () => {
  let voteCommentSpy;

  beforeEach(() => {
    // mock api.voteComment
    voteCommentSpy = vi.spyOn(api, 'voteComment').mockImplementation(({ commentId, action }) =>
      Promise.resolve({
        id: 'vote-1',
        userId: userId,
        commentId: commentId,
        voteType: action === 'up-vote' ? 1 : action === 'down-vote' ? -1 : 0,
      })
    );
  });

  afterEach(() => {
    // mock restore
    voteCommentSpy.mockRestore();
  });

  it('should call api.voteComment and return state correctly when given by up-vote action', async () => {
    // arrange
    const initialState = {
      authUser: {
        id: userId,
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://generated-image-url.jpg',
      },
      threadDetail: {
        ...fakeThreadDetailResponse,
        comments: [
          {
            ...fakeThreadDetailResponse.comments[0],
            downVotesBy: [userId],
          },
        ],
      },
    };

    const store = setupStore(initialState);

    // action
    await store.dispatch(asyncVoteComment({ commentId, action: 'up-vote' }));
    const nextState = {
      ...initialState,
      threadDetail: {
        ...initialState.threadDetail,
        comments: [
          {
            ...fakeThreadDetailResponse.comments[0],
            upVotesBy: [userId],
            downVotesBy: [],
          },
        ],
      },
    };

    // assert
    expect(voteCommentSpy).toHaveBeenCalledWith({ threadId, commentId, action: 'up-vote' });
    expect(store.getState().threadDetail).toEqual(nextState.threadDetail);
  });

  it('should call api.voteComment and return state correctly when given by down-vote action', async () => {
    // arrange
    const initialState = {
      authUser: {
        id: userId,
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://generated-image-url.jpg',
      },
      threadDetail: {
        ...fakeThreadDetailResponse,
        comments: [
          {
            ...fakeThreadDetailResponse.comments[0],
            upVotesBy: [userId],
          },
        ],
      },
    };

    const store = setupStore(initialState);

    // action
    await store.dispatch(asyncVoteComment({ commentId, action: 'down-vote' }));
    const nextState = {
      ...initialState,
      threadDetail: {
        ...initialState.threadDetail,
        comments: [
          {
            ...fakeThreadDetailResponse.comments[0],
            upVotesBy: [],
            downVotesBy: [userId],
          },
        ],
      },
    };

    // assert
    expect(voteCommentSpy).toHaveBeenCalledWith({ threadId, commentId, action: 'down-vote' });
    expect(store.getState().threadDetail).toEqual(nextState.threadDetail);
  });

  it('should call api.voteComment and return state correctly when given by neutral-vote action', async () => {
    // arrange
    const initialState = {
      authUser: {
        id: userId,
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://generated-image-url.jpg',
      },
      threadDetail: {
        ...fakeThreadDetailResponse,
        comments: [
          {
            ...fakeThreadDetailResponse.comments[0],
            upVotesBy: [userId],
          },
        ],
      },
    };

    const store = setupStore(initialState);

    // action
    await store.dispatch(asyncVoteComment({ commentId, action: 'neutral-vote' }));
    const nextState = {
      ...initialState,
      threadDetail: {
        ...initialState.threadDetail,
        comments: [
          {
            ...fakeThreadDetailResponse.comments[0],
            upVotesBy: [],
            downVotesBy: [],
          },
        ],
      },
    };

    // assert
    expect(voteCommentSpy).toHaveBeenCalledWith({ threadId, commentId, action: 'neutral-vote' });
    expect(store.getState().threadDetail).toEqual(nextState.threadDetail);
  });

  it('should call toast.error and return initial state when data fetching failed', async () => {
    // arrange
    const initialState = {
      authUser: {
        id: userId,
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://generated-image-url.jpg',
      },
      threadDetail: {
        ...fakeThreadDetailResponse,
        comments: [
          {
            ...fakeThreadDetailResponse.comments[0],
            upVotesBy: ['users-2'],
            downVotesBy: ['users-3'],
          },
        ],
      },
    };

    const store = setupStore(initialState);

    // mock api.voteThread
    voteCommentSpy = vi
      .spyOn(api, 'voteComment')
      .mockImplementation(() => Promise.reject(fakeErrorResponse));

    // spy toast
    const toastSpy = vi.spyOn(toast, 'error');

    // action
    await store.dispatch(asyncVoteComment({ commentId, action: 'up-vote' }));

    // assert
    expect(voteCommentSpy).toHaveBeenCalledWith({ threadId, commentId, action: 'up-vote' });
    expect(toastSpy).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(toastSpy).toHaveReturned();
    expect(store.getState().threadDetail).toEqual(initialState.threadDetail);

    // mock restore
    voteCommentSpy.mockRestore();
    toastSpy.mockRestore();
  });
});
