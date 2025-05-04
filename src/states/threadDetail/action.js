import api from '../../utils/api';
import { isLoadingButtonActionCreator } from '../loading/action';
import { isLoadingSkeletonActionCreator } from '../loading/action';

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
  ADD_COMMENT: 'ADD_COMMENT',
  UP_VOTE_THREAD_DETAIL: 'UP_VOTE_THREAD_DETAIL',
};

function receiveThreadDetailActionCreator(threadDetail) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: {
      threadDetail,
    },
  };
}

function clearThreadDetailActionCreator() {
  return {
    type: ActionType.CLEAR_THREAD_DETAIL,
  };
}

function addCommentActionCreator(comment) {
  return {
    type: ActionType.ADD_COMMENT,
    payload: {
      comment,
    },
  };
}

function upVoteThreadDetailActionCreator(userId) {
  return {
    type: ActionType.UP_VOTE_THREAD,
    payload: {
      userId,
    },
  };
}

function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(isLoadingSkeletonActionCreator(true));
    dispatch(clearThreadDetailActionCreator());

    try {
      const threadDetail = await api.getThreadDetail(threadId);
      dispatch(receiveThreadDetailActionCreator(threadDetail));
    } catch (error) {
      console.log(error.message);
    }

    dispatch(isLoadingSkeletonActionCreator(false));
  };
}

function asyncAddComment({ threadId, content }) {
  return async (dispatch) => {
    dispatch(isLoadingButtonActionCreator(true));

    try {
      const comment = await api.createComment({ threadId, content });

      if (comment) {
        dispatch(addCommentActionCreator(comment));
      }
    } catch (error) {
      console.log(error.message);
    }

    dispatch(isLoadingButtonActionCreator(false));
  };
}

function asyncUpVoteThreadDetail(threadId) {
  return async (dispatch) => {
    try {
      const { userId } = await api.upVoteThread(threadId);
      dispatch(upVoteThreadDetailActionCreator(userId));
    } catch (error) {
      console.log(error.message);
    }
  };
}

export {
  ActionType,
  receiveThreadDetailActionCreator,
  asyncReceiveThreadDetail,
  asyncAddComment,
  asyncUpVoteThreadDetail,
};
