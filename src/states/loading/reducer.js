import { ActionType } from './action';

function isloadingReducer(isloading = false, action = {}) {
  switch (action.type) {
    case ActionType.SET_IS_LOADING:
      return action.payload.isloading;
    default:
      return isloading;
  }
}

export default isloadingReducer;
