import { toast } from 'sonner';
import { isLoadingActionCreator } from '../loading/action';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_USERS: 'RECEIVE_USERS',
};

function receiveUsersActionCreator(users) {
  return {
    type: ActionType.RECEIVE_USERS,
    payload: {
      users,
    },
  };
}

function asyncRegisterUser({ name, email, password }) {
  return async (dispatch) => {
    dispatch(isLoadingActionCreator(true));

    try {
      await api.register({ name, email, password });
    } catch (error) {
      toast.error(error.message);
    }

    dispatch(isLoadingActionCreator(false));
  };
}

export { ActionType, asyncRegisterUser, receiveUsersActionCreator };
