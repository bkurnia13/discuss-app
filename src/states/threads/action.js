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

const VoteThreadAction = {
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
  let actionType = '';

  if (action === VoteThreadAction.UP_VOTE) {
    actionType = ActionType.UP_VOTE_THREAD;
  } else if (action === VoteThreadAction.DOWN_VOTE) {
    actionType = ActionType.DOWN_VOTE_THREAD;
  } else {
    actionType = ActionType.NEUTRAL_VOTE_THREAD;
  }

  return {
    type: actionType,
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
    const checkUpVote = thread.upVotesBy.includes(authUser.id);
    const checkDownVote = thread.downVotesBy.includes(authUser.id);
    const checkNeutral = action === VoteThreadAction.NEUTRAL_VOTE;

    let reverseAction = VoteThreadAction.NEUTRAL_VOTE;

    // When click neutral_up_vote or click down_vote when already up_vote
    if ((checkNeutral && checkUpVote) || (!checkNeutral && checkUpVote)) {
      reverseAction = VoteThreadAction.UP_VOTE;
    }

    // When click neutral_down_vote or click up_vote when already down_vote
    if ((checkNeutral && checkDownVote) || (!checkNeutral && checkDownVote)) {
      reverseAction = VoteThreadAction.DOWN_VOTE;
    }

    // optimistically apply action
    dispatch(voteThreadActionCreator({ userId: authUser.id, threadId, action }));

    try {
      await api.voteThread({ threadId, action: action });
    } catch (error) {
      toast.error(error.message);

      console.log(reverseAction);

      //reverse action
      dispatch(voteThreadActionCreator({ userId: authUser.id, threadId, action: reverseAction }));
    }
  };
}

export {
  ActionType,
  VoteThreadAction,
  receiveThreadsActionCreator,
  addThreadActionCreator,
  asyncAddThread,
  asyncVoteThread,
};
