const ActionType = {
  SET_IS_LOADING_BUTTON: 'isLoadingButton/set',
  SET_IS_LOADING_SKELETON: 'isLoadingSkeleton/set',
};

function isLoadingButtonActionCreator(isLoading) {
  return {
    type: ActionType.SET_IS_LOADING_BUTTON,
    payload: {
      isLoading,
    },
  };
}

function isLoadingSkeletonActionCreator(isLoading) {
  return {
    type: ActionType.SET_IS_LOADING_SKELETON,
    payload: {
      isLoading,
    },
  };
}

export { ActionType, isLoadingButtonActionCreator, isLoadingSkeletonActionCreator };
