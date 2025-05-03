import { configureStore } from '@reduxjs/toolkit';
import isLoadingReducer from './loading/reducer';
import usersReducer from './user/reducer';
import authUserReducer from './authUser/reducer';
import threadsReducer from './threads/reducer';
import threadDetailReducer from './threadDetail/reducer';
import categoriesReducer from './category/reducer';

const store = configureStore({
  reducer: {
    isLoading: isLoadingReducer,
    users: usersReducer,
    authUser: authUserReducer,
    threads: threadsReducer,
    threadDetail: threadDetailReducer,
    categories: categoriesReducer,
  },
});

export default store;
