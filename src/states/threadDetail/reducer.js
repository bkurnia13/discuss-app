import { ActionType } from './action';

function threadDetailReducer(threadDetail = null, action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_THREAD_DETAIL:
      return action.payload.threadDetail;
    case ActionType.CLEAR_THREAD_DETAIL:
      return null;
    case ActionType.ADD_COMMENT:
      return { ...threadDetail, comments: [action.payload.comment, ...threadDetail.comments] };
    case ActionType.UP_VOTE_THREAD:
      return { ...threadDetail, upVotesBy: [action.payload.userId, ...threadDetail.upVotesBy] };
    default:
      return threadDetail;
  }
}

export default threadDetailReducer;
