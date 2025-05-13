import { toast } from 'sonner';
import { isLoadingButtonActionCreator } from '../loading/action';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_USERS: 'users/receive',
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
    dispatch(isLoadingButtonActionCreator(true));

    try {
      await api.register({ name, email, password });
    } catch (error) {
      toast.error(error.message);
    }

    dispatch(isLoadingButtonActionCreator(false));
  };
}

export { ActionType, asyncRegisterUser, receiveUsersActionCreator };
