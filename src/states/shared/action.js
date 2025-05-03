import api from '../../utils/api';
import { isLoadingActionCreator } from '../loading/action';
import { receiveUsersActionCreator } from '../user/action';
import { receiveThreadsActionCreator } from '../threads/action';

function asyncPopulateUsersAndThreads() {
  return async (dispatch) => {
    dispatch(isLoadingActionCreator(true));

    try {
      const users = await api.getAllUsers();
      const threads = await api.getAllThreads();

      dispatch(receiveUsersActionCreator(users));
      dispatch(receiveThreadsActionCreator(threads));
    } catch (error) {
      console.log(error.message);
    }

    dispatch(isLoadingActionCreator(false));
  };
}

export { asyncPopulateUsersAndThreads };
