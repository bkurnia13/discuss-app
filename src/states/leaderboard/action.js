import { toast } from 'sonner';
import api from '../../utils/api';
import { isLoadingSkeletonActionCreator } from '../loading/action';

const ActionType = {
  RECEIVE_LEADERBOARD: 'leaderboard/receive',
};

function receiveLeaderboardActionCreator(leaderboard) {
  return {
    type: ActionType.RECEIVE_LEADERBOARD,
    payload: {
      leaderboard,
    },
  };
}

function asyncReceiveLeaderboard() {
  return async (dispatch) => {
    dispatch(isLoadingSkeletonActionCreator(true));

    try {
      const leaderboard = await api.getLeaderboard();
      dispatch(receiveLeaderboardActionCreator(leaderboard));
    } catch (error) {
      toast.error(error.message);
    }

    dispatch(isLoadingSkeletonActionCreator(false));
  };
}

export { ActionType, asyncReceiveLeaderboard };
