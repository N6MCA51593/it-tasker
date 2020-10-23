import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeState: 'main'
};

const uiStateSlice = createSlice({
  name: 'uiState',
  initialState,
  reducers: {
    setUiState(state, { payload }) {
      state.activeState = payload;
    }
  }
});

export const { setUiState } = uiStateSlice.actions;

export default uiStateSlice.reducer;
