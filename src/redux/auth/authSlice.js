import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  registerUser,
  loginUser,
  logoutUser,
  fetchCurrentUser,
} from './authOperations';

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  isLoading: false,
  isLoadingUser: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    [registerUser.pending](state) {
      state.isLoading = true;
      state.error = null;
    },
    [registerUser.fulfilled](state, { payload }) {
      state.isLoading = false;
      state.isLoggedIn = true;
      state.token = payload.token;
      state.user = payload.user;
      toast.success('Thanks for joining!');
    },
    [registerUser.rejected](state, { payload }) {
      state.isLoading = false;
      state.error = payload;
      toast.error('Something went wrong, try again!');
    },
    [loginUser.pending](state) {
      state.isLoading = true;
      state.error = null;
    },
    [loginUser.fulfilled](state, { payload }) {
      state.isLoading = false;
      state.isLoggedIn = true;
      state.token = payload.token;
      state.user = payload.user;
      toast.success('Welcome!');
    },
    [loginUser.rejected](state, { payload }) {
      state.isLoading = false;
      state.error = payload;
      toast.error('Something went wrong, try again!');
    },
    [logoutUser.pending](state) {
      state.isLoading = true;
      state.error = null;
    },
    [logoutUser.fulfilled](state) {
      state.isLoading = false;
      state.isLoggedIn = false;
      state.user = { name: null, email: null };
      state.token = null;
      toast.success('See you later!');
    },
    [logoutUser.rejected](state, { payload }) {
      state.isLoading = false;
      state.error = payload;
      toast.error('Something went wrong, try again later!');
    },
    [fetchCurrentUser.pending](state) {
      state.isLoadingUser = true;
      state.error = null;
    },
    [fetchCurrentUser.fulfilled](state, { payload }) {
      state.isLoadingUser = false;
      state.isLoggedIn = true;
      state.user = payload;
    },
    [fetchCurrentUser.rejected](state, { payload }) {
      state.isLoadingUser = false;
      state.error = payload;
    },
  },
});

export const getAuth = state => state.auth;