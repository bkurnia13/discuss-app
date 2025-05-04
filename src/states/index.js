import { configureStore } from '@reduxjs/toolkit';
import { userAuthCheck } from './middleware';
import isLoadingReducer from './loading/reducer';
import usersReducer from './user/reducer';
import authUserReducer from './authUser/reducer';
import threadsReducer from './threads/reducer';
import threadDetailReducer from './threadDetail/reducer';
import categoriesReducer from './category/reducer';
import leaderboardReducer from './leaderboard/reducer';

const store = configureStore({
  reducer: {
    isLoading: isLoadingReducer,
    users: usersReducer,
    authUser: authUserReducer,
    threads: threadsReducer,
    threadDetail: threadDetailReducer,
    categories: categoriesReducer,
    leaderboard: leaderboardReducer,
  },
  // middleware: () => new Tuple(thunk, userAuthCheck),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userAuthCheck),
});

export default store;
