import { ActionType } from './action';

function isLoadingReducer(isLoading = { button: false, skeleton: false }, action = {}) {
  switch (action.type) {
    case ActionType.SET_IS_LOADING_BUTTON:
      return { ...isLoading, button: action.payload.isLoading };
    case ActionType.SET_IS_LOADING_SKELETON:
      return { ...isLoading, skeleton: action.payload.isLoading };
    default:
      return isLoading;
  }
}

export default isLoadingReducer;
