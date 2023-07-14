import { createSlice } from '@reduxjs/toolkit';
import { authOperations } from './authOperations';

const initialState = {
  user: {
    name: null,
    email: null,
  },

  isLoggedIn: false,
  isRefreshing: false,
};
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    [authOperations.register.fulfilled](state, action) {
      // state.user = action.payload.user;
      state.isLoggedIn = true;
    },
  },
});

const selectIsLoggedIn = state => state.auth.isLoggedIn;
const selectUsername = state => state.auth.user.name;
const selectIsRefreshing = state => state.auth.isRefreshing;

export const authSelectors = {
  selectIsLoggedIn,
  selectUsername,
  selectIsRefreshing,
};
