const ActionType = {
  SET_IS_LOADING_BUTTON: 'SET_IS_LOADING_BUTTON',
  SET_IS_LOADING_SKELETON: 'SET_IS_LOADING_SKELETON',
};

function isLoadingButtonActionCreator(isLoading) {
  return {
    type: 'SET_IS_LOADING_BUTTON',
    payload: {
      isLoading,
    },
  };
}

function isLoadingSkeletonActionCreator(isLoading) {
  return {
    type: 'SET_IS_LOADING_SKELETON',
    payload: {
      isLoading,
    },
  };
}

export { ActionType, isLoadingButtonActionCreator, isLoadingSkeletonActionCreator };
