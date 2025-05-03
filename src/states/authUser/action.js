import { toast } from 'sonner';
import { isLoadingActionCreator } from '../loading/action';
import api from '../../utils/api';

const ActionType = {
  SET_AUTH_USER: 'SET_AUTH_USER',
  UNSET_AUTH_USER: 'UNSET_AUTH_USER',
};

function setAuthUserActionCreator(authUser) {
  return {
    type: ActionType.SET_AUTH_USER,
    payload: {
      authUser,
    },
  };
}

function unsetAuthUserActionCreator() {
  return {
    type: ActionType.UNSET_AUTH_USER,
    payload: {
      authUser: null,
    },
  };
}

function asyncSetAuthUser({ email, password }) {
  return async (dispatch) => {
    dispatch(isLoadingActionCreator(true));

    try {
      const token = await api.login({ email, password });

      if (token) {
        api.putAccessToken(token);
        const authUser = await api.getOwnProfile();
        dispatch(setAuthUserActionCreator(authUser));
      }
    } catch (error) {
      toast.error(error.message);
    }

    dispatch(isLoadingActionCreator(false));
  };
}

function asyncUnsetAuthUser() {
  return (dispatch) => {
    dispatch(unsetAuthUserActionCreator());
    api.putAccessToken('');
  };
}

export {
  ActionType,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
  asyncSetAuthUser,
  asyncUnsetAuthUser,
};
