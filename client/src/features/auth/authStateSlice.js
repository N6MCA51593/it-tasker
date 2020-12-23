import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: null,
  userName: null,
  isAuthenticated: false,
  isNoSession: false
};

const authSlice = createSlice({
  name: 'authState',
  initialState,
  reducers: {},
  extraReducers: {
    'api/checkUserSession/fulfilled': (state, { payload }) => {
      state.id = payload.id;
      state.userName = payload.userName;
      state.isAuthenticated = true;
    },
    'api/checkUserSession/rejected': state => {
      state.isNoSession = true;
    },
    'api/login/fulfilled': (state, { payload }) => {
      state.id = payload.id;
      state.userName = payload.userName;
      state.isAuthenticated = true;
    },
    'api/signup/fulfilled': (state, { payload }) => {
      state.id = payload.id;
      state.userName = payload.userName;
      state.isAuthenticated = true;
    },
    'api/logout/fulfilled': state => {
      return initialState;
    }
  }
});

//export const {} = authSlice.actions;
export default authSlice.reducer;
