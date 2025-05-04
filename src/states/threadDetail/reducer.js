import { ActionType } from './action';

function threadDetailReducer(threadDetail = null, action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_THREAD_DETAIL:
      return action.payload.threadDetail;
    case ActionType.CLEAR_THREAD_DETAIL:
      return null;
    case ActionType.ADD_COMMENT:
      return { ...threadDetail, comments: [action.payload.comment, ...threadDetail.comments] };
    case ActionType.UP_VOTE_THREAD_DETAIL:
      return {
        ...threadDetail,
        upVotesBy: [action.payload.userId, ...threadDetail.upVotesBy],
        downVotesBy: threadDetail.downVotesBy.filter((userId) => userId !== action.payload.userId),
      };
    case ActionType.DOWN_VOTE_THREAD_DETAIL:
      return {
        ...threadDetail,
        upVotesBy: threadDetail.upVotesBy.filter((userId) => userId !== action.payload.userId),
        downVotesBy: [action.payload.userId, ...threadDetail.downVotesBy],
      };
    case ActionType.NEUTRAL_VOTE_THREAD_DETAIL:
      return {
        ...threadDetail,
        upVotesBy: threadDetail.upVotesBy.filter((userId) => userId !== action.payload.userId),
        downVotesBy: threadDetail.downVotesBy.filter((userId) => userId !== action.payload.userId),
      };
    case ActionType.UP_VOTE_COMMENT:
      return {
        ...threadDetail,
        comments: threadDetail.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            return {
              ...comment,
              upVotesBy: [action.payload.userId, ...comment.upVotesBy],
              downVotesBy: comment.downVotesBy.filter((userId) => userId !== action.payload.userId),
            };
          }
          return comment;
        }),
      };
    case ActionType.DOWN_VOTE_COMMENT:
      return {
        ...threadDetail,
        comments: threadDetail.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            return {
              ...comment,
              upVotesBy: comment.upVotesBy.filter((userId) => userId !== action.payload.userId),
              downVotesBy: [action.payload.userId, ...comment.downVotesBy],
            };
          }
          return comment;
        }),
      };
    case ActionType.NEUTRAL_VOTE_COMMENT:
      return {
        ...threadDetail,
        comments: threadDetail.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            return {
              ...comment,
              upVotesBy: comment.upVotesBy.filter((userId) => userId !== action.payload.userId),
              downVotesBy: comment.downVotesBy.filter((userId) => userId !== action.payload.userId),
            };
          }
          return comment;
        }),
      };
    default:
      return threadDetail;
  }
}

export default threadDetailReducer;
