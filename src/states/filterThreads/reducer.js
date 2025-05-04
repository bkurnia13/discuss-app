import { ActionType } from './action';

function filterThreadsReducer(filterThreads = [], action = {}) {
  switch (action.type) {
    case ActionType.SET_FILTER_THREADS:
      if (action.payload.activeCategory.length > 0) {
        return action.payload.threads.filter((thread) =>
          action.payload.activeCategory.includes(thread.category.toLowerCase())
        );
      } else {
        return action.payload.threads;
      }
    default:
      return filterThreads;
  }
}

export default filterThreadsReducer;
