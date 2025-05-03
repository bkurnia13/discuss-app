import api from '../../utils/api';
import { isLoadingActionCreator } from '../loading/action';

const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  ADD_THREADS: 'ADD_THREADS',
};

function receiveThreadsActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads,
    },
  };
}

function addThreadActionCreator(thread) {
  return {
    type: ActionType.ADD_THREADS,
    payload: {
      thread,
    },
  };
}

function asyncAddThread({ title, category = '', body }) {
  return async (dispatch) => {
    dispatch(isLoadingActionCreator(true));

    try {
      const thread = await api.createThread({ title, body, category });
      dispatch(addThreadActionCreator(thread));
    } catch (error) {
      console.log(error.message);
    }

    dispatch(isLoadingActionCreator(false));
  };
}

export { ActionType, receiveThreadsActionCreator, addThreadActionCreator, asyncAddThread };
