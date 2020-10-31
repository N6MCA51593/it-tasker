import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeState: 'edit-areas',
  isLoading: true
};

const uiStateSlice = createSlice({
  name: 'uiState',
  initialState,
  reducers: {
    setUiState(state, { payload }) {
      state.activeState = payload;
    }
  },
  extraReducers: {
    'loadAppData/fulfilled': state => {
      state.isLoading = false;
    }
  }
});

export const { setUiState } = uiStateSlice.actions;

export default uiStateSlice.reducer;
