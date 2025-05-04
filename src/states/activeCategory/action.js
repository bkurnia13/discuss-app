const ActionType = {
  SET_ACTIVE_CATEGORY: 'SET_ACTIVE_CATEGORY',
};

function setActiveCategoryActionCreator(category) {
  return {
    type: ActionType.SET_ACTIVE_CATEGORY,
    payload: {
      category,
    },
  };
}

export { ActionType, setActiveCategoryActionCreator };
