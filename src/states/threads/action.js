import { toast } from 'sonner';
import api from '../../utils/api';
import { isLoadingButtonActionCreator } from '../loading/action';

const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  ADD_THREADS: 'ADD_THREADS',
  UP_VOTE_THREAD: 'UP_VOTE_THREAD',
  DOWN_VOTE_THREAD: 'DOWN_VOTE_THREAD',
  NEUTRAL_VOTE_THREAD: 'NEUTRAL_VOTE_THREAD',
};

const VoteAction = {
  UP_VOTE: 'up-vote',
  DOWN_VOTE: 'down-vote',
  NEUTRAL_VOTE: 'neutral-vote',
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

function voteThreadActionCreator({ userId, threadId, action }) {
  let setActionType = '';

  if (action === VoteAction.UP_VOTE) {
    setActionType = ActionType.UP_VOTE_THREAD;
  } else if (action === VoteAction.DOWN_VOTE) {
    setActionType = ActionType.DOWN_VOTE_THREAD;
  } else {
    setActionType = ActionType.NEUTRAL_VOTE_THREAD;
  }

  return {
    type: setActionType,
    payload: {
      userId,
      threadId,
    },
  };
}

function asyncAddThread({ title, category = '', body }) {
  return async (dispatch) => {
    dispatch(isLoadingButtonActionCreator(true));

    try {
      const thread = await api.createThread({ title, body, category });

      if (thread) {
        dispatch(addThreadActionCreator(thread));
        document.getElementById('create-new-thread').close();
      }
    } catch (error) {
      console.log(error.message);
    }

    dispatch(isLoadingButtonActionCreator(false));
  };
}

function asyncVoteThread({ threadId, action }) {
  return async (dispatch, getState) => {
    const authUser = getState().authUser;
    const threads = getState().threads;
    const thread = threads.find((thread) => thread.id === threadId);
    const checkUpVote = authUser ? thread.upVotesBy.includes(authUser.id) : false;
    const checkDownVote = authUser ? thread.downVotesBy.includes(authUser.id) : false;
    const checkNeutral = action === VoteAction.NEUTRAL_VOTE;

    let reverseAction = VoteAction.NEUTRAL_VOTE;

    // When click neutral_up_vote or click down_vote when already up_vote
    if ((checkNeutral && checkUpVote) || (!checkNeutral && checkUpVote)) {
      reverseAction = VoteAction.UP_VOTE;
    }

    // When click neutral_down_vote or click up_vote when already down_vote
    if ((checkNeutral && checkDownVote) || (!checkNeutral && checkDownVote)) {
      reverseAction = VoteAction.DOWN_VOTE;
    }

    // optimistically apply action
    dispatch(voteThreadActionCreator({ userId: authUser?.id, threadId, action }));

    try {
      if (authUser) {
        await api.voteThread({ threadId, action: action });
      }
    } catch (error) {
      toast.error(error.message);

      //reverse action
      dispatch(voteThreadActionCreator({ userId: authUser?.id, threadId, action: reverseAction }));
    }
  };
}

export {
  ActionType,
  VoteAction,
  receiveThreadsActionCreator,
  addThreadActionCreator,
  asyncAddThread,
  asyncVoteThread,
};
