const ActionType = {
  SET_ACTIVE_CATEGORY: 'activeCategory/set',
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
