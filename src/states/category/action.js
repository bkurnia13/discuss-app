import popularCategory from '../../utils/popularCaegory';

const ActionType = {
  RECEIVE_PUPOLAR_CATEGORY: 'popularCategory/receive',
};

function receivePopularCategory(categories) {
  return {
    type: ActionType.RECEIVE_PUPOLAR_CATEGORY,
    payload: {
      categories,
    },
  };
}

function sortCategoryFromThreads(threads = []) {
  return (dispatch) => {
    const categories = popularCategory(threads);
    dispatch(receivePopularCategory(categories));
  };
}

export { ActionType, receivePopularCategory, sortCategoryFromThreads };
