import { toast } from 'sonner';
import { ActionType as ThreadsActionType } from './threads/action';
import { ActionType as ThreadDetailActionType } from './threadDetail/action';

function userAuthCheck(store) {
  const forbiddenActionList = [
    ThreadsActionType.ADD_THREADS,
    ThreadsActionType.UP_VOTE_THREAD,
    ThreadsActionType.DOWN_VOTE_THREAD,
    ThreadsActionType.NEUTRAL_VOTE_THREAD,

    ThreadDetailActionType.UP_VOTE_THREAD_DETAIL,
    ThreadDetailActionType.DOWN_VOTE_THREAD_DETAIL,
    ThreadDetailActionType.NEUTRAL_VOTE_THREAD_DETAIL,

    ThreadDetailActionType.ADD_COMMENT,
    ThreadDetailActionType.UP_VOTE_COMMENT,
    ThreadDetailActionType.DOWN_VOTE_COMMENT,
    ThreadDetailActionType.NEUTRAL_VOTE_COMMENT,
  ];

  return (next) => (action) => {
    if (forbiddenActionList.includes(action.type)) {
      const authUser = store.getState().authUser ?? null;

      if (!authUser) {
        toast.error('Anda belum login!');
        return;
      } else {
        return next(action);
      }
    } else {
      return next(action);
    }
  };
}

function thunk(store) {
  return (next) => (action) => {
    if (typeof action === 'function') {
      return action(store.dispatch, store.getState);
    }

    return next(action);
  };
}

export { userAuthCheck, thunk };
