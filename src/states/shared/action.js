import api from '../../utils/api';
import { toast } from 'sonner';
import { isLoadingSkeletonActionCreator } from '../loading/action';
import { receiveUsersActionCreator } from '../user/action';
import { receiveThreadsActionCreator } from '../threads/action';

function asyncPopulateUsersAndThreads() {
  return async (dispatch) => {
    dispatch(isLoadingSkeletonActionCreator(true));

    try {
      const users = await api.getAllUsers();
      const threads = await api.getAllThreads();

      dispatch(receiveUsersActionCreator(users));
      dispatch(receiveThreadsActionCreator(threads));
    } catch (error) {
      toast.error(error.message);
    }

    dispatch(isLoadingSkeletonActionCreator(false));
  };
}

export { asyncPopulateUsersAndThreads };
