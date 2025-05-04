import { ActionType } from './action';

function activeCategoryReducer(activeCategory = [], action = {}) {
  switch (action.type) {
    case ActionType.SET_ACTIVE_CATEGORY:
      if (activeCategory.includes(action.payload.category)) {
        return activeCategory.filter((category) => category !== action.payload.category);
      } else {
        return [...activeCategory, action.payload.category];
      }
    default:
      return activeCategory;
  }
}

export default activeCategoryReducer;
