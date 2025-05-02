const ActionType = {
  SET_IS_LOADING: 'SET_IS_LOADING',
};

function isLoadingActionCreator(isloading) {
  return {
    type: 'SET_IS_LOADING',
    payload: {
      isloading,
    },
  };
}

export { ActionType, isLoadingActionCreator };
