import { toast } from 'sonner';
import api from '../../utils/api';
import { VoteAction } from '../threads/action';
import { isLoadingButtonActionCreator } from '../loading/action';
import { isLoadingSkeletonActionCreator } from '../loading/action';

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'threadDetail/receive',
  CLEAR_THREAD_DETAIL: 'threadDetail/clear',
  ADD_COMMENT: 'threadDetail/addComment',
  UP_VOTE_THREAD_DETAIL: 'threadDetail/upVote',
  DOWN_VOTE_THREAD_DETAIL: 'threadDetail/downVote',
  NEUTRAL_VOTE_THREAD_DETAIL: 'threadDetail/neutralVote',
  UP_VOTE_COMMENT: 'comment/upVote',
  DOWN_VOTE_COMMENT: 'comment/downVote',
  NEUTRAL_VOTE_COMMENT: 'comment/neutralVote',
};

function receiveThreadDetailActionCreator(threadDetail) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: {
      threadDetail,
    },
  };
}

function clearThreadDetailActionCreator() {
  return {
    type: ActionType.CLEAR_THREAD_DETAIL,
  };
}

function addCommentActionCreator(comment) {
  return {
    type: ActionType.ADD_COMMENT,
    payload: {
      comment,
    },
  };
}

function voteThreadDetailActionCreator({ userId, action }) {
  let setActionType = '';

  if (action === VoteAction.UP_VOTE) {
    setActionType = ActionType.UP_VOTE_THREAD_DETAIL;
  } else if (action === VoteAction.DOWN_VOTE) {
    setActionType = ActionType.DOWN_VOTE_THREAD_DETAIL;
  } else {
    setActionType = ActionType.NEUTRAL_VOTE_THREAD_DETAIL;
  }

  return {
    type: setActionType,
    payload: {
      userId,
    },
  };
}

function voteCommentActionCreator({ userId, commentId, action }) {
  let setActionType = '';

  if (action === VoteAction.UP_VOTE) {
    setActionType = ActionType.UP_VOTE_COMMENT;
  } else if (action === VoteAction.DOWN_VOTE) {
    setActionType = ActionType.DOWN_VOTE_COMMENT;
  } else {
    setActionType = ActionType.NEUTRAL_VOTE_COMMENT;
  }

  return {
    type: setActionType,
    payload: {
      userId,
      commentId,
    },
  };
}

function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(isLoadingSkeletonActionCreator(true));
    dispatch(clearThreadDetailActionCreator());

    try {
      const threadDetail = await api.getThreadDetail(threadId);
      dispatch(receiveThreadDetailActionCreator(threadDetail));
    } catch (error) {
      toast.error(error.message);
    }

    dispatch(isLoadingSkeletonActionCreator(false));
  };
}

function asyncAddComment({ threadId, content }) {
  return async (dispatch) => {
    dispatch(isLoadingButtonActionCreator(true));

    try {
      const comment = await api.createComment({ threadId, content });

      if (comment) {
        dispatch(addCommentActionCreator(comment));
      }
    } catch (error) {
      toast.error(error.message);
    }

    dispatch(isLoadingButtonActionCreator(false));
  };
}

function asyncVoteThreadDetail(action) {
  return async (dispatch, getState) => {
    const authUser = getState().authUser;
    const threadDetail = getState().threadDetail;
    const checkUpVote = authUser ? threadDetail.upVotesBy.includes(authUser.id) : false;
    const checkDownVote = authUser ? threadDetail.downVotesBy.includes(authUser.id) : false;
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
    dispatch(voteThreadDetailActionCreator({ userId: authUser?.id, action }));

    try {
      if (authUser) {
        await api.voteThread({ threadId: threadDetail.id, action: action });
      }
    } catch (error) {
      toast.error(error.message);

      //reverse action
      dispatch(voteThreadDetailActionCreator({ userId: authUser?.id, action: reverseAction }));
    }
  };
}

function asyncVoteComment({ commentId, action }) {
  return async (dispatch, getState) => {
    const authUser = getState().authUser;
    const threadDetail = getState().threadDetail;

    const checkUpVote = authUser
      ? threadDetail.comments
        .find((comment) => comment.id === commentId)
        .upVotesBy.includes(authUser?.id)
      : false;

    const checkDownVote = authUser
      ? threadDetail.comments
        .find((comment) => comment.id === commentId)
        .downVotesBy.includes(authUser?.id)
      : false;

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
    dispatch(voteCommentActionCreator({ userId: authUser?.id, commentId, action }));

    try {
      if (authUser) {
        await api.voteComment({ threadId: threadDetail.id, commentId, action });
      }
    } catch (error) {
      toast.error(error.message);

      //reverse action
      dispatch(
        voteCommentActionCreator({ userId: authUser?.id, commentId, action: reverseAction })
      );
    }
  };
}

export {
  ActionType,
  receiveThreadDetailActionCreator,
  asyncReceiveThreadDetail,
  asyncAddComment,
  asyncVoteThreadDetail,
  asyncVoteComment,
};
