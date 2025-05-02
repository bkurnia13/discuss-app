import { configureStore } from '@reduxjs/toolkit';
import isLoadingReducer from './loading/reducer';
import usersReducer from './user/reducer';
import authUserReducer from './authUser/reducer';

const store = configureStore({
  reducer: {
    isLoading: isLoadingReducer,
    users: usersReducer,
    authUser: authUserReducer,
  },
});

export default store;
