import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { userAuthCheck } from './middleware';
import isLoadingReducer from './loading/reducer';
import usersReducer from './user/reducer';
import authUserReducer from './authUser/reducer';
import threadsReducer from './threads/reducer';
import threadDetailReducer from './threadDetail/reducer';
import categoriesReducer from './category/reducer';
import activeCategoryReducer from './activeCategory/reducer';
import filterThreadsReducer from './filterThreads/reducer';
import leaderboardReducer from './leaderboard/reducer';

const rootReducer = combineReducers({
  isLoading: isLoadingReducer,
  users: usersReducer,
  authUser: authUserReducer,
  threads: threadsReducer,
  threadDetail: threadDetailReducer,
  categories: categoriesReducer,
  activeCategory: activeCategoryReducer,
  filterThreads: filterThreadsReducer,
  leaderboard: leaderboardReducer,
});

const setupStore = (preloadedState) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userAuthCheck),
});

export default store;
export { setupStore };
